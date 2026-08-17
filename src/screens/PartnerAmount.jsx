import { useState } from "react";
import BackIcon from "../components/BackIcon";
import AmountField from "../components/AmountField";
import { getPartner, minOf, receivedFor, tierAmounts } from "../data/partners";
import { NEXT } from "../data/flows";

const QUICK = [140, 220, 550, 990, 1100];
const BALANCE = 2000;

const TERMS = `  1. อัตราการโอนคะแนน ทุก 600 M Point รับ 100 ROP Miles
  2. ผู้ที่จะโอนคะแนนเป็นไมล์จะต้องเป็นสมาชิกของ รอยัล ออร์คิด พลัส ก่อน หากท่านยังไม่ได้เป็นสมาชิกสามารถสมัคร และศึกษารายละเอียดเพิ่มเติมเกี่ยวกับไมล์สะสม รอยัล ออร์คิด พลัส ได้ที่ www.thaiairways.com/rop ไม่สามารถโอนคะแนนเป็นไมล์ให้ผู้อื่นได้
  3. ชื่อสมาชิก รอยัล ออร์คิดพลัส จะต้องเป็นชื่อและสกุลเดียวกันและสะกดตรงกับสมาชิกบัตร M Card
  4. คะแนนสะสม M Point จะถูกตัดทันทีหลังจากทำรายการเสร็จสมบูรณ์ และลูกค้าจะได้รับ ROP Miles ภายใน 7 วันทำการ
  5. เมื่อมีการแลกคะแนนสะสม M Point ไปเป็น ROP Miles แล้ว คะแนนสะสมที่แลกดังกล่าวจะไม่สามารถยกเลิกการทำรายการ เปลี่ยนแปลง หรือคิดเป็นเงินสดได้ ไม่ว่ากรณีใดๆ
  6. M Card และ ROP Miles ขอสงวนสิทธิ์ในการใช้ดุลยพินิจเพื่อตัดสิทธิ์การโอนคะแนนจากการกระทำใด ๆ ก็ตาม อันมีเหตุให้เชื่อได้ว่าเป็นพฤติกรรม และ/หรือกิจกรรม ฉ้อโกง หรือกิจกรรมอื่นใดที่ก่อให้เกิดอันตรายต่อโปรโมชั่นนี้หรือต่อบริษัท
  7. เงื่อนไขอื่นๆ ของการโอนคะแนนสะสม M Point เป็นไปตามที่บริษัทกำหนด และบริษัทขอสงวนสิทธิ์ในการเปลี่ยนแปลงเงื่อนไขโดยไม่ต้องแจ้งให้ทราบล่วงหน้า
  8. เงื่อนไขการแลกไมล์สะสม รอยัล ออร์คิดพลัส ให้เป็นไปตามกฎระเบียบของสายการบิน
  9. สอบถามข้อมูลเพิ่มเติมเกี่ยวกับคะแนนสะสม M Point ได้ที่ M Card Application หรือ M Card Call Center 02 789 5555
  10. สอบถามข้อมูลทั่วไปเกี่ยวกับ รอยัล ออร์คิด พลัส ติดต่อศูนย์บริการสมาชิกรอยัล ออร์คิด พลัส โทรศัพท์ 02-545-2000 เวลา 8.00-17.00 น. ทุกวัน ยกเว้นวันเสาร์-อาทิตย์ และวันหยุดราชการ หรือ www.thaiairways.com`;

export default function PartnerAmount({ go, back, params }) {
  const partner = getPartner(params.partnerId);
  const min = minOf(partner);
  const [amount, setAmount] = useState(params.amount ?? "");
  const [note, setNote] = useState(params.note ?? "");
  const [openTerms, setOpenTerms] = useState(false);

  const tiers = tierAmounts(partner);
  const received = receivedFor(partner, amount);

  return (
    <div className="screen">
      <div className="amount-chrome">
        <div className="nav-container">
          <div className="topnav topnav--plain">
            <div className="topnav__left">
              <button type="button" onClick={back} aria-label="ย้อนกลับ">
                <BackIcon />
              </button>
              <p className="topnav__title">โอนคะแนน {partner.name}</p>
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
        <div className="segmented" role="tablist">
          <button className="segmented__tab" role="tab" aria-selected="false" type="button">
            โอนคะแนนเข้า
          </button>
          <button className="segmented__tab" role="tab" aria-selected="true" type="button">
            โอนคะแนนออก
          </button>
        </div>

        <div className="route-row">
          <div className="route-row__parties">
            <div className="party-chip">
              <img src="/assets/party-mpoint.png" alt="" />
              <span>M Point</span>
            </div>
            <img className="route-row__arrow" src="/assets/arrow-right.svg" alt="ไปยัง" />
            <div className="party-chip">
              <img src={partner.chipLogo} alt="" />
              <span>{partner.unit}</span>
            </div>
          </div>
          <p className="route-row__rate">
            {partner.out ? partner.out.text : "ไฟล์ออกแบบยังไม่ได้ระบุอัตราโอนออกของพาร์ตเนอร์นี้"}
          </p>
        </div>

        <AmountField
          label="จำนวน M Point ที่ต้องการโอน"
          balance={BALANCE}
          max={BALANCE}
          min={min ?? undefined}
          tiers={tiers ?? undefined}
          value={amount}
          onChange={setAmount}
          quick={tiers ?? QUICK}
        >
          {received !== null && (
            <div className="conversion">
              <span className="conversion__approx">≈</span>
              <span className="conversion__value">{received.toLocaleString()}</span>
              <span className="conversion__unit">{partner.unit}</span>
            </div>
          )}
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
          <p className="terms__title">รายละเอียดและเงื่อนไข</p>
          <div className={`terms__clip${openTerms ? " terms__clip--open" : ""}`}>
            <p className="terms__body">{TERMS}</p>
            {!openTerms && <div className="terms__fade" />}
          </div>
          <button className="terms__more" type="button" onClick={() => setOpenTerms((v) => !v)}>
            {openTerms ? "ย่อ" : "ดูทั้งหมด"}
          </button>
        </div>
      </div>

      <div className="bottombar">
        <button
          className="btn btn--primary"
          type="button"
          disabled={!amount}
          onClick={() =>
            go(NEXT.partner.confirm, {
              kind: "partner",
              partnerId: partner.id,
              amount: String(Math.max(Number(amount) || 0, min ?? 0)),
              note,
            })
          }
        >
          ถัดไป
        </button>
      </div>
    </div>
  );
}
