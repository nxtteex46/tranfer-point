/**
 * ข้อมูลพาร์ตเนอร์ ดึงจากหน้ารายการใน Figma (node 5594:6104)
 * และหน้าเลือกจำนวนของ Point X (node 5579:4871)
 *
 * `out` คืออัตราขาออก (M Point → หน่วยพาร์ตเนอร์) อ่านจาก "บรรทัดที่สอง" ของแต่ละแถว
 * ในหน้ารายการ ซึ่งเป็นตัวกำหนด "ยอดขั้นต่ำ" ของการโอนออกด้วย
 * เช่น PointX เขียนว่า "110 M Point = 100 Point X" → ขั้นต่ำ 110 M Point
 *
 * พาร์ตเนอร์ที่ไฟล์ไม่ได้ระบุอัตราขาออกไว้ จะไม่มี `out` และหน้าจอจะไม่แสดงยอดแปลง
 */
export const PARTNERS = [
  {
    id: "pointx",
    name: "PointX",
    unit: "Point X",
    listLogo: "/assets/logo-pointx.png",
    chipLogo: "/assets/party-pointx.png",
    slipLogo: "/assets/logo-pointx-sm.png",
    listRate: "140 Point X = 100 M Point\n110 M Point = 100  Point X",
    out: { from: 110, to: 100, text: "110 M Point = 100 Point X" },
    // PointX โอนได้เฉพาะอัตราเหล่านี้เท่านั้น (ไม่ใช่คูณอัตราส่วนอิสระ)
    tiers: [
      { from: 110, to: 100 },
      { from: 220, to: 200 },
      { from: 550, to: 500 },
      { from: 990, to: 900 },
      { from: 1100, to: 1000 },
      { from: 2200, to: 2000 },
      { from: 3300, to: 3000 },
      { from: 5500, to: 5000 },
    ],
    accountId: "1-XXXX-XXXX-82-0",
  },
  {
    id: "airasia",
    name: "AirAsia",
    unit: "Air Asia Point",
    listLogo: "/assets/logo-airasia.png",
    chipLogo: "/assets/logo-airasia.png",
    slipLogo: "/assets/logo-airasia.png",
    listRate: "500 Air Asia Point = 200 M Point\n500 M Point = 200 Air Asia Point",
    out: { from: 500, to: 200, text: "500 M Point = 200 Air Asia Point" },
    accountId: "-",
  },
  {
    id: "blueplus",
    name: "Blueplus+",
    unit: "Blue Plus",
    listLogo: "/assets/logo-blueplus.png",
    chipLogo: "/assets/logo-blueplus.png",
    slipLogo: "/assets/logo-blueplus.png",
    listFit: "contain",
    listRate: "350 Blue Plus = 450 M Point\n400 M Point = 160 Air Asia Point",
    // หมายเหตุ: บรรทัดขาออกในไฟล์ Figma เขียนหน่วยเป็น Air Asia Point ซึ่งน่าจะพิมพ์ผิด
    out: { from: 400, to: 160, text: "400 M Point = 160 Air Asia Point" },
    accountId: "-",
  },
  {
    id: "jpoint",
    name: "J Point",
    unit: "J Point",
    listLogo: "/assets/logo-jpoint.png",
    chipLogo: "/assets/logo-jpoint.png",
    slipLogo: "/assets/logo-jpoint.png",
    listRate: "500 J Point = 350 M Point\n500 M Point = 250 J Point",
    out: { from: 500, to: 250, text: "500 M Point = 250 J Point" },
    accountId: "-",
  },
  {
    id: "maai",
    name: "MAAI",
    unit: "MAAI",
    listLogo: "/assets/logo-maai.png",
    chipLogo: "/assets/logo-maai.png",
    slipLogo: "/assets/logo-maai.png",
    listRate: "1,000 MAAI = 800 M Point",
    // ไฟล์ Figma ระบุเฉพาะอัตราขาเข้า ไม่มีอัตราขาออก
    out: null,
    accountId: "-",
  },
];

/** ยอดขั้นต่ำของแต่ละพาร์ตเนอร์ = ตัวเลข M Point ในบรรทัดขาออกของหน้ารายการ */
export const minOf = (partner) => (partner.out ? partner.out.from : null);

export const getPartner = (id) => PARTNERS.find((p) => p.id === id) ?? PARTNERS[0];

/** สร้างข้อมูลสลิปของ flow พาร์ตเนอร์จากพาร์ตเนอร์ที่เลือก + จำนวนที่กรอก */
export function receivedFor(partner, amount) {
  const n = Number(amount) || 0;
  if (partner.tiers) {
    const tier = partner.tiers.find((t) => t.from === n);
    return tier ? tier.to : null;
  }
  return partner.out ? Math.floor(n * (partner.out.to / partner.out.from)) : null;
}

/** ยอดที่โอนได้ทั้งหมดของพาร์ตเนอร์ที่คิดเป็นขั้น (ใช้กับปุ่ม −/+ และชิป) */
export const tierAmounts = (partner) =>
  partner.tiers ? partner.tiers.map((t) => t.from) : null;

export function partnerSlip(partner, amount) {
  const received = receivedFor(partner, amount);

  return {
    from: {
      logo: "/assets/logo-mpoint.png",
      bordered: true,
      amount: Number(amount || 0).toLocaleString(),
      unit: "M Point",
    },
    to: {
      logo: partner.slipLogo,
      amount: received === null ? "-" : received.toLocaleString(),
      unit: partner.unit,
    },
    chip: partner.name,
    accountName: "PANISA PUNJAVORN",
    accountId: partner.accountId,
    note: `โอนไป ${partner.name}`,
  };
}
