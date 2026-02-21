import { useState } from "react";
import CoverForm from "./components/CoverForm";
import CoverPreview from "./components/CoverPreview";
import "./App.css";

function App() {
  const [generatedImage, setGeneratedImage] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    role: "",
    skills: "",
    templateId: 1,
  });

  const [styleConfig, setStyleConfig] = useState({
    textAlign: "center",

    backgroundType: "solid",
    backgroundColor: "#ffffff",
    gradientColor: "#eeeeee",
    textColor: "#000000",

    name: {
      color: "#000000",
      fontSize: 42,
      backgroundColor: "transparent",
    },

    role: {
      color: "#ffffff",
      fontSize: 20,
      backgroundColor: "#ff5c5c",
    },

    skills: {
      color: "#333333",
    },
  });

  const generateCover = async (payload) => {
    try {
      setLoading(true);
      setGeneratedImage("");

      //const res = await fetch("http://localhost:8081/api/covers/generate", {
      const API_BASE = process.env.REACT_APP_API_BASE;

      const res = await fetch(`${API_BASE}/api/covers/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to generate cover");

      const result = await res.json();
      //setGeneratedImage("http://localhost:8081" + result.imageUrl);
      setGeneratedImage(`${API_BASE}${result.imageUrl}`);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      {/* HEADER */}
      <div className="header">
        <h1>LinkedIn Cover Generator</h1>
        <p>Generate professional LinkedIn banners instantly</p>
      </div>

      {/* MAIN */}
      <div className="main-content">
        <CoverPreview
          generatedImage={generatedImage}
          loading={loading}
          styleConfig={styleConfig}
          setStyleConfig={setStyleConfig}
          formData={form}
        />
        <CoverForm
          form={form}
          setForm={setForm}
          styleConfig={styleConfig}
          setStyleConfig={setStyleConfig}
          onGenerate={generateCover}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default App;
