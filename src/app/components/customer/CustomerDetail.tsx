import React from "react";
import { useParams, useNavigate, useLocation } from "react-router";
import { loadNewCustomers } from "./newCustomers";
import { ContactPersonsGrid } from "./ContactPersonsGrid";
import { SalesGrid } from "./SalesGrid";
import { OffersGrid } from "./OffersGrid";
import { DeactivateBusinessCustomerModal } from "./DeactivateBusinessCustomerModal";
import { DeleteCustomerModal } from "./DeleteCustomerModal";
import { DeactivatePrivateCustomerModal } from "./DeactivatePrivateCustomerModal";
import { ReactivateOrganizationDialog } from "./ReactivateOrganizationDialog";
import { OrganizationDeletedDialog } from "./OrganizationDeletedDialog";
import { ChooseOrganizationModal } from "./ChooseOrganizationModal";
import { EditContactModal, ContactFields } from "./EditContactModal";
import { EditAddressModal, AddressFields } from "./EditAddressModal";
import { ChangeStoreAccessModal, StoreAccessValue, getStoreOrProfileLabel } from "./ChangeStoreAccessModal";
import { ChangeCustomerNameModal } from "./ChangeCustomerNameModal";
import { ManualPaymentModal } from "./ManualPaymentModal";
import { NewOfferModal } from "./NewOfferModal";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { motion as Motion, AnimatePresence } from "motion/react";
import { Check, X, Link as LinkIcon, MoreHorizontal, Info, Pencil, Plus } from "lucide-react";
import { Card, CardContent } from "@/app/components/ui/card";
import { DETAIL_CARD_CLASS, SectionHeader, FieldLabel, InputField, SelectField, ReadOnlyField, CheckboxField, DateField } from "./sharedFields";

type BusinessAddressType = "general" | "delivery" | "invoice";

interface CustomerCardInfo {
  cardId: string;
  startDate: string;
  externalCardId: string;
  expireDate: string;
  status: string;
}

const BUSINESS_ADDRESS_TITLES: Record<BusinessAddressType, string> = {
  general: "Address",
  delivery: "Delivery address",
  invoice: "Invoice address"
};

const NEW_ADDRESS_TYPE_OPTIONS = [
  { value: "delivery", label: "Delivery address" },
  { value: "invoice", label: "Invoice address" }
];

const ADDRESS_COUNTRY_OPTIONS = [
  { value: "Sweden", label: "Sweden" },
  { value: "Norway", label: "Norway" },
  { value: "Denmark", label: "Denmark" },
  { value: "Finland", label: "Finland" }
];

const ORG_TYPE_OPTIONS = [
  { value: "Parent", label: "Parent" },
  { value: "Subsidiary", label: "Subsidiary" },
  { value: "Branch", label: "Branch" }
];

// Mock data import (we'll need to get this from the grid component)
const mockCustomers = [
  { 
    id: 1, 
    customerNumber: "0000000001", 
    extCustomerNumber: "482103",
    customerName: "Hanna Hansen",
    customerSince: "2021-03-14",
    customerType: "Private customer",
    store: "1050",
    address: "Fjellveien 2",
    postalCode: "7530",
    orgNumber: "",
    customerGroup: "Friends and family",
    inactive: false,
    creditC: "Yes",
    creditBalance: "1000",
    balanceDueDate: "2028-10-31",
    customerCard: {
      cardId: "0000012",
      startDate: "2026-01-12",
      externalCardId: "00000000115",
      expireDate: "2030-02-15",
      status: "Active"
    },
    email: "Ola.n@eg.no",
    phone: "+4792231501"
  },
  {
    id: 2,
    customerNumber: "0000000002",
    extCustomerNumber: "3910284",
    customerName: "Norsk Dagligvare AS",
    customerSince: "2019-06-01",
    customerType: "Business customer",
    store: "1050",
    address: "Storgata 15",
    postalCode: "0155",
    orgNumber: "123456789",
    customerGroup: "Corporate",
    inactive: false,
    creditC: "A",
    creditBalance: "50000",
    email: "post@norskdagligvare.no",
    phone: "+4722334455",
    source: "Internal",
    organizationType: "Branch",
    branchNumber: "1234567",
    addresses: [
      { type: "Address", addressLine1: "Storgata 15", addressLine2: "", postalCode: "0155", city: "Oslo", country: "Norway" }
    ]
  },
  {
    id: 3,
    customerNumber: "0000000003",
    extCustomerNumber: "82910473",
    customerName: "Bergen Handel AS",
    customerSince: "2022-11-08",
    customerType: "Business customer",
    store: "1051",
    address: "Bryggen 22",
    postalCode: "5003",
    orgNumber: "987654321",
    customerGroup: "Corporate",
    inactive: false,
    creditC: "",
    creditBalance: "",
    email: "kontor@bergenhandel.no",
    phone: "+4755667788",
    source: "External",
    organizationType: "Branch",
    branchNumber: "9876543",
    dunsNumber: "9876543",
    addresses: [
      { type: "Address", addressLine1: "Bryggen 22", addressLine2: "", postalCode: "5003", city: "Bergen", country: "Norway" },
      { type: "Delivery address", addressLine1: "Bontelabo 2", addressLine2: "", postalCode: "5003", city: "Bergen", country: "Norway" },
      { type: "Invoice address", addressLine1: "Postboks 100", addressLine2: "", postalCode: "5001", city: "Bergen", country: "Norway" }
    ]
  },
  { 
    id: 4, 
    customerNumber: "0000000004", 
    extCustomerNumber: "610284",
    customerName: "Kari Hansen",
    customerSince: "2023-02-20",
    customerType: "Private customer",
    store: "1050",
    address: "Fjellveien 2",
    postalCode: "7530",
    orgNumber: "",
    customerGroup: "Demo Store VIP customers",
    inactive: false,
    creditC: "",
    creditBalance: "",
    email: "kari.hansen@eg.no",
    phone: "+4792844526"
  },
  { 
    id: 5, 
    customerNumber: "0000000005", 
    extCustomerNumber: "7402918",
    customerName: "Ola Granlie",
    customerSince: "2020-09-05",
    customerType: "Private customer",
    store: "1050",
    address: "Fjellveien 3",
    postalCode: "7530",
    orgNumber: "",
    customerGroup: "",
    inactive: false,
    creditC: "",
    creditBalance: "",
    email: "ola.granlie@eg.no",
    phone: "+4792844527"
  },
  { 
    id: 6, 
    customerNumber: "0000000006", 
    extCustomerNumber: "391847205",
    customerName: "Trondheim Engros AS",
    customerSince: "2018-01-15",
    customerType: "Business customer",
    store: "1052",
    address: "Innherredsveien 55",
    postalCode: "7014",
    orgNumber: "555666777",
    customerGroup: "Wholesale",
    inactive: false,
    creditC: "A",
    creditBalance: "75000",
    email: "salg@trondheimengros.no",
    phone: "+4773889900",
    source: "Internal",
    organizationType: "Branch",
    branchNumber: "5556667",
    addresses: [
      { type: "Address", addressLine1: "Innherredsveien 55", addressLine2: "", postalCode: "7014", city: "Trondheim", country: "Norway" }
    ]
  },
  { 
    id: 7, 
    customerNumber: "0000000007", 
    extCustomerNumber: "528374",
    customerName: "Yngvild Granlie",
    customerSince: "2024-04-10",
    customerType: "Private customer",
    store: "1001",
    address: "",
    postalCode: "",
    orgNumber: "",
    customerGroup: "",
    inactive: false,
    creditC: "",
    creditBalance: "",
    email: "",
    phone: ""
  },
  { 
    id: 8, 
    customerNumber: "0000000008", 
    extCustomerNumber: "84920173",
    customerName: "Stavanger Retail Group",
    customerSince: "2021-07-22",
    customerType: "Business customer",
    store: "1053",
    address: "Madlaveien 102",
    postalCode: "4042",
    orgNumber: "444333222",
    customerGroup: "Corporate",
    inactive: false,
    creditC: "B",
    creditBalance: "30000",
    email: "info@stavangerretail.no",
    phone: "+4751223344",
    source: "Internal",
    organizationType: "Branch",
    branchNumber: "4443332",
    addresses: [
      { type: "Address", addressLine1: "Madlaveien 102", addressLine2: "", postalCode: "4042", city: "Stavanger", country: "Norway" }
    ]
  },
  { 
    id: 9, 
    customerNumber: "0000000009", 
    extCustomerNumber: "6031928",
    customerName: "Lars Olsen",
    customerSince: "2022-05-30",
    customerType: "Private customer",
    store: "1050",
    address: "Kirkegata 8",
    postalCode: "0153",
    orgNumber: "",
    customerGroup: "VIP",
    inactive: false,
    creditC: "",
    creditBalance: "",
    email: "lars.olsen@email.no",
    phone: "+4798765432"
  },
  { 
    id: 10, 
    customerNumber: "0000000010", 
    extCustomerNumber: "274839105",
    customerName: "Oslo Matservice AS",
    customerSince: "2019-10-11",
    customerType: "Business customer",
    store: "1050",
    address: "Økernveien 94",
    postalCode: "0579",
    orgNumber: "111222333",
    customerGroup: "Wholesale",
    inactive: false,
    creditC: "A",
    creditBalance: "100000",
    email: "post@oslomatservice.no",
    phone: "+4722998877",
    source: "Internal",
    organizationType: "Branch",
    branchNumber: "1112223",
    addresses: [
      { type: "Address", addressLine1: "Økernveien 94", addressLine2: "", postalCode: "0579", city: "Oslo", country: "Norway" }
    ]
  },
  { 
    id: 11, 
    customerNumber: "0000000011", 
    extCustomerNumber: "583920",
    customerName: "Melina Andersson",
    customerSince: "2023-08-01",
    customerType: "Private customer",
    store: "1050",
    address: "Solgata 45",
    postalCode: "0458",
    orgNumber: "",
    customerGroup: "",
    inactive: true,
    creditC: "",
    creditBalance: "",
    email: "melina.andersson@email.no",
    phone: "+4798123456"
  },
  {
    id: 12,
    customerNumber: "0000000012",
    extCustomerNumber: "738291045",
    customerName: "EG Retail Trondheim",
    customerSince: "2025-01-05",
    customerType: "Business customer",
    store: "1052",
    address: "Skonnertvegen 8-10",
    postalCode: "7053",
    orgNumber: "968992600",
    customerGroup: "Corporate",
    inactive: false,
    creditC: "",
    creditBalance: "",
    email: "post@egretailtrondheim.no",
    phone: "+4773123456",
    source: "Internal",
    organizationType: "Branch",
    branchNumber: "9689926",
    organizationRegisterId: 9,
    addresses: [
      { type: "Address", addressLine1: "Skonnertvegen 8-10", addressLine2: "", postalCode: "7053", city: "Trondheim", country: "Norway" },
      { type: "Invoice address", addressLine1: "Skonnertvegen 10", addressLine2: "", postalCode: "7053", city: "Trondheim", country: "Norway" }
    ]
  }
];

