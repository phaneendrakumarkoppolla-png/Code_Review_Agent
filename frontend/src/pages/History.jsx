import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchReviews } from "../services/api.js";

export default function History() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews().then(setReviews).catch(console.error);
  }, []);

  return (
    <section>
      <div className="page-heading">
        <div>
          <span className="eyebrow">Phase 6</span>
          <h1>Review History</h1>
        </div>
      </div>

      {!reviews.length && <div className="empty">No reviews yet. Run your first review.</div>}

      <div className="history-list">
        {reviews.map((review) => (
          <article className="history-card" key={review.id}>
            <div>
              <strong>{review.language}</strong>
              <span>{new Date(review.createdAt).toLocaleString()}</span>
            </div>
            <p>{review.summary}</p>
            <b>Score: {review.overallScore}/100</b>
          </article>
        ))}
      </div>
    </section>
  );
}
