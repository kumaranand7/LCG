import { useState } from "react";
import { SKILLS } from "../data/skillsData";

export default function CoverForm({ onGenerate, loading }) {
  const [form, setForm] = useState({
    name: "",
    role: "",
    skills: [],       // 👈 skills as array
    templateId: 1,
  });

  const [skillInput, setSkillInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Handle normal inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "templateId" ? Number(value) : value,
    });
  };

  // Handle skill typing + suggestions
  const handleSkillChange = (e) => {
    const value = e.target.value;
    setSkillInput(value);

    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    const filtered = SKILLS.filter(
      (skill) =>
        skill.toLowerCase().includes(value.toLowerCase()) &&
        !form.skills.includes(skill)
    );

    setSuggestions(filtered.slice(0, 5)); // max 5 suggestions
  };

  // Add skill (click or enter)
  const addSkill = (skill) => {
    if (form.skills.includes(skill)) return;

    setForm({
      ...form,
      skills: [...form.skills, skill],
    });

    setSkillInput("");
    setSuggestions([]);
  };

  // Enter key to add custom skill
  const handleSkillKeyDown = (e) => {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault();
      addSkill(skillInput.trim());
    }
  };

  // Remove skill
  const removeSkill = (skillToRemove) => {
    setForm({
      ...form,
      skills: form.skills.filter((s) => s !== skillToRemove),
    });
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      skills: form.skills.join(" | "), // backend-friendly
    };

    onGenerate(payload);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        placeholder="Your Name"
        value={form.name}
        onChange={handleChange}
      />

      <input
        name="role"
        placeholder="Your Role"
        value={form.role}
        onChange={handleChange}
      />

      {/* 🔥 Skill input with suggestions */}
      <div style={{ position: "relative" }}>
        <input
          placeholder="Type a skill and press Enter"
          value={skillInput}
          onChange={handleSkillChange}
          onKeyDown={handleSkillKeyDown}
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
            {suggestions.map((skill) => (
              <li
                key={skill}
                onClick={() => addSkill(skill)}
                style={{
                  padding: "8px",
                  cursor: "pointer",
                }}
              >
                {skill}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Skill tags */}
      <div style={{ marginBottom: "15px" }}>
        {form.skills.map((skill) => (
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
              onClick={() => removeSkill(skill)}
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

      <select
        name="templateId"
        value={form.templateId}
        onChange={handleChange}
      >
        <option value={1}>Template 1</option>
        <option value={2}>Template 2</option>
        <option value={3}>Template 3</option>
      </select>

      <button disabled={loading}>
        {loading ? "Generating..." : "Generate Cover"}
      </button>
    </form>
  );
}
