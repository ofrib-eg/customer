import React, { useState, useEffect } from "react";
import { useLocation, Link, useSearchParams, useParams, useNavigate } from "react-router";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import svgPaths from "@/imports/svg-8qg300dkju";
import breadcrumbSvgPaths from "@/imports/svg-9eaca977ir";
import svgPathsBell from "@/imports/svg-rt0k425s7c";
import { mockContacts } from "./customer/ContactsGrid";
import { mockOrganizations } from "./customer/OrganizationsGrid";
import { loadNewCustomers } from "./customer/newCustomers";
import { useContact } from "@/app/contexts/ContactContext";

// Mock customer data
const mockCustomers = [
  { 
    id: 1, 
    customerNumber: "0000000001", 
    extCustomerNumber: "482103",
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
    extCustomerNumber: "3910284",
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
    extCustomerNumber: "82910473",
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
    extCustomerNumber: "610284",
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
    extCustomerNumber: "7402918",
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
    extCustomerNumber: "391847205",
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
    extCustomerNumber: "528374",
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
    extCustomerNumber: "84920173",
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
    extCustomerNumber: "6031928",
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
    extCustomerNumber: "274839105",
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
    id: 12,
    customerNumber: "0000000012",
    extCustomerNumber: "738291045",
    customerName: "EG Retail Trondheim",
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
    phone: "+4773123456"
  }
];

