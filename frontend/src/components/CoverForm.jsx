import TemplateSelector from "./TemplateSelector";
import SkillInput from "./SkillInput";
import SkillTags from "./SkillTags";
import { useSkills } from "../hooks/useSkills";
import Swal from "sweetalert2";
import { useEffect } from "react";

export default function CoverForm({
  form,
  setForm,
  styleConfig,
  onGenerate,
  loading,
}) {
  const {
  skills,
  skillInput,
  suggestions,
  activeIndex,
  handleSkillChange,
  handleKeyDown,
  addSkill,
  removeSkill,
    } = useSkills([], (updatedSkills) => {
      setForm((prev) => ({
        ...prev,
        skills: updatedSkills.join(" | "),
      }));
    });

    useEffect(() => {
      const combinedSkills = [
        ...skills,
        ...(skillInput ? [skillInput] : []),
      ];

      setForm((prev) => ({
        ...prev,
        skills: combinedSkills.join(" | "),
      }));
    }, [skillInput, skills, setForm]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "templateId" ? Number(value) : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Name Required",
        text: "Please enter your name",
      });
      return;
    }

    if (!form.role.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Role Required",
        text: "Please enter your role",
      });
      return;
    }

    if (skills.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Skills Required",
        text: "Please add at least one skill",
      });
      return;
    }

    const updatedForm = {
      ...form,
      skills: skills.join(" | "),
    };

    setForm(updatedForm);

    onGenerate({
      ...updatedForm,
      style: styleConfig,
    });
  };

  return (
    <form className="section-card" onSubmit={handleSubmit}>
      <h2 className="section-title">Create Your Cover</h2>

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

      <SkillInput
        value={skillInput}
        suggestions={suggestions}
        activeIndex={activeIndex}
        onChange={handleSkillChange}
        onKeyDown={handleKeyDown}
        onSelect={addSkill}
      />

      <SkillTags skills={skills} onRemove={removeSkill} />

      <TemplateSelector
        selected={form.templateId}
        onSelect={(id) =>
          setForm({ ...form, templateId: id })
        }
      />

      <button disabled={loading}>
        {loading ? "Generating..." : "Generate Cover"}
      </button>
    </form>
  );
}