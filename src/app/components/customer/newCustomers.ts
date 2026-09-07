export interface StoredCustomer {
  id: number;
  customerNumber: string;
  extCustomerNumber: string;
  customerName: string;
  customerType: string;
  customerSince: string;
  store: string;
  address: string;
  postalCode: string;
  orgNumber: string;
  customerGroup: string;
  inactive: boolean;
  creditC: string;
  creditBalance: string;
  email: string;
  phone: string;
  // Private customer creation flow (see NewCustomerPage)
  contactId?: number;
  firstName?: string;
  lastName?: string;
  birthDate?: string;
  gender?: string;
  ssn?: string;
  extIdentityNumber?: string;
  loyaltyProgramName?: string;
  loyaltyProgram?: string;
  isCreditCustomer?: boolean;
  creditLimit?: string;
  referenceNumberRequired?: boolean;
  creditLocked?: boolean;
  balanceDueDate?: string;
  // Business customer creation flow (see NewCustomerPage)
  contactIds?: number[];
  storeAccess?: {
    type: "all" | "profile" | "team" | "stores";
    profileId: string;
    teamId: string;
    storeIds: string[];
  };
}

const STORAGE_KEY = "newCustomers";

export function loadNewCustomers(): StoredCustomer[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveNewCustomer(customer: StoredCustomer): void {
  const existing = loadNewCustomers();
  const index = existing.findIndex((c) => c.id === customer.id);
  if (index >= 0) {
    existing[index] = customer;
  } else {
    existing.push(customer);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
}

export function getNextCustomerId(baseCustomers: { id: number }[]): number {
  const all = [...baseCustomers, ...loadNewCustomers()];
  return all.reduce((max, c) => Math.max(max, c.id), 0) + 1;
}

export function formatCustomerNumber(id: number): string {
  return String(id).padStart(10, "0");
}

export function randomExtCustomerNumber(): string {
  const length = 6 + Math.floor(Math.random() * 4); // 6-9 digits
  let result = "";
  for (let i = 0; i < length; i++) {
    result += Math.floor(Math.random() * 10);
  }
  return result;
}