export function Header({ 
  itemName, 
  itemNumber,
  isSelectStoreOpen,
  setIsSelectStoreOpen,
  currentStore,
  onOpenUserPreferences
}: { 
  itemName?: string, 
  itemNumber?: string | number,
  isSelectStoreOpen?: boolean,
  setIsSelectStoreOpen?: (open: boolean) => void,
  currentStore?: string,
  onOpenUserPreferences?: () => void
}) {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "details";
  const isDetailsPage = location.pathname === "/item-details";
  const isStoreRoutinesPage = location.pathname === "/store-routines";
  const isItemsInPromotionsPage = location.pathname === "/items-in-promotions";
  const isCustomerPage = location.pathname.startsWith("/customer");
  const isContactsPage = location.pathname === "/customer/contacts";
  const isOrganizationsPage = location.pathname === "/customer/organizations";
  const isContactDetailPage = location.pathname.match(/^\/customer\/contacts\/(\d+)$/);
  const contactId = isContactDetailPage ? parseInt(isContactDetailPage[1]) : null;
  const isCustomerDetailPage = location.pathname.match(/^\/customer\/customer\/(\d+)$/);
  const customerIdFromUrl = isCustomerDetailPage ? parseInt(isCustomerDetailPage[1]) : null;
  const isNewCustomerPage = location.pathname === "/customer/new";
  const isOrganizationDetailPage = location.pathname.match(/^\/customer\/organizations\/(\d+)$/);
  const organizationIdFromUrl = isOrganizationDetailPage ? parseInt(isOrganizationDetailPage[1]) : null;
  
  // Use the contact context
  const contactContext = useContact();
  
  // Get contact for breadcrumb display
  const contact = contactId ? mockContacts.find(c => c.id === contactId) : null;
  const isContactAnonymized = contactId ? contactContext.isContactAnonymized(contactId) : false;
  
  // Breadcrumb logic:
  // - For normal contacts: show "FirstName LastName"
  // - For anonymized contacts: show "IdentityNumber (Anonymized)"
  const breadcrumbContactName = contact 
    ? (isContactAnonymized 
        ? `${contact.identityNumber} (Anonymized)`
        : `${contact.firstName} ${contact.lastName}`)
    : "";
  
  const contactName = breadcrumbContactName;
  const customer = customerIdFromUrl ? [...mockCustomers, ...loadNewCustomers()].find(c => c.id === customerIdFromUrl) : null;
  const isCustomerInactive = (window as any).isCustomerInactive || false;
  const customerName = customer ? ((window as any).customerName || customer.customerName) : "";
  
  // Get organization for breadcrumb display
  const organization = organizationIdFromUrl ? mockOrganizations.find(o => o.id === organizationIdFromUrl) : null;
  const organizationName = organization ? organization.organizationName : "";
  
  const [notificationState, setNotificationState] = useState(0); // 0: off, 1: "1", 2: "3+"
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Avoid triggering when user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      
      if (e.key.toLowerCase() === "n") {
        setNotificationState(prev => (prev + 1) % 3);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Use default values if none provided
  const displayItemName = itemName || (isDetailsPage ? "Pepsi Max 0.33L" : "");
  const displayItemNumber = itemNumber !== undefined ? itemNumber.toString() : (isDetailsPage ? "100001604" : "");

  // Determine if this is a private or business customer
  const isPrivateCustomer = customer && customer.customerType === "Private customer";
  const isBusinessCustomer = customer && customer.customerType === "Business customer";

  return (
    <div className={`bg-[#37836E] flex flex-col shrink-0 relative z-[100] ${(isPrivateCustomer || isBusinessCustomer || isContactDetailPage) ? "pb-[50px]" : ""}`}>
      {/* Main header row: Breadcrumbs and User Actions */}
      <div className={`flex justify-between items-start pl-[30px] pr-[10px] pt-[45px] border-b-0 pb-[15px]`}>
        {/* Breadcrumbs Section */}
        <div className="flex gap-[20px] items-start relative" data-name="Breadcrumb">
          {/* Previous level */}
          <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Previous level">
            <Link
              to={isContactDetailPage ? "/customer/contacts" : isCustomerDetailPage ? "/customer/customer" : isNewCustomerPage ? "/customer/customer" : isOrganizationDetailPage ? "/customer/organizations" : isOrganizationsPage ? "/customer/organizations" : isContactsPage ? "/customer/contacts" : isCustomerPage ? "/customer/customer" : isStoreRoutinesPage ? "/store-routines" : isItemsInPromotionsPage ? "/items-in-promotions" : "/items"}
              className={`font-['Roboto:Light',sans-serif] font-light leading-[26.25px] relative shrink-0 text-[21px] transition-colors select-none ${
                isDetailsPage || isContactDetailPage || isCustomerDetailPage || isOrganizationDetailPage || isNewCustomerPage ? "text-[rgba(255,255,255,0.8)] hover:text-white" : "text-white"
              }`}
            >
              {isContactDetailPage ? "Contacts" : isCustomerDetailPage ? "Customers" : isNewCustomerPage ? "Customers" : isOrganizationDetailPage ? "Organizations" : isOrganizationsPage ? "Organizations" : isContactsPage ? "Contacts" : isCustomerPage ? "Customers" : isStoreRoutinesPage ? "Store routines" : isItemsInPromotionsPage ? "Items in promotions" : "Items"}
            </Link>
          </div>

          {(isDetailsPage || isContactDetailPage || isCustomerDetailPage || isOrganizationDetailPage || isNewCustomerPage) && (
            <>
              {/* Chevron */}
              <div className="h-[27px] relative shrink-0 w-[6px]" data-name="Chevron">
                <div className="absolute inset-[0_-11.79%_0_-5.89%] flex items-center">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.06066 27">
                    <g id="Chevron">
                      <path d={breadcrumbSvgPaths.p124d0a00} id="Vector" stroke="white" />
                    </g>
                  </svg>
                </div>
              </div>
              
              {/* Viewed level */}
              <div className="content-stretch flex gap-[20px] items-start relative shrink-0" data-name="Viewed level">
                {isContactDetailPage || isCustomerDetailPage || isOrganizationDetailPage || isNewCustomerPage ? (
                  <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Viewed level">
                    {isContactDetailPage && isContactAnonymized ? (
                      <p className="font-['Roboto:Light',sans-serif] font-light leading-[26.25px] relative shrink-0 text-[21px] text-white">
                        {contact?.identityNumber} <span className="text-[rgba(255,255,255,0.8)]">(Anonymized)</span>
                      </p>
                    ) : isCustomerDetailPage && isCustomerInactive ? (
                      <p className="font-['Roboto:Light',sans-serif] font-light leading-[26.25px] relative shrink-0 text-[21px] text-white">
                        {customerName} <span className="text-[rgba(255,255,255,0.8)]">(Inactive)</span>
                      </p>
                    ) : (
                      <p className="font-['Roboto:Light',sans-serif] font-light leading-[26.25px] relative shrink-0 text-[21px] text-white">
                        {isContactDetailPage ? breadcrumbContactName : isCustomerDetailPage ? customerName : isNewCustomerPage ? "New customer" : organizationName}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="content-stretch flex flex-col items-start relative shrink-0 gap-[2px]" data-name="Viewed level">
                    {/* Viewed level (Item Name) */}
                    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full" data-name="Viewed level">
                      <p className="font-['Roboto:Light',sans-serif] font-light leading-[26.25px] relative shrink-0 text-[21px] text-white">
                        {displayItemName}
                      </p>
                    </div>
                    {/* Information (Item ID) */}
                    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Information">
                      <p className="font-['Roboto:Light',sans-serif] font-light leading-[22.5px] relative shrink-0 text-[15px] text-white">
                        {displayItemNumber}
                      </p>
                    </div>
                  </div>
                )}
                
                {/* Status */}
                {isDetailsPage && (
                  <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Status">
                    <p className="font-['Roboto:Light',sans-serif] font-light leading-[26.25px] relative shrink-0 text-[21px] text-[rgba(255,255,255,0.8)]">
                      (Draft)
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* User Context and Actions Section */}
        <div className="flex items-center gap-[20px] h-[24px]">
          {/* Store Context (Store Routines only) */}
          {isStoreRoutinesPage && (
            <button 
              onClick={() => setIsSelectStoreOpen?.(true)}
              className="text-white text-[14px] font-normal underline underline-offset-[5px] decoration-1 decoration-white cursor-pointer outline-none mr-[20px] whitespace-nowrap"
            >
              {currentStore || "1000 – Coop Extra Grilstad"}
            </button>
          )}

          {/* Notifications */}
          <div className="relative w-[32px] h-[32px] flex items-center justify-center rounded-full hover:bg-white/10 cursor-pointer transition-all">
            <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
              <path d={svgPathsBell.p37ecce20} fill="white" />
            </svg>
            {notificationState > 0 && (
              <span className={`absolute -top-[5px] left-[14px] flex items-center justify-center bg-[#373737] text-white text-[12px] font-bold rounded-full min-w-[22px] h-[22px] ${notificationState === 1 ? "px-1" : "px-[6px]"} border-2 border-[#37836E]`}>
                {notificationState === 1 ? "1" : "3+"}
              </span>
            )}
          </div>

          {/* User Profile Dropdown */}
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className="flex items-center px-1 py-1 rounded-full hover:bg-white/10 cursor-pointer transition-all group outline-none border-0 bg-transparent">
                <div className="h-[24px] w-[40px] rounded-full bg-[#285F4F] flex items-center justify-center shrink-0">
                  <span className="text-white text-[13px] font-normal font-roboto uppercase leading-none">MA</span>
                </div>
                <div className="size-[20px] flex items-center justify-center ml-0">
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                    <path d="M9 1L5 5L1 1H9Z" fill="#FFFFFF" />
                  </svg>
                </div>
              </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content 
                className="z-[10000] bg-white border border-[#CCCCCC] shadow-lg outline-none overflow-hidden min-w-[220px]"
                align="end"
                sideOffset={4}
              >
                <DropdownMenu.Item 
                  onClick={onOpenUserPreferences}
                  className="h-[36px] px-4 flex items-center text-[14px] font-roboto font-normal text-[#1A1A1A] outline-none cursor-pointer focus:bg-[#EAEAEA] transition-colors"
                >
                  Preferences
                </DropdownMenu.Item>
                <div className="h-[1px] bg-[#EAEAEA] mx-0" />
                <DropdownMenu.Item 
                  className="h-[36px] px-4 flex items-center text-[14px] font-roboto font-normal text-[#1A1A1A] outline-none cursor-pointer focus:bg-[#EAEAEA] transition-colors"
                >
                  Log out
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </div>

      {/* Tab Row: Details view only */}
      {isDetailsPage && (
        <div className="flex justify-end pr-[20px] mt-auto">
          <div className="flex gap-[4px] items-end">
            {/* Overview */}
            <div className="bg-[#373737] px-[25px] h-[30px] flex items-center justify-center cursor-pointer select-none whitespace-nowrap">
              <span className="text-white text-[12px] font-medium font-roboto text-center uppercase">
                overview
              </span>
            </div>
            
            {/* Details */}
            <Link 
              to="/item-details?tab=details"
              className={`${activeTab === "details" ? "bg-white h-[32px] items-end pb-[5px]" : "bg-[#373737] h-[30px] items-center"} px-[25px] flex justify-center cursor-pointer transition-all select-none whitespace-nowrap`}
            >
              <span className={`${activeTab === "details" ? "text-black font-bold text-[13px]" : "text-white font-medium text-[12px]"} font-roboto uppercase`}>
                details
              </span>
            </Link>

            {/* Local Values */}
            <Link 
              to="/item-details?tab=local-values"
              className={`${activeTab === "local-values" ? "bg-white h-[32px] items-end pb-[5px]" : "bg-[#373737] h-[30px] items-center"} px-[25px] flex justify-center cursor-pointer transition-all select-none whitespace-nowrap`}
            >
              <span className={`${activeTab === "local-values" ? "text-black font-bold text-[13px]" : "text-white font-medium text-[12px]"} font-roboto uppercase whitespace-nowrap`}>
                Local values
              </span>
            </Link>

            {/* Price */}
            <Link 
              to="/item-details?tab=store-price"
              className={`${activeTab === "store-price" ? "bg-white h-[32px] items-end pb-[5px]" : "bg-[#373737] h-[30px] items-center"} px-[25px] flex justify-center cursor-pointer transition-all select-none whitespace-nowrap`}
            >
              <span className={`${activeTab === "store-price" ? "text-black font-bold text-[13px]" : "text-white font-medium text-[12px]"} font-roboto uppercase whitespace-nowrap`}>
                Ordinary price
              </span>
            </Link>
          </div>
        </div>
      )}

      {/* Tab Row: Customer detail pages (same tab set for private and business customers) */}
      {(isPrivateCustomer || isBusinessCustomer) && (
        <div className="absolute h-[33px] right-[10px] bottom-[0px]" data-name="Container">
          <div className="flex gap-[2px] items-end relative size-full">
            {[
              { key: "details", label: "Details" },
              { key: "sales", label: "Sales" },
              { key: "offers", label: "Offers" },
              { key: "customer-orders", label: "Customer orders" },
            ].map((tab) => {
              const isActive = (searchParams.get("tab") || "details") === tab.key;
              return (
                <div
                  key={tab.key}
                  className={`content-stretch flex flex-col items-start relative shrink-0 ${isActive ? "" : "py-[3px]"}`}
                >
                  <Link
                    to={`/customer/customer/${customerIdFromUrl}?tab=${tab.key}`}
                    className={`content-stretch flex items-start px-[25px] relative shrink-0 ${
                      isActive
                        ? "bg-[#333] py-[9px] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)]"
                        : "bg-[#333] py-[6px]"
                    }`}
                  >
                    <p className={`font-['Roboto:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[13px] text-center tracking-[-0.5px] uppercase whitespace-nowrap ${
                      isActive ? "text-white" : "text-[#ccc]"
                    }`}>
                      {tab.label}
                    </p>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab Row: Contact detail pages */}
      {isContactDetailPage && (
        <div className="absolute h-[33px] right-[10px] bottom-[0px]" data-name="Container">
          <div className="flex gap-[2px] items-end relative size-full">
            {[
              { key: "details", label: "Details" },
              { key: "relationship", label: "Relationship" },
            ].map((tab) => {
              const isActive = (searchParams.get("tab") || "details") === tab.key;
              return (
                <div
                  key={tab.key}
                  className={`content-stretch flex flex-col items-start relative shrink-0 ${isActive ? "" : "py-[3px]"}`}
                >
                  <Link
                    to={`/customer/contacts/${contactId}?tab=${tab.key}`}
                    className={`content-stretch flex items-start px-[25px] relative shrink-0 ${
                      isActive
                        ? "bg-[#333] py-[9px] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)]"
                        : "bg-[#333] py-[6px]"
                    }`}
                  >
                    <p className={`font-['Roboto:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[13px] text-center tracking-[-0.5px] uppercase whitespace-nowrap ${
                      isActive ? "text-white" : "text-[#ccc]"
                    }`}>
                      {tab.label}
                    </p>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}