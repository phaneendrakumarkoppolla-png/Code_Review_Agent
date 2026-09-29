import { env } from "../config/env.js";

function demoReview({ language, code, memories }) {
  const findings = [];
  const lines = code.split(/\r?\n/);

  const patterns = [
    {
      regex: /password\s*=\s*["'`]/i,
      severity: "critical",
      title: "Possible hard-coded secret",
      description: "A credential-like value appears to be embedded directly in source code.",
      suggestion: "Move secrets to environment variables or a secret manager."
    },
    {
      regex: /eval\s*\(/,
      severity: "high",
      title: "Dynamic code execution",
      description: "eval can execute unexpected input and creates security and maintainability risks.",
      suggestion: "Avoid eval and use explicit parsing or dispatch logic."
    },
    {
      regex: /console\.log\s*\(/,
      severity: "low",
      title: "Debug logging",
      description: "Console logging may leak implementation details or create noisy production logs.",
      suggestion: "Use structured logging and remove temporary debugging statements."
    },
    {
      regex: /TODO|FIXME/,
      severity: "info",
      title: "Unresolved work marker",
      description: "The source contains a TODO/FIXME marker.",
      suggestion: "Track the work in an issue or complete it before production."
    }
  ];

  for (const pattern of patterns) {
    const lineIndex = lines.findIndex((line) => pattern.regex.test(line));
    if (lineIndex >= 0) {
      findings.push({ ...pattern, line: lineIndex + 1 });
    }
  }

  if (!findings.length) {
    findings.push({
      severity: "info",
      title: "No obvious issues detected",
      description: "The demo analyzer did not identify any of its configured patterns.",
      suggestion: "Run the live LLM reviewer for deeper semantic analysis."
    });
  }

  const score = Math.max(
    0,
    100 - findings.reduce((sum, f) => sum + ({ critical: 30, high: 20, medium: 12, low: 5, info: 0 }[f.severity] || 0), 0)
  );

  return {
    summary: `Reviewed ${language} code using team memory and the configured analyzer.`,
    overallScore: score,
    findings,
    memoryUsed: memories
  };
}

export async function generateReview({ language, code, memories }) {
  if (!env.liveServices || !env.llmBaseUrl || !env.llmApiKey || !env.llmModel) {
    return demoReview({ language, code, memories });
  }

  const prompt = `You are a senior code reviewer for a software team.

Language: ${language}

Team memory:
${JSON.stringify(memories, null, 2)}

Review this code:
\`\`\`${language}
${code}
\`\`\`

Return ONLY valid JSON with:
{
  "summary": "string",
  "overallScore": 0,
  "findings": [
    {
      "severity": "critical|high|medium|low|info",
      "title": "string",
      "description": "string",
      "line": 1,
      "suggestion": "string"
    }
  ]
}`;

  const response = await fetch(`${env.llmBaseUrl.replace(/\/$/, "")}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.llmApiKey}`
    },
    body: JSON.stringify({
      model: env.llmModel,
      messages: [
        { role: "system", content: "You output strict JSON for code review." },
        { role: "user", content: prompt }
      ],
      temperature: 0.1
    })
  });

  if (!response.ok) throw new Error(`LLM request failed: ${response.status}`);
  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error("LLM returned no content");

  const cleaned = content.replace(/^```json\s*/i, "").replace(/```$/i, "").trim();
  return { ...JSON.parse(cleaned), memoryUsed: memories };
}
