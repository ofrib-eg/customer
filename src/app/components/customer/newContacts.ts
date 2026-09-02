export interface StoredContact {
  id: number;
  identityNumber: string;
  name: string;
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  mobile: string;
  bin: string;
  loyaltyProgramName: string;
  modifiedBy: string;
  modifiedDate: string;
  birthDate: string;
  gender: string;
  ssn: string;
  extIdentityNumber: string;
  addressLine1: string;
  addressLine2: string;
  postalCode: string;
  city: string;
  country: string;
}

const STORAGE_KEY = "newContacts";

export function loadNewContacts(): StoredContact[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveNewContact(contact: StoredContact): void {
  const existing = loadNewContacts();
  const index = existing.findIndex((c) => c.id === contact.id);
  if (index >= 0) {
    existing[index] = contact;
  } else {
    existing.push(contact);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
}

export function getNextContactId(baseContacts: { id: number }[]): number {
  const all = [...baseContacts, ...loadNewContacts()];
  return all.reduce((max, c) => Math.max(max, c.id), 0) + 1;
}
