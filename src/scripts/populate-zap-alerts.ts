import { db } from "@/server/db/db";
import { alerts } from "@/server/db/schema/alerts";
import axios from "axios";
import * as cheerio from "cheerio";
import { env } from "@/env";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

const FRAMEWORKS = [
  "Next.js",
  "React",
  "Express.js",
  "Astro",
  "SvelteKit",
  "Django",
  "FastAPI",
  "Laravel",
  "NestJS",
  "Remix",
] as const;
type Framework = (typeof FRAMEWORKS)[number];

interface ZAPAlert {
  id: string;
  name: string;
  status: string;
  risk: string;
  type: string;
  cwe?: number;
  wasc?: number;
}

interface ImpactAnalysis {
  description: string;
  realWorldExamples: string[];
  businessImpact: string;
  commonMistakes: string[];
  quickWins: {
    immediate: string[]; // Quick fixes that can be implemented immediately
    shortTerm: string[]; // Fixes that can be done within a sprint
  };
  resourceRequirements: {
    time: string; // Estimated time to implement fixes
    expertise: string; // Required skill level
    cost: string; // Potential costs (tools, services)
  };
  priorityAssessment: {
    urgency: string; // How quickly this needs to be addressed
    effort: string; // Level of effort required to fix
    impact: string; // Potential impact if not addressed
  };
  complianceImplications: string[]; // Relevant standards (GDPR, HIPAA, etc.)
  monitoringGuidelines: {
    tools: string[]; // Free/affordable monitoring tools
    metrics: string[]; // What to monitor
    alerts: string[]; // What alerts to set up
  };
  testingApproach: {
    manual: string[]; // Manual testing steps
    automated: string[]; // Automated testing tools/approaches
    frequency: string; // How often to test
  };
}

const BATCH_SIZE = 15;
const MAX_RETRIES = 3;

