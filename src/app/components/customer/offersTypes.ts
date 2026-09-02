export type OfferScope = "Customer group" | "Personal";
export type UsageStatus = "Yes" | "Partly" | "No";
export type OfferStatus = "Active" | "Upcoming" | "Expired" | "Redeemed" | "Cancelled";

export interface OfferItem {
  name: string;
  itemNumber: string;
}

export interface Offer {
  id: string;
  promotionName: string;
  offerName: string;
  validFrom: string;
  validTo: string;
  scope: OfferScope;
  requirement: string;
  discount: string;
  items: OfferItem[];
  usageStatus: UsageStatus;
  usedDate: string | null;
  timesUsed: number;
  usageLimit: number | null;
  status: OfferStatus;
}

const OFFER_TEMPLATES: {
  promotionName: string;
  offerName: string;
  scope: OfferScope;
  requirement: string;
  discount: string;
  items: OfferItem[];
  usageLimit: number | null;
}[] = [
  {
    promotionName: "Buy 3 for 99 Freia Melkesjokolade",
    offerName: "Offer 1",
    scope: "Customer group",
    requirement: "Buy 3 selected items",
    discount: "Total price 99.00 for 3 items",
    items: [{ name: "Freia Melkesjokolade (200g)", itemNumber: "7021460001300" }],
    usageLimit: null
  },
  {
    promotionName: "Weekend coffee deal",
    offerName: "Coffee 2-for-1",
    scope: "Personal",
    requirement: "Buy 2 selected items",
    discount: "Cheapest item free",
    items: [
      { name: "Coffee 250g", itemNumber: "7021460002100" },
      { name: "Coffee 500g", itemNumber: "7021460002101" }
    ],
    usageLimit: 1
  },
  {
    promotionName: "Loyalty milk discount",
    offerName: "Milk -20%",
    scope: "Customer group",
    requirement: "Buy 1 selected item",
    discount: "20% off",
    items: [{ name: "Milk 1L", itemNumber: "7021460003200" }],
    usageLimit: 3
  },
  {
    promotionName: "Bread & butter combo",
    offerName: "Breakfast combo",
    scope: "Personal",
    requirement: "Buy bread and butter together",
    discount: "15% off both items",
    items: [
      { name: "Bread", itemNumber: "7021460004300" },
      { name: "Butter 500g", itemNumber: "7021460004301" }
    ],
    usageLimit: 1
  },
  {
    promotionName: "Chicken fillet promo",
    offerName: "Chicken -25%",
    scope: "Customer group",
    requirement: "Buy 1 selected item",
    discount: "25% off",
    items: [{ name: "Chicken fillet 1kg", itemNumber: "7021460005400" }],
    usageLimit: null
  },
  {
    promotionName: "Fruit bundle deal",
    offerName: "Fruit bundle",
    scope: "Personal",
    requirement: "Buy 5 selected items",
    discount: "Total price 79.00 for 5 items",
    items: [
      { name: "Bananas 1kg", itemNumber: "7021460006500" },
      { name: "Oranges 1kg", itemNumber: "7021460006501" }
    ],
    usageLimit: 2
  }
];

const STATUS_CYCLE: OfferStatus[] = ["Active", "Upcoming", "Expired", "Redeemed", "Cancelled"];

function buildOffer(seed: number): Offer {
  const template = OFFER_TEMPLATES[seed % OFFER_TEMPLATES.length];
  const status = STATUS_CYCLE[seed % STATUS_CYCLE.length];
  const used = seed % 3 !== 0;
  const timesUsed = used ? 1 + (seed % (template.usageLimit ?? 3)) : 0;

  const usageStatus: UsageStatus =
    timesUsed === 0
      ? "No"
      : template.usageLimit !== null && timesUsed >= template.usageLimit
      ? "Yes"
      : template.usageLimit === null
      ? "Yes"
      : "Partly";

  const fromDay = String(1 + (seed * 5) % 20).padStart(2, "0");
  const fromMonth = String(1 + (seed * 2) % 12).padStart(2, "0");
  const toDay = String(1 + (seed * 5 + 14) % 28).padStart(2, "0");
  const toMonth = String(1 + ((seed * 2) % 12) + (seed % 2)).padStart(2, "0");

  const usedDay = String(1 + (seed * 3) % 20).padStart(2, "0");
  const usedMonth = String(1 + (seed * 4) % 12).padStart(2, "0");

  return {
    id: String(seed),
    promotionName: template.promotionName,
    offerName: `${template.offerName}${seed > OFFER_TEMPLATES.length ? ` (${seed})` : ""}`,
    validFrom: `2024-${fromMonth}-${fromDay}`,
    validTo: `2024-${toMonth.padStart(2, "0")}-${toDay}`,
    scope: template.scope,
    requirement: template.requirement,
    discount: template.discount,
    items: template.items,
    usageStatus,
    usedDate: used ? `2024-${usedMonth}-${usedDay}` : null,
    timesUsed,
    usageLimit: template.usageLimit,
    status
  };
}

export const mockOffers: Offer[] = Array.from({ length: 10 }, (_, i) => buildOffer(i + 1));
