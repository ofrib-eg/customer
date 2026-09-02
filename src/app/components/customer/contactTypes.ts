import { saveNewContact, getNextContactId } from "./newContacts";
import { mockContacts } from "./ContactsGrid";
import { randomExtCustomerNumber } from "./newCustomers";

export interface LinkedContact {
  id: number;
  isNew: boolean;
  identityNumber: string;
  extIdentityNumber: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: string;
  email: string;
  mobileNumber: string;
  ssn: string;
  loyaltyProgramName: string;
  addressLine1: string;
  addressLine2: string;
  postalCode: string;
  city: string;
  country: string;
  phoneNumber: string;
}

export interface NewContactFormValues {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  ssn: string;
  birthDate: string;
  gender: string;
  addressLine1: string;
  addressLine2: string;
  postalCode: string;
  city: string;
  country: string;
  phoneNumber: string;
}

export function createContactFromForm(form: NewContactFormValues): LinkedContact {
  const id = getNextContactId(mockContacts);
  const identityNumber = randomExtCustomerNumber();
  const newContact = {
    id,
    identityNumber,
    name: `${form.firstName.trim()} ${form.lastName.trim()}`,
    firstName: form.firstName.trim(),
    lastName: form.lastName.trim(),
    company: "",
    email: form.email.trim(),
    phone: form.phoneNumber.trim(),
    mobile: form.mobileNumber.trim(),
    bin: "",
    loyaltyProgramName: "",
    modifiedBy: "",
    modifiedDate: new Date().toISOString().slice(0, 10),
    birthDate: form.birthDate,
    gender: form.gender,
    ssn: form.ssn.trim(),
    extIdentityNumber: "",
    addressLine1: form.addressLine1.trim(),
    addressLine2: form.addressLine2.trim(),
    postalCode: form.postalCode.trim(),
    city: form.city.trim(),
    country: form.country.trim()
  };
  saveNewContact(newContact);

  return {
    id,
    isNew: true,
    identityNumber,
    extIdentityNumber: "",
    firstName: newContact.firstName,
    lastName: newContact.lastName,
    birthDate: newContact.birthDate,
    gender: newContact.gender,
    email: newContact.email,
    mobileNumber: newContact.mobile,
    ssn: newContact.ssn,
    loyaltyProgramName: "",
    addressLine1: newContact.addressLine1,
    addressLine2: newContact.addressLine2,
    postalCode: newContact.postalCode,
    city: newContact.city,
    country: newContact.country,
    phoneNumber: newContact.phone
  };
}

export function contactToLinkedContact(contact: any): LinkedContact {
  return {
    id: contact.id,
    isNew: false,
    identityNumber: contact.identityNumber,
    extIdentityNumber: contact.extIdentityNumber || "",
    firstName: contact.firstName,
    lastName: contact.lastName,
    birthDate: contact.birthDate || "",
    gender: contact.gender || "",
    email: contact.email,
    mobileNumber: contact.mobile,
    ssn: contact.ssn || "",
    loyaltyProgramName: contact.loyaltyProgramName || "",
    addressLine1: contact.addressLine1 || "",
    addressLine2: contact.addressLine2 || "",
    postalCode: contact.postalCode || "",
    city: contact.city || "",
    country: contact.country || "",
    phoneNumber: contact.phone || ""
  };
}
