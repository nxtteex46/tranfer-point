import { useState } from "react";

const THEMES = [
  { id: "default", label: "ค่าเริ่มต้น", art: "/assets/slip-stage.png" },
  { id: "mcard", label: "M Card แดง", art: "/assets/theme-2.png" },
  { id: "pastel", label: "พาสเทล", art: "/assets/theme-3.png" },
  { id: "summer", label: "ซัมเมอร์", art: "/assets/theme-4.png" },
  { id: "blackgold", label: "ดำทอง", art: "/assets/theme-5.png" },
  { id: "whitegold", label: "ขาวทอง", art: "/assets/theme-6.png" },
];

export { THEMES };

export default function ThemePicker({ value, onChange }) {
  const [internal, setInternal] = useState(THEMES[0].id);
  const selected = value ?? internal;

  const pick = (id) => {
    setInternal(id);
    onChange?.(id);
  };

  return (
    <div className="theme-picker">
      <div className="theme-cells">
        {THEMES.map((theme) => (
          <button
            key={theme.id}
            className="theme-cell"
            type="button"
            aria-pressed={selected === theme.id}
            aria-label={theme.label}
            onClick={() => pick(theme.id)}
          >
            <img className="theme-cell__art" src={theme.art} alt="" />
            {selected === theme.id && (
              <img className="theme-cell__badge" src="/assets/check-badge.svg" alt="" />
            )}
          </button>
        ))}
      </div>
      <p className="theme-hint">แตะเลือกลายที่ต้องการ</p>
    </div>
  );
}
