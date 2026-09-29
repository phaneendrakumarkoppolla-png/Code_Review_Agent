import { Router } from "express";
import { validateBody } from "../middleware/validate.js";
import { reviewSchema } from "../schemas.js";
import {
  postReview,
  getReviews,
  getReviewById,
  getTeamStandards
} from "../controllers/reviewController.js";

const router = Router();

router.post("/", validateBody(reviewSchema), postReview);
router.get("/", getReviews);
router.get("/standards", getTeamStandards);
router.get("/:id", getReviewById);

export default router;
