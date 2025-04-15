import { z } from "zod";

export const SeverityEnum = z.enum(["critical", "high", "medium", "low"]);
export const EffortEnum = z.enum(["low", "medium", "high"]);

const TechnologySchema = z.object({
  name: z.string(),
  language: z.string(),
  vulnerableCode: z.string(),
  fixedCode: z.string(),
});

export const FindingSchema = z.object({
  id: z.string(),
  name: z.string(),
  severity: SeverityEnum,
  description: z.string(),
  impact: z.string(),
  remediation: z.string(),
  effort: EffortEnum,
  location: z.string(),
  detectedAt: z.string(),
  cwe: z
    .object({
      id: z.string(),
      name: z.string(),
      url: z.string(),
    })
    .optional(),
  technologies: z.array(TechnologySchema),
  references: z.array(
    z.object({
      title: z.string(),
      url: z.string(),
    }),
  ),
});

export type Finding = z.infer<typeof FindingSchema>;

// Mock finding data
export const mockFinding: Finding = {
  id: "sql-injection-001",
  name: "SQL Injection Vulnerability",
  severity: "critical",
  description:
    "The application constructs SQL queries using string concatenation with user-supplied input, making it vulnerable to SQL injection attacks.",
  impact:
    "An attacker could manipulate the SQL query to access, modify, or delete unauthorized data from the database. This could lead to data breaches, unauthorized access, or complete system compromise.",
  remediation:
    "Use parameterized queries or an ORM to ensure proper escaping of user input. Never concatenate user input directly into SQL queries.",
  effort: "medium",
  location: "src/api/users/create.ts:42",
  detectedAt: "2024-03-15T10:30:00Z",
  technologies: [
    {
      name: "Node.js with MySQL",
      language: "typescript",
      vulnerableCode: `// ❌ Vulnerable code
const getUserData = async (userId: string) => {
  const query = \`SELECT * FROM users WHERE id = '\${userId}'\`;
  return await db.query(query);
};`,
      fixedCode: `// ✅ Fixed code using prepared statements
const getUserData = async (userId: string) => {
  const query = "SELECT * FROM users WHERE id = ?";
  return await db.query(query, [userId]);
};

// ✅ Alternative using an ORM (Prisma)
const getUserData = async (userId: string) => {
  return await prisma.user.findUnique({
    where: { id: userId }
  });
};`,
    },
    {
      name: "Python with SQLAlchemy",
      language: "python",
      vulnerableCode: `# ❌ Vulnerable code
def get_user_data(user_id):
    query = f"SELECT * FROM users WHERE id = '{user_id}'"
    return db.execute(query)`,
      fixedCode: `# ✅ Fixed code using SQLAlchemy ORM
def get_user_data(user_id):
    return db.session.query(User).filter(User.id == user_id).first()

# ✅ Alternative using parameterized query
def get_user_data(user_id):
    query = text("SELECT * FROM users WHERE id = :user_id")
    return db.session.execute(query, {"user_id": user_id})`,
    },
  ],
  references: [
    {
      title: "OWASP SQL Injection Prevention Cheat Sheet",
      url: "https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html",
    },
    {
      title: "CWE-89: SQL Injection",
      url: "https://cwe.mitre.org/data/definitions/89.html",
    },
  ],
};
