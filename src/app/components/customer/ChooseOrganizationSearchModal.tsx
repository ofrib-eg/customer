import React, { useState } from "react";
import { Search, X } from "lucide-react";

interface Organization {
  id: string;
  orgName: string;
  orgNr: string;
  address: string;
  country: string;
  status?: string;
}

interface ChooseOrganizationSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectOrganization: (org: Organization) => void;
}

// Mock data for demonstration
const mockOrganizations: Organization[] = [
  {
    id: "1",
    orgName: "EG Retail",
    orgNr: "5564849965",
    address: "Malmögatan 5, 555 55, Malmö",
    country: "Sweden"
  },
  {
    id: "2",
    orgName: "EG Retail",
    orgNr: "5564849965",
    address: "Fredsgatan 3, 411 07, Göteborg",
    country: "Sweden"
  },
  {
    id: "3",
    orgName: "EG Retail",
    orgNr: "5564849965",
    address: "Ängelholmsgatan 4, 444 44, Ängelholm",
    country: "Sweden"
  },
  {
    id: "4",
    orgName: "EG Retail",
    orgNr: "5564849965",
    address: "Kalrstadsgatan 6, 666 66, Karlstad",
    country: "Sweden"
  },
  {
    id: "5",
    orgName: "EG Retail",
    orgNr: "5564849965",
    address: "Stockholmsgatan 7, 777 77, Stockholm",
    country: "Sweden",
    status: "Exists"
  }
];

export function ChooseOrganizationSearchModal({
  isOpen,
  onClose,
  onSelectOrganization
}: ChooseOrganizationSearchModalProps) {
  const [searchQuery, setSearchQuery] = useState("556484-9965");
  const [organizations] = useState<Organization[]>(mockOrganizations);

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
                <th className="px-[12px] py-[8px] text-left font-['Roboto_Condensed:Bold',sans-serif] text-[13px] leading-[16px] text-white uppercase">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {organizations.map((org, index) => (
                <tr
                  key={org.id}
                  onClick={() => !org.status && onSelectOrganization(org)}
                  className={`border-b border-[#E0E0E0] ${
                    org.status 
                      ? "bg-[#F5F5F5] cursor-not-allowed opacity-60" 
                      : "hover:bg-[#F5F5F5] cursor-pointer"
                  }`}
                >
                  <td className={`px-[12px] py-[10px] font-['Roboto:Regular',sans-serif] text-[14px] leading-[17px] ${
                    org.status ? "text-[#999999]" : "text-[#1a1a1a]"
                  }`}>
                    {org.orgName}
                  </td>
                  <td className={`px-[12px] py-[10px] font-['Roboto:Regular',sans-serif] text-[14px] leading-[17px] ${
                    org.status ? "text-[#999999] line-through" : "text-[#1a1a1a] underline"
                  }`}>
                    {org.orgNr}
                  </td>
                  <td className={`px-[12px] py-[10px] font-['Roboto:Regular',sans-serif] text-[14px] leading-[17px] ${
                    org.status ? "text-[#999999]" : "text-[#1a1a1a]"
                  }`}>
                    {org.address}
                  </td>
                  <td className={`px-[12px] py-[10px] font-['Roboto:Regular',sans-serif] text-[14px] leading-[17px] ${
                    org.status ? "text-[#999999]" : "text-[#1a1a1a]"
                  }`}>
                    {org.country}
                  </td>
                  <td className="px-[12px] py-[10px] font-['Roboto:Regular',sans-serif] text-[14px] leading-[17px] text-[#1a1a1a]">
                    {org.status || ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
