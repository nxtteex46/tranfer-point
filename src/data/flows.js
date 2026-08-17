import { getPartner, partnerSlip } from "./partners";

export const MEMBER_SLIP = {
  from: { avatar: { initial: "น", bg: "#dce8fa", fg: "#2b4e86" } },
  to: { avatar: { initial: "ป", bg: "#eadcfa", fg: "#5b3b86" } },
  chip: "เพื่อน M Card",
  accountName: "ปาณิศา ปัญญวรรณ์",
  accountId: "M Card 7102 •••• •••• 0027",
  note: "โอนให้เพื่อน",
};

export const TXN = {
  date: "18 ก.พ. 69  14:32 น.",
  ref: "AFO1473857349",
};

/**
 * แปลง params ของหน้าจอเป็นข้อมูลสลิป
 * partner flow ต้องมี partnerId + amount, member flow ใช้ amount อย่างเดียว
 */
export function slipFrom(params = {}) {
  if (params.kind === "member") {
    return {
      ...MEMBER_SLIP,
      amount: { value: Number(params.amount || 0).toLocaleString(), unit: "M Point" },
      note: params.note?.trim() ? params.note : MEMBER_SLIP.note,
    };
  }

  const partner = getPartner(params.partnerId);
  const slip = partnerSlip(partner, params.amount);
  return { ...slip, note: params.note?.trim() ? params.note : slip.note };
}

/** ปลายทางของแต่ละ flow */
export const NEXT = {
  partner: { confirm: "partner-confirm", pin: "partner-pin", success: "partner-success" },
  member: { confirm: "member-confirm", pin: "member-pin", success: "member-success" },
};
