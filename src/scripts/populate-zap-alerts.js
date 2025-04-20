"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("@/server/db/db");
var alerts_1 = require("@/server/db/schema/alerts");
var axios_1 = require("axios");
var cheerio = require("cheerio");
var openai_1 = require("openai");
var env_1 = require("@/env");
var openai = new openai_1.default({
    apiKey: env_1.env.OPENAI_API_KEY,
});
var FRAMEWORKS = [
    "Next.js 14",
    "Express.js 4",
    "Django 5",
    "Spring Boot 3",
    "Laravel 10",
];
function fetchZAPAlerts() {
    return __awaiter(this, void 0, void 0, function () {
        var response, $, alerts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.get("https://www.zaproxy.org/docs/alerts/")];
                case 1:
                    response = _a.sent();
                    $ = cheerio.load(response.data);
                    alerts = [];
                    $("table tr").each(function (_, row) {
                        var columns = $(row).find("td");
                        if (columns.length > 0) {
                            var alert_1 = {
                                id: $(columns[0]).text().trim(),
                                name: $(columns[1]).text().trim(),
                                status: $(columns[2]).text().trim().toLowerCase(),
                                risk: $(columns[3]).text().trim(),
                                type: $(columns[4]).text().trim(),
                                cwe: parseInt($(columns[5]).text().trim()) || undefined,
                                wasc: parseInt($(columns[6]).text().trim()) || undefined,
                            };
                            alerts.push(alert_1);
                        }
                    });
                    return [2 /*return*/, alerts];
            }
        });
    });
}
function generateFrameworkFixes(alert) {
    return __awaiter(this, void 0, void 0, function () {
        var prompt, completion, content, fixes;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    prompt = "As a security expert, provide detailed fixes for the following security alert in each framework:\n\nAlert: ".concat(alert.name, "\nRisk Level: ").concat(alert.risk, "\nType: ").concat(alert.type, "\n").concat(alert.cwe ? "CWE: ".concat(alert.cwe) : "", "\n").concat(alert.wasc ? "WASC: ".concat(alert.wasc) : "", "\n\nFor each of these frameworks:\n").concat(FRAMEWORKS.join(", "), "\n\nProvide:\n1. A clear explanation of how to fix the vulnerability\n2. Framework-specific code examples\n3. Best practices and additional security considerations\n\nFormat the response as JSON with framework names as keys and markdown-formatted fixes as values.");
                    return [4 /*yield*/, openai.chat.completions.create({
                            model: "gpt-4-turbo-preview",
                            messages: [
                                {
                                    role: "system",
                                    content: "You are a security expert specializing in web framework security. Provide detailed, framework-specific security fixes with code examples.",
                                },
                                {
                                    role: "user",
                                    content: prompt,
                                },
                            ],
                            response_format: { type: "json_object" },
                        })];
                case 1:
                    completion = _c.sent();
                    content = (_b = (_a = completion.choices[0]) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.content;
                    if (!content) {
                        throw new Error("No response from ChatGPT for alert ".concat(alert.name));
                    }
                    try {
                        fixes = JSON.parse(content);
                        return [2 /*return*/, fixes];
                    }
                    catch (error) {
                        console.error("Failed to parse ChatGPT response for alert ".concat(alert.name, ":"), error);
                        // Return a basic structure if parsing fails
                        return [2 /*return*/, Object.fromEntries(FRAMEWORKS.map(function (framework) { return [
                                framework,
                                "Standard security best practices for ".concat(alert.name, " in ").concat(framework, ":\n\n") +
                                    "1. Implement input validation\n" +
                                    "2. Use framework's built-in security features\n" +
                                    "3. Keep dependencies updated\n" +
                                    "4. Follow framework-specific security guidelines",
                            ]; }))];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function populateDatabase() {
    return __awaiter(this, void 0, void 0, function () {
        var zapAlerts, _i, zapAlerts_1, alert_2, frameworkFixes, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 8]);
                    return [4 /*yield*/, fetchZAPAlerts()];
                case 1:
                    zapAlerts = _a.sent();
                    _i = 0, zapAlerts_1 = zapAlerts;
                    _a.label = 2;
                case 2:
                    if (!(_i < zapAlerts_1.length)) return [3 /*break*/, 6];
                    alert_2 = zapAlerts_1[_i];
                    return [4 /*yield*/, generateFrameworkFixes(alert_2)];
                case 3:
                    frameworkFixes = _a.sent();
                    return [4 /*yield*/, db_1.db.insert(alerts_1.alerts).values({
                            id: alert_2.id,
                            name: alert_2.name,
                            status: alert_2.status,
                            risk: alert_2.risk,
                            type: alert_2.type,
                            cwe: alert_2.cwe,
                            wasc: alert_2.wasc,
                            frameworkFixes: frameworkFixes,
                        })];
                case 4:
                    _a.sent();
                    console.log("\u2705 Processed alert: ".concat(alert_2.name));
                    _a.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 2];
                case 6:
                    console.log("✅ Database population completed");
                    return [3 /*break*/, 8];
                case 7:
                    error_1 = _a.sent();
                    console.error("Error populating database:", error_1);
                    throw error_1;
                case 8: return [2 /*return*/];
            }
        });
    });
}
// Run the script
populateDatabase()
    .then(function () {
    console.log("✅ All alerts processed successfully");
    process.exit(0);
})
    .catch(function (error) {
    console.error("❌ Error:", error);
    process.exit(1);
});
