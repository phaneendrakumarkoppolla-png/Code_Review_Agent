import { createReview, getReview, listReviews, listStandards } from "../services/reviewService.js";

export async function postReview(req, res, next) {
  try {
    const review = await createReview(req.body);
    res.status(201).json(review);
  } catch (error) {
    next(error);
  }
}

export function getReviews(req, res) {
  res.json({ reviews: listReviews() });
}

export function getReviewById(req, res) {
  const review = getReview(req.params.id);
  if (!review) return res.status(404).json({ error: "Review not found" });
  res.json(review);
}

export function getTeamStandards(req, res) {
  res.json({ standards: listStandards() });
}
