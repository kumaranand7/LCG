import { useEffect } from "react";

export default function SkillInput({
  value,
  suggestions,
  activeIndex,
  onChange,
  onKeyDown,
  onSelect,
}) {
  useEffect(() => {
    const activeItem = document.querySelector(".active-skill");
    if (activeItem) {
      activeItem.scrollIntoView({
        block: "nearest",
      });
    }
  }, [activeIndex]);

  return (
    <div style={{ position: "relative" }}>
      {/* INPUT */}
      <input
        placeholder="Type a skill and press Enter"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          outline: "none",
        }}
      />

      {/* SUGGESTIONS */}
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
            marginTop: "4px",
          }}
        >
          {suggestions.map((skill, index) => (
            <li
              key={skill}
              onClick={() => onSelect(skill)}
              className={index === activeIndex ? "active-skill" : ""}
              style={{
                padding: "8px",
                cursor: "pointer",
                background:
                  index === activeIndex ? "#e6f7f8" : "white",
                borderRadius: "4px",
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