import fs from "node:fs";
import path from "node:path";
import { env } from "./config/env.js";

const dbPath = path.resolve(env.databaseFile);
fs.mkdirSync(path.dirname(dbPath), { recursive: true });

const defaultData = {
  reviews: [],
  findings: [],
  standards: [
    { id: 1, category: "Style", rule: "Prefer small, readable functions with clear names.", source: "seed", createdAt: new Date().toISOString() },
    { id: 2, category: "Security", rule: "Validate untrusted input at API boundaries.", source: "seed", createdAt: new Date().toISOString() },
    { id: 3, category: "Maintainability", rule: "Avoid duplicated business logic.", source: "seed", createdAt: new Date().toISOString() },
    { id: 4, category: "Testing", rule: "Add tests for important business behavior.", source: "seed", createdAt: new Date().toISOString() }
  ]
};

function load() {
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify(defaultData, null, 2), "utf8");
    return structuredClone(defaultData);
  }
  try {
    return JSON.parse(fs.readFileSync(dbPath, "utf8"));
  } catch {
    return structuredClone(defaultData);
  }
}

function save(data) {
  const temp = `${dbPath}.tmp`;
  fs.writeFileSync(temp, JSON.stringify(data, null, 2), "utf8");
  fs.renameSync(temp, dbPath);
}

export function insertReview(review) {
  const data = load();
  data.reviews.push(review);
  save(data);
}

export function insertFindings(reviewId, findings) {
  const data = load();
  for (const f of findings) {
    data.findings.push({ reviewId, ...f });
  }
  save(data);
}

export function listReviewRows() {
  const data = load();
  return [...data.reviews].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function getReviewRow(id) {
  return load().reviews.find((review) => review.id === id) || null;
}

export function getFindings(reviewId) {
  return load().findings.filter((finding) => finding.reviewId === reviewId);
}

export function listStandardsRows() {
  return load().standards;
}
