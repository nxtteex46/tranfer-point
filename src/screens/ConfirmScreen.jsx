import { useState } from "react";
import BackIcon from "../components/BackIcon";
import Slip from "../components/Slip";
import ThemePicker, { THEMES } from "../components/ThemePicker";
import { slipFrom, NEXT } from "../data/flows";

export default function ConfirmScreen({ go, back, params }) {
  const [theme, setTheme] = useState(THEMES[0].id);
  const art = THEMES.find((t) => t.id === theme)?.art ?? THEMES[0].art;
  const slip = slipFrom(params);
  const kind = params.kind === "member" ? "member" : "partner";

  return (
    <div className="screen">
      <div className="nav-container">
        <div className="topnav topnav--plain">
          <div className="topnav__left">
            <button type="button" onClick={() => back(params)} aria-label="ย้อนกลับ">
              <BackIcon />
            </button>
            <p className="topnav__title">ตรวจสอบข้อมูลการโอน</p>
          </div>
        </div>
      </div>

      <div className="screen__body">
        <div className="slip-stage">
          <img className="slip-stage__art" src={art} alt="" />
          <Slip
            variant="confirm"
            title="ตรวจสอบข้อมูลการโอน"
            subtitle="หากยืนยันแล้ว จะไม่สามารถเปลี่ยนแปลงได้"
            {...slip}
            rows={[
              { label: "วันที่ทำรายการ", value: "-" },
              { label: "หมายเลขอ้างอิง", value: "-" },
              { label: "บันทึก", value: slip.note },
            ]}
          />
        </div>

        <ThemePicker value={theme} onChange={setTheme} />
      </div>

      <div className="bottombar">
        <button className="btn btn--ghost" type="button" onClick={() => back(params)}>
          แก้ไข
        </button>
        <button
          className="btn btn--primary"
          type="button"
          onClick={() => go(NEXT[kind].pin, { ...params, theme: art })}
        >
          ต่อไป
        </button>
      </div>
    </div>
  );
}
