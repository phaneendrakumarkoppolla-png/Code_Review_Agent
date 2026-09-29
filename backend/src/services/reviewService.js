import crypto from "node:crypto";
import {
  insertReview,
  insertFindings,
  listReviewRows,
  getReviewRow,
  getFindings,
  listStandardsRows
} from "../db.js";
import { recallRelevantMemories, retainReviewMemory } from "./hindsightService.js";
import { generateReview } from "./llmService.js";

export async function createReview({ language, code }) {
  const memories = await recallRelevantMemories({ language, code });
  const generated = await generateReview({ language, code, memories });
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  const review = {
    id,
    language,
    code,
    summary: generated.summary,
    overallScore: Math.max(0, Math.min(100, Number(generated.overallScore || 0))),
    findings: generated.findings || [],
    memoryUsed: generated.memoryUsed || memories,
    createdAt
  };

  insertReview({
    id: review.id,
    language: review.language,
    code: review.code,
    summary: review.summary,
    overallScore: review.overallScore,
    createdAt: review.createdAt
  });
  insertFindings(review.id, review.findings);

  try {
    await retainReviewMemory(review);
  } catch (error) {
    console.warn("Memory retention skipped:", error.message);
  }

  return review;
}

function mapReview(row) {
  return {
    id: row.id,
    language: row.language,
    code: row.code,
    summary: row.summary,
    overallScore: row.overallScore,
    createdAt: row.createdAt,
    findings: getFindings(row.id)
  };
}

export function listReviews() {
  return listReviewRows().map(mapReview);
}

export function getReview(id) {
  const row = getReviewRow(id);
  return row ? mapReview(row) : null;
}

export function listStandards() {
  return listStandardsRows();
}
