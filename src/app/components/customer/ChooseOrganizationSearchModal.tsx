import React, { useState, useEffect } from "react";
import { Search, X } from "lucide-react";

export interface Organization {
  id: string;
  orgName: string;
  orgNr: string;
  address: string;
  country: string;
  organizationType?: string;
  branchNumber?: string;
  source: "Internal" | "External";
  dunsNumber?: string;
  externalAddresses?: {
    type: "Address" | "Delivery address" | "Invoice address";
    addressLine1: string;
    addressLine2: string;
    postalCode: string;
    city: string;
    country: string;
  }[];
  internalAddresses?: {
    type: "Address" | "Delivery address" | "Invoice address";
    addressLine1: string;
    addressLine2: string;
    postalCode: string;
    city: string;
    country: string;
  }[];
}

interface ChooseOrganizationSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectOrganization: (org: Organization) => void;
  initialQuery?: string;
}

// Mock data for demonstration - all organizations are based in Norway
const mockOrganizations: Organization[] = [
  {
    id: "1",
    orgName: "EG Retail AS",
    orgNr: "968 992 600",
    address: "Skonnertvegen 10, 7053 Ranheim",
    country: "Norway",
    organizationType: "Parent",
    source: "Internal",
    internalAddresses: [
      { type: "Address", addressLine1: "Skonnertvegen 10", addressLine2: "", postalCode: "7053", city: "Ranheim", country: "Norway" }
    ]
  },
  {
    id: "2",
    orgName: "EG Norge AS",
    orgNr: "983 781 233",
    address: "Hoffsveien 4, 0275, Oslo",
    country: "Norway",
    organizationType: "Subsidiary",
    source: "External",
    dunsNumber: "5501234",
    externalAddresses: [
      { type: "Address", addressLine1: "Hoffsveien 4", addressLine2: "", postalCode: "0275", city: "Oslo", country: "Norway" }
    ]
  },
  {
    id: "3",
    orgName: "EG Norge AS avd Oslo",
    orgNr: "994 858 459",
    address: "Hoffsveien 4, 0275, Oslo",
    country: "Norway",
    organizationType: "Branch",
    branchNumber: "994858459",
    source: "Internal",
    internalAddresses: [
      { type: "Address", addressLine1: "Hoffsveien 4", addressLine2: "", postalCode: "0275", city: "Oslo", country: "Norway" }
    ]
  },
  {
    id: "4",
    orgName: "EG Norge AS avd Bergen",
    orgNr: "991 905 065",
    address: "Inger Bang Lunds vei 14, 5059 Bergen",
    country: "Norway",
    organizationType: "Branch",
    branchNumber: "991905065",
    source: "Internal",
    internalAddresses: [
      { type: "Address", addressLine1: "Inger Bang Lunds vei 14", addressLine2: "", postalCode: "5059", city: "Bergen", country: "Norway" }
    ]
  },
  {
    id: "5",
    orgName: "EG Retail AS avd Trondheim",
    orgNr: "982 460 298",
    address: "Skonnertvegen 8-10, 7053 Ranheim",
    country: "Norway",
    organizationType: "Branch",
    branchNumber: "982460298",
    source: "Internal",
    internalAddresses: [
      { type: "Address", addressLine1: "Skonnertvegen 8-10", addressLine2: "", postalCode: "7053", city: "Ranheim", country: "Norway" }
    ]
  }
];

