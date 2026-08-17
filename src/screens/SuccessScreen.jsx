import Slip from "../components/Slip";
import { slipFrom, TXN } from "../data/flows";

export default function SuccessScreen({ home, params }) {
  const slip = slipFrom(params);
  const art = params.theme ?? "/assets/slip-stage.png";

  return (
    <div className="screen">
      <div className="nav-container">
        <div className="topnav topnav--plain">
          <div className="topnav__left">
            <p className="topnav__title">สลิปการโอน</p>
          </div>
        </div>
      </div>

      <div className="screen__body">
        <div className="slip-stage">
          <img className="slip-stage__art" src={art} alt="" />
          <Slip
            variant="success"
            title="โอนคะแนนสำเร็จ"
            {...slip}
            rows={[
              { label: "วันที่ทำรายการ", value: TXN.date },
              { label: "หมายเลขอ้างอิง", value: TXN.ref },
              { label: "บันทึก", value: slip.note },
            ]}
          />
        </div>

        <div className="share-actions">
          <button className="share-btn" type="button">
            <img src="/assets/icon-share.svg" alt="" />
            แชร์
          </button>
          <button className="share-btn" type="button">
            <img src="/assets/icon-download.svg" alt="" />
            บันทึกรูป
          </button>
        </div>
      </div>

      <div className="bottombar">
        <button className="btn btn--primary" type="button" onClick={home}>
          กลับหน้าหลัก
        </button>
      </div>
    </div>
  );
}
