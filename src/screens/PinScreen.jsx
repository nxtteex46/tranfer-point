import { useEffect, useState } from "react";
import BackIcon from "../components/BackIcon";
import { NEXT } from "../data/flows";

const LENGTH = 6;

export default function PinScreen({ go, back, params }) {
  const [pin, setPin] = useState("");
  const kind = params.kind === "member" ? "member" : "partner";

  // ครบ 6 หลักแล้วไปหน้าสลิป (prototype ไม่ตรวจรหัสจริง)
  useEffect(() => {
    if (pin.length < LENGTH) return;
    const t = setTimeout(() => go(NEXT[kind].success, params), 220);
    return () => clearTimeout(t);
  }, [pin, go, kind, params]);

  const push = (digit) => setPin((p) => (p.length >= LENGTH ? p : p + digit));
  const pop = () => setPin((p) => p.slice(0, -1));

  return (
    <div className="screen">
      <div className="pin">
        <div className="pin__navrow">
          <button type="button" onClick={back} aria-label="ย้อนกลับ">
            <BackIcon />
          </button>
        </div>

        <div className="pin__head">
          <img className="pin__logo" src="/assets/mcard-app-icon.png" alt="M Card" />
          <p className="pin__title">กรอกรหัส M PIN</p>
          <p className="pin__sub">กรุณาระบุรหัส M PIN 6 หลัก ของคุณ</p>
          <div className="pin__dots" role="status" aria-label={`กรอกแล้ว ${pin.length} จาก ${LENGTH} หลัก`}>
            {Array.from({ length: LENGTH }).map((_, i) => (
              <span key={i} className={`pin__dot${i < pin.length ? " is-on" : ""}`} />
            ))}
          </div>
          <button className="pin__forgot" type="button">
            ลืม M PIN
          </button>
        </div>

        <div className="pin__pad">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
            <button className="pin__key" type="button" key={n} onClick={() => push(String(n))}>
              {n}
            </button>
          ))}
          <button className="pin__key" type="button" aria-label="สแกนลายนิ้วมือ">
            <img src="/assets/icon-fingerprint.png" alt="" />
          </button>
          <button className="pin__key" type="button" onClick={() => push("0")}>
            0
          </button>
          <button
            className="pin__key"
            type="button"
            aria-label="ลบ"
            disabled={pin.length === 0}
            onClick={pop}
          >
            <img src="/assets/icon-backspace.png" alt="" />
          </button>
        </div>
      </div>
    </div>
  );
}
