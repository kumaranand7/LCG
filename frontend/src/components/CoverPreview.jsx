import { TEMPLATES } from "../data/templates";

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
    </div>
  );
}
