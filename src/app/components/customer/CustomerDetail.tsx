import React from "react";
import { useParams, useNavigate, useLocation } from "react-router";
import imgCheckbox from "figma:asset/898d19ffff6bfdba80f8fefc8d425930bb2656d8.png";
import { ContactPersonsGrid } from "./ContactPersonsGrid";
import Frame1354 from "@/imports/Frame1354";
import { DeactivateBusinessCustomerModal } from "./DeactivateBusinessCustomerModal";
import { DeleteCustomerModal } from "./DeleteCustomerModal";
import { DeactivatePrivateCustomerModal } from "./DeactivatePrivateCustomerModal";
import { ReactivateOrganizationDialog } from "./ReactivateOrganizationDialog";
import { OrganizationDeletedDialog } from "./OrganizationDeletedDialog";
import { ChooseOrganizationModal } from "./ChooseOrganizationModal";
import { motion as Motion, AnimatePresence } from "motion/react";
import { Check, X } from "lucide-react";

// Mock data import (we'll need to get this from the grid component)
const mockCustomers = [
  { 
    id: 1, 
    customerNumber: "0000000001", 
    extCustomerNumber: "4641-fee-6d31-fa17-...",
    customerName: "Hanna Hansen",
    customerType: "Private customer",
    store: "1050",
    address: "Fjellveien 2",
    postalCode: "7530",
    orgNumber: "",
    customerGroup: "",
    inactive: false,
    creditC: "",
    creditBalance: "",
    email: "Ola.n@eg.no",
    phone: "+4792231501"
  },
  { 
    id: 2, 
    customerNumber: "0000000002", 
    extCustomerNumber: "ORG-2024-001",
    customerName: "Norsk Dagligvare AS",
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
    phone: "+4722334455"
  },
  { 
    id: 3, 
    customerNumber: "0000000003", 
    extCustomerNumber: "ORG-2024-002",
    customerName: "Bergen Handel AS",
    customerType: "Business customer",
    store: "1051",
    address: "Bryggen 22",
    postalCode: "5003",
    orgNumber: "987654321",
    customerGroup: "Corporate",
    inactive: false,
    creditC: "B",
    creditBalance: "25000",
    email: "kontor@bergenhandel.no",
    phone: "+4755667788"
  },
  { 
    id: 4, 
    customerNumber: "0000000004", 
    extCustomerNumber: "467",
    customerName: "Kari Hansen",
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
    extCustomerNumber: "468",
    customerName: "Ola Granlie",
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
    extCustomerNumber: "ORG-2024-003",
    customerName: "Trondheim Engros AS",
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
    phone: "+4773889900"
  },
  { 
    id: 7, 
    customerNumber: "0000000007", 
    extCustomerNumber: "3rd party customernumber",
    customerName: "Yngvild Granlie",
    customerType: "Private customer",
    store: "1",
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
    extCustomerNumber: "ORG-2024-004",
    customerName: "Stavanger Retail Group",
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
    phone: "+4751223344"
  },
  { 
    id: 9, 
    customerNumber: "0000000009", 
    extCustomerNumber: "PRV-2024-001",
    customerName: "Lars Olsen",
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
    extCustomerNumber: "ORG-2024-005",
    customerName: "Oslo Matservice AS",
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
    phone: "+4722998877"
  },
  { 
    id: 11, 
    customerNumber: "0000000011", 
    extCustomerNumber: "PRV-2024-002",
    customerName: "Melina Andersson",
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
  }
];

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-['Roboto_Condensed:Bold',sans-serif] text-[12px] leading-[14px] text-[#1a1a1a] uppercase mb-[10px]">
      {children}
    </h3>
  );
}

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block font-['Roboto:Regular',sans-serif] text-[14px] leading-[17px] text-[#666] mb-[2px]">
      {required && "* "}{children}
    </label>
  );
}

