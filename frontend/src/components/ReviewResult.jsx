const severityOrder = { critical: 0, high: 1, medium: 2, low: 3, info: 4 };

export default function ReviewResult({ review }) {
  const findings = [...review.findings].sort(
    (a, b) => (severityOrder[a.severity] ?? 9) - (severityOrder[b.severity] ?? 9)
  );

  return (
    <section className="result">
      <div className="score-card">
        <div>
          <span className="eyebrow">Review score</span>
          <h2>{review.overallScore}/100</h2>
        </div>
        <p>{review.summary}</p>
      </div>

      <h2>Findings</h2>
      {findings.map((finding, index) => (
        <article className="finding" key={`${finding.title}-${index}`}>
          <div className="finding-top">
            <span className={`severity ${finding.severity}`}>{finding.severity}</span>
            {finding.line && <span>Line {finding.line}</span>}
          </div>
          <h3>{finding.title}</h3>
          <p>{finding.description}</p>
          <div className="suggestion"><b>Suggestion:</b> {finding.suggestion}</div>
        </article>
      ))}

      <details className="memory">
        <summary>Team memory used</summary>
        <pre>{JSON.stringify(review.memoryUsed || [], null, 2)}</pre>
      </details>
    </section>
  );
}
