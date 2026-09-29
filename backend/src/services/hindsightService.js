import { env } from "../config/env.js";

const demoMemories = [
  {
    type: "team_standard",
    content: "Validate external input and avoid trusting request data."
  },
  {
    type: "architecture",
    content: "Business logic should remain in services rather than route handlers."
  },
  {
    type: "previous_review",
    content: "The team commonly asks reviewers to flag duplicated logic and missing tests."
  }
];

export async function recallRelevantMemories({ language, code }) {
  if (!env.liveServices || !env.hindsightBaseUrl || !env.hindsightApiKey) {
    return demoMemories;
  }

  // Hindsight provider integration point.
  // Adapt this request to the exact Hindsight deployment/API contract used by your team.
  const response = await fetch(
    `${env.hindsightBaseUrl.replace(/\/$/, "")}/v1/memories/search`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.hindsightApiKey}`
      },
      body: JSON.stringify({
        bank_id: env.hindsightBankId,
        query: `${language} code review team standards previous decisions ${code.slice(0, 4000)}`
      })
    }
  );

  if (!response.ok) throw new Error(`Hindsight search failed: ${response.status}`);
  const data = await response.json();
  return data.memories || data.results || [];
}

export async function retainReviewMemory(review) {
  if (!env.liveServices || !env.hindsightBaseUrl || !env.hindsightApiKey) {
    return { stored: false, mode: "demo" };
  }

  const response = await fetch(
    `${env.hindsightBaseUrl.replace(/\/$/, "")}/v1/memories`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.hindsightApiKey}`
      },
      body: JSON.stringify({
        bank_id: env.hindsightBankId,
        content: JSON.stringify({
          language: review.language,
          summary: review.summary,
          findings: review.findings,
          score: review.overallScore
        }),
        metadata: {
          source: "code-review-agent",
          review_id: review.id
        }
      })
    }
  );

  if (!response.ok) throw new Error(`Hindsight retain failed: ${response.status}`);
  return { stored: true, mode: "live" };
}
