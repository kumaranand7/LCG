export default function SkillInput({
  value,
  suggestions,
  activeIndex,
  onChange,
  onKeyDown,
  onSelect,
}) {
  return (
    <div style={{ position: "relative" }}>
      <input
        placeholder="Type a skill and press Enter"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />

      {suggestions.length > 0 && (
        <ul
          style={{
            listStyle: "none",
            padding: "5px",
            margin: 0,
            position: "absolute",
            background: "white",
            border: "1px solid #ccc",
            width: "100%",
            zIndex: 10,
            borderRadius: "6px",
            maxHeight: "150px",
            overflowY: "auto",
          }}
        >
          {suggestions.map((skill, index) => (
            <li
              key={skill}
              onClick={() => onSelect(skill)}
              style={{
                padding: "8px",
                cursor: "pointer",
                background: index === activeIndex ? "#e6f7f8" : "white",
              }}
            >
              {skill}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}