import { useEffect, useState } from "react";
import BackIcon from "../components/BackIcon";

export default function MemberFriends({ go, back }) {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const updateScrolled = () => setHasScrolled(window.scrollY > 0);

    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });
    return () => window.removeEventListener("scroll", updateScrolled);
  }, []);

  return (
    <div className="screen">
      <div className="header-bg" />

      <div className={`nav-container nav-container--sticky${hasScrolled ? " is-scrolled" : ""}`}>
        <div className="topnav">
          <div className="topnav__left">
            <button type="button" onClick={back} aria-label="ย้อนกลับ">
              <BackIcon />
            </button>
            <p className="topnav__title">โอนคะแนน M Point</p>
          </div>
          <button className="pillbtn" type="button">
            <img src="/assets/icon-history.svg" alt="" width={16} height={16} />
            <span>ประวัติ</span>
          </button>
        </div>
      </div>

      <div className="main-content member-friends">
        <div className="tabs" role="tablist">
          <button
            className="tabs__item"
            role="tab"
            aria-selected="false"
            type="button"
            onClick={back}
          >
            โอนคะแนน จากบัตร
          </button>
          <button className="tabs__item" role="tab" aria-selected="true" type="button">
            โอนคะแนนให้เพื่อน
          </button>
        </div>

        <div className="friend-info">
          <div className="friend-notice">
            สามารถแก้ไขชื่อบัญชีสมาชิก M Card ของผู้รับโอนคะแนน ระหว่าง เดือน มกราคม -
            กุมภาพันธ์ ของทุกปีปฏิทิน
          </div>
          <p className="friend-info__title">เงื่อนไขในการโอนคะแนน</p>
        </div>

        <section className="friends-section">
          <div className="friends-section__head">
            <h2>เพื่อน M Card</h2>
            <button className="add-friend-btn" type="button">
              <img src="/assets/icon-user-add.svg" alt="" />
              <span>เพิ่มเพื่อน (1/5)</span>
            </button>
          </div>

          <button className="friend-row" type="button" onClick={() => go("member-amount")}>
            <img className="friend-row__avatar" src="/assets/friend-panisa.png" alt="" />
            <span className="friend-row__body">
              <span className="friend-row__alias">
                <span>เชอ</span>
                <img src="/assets/icon-edit.svg" alt="" />
              </span>
              <span className="friend-row__name">ปาณิศา ปัญจวรณ์</span>
              <span className="friend-row__card">7102&nbsp;&nbsp;3890&nbsp;&nbsp;2475&nbsp;&nbsp;0027</span>
            </span>
            <img className="friend-row__arrow" src="/assets/icon-chevron.svg" alt="" />
          </button>
        </section>
      </div>
    </div>
  );
}
