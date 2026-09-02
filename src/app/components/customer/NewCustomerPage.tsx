import React from "react";
import { useNavigate } from "react-router";
import { X, Search, Info, Link2, Plus, Trash2, ChevronDown, Pencil, MoreHorizontal } from "lucide-react";
import * as Popover from "@radix-ui/react-popover";
import { Card, CardContent } from "@/app/components/ui/card";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/app/components/ui/tooltip";
import { DETAIL_CARD_CLASS, SectionHeader, ReadOnlyField, SelectField, CheckboxField, InputField, DateField, FieldLabel, PhoneCountryCodeSelect } from "./sharedFields";
import { AddContactToCustomerModal } from "./AddContactToCustomerModal";
import { LinkedContact, createContactFromForm, contactToLinkedContact } from "./contactTypes";
import { ContactSearchDropdown } from "./ContactSearchDropdown";
import { StoreAccessFields, StoreAccessValue } from "./ChangeStoreAccessModal";
import { ChooseOrganizationSearchModal, Organization } from "./ChooseOrganizationSearchModal";
import { mockCustomers } from "./CustomerGrid";
import { mockContacts } from "./ContactsGrid";
import { loadNewContacts } from "./newContacts";
import { saveNewCustomer, getNextCustomerId, formatCustomerNumber, randomExtCustomerNumber, loadNewCustomers, StoredCustomer } from "./newCustomers";

const LOYALTY_PROGRAM_OPTIONS = [
  { value: "standard", label: "Standard" },
  { value: "silver", label: "Silver" },
  { value: "gold", label: "Gold" },
  { value: "platinum", label: "Platinum" }
];

const ORG_TYPE_OPTIONS = [
  { value: "Parent", label: "Parent" },
  { value: "Subsidiary", label: "Subsidiary" },
  { value: "Branch", label: "Branch" }
];

const COUNTRY_OPTIONS = [
  { value: "Sweden", label: "Sweden" },
  { value: "Norway", label: "Norway" },
  { value: "Denmark", label: "Denmark" },
  { value: "Finland", label: "Finland" }
];

const GENDER_OPTIONS = [
  { value: "Female", label: "Female" },
  { value: "Male", label: "Male" },
  { value: "Other", label: "Other" }
];

const ADDRESS_TYPE_OPTIONS = [
  { value: "Delivery address", label: "Delivery address" },
  { value: "Invoice address", label: "Invoice address" }
];

const CUSTOMER_GROUP_OPTIONS = [
  { value: "VIP Customers", label: "VIP Customers" },
  { value: "Corporate Clients", label: "Corporate Clients" },
  { value: "Regular Customers", label: "Regular Customers" },
  { value: "New Customers", label: "New Customers" },
  { value: "Seasonal Buyers", label: "Seasonal Buyers" }
];

function emptyContactDraft() {
  return {
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "",
    addressLine1: "",
    addressLine2: "",
    showAddressLine2: false,
    postalCode: "",
    city: "",
    country: "",
    phoneNumber1: "",
    phoneNumber2: "",
    showPhoneNumber2: false,
    email: "",
    ssn: ""
  };
}

function DuplicateContactTooltip({ contactName, onUse }: { contactName: string; onUse: () => void }) {
  return (
    <div className="absolute z-20 left-full top-0 ml-[10px] w-[220px] bg-[#262626] rounded-[8px] p-[14px] shadow-lg">
      <div className="absolute top-[14px] -left-[6px] w-0 h-0 border-y-[6px] border-y-transparent border-r-[6px] border-r-[#262626]" />
      <p className="font-['Roboto:Regular',sans-serif] text-[14px] leading-[20px] text-white">
        An existing contact already has these details.
        <br />
        {contactName}
      </p>
      <div className="text-right mt-[8px]">
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={onUse}
          className="font-['Roboto:Regular',sans-serif] text-[14px] font-bold underline cursor-pointer text-white"
        >
          Use this contact
        </button>
      </div>
    </div>
  );
}

