export default function SkillTags({ skills, onRemove }) {
  return (
    <div style={{ marginBottom: "15px" }}>
      {skills.map((skill) => (
        <span
          key={skill}
          style={{
            display: "inline-block",
            background: "#03989e",
            color: "white",
            padding: "6px 10px",
            borderRadius: "15px",
            margin: "5px",
            fontSize: "13px",
          }}
        >
          {skill}
          <span
            onClick={() => onRemove(skill)}
            style={{
              marginLeft: "8px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            ×
          </span>
        </span>
      ))}
    </div>
  );
}