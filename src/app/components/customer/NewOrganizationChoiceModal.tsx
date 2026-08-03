import React, { useState } from "react";
import { Search } from "lucide-react";

interface NewOrganizationChoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearchOrganization: () => void;
  onCreateOrganization: () => void;
}

export function NewOrganizationChoiceModal({
  isOpen,
  onClose,
  onSearchOrganization,
  onCreateOrganization
}: NewOrganizationChoiceModalProps) {
  const [selectedOption, setSelectedOption] = useState<"search" | "create">("search");
  const [searchQuery, setSearchQuery] = useState("");
  const [orgName, setOrgName] = useState("");
  const [orgNumber, setOrgNumber] = useState("");
  const [orgType, setOrgType] = useState("Parent");
  const [country, setCountry] = useState("Sweden");

  if (!isOpen) return null;

  const handleCreate = () => {
    if (selectedOption === "search") {
      // Open search results modal
      onSearchOrganization();
    } else {
      // Create organization with form data
      onCreateOrganization();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div 
        className="bg-white w-[600px] shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-[20px] pt-[20px] pb-[16px]">
          <h2 className="font-['Roboto_Condensed:Bold',sans-serif] text-[16px] leading-[19px] text-[#1a1a1a] uppercase">
            New Organization
          </h2>
        </div>

        {/* Content */}
        <div className="px-[20px] pb-[20px]">
          {/* Radio Options */}
          <div className="space-y-[12px] mb-[20px]">
            {/* Search Organization Radio */}
            <label className="flex items-center gap-[8px] cursor-pointer">
              <input
                type="radio"
                name="organization-type"
                checked={selectedOption === "search"}
                onChange={() => setSelectedOption("search")}
                className="w-[16px] h-[16px] cursor-pointer accent-[#1a1a1a]"
              />
              <span className="font-['Roboto:Regular',sans-serif] text-[14px] leading-[17px] text-[#1a1a1a]">
                Search organization
              </span>
            </label>

            {/* Create Organization Radio */}
            <label className="flex items-center gap-[8px] cursor-pointer">
              <input
                type="radio"
                name="organization-type"
                checked={selectedOption === "create"}
                onChange={() => setSelectedOption("create")}
                className="w-[16px] h-[16px] cursor-pointer accent-[#1a1a1a]"
              />
              <span className="font-['Roboto:Regular',sans-serif] text-[14px] leading-[17px] text-[#1a1a1a]">
                Create organization
              </span>
            </label>
          </div>

          {/* Conditional Content */}
          {selectedOption === "search" ? (
            <div>
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
          ) : (
            <div className="space-y-[16px]">
              {/* Org. name */}
              <div>
                <label className="block mb-[8px]">
                  <span className="font-['Roboto:Regular',sans-serif] text-[13px] leading-[16px] text-[#D32F2F]">
                    * Org. name
                  </span>
                </label>
                <input
                  type="text"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  className="w-full h-[32px] px-[10px] border border-[#CCCCCC] font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a] focus:outline-none focus:border-[#1c7862]"
                  placeholder=""
                />
              </div>

              {/* Org. number */}
              <div>
                <label className="block mb-[8px]">
                  <span className="font-['Roboto:Regular',sans-serif] text-[13px] leading-[16px] text-[#D32F2F]">
                    * Org. number
                  </span>
                </label>
                <input
                  type="text"
                  value={orgNumber}
                  onChange={(e) => setOrgNumber(e.target.value)}
                  className="w-full h-[32px] px-[10px] border border-[#CCCCCC] font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a] focus:outline-none focus:border-[#1c7862]"
                  placeholder=""
                />
              </div>

              {/* Organization type */}
              <div>
                <label className="block mb-[8px]">
                  <span className="font-['Roboto:Regular',sans-serif] text-[13px] leading-[16px] text-[#D32F2F]">
                    * Organization type
                  </span>
                </label>
                <select
                  value={orgType}
                  onChange={(e) => setOrgType(e.target.value)}
                  className="w-full h-[32px] px-[10px] border border-[#CCCCCC] font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a] focus:outline-none focus:border-[#1c7862] bg-white"
                >
                  <option>Parent</option>
                  <option>Subsidiary</option>
                  <option>Branch</option>
                </select>
              </div>

              {/* Country */}
              <div>
                <label className="block mb-[8px]">
                  <span className="font-['Roboto:Regular',sans-serif] text-[13px] leading-[16px] text-[#D32F2F]">
                    * Country
                  </span>
                </label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full h-[32px] px-[10px] border border-[#CCCCCC] font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a] focus:outline-none focus:border-[#1c7862] bg-white"
                >
                  <option>Sweden</option>
                  <option>Norway</option>
                  <option>Denmark</option>
                  <option>Finland</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-[10px] px-[20px] py-[16px] bg-[#666666]">
          <button
            onClick={onClose}
            className="px-[20px] h-[32px] font-['Roboto:Regular',sans-serif] text-[14px] text-white bg-[#666666] hover:bg-[#555555] transition-colors cursor-pointer uppercase"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            className="px-[20px] h-[32px] font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a] bg-[#FFA726] hover:bg-[#FB8C00] transition-colors cursor-pointer uppercase"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}