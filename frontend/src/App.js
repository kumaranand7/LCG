import { useState } from "react";
import CoverForm from "./components/CoverForm";
import CoverPreview from "./components/CoverPreview";
import "./App.css";

function App() {
  const [selectedTemplate, setSelectedTemplate] = useState(1);
  const [generatedImage, setGeneratedImage] = useState("");
  const [loading, setLoading] = useState(false);

  const generateCover = async (data) => {
    setLoading(true);
    setGeneratedImage("");

    const API_BASE = process.env.REACT_APP_API_BASE;

    // const res = await fetch("http://localhost:8081/api/covers/generate", {
      const res = await fetch(`${API_BASE}/api/covers/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    setGeneratedImage("http://localhost:8081" + result.imageUrl);
    setLoading(false);
  };

  return (
    <div className="container">
      {/*  HEADER ALWAYS VISIBLE */}
      <div className="header">
        <h1>LinkedIn Cover Generator</h1>
        <p>Generate professional LinkedIn banners instantly</p>
      </div>

      {/* MAIN CONTENT */}
      <div className="main">
        <CoverForm
          selectedTemplate={selectedTemplate}
          onTemplateChange={setSelectedTemplate}
          onGenerate={generateCover}
          loading={loading}
        />

        <CoverPreview
          selectedTemplate={selectedTemplate}
          generatedImage={generatedImage}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default App;
