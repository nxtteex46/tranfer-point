import { useEffect, useState } from "react";
import BackIcon from "../components/BackIcon";

export default function MemberFriends({ back }) {
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
          </div>

          <div className="friends-empty">
            <div className="friends-empty__image">
              <img src="/assets/empty-member-friends.png" alt="" />
            </div>
            <div className="friends-empty__copy">
              <p className="friends-empty__title">ยังไม่มีสมาชิก</p>
              <p className="friends-empty__description">
                เพิ่มผู้รับโอนได้สูงสุด 5 คนต่อปี
                <br />
                และเปลี่ยนรายชื่อได้เฉพาะช่วงเดือน ม.ค.–ก.พ.
              </p>
            </div>
            <button className="friends-empty__button" type="button">
              เพิ่มสมาชิก
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
