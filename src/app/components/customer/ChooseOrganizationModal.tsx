import React, { useState } from "react";
import { X, Search } from "lucide-react";

interface Organization {
  id: number;
  name: string;
  orgNumber: string;
  address: string;
  country: string;
  existingCustomers?: string;
}

interface ChooseOrganizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectOrganization: (orgId: number) => void;
}

// Mock organization data
const mockOrganizations: Organization[] = [
  {
    id: 1,
    name: "EG Retail",
    orgNumber: "5564849965",
    address: "Malmögatan 5, 555 55, Malmö",
    country: "Sweden",
    existingCustomers: "EG Retail Göteborg"
  },
  {
    id: 2,
    name: "EG Retail",
    orgNumber: "5564849965",
    address: "Fredsgatan 3, 411 07, Göteborg",
    country: "Sweden",
  },
  {
    id: 3,
    name: "EG Retail",
    orgNumber: "5564849965",
    address: "Ängelholmsgata 4, 444 44, Ängelholm",
    country: "Sweden",
  },
  {
    id: 4,
    name: "EG Retail",
    orgNumber: "5564849965",
    address: "Kalrstadsgatan 6, 666 66, Karlstad",
    country: "Sweden",
  },
  {
    id: 5,
    name: "EG Retail",
    orgNumber: "5564849965",
    address: "Stockholmsgatan 7, 777 77, Stockholm",
    country: "Sweden",
    existingCustomers: "2 Customers exists"
  },
];

export function ChooseOrganizationModal({ 
  isOpen, 
  onClose, 
  onSelectOrganization 
}: ChooseOrganizationModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrgId, setSelectedOrgId] = useState<number | null>(null);

  if (!isOpen) return null;

  const filteredOrganizations = mockOrganizations.filter(org => 
    org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    org.orgNumber.includes(searchQuery) ||
    org.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleConfirm = () => {
    if (selectedOrgId) {
      onSelectOrganization(selectedOrgId);
    }
  };

  const handleClose = () => {
    setSearchQuery("");
    setSelectedOrgId(null);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={handleClose}
    >
      <div 
        className="bg-white w-[960px] max-h-[600px] flex flex-col shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-[20px] py-[16px] border-b border-[#e0e0e0]">
          <h2 className="font-['Roboto_Condensed:Bold',sans-serif] text-[16px] leading-[19px] text-[#1a1a1a] uppercase">
            Choose Organization
          </h2>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-gray-100 rounded transition-colors cursor-pointer"
          >
            <X className="size-5 text-[#666]" />
          </button>
        </div>

        {/* Search */}
        <div className="px-[20px] py-[16px] border-b border-[#e0e0e0]">
          <div className="relative">
            <label className="block font-['Roboto:Regular',sans-serif] text-[14px] leading-[17px] text-[#666] mb-[4px]">
              Search organization
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="556484-9965"
                className="w-[280px] h-[32px] px-[10px] pr-[35px] font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a] border border-[#ccc] outline-none focus:border-[#999]"
              />
              <Search className="absolute right-[8px] top-1/2 -translate-y-1/2 size-4 text-[#666] pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          <table className="w-full border-collapse">
            <thead className="sticky top-0 bg-[#4a4a4a]">
              <tr>
                <th className="px-[16px] py-[10px] text-left font-['Roboto:Bold',sans-serif] text-[12px] leading-[14px] text-white uppercase">
                  Org Name
                </th>
                <th className="px-[16px] py-[10px] text-left font-['Roboto:Bold',sans-serif] text-[12px] leading-[14px] text-white uppercase">
                  Org Nr
                </th>
                <th className="px-[16px] py-[10px] text-left font-['Roboto:Bold',sans-serif] text-[12px] leading-[14px] text-white uppercase">
                  Address
                </th>
                <th className="px-[16px] py-[10px] text-left font-['Roboto:Bold',sans-serif] text-[12px] leading-[14px] text-white uppercase">
                  Country
                </th>
                <th className="px-[16px] py-[10px] text-left font-['Roboto:Bold',sans-serif] text-[12px] leading-[14px] text-white uppercase">
                  Business Customer
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredOrganizations.map((org) => (
                <tr
                  key={org.id}
                  onClick={() => setSelectedOrgId(org.id)}
                  className={`border-b border-[#e0e0e0] cursor-pointer hover:bg-[#f5f5f5] transition-colors ${
                    selectedOrgId === org.id ? 'bg-[#e3f2fd]' : ''
                  }`}
                >
                  <td className="px-[16px] py-[12px] font-['Roboto:Regular',sans-serif] text-[14px] leading-[17px] text-[#1a1a1a]">
                    {org.name}
                  </td>
                  <td className="px-[16px] py-[12px] font-['Roboto:Regular',sans-serif] text-[14px] leading-[17px] text-[#1a1a1a] underline">
                    {org.orgNumber}
                  </td>
                  <td className="px-[16px] py-[12px] font-['Roboto:Regular',sans-serif] text-[14px] leading-[17px] text-[#1a1a1a]">
                    {org.address}
                  </td>
                  <td className="px-[16px] py-[12px] font-['Roboto:Regular',sans-serif] text-[14px] leading-[17px] text-[#1a1a1a]">
                    {org.country}
                  </td>
                  <td className="px-[16px] py-[12px] font-['Roboto:Regular',sans-serif] text-[14px] leading-[17px] text-[#666]">
                    {org.existingCustomers || ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-[10px] px-[20px] py-[16px] border-t border-[#e0e0e0]">
          <button
            onClick={handleClose}
            className="px-[20px] h-[32px] font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a] bg-white border border-[#ccc] hover:bg-[#f5f5f5] transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!selectedOrgId}
            className="px-[20px] h-[32px] font-['Roboto:Regular',sans-serif] text-[14px] text-white bg-[#0066cc] hover:bg-[#0052a3] transition-colors cursor-pointer disabled:bg-[#ccc] disabled:cursor-not-allowed"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
