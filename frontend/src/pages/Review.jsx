import { useState } from "react";
import Editor from "@monaco-editor/react";
import { submitReview } from "../services/api.js";
import ReviewResult from "../components/ReviewResult.jsx";

const starter = `function calculateTotal(items) {
  let total = 0;
  for (const item of items) {
    total += item.price;
  }
  console.log(total);
  return total;
}`;

export default function Review() {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(starter);
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function runReview() {
    setLoading(true);
    setError("");
    try {
      setReview(await submitReview({ language, code }));
    } catch (err) {
      setError(err.response?.data?.error || err.message || "Review failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <div className="page-heading">
        <div>
          <span className="eyebrow">Phase 2–5</span>
          <h1>Code Review</h1>
        </div>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option>javascript</option>
          <option>typescript</option>
          <option>python</option>
          <option>java</option>
          <option>c</option>
          <option>cpp</option>
          <option>sql</option>
        </select>
      </div>

      <div className="editor-card">
        <Editor
          height="430px"
          language={language}
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value || "")}
          options={{ minimap: { enabled: false }, fontSize: 14 }}
        />
      </div>

      <button className="button" onClick={runReview} disabled={loading || !code.trim()}>
        {loading ? "Reviewing..." : "Review Code"}
      </button>

      {error && <div className="error">{error}</div>}
      {review && <ReviewResult review={review} />}
    </section>
  );
}
