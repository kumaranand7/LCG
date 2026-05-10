import { useState } from "react"; 
export default function SummaryInput({ onExtract, loading }) {
  const [summary, setSummary] = useState("");

  return (
    <div className="section-card">
      <h3 className="section-title">✨ AI Auto-Fill</h3>
      <textarea
        rows={4}
        placeholder="Paste your summary... e.g. I am Andy, a Java developer with 2 years of experience in Spring Boot, React, and REST APIs"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        style={{ width: "100%", padding: "10px", borderRadius: "6px" }}
      />
      <button
        onClick={() => onExtract(summary)}
        disabled={loading || !summary.trim()}
      >
        {loading ? "Extracting..." : "✨ Generate from Summary"}
      </button>
    </div>
  );
}