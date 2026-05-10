import { useState } from "react";
import CoverForm from "./components/CoverForm";
import CoverPreview from "./components/CoverPreview";
import SummaryInput from "./components/SummaryInput";
import "./App.css";

function App() {
  const [generatedImage, setGeneratedImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiSkills, setAiSkills] = useState([]);

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
      fontFamily: "'Dancing Script', cursive", 
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

  const extractFromSummary = async (summary) => {
    const API_BASE = process.env.REACT_APP_API_BASE; 
  const res = await fetch(`${API_BASE}/api/ai/extract`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ summary }),
  });
  const data = await res.json();

  // Auto-fill the form
  setForm(prev => ({
    ...prev,
    name: data.name,
    role: data.role,
    skills: data.skills,
  }));

  // ADD SKILLS 
  if (data.skills) {
    setAiSkills(data.skills.split(" | ").map(s => s.trim()));
  }

  // Auto-generate cover
  generateCover({
    name: data.name,
    role: data.role,
    skills: data.skills,
    templateId: form.templateId,
    style: styleConfig,
  });
};

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
                <SummaryInput onExtract={extractFromSummary} loading={loading} />
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
        {/* <SummaryInput onExtract={extractFromSummary} loading={loading} /> */}
        <CoverForm
          form={form}
          setForm={setForm}
          styleConfig={styleConfig}
          setStyleConfig={setStyleConfig}
          onGenerate={generateCover}
          loading={loading}
          aiSkills={aiSkills}
          setAiSkills={setAiSkills}
        />
      </div>
    </div>
  );
}

export default App;
