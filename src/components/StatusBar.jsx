export default function StatusBar() {
  return (
    <div className="statusbar">
      <div className="statusbar__time">
        <span>9:41</span>
      </div>
      <div className="statusbar__levels">
        <img src="/assets/status-cellular.svg" alt="" width={19.2} height={12} />
        <img src="/assets/status-wifi.svg" alt="" width={17.14} height={12} />
        <div className="battery">
          <div className="battery__border" />
          <div className="battery__capacity" />
          <img className="battery__cap" src="/assets/status-cap.svg" alt="" width={1.33} height={4} />
        </div>
      </div>
    </div>
  );
}
