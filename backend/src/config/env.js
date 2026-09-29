import "dotenv/config";

export const env = {
  port: Number(process.env.PORT || 5000),
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173",
  databaseFile: process.env.DATABASE_FILE || "./data/reviews.json",
  llmBaseUrl: process.env.LLM_BASE_URL || "",
  llmApiKey: process.env.LLM_API_KEY || "",
  llmModel: process.env.LLM_MODEL || "",
  hindsightBaseUrl: process.env.HINDSIGHT_BASE_URL || "",
  hindsightApiKey: process.env.HINDSIGHT_API_KEY || "",
  hindsightBankId: process.env.HINDSIGHT_BANK_ID || "code-review-team",
  liveServices: process.env.ENABLE_LIVE_SERVICES === "true"
};
