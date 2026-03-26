import { useState } from "react";
import { SKILLS } from "../data/skillsData";

export function useSkills(initialSkills = [], onSkillsChange) {
  const [skills, setSkills] = useState(initialSkills);
  const [skillInput, setSkillInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);

  const updateSkills = (newSkills) => {
    setSkills(newSkills);

    if (onSkillsChange) {
      onSkillsChange(newSkills);
    }
  };

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
        !skills.includes(skill)
    );

    setSuggestions(filtered.slice(0, 5));
  };

  const addSkill = (skill) => {
    if (!skill || skills.includes(skill)) return;

    const updated = [...skills, skill];

    updateSkills(updated);
    setSkillInput("");
    setSuggestions([]);
    setActiveIndex(-1);
  };

  const removeSkill = (skillToRemove) => {
    const updated = skills.filter((s) => s !== skillToRemove);

    updateSkills(updated);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (activeIndex >= 0 && suggestions[activeIndex]) {
        addSkill(suggestions[activeIndex]);
        return;
      }

      if (skillInput.trim()) {
        addSkill(skillInput.trim());
      }
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : -1));
    }
  };

  return {
    skills,
    skillInput,
    suggestions,
    activeIndex,
    handleSkillChange,
    handleKeyDown,
    addSkill,
    removeSkill,
  };
}