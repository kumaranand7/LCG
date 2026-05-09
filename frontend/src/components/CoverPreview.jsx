import { TEMPLATES } from "../data/templates";
import StyleControls from "./StyleControls";
import Swal from "sweetalert2";

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

//functioin for file name
 const formatFileName = (text) => {
  return text
    ?.trim()
    .split(" ") 
    .filter(Boolean)
    .map(
      (word) =>
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join("_") 
    .replace(/[^A-Za-z0-9_]/g, ""); 
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
  try {
    const res = await fetch(generatedImage);
    const blob = await res.blob();

    const url = window.URL.createObjectURL(blob);

    const name = formatFileName(formData.name) || "User";

    const a = document.createElement("a");
    a.href = url;
    a.download = `${name}_Cover.png`;
    a.click();

    window.URL.revokeObjectURL(url);

    //  SweetAlert success
    Swal.fire({
      icon: "success",
      title: "Cover Downloaded!",
      text: "Your file has been downloaded successfully",
      timer: 2000,
      confirmButtonColor: "#2563eb",
    });

  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Download Failed",
      text: "Something went wrong. Please try again.",
    });
  }
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
              fontFamily: styleConfig.name.fontFamily,
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
    </div>
  );
}