const EXAMPLE_CUSTOMER_NOTES: Record<number, string> = {
  1: "Prefers contact via SMS. Allergic to nuts - flagged for bakery counter staff.",
  2: "",
  3: "External data source (D&B) - do not edit organization details manually.",
  4: "Requested loyalty card replacement on 2024-11-02, issued new card same day.",
  5: "",
  6: "Large volume orders - always confirm delivery slot with warehouse before dispatch.",
  7: "",
  8: "",
  9: "Has requested to be contacted only by email, not phone.",
  10: "Ongoing dispute regarding invoice #4021 - escalated to finance team 2024-09-15. Customer expects a written apology and partial credit note before continuing further orders. Do not close this note until finance confirms the case is fully resolved and the credit note has been issued.",
  11: "VIP customer, active in loyalty program 'EG Trondheim'. Handle with priority.",
  12: ""
};

const NOTES_MAX_HEIGHT = 320;

function AddressSection({ title, fields, onEdit }: { title: string; fields: AddressFields; onEdit: () => void }) {
  return (
    <div className="flex-1 min-w-[200px]">
      <div className="flex items-center justify-between mb-[10px]">
        <SectionHeader className="">{title}</SectionHeader>
        <button type="button" onClick={onEdit} className="p-[6px] -m-[6px] rounded-full text-[#666] hover:text-[#1a1a1a] hover:bg-[#f5f5f5] cursor-pointer transition-colors" aria-label={`Edit ${title.toLowerCase()}`}>
          <Pencil className="size-[16px]" />
        </button>
      </div>

      {/* Address is edited via modal, matching the private customer contact card pattern */}
      <ReadOnlyField compact hideIfEmpty label="Address line 1" value={fields.addressLine1} />
      <ReadOnlyField compact hideIfEmpty label="Address line 2" value={fields.addressLine2} />
      <ReadOnlyField compact hideIfEmpty label="Postal code" value={fields.postalCode} />
      <ReadOnlyField compact hideIfEmpty label="City" value={fields.city} />
      <ReadOnlyField compact hideIfEmpty label="Country" value={fields.country} />
    </div>
  );
}

