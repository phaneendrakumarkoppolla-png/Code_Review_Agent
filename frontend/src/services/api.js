import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api"
});

export async function submitReview(payload) {
  const { data } = await api.post("/reviews", payload);
  return data;
}

export async function fetchReviews() {
  const { data } = await api.get("/reviews");
  return data.reviews;
}

export async function fetchReview(id) {
  const { data } = await api.get(`/reviews/${id}`);
  return data;
}

export async function fetchStandards() {
  const { data } = await api.get("/reviews/standards");
  return data.standards;
}