export function NewCustomerPage() {
  const navigate = useNavigate();
  const [customerType, setCustomerType] = React.useState<"Private customer" | "Business customer">("Private customer");
  const [linkedContact, setLinkedContact] = React.useState<LinkedContact | null>(null);
  const [contactDraft, setContactDraft] = React.useState(emptyContactDraft());
  const [focusedIdentifierField, setFocusedIdentifierField] = React.useState<"phone" | "email" | "ssn" | null>(null);
  const [showIdentifierError, setShowIdentifierError] = React.useState(false);
  const identifierSectionRef = React.useRef<HTMLDivElement>(null);
  const [storeAccess, setStoreAccess] = React.useState<StoreAccessValue>({ type: "all", profileId: "", teamId: "", storeIds: [] });
  const [loyaltyProgram, setLoyaltyProgram] = React.useState(LOYALTY_PROGRAM_OPTIONS[0].value);
  const [privateCustomerGroup, setPrivateCustomerGroup] = React.useState("");
  const [isCreditCustomer, setIsCreditCustomer] = React.useState(false);
  const [creditLimit, setCreditLimit] = React.useState("0");
  const [creditBalance, setCreditBalance] = React.useState("0");
  const [referenceNumberRequired, setReferenceNumberRequired] = React.useState(false);
  const [creditLocked, setCreditLocked] = React.useState(false);
  const [balanceDueDate, setBalanceDueDate] = React.useState("");

  // Business customer
  const [orgMode, setOrgMode] = React.useState<"search" | "create">("search");
  const [orgSearchQuery, setOrgSearchQuery] = React.useState("");
  const [isOrgSearchModalOpen, setIsOrgSearchModalOpen] = React.useState(false);
  const [linkedOrganization, setLinkedOrganization] = React.useState<Organization | null>(null);
  const [isEditingInternalOrg, setIsEditingInternalOrg] = React.useState(false);
  const [newOrgName, setNewOrgName] = React.useState("");
  const [newOrgNumber, setNewOrgNumber] = React.useState("");
  const [newOrgType, setNewOrgType] = React.useState("Branch");
  const [newOrgCountry, setNewOrgCountry] = React.useState("Sweden");
  const [newOrgBranchNumber, setNewOrgBranchNumber] = React.useState("");
  const [showOrgBranchNumber, setShowOrgBranchNumber] = React.useState(false);
  const [newOrgPhoneNumber, setNewOrgPhoneNumber] = React.useState("");
  const [newOrgEmail, setNewOrgEmail] = React.useState("");
  const [orgAddresses, setOrgAddresses] = React.useState([
    { addressLine1: "", addressLine2: "", postalCode: "", city: "", country: "Sweden", addressType: "", editing: true }
  ]);
  const [customerNameSameAsOrg, setCustomerNameSameAsOrg] = React.useState(true);
  const [customCustomerName, setCustomCustomerName] = React.useState("");
  const [businessContacts, setBusinessContacts] = React.useState<LinkedContact[]>([]);
  const [isAddBusinessContactOpen, setIsAddBusinessContactOpen] = React.useState(false);
  const [businessCustomerGroup, setBusinessCustomerGroup] = React.useState("");

  const MAX_ORG_ADDRESSES = 3;
  const addOrgAddress = () =>
    setOrgAddresses((prev) => {
      if (prev.length >= MAX_ORG_ADDRESSES) return prev;
      const usedTypes = new Set(prev.map((a) => a.addressType));
      const nextType = ADDRESS_TYPE_OPTIONS.find((o) => !usedTypes.has(o.value))?.value || ADDRESS_TYPE_OPTIONS[0].value;
      return [...prev, { addressLine1: "", addressLine2: "", postalCode: "", city: "", country: "Sweden", addressType: nextType, editing: true }];
    });
  const updateOrgAddress = (index: number, key: string, value: string) =>
    setOrgAddresses((prev) => {
      if (key === "addressType") {
        const conflictIndex = prev.findIndex((a, i) => i !== index && i !== 0 && a.addressType === value);
        if (conflictIndex !== -1) {
          const previousType = prev[index].addressType;
          return prev.map((a, i) => {
            if (i === index) return { ...a, addressType: value };
            if (i === conflictIndex) return { ...a, addressType: previousType };
            return a;
          });
        }
      }
      return prev.map((a, i) => (i === index ? { ...a, [key]: value } : a));
    });
  const removeOrgAddress = (index: number) =>
    setOrgAddresses((prev) => (index === 0 ? prev : prev.filter((_, i) => i !== index)));
  const editOrgAddress = (index: number) =>
    setOrgAddresses((prev) => prev.map((a, i) => (i === index ? { ...a, editing: true } : a)));

  // Addresses manually added on top of an externally-sourced organization's own addresses
  const [extraOrgAddresses, setExtraOrgAddresses] = React.useState<
    { addressLine1: string; addressLine2: string; postalCode: string; city: string; country: string; addressType: string }[]
  >([]);

  const externalAddressList = linkedOrganization?.source === "External" ? (linkedOrganization.externalAddresses || []) : [];

  const addExtraOrgAddress = () =>
    setExtraOrgAddresses((prev) => {
      if (externalAddressList.length + prev.length >= MAX_ORG_ADDRESSES) return prev;
      const usedTypes = new Set([...externalAddressList.map((a) => a.type), ...prev.map((a) => a.addressType)]);
      const nextType = ADDRESS_TYPE_OPTIONS.find((o) => !usedTypes.has(o.value))?.value || ADDRESS_TYPE_OPTIONS[0].value;
      return [...prev, { addressLine1: "", addressLine2: "", postalCode: "", city: "", country: "Sweden", addressType: nextType }];
    });
  const updateExtraOrgAddress = (index: number, key: string, value: string) =>
    setExtraOrgAddresses((prev) => {
      if (key === "addressType") {
        const conflictIndex = prev.findIndex((a, i) => i !== index && a.addressType === value);
        if (conflictIndex !== -1) {
          const previousType = prev[index].addressType;
          return prev.map((a, i) => {
            if (i === index) return { ...a, addressType: value };
            if (i === conflictIndex) return { ...a, addressType: previousType };
            return a;
          });
        }
      }
      return prev.map((a, i) => (i === index ? { ...a, [key]: value } : a));
    });
  const removeExtraOrgAddress = (index: number) =>
    setExtraOrgAddresses((prev) => prev.filter((_, i) => i !== index));

  const isExternalOrgLinked = linkedOrganization?.source === "External";
  const showOrgAddressSection = orgMode === "create" || !!linkedOrganization;

  // Seed the (reused) editable address list from an Internal organization's own saved addresses once it's linked
  React.useEffect(() => {
    if (linkedOrganization && linkedOrganization.source !== "External") {
      const saved = linkedOrganization.internalAddresses && linkedOrganization.internalAddresses.length > 0
        ? linkedOrganization.internalAddresses
        : [{ type: "Address" as const, addressLine1: linkedOrganization.address || "", addressLine2: "", postalCode: "", city: "", country: linkedOrganization.country || "Sweden" }];
      setOrgAddresses(saved.map((a) => ({ addressLine1: a.addressLine1, addressLine2: a.addressLine2, postalCode: a.postalCode, city: a.city, country: a.country, addressType: a.type, editing: false })));
    }
  }, [linkedOrganization]);

  const isInternalOrgContext = !!linkedOrganization && !isExternalOrgLinked;

  const addressCards = !showOrgAddressSection
    ? []
    : isExternalOrgLinked
      ? [
          ...externalAddressList.map((a, i) => ({
            key: `ext-${i}`,
            readOnly: true,
            isPrimary: i === 0,
            addressType: a.type as string,
            addressLine1: a.addressLine1,
            addressLine2: a.addressLine2,
            postalCode: a.postalCode,
            city: a.city,
            country: a.country,
            buttonMode: (i === 0 ? "plus" : "none") as "plus" | "none",
            onUpdate: undefined as ((key: string, value: string) => void) | undefined,
            onTypeChange: undefined as ((value: string) => void) | undefined,
            onRemove: undefined as (() => void) | undefined,
            onEdit: undefined as (() => void) | undefined
          })),
          ...extraOrgAddresses.map((a, i) => ({
            key: `extra-${i}`,
            readOnly: false,
            isPrimary: false,
            addressType: a.addressType,
            addressLine1: a.addressLine1,
            addressLine2: a.addressLine2,
            postalCode: a.postalCode,
            city: a.city,
            country: a.country,
            buttonMode: "trash" as const,
            onUpdate: (key: string, value: string) => updateExtraOrgAddress(i, key, value),
            onTypeChange: (value: string) => updateExtraOrgAddress(i, "addressType", value),
            onRemove: () => removeExtraOrgAddress(i),
            onEdit: undefined as (() => void) | undefined
          }))
        ]
      : orgAddresses.map((a, i) => {
          const isPrimary = i === 0;
          const buttonMode = isInternalOrgContext
            ? a.editing
              ? (isPrimary ? "menu-add-only" : "trash")
              : (isPrimary ? "menu" : "edit")
            : (isPrimary ? "plus" : "trash");
          return {
            key: `org-${i}`,
            readOnly: isInternalOrgContext ? !a.editing : false,
            isPrimary,
            addressType: a.addressType,
            addressLine1: a.addressLine1,
            addressLine2: a.addressLine2,
            postalCode: a.postalCode,
            city: a.city,
            country: a.country,
            buttonMode: buttonMode as "plus" | "trash" | "menu" | "menu-add-only" | "edit",
            onUpdate: (key: string, value: string) => updateOrgAddress(i, key, value),
            onTypeChange: (value: string) => updateOrgAddress(i, "addressType", value),
            onRemove: isPrimary ? undefined : () => removeOrgAddress(i),
            onEdit: () => editOrgAddress(i)
          };
        });

  const canAddMoreAddressCards = addressCards.length < MAX_ORG_ADDRESSES;
  const handleAddAddressCard = isExternalOrgLinked ? addExtraOrgAddress : addOrgAddress;

  const organizationName = orgMode === "create"
    ? newOrgName
    : isEditingInternalOrg
      ? newOrgName
      : (linkedOrganization?.orgName || "");

  const isOrgValid = orgMode === "search"
    ? linkedOrganization !== null
    : newOrgName.trim().length > 0 && newOrgNumber.trim().length > 0 && newOrgCountry.trim().length > 0 && (orgAddresses[0]?.city.trim().length ?? 0) > 0;

  const hasContactIdentifier = contactDraft.phoneNumber1.trim().length > 0 || contactDraft.ssn.trim().length > 0;
  const isContactDraftValid = contactDraft.firstName.trim().length > 0 && contactDraft.lastName.trim().length > 0 && hasContactIdentifier;

  const duplicateContactMatch = React.useMemo(() => {
    const phone = contactDraft.phoneNumber1.trim();
    const email = contactDraft.email.trim().toLowerCase();
    const ssn = contactDraft.ssn.trim();
    if (!phone && !email && !ssn) return null;
    const all = [...mockContacts, ...loadNewContacts()];

    if (phone) {
      const match = all.find((c) => c.mobile === phone);
      if (match) return { field: "phone" as const, contact: match };
    }
    if (email) {
      const match = all.find((c) => c.email.toLowerCase() === email);
      if (match) return { field: "email" as const, contact: match };
    }
    if (ssn) {
      const match = all.find((c) => (c as any).ssn === ssn);
      if (match) return { field: "ssn" as const, contact: match };
    }
    return null;
  }, [contactDraft.phoneNumber1, contactDraft.email, contactDraft.ssn]);

  const isValid = customerType === "Private customer"
    ? (linkedContact !== null || isContactDraftValid)
    : isOrgValid;

  const existingCustomerLink = linkedContact
    ? [...mockCustomers, ...loadNewCustomers()].find(
        (c) => c.contactId === linkedContact.id && c.customerType === "Private customer"
      )
    : null;

  const updateContactDraft = (key: keyof ReturnType<typeof emptyContactDraft>) => (value: string) =>
    setContactDraft((prev) => ({ ...prev, [key]: value }));

  const handleCancel = () => navigate("/customer/customer");

  const handleOrgSearchQueryChange = (value: string) => {
    setOrgSearchQuery(value);
    if (value.trim().length > 0) setIsOrgSearchModalOpen(true);
  };

  const handleAddBusinessContact = (contact: LinkedContact) => {
    setBusinessContacts((prev) => (prev.some((c) => c.id === contact.id) ? prev : [...prev, contact]));
  };

  const removeBusinessContact = (id: number) => {
    setBusinessContacts((prev) => prev.filter((c) => c.id !== id));
  };

  const handleCreate = React.useCallback(() => {
    if (!isValid) {
      if (customerType === "Private customer" && !linkedContact && !hasContactIdentifier) {
        setShowIdentifierError(true);
        identifierSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    const id = getNextCustomerId(mockCustomers);

    if (customerType === "Private customer") {
      const contact = linkedContact ?? createContactFromForm({
        firstName: contactDraft.firstName,
        lastName: contactDraft.lastName,
        email: contactDraft.email,
        mobileNumber: contactDraft.phoneNumber1,
        ssn: contactDraft.ssn,
        birthDate: contactDraft.birthDate,
        gender: contactDraft.gender,
        addressLine1: contactDraft.addressLine1,
        addressLine2: contactDraft.addressLine2,
        postalCode: contactDraft.postalCode,
        city: contactDraft.city,
        country: contactDraft.country,
        phoneNumber: contactDraft.phoneNumber2
      });

      const newCustomer: StoredCustomer = {
        id,
        customerNumber: formatCustomerNumber(id),
        extCustomerNumber: randomExtCustomerNumber(),
        customerName: `${contact.firstName} ${contact.lastName}`.trim(),
        customerType: "Private customer",
        store: "",
        address: contact.addressLine1,
        postalCode: contact.postalCode,
        orgNumber: "",
        customerGroup: privateCustomerGroup,
        inactive: false,
        creditC: isCreditCustomer ? "Yes" : "",
        creditBalance: isCreditCustomer ? creditBalance : "",
        email: contact.email,
        phone: contact.mobileNumber,
        contactId: contact.id,
        firstName: contact.firstName,
        lastName: contact.lastName,
        birthDate: contact.birthDate,
        gender: contact.gender,
        ssn: contact.ssn,
        extIdentityNumber: contact.extIdentityNumber,
        loyaltyProgramName: contact.loyaltyProgramName,
        loyaltyProgram,
        isCreditCustomer,
        creditLimit: isCreditCustomer ? creditLimit : undefined,
        referenceNumberRequired: isCreditCustomer ? referenceNumberRequired : undefined,
        creditLocked: isCreditCustomer ? creditLocked : undefined,
        balanceDueDate: isCreditCustomer ? balanceDueDate : undefined,
        storeAccess
      };

      saveNewCustomer(newCustomer);
    } else {
      const orgNumber = orgMode === "create"
        ? newOrgNumber.trim()
        : isEditingInternalOrg
          ? newOrgNumber.trim()
          : (linkedOrganization?.orgNr || "");
      const orgAddress = isExternalOrgLinked
        ? (externalAddressList[0]?.addressLine1 || "")
        : (orgAddresses[0]?.addressLine1 || "");
      const orgPostalCode = isExternalOrgLinked
        ? (externalAddressList[0]?.postalCode || "")
        : (orgAddresses[0]?.postalCode || "");
      const name = customerNameSameAsOrg ? organizationName.trim() : customCustomerName.trim();

      const newCustomer: StoredCustomer = {
        id,
        customerNumber: formatCustomerNumber(id),
        extCustomerNumber: randomExtCustomerNumber(),
        customerName: name,
        customerType: "Business customer",
        store: "",
        address: orgAddress,
        postalCode: orgPostalCode,
        orgNumber,
        customerGroup: businessCustomerGroup,
        inactive: false,
        creditC: isCreditCustomer ? "Yes" : "",
        creditBalance: isCreditCustomer ? creditBalance : "",
        email: orgMode === "create" || linkedOrganization?.source === "External" ? newOrgEmail.trim() : "",
        phone: orgMode === "create" || linkedOrganization?.source === "External" ? newOrgPhoneNumber.trim() : "",
        isCreditCustomer,
        creditLimit: isCreditCustomer ? creditLimit : undefined,
        referenceNumberRequired: isCreditCustomer ? referenceNumberRequired : undefined,
        creditLocked: isCreditCustomer ? creditLocked : undefined,
        balanceDueDate: isCreditCustomer ? balanceDueDate : undefined,
        storeAccess,
        contactIds: businessContacts.map((c) => c.id)
      };

      saveNewCustomer(newCustomer);
    }

    navigate(`/customer/customer/${id}`);
  }, [
    isValid, customerType, linkedContact, contactDraft, isCreditCustomer, creditLimit, creditBalance, referenceNumberRequired,
    creditLocked, balanceDueDate, loyaltyProgram, privateCustomerGroup, storeAccess, orgMode, linkedOrganization, newOrgNumber,
    customerNameSameAsOrg, organizationName, customCustomerName, businessContacts, businessCustomerGroup,
    orgAddresses, newOrgEmail, newOrgPhoneNumber, hasContactIdentifier, isEditingInternalOrg, isExternalOrgLinked, externalAddressList, navigate
  ]);

  React.useEffect(() => {
    (window as any).createCustomer = handleCreate;
    return () => { delete (window as any).createCustomer; };
  }, [handleCreate]);

  return (
    <>
      <div className="flex flex-col h-full bg-[#F4F5F6] overflow-auto">
        <div className="@container">
          <div className="py-[20px] px-[16px] sm:px-[24px] lg:px-[32px] xl:px-[48px] max-w-[1200px] w-full mx-auto">
            <div className="flex flex-col gap-6 mb-4">
              {/* Customer type */}
              <Card className={DETAIL_CARD_CLASS}>
                <CardContent className="p-8">
                  <SectionHeader>Customer type</SectionHeader>
                  <div className="flex items-center gap-[24px]">
                    <label className="flex items-center gap-[8px] cursor-pointer">
                      <input
                        type="radio"
                        name="new-customer-type"
                        checked={customerType === "Private customer"}
                        onChange={() => setCustomerType("Private customer")}
                        className="w-[16px] h-[16px] cursor-pointer accent-[#1a1a1a]"
                      />
                      <span className="font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a]">Private customer</span>
                    </label>
                    <label className="flex items-center gap-[8px] cursor-pointer">
                      <input
                        type="radio"
                        name="new-customer-type"
                        checked={customerType === "Business customer"}
                        onChange={() => setCustomerType("Business customer")}
                        className="w-[16px] h-[16px] cursor-pointer accent-[#1a1a1a]"
                      />
                      <span className="font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a]">Business customer</span>
                    </label>
                  </div>
                </CardContent>
              </Card>

              {customerType === "Business customer" ? (
                <>
                  {/* Store access + Other */}
                  <div className="grid grid-cols-1 @md:grid-cols-2 gap-6">
                    <Card className={DETAIL_CARD_CLASS}>
                      <CardContent className="p-8">
                        <SectionHeader>Store access</SectionHeader>
                        <StoreAccessFields value={storeAccess} onChange={setStoreAccess} />
                      </CardContent>
                    </Card>

                    <Card className={DETAIL_CARD_CLASS}>
                      <CardContent className="p-8">
                        <SectionHeader>Other</SectionHeader>
                        <SelectField
                          label="Customer group"
                          value={businessCustomerGroup}
                          options={CUSTOMER_GROUP_OPTIONS}
                          onChange={setBusinessCustomerGroup}
                        />
                        <CheckboxField label="Credit customer" checked={isCreditCustomer} onChange={setIsCreditCustomer} />
                      </CardContent>
                    </Card>
                  </div>

                  {/* Organization */}
                  <Card className={DETAIL_CARD_CLASS}>
                    <CardContent className="p-8">
                      <div className="flex items-center justify-between mb-[16px]">
                        <div className="flex items-center gap-[8px]">
                          <SectionHeader className="">Organization</SectionHeader>
                          {(orgMode === "create" || linkedOrganization) && (
                            <Link2 className="size-[16px] text-[#1a1a1a]" />
                          )}
                        </div>
                        {linkedOrganization && (
                          <button
                            type="button"
                            onClick={() => {
                              setLinkedOrganization(null);
                              setIsEditingInternalOrg(false);
                            }}
                            className="p-[6px] -m-[6px] rounded-full text-[#666] hover:text-[#1a1a1a] hover:bg-[#f5f5f5] cursor-pointer transition-colors"
                            aria-label="Remove organization"
                          >
                            <X className="size-[16px]" />
                          </button>
                        )}
                      </div>

                      {!linkedOrganization ? (
                        <>
                          <div className="flex items-center gap-[24px] mb-[16px]">
                            <label className="flex items-center gap-[8px] cursor-pointer">
                              <input
                                type="radio"
                                name="org-mode"
                                checked={orgMode === "search"}
                                onChange={() => setOrgMode("search")}
                                className="w-[16px] h-[16px] cursor-pointer accent-[#1a1a1a]"
                              />
                              <span className="font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a]">Search organization</span>
                            </label>
                            <label className="flex items-center gap-[8px] cursor-pointer">
                              <input
                                type="radio"
                                name="org-mode"
                                checked={orgMode === "create"}
                                onChange={() => setOrgMode("create")}
                                className="w-[16px] h-[16px] cursor-pointer accent-[#1a1a1a]"
                              />
                              <span className="font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a]">Create organization</span>
                            </label>
                          </div>

                          <div className="border-t border-[#E5E7EB] mb-[16px]" />

                          {orgMode === "search" ? (
                            <div className="max-w-[320px]">
                              <FieldLabel>Search for organization</FieldLabel>
                              <div className="relative">
                                <input
                                  type="text"
                                  value={orgSearchQuery}
                                  onChange={(e) => handleOrgSearchQueryChange(e.target.value)}
                                  placeholder="Search for organization"
                                  className="w-full h-[32px] px-[10px] pr-[35px] border border-[#CCCCCC] font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a] focus:outline-none focus:border-[#1c7862]"
                                />
                                <Search className="absolute right-[10px] top-1/2 -translate-y-1/2 w-[16px] h-[16px] text-[#666666] pointer-events-none" />
                              </div>
                            </div>
                          ) : (
                            <>
                              <CheckboxField
                                compact
                                label="Use organization name as customer name"
                                checked={customerNameSameAsOrg}
                                onChange={setCustomerNameSameAsOrg}
                              />
                              {!customerNameSameAsOrg && (
                                <div className="max-w-[320px] mb-[16px]">
                                  <InputField compact required label="Customer name" value={customCustomerName} onChange={setCustomCustomerName} />
                                </div>
                              )}

                              <div className="flex flex-col @md:flex-row items-start justify-between gap-x-8 gap-y-6 mt-[8px]">
                                <div className="w-[240px] shrink-0">
                                  <InputField required label="Org. name" value={newOrgName} onChange={setNewOrgName} />
                                  <InputField required label="Org. number" value={newOrgNumber} onChange={setNewOrgNumber} />
                                  <SelectField required label="Country" value={newOrgCountry} options={COUNTRY_OPTIONS} onChange={setNewOrgCountry} />
                                </div>

                                <div className="w-[240px] shrink-0">
                                  <SelectField label="Organization type" value={newOrgType} options={ORG_TYPE_OPTIONS} onChange={setNewOrgType} />
                                  {showOrgBranchNumber ? (
                                    <InputField label="Branch number" value={newOrgBranchNumber} onChange={setNewOrgBranchNumber} />
                                  ) : (
                                    <button
                                      type="button"
                                      onClick={() => setShowOrgBranchNumber(true)}
                                      className="block font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a] underline cursor-pointer mb-[16px]"
                                    >
                                      + Add branch number
                                    </button>
                                  )}
                                </div>

                                <div className="w-[240px] shrink-0">
                                  <FieldLabel>Phone number</FieldLabel>
                                  <div className="flex gap-[6px] mb-[16px]">
                                    <PhoneCountryCodeSelect />
                                    <input
                                      type="text"
                                      value={newOrgPhoneNumber}
                                      onChange={(e) => setNewOrgPhoneNumber(e.target.value)}
                                      className="flex-1 h-[32px] px-[10px] border border-[#CCCCCC] font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a] focus:outline-none focus:border-[#1c7862]"
                                    />
                                  </div>
                                  <InputField label="Email" value={newOrgEmail} onChange={setNewOrgEmail} />
                                </div>
                              </div>
                            </>
                          )}
                        </>
                      ) : linkedOrganization.source === "External" ? (
                        <>
                          <p className="font-['Roboto:Regular',sans-serif] text-[14px] text-[#666] mb-[16px]">Updated by external party</p>

                          <div className="border-t border-[#E5E7EB] mb-[16px]" />

                          <CheckboxField
                            compact
                            label="Use organization name as customer name"
                            checked={customerNameSameAsOrg}
                            onChange={setCustomerNameSameAsOrg}
                          />
                          {!customerNameSameAsOrg && (
                            <div className="max-w-[320px] mb-[16px]">
                              <InputField compact required label="Customer name" value={customCustomerName} onChange={setCustomCustomerName} />
                            </div>
                          )}

                          <div className="flex flex-col @md:flex-row items-start justify-between gap-x-8 gap-y-6 mt-[8px]">
                            <div className="w-[240px] shrink-0">
                              <ReadOnlyField compact label="Organisation name" value={linkedOrganization.orgName} valueClassName="underline" />
                              <ReadOnlyField compact label="Organisation number" value={linkedOrganization.orgNr} />
                              <ReadOnlyField compact label="Country" value={linkedOrganization.country} />
                            </div>
                            <div className="w-[240px] shrink-0">
                              <ReadOnlyField compact label="Organization type" value={linkedOrganization.organizationType || "–"} />
                              <ReadOnlyField compact hideIfEmpty label="Branch number" value={linkedOrganization.branchNumber || ""} />
                              <ReadOnlyField compact hideIfEmpty label="Duns number" value={linkedOrganization.dunsNumber || ""} />
                            </div>
                            <div className="w-[240px] shrink-0">
                              <FieldLabel>Phone number</FieldLabel>
                              <div className="flex gap-[6px] mb-[16px]">
                                <PhoneCountryCodeSelect />
                                <input
                                  type="text"
                                  value={newOrgPhoneNumber}
                                  onChange={(e) => setNewOrgPhoneNumber(e.target.value)}
                                  className="flex-1 h-[32px] px-[10px] border border-[#CCCCCC] font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a] focus:outline-none focus:border-[#1c7862]"
                                />
                              </div>
                              <InputField label="Email" value={newOrgEmail} onChange={setNewOrgEmail} />
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <CheckboxField
                            compact
                            label="Use organization name as customer name"
                            checked={customerNameSameAsOrg}
                            onChange={setCustomerNameSameAsOrg}
                          />
                          {!customerNameSameAsOrg && (
                            <div className="max-w-[320px] mb-[16px]">
                              <InputField compact required label="Customer name" value={customCustomerName} onChange={setCustomCustomerName} />
                            </div>
                          )}

                          {isEditingInternalOrg && (
                            <div className="mb-[16px] p-[16px] bg-white border border-[#999] rounded-[8px] flex items-start gap-[10px]">
                              <Info className="size-[18px] text-[#1a1a1a] shrink-0" />
                              <p className="font-['Roboto:Regular',sans-serif] text-[14px] leading-[20px] text-[#1a1a1a]">
                                Changes made here will also update the organization register.
                              </p>
                            </div>
                          )}

                          <div className="border-t border-[#E5E7EB] mb-[16px]" />

                          <div className="flex items-start justify-between gap-[16px]">
                            <div className="flex flex-col @md:flex-row items-start justify-between gap-x-8 gap-y-6 flex-1">
                            <div className="w-[240px] shrink-0">
                              {isEditingInternalOrg ? (
                                <>
                                  <InputField label="Organisation name" value={newOrgName} onChange={setNewOrgName} />
                                  <InputField label="Organisation number" value={newOrgNumber} onChange={setNewOrgNumber} />
                                  <SelectField label="Country" value={newOrgCountry} options={COUNTRY_OPTIONS} onChange={setNewOrgCountry} />
                                </>
                              ) : (
                                <>
                                  <ReadOnlyField compact label="Organisation name" value={linkedOrganization.orgName} valueClassName="underline" />
                                  <ReadOnlyField compact label="Organisation number" value={linkedOrganization.orgNr} />
                                  <ReadOnlyField compact label="Country" value={linkedOrganization.country} />
                                </>
                              )}
                            </div>

                            <div className="w-[240px] shrink-0">
                              {isEditingInternalOrg ? (
                                <>
                                  <SelectField label="Organization type" value={newOrgType} options={ORG_TYPE_OPTIONS} onChange={setNewOrgType} />
                                  <InputField label="Branch number" value={newOrgBranchNumber} onChange={setNewOrgBranchNumber} />
                                </>
                              ) : (
                                <>
                                  <ReadOnlyField compact label="Organization type" value={linkedOrganization.organizationType || "–"} />
                                  <ReadOnlyField compact hideIfEmpty label="Branch number" value={linkedOrganization.branchNumber || ""} />
                                </>
                              )}
                            </div>

                            <div className="w-[240px] shrink-0">
                              <FieldLabel>Phone number</FieldLabel>
                              <div className="flex gap-[6px] mb-[16px]">
                                <PhoneCountryCodeSelect />
                                <input
                                  type="text"
                                  value={newOrgPhoneNumber}
                                  onChange={(e) => setNewOrgPhoneNumber(e.target.value)}
                                  className="flex-1 h-[32px] px-[10px] border border-[#CCCCCC] font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a] focus:outline-none focus:border-[#1c7862]"
                                />
                              </div>
                              <InputField label="Email" value={newOrgEmail} onChange={setNewOrgEmail} />
                            </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => {
                                if (!isEditingInternalOrg) {
                                  setNewOrgName(linkedOrganization.orgName);
                                  setNewOrgNumber(linkedOrganization.orgNr);
                                  setNewOrgCountry(linkedOrganization.country);
                                  setNewOrgType(linkedOrganization.organizationType || ORG_TYPE_OPTIONS[0].value);
                                  setNewOrgBranchNumber(linkedOrganization.branchNumber || "");
                                }
                                setIsEditingInternalOrg((prev) => !prev);
                              }}
                              className="size-[36px] rounded-full flex items-center justify-center hover:bg-[#f5f5f5] cursor-pointer shrink-0 transition-colors"
                              aria-label="Edit organization details"
                            >
                              <Pencil className="size-[16px] text-[#1a1a1a]" />
                            </button>
                          </div>
                        </>
                      )}
                    </CardContent>
                  </Card>

                  {/* Address (organization's own addresses, manually created and/or from external party) */}
                  {showOrgAddressSection && (
                    <div className={`grid grid-cols-1 ${
                      addressCards.length === 1 ? "@md:grid-cols-1" : addressCards.length === 2 ? "@md:grid-cols-2" : "@md:grid-cols-3"
                    } gap-6`}>
                      {addressCards.map((card) => (
                        <Card key={card.key} className={DETAIL_CARD_CLASS}>
                          <CardContent className="p-8">
                            <div className="flex items-start justify-between mb-[16px]">
                              <div>
                                {card.readOnly || card.isPrimary ? (
                                  <SectionHeader className="mb-[4px]">{card.addressType || "Address"}</SectionHeader>
                                ) : (
                                  <div className="relative inline-block mb-[4px]">
                                    <select
                                      value={card.addressType}
                                      onChange={(e) => card.onTypeChange?.(e.target.value)}
                                      className="appearance-none bg-white border border-[#ccc] pl-[10px] pr-[28px] h-[32px] font-['Roboto_Condensed',sans-serif] font-bold text-[16px] uppercase text-[#1a1a1a] cursor-pointer outline-none"
                                    >
                                      {ADDRESS_TYPE_OPTIONS.map((opt) => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                      ))}
                                    </select>
                                    <ChevronDown className="pointer-events-none absolute right-[8px] top-1/2 -translate-y-1/2 size-[16px] text-[#666]" />
                                  </div>
                                )}
                                <p className="font-['Roboto:Regular',sans-serif] text-[14px] text-[#666]">
                                  {isInternalOrgContext ? "Created manually" : card.readOnly ? "Updated by external party" : card.isPrimary ? "Manually created" : "Created manually"}
                                </p>
                              </div>

                              {card.buttonMode === "plus" ? (
                                <button
                                  type="button"
                                  onClick={handleAddAddressCard}
                                  disabled={!canAddMoreAddressCards}
                                  className="size-[36px] rounded-full flex items-center justify-center hover:bg-[#f5f5f5] cursor-pointer shrink-0 transition-colors disabled:hover:bg-transparent disabled:cursor-not-allowed"
                                  aria-label="Add another address"
                                >
                                  <Plus className={`size-[16px] ${canAddMoreAddressCards ? "text-[#1a1a1a]" : "text-[#ccc]"}`} />
                                </button>
                              ) : card.buttonMode === "trash" ? (
                                <button
                                  type="button"
                                  onClick={card.onRemove}
                                  className="size-[36px] rounded-full flex items-center justify-center hover:bg-[#f5f5f5] cursor-pointer shrink-0 transition-colors"
                                  aria-label="Remove address"
                                >
                                  <Trash2 className="size-[16px] text-[#1a1a1a]" />
                                </button>
                              ) : card.buttonMode === "edit" ? (
                                <button
                                  type="button"
                                  onClick={card.onEdit}
                                  className="size-[36px] rounded-full flex items-center justify-center hover:bg-[#f5f5f5] cursor-pointer shrink-0 transition-colors"
                                  aria-label="Edit address"
                                >
                                  <Pencil className="size-[16px] text-[#1a1a1a]" />
                                </button>
                              ) : card.buttonMode === "menu" || card.buttonMode === "menu-add-only" ? (
                                <Popover.Root>
                                  <Popover.Trigger asChild>
                                    <button
                                      type="button"
                                      className="size-[36px] rounded-full flex items-center justify-center hover:bg-[#f5f5f5] cursor-pointer shrink-0 transition-colors"
                                      aria-label="Address options"
                                    >
                                      <MoreHorizontal className="size-[16px] text-[#1a1a1a]" />
                                    </button>
                                  </Popover.Trigger>
                                  <Popover.Portal>
                                    <Popover.Content
                                      align="end"
                                      sideOffset={4}
                                      className="z-[10000] bg-white border border-[#CCCCCC] shadow-lg min-w-[150px] outline-none"
                                    >
                                      <div className="flex flex-col py-1">
                                        <button
                                          type="button"
                                          onClick={handleAddAddressCard}
                                          disabled={!canAddMoreAddressCards}
                                          className="text-left text-[14px] font-normal text-[#1A1A1A] hover:bg-[#EAEAEA] flex items-center h-[36px] w-full pl-4 whitespace-nowrap cursor-pointer disabled:text-[#ccc] disabled:hover:bg-transparent disabled:cursor-not-allowed"
                                        >
                                          Add address
                                        </button>
                                        {card.buttonMode === "menu" && (
                                          <button
                                            type="button"
                                            onClick={card.onEdit}
                                            className="text-left text-[14px] font-normal text-[#1A1A1A] hover:bg-[#EAEAEA] flex items-center h-[36px] w-full pl-4 whitespace-nowrap cursor-pointer"
                                          >
                                            Edit
                                          </button>
                                        )}
                                      </div>
                                    </Popover.Content>
                                  </Popover.Portal>
                                </Popover.Root>
                              ) : null}
                            </div>

                            {card.readOnly ? (
                              <>
                                <ReadOnlyField compact label="Address line 1" value={card.addressLine1} />
                                <ReadOnlyField compact label="Address line 2" value={card.addressLine2 || "-"} />
                                <ReadOnlyField compact label="Postal code" value={card.postalCode} />
                                <ReadOnlyField compact label="City" value={card.city} />
                                <ReadOnlyField compact label="Country" value={card.country} />
                              </>
                            ) : (
                              <>
                                <InputField label="Address line 1" value={card.addressLine1} onChange={(v) => card.onUpdate?.("addressLine1", v)} />
                                <InputField label="Address line 2" value={card.addressLine2} onChange={(v) => card.onUpdate?.("addressLine2", v)} />
                                <InputField label="Postal code" value={card.postalCode} onChange={(v) => card.onUpdate?.("postalCode", v)} />
                                <InputField required={card.isPrimary} label="City" value={card.city} onChange={(v) => card.onUpdate?.("city", v)} />
                                <SelectField required={card.isPrimary} label="Country" value={card.country} options={COUNTRY_OPTIONS} onChange={(v) => card.onUpdate?.("country", v)} />
                              </>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}

                  {/* Contact person(s) */}
                  <Card className={DETAIL_CARD_CLASS}>
                    <CardContent className="p-8">
                      <SectionHeader>Contact person(s)</SectionHeader>
                      <div className="flex items-center gap-[16px] mb-[16px]">
                        <div className="w-full max-w-[320px]">
                          <ContactSearchDropdown onSelect={handleAddBusinessContact} />
                        </div>
                        <div className="flex-1" />
                        <div className="w-px h-[24px] bg-[#CCCCCC] shrink-0" />
                        <button
                          type="button"
                          onClick={() => setIsAddBusinessContactOpen(true)}
                          className="h-[30px] px-[16px] shrink-0 bg-[#eaeaea] hover:bg-[#e0e0e0] rounded-[33554400px] transition-colors cursor-pointer whitespace-nowrap"
                        >
                          <span className="font-['Roboto_Condensed:SemiBold',sans-serif] leading-[19.5px] not-italic text-[13px] text-center text-[#1a1a1a] uppercase">
                            New contact
                          </span>
                        </button>
                      </div>

                      {businessContacts.length > 0 && (
                        <div className="flex flex-col gap-[8px]">
                          {businessContacts.map((c) => (
                            <div
                              key={c.id}
                              className="flex items-center justify-between gap-[10px] px-[12px] h-[44px] border border-[#E0E0E0]"
                            >
                              <div className="min-w-0">
                                <div className="font-['Roboto:Regular',sans-serif] font-bold text-[14px] text-[#1a1a1a] truncate">
                                  {c.firstName} {c.lastName}
                                </div>
                                <div className="font-['Roboto:Regular',sans-serif] text-[12px] text-[#666] truncate">
                                  {c.identityNumber} · {c.isNew ? "New contact" : "Existing contact"}
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeBusinessContact(c.id)}
                                className="p-[6px] -m-[6px] rounded-full text-[#666] hover:text-[#1a1a1a] hover:bg-[#f5f5f5] cursor-pointer shrink-0 transition-colors"
                                aria-label="Remove contact"
                              >
                                <X className="size-[16px]" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {isCreditCustomer && (
                    <Card className={DETAIL_CARD_CLASS}>
                      <CardContent className="p-8">
                        <SectionHeader>Credit</SectionHeader>
                        <div className="grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-3 gap-x-8">
                          <div>
                            <InputField compact label="Credit limit" value={creditLimit} onChange={setCreditLimit} />
                            <InputField compact label="Credit balance" value={creditBalance} onChange={setCreditBalance} />
                          </div>
                          <div>
                            <CheckboxField compact label="Reference number required" checked={referenceNumberRequired} onChange={setReferenceNumberRequired} />
                            <CheckboxField compact label="Credit locked" checked={creditLocked} onChange={setCreditLocked} />
                          </div>
                          <div className="max-w-[220px]">
                            <DateField label="Balance due date" value={balanceDueDate} onChange={setBalanceDueDate} />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </>
              ) : (
                <>
                  {/* Store access + Loyalty program + Credit customer */}
                  <div className="grid grid-cols-1 @md:grid-cols-2 gap-6">
                    <Card className={DETAIL_CARD_CLASS}>
                      <CardContent className="p-8">
                        <SectionHeader>Store access</SectionHeader>
                        <StoreAccessFields value={storeAccess} onChange={setStoreAccess} />
                      </CardContent>
                    </Card>

                    <Card className={DETAIL_CARD_CLASS}>
                      <CardContent className="p-8">
                        <SectionHeader>Other</SectionHeader>
                        <SelectField
                          label="Customer group"
                          value={privateCustomerGroup}
                          options={CUSTOMER_GROUP_OPTIONS}
                          onChange={setPrivateCustomerGroup}
                        />
                        <CheckboxField label="Credit customer" checked={isCreditCustomer} onChange={setIsCreditCustomer} />
                      </CardContent>
                    </Card>
                  </div>

                  {/* Contact */}
                  <Card className={DETAIL_CARD_CLASS}>
                    <CardContent className="p-8">
                      {!linkedContact ? (
                        <>
                          <div className="flex items-start justify-between gap-[24px] mb-[16px]">
                            <div>
                              <SectionHeader className="mb-[4px]">Create customer</SectionHeader>
                              <div className="flex items-center gap-[8px]">
                                <p className="font-['Roboto:Regular',sans-serif] text-[14px] leading-[20px] text-[#666]">
                                  Fill out the contact information or search for an existing contact to create a customer.
                                </p>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <button type="button" className="text-[#1a1a1a] cursor-pointer shrink-0" aria-label="More information">
                                      <Info className="size-[16px]" />
                                    </button>
                                  </TooltipTrigger>
                                  <TooltipContent className="bg-[#262626] text-white font-['Roboto:Regular',sans-serif] text-[14px] px-[16px] py-[10px] rounded-[8px] max-w-[320px]">
                                    When creating a customer, a contact will automatically be created as well.
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                            </div>
                            <div className="w-full max-w-[280px] shrink-0">
                              <FieldLabel>Search existing contact</FieldLabel>
                              <ContactSearchDropdown onSelect={setLinkedContact} />
                            </div>
                          </div>

                          <div className="border-t border-[#E5E7EB] mb-[32px]" />

                          <div className="flex flex-col @md:flex-row items-start justify-between gap-x-8 gap-y-6">
                            <div className="w-[240px] shrink-0" ref={identifierSectionRef}>
                              <FieldLabel>Phone number</FieldLabel>
                              <div className="relative" onFocus={() => setFocusedIdentifierField("phone")} onBlur={() => setFocusedIdentifierField(null)}>
                                <div className="flex gap-[6px] mb-[16px]">
                                  <PhoneCountryCodeSelect highlighted={duplicateContactMatch?.field === "phone"} />
                                  <input
                                    type="text"
                                    value={contactDraft.phoneNumber1}
                                    onChange={(e) => updateContactDraft("phoneNumber1")(e.target.value)}
                                    className={`flex-1 h-[32px] px-[10px] border font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a] focus:outline-none focus:border-[#1c7862] ${duplicateContactMatch?.field === "phone" ? "border-[#e58108]" : "border-[#CCCCCC]"}`}
                                  />
                                </div>
                                {duplicateContactMatch?.field === "phone" && focusedIdentifierField === "phone" && (
                                  <DuplicateContactTooltip
                                    contactName={`${duplicateContactMatch.contact.firstName} ${duplicateContactMatch.contact.lastName}`}
                                    onUse={() => setLinkedContact(contactToLinkedContact(duplicateContactMatch.contact))}
                                  />
                                )}
                              </div>
                              {contactDraft.showPhoneNumber2 ? (
                                <div className="flex gap-[6px] mb-[16px]">
                                  <PhoneCountryCodeSelect />
                                  <input
                                    type="text"
                                    value={contactDraft.phoneNumber2}
                                    onChange={(e) => updateContactDraft("phoneNumber2")(e.target.value)}
                                    className="flex-1 h-[32px] px-[10px] border border-[#CCCCCC] font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a] focus:outline-none focus:border-[#1c7862]"
                                  />
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => setContactDraft((prev) => ({ ...prev, showPhoneNumber2: true }))}
                                  className="block font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a] underline cursor-pointer mb-[16px]"
                                >
                                  + Add another phone number
                                </button>
                              )}
                              <div className="relative" onFocus={() => setFocusedIdentifierField("email")} onBlur={() => setFocusedIdentifierField(null)}>
                                <InputField label="Email" value={contactDraft.email} onChange={updateContactDraft("email")} highlighted={duplicateContactMatch?.field === "email"} />
                                {duplicateContactMatch?.field === "email" && focusedIdentifierField === "email" && (
                                  <DuplicateContactTooltip
                                    contactName={`${duplicateContactMatch.contact.firstName} ${duplicateContactMatch.contact.lastName}`}
                                    onUse={() => setLinkedContact(contactToLinkedContact(duplicateContactMatch.contact))}
                                  />
                                )}
                              </div>
                              <div className="relative" onFocus={() => setFocusedIdentifierField("ssn")} onBlur={() => setFocusedIdentifierField(null)}>
                                <InputField label="SSN" value={contactDraft.ssn} onChange={updateContactDraft("ssn")} highlighted={duplicateContactMatch?.field === "ssn"} />
                                {duplicateContactMatch?.field === "ssn" && focusedIdentifierField === "ssn" && (
                                  <DuplicateContactTooltip
                                    contactName={`${duplicateContactMatch.contact.firstName} ${duplicateContactMatch.contact.lastName}`}
                                    onUse={() => setLinkedContact(contactToLinkedContact(duplicateContactMatch.contact))}
                                  />
                                )}
                              </div>
                              {showIdentifierError && !hasContactIdentifier && (
                                <p className="font-['Roboto:Regular',sans-serif] text-[13px] text-[#D32F2F] mb-[16px]">* One identifier is required</p>
                              )}
                              <SelectField label="Loyalty program name" value={loyaltyProgram} options={LOYALTY_PROGRAM_OPTIONS} onChange={setLoyaltyProgram} hideBlankOption />
                            </div>

                            <div className="w-[240px] shrink-0">
                              <InputField required label="First name" value={contactDraft.firstName} onChange={updateContactDraft("firstName")} />
                              <InputField required label="Last name" value={contactDraft.lastName} onChange={updateContactDraft("lastName")} />
                              <DateField label="Birth date" value={contactDraft.birthDate} onChange={updateContactDraft("birthDate")} />
                              <SelectField label="Gender" value={contactDraft.gender} options={GENDER_OPTIONS} onChange={updateContactDraft("gender")} />
                            </div>

                            <div className="w-[240px] shrink-0">
                              <InputField label="Address" value={contactDraft.addressLine1} onChange={updateContactDraft("addressLine1")} />
                              {contactDraft.showAddressLine2 ? (
                                <InputField label="Address line 2" value={contactDraft.addressLine2} onChange={updateContactDraft("addressLine2")} />
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => setContactDraft((prev) => ({ ...prev, showAddressLine2: true }))}
                                  className="block font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a] underline cursor-pointer mb-[16px]"
                                >
                                  + Add address line 2
                                </button>
                              )}
                              <InputField label="Postal code" value={contactDraft.postalCode} onChange={updateContactDraft("postalCode")} />
                              <InputField label="City" value={contactDraft.city} onChange={updateContactDraft("city")} />
                              <InputField label="Country" value={contactDraft.country} onChange={updateContactDraft("country")} />
                            </div>
                          </div>
                        </>
                      ) : (
                        <div>
                          <div className="flex items-start justify-between gap-[10px] mb-[16px]">
                            <div className="min-w-0">
                              <div className="font-['Roboto_Condensed',sans-serif] font-bold text-[20px] leading-[24px] text-[#1a1a1a] uppercase truncate">
                                {linkedContact.firstName} {linkedContact.lastName}
                              </div>
                              <div className="font-['Roboto:Regular',sans-serif] text-[14px] leading-[17px] text-[#666] truncate">
                                {linkedContact.isNew
                                  ? "New contact"
                                  : existingCustomerLink
                                    ? `Existing contact · Already linked to ${existingCustomerLink.customerName}`
                                    : "Existing contact"}
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => setLinkedContact(null)}
                              className="p-[6px] -m-[6px] rounded-full text-[#666] hover:text-[#1a1a1a] hover:bg-[#f5f5f5] cursor-pointer shrink-0 transition-colors"
                              aria-label="Remove contact"
                            >
                              <X className="size-[16px]" />
                            </button>
                          </div>
                          <div className="border-t border-[#E5E7EB] mb-[16px]" />
                          <SectionHeader>Contact</SectionHeader>
                          <div className="flex flex-col @md:flex-row @md:justify-between gap-y-4">
                          <div className="w-full @md:w-[260px]">
                            <ReadOnlyField compact label="Identity number" value={linkedContact.identityNumber} />
                            <ReadOnlyField compact label="Ext. identity number" value={linkedContact.extIdentityNumber} />
                            <ReadOnlyField compact label="Loyalty program name" value={linkedContact.loyaltyProgramName} />
                          </div>
                          <div className="w-full @md:w-[260px]">
                            <ReadOnlyField compact label="First name" value={linkedContact.firstName} />
                            <ReadOnlyField compact label="Last name" value={linkedContact.lastName} />
                            <ReadOnlyField compact label="Birth date" value={linkedContact.birthDate} />
                            <ReadOnlyField compact label="Gender" value={linkedContact.gender} />
                          </div>
                          <div className="w-full @md:w-[260px]">
                            <ReadOnlyField compact label="Email" value={linkedContact.email} />
                            <ReadOnlyField compact label="Mobile number" value={linkedContact.mobileNumber} />
                            <ReadOnlyField compact label="SSN" value={linkedContact.ssn} />
                          </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {isCreditCustomer && (
                    <Card className={DETAIL_CARD_CLASS}>
                      <CardContent className="p-8">
                        <SectionHeader>Credit</SectionHeader>
                        <div className="grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-3 gap-x-8">
                          <div>
                            <InputField compact label="Credit limit" value={creditLimit} onChange={setCreditLimit} />
                            <InputField compact label="Credit balance" value={creditBalance} onChange={setCreditBalance} />
                          </div>
                          <div>
                            <CheckboxField compact label="Reference number required" checked={referenceNumberRequired} onChange={setReferenceNumberRequired} />
                            <CheckboxField compact label="Credit locked" checked={creditLocked} onChange={setCreditLocked} />
                          </div>
                          <div className="max-w-[220px]">
                            <DateField label="Balance due date" value={balanceDueDate} onChange={setBalanceDueDate} />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <AddContactToCustomerModal
        isOpen={isAddBusinessContactOpen}
        onClose={() => setIsAddBusinessContactOpen(false)}
        onAdd={handleAddBusinessContact}
      />

      <ChooseOrganizationSearchModal
        isOpen={isOrgSearchModalOpen}
        onClose={() => setIsOrgSearchModalOpen(false)}
        initialQuery={orgSearchQuery}
        onSelectOrganization={(org) => {
          setLinkedOrganization(org);
          setIsEditingInternalOrg(false);
          setIsOrgSearchModalOpen(false);
        }}
      />
    </>
  );
}
