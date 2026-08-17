export default function BackIcon() {
  return (
    <span className="iconbtn" style={{ position: "relative" }}>
      <span style={{ position: "relative", width: 18, height: 14, display: "block" }}>
        <img
          src="/assets/icon-back-a.svg"
          alt=""
          style={{ position: "absolute", left: 1, top: 6, width: 17, height: 2 }}
        />
        <img
          src="/assets/icon-back-b.svg"
          alt=""
          style={{ position: "absolute", left: 0, top: 0, width: 9, height: 14 }}
        />
      </span>
    </span>
  );
}
