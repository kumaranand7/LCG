import { useState } from "react";
import CoverForm from "./components/CoverForm";
import CoverPreview from "./components/CoverPreview";
import "./App.css";

function App() {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const generateCover = async (data) => {
    setLoading(true);
    setImageUrl("");

    const res = await fetch("http://localhost:8081/api/covers/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    setImageUrl("http://localhost:8081" + result.imageUrl);
    setLoading(false);
  };

  return (
    <div className="container">
      <div className="header">
        <h1>LinkedIn Cover Generator</h1>
        <p>Generate professional LinkedIn banners instantly</p>
      </div>

      <div className="main">
        <div className="form">
          <CoverForm onGenerate={generateCover} loading={loading} />
        </div>

        <div className="preview">
          <CoverPreview imageUrl={imageUrl} loading={loading} />
        </div>
      </div>
    </div>
  );
}

export default App;
