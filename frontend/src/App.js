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

    backgroundType: "solid", // ✅ ADD
    backgroundColor: "#ffffff", // ✅ ADD
    gradientColor: "#eeeeee", // ✅ ADD
    textColor: "#000000", // ✅ ADD (used in overlayStyle)

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


  const generateCover = async () => {
    setLoading(true);
    setGeneratedImage("");

    const API_BASE = process.env.REACT_APP_API_BASE;

    const payload = {
      ...form,
      styleConfig,
    };

    const res = await fetch("http://localhost:8081/api/covers/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    setGeneratedImage("http://localhost:8081" + result.imageUrl);

    setLoading(false);
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

      <div className="main-content">

        </div>
    </div>
  );
}

export default App;
