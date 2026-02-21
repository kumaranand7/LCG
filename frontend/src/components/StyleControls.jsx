import { useState } from "react";

export default function StyleControls({ styleConfig, setStyleConfig }) {
  const [activeTab, setActiveTab] = useState("name");

  return (
    <div className="section-card">
      <h3 className="title">Colors & Style</h3>

      {/* TABS */}
      <div className="tabs">
        {["name", "role", "skills"].map((tab) => (
          <button
            key={tab}
            className={`tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {/* NAME TAB */}
      {activeTab === "name" && (
        <>
          <label className="form-label">Name Color</label>
          <input
            className="color-picker"
            type="color"
            value={styleConfig.name.color}
            onChange={(e) =>
              setStyleConfig({
                ...styleConfig,
                name: { ...styleConfig.name, color: e.target.value },
              })
            }
          />

          <label className="form-label">Name Background</label>
          <input
            className="color-picker"
            type="color"
            value={styleConfig.name.backgroundColor}
            onChange={(e) =>
              setStyleConfig({
                ...styleConfig,
                name: {
                  ...styleConfig.name,
                  backgroundColor: e.target.value,
                },
              })
            }
          />

          <label className="form-label">Name Size</label>
          <input
            type="range"
            min="28"
            max="60"
            value={styleConfig.name.fontSize}
            onChange={(e) =>
              setStyleConfig({
                ...styleConfig,
                name: {
                  ...styleConfig.name,
                  fontSize: Number(e.target.value),
                },
              })
            }
          />
        </>
      )}

      {/* ROLE TAB */}
      {activeTab === "role" && (
        <>
          <label className="form-label">Role Color</label>
          <input
            className="color-picker"
            type="color"
            value={styleConfig.role.color}
            onChange={(e) =>
              setStyleConfig({
                ...styleConfig,
                role: { ...styleConfig.role, color: e.target.value },
              })
            }
          />

          <label className="form-label">Role Background</label>
          <input
            className="color-picker"
            type="color"
            value={styleConfig.role.backgroundColor}
            onChange={(e) =>
              setStyleConfig({
                ...styleConfig,
                role: {
                  ...styleConfig.role,
                  backgroundColor: e.target.value,
                },
              })
            }
          />

          <label className="form-label">Role Size</label>
          <input
            type="range"
            min="14"
            max="30"
            value={styleConfig.role.fontSize}
            onChange={(e) =>
              setStyleConfig({
                ...styleConfig,
                role: {
                  ...styleConfig.role,
                  fontSize: Number(e.target.value),
                },
              })
            }
          />
        </>
      )}

      {/* SKILLS TAB */}
      {activeTab === "skills" && (
        <>
          <label className="form-label">Skills Color</label>
          <input
            className="color-picker"
            type="color"
            value={styleConfig.skills.color}
            onChange={(e) =>
              setStyleConfig({
                ...styleConfig,
                skills: {
                  ...styleConfig.skills,
                  color: e.target.value,
                },
              })
            }
          />
        </>
      )}
    </div>
  );
}