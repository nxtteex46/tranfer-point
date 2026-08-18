import { useMemo, useState } from "react";
import BackIcon from "../components/BackIcon";

const RESULTS = [
  { id: "9989", name: "ปาณิศา ปัญจวรณ์", card: "M Card  7102 •••• •••• 9989" },
  { id: "0071", name: "ปาณิศา ปัญจวรณ์", card: "M Card  7102 •••• •••• 0071" },
];

const normalizeMemberQuery = (value) => value.replace(/\D/g, "");
const formatPhoneQuery = (value) => {
  const digits = normalizeMemberQuery(value).slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
};

function SearchActions({ onMany, onFound }) {
  return (
    <>
      <div className="member-add__divider">
        <span />
        <p>หรือค้นหาสมาชิกด้วยวิธีอื่น</p>
        <span />
      </div>
      <div className="member-add__actions">
        <button className="member-add__action" type="button" onClick={onFound}>
          <img src="/assets/icon-qr-code.png" alt="" />
          <span>สแกน QR Code</span>
        </button>
        <button className="member-add__action" type="button" onClick={onMany}>
          <img src="/assets/icon-contact-book.png" alt="" />
          <span>ค้นหาในรายชื่อ</span>
        </button>
      </div>
    </>
  );
}

function MemberCard({ member, selected, onSelect, selectable = true }) {
  return (
    <button
      className="member-result__card"
      type="button"
      onClick={selectable ? onSelect : undefined}
      aria-pressed={selected}
    >
      <span className="member-result__copy">
        <span className="member-result__name">{member.name}</span>
        <span className="member-result__number">{member.card}</span>
      </span>
      {selectable && <span className="member-result__radio" aria-hidden="true" />}
    </button>
  );
}

export default function AddMember({ go, back }) {
  const [query, setQuery] = useState("");
  const [resultMode, setResultMode] = useState("idle");
  const [selectedId, setSelectedId] = useState(RESULTS[0].id);
  const trimmedQuery = query.trim();
  const normalizedQuery = normalizeMemberQuery(trimmedQuery);
  const hasQuery = normalizedQuery.length > 0;
  const canSearch = normalizedQuery.length === 10;
  const foundMembers = useMemo(() => {
    if (resultMode === "many") return RESULTS;
    if (resultMode === "found") return [RESULTS[0]];
    return [];
  }, [resultMode]);
  const canAdd = foundMembers.length > 0 && selectedId;

  const searchMember = () => {
    if (!canSearch) return;
    if (normalizedQuery === "0948609935") {
      setResultMode("found");
    } else if (normalizedQuery === "0932495247") {
      setResultMode("many");
    } else {
      setResultMode("not-found");
    }
    setSelectedId(RESULTS[0].id);
  };

  const showMany = () => {
    setQuery(formatPhoneQuery("0932495247"));
    setResultMode("many");
    setSelectedId(RESULTS[0].id);
  };

  const showFound = () => {
    setQuery(formatPhoneQuery("0948609935"));
    setResultMode("found");
    setSelectedId(RESULTS[0].id);
  };

  return (
    <div className="screen member-add-screen">
      <div className="header-bg" />

      <div className="nav-container">
        <div className="topnav topnav--plain">
          <div className="topnav__left">
            <button type="button" onClick={back} aria-label="ย้อนกลับ">
              <BackIcon />
            </button>
            <p className="topnav__title">เพิ่มสมาชิก</p>
          </div>
        </div>
      </div>

      <div className="member-add">
        <div className="member-add__form">
          <div className="member-add__field">
            <p className="member-add__label">เบอร์โทรศัพท์หรือหมายเลข M Card</p>
            <span className={`member-add__input-wrap${hasQuery ? " is-active" : ""}`}>
              <input
                value={query}
                onChange={(e) => {
                  setQuery(formatPhoneQuery(e.target.value));
                  setResultMode("idle");
                }}
                placeholder="กรุณากรอกเบอร์โทรศัพท์หรือหมายเลข M Card"
                inputMode="numeric"
              />
              {!hasQuery && (
                <button className="member-add__search" type="button" disabled>
                  ค้นหา
                </button>
              )}
              {hasQuery && resultMode !== "idle" && (
                <button
                  className="member-add__clear"
                  type="button"
                  aria-label="ล้างข้อมูล"
                  onClick={() => {
                    setQuery("");
                    setResultMode("idle");
                  }}
                >
                  <img src="/assets/icon-input-clear.png" alt="" />
                </button>
              )}
              {hasQuery && resultMode === "idle" && (
                <button
                  className={`member-add__search${canSearch ? " is-ready" : ""}`}
                  type="button"
                  disabled={!canSearch}
                  onClick={searchMember}
                >
                  ค้นหา
                </button>
              )}
            </span>
          </div>

          <SearchActions onMany={showMany} onFound={showFound} />
        </div>

        {resultMode === "not-found" && (
          <div className="member-not-found">
            <div className="member-not-found__image">
              <img src="/assets/empty-member-not-found.png" alt="" />
            </div>
            <p className="member-not-found__title">ไม่พบสมาชิก</p>
            <p className="member-not-found__description">ไม่พบ</p>
          </div>
        )}

        {foundMembers.length > 0 && (
          <div className="member-result">
            <div className="member-result__head">
              <img src="/assets/icon-member-found.png" alt="" />
              <span>พบสมาชิก M Card</span>
            </div>
            <div className="member-result__list">
              {foundMembers.map((member) => (
                <MemberCard
                  key={member.id}
                  member={member}
                  selected={selectedId === member.id}
                  selectable={foundMembers.length > 1}
                  onSelect={() => setSelectedId(member.id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="bottombar member-add__bar">
        {foundMembers.length > 0 && (
          <p className="member-add__confirm-note">กรุณาตรวจสอบชื่อสมาชิกให้ถูกต้องก่อนดำเนินการ</p>
        )}
        <button
          className="btn btn--primary"
          type="button"
          disabled={!canAdd}
          onClick={() => go("member-amount")}
        >
          เพิ่มสมาชิก
        </button>
      </div>
    </div>
  );
}