export function ChooseOrganizationSearchModal({
  isOpen,
  onClose,
  onSelectOrganization,
  initialQuery
}: ChooseOrganizationSearchModalProps) {
  const [searchQuery, setSearchQuery] = useState(initialQuery || "556484-9965");
  const [organizations] = useState<Organization[]>(mockOrganizations);

  useEffect(() => {
    if (isOpen) setSearchQuery(initialQuery || "556484-9965");
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div 
        className="bg-white w-[950px] max-h-[600px] shadow-lg flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-[20px] pt-[20px] pb-[16px] flex items-center justify-between border-b border-[#CCCCCC]">
          <h2 className="font-['Roboto_Condensed:Bold',sans-serif] text-[16px] leading-[19px] text-[#1a1a1a] uppercase">
            Choose Organization
          </h2>
          <button
            onClick={onClose}
            className="w-[24px] h-[24px] flex items-center justify-center hover:bg-[#f5f5f5] transition-colors"
          >
            <X className="w-[20px] h-[20px] text-[#666666]" />
          </button>
        </div>

        {/* Search */}
        <div className="px-[20px] py-[16px] border-b border-[#CCCCCC]">
          <label className="block mb-[8px]">
            <span className="font-['Roboto:Regular',sans-serif] text-[13px] leading-[16px] text-[#666666]">
              Search organization
            </span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-[32px] px-[10px] pr-[35px] border border-[#CCCCCC] font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a] focus:outline-none focus:border-[#1c7862]"
              placeholder=""
            />
            <Search className="absolute right-[10px] top-1/2 -translate-y-1/2 w-[16px] h-[16px] text-[#666666] pointer-events-none" />
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          <table className="w-full border-collapse">
            <thead className="sticky top-0 bg-[#595959] z-10">
              <tr>
                <th className="px-[12px] py-[8px] text-left font-['Roboto_Condensed:Bold',sans-serif] text-[13px] leading-[16px] text-white uppercase border-r border-white">
                  Org Name
                </th>
                <th className="px-[12px] py-[8px] text-left font-['Roboto_Condensed:Bold',sans-serif] text-[13px] leading-[16px] text-white uppercase border-r border-white">
                  Org Nr
                </th>
                <th className="px-[12px] py-[8px] text-left font-['Roboto_Condensed:Bold',sans-serif] text-[13px] leading-[16px] text-white uppercase border-r border-white">
                  Address
                </th>
                <th className="px-[12px] py-[8px] text-left font-['Roboto_Condensed:Bold',sans-serif] text-[13px] leading-[16px] text-white uppercase border-r border-white">
                  Country
                </th>
                <th className="px-[12px] py-[8px] text-left font-['Roboto_Condensed:Bold',sans-serif] text-[13px] leading-[16px] text-white uppercase border-r border-white">
                  Org Type
                </th>
                <th className="px-[12px] py-[8px] text-left font-['Roboto_Condensed:Bold',sans-serif] text-[13px] leading-[16px] text-white uppercase">
                  Source
                </th>
              </tr>
            </thead>
            <tbody>
              {organizations.map((org, index) => {
                const isHighlighted = index === 0;
                return (
                  <tr
                    key={org.id}
                    onClick={() => onSelectOrganization(org)}
                    className={`border-b border-[#E0E0E0] cursor-pointer ${isHighlighted ? "bg-[#F5F5F5]" : "hover:bg-[#F5F5F5]"}`}
                  >
                    <td className="px-[12px] py-[10px] font-['Roboto:Regular',sans-serif] text-[14px] leading-[17px] text-[#1a1a1a]">
                      {org.orgName}
                    </td>
                    <td className="px-[12px] py-[10px] font-['Roboto:Regular',sans-serif] text-[14px] leading-[17px] underline text-[#1a1a1a]">
                      {org.orgNr}
                    </td>
                    <td className="px-[12px] py-[10px] font-['Roboto:Regular',sans-serif] text-[14px] leading-[17px] text-[#1a1a1a]">
                      {org.address}
                    </td>
                    <td className="px-[12px] py-[10px] font-['Roboto:Regular',sans-serif] text-[14px] leading-[17px] text-[#1a1a1a]">
                      {org.country}
                    </td>
                    <td className="px-[12px] py-[10px] font-['Roboto:Regular',sans-serif] text-[14px] leading-[17px] text-[#1a1a1a]">
                      {org.organizationType}
                    </td>
                    <td className="px-[12px] py-[10px] font-['Roboto:Regular',sans-serif] text-[14px] leading-[17px] text-[#1a1a1a]">
                      {org.source}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
