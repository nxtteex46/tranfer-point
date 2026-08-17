import { useState } from "react";

/**
 * ช่องกรอกจำนวนแบบไม่มีกรอบ ตาม Figma node 5225:1217
 * สถานะสื่อด้วย เส้นใต้ + สีตัวเลข + ปุ่ม −/+ เท่านั้น
 *
 *   default  เส้นใต้ 1px #E6E6E6 · placeholder 0 เทาอ่อน · ไม่มีปุ่ม
 *   focus    เส้นใต้ 2px #111111 · label เข้ม · ปุ่ม −/+ โผล่
 *   filled   เส้นใต้ 1px เทา · ปุ่มหายเมื่อออกจากช่อง
 *   error    เส้นใต้ 2px #D32F2F · helper แดง · ปุ่ม + ปิด
 *
 * ยอดขั้นต่ำไม่ใช่ error — บอกด้วย helper สีเทา และปัดขึ้นให้อัตโนมัติ
 * เมื่อผู้ใช้ออกจากช่อง (ปัดตอนพิมพ์ไม่ได้ เพราะจะพิมพ์เลขหลายหลักไม่ได้)
 */
const isFilledLike = (v) => v !== "" && v !== null && v !== undefined;

export default function AmountField({
  label,
  balance,
  value,
  onChange,
  unit = "M Point",
  step = 10,
  max,
  min,
  tiers,
  quick = [],
  children,
  hideHint = false,
}) {
  const [focused, setFocused] = useState(false);
  const [bumped, setBumped] = useState(false);

  const num = Number(value) || 0;
  const display = isFilledLike(value) ? num.toLocaleString("en-US") : value;
  const isEmpty = !isFilledLike(value);
  const overMax = max != null && num > max;
  const selectableTiers = tiers
    ? tiers.filter((tier) => max == null || tier <= max)
    : null;
  const lastSelectableTier = selectableTiers?.[selectableTiers.length - 1] ?? null;
  const atZero = num <= 0;
  const atMax = tiers
    ? lastSelectableTier != null && num >= lastSelectableTier
    : max != null && num >= max;

  const state = overMax ? "error" : focused ? "focus" : isEmpty ? "default" : "filled";
  const showSteppers = focused || overMax;

  // ปัดเข้าอัตราที่ใกล้ที่สุด (เสมอกันให้ปัดขึ้น)
  const snap = (n, options = tiers) =>
    options.reduce((best, t) =>
      Math.abs(t - n) < Math.abs(best - n) || (Math.abs(t - n) === Math.abs(best - n) && t > best)
        ? t
        : best
    );

  const setNum = (next) => {
    setBumped(false);
    const capped = max == null ? next : Math.min(next, max);
    onChange(String(Math.max(0, capped)));
  };

  // −/+ เดินทีละขั้นของอัตรา ถ้าพาร์ตเนอร์คิดเป็นขั้น
  const stepBy = (dir) => {
    setBumped(false);
    if (tiers) {
      const options = selectableTiers?.length ? selectableTiers : tiers;
      const i = options.indexOf(num);
      const next =
        i === -1
          ? dir > 0 && num <= 0
            ? options[0]
            : snap(num, options)
          : options[Math.min(Math.max(i + dir, 0), options.length - 1)];
      onChange(String(next));
      return;
    }
    setNum(num + dir * step);
  };

  const handleBlur = () => {
    setFocused(false);
    if (isEmpty) return;
    if (tiers) {
      const options = selectableTiers?.length ? selectableTiers : tiers;
      const snapped = snap(num, options);
      if (snapped !== num) {
        onChange(String(snapped));
        setBumped(true);
      }
      return;
    }
    // กรอกไม่ถึงขั้นต่ำ → ปัดขึ้นให้เป็นขั้นต่ำ
    if (min != null && num < min) {
      onChange(String(min));
      setBumped(true);
    }
  };

  return (
    <div className="amount">
      <div className="amount__head">
        <span className={`amount__label${state === "focus" || state === "error" ? " is-strong" : ""}`}>
          {label}
        </span>
        <span className="amount__balance">ใช้ได้ {balance.toLocaleString()}</span>
      </div>

      <div className="amount__entry">
        <div className="amount__value">
          <input
            className={`amount__input${isEmpty ? " is-placeholder" : ""}`}
            inputMode="numeric"
            value={display}
            placeholder="0"
            onFocus={() => {
              setFocused(true);
              setBumped(false);
            }}
            onBlur={handleBlur}
            onChange={(e) => {
              setBumped(false);
              onChange(e.target.value.replace(/[^\d]/g, ""));
            }}
            aria-label={label}
            aria-invalid={overMax}
            size={Math.max(String(display || "0").length, 1)}
          />
          <span className="amount__unit">{unit}</span>
        </div>

        {showSteppers && (
          <>
            <button
              className="stepper"
              type="button"
              aria-label="ลดจำนวน"
              disabled={atZero}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => stepBy(-1)}
            >
              <img src="/assets/icon-minus.svg" alt="" />
            </button>
            <button
              className="stepper"
              type="button"
              aria-label="เพิ่มจำนวน"
              disabled={overMax || atMax}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => stepBy(1)}
            >
              <img src="/assets/icon-plus.svg" alt="" />
            </button>
          </>
        )}
      </div>

      <div className={`amount__rule is-${state}`} />

      {children}

      {overMax ? (
        <p className="amount__helper">
          คะแนนไม่พอ โอนได้สูงสุด {max.toLocaleString()} {unit}
        </p>
      ) : (
        !hideHint && (tiers || min != null) && (
          <p className="amount__helper amount__helper--hint" aria-live="polite">
            {bumped
              ? tiers
                ? `ปรับเป็น ${num.toLocaleString()} ${unit} ซึ่งเป็นอัตราที่โอนได้`
                : `ปรับเป็นยอดขั้นต่ำ ${min.toLocaleString()} ${unit} ให้แล้ว`
              : tiers
                ? `โอนได้เฉพาะอัตราที่กำหนด เริ่มที่ ${tiers[0].toLocaleString()} ${unit}`
                : `โอนขั้นต่ำ ${min.toLocaleString()} ${unit}`}
          </p>
        )
      )}

      {quick.length > 0 && (
        <div className="quick">
          {quick.map((q) => {
            const disabled = max != null && q > max;

            return (
              <button
                key={q}
                className="quick__chip"
                type="button"
                aria-pressed={num === q}
                disabled={disabled}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => setNum(q)}
              >
                {q.toLocaleString()}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