function InputField({ label, value, required, disabled }: { label: string; value: string; required?: boolean; disabled?: boolean }) {
  return (
    <div className="mb-[10px]">
      <FieldLabel required={required}>{label}</FieldLabel>
      <div className="bg-white h-[32px] relative">
        <div className="overflow-clip relative rounded-[inherit] size-full">
          <input 
            type="text"
            defaultValue={value}
            disabled={disabled}
            className="absolute font-['Roboto:Regular',sans-serif] inset-[8px_10px_7px_10px] leading-[normal] not-italic text-[#1a1a1a] text-[14px] bg-transparent border-none outline-none w-full disabled:text-[#999]"
          />
        </div>
        <div aria-hidden="true" className={`absolute border border-solid inset-0 pointer-events-none ${disabled ? 'border-[#e0e0e0]' : 'border-[#ccc]'}`} />
      </div>
    </div>
  );
}

function SelectField({ label, value, options, required }: { label: string; value: string; options: { value: string; label: string }[]; required?: boolean }) {
  return (
    <div className="mb-[10px]">
      <FieldLabel required={required}>{label}</FieldLabel>
      <div className="bg-white h-[32px] relative">
        <div className="overflow-clip relative rounded-[inherit] size-full">
          <select 
            defaultValue={value}
            className="absolute font-['Roboto:Regular',sans-serif] inset-[8px_29px_7px_10px] leading-[normal] not-italic text-[#1a1a1a] text-[14px] bg-transparent border-none outline-none w-full appearance-none cursor-pointer"
          >
            <option value="">Select...</option>
            {options.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <div className="-translate-y-1/2 absolute right-[6px] size-[20px] top-1/2">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
              <g>
                <mask height="4" id="mask0_select" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="8" x="6" y="8">
                  <path d="M14 8L10 12L6 8H14Z" fill="var(--fill-0, #666666)" />
                </mask>
                <g mask="url(#mask0_select)">
                  <rect fill="var(--fill-0, #666666)" height="20" width="20" />
                </g>
              </g>
            </svg>
          </div>
        </div>
        <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-0 pointer-events-none" />
      </div>
    </div>
  );
}

function ReadOnlyField({ label, value }: { label: string; value: string }) {
  return (
    <div className="mb-[10px]">
      <FieldLabel>{label}</FieldLabel>
      <div className="font-['Roboto:Regular',sans-serif] text-[14px] leading-[17px] text-[#1a1a1a] py-[2px]">
        {value}
      </div>
    </div>
  );
}

function CheckboxField({ label, checked }: { label: string; checked: boolean }) {
  return (
    <label className="flex items-center gap-[8px] mb-[10px] cursor-pointer">
      <input 
        type="checkbox" 
        defaultChecked={checked}
        className="w-[16px] h-[16px] cursor-pointer"
      />
      <span className="font-['Roboto:Regular',sans-serif] text-[14px] leading-[17px] text-[#1a1a1a]">
        {label}
      </span>
    </label>
  );
}

function AddressSection({ title, inheritChecked, isInactive }: { title: string; inheritChecked: boolean; isInactive?: boolean }) {
  const [inherit, setInherit] = React.useState(inheritChecked);

  return (
    <div className="flex-1 min-w-[200px]">
      <SectionHeader>{title}</SectionHeader>
      <label 
        className={`content-stretch flex gap-[10px] items-start pb-[15px] pt-[5px] relative ${isInactive ? 'cursor-default' : 'cursor-pointer'}`}
        onClick={() => !isInactive && setInherit(!inherit)}
      >
        <div className="h-[17px] relative shrink-0 w-[16px]">
          <div className="absolute left-[-2px] mix-blend-multiply size-[20px] top-[-2px]">
            <div className="absolute inset-0 mix-blend-multiply">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img 
                  alt="" 
                  className="absolute h-[135%] left-[-15%] max-w-none top-[-20%] w-[125%]" 
                  src={imgCheckbox}
                  style={{ opacity: inherit ? 1 : 0.3 }}
                />
              </div>
            </div>
          </div>
        </div>
        <p className="flex-[1_0_0] font-['Roboto:Regular',sans-serif] leading-[normal] min-h-px min-w-px not-italic relative text-[#1a1a1a] text-[14px] whitespace-pre-wrap">
          Inherit from organization
        </p>
      </label>
      
      {/* Always show read-only fields when inactive */}
      {isInactive || inherit ? (
        <>
          <ReadOnlyField label="Address line 1" value="Fredsgatan 33" />
          <ReadOnlyField label="Address line 2" value="" />
          <ReadOnlyField label="Postal code" value="413 03" />
          <ReadOnlyField label="City" value="Göteborg" />
          <ReadOnlyField label="Country" value="Sweden" />
        </>
      ) : (
        <>
          <InputField label="Address line 1" value="Fredsgatan 3" />
          <InputField label="Address line 2" value="" />
          <InputField label="Postal code" value="413 03" />
          <InputField label="City" value="Göteborg" required />
          <SelectField 
            label="Country" 
            value="Sweden"
            required
            options={[
              { value: "Sweden", label: "Sweden" },
              { value: "Norway", label: "Norway" },
              { value: "Denmark", label: "Denmark" },
              { value: "Finland", label: "Finland" }
            ]}
          />
        </>
      )}
    </div>
  );
}

export function CustomerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isInactive, setIsInactive] = React.useState(false);
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
  
  // Parse URL search params manually
  const searchParams = new URLSearchParams(location.search);
  const activeTab = searchParams.get("tab") || "contact";
  
  const customerId = id ? parseInt(id) : 0;
  const customer = mockCustomers.find(c => c.id === customerId);
  
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
  
  const isBusinessCustomer = customer.customerType === "Business customer";

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

  const handleSave = () => {
    console.log("Saving customer...");
  };

  // Expose customer status and handlers globally so Footer can access them
  React.useEffect(() => {
    (window as any).isCustomerInactive = isInactive;
    (window as any).isBusinessCustomer = isBusinessCustomer;
    (window as any).canDeleteCustomer = canDelete;
    (window as any).deactivateCustomer = handleDeactivate;
    (window as any).activateCustomer = handleActivate;
    (window as any).deleteCustomer = handleDelete;
    (window as any).customerName = customer.customerName;
    (window as any).customerType = customer.customerType;
    
    return () => {
      delete (window as any).isCustomerInactive;
      delete (window as any).isBusinessCustomer;
      delete (window as any).canDeleteCustomer;
      delete (window as any).deactivateCustomer;
      delete (window as any).activateCustomer;
      delete (window as any).deleteCustomer;
      delete (window as any).customerName;
      delete (window as any).customerType;
    };
  }, [isInactive, isBusinessCustomer, canDelete, customer.customerName, customer.customerType]);

  const handleTabChange = (tab: string) => {
    const params = new URLSearchParams(location.search);
    params.set("tab", tab);
    navigate(`/customer/customer/${id}?${params.toString()}`, { replace: true });
  };

  // For private customers, use the Figma imported design
  if (!isBusinessCustomer) {
    return (
      <>
        <div className="flex flex-col h-full bg-white overflow-auto">
          {activeTab === "details" ? (
            // Details Tab Content
            <div className="p-[20px] flex-1 overflow-auto">
              <div className="flex gap-[60px]">
                {/* DETAILS Section */}
                <div className="flex-1 max-w-[200px]">
                  <SectionHeader>Details</SectionHeader>
                  <ReadOnlyField label="Customer type" value={customer.customerType} />
                  <ReadOnlyField label="Customer number" value={customer.customerNumber} />
                  <ReadOnlyField label="Customer status" value={isInactive ? "Inactive" : "Active"} />
                  {isInactive && deactivationReason && (
                    <ReadOnlyField label="Deactivation reason" value={deactivationReason} />
                  )}
                  <InputField label="Ext. customer number" value={customer.extCustomerNumber} />
                  <ReadOnlyField label="Store" value={customer.store} />
                  <SelectField 
                    label="Customer group" 
                    value={customer.customerGroup}
                    options={[
                      { value: "", label: "-" },
                      { value: "Corporate", label: "Corporate" },
                      { value: "Wholesale", label: "Wholesale" },
                      { value: "VIP", label: "VIP" },
                      { value: "Demo Store VIP customers", label: "Demo Store VIP customers" }
                    ]}
                  />
                </div>

                {/* CREDIT Section */}
                <div className="flex-1 max-w-[200px]">
                  <SectionHeader>Credit</SectionHeader>
                  <CheckboxField label="Credit customer" checked={false} />
                </div>
              </div>
            </div>
          ) : activeTab === "remarks" ? (
            // Remarks Tab Content (placeholder)
            <div className="p-[20px] flex-1 overflow-auto">
              <div className="flex gap-[60px]">
                <div className="flex-1">
                  <SectionHeader>Remarks</SectionHeader>
                  <p className="font-['Roboto:Regular',sans-serif] text-[14px] text-[#666]">
                    Remarks content will be displayed here.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            // Contact Tab Content (Default - Frame1354)
            <div className="p-[20px] flex-1 overflow-auto">
              <Frame1354 />
            </div>
          )}
        </div>
        
        {/* Modals - Only Private customer modals */}
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
  return (
    <>
      <div className="flex flex-col h-full bg-white overflow-auto">
        <div className="p-[20px] flex-1 overflow-auto">
          {/* Organization Status Banner */}
          {organizationStatus && (
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
          
          {/* Top Section */}
          <div className="flex gap-[60px]">
            {/* Customer Column */}
            <div className="flex-1 min-w-[200px]">
              <SectionHeader>Customer</SectionHeader>
              {isInactive ? (
                <ReadOnlyField label="Customer name" value={customer.customerName} />
              ) : (
                <InputField label="Customer name" value={customer.customerName} required />
              )}
              {organizationStatus !== "deleted" ? (
                <ReadOnlyField label="Org. number" value={customer.orgNumber} />
              ) : (
                <ReadOnlyField label="Org. number" value="–" />
              )}
              <ReadOnlyField label="Email" value={customer.email} />
              <ReadOnlyField label="Phone number" value={customer.phone} />
              <ReadOnlyField label="Customer status" value={isInactive ? "Inactive" : "Active"} />
              {isInactive && deactivationReason && (
                <ReadOnlyField label="Deactivation reason" value={deactivationReason} />
              )}
            </div>

            {/* Details Column */}
            <div className="flex-1 min-w-[200px]">
              <SectionHeader>Details</SectionHeader>
              <ReadOnlyField label="Customer type" value={customer.customerType} />
              <ReadOnlyField label="Customer number" value={customer.customerNumber} />
              {isInactive ? (
                <ReadOnlyField label="Ext. customer number" value={customer.extCustomerNumber} />
              ) : organizationStatus !== "deleted" ? (
                <InputField label="Ext. customer number" value={customer.extCustomerNumber} />
              ) : (
                <ReadOnlyField label="Ext. customer number" value={customer.extCustomerNumber} />
              )}
              <ReadOnlyField label="Store" value={customer.store} />
              {isInactive ? (
                <ReadOnlyField label="Customer group" value={customer.customerGroup || "–"} />
              ) : (
                <SelectField 
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

            {organizationStatus !== "deleted" ? (
              <>
                <AddressSection title="General address" inheritChecked={true} isInactive={isInactive} />
                <AddressSection title="Delivery address" inheritChecked={true} isInactive={isInactive} />
                <AddressSection title="Invoice address" inheritChecked={true} isInactive={isInactive} />
              </>
            ) : (
              <>
                <div className="flex-1 min-w-[200px]">
                  <SectionHeader>General address</SectionHeader>
                  <ReadOnlyField label="Address line 1" value="–" />
                  <ReadOnlyField label="Address line 2" value="–" />
                  <ReadOnlyField label="Postal code" value="–" />
                  <ReadOnlyField label="City" value="–" />
                  <ReadOnlyField label="Country" value="–" />
                </div>
                <div className="flex-1 min-w-[200px]">
                  <SectionHeader>Delivery address</SectionHeader>
                  <ReadOnlyField label="Address line 1" value="–" />
                  <ReadOnlyField label="Address line 2" value="–" />
                  <ReadOnlyField label="Postal code" value="–" />
                  <ReadOnlyField label="City" value="–" />
                  <ReadOnlyField label="Country" value="–" />
                </div>
                <div className="flex-1 min-w-[200px]">
                  <SectionHeader>Invoice address</SectionHeader>
                  <ReadOnlyField label="Address line 1" value="–" />
                  <ReadOnlyField label="Address line 2" value="–" />
                  <ReadOnlyField label="Postal code" value="–" />
                  <ReadOnlyField label="City" value="–" />
                  <ReadOnlyField label="Country" value="–" />
                </div>
              </>
            )}
          </div>

          {/* Contact Persons Section */}
          <div className="mt-[60px]">
            <ContactPersonsGrid />
          </div>
        </div>
      </div>
      
      {/* Modals */}
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