export function CustomerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isInactive, setIsInactive] = React.useState(false);
  const [creditCustomerDraft, setCreditCustomerDraft] = React.useState(false);
  const [customerCard, setCustomerCard] = React.useState<CustomerCardInfo | null>(null);
  const [creditLimit, setCreditLimit] = React.useState("0");
  const [creditBalance, setCreditBalance] = React.useState("0");
  const [referenceNumberRequired, setReferenceNumberRequired] = React.useState(false);
  const [creditLocked, setCreditLocked] = React.useState(false);
  const [balanceDueDate, setBalanceDueDate] = React.useState("");
  const [isManualPaymentModalOpen, setIsManualPaymentModalOpen] = React.useState(false);
  const [deactivationReason, setDeactivationReason] = React.useState("");
  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = React.useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [showDeactivateToast, setShowDeactivateToast] = React.useState(false);
  const [showDeleteToast, setShowDeleteToast] = React.useState(false);
  const [showActivateToast, setShowActivateToast] = React.useState(false);
  const [deactivateToastMessage, setDeactivateToastMessage] = React.useState("");
  const [isReactivateOrgDialogOpen, setIsReactivateOrgDialogOpen] = React.useState(false);
  const [isOrgDeletedDialogOpen, setIsOrgDeletedDialogOpen] = React.useState(false);
  const [isChooseOrgModalOpen, setIsChooseOrgModalOpen] = React.useState(false);
  const [isEditingOrgIdentity, setIsEditingOrgIdentity] = React.useState(false);
  const [customerNotes, setCustomerNotes] = React.useState("");
  const [orgNameDraft, setOrgNameDraft] = React.useState("");
  const [orgNumberDraft, setOrgNumberDraft] = React.useState("");
  const [orgTypeDraft, setOrgTypeDraft] = React.useState("Branch");
  const [orgBranchNumberDraft, setOrgBranchNumberDraft] = React.useState("");
  const [isEditContactModalOpen, setIsEditContactModalOpen] = React.useState(false);
  const [contactFields, setContactFields] = React.useState<ContactFields>({
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "",
    email: "",
    mobileNumber: "",
    ssn: "",
    loyaltyProgramName: "",
    extIdentityNumber: ""
  });
  const [isEditAddressModalOpen, setIsEditAddressModalOpen] = React.useState(false);
  const [addressFields, setAddressFields] = React.useState<AddressFields>({
    addressLine1: "",
    addressLine2: "",
    postalCode: "",
    city: "",
    country: ""
  });
  const [isChangeStoreAccessModalOpen, setIsChangeStoreAccessModalOpen] = React.useState(false);
  const [isChangeCustomerNameModalOpen, setIsChangeCustomerNameModalOpen] = React.useState(false);
  const [customerNameOverride, setCustomerNameOverride] = React.useState("");
  const [isContactsExpanded, setIsContactsExpanded] = React.useState(false);
  const [contactsExpandStyle, setContactsExpandStyle] = React.useState<React.CSSProperties>({});
  const contactsScrollContainerRef = React.useRef<HTMLDivElement>(null);
  const contactsWrapperRef = React.useRef<HTMLDivElement>(null);
  const contactsNaturalLeftRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    if (!isContactsExpanded) {
      contactsNaturalLeftRef.current = null;
      setContactsExpandStyle({});
      return;
    }

    const measure = () => {
      const container = contactsScrollContainerRef.current;
      const wrapper = contactsWrapperRef.current;
      if (!container || !wrapper) return;
      if (contactsNaturalLeftRef.current === null) {
        contactsNaturalLeftRef.current = wrapper.getBoundingClientRect().left;
      }
      const containerRect = container.getBoundingClientRect();
      const margin = 30;
      const width = containerRect.width - margin * 2;
      const left = containerRect.left + margin - contactsNaturalLeftRef.current;
      setContactsExpandStyle({ position: "relative", left: `${left}px`, width: `${width}px` });
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [isContactsExpanded]);
  const [storeAccess, setStoreAccess] = React.useState<StoreAccessValue>({
    type: "all",
    profileId: "",
    teamId: "",
    storeIds: []
  });
  const emptyAddress: AddressFields = { addressLine1: "", addressLine2: "", postalCode: "", city: "", country: "" };
  const [businessAddresses, setBusinessAddresses] = React.useState<Record<BusinessAddressType, AddressFields>>({
    general: emptyAddress,
    delivery: emptyAddress,
    invoice: emptyAddress
  });
  const [editingAddressType, setEditingAddressType] = React.useState<BusinessAddressType | null>(null);
  const [isAddingAddress, setIsAddingAddress] = React.useState(false);
  const [newAddressType, setNewAddressType] = React.useState<"delivery" | "invoice">("delivery");
  const [newAddressDraft, setNewAddressDraft] = React.useState<AddressFields>(emptyAddress);

  // Parse URL search params manually
  const searchParams = new URLSearchParams(location.search);
  const activeTab = searchParams.get("tab") || "details";
  
  const customerId = id ? parseInt(id) : 0;
  const customer = [...mockCustomers, ...loadNewCustomers()].find(c => c.id === customerId);
  
  if (!customer) {
    return <div className="p-[20px]">Customer not found</div>;
  }
  
  // Initialize inactive state from customer data
  React.useEffect(() => {
    // Check if customer is in deactivated list
    const stored = localStorage.getItem('deactivatedCustomers');
    const deactivatedCustomers = stored ? JSON.parse(stored) : {};
    
    if (deactivatedCustomers[customer.id]) {
      setIsInactive(true);
      setDeactivationReason(deactivatedCustomers[customer.id].reason);
    } else {
      setIsInactive(customer.inactive);
    }
  }, [customer.inactive, customer.id]);

  // Initialize the credit customer checkbox and credit fields from customer data,
  // falling back to any previously persisted values so the choice survives a page reload
  React.useEffect(() => {
    const stored = localStorage.getItem('creditCustomers');
    const creditCustomers = stored ? JSON.parse(stored) : {};
    const saved = customer.id in creditCustomers ? creditCustomers[customer.id] : !!customer.creditC;
    setCreditCustomerDraft(saved);

    const storedCustomerCards = localStorage.getItem('customerCardsIssued');
    const customerCardsIssued = storedCustomerCards ? JSON.parse(storedCustomerCards) : {};
    const issuedCard = customerCardsIssued[customer.id];
    if (issuedCard && typeof issuedCard === 'object') {
      setCustomerCard(issuedCard);
    } else if ((customer as any).customerCard) {
      setCustomerCard((customer as any).customerCard);
    } else {
      setCustomerCard(null);
    }

    const storedFields = localStorage.getItem('creditFields');
    const creditFields = storedFields ? JSON.parse(storedFields) : {};
    const fields = creditFields[customer.id];
    if (fields) {
      setCreditLimit(fields.creditLimit);
      setCreditBalance(fields.creditBalance);
      setReferenceNumberRequired(fields.referenceNumberRequired);
      setCreditLocked(fields.creditLocked);
      setBalanceDueDate(fields.balanceDueDate);
    } else {
      setCreditLimit(customer.creditBalance || "0");
      setCreditBalance("0");
      setReferenceNumberRequired(false);
      setCreditLocked(false);
      setBalanceDueDate((customer as any).balanceDueDate || "");
    }
  }, [customer.creditC, customer.creditBalance, customer.id]);

  // Initialize the contact fields (private customers), falling back to any
  // previously persisted values so edits survive a page reload
  React.useEffect(() => {
    const stored = localStorage.getItem('contactFields');
    const allContactFields = stored ? JSON.parse(stored) : {};
    const saved = allContactFields[customer.id];
    if (saved) {
      setContactFields(saved);
    } else {
      const [firstName, ...rest] = customer.customerName.split(" ");
      setContactFields({
        firstName,
        lastName: rest.join(" "),
        birthDate: "1995-01-01",
        gender: "Female",
        email: customer.email,
        mobileNumber: customer.phone,
        ssn: "199501012223",
        loyaltyProgramName: "EG Trondheim",
        extIdentityNumber: "19029871"
      });
    }
  }, [customer.id, customer.customerName, customer.email, customer.phone]);

  const handleSaveContact = (fields: ContactFields) => {
    setContactFields(fields);
    const stored = localStorage.getItem('contactFields');
    const allContactFields = stored ? JSON.parse(stored) : {};
    allContactFields[customer.id] = fields;
    localStorage.setItem('contactFields', JSON.stringify(allContactFields));
  };

  // Initialize the address fields (private customers), falling back to any
  // previously persisted values so edits survive a page reload
  React.useEffect(() => {
    const stored = localStorage.getItem('addressFields');
    const allAddressFields = stored ? JSON.parse(stored) : {};
    const saved = allAddressFields[customer.id];
    if (saved) {
      setAddressFields(saved);
    } else {
      setAddressFields({
        addressLine1: customer.address || "",
        addressLine2: "",
        postalCode: customer.postalCode || "",
        city: "Göteborg",
        country: "Sweden"
      });
    }
  }, [customer.id, customer.address, customer.postalCode]);

  const handleSaveAddress = (fields: AddressFields) => {
    setAddressFields(fields);
    const stored = localStorage.getItem('addressFields');
    const allAddressFields = stored ? JSON.parse(stored) : {};
    allAddressFields[customer.id] = fields;
    localStorage.setItem('addressFields', JSON.stringify(allAddressFields));
  };

  // Initialize the business customer's 3 addresses (shared with the organisation),
  // falling back to any previously persisted values so edits survive a page reload
  React.useEffect(() => {
    const stored = localStorage.getItem('businessAddresses');
    const allBusinessAddresses = stored ? JSON.parse(stored) : {};
    const saved = allBusinessAddresses[customer.id];
    if (saved) {
      setBusinessAddresses(saved);
    } else {
      const findAddress = (type: string): AddressFields => {
        const match = ((customer as any).addresses || []).find((a: any) => a.type === type);
        return match
          ? { addressLine1: match.addressLine1, addressLine2: match.addressLine2 || "", postalCode: match.postalCode, city: match.city, country: match.country }
          : emptyAddress;
      };
      const general = findAddress("Address");
      setBusinessAddresses({
        general: general.addressLine1 ? general : { addressLine1: customer.address || "", addressLine2: "", postalCode: customer.postalCode || "", city: "", country: "" },
        delivery: findAddress("Delivery address"),
        invoice: findAddress("Invoice address")
      });
    }
  }, [customer.id]);

  const handleSaveBusinessAddress = (type: BusinessAddressType, fields: AddressFields) => {
    setBusinessAddresses((prev) => {
      const next = { ...prev, [type]: fields };
      const stored = localStorage.getItem('businessAddresses');
      const allBusinessAddresses = stored ? JSON.parse(stored) : {};
      allBusinessAddresses[customer.id] = next;
      localStorage.setItem('businessAddresses', JSON.stringify(allBusinessAddresses));
      return next;
    });
  };

  // Initialize store access, falling back to any previously persisted value
  React.useEffect(() => {
    const stored = localStorage.getItem('storeAccess');
    const allStoreAccess = stored ? JSON.parse(stored) : {};
    const saved = allStoreAccess[customer.id];
    setStoreAccess(saved || { type: "all", profileId: "", teamId: "", storeIds: [] });
  }, [customer.id]);

  const handleSaveStoreAccess = (value: StoreAccessValue) => {
    setStoreAccess(value);
    const stored = localStorage.getItem('storeAccess');
    const allStoreAccess = stored ? JSON.parse(stored) : {};
    allStoreAccess[customer.id] = value;
    localStorage.setItem('storeAccess', JSON.stringify(allStoreAccess));
  };

  // Initialize the customer name override, falling back to any previously persisted value
  React.useEffect(() => {
    const stored = localStorage.getItem('customerNameOverrides');
    const allOverrides = stored ? JSON.parse(stored) : {};
    setCustomerNameOverride(allOverrides[customer.id] || "");
  }, [customer.id]);

  const handleSaveCustomerName = (name: string) => {
    setCustomerNameOverride(name);
    const stored = localStorage.getItem('customerNameOverrides');
    const allOverrides = stored ? JSON.parse(stored) : {};
    allOverrides[customer.id] = name;
    localStorage.setItem('customerNameOverrides', JSON.stringify(allOverrides));
  };

  const displayCustomerName = customerNameOverride || customer.customerName;

  const [isNewOfferModalOpen, setIsNewOfferModalOpen] = React.useState(false);

  // Initialize customer notes, falling back to any previously persisted value
  React.useEffect(() => {
    const stored = localStorage.getItem('customerNotes');
    const allNotes = stored ? JSON.parse(stored) : {};
    const saved = allNotes[customer.id];
    setCustomerNotes(saved !== undefined ? saved : EXAMPLE_CUSTOMER_NOTES[customer.id] ?? "");
  }, [customer.id]);

  // Auto-grow the notes textarea to fit its content, up to a max height, then scroll internally
  const notesTextareaRef = React.useRef<HTMLTextAreaElement>(null);
  React.useEffect(() => {
    const el = notesTextareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, NOTES_MAX_HEIGHT)}px`;
  }, [customerNotes]);

  // When a customer who wasn't already a credit customer gets the checkbox ticked,
  // reset the credit fields to their defaults instead of showing stale data
  const handleCreditCustomerToggle = (checked: boolean) => {
    setCreditCustomerDraft(checked);
    if (checked) {
      const stored = localStorage.getItem('creditFields');
      const creditFields = stored ? JSON.parse(stored) : {};
      const hasExistingCreditData = customer.id in creditFields || !!customer.creditC;
      if (!hasExistingCreditData) {
        setCreditLimit("0");
        setCreditBalance("0");
        setReferenceNumberRequired(false);
        setCreditLocked(false);
        setBalanceDueDate("");
      }
    }
  };
  
  const isBusinessCustomer = customer.customerType === "Business customer";
  const isExternalOrg = (customer as any).source === "External";

  // Mock data for sole customer check and transactions
  const isSoleCustomer = true; // Would come from API
  const organizationName = "Nordic Retail AB"; // Would come from API
  const hasTransactions = false; // Would come from API
  
  // Get organization status from deactivation data
  const getOrganizationStatus = () => {
    if (!isBusinessCustomer || !isInactive) return null;
    
    const stored = localStorage.getItem('deactivatedCustomers');
    const deactivatedCustomers = stored ? JSON.parse(stored) : {};
    const deactivationData = deactivatedCustomers[customer.id];
    
    if (deactivationData?.orgAction === "deactivate") {
      return "deactivated";
    } else if (deactivationData?.orgAction === "delete") {
      return "deleted";
    }
    return null;
  };
  
  const organizationStatus = getOrganizationStatus();
  
  // Check if customer has active sales - example: Melina Andersson has active sale
  const hasActiveSales = customer.customerName === "Melina Andersson";
  const activeSalesCount = hasActiveSales ? 1 : 0;
  
  // For Business customers, can delete if sole customer
  // For Private customers, can delete if no active sales
  const canDelete = isBusinessCustomer ? (isInactive && isSoleCustomer && !hasTransactions) : (isInactive && !hasActiveSales);

  const handleDeactivate = () => {
    if (isBusinessCustomer) {
      setIsDeactivateModalOpen(true);
    } else {
      // For private customers, deactivate directly without modal
      setIsDeactivateModalOpen(true);
    }
  };

  const handleConfirmDeactivate = (reason: string, reasonText?: string) => {
    console.log("Deactivating customer:", { reason, reasonText });
    setIsInactive(true);
    
    // Set deactivation reason for display
    let displayReason = "";
    if (reason === "other") {
      displayReason = reasonText || "Other";
    } else {
      displayReason = {
        "business-closed": "Business closed",
        "customer-request": "Customer request",
        "no-longer-purchasing": "No longer purchasing",
        "credit-issues": "Credit issues",
        "merged-with-another": "Merged with another",
        "data-quality-issue": "Data quality issue"
      }[reason] || reason;
    }
    setDeactivationReason(displayReason);
    
    // Persist deactivated status to localStorage
    const stored = localStorage.getItem('deactivatedCustomers');
    const deactivatedCustomers = stored ? JSON.parse(stored) : {};
    deactivatedCustomers[customer.id] = {
      reason: displayReason,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('deactivatedCustomers', JSON.stringify(deactivatedCustomers));
    
    setIsDeactivateModalOpen(false);
    
    // Simple toast message for business customers now
    const toastMessage = "Customer was successfully deactivated.";
    
    setDeactivateToastMessage(toastMessage);
    setShowDeactivateToast(true);
    setTimeout(() => setShowDeactivateToast(false), 5000);
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const handleAddCustomerCard = () => {
    const today = new Date();
    const expireDate = new Date(today);
    expireDate.setFullYear(expireDate.getFullYear() + 4);
    const newCard: CustomerCardInfo = {
      cardId: String(customer.id).padStart(7, "0"),
      startDate: today.toISOString().slice(0, 10),
      externalCardId: String(Math.floor(1e10 + Math.random() * 9e10)),
      expireDate: expireDate.toISOString().slice(0, 10),
      status: "Active"
    };
    setCustomerCard(newCard);
    const stored = localStorage.getItem('customerCardsIssued');
    const customerCardsIssued = stored ? JSON.parse(stored) : {};
    customerCardsIssued[customer.id] = newCard;
    localStorage.setItem('customerCardsIssued', JSON.stringify(customerCardsIssued));
  };

  const handleInactivateCustomerCard = () => {
    if (!customerCard) return;
    const updatedCard: CustomerCardInfo = { ...customerCard, status: "Inactive" };
    setCustomerCard(updatedCard);
    const stored = localStorage.getItem('customerCardsIssued');
    const customerCardsIssued = stored ? JSON.parse(stored) : {};
    customerCardsIssued[customer.id] = updatedCard;
    localStorage.setItem('customerCardsIssued', JSON.stringify(customerCardsIssued));
  };

  const handleConfirmDelete = () => {
    console.log("Deleting customer");
    
    // Store the deleted customer ID in localStorage
    const stored = localStorage.getItem('deletedCustomerIds');
    const deletedIds = stored ? JSON.parse(stored) : [];
    if (!deletedIds.includes(customer.id)) {
      deletedIds.push(customer.id);
      localStorage.setItem('deletedCustomerIds', JSON.stringify(deletedIds));
    }
    
    // Set flag to show toast in the grid
    localStorage.setItem('showDeletedCustomerToast', 'true');
    
    // Dispatch custom event for same-tab updates
    window.dispatchEvent(new Event('customerDeleted'));
    
    // Close the modal
    setIsDeleteModalOpen(false);
    
    // Navigate immediately to customer list
    navigate("/customer/customer");
  };

  const handleActivate = () => {
    // For business customers, check organization status
    if (isBusinessCustomer) {
      // Get deactivation data to check org action
      const stored = localStorage.getItem('deactivatedCustomers');
      const deactivatedCustomers = stored ? JSON.parse(stored) : {};
      const deactivationData = deactivatedCustomers[customer.id];
      
      if (deactivationData) {
        const orgAction = deactivationData.orgAction;
        
        if (orgAction === "deactivate") {
          // Organization was deactivated - ask if they want to reactivate it
          setIsReactivateOrgDialogOpen(true);
        } else if (orgAction === "delete") {
          // Organization was deleted - ask if they want to create new or choose existing
          setIsOrgDeletedDialogOpen(true);
        } else {
          // Organization was kept active - just activate customer
          activateCustomerOnly();
        }
      } else {
        // No deactivation data - just activate
        activateCustomerOnly();
      }
    } else {
      // Private customer - activate directly
      activateCustomerOnly();
    }
  };

  const activateCustomerOnly = () => {
    setIsInactive(false);
    setDeactivationReason("");
    
    // Remove from deactivated customers in localStorage
    const stored = localStorage.getItem('deactivatedCustomers');
    const deactivatedCustomers = stored ? JSON.parse(stored) : {};
    delete deactivatedCustomers[customer.id];
    localStorage.setItem('deactivatedCustomers', JSON.stringify(deactivatedCustomers));
    
    // Show success toast
    setShowActivateToast(true);
    setTimeout(() => setShowActivateToast(false), 5000);
  };

  const handleReactivateOrgConfirm = (action: 'activate' | 'choose-another' | 'cancel') => {
    setIsReactivateOrgDialogOpen(false);
    
    if (action === 'activate') {
      // Activate both customer and organization
      console.log("Activating customer and organization");
      
      // Activate the customer
      activateCustomerOnly();
      
      // Activate the organization in localStorage
      const stored = localStorage.getItem('deactivatedCustomers');
      if (stored) {
        const deactivatedCustomers = JSON.parse(stored);
        // Find all customers with this organization and update their organization status
        Object.keys(deactivatedCustomers).forEach(customerId => {
          const customerData = deactivatedCustomers[customerId];
          if (customerData.organizationName === organizationName && customerData.organizationStatus === 'inactive') {
            // Update organization status to active
            delete customerData.organizationStatus;
          }
        });
        localStorage.setItem('deactivatedCustomers', JSON.stringify(deactivatedCustomers));
      }
      
      console.log(`Organization "${organizationName}" has been activated`);
    } else if (action === 'choose-another') {
      // User chose to select a different organization
      setIsChooseOrgModalOpen(true);
    }
    // If action is 'cancel', just close the dialog (already done above)
  };

  const handleOrgDeletedCreateNew = () => {
    setIsOrgDeletedDialogOpen(false);
    console.log("Creating new organization with stored data");
    // In real app, would create new organization and link to customer
    activateCustomerOnly();
  };

  const handleOrgDeletedChooseExisting = () => {
    setIsOrgDeletedDialogOpen(false);
    setIsChooseOrgModalOpen(true);
  };

  const handleOrgDeletedContinue = () => {
    setIsOrgDeletedDialogOpen(false);
    setIsChooseOrgModalOpen(true);
  };

  const handleSelectOrganization = (orgId: number) => {
    setIsChooseOrgModalOpen(false);
    console.log("Selected organization:", orgId);
    // In real app, would link customer to selected organization
    activateCustomerOnly();
  };

  const persistCreditFields = (overrides: Record<string, unknown>) => {
    const stored = localStorage.getItem('creditFields');
    const creditFields = stored ? JSON.parse(stored) : {};
    creditFields[customer.id] = {
      creditLimit,
      creditBalance,
      referenceNumberRequired,
      creditLocked,
      balanceDueDate,
      ...overrides
    };
    localStorage.setItem('creditFields', JSON.stringify(creditFields));
  };

  const handleManualPayment = (amount: string, comment: string) => {
    const newBalance = Math.max(0, Number(creditBalance || "0") - Number(amount)).toString();
    setCreditBalance(newBalance);
    persistCreditFields({ creditBalance: newBalance });
    console.log("Manual payment registered", { amount, comment });
  };

  const handleSave = () => {
    console.log("Saving customer...");

    // Persist the credit customer choice and its fields (simulates saving to the database)
    const stored = localStorage.getItem('creditCustomers');
    const creditCustomers = stored ? JSON.parse(stored) : {};
    creditCustomers[customer.id] = creditCustomerDraft;
    localStorage.setItem('creditCustomers', JSON.stringify(creditCustomers));

    const storedFields = localStorage.getItem('creditFields');
    const creditFields = storedFields ? JSON.parse(storedFields) : {};
    creditFields[customer.id] = { creditLimit, creditBalance, referenceNumberRequired, creditLocked, balanceDueDate };
    localStorage.setItem('creditFields', JSON.stringify(creditFields));

    const storedNotes = localStorage.getItem('customerNotes');
    const allNotes = storedNotes ? JSON.parse(storedNotes) : {};
    allNotes[customer.id] = customerNotes;
    localStorage.setItem('customerNotes', JSON.stringify(allNotes));
  };

  // Expose customer status and handlers globally so Footer can access them
  React.useEffect(() => {
    (window as any).isCustomerInactive = isInactive;
    (window as any).isBusinessCustomer = isBusinessCustomer;
    (window as any).canDeleteCustomer = canDelete;
    (window as any).deactivateCustomer = handleDeactivate;
    (window as any).activateCustomer = handleActivate;
    (window as any).deleteCustomer = handleDelete;
    (window as any).saveCustomer = handleSave;
    (window as any).customerName = displayCustomerName;
    (window as any).customerType = customer.customerType;
    (window as any).hasCustomerCard = !!customerCard;
    (window as any).addCustomerCard = handleAddCustomerCard;
    (window as any).openNewOfferModal = () => setIsNewOfferModalOpen(true);

    return () => {
      delete (window as any).isCustomerInactive;
      delete (window as any).isBusinessCustomer;
      delete (window as any).canDeleteCustomer;
      delete (window as any).deactivateCustomer;
      delete (window as any).activateCustomer;
      delete (window as any).deleteCustomer;
      delete (window as any).saveCustomer;
      delete (window as any).customerName;
      delete (window as any).customerType;
      delete (window as any).hasCustomerCard;
      delete (window as any).addCustomerCard;
      delete (window as any).openNewOfferModal;
    };
  }, [isInactive, isBusinessCustomer, canDelete, customer.customerName, customerNameOverride, customer.customerType, creditCustomerDraft, creditLimit, creditBalance, referenceNumberRequired, creditLocked, balanceDueDate, customerCard]);

  const handleTabChange = (tab: string) => {
    const params = new URLSearchParams(location.search);
    params.set("tab", tab);
    navigate(`/customer/customer/${id}?${params.toString()}`, { replace: true });
  };

  // For private customers, use the Figma imported design
  if (!isBusinessCustomer) {
    const privateTabLabels: Record<string, string> = {
      sales: "Sales",
      offers: "Discount",
      "customer-orders": "Customer orders"
    };

    return (
      <>
        <div className="flex flex-col h-full bg-[#F4F5F6] overflow-auto">
          {activeTab === "sales" ? (
            <SalesGrid />
          ) : activeTab === "offers" ? (
            <OffersGrid customerGroupName={customer.customerGroup} />
          ) : activeTab !== "details" ? (
            // Customer orders (placeholder) - same tab set as business customers
            <div className="p-[20px] flex-1 overflow-auto">
              <div className="bg-white border border-[#E5E7EB] rounded-xl p-8">
                <p className="font-['Roboto:Regular',sans-serif] text-[14px] text-[#666]">
                  {privateTabLabels[activeTab] || "Details"} content will be displayed here.
                </p>
              </div>
            </div>
          ) : (
            // Details Tab Content - unified card layout, mirroring business customers
            <div className="@container">
              <div className="py-[20px] px-[16px] sm:px-[24px] lg:px-[32px] xl:px-[48px] max-w-[1200px] w-full mx-auto">
                <div className="flex flex-col gap-6 mb-4">
                  {/* Customer identity card */}
                  <Card className={DETAIL_CARD_CLASS}>
                    <CardContent className="p-8">
                      <div className="flex items-start justify-between gap-[10px] mb-[4px]">
                        <div className="flex items-center gap-[10px]">
                          <h2 className="font-['Roboto_Condensed',sans-serif] font-bold text-[20px] leading-[24px] tracking-[0px] text-[#1a1a1a] uppercase">
                            {customer.customerName}
                          </h2>
                          <span className={`shrink-0 font-['Roboto_Condensed',sans-serif] text-[11px] font-bold uppercase px-[10px] py-[2px] rounded-full border ${isInactive ? "border-[#999] text-[#999]" : "border-[#1a1a1a] text-[#1a1a1a]"}`}>
                            {isInactive ? "Inactive" : "Active"}
                          </span>
                        </div>
                        <DropdownMenu.Root>
                          <DropdownMenu.Trigger asChild>
                            <button type="button" className="shrink-0 p-[4px] rounded-full text-[#666] hover:text-[#1a1a1a] hover:bg-[#f5f5f5] cursor-pointer transition-colors">
                              <MoreHorizontal className="size-[18px]" />
                            </button>
                          </DropdownMenu.Trigger>
                          <DropdownMenu.Portal>
                            <DropdownMenu.Content
                              className="z-[10000] bg-white border border-[#CCCCCC] shadow-lg outline-none overflow-hidden min-w-[200px]"
                              align="end"
                              sideOffset={4}
                            >
                              <DropdownMenu.Item
                                onClick={() => setIsChangeStoreAccessModalOpen(true)}
                                className="h-[36px] px-4 flex items-center text-[14px] font-roboto font-normal text-[#1A1A1A] outline-none cursor-pointer focus:bg-[#EAEAEA] transition-colors"
                              >
                                Change store access
                              </DropdownMenu.Item>
                            </DropdownMenu.Content>
                          </DropdownMenu.Portal>
                        </DropdownMenu.Root>
                      </div>
                      <div className="flex items-center justify-between mb-[16px]">
                        <p className="font-['Roboto:Regular',sans-serif] text-[14px] text-[#666]">{customer.customerType}</p>
                        <p className="font-['Roboto:Regular',sans-serif] text-[13px] text-[#666] whitespace-nowrap">
                          Customer since: {(customer as any).customerSince || "–"}
                        </p>
                      </div>
                      <div className="border-t border-[#E5E7EB] mb-[16px]" />

                      <div className="flex flex-col @md:flex-row @md:justify-between gap-y-4">
                        <div className="w-full @md:w-[260px]">
                          <ReadOnlyField compact label="Customer number" value={customer.customerNumber} />
                          {isInactive ? (
                            <ReadOnlyField compact label="Ext. customer number" value={customer.extCustomerNumber} />
                          ) : (
                            <InputField compact label="Ext. customer number" value={customer.extCustomerNumber} />
                          )}
                        </div>
                        <div className="w-full @md:w-[260px]">
                          <ReadOnlyField compact label="Store" value={getStoreOrProfileLabel(customer.store)} />
                          {isInactive ? (
                            <ReadOnlyField compact label="Customer group" value={customer.customerGroup || "–"} />
                          ) : (
                            <SelectField
                              compact
                              label="Customer group"
                              value={customer.customerGroup}
                              options={[
                                { value: "", label: "-" },
                                { value: "Friends and family", label: "Friends and family" },
                                { value: "VIP", label: "VIP" },
                                { value: "Demo Store VIP customers", label: "Demo Store VIP customers" }
                              ]}
                            />
                          )}
                        </div>
                        <div className="w-full @md:w-[260px]">
                          <CheckboxField compact label="Credit customer" checked={creditCustomerDraft} onChange={handleCreditCustomerToggle} />
                        </div>
                      </div>

                      {isInactive && deactivationReason && (
                        <div className="mt-[16px] pt-[10px] border-t border-[#E5E7EB]">
                          <ReadOnlyField label="Deactivation reason" value={deactivationReason} />
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Contact card */}
                  <Card className={DETAIL_CARD_CLASS}>
                    <CardContent className="p-8">
                      <div className="flex items-center justify-between mb-[10px]">
                        <SectionHeader className="">Contact</SectionHeader>
                        <button type="button" onClick={() => setIsEditContactModalOpen(true)} className="p-[6px] -m-[6px] rounded-full text-[#666] hover:text-[#1a1a1a] hover:bg-[#f5f5f5] cursor-pointer transition-colors" aria-label="Edit contact">
                          <Pencil className="size-[16px]" />
                        </button>
                      </div>
                      <div className="flex flex-col @md:flex-row @md:justify-between gap-y-4">
                        <div className="w-full @md:w-[260px]">
                          <ReadOnlyField compact label="First name" value={contactFields.firstName} />
                          <ReadOnlyField compact label="Last name" value={contactFields.lastName} />
                          <ReadOnlyField compact label="Birth date" value={contactFields.birthDate} />
                          <ReadOnlyField compact label="Gender" value={contactFields.gender} />
                        </div>
                        <div className="w-full @md:w-[260px]">
                          <ReadOnlyField compact label="Email" value={contactFields.email} />
                          <ReadOnlyField compact label="Mobile number" value={contactFields.mobileNumber} />
                          <ReadOnlyField compact label="SSN" value={contactFields.ssn} />
                        </div>
                        <div className="w-full @md:w-[260px]">
                          <ReadOnlyField compact label="Loyalty program name" value={contactFields.loyaltyProgramName} />
                          <ReadOnlyField compact label="Ext. identity number" value={contactFields.extIdentityNumber} required />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Credit + Customer card */}
                  {(creditCustomerDraft || customerCard) && (
                    <div className="grid grid-cols-1 @md:grid-cols-2 gap-6">
                      {creditCustomerDraft && (
                        <Card className={DETAIL_CARD_CLASS}>
                          <CardContent className="p-8">
                            <div className="flex items-center justify-between mb-[10px]">
                              <div className="flex items-center gap-[10px]">
                                <SectionHeader className="">Credit</SectionHeader>
                                {creditLocked && (
                                  <span className="font-['Roboto_Condensed',sans-serif] text-[11px] font-bold uppercase px-[10px] py-[2px] rounded-full border border-[#1a1a1a] text-[#1a1a1a]">
                                    Locked
                                  </span>
                                )}
                              </div>
                              <DropdownMenu.Root>
                                <DropdownMenu.Trigger asChild>
                                  <button
                                    type="button"
                                    aria-label="Credit options"
                                    className="shrink-0 p-[4px] rounded-full text-[#666] hover:text-[#1a1a1a] hover:bg-[#f5f5f5] cursor-pointer transition-colors"
                                  >
                                    <MoreHorizontal className="size-[18px]" />
                                  </button>
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Portal>
                                  <DropdownMenu.Content
                                    align="end"
                                    sideOffset={4}
                                    className="z-[10000] bg-white border border-[#CCCCCC] shadow-lg outline-none overflow-hidden min-w-[200px]"
                                  >
                                    <DropdownMenu.Item
                                      onClick={() => setIsManualPaymentModalOpen(true)}
                                      className="h-[36px] px-4 flex items-center text-[14px] font-roboto font-normal text-[#1A1A1A] outline-none cursor-pointer focus:bg-[#EAEAEA] transition-colors"
                                    >
                                      Manual payment
                                    </DropdownMenu.Item>
                                  </DropdownMenu.Content>
                                </DropdownMenu.Portal>
                              </DropdownMenu.Root>
                            </div>
                            <div className="grid grid-cols-1 @sm:grid-cols-2 gap-x-8">
                              <div>
                                <InputField compact label="Credit limit" value={creditLimit} onChange={setCreditLimit} disabled={creditLocked} />
                                <div className="max-w-[220px]">
                                  <DateField label="Balance due date" value={balanceDueDate} onChange={setBalanceDueDate} disabled={creditLocked} />
                                </div>
                              </div>
                              <div>
                                <ReadOnlyField compact label="Credit balance" value={creditBalance} />
                                <CheckboxField compact label="Reference number required" checked={referenceNumberRequired} onChange={setReferenceNumberRequired} disabled={creditLocked} />
                                <CheckboxField compact label="Credit locked" checked={creditLocked} onChange={setCreditLocked} />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      {customerCard && (
                        <Card className={DETAIL_CARD_CLASS}>
                          <CardContent className="p-8">
                            <div className="flex items-center justify-between mb-[10px]">
                              <SectionHeader className="">Customer card</SectionHeader>
                              <DropdownMenu.Root>
                                <DropdownMenu.Trigger asChild>
                                  <button
                                    type="button"
                                    aria-label="Customer card options"
                                    className="shrink-0 p-[4px] rounded-full text-[#666] hover:text-[#1a1a1a] hover:bg-[#f5f5f5] cursor-pointer transition-colors"
                                  >
                                    <MoreHorizontal className="size-[18px]" />
                                  </button>
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Portal>
                                  <DropdownMenu.Content
                                    align="end"
                                    sideOffset={4}
                                    className="z-[10000] bg-white border border-[#CCCCCC] shadow-lg outline-none overflow-hidden min-w-[200px]"
                                  >
                                    <DropdownMenu.Item
                                      onClick={() => customerCard.status !== "Inactive" && handleInactivateCustomerCard()}
                                      disabled={customerCard.status === "Inactive"}
                                      className="h-[36px] px-4 flex items-center text-[14px] font-roboto font-normal text-[#1A1A1A] outline-none cursor-pointer focus:bg-[#EAEAEA] transition-colors data-[disabled]:text-[#ccc] data-[disabled]:cursor-not-allowed data-[disabled]:focus:bg-transparent"
                                    >
                                      Inactivate card
                                    </DropdownMenu.Item>
                                  </DropdownMenu.Content>
                                </DropdownMenu.Portal>
                              </DropdownMenu.Root>
                            </div>
                            <div className="grid grid-cols-1 @sm:grid-cols-2 gap-x-8">
                              <div>
                                <ReadOnlyField compact label="Card ID" value={customerCard.cardId} />
                                <ReadOnlyField compact label="External card ID" value={customerCard.externalCardId} />
                              </div>
                              <div>
                                <ReadOnlyField compact label="Status" value={customerCard.status} />
                                <ReadOnlyField compact label="Start date" value={customerCard.startDate} />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  )}

                  {/* Address + Notes */}
                  <div className="grid grid-cols-1 @md:grid-cols-2 gap-6">
                    <Card className={DETAIL_CARD_CLASS}>
                      <CardContent className="p-8">
                        <div className="flex items-center justify-between mb-[10px]">
                          <SectionHeader className="">Address</SectionHeader>
                          <button type="button" onClick={() => setIsEditAddressModalOpen(true)} className="p-[6px] -m-[6px] rounded-full text-[#666] hover:text-[#1a1a1a] hover:bg-[#f5f5f5] cursor-pointer transition-colors" aria-label="Edit address">
                            <Pencil className="size-[16px]" />
                          </button>
                        </div>
                        <ReadOnlyField compact hideIfEmpty label="Address line 1" value={addressFields.addressLine1} />
                        <ReadOnlyField compact hideIfEmpty label="Address line 2" value={addressFields.addressLine2} />
                        <ReadOnlyField compact hideIfEmpty label="Postal code" value={addressFields.postalCode} />
                        <ReadOnlyField compact hideIfEmpty label="City" value={addressFields.city} />
                        <ReadOnlyField compact hideIfEmpty label="Country" value={addressFields.country} />
                      </CardContent>
                    </Card>

                    <Card className={DETAIL_CARD_CLASS}>
                      <CardContent className="p-8 h-full flex flex-col">
                        <SectionHeader>Notes</SectionHeader>
                        <FieldLabel>Customer notes</FieldLabel>
                        <textarea
                          ref={notesTextareaRef}
                          value={customerNotes}
                          onChange={(e) => setCustomerNotes(e.target.value)}
                          className="border border-[#ccc] rounded-[2px] p-[10px] min-h-[80px] font-['Roboto:Regular',sans-serif] text-[14px] leading-[20px] text-[#1a1a1a] outline-none focus:border-[#1c7862] resize-none overflow-y-auto"
                          style={{ maxHeight: `${NOTES_MAX_HEIGHT}px` }}
                        />
                      </CardContent>
                    </Card>
                  </div>

                  {/* Relationships - full width */}
                  <Card className={DETAIL_CARD_CLASS}>
                    <CardContent className="p-8">
                      <div className="flex items-center justify-between mb-[10px]">
                        <SectionHeader className="">Relationships</SectionHeader>
                        <button
                          type="button"
                          onClick={() => console.log("Add relationship clicked")}
                          aria-label="Add relationship"
                          className="size-[36px] rounded-full flex items-center justify-center hover:bg-[#f5f5f5] cursor-pointer shrink-0 transition-colors"
                        >
                          <Plus className="size-[16px] text-[#1a1a1a]" />
                        </button>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse min-w-[500px]">
                          <thead>
                            <tr>
                              <th className="bg-[#595959] h-[28px] text-left px-[10px] text-white font-['Roboto:Bold',sans-serif] text-[13px] uppercase border-r border-white">Relationship type</th>
                              <th className="bg-[#595959] h-[28px] text-left px-[10px] text-white font-['Roboto:Bold',sans-serif] text-[13px] uppercase border-r border-white">Identifier</th>
                              <th className="bg-[#595959] h-[28px] text-left px-[10px] text-white font-['Roboto:Bold',sans-serif] text-[13px] uppercase border-r border-white">Connection</th>
                              <th className="bg-[#595959] h-[28px] text-left px-[10px] text-white font-['Roboto:Bold',sans-serif] text-[13px] uppercase">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="bg-white h-[43px] px-[12px] font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a] border-b border-[#e5e5e5]">Contact</td>
                              <td className="bg-white h-[43px] px-[12px] font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a] underline border-b border-[#e5e5e5]">11223344</td>
                              <td className="bg-white h-[43px] px-[12px] font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a] border-b border-[#e5e5e5]">All Stores</td>
                              <td className="bg-white h-[43px] px-[12px] font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a] border-b border-[#e5e5e5]">Active</td>
                            </tr>
                            <tr>
                              <td className="bg-[#f7f7f7] h-[43px] px-[12px] font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a]">Member</td>
                              <td className="bg-[#f7f7f7] h-[43px] px-[12px] font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a] underline">44332211</td>
                              <td className="bg-[#f7f7f7] h-[43px] px-[12px] font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a]">EG Retail VIP Club SE</td>
                              <td className="bg-[#f7f7f7] h-[43px] px-[12px] font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a]">Active</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Modals - Only Private customer modals */}
        <EditContactModal
          isOpen={isEditContactModalOpen}
          onClose={() => setIsEditContactModalOpen(false)}
          onSave={handleSaveContact}
          fields={contactFields}
        />

        <EditAddressModal
          isOpen={isEditAddressModalOpen}
          onClose={() => setIsEditAddressModalOpen(false)}
          onSave={handleSaveAddress}
          fields={addressFields}
        />

        <ChangeStoreAccessModal
          isOpen={isChangeStoreAccessModalOpen}
          onClose={() => setIsChangeStoreAccessModalOpen(false)}
          onSave={handleSaveStoreAccess}
          value={storeAccess}
        />

        <ManualPaymentModal
          isOpen={isManualPaymentModalOpen}
          onClose={() => setIsManualPaymentModalOpen(false)}
          onSubmit={handleManualPayment}
        />

        <NewOfferModal
          isOpen={isNewOfferModalOpen}
          onClose={() => setIsNewOfferModalOpen(false)}
          customerName={displayCustomerName}
        />

        <DeactivatePrivateCustomerModal
          isOpen={isDeactivateModalOpen}
          onClose={() => setIsDeactivateModalOpen(false)}
          onConfirm={handleConfirmDeactivate}
          customerName={customer.customerName}
        />
        
        <DeleteCustomerModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
          customerName={customer.customerName}
          customerType="Private customer"
          hasActiveSales={hasActiveSales}
          activeSalesCount={activeSalesCount}
        />
        
        {/* Toasts */}
        <AnimatePresence>
          {showDeactivateToast && (
            <Motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed bottom-[56px] left-[95px] right-0 z-[1000] bg-[#262626] text-white h-[40px] flex items-center pl-[20px] pr-[10px] gap-4 justify-between"
            >
              <div className="flex items-center gap-[30px]">
                <div className="flex items-center gap-2">
                  <Check className="size-[18px] text-white" />
                  <p className="text-[14px] font-normal font-roboto">{deactivateToastMessage}</p>
                </div>
              </div>
              <button
                className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer flex items-center justify-center"
                onClick={() => setShowDeactivateToast(false)}
              >
                <X className="size-[18px] text-white" />
              </button>
            </Motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showDeleteToast && (
            <Motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed bottom-[56px] left-[95px] right-0 z-[1000] bg-[#262626] text-white h-[40px] flex items-center pl-[20px] pr-[10px] gap-4 justify-between"
            >
              <div className="flex items-center gap-[30px]">
                <div className="flex items-center gap-2">
                  <Check className="size-[18px] text-white" />
                  <p className="text-[14px] font-normal font-roboto">Customer was successfully deleted.</p>
                </div>
              </div>
              <button
                className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer flex items-center justify-center"
                onClick={() => setShowDeleteToast(false)}
              >
                <X className="size-[18px] text-white" />
              </button>
            </Motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showActivateToast && (
            <Motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed bottom-[56px] left-[95px] right-0 z-[1000] bg-[#262626] text-white h-[40px] flex items-center pl-[20px] pr-[10px] gap-4 justify-between"
            >
              <div className="flex items-center gap-[30px]">
                <div className="flex items-center gap-2">
                  <Check className="size-[18px] text-white" />
                  <p className="text-[14px] font-normal font-roboto">Customer was successfully activated.</p>
                </div>
              </div>
              <button
                className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer flex items-center justify-center"
                onClick={() => setShowActivateToast(false)}
              >
                <X className="size-[18px] text-white" />
              </button>
            </Motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  // Business customer layout
  const businessTab = searchParams.get("tab") || "details";
  const businessTabLabels: Record<string, string> = {
    sales: "Sales",
    offers: "Discount",
    "customer-orders": "Customer orders"
  };

  return (
    <>
      <div ref={contactsScrollContainerRef} className="flex flex-col h-full bg-[#F4F5F6] overflow-auto">
        <div className={businessTab === "sales" || businessTab === "offers" ? "w-full flex-1 flex flex-col min-h-0" : "py-[20px] px-[16px] sm:px-[24px] lg:px-[32px] xl:px-[48px] max-w-[1200px] w-full mx-auto"}>
          {/* Organization Status Banner */}
          {organizationStatus && businessTab !== "sales" && businessTab !== "offers" && (
            <div className="mb-[20px] px-[16px] py-[12px] border-l-4 bg-[#f5f5f5] border-[#757575]">
              <div className="flex items-start gap-[12px]">
                <div className="flex-1">
                  <p className="font-['Roboto:Bold',sans-serif] text-[14px] leading-[17px] mb-[4px] text-[#424242]">
                    {organizationStatus === "deleted" 
                      ? "Organization Deleted" 
                      : "Inactive organization"}
                  </p>
                  <p className="font-['Roboto:Regular',sans-serif] text-[13px] leading-[18px] text-[#616161]">
                    {organizationStatus === "deleted"
                      ? `The organization "${organizationName}" was permanently deleted when this customer was deactivated. To reactivate this customer, you must assign them to an organization.`
                      : `The organization "${organizationName}" is currently deactivated. To fully reactivate this customer, you may need to reactivate the organization as well.`
                    }
                  </p>
                </div>
              </div>
            </div>
          )}

          {businessTab === "sales" ? (
            <SalesGrid isBusiness />
          ) : businessTab === "offers" ? (
            <OffersGrid customerGroupName={customer.customerGroup} />
          ) : businessTab !== "details" ? (
            <div className="bg-white border border-[#E5E7EB] rounded-xl p-8">
              <p className="font-['Roboto:Regular',sans-serif] text-[14px] text-[#666]">
                {businessTabLabels[businessTab] || "Details"} content will be displayed here.
              </p>
            </div>
          ) : (
          <>
          {/* Top Section */}
          {/* Every section is an equal-status white card, stacked in rows. Each row uses a
              container query (not a viewport breakpoint) so cards adapt to the 1039px cap
              itself rather than the full window width. */}
          <div className="@container">
            <div className="flex flex-col gap-6 mb-4">
              {/* Customer identity card - full width, 3 field columns */}
              <Card className={DETAIL_CARD_CLASS}>
                <CardContent className="p-8">
                  <div className="flex items-start justify-between gap-[10px] mb-[4px]">
                    <div className="flex items-center gap-[10px]">
                      <h2 className="font-['Roboto_Condensed',sans-serif] font-bold text-[20px] leading-[24px] tracking-[0px] text-[#1a1a1a] uppercase">
                        {displayCustomerName}
                      </h2>
                      <span className={`shrink-0 font-['Roboto_Condensed',sans-serif] text-[11px] font-bold uppercase px-[10px] py-[2px] rounded-full border ${isInactive ? "border-[#999] text-[#999]" : "border-[#1a1a1a] text-[#1a1a1a]"}`}>
                        {isInactive ? "Inactive" : "Active"}
                      </span>
                    </div>
                    <DropdownMenu.Root>
                      <DropdownMenu.Trigger asChild>
                        <button type="button" className="shrink-0 p-[4px] rounded-full text-[#666] hover:text-[#1a1a1a] hover:bg-[#f5f5f5] cursor-pointer transition-colors">
                          <MoreHorizontal className="size-[18px]" />
                        </button>
                      </DropdownMenu.Trigger>
                      <DropdownMenu.Portal>
                        <DropdownMenu.Content
                          className="z-[10000] bg-white border border-[#CCCCCC] shadow-lg outline-none overflow-hidden min-w-[200px]"
                          align="end"
                          sideOffset={4}
                        >
                          <DropdownMenu.Item
                            onClick={() => setIsChangeCustomerNameModalOpen(true)}
                            className="h-[36px] px-4 flex items-center text-[14px] font-roboto font-normal text-[#1A1A1A] outline-none cursor-pointer focus:bg-[#EAEAEA] transition-colors"
                          >
                            Change customer name
                          </DropdownMenu.Item>
                          <DropdownMenu.Item
                            onClick={() => setIsChangeStoreAccessModalOpen(true)}
                            className="h-[36px] px-4 flex items-center text-[14px] font-roboto font-normal text-[#1A1A1A] outline-none cursor-pointer focus:bg-[#EAEAEA] transition-colors"
                          >
                            Change store access
                          </DropdownMenu.Item>
                        </DropdownMenu.Content>
                      </DropdownMenu.Portal>
                    </DropdownMenu.Root>
                  </div>
                  <div className="flex items-center justify-between mb-[16px]">
                    <p className="font-['Roboto:Regular',sans-serif] text-[14px] text-[#666]">{customer.customerType}</p>
                    <p className="font-['Roboto:Regular',sans-serif] text-[13px] text-[#666] whitespace-nowrap">
                      Customer since: {(customer as any).customerSince || "–"}
                    </p>
                  </div>
                  <div className="border-t border-[#E5E7EB] mb-[16px]" />

                  <div className="flex flex-col @md:flex-row @md:justify-between gap-y-4">
                    <div className="w-full @md:w-[260px]">
                      <ReadOnlyField compact label="Customer number" value={customer.customerNumber} />
                      {isInactive || organizationStatus === "deleted" ? (
                        <ReadOnlyField compact label="Ext. customer number" value={customer.extCustomerNumber} />
                      ) : (
                        <InputField compact label="Ext. customer number" value={customer.extCustomerNumber} />
                      )}
                      <ReadOnlyField compact label="Profile" value={getStoreOrProfileLabel(customer.store)} />
                    </div>
                    <div className="w-full @md:w-[260px]">
                      <InputField compact label="Email" value={customer.email} />
                      <InputField compact label="Phone number" value={customer.phone} />
                      {isInactive ? (
                        <ReadOnlyField compact label="Customer group" value={customer.customerGroup || "–"} />
                      ) : (
                        <SelectField
                          compact
                          label="Customer group"
                          value={customer.customerGroup}
                          options={[
                            { value: "Corporate", label: "Corporate" },
                            { value: "Wholesale", label: "Wholesale" },
                            { value: "VIP", label: "VIP" },
                            { value: "Demo Store VIP customers", label: "Demo Store VIP customers" }
                          ]}
                        />
                      )}
                    </div>
                    <div className="w-full @md:w-[260px]">
                      <CheckboxField compact label="Credit customer" checked={creditCustomerDraft} onChange={handleCreditCustomerToggle} />
                    </div>
                  </div>

                  {isInactive && deactivationReason && (
                    <div className="mt-[16px] pt-[10px] border-t border-[#E5E7EB]">
                      <ReadOnlyField label="Deactivation reason" value={deactivationReason} />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Organisation + Notes */}
              <div className="grid grid-cols-1 @md:grid-cols-2 gap-6">
                {organizationStatus !== "deleted" && (
                  <Card className={DETAIL_CARD_CLASS}>
                    <CardContent className="p-8">
                      <div className="flex items-center justify-between mb-[10px]">
                        <SectionHeader className="" icon={<LinkIcon className="size-[14px] text-[#1a1a1a]" />}>Organisation</SectionHeader>
                        {!isExternalOrg && (
                          <button
                            type="button"
                            onClick={() => {
                              if (!isEditingOrgIdentity) {
                                setOrgNameDraft(customer.customerName);
                                setOrgNumberDraft(customer.orgNumber);
                                setOrgTypeDraft(customer.organizationType || "Branch");
                                setOrgBranchNumberDraft(customer.branchNumber || "");
                              }
                              setIsEditingOrgIdentity((prev) => !prev);
                            }}
                            className="size-[36px] rounded-full flex items-center justify-center hover:bg-[#f5f5f5] cursor-pointer shrink-0 transition-colors"
                            aria-label="Edit organization details"
                          >
                            <Pencil className="size-[16px] text-[#1a1a1a]" />
                          </button>
                        )}
                      </div>

                      {isExternalOrg ? (
                        <p className="font-['Roboto:Regular',sans-serif] text-[14px] text-[#666] mb-[16px]">Updated by external party</p>
                      ) : isEditingOrgIdentity ? (
                        <div className="mb-[16px] p-[16px] bg-white border border-[#999] rounded-[8px] flex items-start gap-[10px]">
                          <Info className="size-[18px] text-[#1a1a1a] shrink-0" />
                          <p className="font-['Roboto:Regular',sans-serif] text-[14px] leading-[20px] text-[#1a1a1a]">
                            Changes made here will also update the organization register.
                          </p>
                        </div>
                      ) : null}

                      <div className="flex items-start gap-[16px]">
                        <div className="grid grid-cols-2 gap-x-8 flex-1">
                          <div>
                            {isEditingOrgIdentity ? (
                              <InputField compact label="Organisation name" value={orgNameDraft} onChange={setOrgNameDraft} />
                            ) : (
                              <>
                                <FieldLabel>Organisation name</FieldLabel>
                                {(customer as any).organizationRegisterId ? (
                                  <button
                                    type="button"
                                    onClick={() => navigate(`/customer/organizations/${(customer as any).organizationRegisterId}`)}
                                    className="h-[32px] flex items-center font-['Roboto:Regular',sans-serif] text-[14px] leading-[17px] text-[#1a1a1a] underline mb-[5px] cursor-pointer hover:text-[#1c7862]"
                                  >
                                    {customer.customerName}
                                  </button>
                                ) : (
                                  <div className="h-[32px] flex items-center font-['Roboto:Regular',sans-serif] text-[14px] leading-[17px] text-[#1a1a1a] underline mb-[5px]">
                                    {customer.customerName}
                                  </div>
                                )}
                              </>
                            )}
                            {isEditingOrgIdentity ? (
                              <InputField compact label="Organisation number" value={orgNumberDraft} onChange={setOrgNumberDraft} />
                            ) : (
                              <ReadOnlyField compact label="Organisation number" value={customer.orgNumber} />
                            )}
                            {isExternalOrg && (
                              <ReadOnlyField compact hideIfEmpty label="Duns number" value={customer.dunsNumber || ""} />
                            )}
                          </div>
                          <div>
                            {isEditingOrgIdentity ? (
                              <SelectField compact label="Organization type" value={orgTypeDraft} options={ORG_TYPE_OPTIONS} onChange={setOrgTypeDraft} />
                            ) : (
                              <ReadOnlyField compact label="Organization type" value={customer.organizationType || "Branch"} />
                            )}
                            {isEditingOrgIdentity ? (
                              <InputField compact label="Branch number" value={orgBranchNumberDraft} onChange={setOrgBranchNumberDraft} />
                            ) : (
                              <ReadOnlyField compact hideIfEmpty label="Branch number" value={customer.branchNumber || customer.orgNumber} />
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Card className={DETAIL_CARD_CLASS}>
                  <CardContent className="p-8 h-full flex flex-col">
                    <SectionHeader>Notes</SectionHeader>
                    <FieldLabel>Customer notes</FieldLabel>
                    <textarea
                      ref={notesTextareaRef}
                      value={customerNotes}
                      onChange={(e) => setCustomerNotes(e.target.value)}
                      className="border border-[#ccc] rounded-[2px] p-[10px] min-h-[80px] font-['Roboto:Regular',sans-serif] text-[14px] leading-[20px] text-[#1a1a1a] outline-none focus:border-[#1c7862] resize-none overflow-y-auto"
                      style={{ maxHeight: `${NOTES_MAX_HEIGHT}px` }}
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Addresses */}
              <div className="grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-3 gap-6">
                {organizationStatus !== "deleted" ? (
                  isExternalOrg ? (
                    ((customer as any).addresses || []).map((addr: any, index: number) => (
                      <Card key={index} className={DETAIL_CARD_CLASS}>
                        <CardContent className="p-8">
                          <SectionHeader className="mb-[4px]">{addr.type}</SectionHeader>
                          <p className="font-['Roboto:Regular',sans-serif] text-[14px] text-[#666] mb-[16px]">Updated by external party</p>
                          <ReadOnlyField compact label="Address line 1" value={addr.addressLine1} />
                          <ReadOnlyField compact label="Address line 2" value={addr.addressLine2 || "-"} />
                          <ReadOnlyField compact label="Postal code" value={addr.postalCode} />
                          <ReadOnlyField compact label="City" value={addr.city} />
                          <ReadOnlyField compact label="Country" value={addr.country} />
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <>
                      <Card className={DETAIL_CARD_CLASS}><CardContent className="p-8"><AddressSection title="Address" fields={businessAddresses.general} onEdit={() => setEditingAddressType("general")} /></CardContent></Card>
                      {businessAddresses.delivery.addressLine1 && (
                        <Card className={DETAIL_CARD_CLASS}><CardContent className="p-8"><AddressSection title="Delivery address" fields={businessAddresses.delivery} onEdit={() => setEditingAddressType("delivery")} /></CardContent></Card>
                      )}
                      {businessAddresses.invoice.addressLine1 && (
                        <Card className={DETAIL_CARD_CLASS}><CardContent className="p-8"><AddressSection title="Invoice address" fields={businessAddresses.invoice} onEdit={() => setEditingAddressType("invoice")} /></CardContent></Card>
                      )}
                      {[businessAddresses.delivery.addressLine1, businessAddresses.invoice.addressLine1].filter(Boolean).length === 1 && (
                        <Card className={DETAIL_CARD_CLASS}>
                          <CardContent className="p-8">
                            {isAddingAddress ? (
                              <div className="flex-1 min-w-[200px]">
                                <SectionHeader className="mb-[10px]">New address</SectionHeader>
                                <SelectField
                                  compact
                                  required
                                  label="Address type"
                                  value={newAddressType}
                                  options={
                                    businessAddresses.delivery.addressLine1
                                      ? NEW_ADDRESS_TYPE_OPTIONS.filter((o) => o.value === "invoice")
                                      : businessAddresses.invoice.addressLine1
                                      ? NEW_ADDRESS_TYPE_OPTIONS.filter((o) => o.value === "delivery")
                                      : NEW_ADDRESS_TYPE_OPTIONS
                                  }
                                  onChange={(v) => setNewAddressType(v as "delivery" | "invoice")}
                                  hideBlankOption
                                />
                                <InputField compact required label="Address line 1" value={newAddressDraft.addressLine1} onChange={(v) => setNewAddressDraft((prev) => ({ ...prev, addressLine1: v }))} />
                                <InputField compact label="Address line 2" value={newAddressDraft.addressLine2} onChange={(v) => setNewAddressDraft((prev) => ({ ...prev, addressLine2: v }))} />
                                <InputField compact required label="Postal code" value={newAddressDraft.postalCode} onChange={(v) => setNewAddressDraft((prev) => ({ ...prev, postalCode: v }))} />
                                <InputField compact required label="City" value={newAddressDraft.city} onChange={(v) => setNewAddressDraft((prev) => ({ ...prev, city: v }))} />
                                <SelectField compact required label="Country" value={newAddressDraft.country} options={ADDRESS_COUNTRY_OPTIONS} onChange={(v) => setNewAddressDraft((prev) => ({ ...prev, country: v }))} />
                                <div className="flex items-center gap-[8px] mt-[16px]">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      handleSaveBusinessAddress(newAddressType, newAddressDraft);
                                      setIsAddingAddress(false);
                                      setNewAddressDraft(emptyAddress);
                                    }}
                                    className="bg-[#1c7862] h-[30px] px-[16px] rounded-[33554400px] border border-[#1c7862] hover:bg-[#248E73] hover:border-[#248E73] transition-colors cursor-pointer"
                                  >
                                    <span className="font-['Roboto_Condensed:SemiBold',sans-serif] leading-[19.5px] not-italic text-[13px] text-center text-white uppercase">
                                      Save
                                    </span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setIsAddingAddress(false);
                                      setNewAddressDraft(emptyAddress);
                                    }}
                                    className="bg-[#eaeaea] h-[30px] px-[16px] rounded-[33554400px] hover:bg-[#e0e0e0] transition-colors cursor-pointer"
                                  >
                                    <span className="font-['Roboto_Condensed:SemiBold',sans-serif] leading-[19.5px] not-italic text-[#1a1a1a] text-[13px] text-center uppercase">
                                      Cancel
                                    </span>
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="h-full flex items-center justify-center">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setNewAddressType(businessAddresses.delivery.addressLine1 ? "invoice" : "delivery");
                                    setIsAddingAddress(true);
                                  }}
                                  className="h-[36px] px-[20px] rounded-full border border-[#ccc] flex items-center gap-[8px] hover:bg-[#f5f5f5] cursor-pointer"
                                >
                                  <Plus className="size-[16px] text-[#1a1a1a]" />
                                  <span className="font-['Roboto_Condensed:Bold',sans-serif] text-[15px] text-[#1a1a1a]">Add address</span>
                                </button>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      )}
                    </>
                  )
                ) : (
                  <>
                    <Card className={DETAIL_CARD_CLASS}>
                      <CardContent className="p-8">
                        <SectionHeader>Address</SectionHeader>
                        <ReadOnlyField compact hideIfEmpty label="Address line 1" value="–" />
                        <ReadOnlyField compact hideIfEmpty label="Address line 2" value="–" />
                        <ReadOnlyField compact hideIfEmpty label="Postal code" value="–" />
                        <ReadOnlyField compact hideIfEmpty label="City" value="–" />
                        <ReadOnlyField compact hideIfEmpty label="Country" value="–" />
                      </CardContent>
                    </Card>
                    <Card className={DETAIL_CARD_CLASS}>
                      <CardContent className="p-8">
                        <SectionHeader>Delivery address</SectionHeader>
                        <ReadOnlyField compact hideIfEmpty label="Address line 1" value="–" />
                        <ReadOnlyField compact hideIfEmpty label="Address line 2" value="–" />
                        <ReadOnlyField compact hideIfEmpty label="Postal code" value="–" />
                        <ReadOnlyField compact hideIfEmpty label="City" value="–" />
                        <ReadOnlyField compact hideIfEmpty label="Country" value="–" />
                      </CardContent>
                    </Card>
                    <Card className={DETAIL_CARD_CLASS}>
                      <CardContent className="p-8">
                        <SectionHeader>Invoice address</SectionHeader>
                        <ReadOnlyField compact hideIfEmpty label="Address line 1" value="–" />
                        <ReadOnlyField compact hideIfEmpty label="Address line 2" value="–" />
                        <ReadOnlyField compact hideIfEmpty label="Postal code" value="–" />
                        <ReadOnlyField compact hideIfEmpty label="City" value="–" />
                        <ReadOnlyField compact hideIfEmpty label="Country" value="–" />
                      </CardContent>
                    </Card>
                  </>
                )}
              </div>

              {/* Credit - visibility follows the checkbox live; Save persists the choice */}
              {creditCustomerDraft && (
              <Card className={DETAIL_CARD_CLASS}>
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-[10px]">
                    <div className="flex items-center gap-[10px]">
                      <SectionHeader className="">Credit</SectionHeader>
                      {creditLocked && (
                        <span className="font-['Roboto_Condensed',sans-serif] text-[11px] font-bold uppercase px-[10px] py-[2px] rounded-full border border-[#1a1a1a] text-[#1a1a1a]">
                          Locked
                        </span>
                      )}
                    </div>
                    <DropdownMenu.Root>
                      <DropdownMenu.Trigger asChild>
                        <button
                          type="button"
                          aria-label="Credit options"
                          className="shrink-0 p-[4px] rounded-full text-[#666] hover:text-[#1a1a1a] hover:bg-[#f5f5f5] cursor-pointer transition-colors"
                        >
                          <MoreHorizontal className="size-[18px]" />
                        </button>
                      </DropdownMenu.Trigger>
                      <DropdownMenu.Portal>
                        <DropdownMenu.Content
                          align="end"
                          sideOffset={4}
                          className="z-[10000] bg-white border border-[#CCCCCC] shadow-lg outline-none overflow-hidden min-w-[200px]"
                        >
                          <DropdownMenu.Item
                            onClick={() => setIsManualPaymentModalOpen(true)}
                            className="h-[36px] px-4 flex items-center text-[14px] font-roboto font-normal text-[#1A1A1A] outline-none cursor-pointer focus:bg-[#EAEAEA] transition-colors"
                          >
                            Manual payment
                          </DropdownMenu.Item>
                        </DropdownMenu.Content>
                      </DropdownMenu.Portal>
                    </DropdownMenu.Root>
                  </div>
                  <div className="grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-3 gap-x-8">
                    <div>
                      <InputField compact label="Credit limit" value={creditLimit} onChange={setCreditLimit} disabled={creditLocked} />
                      <ReadOnlyField compact label="Credit balance" value={creditBalance} />
                    </div>
                    <div>
                      <CheckboxField compact label="Reference number required" checked={referenceNumberRequired} onChange={setReferenceNumberRequired} disabled={creditLocked} />
                      <CheckboxField compact label="Credit locked" checked={creditLocked} onChange={setCreditLocked} />
                    </div>
                    <div className="max-w-[220px]">
                      <DateField label="Balance due date" value={balanceDueDate} onChange={setBalanceDueDate} disabled={creditLocked} />
                    </div>
                  </div>
                </CardContent>
              </Card>
              )}

              {/* Contact persons - full width */}
              <div ref={contactsWrapperRef} style={contactsExpandStyle}>
                <Card className={DETAIL_CARD_CLASS}>
                  <CardContent className="p-8">
                    <ContactPersonsGrid isExpanded={isContactsExpanded} onToggleExpand={() => setIsContactsExpanded((prev) => !prev)} />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
          </>
          )}
        </div>
      </div>

      {/* Modals */}
      <ChangeStoreAccessModal
        isOpen={isChangeStoreAccessModalOpen}
        onClose={() => setIsChangeStoreAccessModalOpen(false)}
        onSave={handleSaveStoreAccess}
        value={storeAccess}
      />

      <ChangeCustomerNameModal
        isOpen={isChangeCustomerNameModalOpen}
        onClose={() => setIsChangeCustomerNameModalOpen(false)}
        onSave={handleSaveCustomerName}
        currentName={displayCustomerName}
      />

      <ManualPaymentModal
        isOpen={isManualPaymentModalOpen}
        onClose={() => setIsManualPaymentModalOpen(false)}
        onSubmit={handleManualPayment}
      />

      <NewOfferModal
        isOpen={isNewOfferModalOpen}
        onClose={() => setIsNewOfferModalOpen(false)}
        customerName={displayCustomerName}
      />

      {editingAddressType && (
        <EditAddressModal
          isOpen={!!editingAddressType}
          onClose={() => setEditingAddressType(null)}
          onSave={(fields, useAs) => {
            handleSaveBusinessAddress(editingAddressType, fields);
            if (useAs?.delivery) handleSaveBusinessAddress("delivery", fields);
            if (useAs?.invoice) handleSaveBusinessAddress("invoice", fields);
          }}
          fields={businessAddresses[editingAddressType]}
          title={`Edit ${BUSINESS_ADDRESS_TITLES[editingAddressType].toLowerCase()}`}
          noticeText="Address information is shared with the organisation."
          onRemove={editingAddressType !== "general" ? () => handleSaveBusinessAddress(editingAddressType, emptyAddress) : undefined}
          useAsOptions={editingAddressType === "general" ? {
            deliveryMissing: !businessAddresses.delivery.addressLine1,
            invoiceMissing: !businessAddresses.invoice.addressLine1
          } : undefined}
        />
      )}

      <DeactivateBusinessCustomerModal
        isOpen={isDeactivateModalOpen}
        onClose={() => setIsDeactivateModalOpen(false)}
        onConfirm={handleConfirmDeactivate}
        customerName={customer.customerName}
      />
      
      <DeleteCustomerModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        customerName={customer.customerName}
        customerType="Business customer"
        organizationName={organizationName}
        isSoleCustomer={isSoleCustomer}
      />
      
      {/* Organization Reactivation/Selection Dialogs */}
      <ReactivateOrganizationDialog
        isOpen={isReactivateOrgDialogOpen}
        onClose={() => setIsReactivateOrgDialogOpen(false)}
        onConfirm={handleReactivateOrgConfirm}
        organizationName={organizationName}
      />
      
      <OrganizationDeletedDialog
        isOpen={isOrgDeletedDialogOpen}
        onClose={() => setIsOrgDeletedDialogOpen(false)}
        onContinue={handleOrgDeletedContinue}
        organizationName={organizationName}
      />
      
      <ChooseOrganizationModal
        isOpen={isChooseOrgModalOpen}
        onClose={() => setIsChooseOrgModalOpen(false)}
        onSelectOrganization={handleSelectOrganization}
      />
      
      {/* Toasts */}
      <AnimatePresence>
        {showDeactivateToast && (
          <Motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed bottom-[56px] left-[95px] right-0 z-[1000] bg-[#262626] text-white h-[40px] flex items-center pl-[20px] pr-[10px] gap-4 justify-between"
          >
            <div className="flex items-center gap-[30px]">
              <div className="flex items-center gap-2">
                <Check className="size-[18px] text-white" />
                <p className="text-[14px] font-normal font-roboto">{deactivateToastMessage}</p>
              </div>
            </div>
            <button
              className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer flex items-center justify-center"
              onClick={() => setShowDeactivateToast(false)}
            >
              <X className="size-[18px] text-white" />
            </button>
          </Motion.div>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {showDeleteToast && (
          <Motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed bottom-[56px] left-[95px] right-0 z-[1000] bg-[#262626] text-white h-[40px] flex items-center pl-[20px] pr-[10px] gap-4 justify-between"
          >
            <div className="flex items-center gap-[30px]">
              <div className="flex items-center gap-2">
                <Check className="size-[18px] text-white" />
                <p className="text-[14px] font-normal font-roboto">Customer was successfully deleted.</p>
              </div>
            </div>
            <button
              className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer flex items-center justify-center"
              onClick={() => setShowDeleteToast(false)}
            >
              <X className="size-[18px] text-white" />
            </button>
          </Motion.div>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {showActivateToast && (
          <Motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed bottom-[56px] left-[95px] right-0 z-[1000] bg-[#262626] text-white h-[40px] flex items-center pl-[20px] pr-[10px] gap-4 justify-between"
          >
            <div className="flex items-center gap-[30px]">
              <div className="flex items-center gap-2">
                <Check className="size-[18px] text-white" />
                <p className="text-[14px] font-normal font-roboto">Customer was successfully activated.</p>
              </div>
            </div>
            <button
              className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer flex items-center justify-center"
              onClick={() => setShowActivateToast(false)}
            >
              <X className="size-[18px] text-white" />
            </button>
          </Motion.div>
        )}
      </AnimatePresence>
    </>
  );
}