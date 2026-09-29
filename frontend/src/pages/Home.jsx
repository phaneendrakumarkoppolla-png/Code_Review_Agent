import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="hero">
      <span className="eyebrow">AI + Persistent Team Memory</span>
      <h1>Review code with your team's knowledge.</h1>
      <p>
        Submit code, receive structured findings, and use previous review decisions
        and team standards as context for future reviews.
      </p>
      <Link className="button" to="/review">Start a code review</Link>

      <div className="feature-grid">
        <article><h3>Code analysis</h3><p>Security, quality, maintainability and performance findings.</p></article>
        <article><h3>Team memory</h3><p>Previous reviews and architectural standards can inform new reviews.</p></article>
        <article><h3>Review history</h3><p>Keep a traceable record of submitted reviews.</p></article>
      </div>
    </section>
  );
}
