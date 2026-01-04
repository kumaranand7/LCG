import { TEMPLATES } from "../data/templates";

export default function TemplateSelector({ selected, onSelect }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <h4>Select Template</h4>

      <div style={{ display: "flex", gap: "15px" }}>
        {TEMPLATES.map((tpl) => (
          <div
            key={tpl.id}
            onClick={() => onSelect(tpl.id)}
            style={{
              border:
                selected === tpl.id
                  ? "3px solid #03989e"
                  : "1px solid #ccc",
              borderRadius: "8px",
              padding: "5px",
              cursor: "pointer",
              width: "140px",
              textAlign: "center",
            }}
          >
            <img
              src={tpl.thumbnail}
              alt={tpl.name}
              style={{ width: "100%", borderRadius: "6px" }}
            />
            <p style={{ fontSize: "13px", marginTop: "6px" }}>
              {tpl.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
