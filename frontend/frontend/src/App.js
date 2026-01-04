import { useState } from "react";
import CoverForm from "./components/CoverForm";
import CoverPreview from "./components/CoverPreview";

function App() {
  const [imageUrl, setImageUrl] = useState("");

  const generateCover = async (data) => {
    const response = await fetch("http://localhost:8081/api/covers/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    setImageUrl("http://localhost:8081" + result.imageUrl);
  };

  return (
    <div>
      <h1>LinkedIn Cover Generator</h1>
      <CoverForm onGenerate={generateCover} />
      <CoverPreview imageUrl={imageUrl} />
    </div>
  );
}

export default App;
