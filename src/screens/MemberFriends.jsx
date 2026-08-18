import { useEffect, useState } from "react";
import BackIcon from "../components/BackIcon";

const DEFAULT_MEMBER = {
  alias: "เชอ",
  name: "ปาณิศา ปัญจวรณ์",
  card: "7102  3890  2475  9989",
};

export default function MemberFriends({ go, back, home, params }) {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("friend");
  const [isAliasSheetOpen, setIsAliasSheetOpen] = useState(false);
  const [aliasName, setAliasName] = useState(params?.aliasName || "");
  const [aliasDraft, setAliasDraft] = useState("");
  const hasMember = Boolean(params?.hasMember);
  const member = params?.recipient
    ? {
        alias: aliasName || "ตั้งชื่อช่วยจำ",
        name: params.recipient.name,
        card: params.recipient.card?.replaceAll(" ", "  ") ?? DEFAULT_MEMBER.card,
      }
    : DEFAULT_MEMBER;

  const openAliasSheet = (event) => {
    event.stopPropagation();
    setAliasDraft(aliasName);
    setIsAliasSheetOpen(true);
  };

  const saveAlias = () => {
    const nextAlias = aliasDraft.trim();
    setIsAliasSheetOpen(false);
    if (!nextAlias) return;
    setAliasName(nextAlias);
  };

  const openCardTab = () => {
    if (activeTab === "card") return;
    setActiveTab("card");
    window.setTimeout(() => home(), 180);
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
        <div className={`tabs tabs--${activeTab}`} role="tablist">
          <button
            className="tabs__item"
            role="tab"
            aria-selected={activeTab === "card"}
            type="button"
            onClick={openCardTab}
          >
            โอนคะแนน จากบัตร
          </button>
          <button className="tabs__item" role="tab" aria-selected={activeTab === "friend"} type="button">
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
            {hasMember && (
              <button className="add-friend-btn" type="button" onClick={() => go("member-add")}>
                <img src="/assets/icon-user-add.svg" alt="" />
                <span>เพิ่มเพื่อน (1/5)</span>
              </button>
            )}
          </div>

          {hasMember ? (
            <button
              className="friend-row"
              type="button"
              onClick={() => go("member-amount", { recipient: params?.recipient })}
            >
              <img className="friend-row__avatar" src="/assets/friend-panisa.png" alt="" />
              <span className="friend-row__body">
                <span className="friend-row__alias">
                  <span>{member.alias}</span>
                  <button
                    className="friend-row__edit"
                    type="button"
                    aria-label="ตั้งชื่อช่วยจำ"
                    onClick={openAliasSheet}
                  >
                    <img src="/assets/icon-edit.svg" alt="" />
                  </button>
                </span>
                <span className="friend-row__name">{member.name}</span>
                <span className="friend-row__card">{member.card}</span>
              </span>
              <img className="friend-row__arrow" src="/assets/icon-chevron.svg" alt="" />
            </button>
          ) : (
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
              <button className="friends-empty__button" type="button" onClick={() => go("member-add")}>
                เพิ่มสมาชิก
              </button>
            </div>
          )}
        </section>
      </div>

      {isAliasSheetOpen && (
        <div
          className="bottom-sheet-backdrop"
          role="presentation"
          onClick={() => setIsAliasSheetOpen(false)}
        >
          <div
            className="bottom-sheet alias-sheet"
            role="dialog"
            aria-modal="true"
            aria-labelledby="alias-sheet-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="bottom-sheet__handle" />
            <div className="bottom-sheet__head">
              <button
                className="bottom-sheet__close"
                type="button"
                aria-label="ปิด"
                onClick={() => setIsAliasSheetOpen(false)}
              />
              <h2 id="alias-sheet-title">ตั้งชื่อช่วยจำ</h2>
            </div>
            <div className="bottom-sheet__body alias-sheet__body">
              <label className="alias-sheet__field">
                <span>ชื่อช่วยจำ</span>
                <input
                  className="field__input"
                  maxLength={20}
                  value={aliasDraft}
                  placeholder="ตั้งชื่อช่วยจำ"
                  onChange={(event) => setAliasDraft(event.target.value)}
                  autoFocus
                />
              </label>
              <button
                className="btn btn--primary"
                type="button"
                disabled={!aliasDraft.trim()}
                onClick={saveAlias}
              >
                บันทึก
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
