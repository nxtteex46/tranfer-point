import { useState } from "react";
import BackIcon from "../components/BackIcon";
import AmountField from "../components/AmountField";
import { NEXT } from "../data/flows";

const QUICK = [110, 220, 550, 990, 1100];
const BALANCE = 2000;
const MIN = 100;

const SENDER = {
  role: "ผู้โอน",
  initial: "น",
  bg: "#ddecf7",
  fg: "#14507a",
  name: "นวรุจ จินดานุรักษ์",
  card: "7102 3890 2475 0027",
};

const RECIPIENT = {
  role: "ผู้รับ",
  initial: "ป",
  bg: "#e7def5",
  fg: "#4b2e83",
  name: "ปาณิศา ปัญญวรรณ์",
  card: "7102 3890 2475 9989",
};

function Side({ party }) {
  return (
    <div className="parties__side">
      <p className="parties__role">{party.role}</p>
      <span className="parties__avatar" style={{ background: party.bg, color: party.fg }}>
        {party.initial}
      </span>
      <p className="parties__name">{party.name}</p>
      <p className="parties__card">{party.card}</p>
    </div>
  );
}

export default function MemberAmount({ go, back, params }) {
  const [amount, setAmount] = useState(params.amount ?? "");
  const [note, setNote] = useState(params.note ?? "");
  const recipient = params.recipient
    ? {
        ...RECIPIENT,
        ...params.recipient,
      }
    : RECIPIENT;

  return (
    <div className="screen">
      <div className="amount-chrome">
        <div className="nav-container">
          <div className="topnav topnav--plain">
            <div className="topnav__left">
              <button type="button" onClick={back} aria-label="ย้อนกลับ">
                <BackIcon />
              </button>
              <p className="topnav__title">โอนคะแนน M Point</p>
            </div>
          </div>
        </div>

        <div className="hero">
          <div className="hero__balance">
            <span className="hero__badge">
              <img src="/assets/m-badge.png" alt="" />
            </span>
            <div className="hero__figures">
              <div className="hero__amount">
                <b>{BALANCE.toLocaleString()}</b>
                <span>M Point</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sheet">
        <div className="parties">
          <Side party={SENDER} />
          <img className="parties__arrow" src="/assets/arrow-right-14.svg" alt="ไปยัง" />
          <Side party={recipient} />
        </div>

        <AmountField
          label="จำนวน M Point ที่ต้องการโอน"
          balance={BALANCE}
          max={BALANCE}
          min={MIN}
          value={amount}
          onChange={setAmount}
          quick={QUICK}
          hideHint
        >
          <p className="limits">โอนขั้นต่ำ 100 M Point · สูงสุด 10,000 M Point ต่อครั้ง</p>
        </AmountField>

        <div className="field">
          <div className="block__head">
            <span className="block__label">บันทึก</span>
            <span className="block__hint">{note.length}/40</span>
          </div>
          <input
            className="field__input"
            maxLength={40}
            placeholder="เพิ่มบันทึก"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            aria-label="บันทึก"
          />
        </div>

        <div className="terms">
          <p className="notice">
            สามารถแก้ไขชื่อบัญชีสมาชิก M Card ของผู้รับโอนคะแนน ระหว่างเดือน มกราคม - กุมภาพันธ์
            ของทุกปีเท่านั้น
          </p>
          <div className="conditions">
            <p className="conditions__title">เงื่อนไขการโอน</p>
            {[
              "โอนขั้นต่ำ 100 M Point",
              "โอนสูงสุด 10,000 M Point ต่อครั้ง",
              "เพิ่มเพื่อนได้สูงสุด 5 คน",
            ].map((item) => (
              <div className="conditions__item" key={item}>
                <img src="/assets/bullet.svg" alt="" />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <button className="terms-link" type="button">
            เงื่อนไขในการโอนคะแนน
          </button>
        </div>
      </div>

      <div className="bottombar">
        <button
          className="btn btn--primary"
          type="button"
          disabled={!amount}
          onClick={() => go(NEXT.member.confirm, {
              kind: "member",
              amount: String(Math.max(Number(amount) || 0, MIN)),
              note,
              recipient: params.recipient,
            })}
        >
          ยืนยัน
        </button>
      </div>
    </div>
  );
}
