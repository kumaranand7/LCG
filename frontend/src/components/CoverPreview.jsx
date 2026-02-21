import { TEMPLATES } from "../data/templates";
<<<<<<< HEAD

export default function CoverPreview({
  selectedTemplate,
  generatedImage,
  loading,
}) {
  const template = TEMPLATES.find((t) => t.id === selectedTemplate);

  if (loading) {
    return <p>Generating cover...</p>;
  }

  return (
    <div className="preview">
      <h3>Preview</h3>

      {/*  If generated image exists → show it */}
      {generatedImage ? (
        <>
          <img src={generatedImage} alt="Generated Cover" />
          <br /><br />
          <a href={generatedImage} download>
            <button>Download</button>
          </a>
        </>
      ) : (
        /*  Else show selected template preview */
        <>
          <img src={template.thumbnail} alt={template.name} />
          <p style={{ marginTop: "10px", color: "#666" }}>
            Selected Template: {template.name}
          </p>
        </>
      )}
=======
import StyleControls from "./StyleControls";

export default function CoverPreview({
  generatedImage,
  loading,
  styleConfig,
  setStyleConfig,
  formData,
}) {
  const template = TEMPLATES.find(
    (t) => t.id === formData.templateId
  );

  if (loading) return <p>Generating cover...</p>;

  const overlayStyle = {
    color: styleConfig.textColor,
    textAlign: styleConfig.textAlign,
  };

  const backgroundStyle =
  styleConfig.backgroundType === "gradient"
    ? {
        background: `linear-gradient(135deg, ${styleConfig.backgroundColor}, ${styleConfig.gradientColor})`,
      }
    : {
        background: styleConfig.backgroundColor,
      };


  const handleDownload = async () => {
    const res = await fetch(generatedImage);
    const blob = await res.blob();

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "linkedin-cover.png";
    a.click();

    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="preview-panel">
    <div className="section-card">
      <h3 className="section-title">Preview</h3>

      <div className="preview-canvas" style={backgroundStyle}>
        {template && (
          <img src={template.thumbnail} alt={template.name} />
        )}

        {/* TEXT OVERLAY */}
        <div className="overlay"  style={{ textAlign: styleConfig.textAlign }}>
          {/* NAME */}
          <h1
            style={{
              color: styleConfig.name.color,
              fontSize: styleConfig.name.fontSize,
              background: styleConfig.name.backgroundColor,
              padding: "6px 12px",
              borderRadius: "6px",
              display: "inline-block",
            }}
          >
            {formData.name || "Your Name"}
          </h1>

          {/* ROLE */}
          <div
            className="role-badge"
            style={{
              color: styleConfig.role.color,
              fontSize: styleConfig.role.fontSize,
              background: styleConfig.role.backgroundColor,
            }}
          >
            {formData.role || "Your Role"}
          </div>

          {/* SKILLS */}
          <p
            className="skills"
            style={{
              color: styleConfig.skills.color,
            }}
          >
            {formData.skills || "Your Skills"}
          </p>
        </div>
      </div>

      {generatedImage && (
        <div>
         <button className="download-button" onClick={handleDownload}>
           Download
         </button>
        </div>
      )}

      <StyleControls
        styleConfig={styleConfig}
        setStyleConfig={setStyleConfig}
      />
    </div>
>>>>>>> feature/my-new-feature
    </div>
  );
}
