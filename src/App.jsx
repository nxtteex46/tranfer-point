import { useCallback, useEffect, useState } from "react";
import TransferPoint from "./screens/TransferPoint";
import PartnerAmount from "./screens/PartnerAmount";
import MemberFriends from "./screens/MemberFriends";
import MemberAmount from "./screens/MemberAmount";
import ConfirmScreen from "./screens/ConfirmScreen";
import PinScreen from "./screens/PinScreen";
import SuccessScreen from "./screens/SuccessScreen";

const SCREENS = {
  "transfer-point": TransferPoint,
  "partner-amount": PartnerAmount,
  "partner-confirm": ConfirmScreen,
  "partner-pin": PinScreen,
  "partner-success": SuccessScreen,
  "member-friends": MemberFriends,
  "member-amount": MemberAmount,
  "member-confirm": ConfirmScreen,
  "member-pin": PinScreen,
  "member-success": SuccessScreen,
};

const HOME = "transfer-point";

export default function App() {
  const [stack, setStack] = useState([{ key: HOME, params: {} }]);
  const current = stack[stack.length - 1];

  const go = useCallback((key, params = {}) => {
    setStack((s) => (SCREENS[key] ? [...s, { key, params }] : s));
  }, []);

  const back = useCallback((params) => {
    setStack((s) => {
      if (s.length <= 1) return s;
      if (!params) return s.slice(0, -1);

      const next = s.slice(0, -1);
      next[next.length - 1] = { ...next[next.length - 1], params };
      return next;
    });
  }, []);

  const home = useCallback(() => setStack([{ key: HOME, params: {} }]), []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") back();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [back]);

  const Screen = SCREENS[current.key];

  return (
    <div className="app">
      <div className="app__viewport">
        <Screen key={current.key} go={go} back={back} home={home} params={current.params} />
      </div>
    </div>
  );
}
