import { useEffect, useState } from "react";
import BackIcon from "../components/BackIcon";
import { PARTNERS } from "../data/partners";

const PROMOS = [
  { img: "/assets/promo-1.png", date: "วันที่ 13 ก.พ. 69" },
  { img: "/assets/promo-2.png", date: "วันที่ 13 ก.พ. 69" },
  { img: "/assets/promo-3.png", date: "วันที่ 7 ม.ค. – 31 ธ.ค. 69" },
  { img: "/assets/promo-4.png", date: "วันที่ 7 ม.ค. – 31 ธ.ค. 69" },
];

export default function TransferPoint({ go }) {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("card");

  const openFriendTab = () => {
    if (activeTab === "friend") return;
    setActiveTab("friend");
    window.setTimeout(() => go("member-friends"), 180);
  };

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
            <BackIcon />
            <p className="topnav__title">โอนคะแนน M Point</p>
          </div>
          <button className="pillbtn" type="button">
            <img src="/assets/icon-history.svg" alt="" width={16} height={16} />
            <span>ประวัติ</span>
          </button>
        </div>
      </div>

      <div className="main-content">
        <div className={`tabs tabs--${activeTab}`} role="tablist">
          <button className="tabs__item" role="tab" aria-selected={activeTab === "card"} type="button">
            โอนคะแนน จากบัตร
          </button>
          <button
            className="tabs__item"
            role="tab"
            aria-selected={activeTab === "friend"}
            type="button"
            onClick={openFriendTab}
          >
            โอนคะแนนให้เพื่อน
          </button>
        </div>

        <div className="sections">
          <div className="banner">
            <img src="/assets/banner.png" alt="โอนคะแนนเป็น M Point" />
          </div>

          <div className="section">
            <p className="section__title">บัตรสมาชิก</p>
            <div className="partner-rows">
              {PARTNERS.map((p) => (
                <button
                  key={p.id}
                  className="partner-row"
                  type="button"
                  onClick={() => go("partner-amount", { partnerId: p.id })}
                >
                  <span className="partner-row__logo">
                    <img src={p.listLogo} alt={p.name} className={p.listFit ?? "cover"} />
                  </span>
                  <span className="partner-row__body">
                    <span className="partner-row__name">{p.name}</span>
                    <span className="partner-row__rate">{p.listRate}</span>
                  </span>
                  <img
                    className="partner-row__chevron"
                    src="/assets/icon-chevron.svg"
                    alt=""
                    width={24}
                    height={24}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="section">
            <p className="section__title">โปรโมชันโอนคะแนน</p>
            <div className="promo-carousel">
              {PROMOS.map((promo, i) => (
                <div className="promo-card" key={i}>
                  <div className="promo-card__image">
                    <img src={promo.img} alt="" />
                  </div>
                  <p className="promo-card__date">{promo.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