function sanitizeJsonString(str: string): string {
  return str
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, "")
    .replace(/\\(?!["\\/bfnrtu])/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/\r/g, "\\r")
    .replace(/\t/g, "\\t")
    .replace(/\f/g, "\\f")
    .replace(/[\u0000-\u0019]+/g, "")
    .replace(/\\[^"\\\/bfnrtu]/g, "");
}

function extractJsonFromText(text: string): string {
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    return jsonMatch[0];
  }
  throw new Error("No JSON object found in response");
}

async function generateWithGPT(prompt: string): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a security expert who specializes in helping indie hackers and small dev teams implement practical security measures with limited resources. Provide ONLY valid JSON without any additional text or explanation.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.1,
      max_tokens: 2000,
      top_p: 0.9,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    const output = completion.choices[0]?.message?.content;
    if (!output) {
      throw new Error("No output from GPT");
    }

    // Try to extract JSON if the response contains additional text
    try {
      // First try to parse as is
      JSON.parse(output);
      return output;
    } catch (e) {
      console.error("Raw output causing error:", output);
      // If that fails, try to extract JSON and sanitize
      const extractedJson = extractJsonFromText(output);
      const sanitizedJson = sanitizeJsonString(extractedJson);
      // Validate that we can parse it
      JSON.parse(sanitizedJson);
      return sanitizedJson;
    }
  } catch (error) {
    console.error("Error generating with GPT:", error);
    if (error instanceof Error) {
      console.error("Raw output causing error:");
    }
    throw error;
  }
}

async function fetchZAPAlerts(): Promise<ZAPAlert[]> {
  const response = await axios.get("https://www.zaproxy.org/docs/alerts/");
  const $ = cheerio.load(response.data);
  const alerts: ZAPAlert[] = [];

  $("table tr").each((_: unknown, row) => {
    const columns = $(row).find("td");
    if (columns.length > 0) {
      const alert: ZAPAlert = {
        id: $(columns[0]).text().trim(),
        name: $(columns[1]).text().trim(),
        status: $(columns[2]).text().trim().toLowerCase(),
        risk: $(columns[3]).text().trim(),
        type: $(columns[4]).text().trim(),
        cwe: parseInt($(columns[5]).text().trim()) || undefined,
        wasc: parseInt($(columns[6]).text().trim()) || undefined,
      };
      alerts.push(alert);
    }
  });

  return alerts;
}

function cleanAndValidateJson(content: string): string {
  // Remove any text before the first {
  const startIdx = content.indexOf("{");
  const endIdx = content.lastIndexOf("}");
  if (startIdx === -1 || endIdx === -1) {
    throw new Error("No JSON object found in response");
  }
  content = content.slice(startIdx, endIdx + 1);

  // Fix common JSON issues
  return (
    content
      // Fix newlines and escaping
      .replace(/\\n/g, "\\n")
      .replace(/\\'/g, "'")
      .replace(/\\"/g, '\\"')
      .replace(/\\&/g, "&")
      .replace(/\\r/g, "\\r")
      .replace(/\\t/g, "\\t")
      .replace(/\\b/g, "\\b")
      .replace(/\\f/g, "\\f")
      // Remove non-printable and other non-valid JSON chars
      .replace(/[\u0000-\u0019]+/g, "")
      // Fix double escaped quotes
      .replace(/\\\\/g, "\\")
      .replace(/\\\"/g, '"')
      .replace(/[""]/g, '"')
      // Remove multiple spaces
      .replace(/ +/g, " ")
      // Fix improperly escaped backslashes
      .replace(/([^\\])\\([^"\\/bfnrtu])/g, "$1\\\\$2")
      // Remove any remaining invalid escape sequences
      .replace(/\\[^"\\/bfnrtu]/g, "")
  );
}

async function generateWithRetry<T>(
  prompt: string,
  validateFn: (parsed: any) => parsed is T,
  retries = MAX_RETRIES,
): Promise<T> {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const content = await generateWithGPT(prompt);
      const cleaned = cleanAndValidateJson(content);
      const parsed = JSON.parse(cleaned);

      if (validateFn(parsed)) {
        return parsed;
      } else {
        throw new Error("Response validation failed");
      }
    } catch (error) {
      lastError = error as Error;
      console.error(
        `Attempt ${attempt}/${retries} failed:`,
        error,
        "\nRetrying with more explicit prompt...",
      );

      // Add more structure to the prompt on retries
      prompt = `${prompt}\n\nPREVIOUS ATTEMPT FAILED. REQUIREMENTS:\n- Response must be ONLY valid JSON\n- No text before or after the JSON\n- All strings must be properly escaped\n- Must include all required fields\n- Must follow exact format shown above`;
    }
  }

  throw new Error(
    `Failed after ${retries} attempts. Last error: ${lastError?.message}`,
  );
}

function isFrameworkRecord(obj: any): obj is Record<Framework, string> {
  if (typeof obj !== "object" || obj === null) return false;

  return FRAMEWORKS.every((framework) => {
    if (!(framework in obj)) return false;
    if (typeof obj[framework] !== "string") return false;
    if (!obj[framework].includes("## Fix")) return false;
    return true;
  });
}

function isImpactAnalysis(obj: any): obj is ImpactAnalysis {
  if (typeof obj !== "object" || obj === null) return false;

  const requiredFields = [
    "description",
    "realWorldExamples",
    "businessImpact",
    "commonMistakes",
    "quickWins",
    "resourceRequirements",
    "priorityAssessment",
    "complianceImplications",
    "monitoringGuidelines",
    "testingApproach",
  ];

  return requiredFields.every((field) => {
    if (!(field in obj)) return false;

    switch (field) {
      case "description":
      case "businessImpact":
        return typeof obj[field] === "string";
      case "realWorldExamples":
      case "commonMistakes":
      case "complianceImplications":
        return (
          Array.isArray(obj[field]) &&
          obj[field].every((item: any) => typeof item === "string")
        );
      case "quickWins":
        return (
          typeof obj[field] === "object" &&
          Array.isArray(obj[field].immediate) &&
          Array.isArray(obj[field].shortTerm)
        );
      case "resourceRequirements":
        return (
          typeof obj[field] === "object" &&
          typeof obj[field].time === "string" &&
          typeof obj[field].expertise === "string" &&
          typeof obj[field].cost === "string"
        );
      case "priorityAssessment":
        return (
          typeof obj[field] === "object" &&
          typeof obj[field].urgency === "string" &&
          typeof obj[field].effort === "string" &&
          typeof obj[field].impact === "string"
        );
      case "monitoringGuidelines":
        return (
          typeof obj[field] === "object" &&
          Array.isArray(obj[field].tools) &&
          Array.isArray(obj[field].metrics) &&
          Array.isArray(obj[field].alerts)
        );
      case "testingApproach":
        return (
          typeof obj[field] === "object" &&
          Array.isArray(obj[field].manual) &&
          Array.isArray(obj[field].automated) &&
          typeof obj[field].frequency === "string"
        );
      default:
        return false;
    }
  });
}

async function generateFrameworkFixes(
  alert: ZAPAlert,
): Promise<Record<Framework, string>> {
  try {
    const prompt = [
      "You are a security expert. Generate framework-specific security fixes in VALID JSON format.",
      "",
      `Alert: ${alert.name}`,
      `Risk Level: ${alert.risk}`,
      `Type: ${alert.type}`,
      alert.cwe ? `CWE: ${alert.cwe}` : "",
      alert.wasc ? `WASC: ${alert.wasc}` : "",
      "",
      `Required frameworks: ${FRAMEWORKS.join(", ")}`,
      "",
      "RESPONSE REQUIREMENTS:",
      "1. MUST be valid JSON object",
      "2. MUST contain ALL frameworks listed above as keys",
      "3. Each value MUST be a markdown string with:",
      "   - Heading starting with ##",
      "   - Numbered steps",
      "   - Code blocks with language tags",
      "   - Best practices list",
      "",
      "Example structure:",
      "{",
      '  "Next.js": "## Fix for Next.js\\n1. Implementation...\\n2. Code example...\\n3. Best practices...",',
      '  "React": "## Fix for React\\n1. Implementation...\\n2. Code example...\\n3. Best practices..."',
      "}",
      "",
      "NO TEXT OUTSIDE JSON. NO EXPLANATIONS. VALID JSON ONLY.",
    ].join("\n");

    let content = "";
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        content = await generateWithGPT(prompt);
        const parsed = JSON.parse(content) as Record<Framework, string>;
        if (isFrameworkRecord(parsed)) {
          return parsed;
        }
        throw new Error("Response validation failed");
      } catch (error) {
        console.error(
          `Attempt ${attempt}/${MAX_RETRIES} failed:`,
          error,
          "\nRetrying with more explicit prompt...",
        );
        if (attempt === MAX_RETRIES) {
          throw error;
        }
      }
    }

    throw new Error("Failed to generate valid framework fixes");
  } catch (error) {
    console.error(
      `Failed to generate framework fixes for ${alert.name}:`,
      error,
    );
    // Return fallback structure
    return Object.fromEntries(
      FRAMEWORKS.map((framework) => [
        framework,
        `## Security Fix for ${alert.name} in ${framework}\n\n` +
          `1. Implementation\n` +
          `- Implement input validation\n` +
          `- Use framework's built-in security features\n\n` +
          `2. Code Example\n` +
          `\`\`\`${framework.toLowerCase().includes("js") ? "javascript" : "text"}\n` +
          `// Basic security implementation\n` +
          `// Implement proper validation and security measures\n` +
          `\`\`\`\n\n` +
          `3. Best Practices\n` +
          `- Keep dependencies updated\n` +
          `- Follow security guidelines\n` +
          `- Regular security audits\n`,
      ]),
    ) as Record<Framework, string>;
  }
}

async function generateImpactAnalysis(
  alert: ZAPAlert,
): Promise<ImpactAnalysis> {
  try {
    const prompt = [
      "You are a security expert helping indie hackers and small dev teams. Generate a security analysis in VALID JSON format.",
      "",
      `Alert: ${alert.name}`,
      `Risk Level: ${alert.risk}`,
      `Type: ${alert.type}`,
      alert.cwe ? `CWE: ${alert.cwe}` : "",
      alert.wasc ? `WASC: ${alert.wasc}` : "",
      "",
      "RESPONSE REQUIREMENTS:",
      "1. MUST be valid JSON object",
      "2. MUST contain ALL required fields",
      "3. MUST follow exact structure shown below",
      "4. All string arrays must be properly formatted",
      "",
      "Required JSON structure:",
      "{",
      '  "description": "Clear technical description",',
      '  "realWorldExamples": ["Example 1", "Example 2"],',
      '  "businessImpact": "Focus on small business impact",',
      '  "commonMistakes": ["Mistake 1", "Mistake 2"],',
      '  "quickWins": {',
      '    "immediate": ["Action 1", "Action 2"],',
      '    "shortTerm": ["Action 1", "Action 2"]',
      "  },",
      '  "resourceRequirements": {',
      '    "time": "Estimated time",',
      '    "expertise": "Required skill level",',
      '    "cost": "Cost estimate"',
      "  },",
      '  "priorityAssessment": {',
      '    "urgency": "Urgency level",',
      '    "effort": "Required effort",',
      '    "impact": "Business impact"',
      "  },",
      '  "complianceImplications": ["Requirement 1", "Requirement 2"],',
      '  "monitoringGuidelines": {',
      '    "tools": ["Tool 1", "Tool 2"],',
      '    "metrics": ["Metric 1", "Metric 2"],',
      '    "alerts": ["Alert 1", "Alert 2"]',
      "  },",
      '  "testingApproach": {',
      '    "manual": ["Step 1", "Step 2"],',
      '    "automated": ["Tool 1", "Tool 2"],',
      '    "frequency": "Testing frequency"',
      "  }",
      "}",
      "",
      "NO TEXT OUTSIDE JSON. NO EXPLANATIONS. VALID JSON ONLY.",
    ].join("\n");

    let content = "";
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        content = await generateWithGPT(prompt);
        const parsed = JSON.parse(content) as ImpactAnalysis;
        if (isImpactAnalysis(parsed)) {
          return parsed;
        }
        throw new Error("Response validation failed");
      } catch (error) {
        console.error(
          `Attempt ${attempt}/${MAX_RETRIES} failed:`,
          error,
          "\nRetrying with more explicit prompt...",
        );
        if (attempt === MAX_RETRIES) {
          throw error;
        }
      }
    }

    throw new Error("Failed to generate valid impact analysis");
  } catch (error) {
    console.error(
      `Failed to generate impact analysis for ${alert.name}:`,
      error,
    );
    // Return fallback structure
    return {
      description: `This vulnerability can lead to security breaches in web applications.`,
      realWorldExamples: [`No specific examples available for ${alert.name}`],
      businessImpact:
        "Can lead to data breaches, financial losses, and reputation damage.",
      commonMistakes: [
        "Insufficient input validation",
        "Lack of security testing",
        "Outdated dependencies",
      ],
      quickWins: {
        immediate: ["Update dependencies", "Enable basic security headers"],
        shortTerm: ["Implement input validation", "Add basic security testing"],
      },
      resourceRequirements: {
        time: "1-2 days",
        expertise: "Basic web security knowledge",
        cost: "No immediate costs required",
      },
      priorityAssessment: {
        urgency: "Medium",
        effort: "Low to Medium",
        impact: "Potentially Severe",
      },
      complianceImplications: [
        "GDPR basic requirements",
        "Standard web security practices",
      ],
      monitoringGuidelines: {
        tools: ["Free tier of security scanning tools"],
        metrics: ["Number of failed requests", "Suspicious patterns"],
        alerts: ["Critical security events", "Unusual traffic patterns"],
      },
      testingApproach: {
        manual: ["Basic security checklist review"],
        automated: ["Free security scanning tools"],
        frequency: "Monthly",
      },
    };
  }
}

async function processAlert(alert: ZAPAlert) {
  try {
    const frameworkFixes = await generateFrameworkFixes(alert);
    const impactAnalysis = await generateImpactAnalysis(alert);

    await db.insert(alerts).values({
      id: alert.id,
      name: alert.name,
      status: alert.status,
      risk: alert.risk,
      type: alert.type,
      cwe: alert.cwe,
      wasc: alert.wasc,
      description: impactAnalysis.description,
      frameworkFixes,
      impactAnalysis: {
        description: impactAnalysis.description,
        realWorldExamples: impactAnalysis.realWorldExamples,
        businessImpact: impactAnalysis.businessImpact,
        commonMistakes: impactAnalysis.commonMistakes,
      },
      mitigation: {
        quickWins: impactAnalysis.quickWins,
        resourceRequirements: impactAnalysis.resourceRequirements,
      },
      priority: impactAnalysis.priorityAssessment,
      compliance: {
        standards: impactAnalysis.complianceImplications,
      },
      monitoring: impactAnalysis.monitoringGuidelines,
      testing: impactAnalysis.testingApproach,
    });

    console.log(`✅ Processed alert: ${alert.name}`);
    return { success: true, alert: alert.name };
  } catch (error) {
    console.error(`❌ Error processing alert ${alert.name}:`, error);
    return { success: false, alert: alert.name, error };
  }
}

async function processBatch(alerts: ZAPAlert[]) {
  const results = await Promise.all(alerts.map(processAlert));
  const succeeded = results.filter((r) => r.success).length;
  const failed = results.filter((r) => !r.success).length;
  console.log(`Batch completed - Succeeded: ${succeeded}, Failed: ${failed}`);
  return results;
}

async function populateDatabase() {
  try {
    console.log("🔍 Fetching ZAP alerts...");
    const zapAlerts = await fetchZAPAlerts();
    console.log(`📊 Found ${zapAlerts.length} alerts to process`);

    // Process alerts in batches
    const batches = [];
    for (let i = 0; i < zapAlerts.length; i += BATCH_SIZE) {
      batches.push(zapAlerts.slice(i, i + BATCH_SIZE));
    }

    console.log(
      `🚀 Processing ${batches.length} batches of ${BATCH_SIZE} alerts each`,
    );

    let totalProcessed = 0;
    let totalSucceeded = 0;
    let totalFailed = 0;

    for (const [index, batch] of batches.entries()) {
      console.log(`\n📦 Processing batch ${index + 1}/${batches.length}`);
      const results = await processBatch(batch);

      totalProcessed += batch.length;
      totalSucceeded += results.filter((r) => r.success).length;
      totalFailed += results.filter((r) => !r.success).length;

      const progress = ((totalProcessed / zapAlerts.length) * 100).toFixed(1);
      console.log(
        `Progress: ${progress}% (${totalProcessed}/${zapAlerts.length})`,
      );
      console.log(
        `Running totals - Succeeded: ${totalSucceeded}, Failed: ${totalFailed}`,
      );
    }

    console.log("\n✅ Database population completed");
    console.log(`Final results:
    Total Processed: ${totalProcessed}
    Succeeded: ${totalSucceeded}
    Failed: ${totalFailed}
    Success Rate: ${((totalSucceeded / totalProcessed) * 100).toFixed(1)}%`);
  } catch (error) {
    console.error("❌ Fatal error populating database:", error);
    throw error;
  }
}

// Run the script with better error handling
populateDatabase()
  .then(() => {
    console.log("✨ Script completed successfully");
    process.exit(0);
  })
  .catch((error) => {
    console.error("💥 Script failed:", error);
    process.exit(1);
  });
