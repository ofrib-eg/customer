export type PaymentType = "Cash" | "Bank card" | "Credit";

export interface ReceiptItem {
  name: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

export interface Receipt {
  id: string;
  storeNumber: string;
  storeName: string;
  receiptDate: string;
  receiptTime: string;
  receiptNumber: string;
  paymentType: PaymentType;
  contactName: string;
  contactIdentifier: string;
  items: ReceiptItem[];
  subtotal: number;
  vatRate: number;
  vat: number;
  total: number;
}

const STORES = [
  { number: "1050", name: "Coop Extra Grilstad" },
  { number: "1051", name: "Bryggen" },
  { number: "1052", name: "Trondelag" },
  { number: "1053", name: "Madlaveien" }
];

const PAYMENT_TYPES: PaymentType[] = ["Cash", "Bank card", "Credit"];

const CONTACTS = [
  { name: "Olivia Friberg", identifier: "11223344" },
  { name: "Adrian Finnager", identifier: "44332211" },
  { name: "Emma Dahlgren", identifier: "00112233" },
  { name: "Sara Börjesson", identifier: "11223300" }
];

const PRODUCT_CATALOG: { name: string; price: number }[] = [
  { name: "Milk 1L", price: 19.9 },
  { name: "Bread", price: 32.0 },
  { name: "Coffee 250g", price: 89.0 },
  { name: "Eggs 12-pack", price: 45.5 },
  { name: "Butter 500g", price: 62.0 },
  { name: "Bananas 1kg", price: 24.9 },
  { name: "Chicken fillet 1kg", price: 129.0 },
  { name: "Pasta 500g", price: 18.5 },
  { name: "Tomato sauce", price: 22.0 },
  { name: "Orange juice 1L", price: 34.9 },
  { name: "Cheese 400g", price: 79.0 },
  { name: "Yoghurt 4-pack", price: 39.0 }
];

function buildReceipt(seed: number): Receipt {
  const store = STORES[seed % STORES.length];
  const paymentType = PAYMENT_TYPES[seed % PAYMENT_TYPES.length];
  const contact = CONTACTS[seed % CONTACTS.length];
  const itemCount = 1 + (seed % 4);
  const items: ReceiptItem[] = [];
  for (let i = 0; i < itemCount; i++) {
    const product = PRODUCT_CATALOG[(seed * 3 + i) % PRODUCT_CATALOG.length];
    const quantity = 1 + ((seed + i) % 3);
    const lineTotal = Math.round(product.price * quantity * 100) / 100;
    items.push({ name: product.name, quantity, unitPrice: product.price, lineTotal });
  }

  const subtotal = Math.round(items.reduce((sum, item) => sum + item.lineTotal, 0) * 100) / 100;
  const vatRate = 12;
  const vat = Math.round(subtotal * (vatRate / 100) * 100) / 100;
  const total = Math.round((subtotal + vat) * 100) / 100;

  const day = String(1 + (seed * 7) % 28).padStart(2, "0");
  const month = String(1 + (seed * 3) % 12).padStart(2, "0");
  const hour = String(8 + (seed * 5) % 12).padStart(2, "0");
  const minute = String((seed * 11) % 60).padStart(2, "0");

  return {
    id: `receipt-${seed}`,
    storeNumber: store.number,
    storeName: store.name,
    receiptDate: `2024-${month}-${day}`,
    receiptTime: `${hour}:${minute}`,
    receiptNumber: `2024${month}${day}-${String(1000 + seed).slice(-4)}`,
    paymentType,
    contactName: contact.name,
    contactIdentifier: contact.identifier,
    items,
    subtotal,
    vatRate,
    vat,
    total
  };
}

export const mockReceipts: Receipt[] = Array.from({ length: 14 }, (_, i) => buildReceipt(i + 1));
