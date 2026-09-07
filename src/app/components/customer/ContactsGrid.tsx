import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import svgPathsMain from "@/imports/svg-16ystvll8u";
import { FilterMenu } from "@/app/components/FilterMenu";
import { useContact } from "@/app/contexts/ContactContext";

export const mockContacts = [
  { 
    id: 1, 
    identityNumber: "11223300",
    name: "Melina Andersson", 
    firstName: "Melina",
    lastName: "Andersson",
    company: "EG Trondheim", 
    email: "Ola.n@eg.no", 
    phone: "+4792231501",
    mobile: "+4798765432",
    bin: "BIN001",
    loyaltyProgramName: "Gold Member",
    modifiedBy: "Admin User",
    modifiedDate: "2026-02-18"
  },
  { 
    id: 3, 
    identityNumber: "34567890123",
    name: "Maria Hansen", 
    firstName: "Maria",
    lastName: "Hansen",
    company: "Nordic Solutions AS", 
    email: "m.hansen@nordic.no", 
    phone: "+47 234 56 789",
    mobile: "+47 876 54 321",
    bin: "BIN003",
    loyaltyProgramName: "Platinum Member",
    modifiedBy: "Admin User",
    modifiedDate: "2026-02-16"
  },
  { 
    id: 4, 
    identityNumber: "45678901234",
    name: "Erik Olsen", 
    firstName: "Erik",
    lastName: "Olsen",
    company: "Tech Innovators", 
    email: "e.olsen@techinno.com", 
    phone: "+47 345 67 890",
    mobile: "+47 765 43 210",
    bin: "BIN004",
    loyaltyProgramName: "Bronze Member",
    modifiedBy: "System",
    modifiedDate: "2026-02-15"
  },
  { 
    id: 5, 
    identityNumber: "56789012345",
    name: "Linda Berg", 
    firstName: "Linda",
    lastName: "Berg",
    company: "Retail Group Norway", 
    email: "l.berg@retail.no", 
    phone: "+47 456 78 901",
    mobile: "+47 654 32 109",
    bin: "BIN005",
    loyaltyProgramName: "Gold Member",
    modifiedBy: "Admin User",
    modifiedDate: "2026-02-14"
  },
  { 
    id: 6, 
    identityNumber: "67890123456",
    name: "Thomas Lie", 
    firstName: "Thomas",
    lastName: "Lie",
    company: "Local Shop AS", 
    email: "t.lie@localshop.no", 
    phone: "+47 567 89 012",
    mobile: "+47 543 21 098",
    bin: "BIN006",
    loyaltyProgramName: "Silver Member",
    modifiedBy: "System",
    modifiedDate: "2026-02-13"
  },
  { 
    id: 7, 
    identityNumber: "78901234567",
    name: "Anna Johansen", 
    firstName: "Anna",
    lastName: "Johansen",
    company: "Nordic Solutions AS", 
    email: "a.johansen@nordic.no", 
    phone: "+47 678 90 123",
    mobile: "+47 432 10 987",
    bin: "BIN007",
    loyaltyProgramName: "Platinum Member",
    modifiedBy: "Admin User",
    modifiedDate: "2026-02-12"
  },
  { 
    id: 8, 
    identityNumber: "89012345678",
    name: "Per Svendsen", 
    firstName: "Per",
    lastName: "Svendsen",
    company: "Tech Innovators", 
    email: "p.svendsen@techinno.com", 
    phone: "+47 789 01 234",
    mobile: "+47 321 09 876",
    bin: "BIN008",
    loyaltyProgramName: "Gold Member",
    modifiedBy: "System",
    modifiedDate: "2026-02-11"
  },
  { 
    id: 9, 
    identityNumber: "90123456789",
    name: "Kari Nielsen", 
    firstName: "Kari",
    lastName: "Nielsen",
    company: "Acme Corporation", 
    email: "k.nielsen@acme.com", 
    phone: "+47 890 12 345",
    mobile: "+47 210 98 765",
    bin: "BIN009",
    loyaltyProgramName: "Bronze Member",
    modifiedBy: "Admin User",
    modifiedDate: "2026-02-10"
  },
  { 
    id: 10, 
    identityNumber: "01234567890",
    name: "Lars Pettersen", 
    firstName: "Lars",
    lastName: "Pettersen",
    company: "Retail Group Norway", 
    email: "l.pettersen@retail.no", 
    phone: "+47 901 23 456",
    mobile: "+47 109 87 654",
    bin: "BIN010",
    loyaltyProgramName: "Silver Member",
    modifiedBy: "System",
    modifiedDate: "2026-02-09"
  },
];

const defaultColumns = [
  { id: "actions", label: "+", width: 50, sticky: false },
  { id: "identityNumber", label: "IDENTITY NUMBER", width: 150, sticky: false },
  { id: "inactive", label: "INACTIVE", width: 100, sticky: false },
  { id: "firstName", label: "FIRST NAME", width: 150, sticky: false },
  { id: "lastName", label: "LAST NAME", width: 150, sticky: false },
  { id: "company", label: "COMPANY", width: 180, sticky: false },
  { id: "email", label: "EMAIL", width: 200, sticky: false },
  { id: "phone", label: "PHONE", width: 140, sticky: false },
  { id: "mobile", label: "MOBILE", width: 140, sticky: false },
  { id: "bin", label: "BIN", width: 100, sticky: false },
  { id: "loyaltyProgramName", label: "LOYALTY PROGRAM NAME", width: 200, sticky: false },
  { id: "modifiedBy", label: "MODIFIED BY", width: 150, sticky: false },
  { id: "modifiedDate", label: "MODIFIED DATE", width: 140, sticky: false },
];

type InactiveFilter = "all" | "active" | "inactive";

export function ContactsGrid() {
  const navigate = useNavigate();
  const { isContactAnonymized } = useContact();
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [filterModes, setFilterModes] = useState<Record<string, string>>({});
  const [openMenuColumn, setOpenMenuColumn] = useState<string | null>(null);
  const [inactiveFilter, setInactiveFilter] = useState<InactiveFilter>("active");

  const columns = useMemo(() => {
    let currentOffset = 0;
    return defaultColumns.map((col) => {
      const offset = col.sticky ? currentOffset : undefined;
      if (col.sticky) currentOffset += col.width;
      return { ...col, offset };
    });
  }, []);

  const filteredData = useMemo(() => {
    return mockContacts.filter((contact) => {
      const isAnonymized = isContactAnonymized(contact.id);
      
      // Filter by inactive status
      if (inactiveFilter === "active" && isAnonymized) return false;
      if (inactiveFilter === "inactive" && !isAnonymized) return false;

      // Filter by other fields
      return Object.keys(filters).every((key) => {
        if (!filters[key] || key === "inactive") return true;
        const value = contact[key as keyof typeof contact];
        if (value === null || value === undefined) return false;
        
        // Show "Anonymized" in filters for anonymized contacts
        if (isAnonymized && key !== "modifiedBy" && key !== "modifiedDate") {
          return "Anonymized".toLowerCase().includes(filters[key].toLowerCase());
        }
        
        return String(value).toLowerCase().includes(filters[key].toLowerCase());
      });
    });
  }, [filters, inactiveFilter, isContactAnonymized]);

  const handleRowClick = (contactId: number) => {
    setSelectedIds(new Set([contactId]));
  };

  const handleRowDoubleClick = (contactId: number) => {
    navigate(`/customer/contacts/${contactId}`);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-white border-t border-white">
      <div className="flex-1 overflow-auto relative overscroll-none">
        <table className="border-separate border-spacing-0 table-fixed w-max">
          <thead>
            {/* Main Header Labels */}
            <tr className="h-[30px] bg-[#595959]">
              {columns.map((col, headIdx) => (
                <th
                  key={col.id}
                  className={`${col.id === 'actions' ? 'p-0' : 'px-4'} ${headIdx !== columns.length - 1 ? "border-r" : ""} text-[#ffffff] font-medium uppercase tracking-wider sticky top-0 bg-[#595959] relative overflow-visible ${
                    col.id === "actions" ? "text-left text-[18px]" : "text-left text-[13px]"
                  } ${headIdx !== columns.length - 1 ? "border-r-white" : ""}`}
                  style={{ 
                    width: `${col.width}px`,
                    minWidth: `${col.width}px`,
                    left: col.sticky ? `${col.offset}px` : undefined,
                    zIndex: col.sticky ? 150 - headIdx : 50 - headIdx,
                    transform: col.sticky ? "translateZ(0)" : undefined,
                    WebkitTransform: col.sticky ? "translateZ(0)" : undefined,
                    willChange: col.sticky ? "transform, left" : undefined
                  }}
                >
                  <div className={`${col.id === 'actions' ? 'font-normal h-full w-full' : 'truncate'}`}>
                    {col.id === 'actions' ? (
                      <div className="w-full h-full flex items-center justify-start px-4 cursor-pointer">
                        <div className="w-[24px] flex items-center justify-center">
                          <span>{col.label}</span>
                        </div>
                      </div>
                    ) : col.label}
                  </div>
                </th>
              ))}
            </tr>

            {/* Filter Inputs Row */}
            <tr className="h-[45px] bg-[#F4F6F7]">
              {columns.map((col, filterIdx) => (
                <th
                  key={`filter-${col.id}`}
                  className={`px-[5px] ${filterIdx !== columns.length - 1 ? "border-r" : ""} border-b border-[#CCCCCC] sticky top-[30px] bg-[#F4F6F7] ${
                    col.sticky ? "z-60" : "z-40"
                  } ${filterIdx !== columns.length - 1 ? "border-r-white" : ""}`}
                  style={{ 
                    width: `${col.width}px`,
                    minWidth: `${col.width}px`,
                    left: col.sticky ? `${col.offset}px` : undefined,
                    transform: col.sticky ? "translateZ(0)" : undefined,
                    WebkitTransform: col.sticky ? "translateZ(0)" : undefined,
                    willChange: col.sticky ? "transform, left" : undefined
                  }}
                >
                  {col.id !== "actions" && (
                    <div className="flex items-center gap-1 h-full py-2">
                      <div className="relative flex-1">
                        {col.id === "inactive" ? (
                          <select
                            className="w-full h-[30px] bg-white border border-[#CCCCCC] px-2 text-[14px] focus:outline-none focus:border-2 focus:border-[#373737] text-[#1A1A1A] cursor-pointer"
                            value={inactiveFilter}
                            onChange={(e) => setInactiveFilter(e.target.value as InactiveFilter)}
                          >
                            <option value="all">All</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                          </select>
                        ) : (
                          <input
                            type="text"
                            className="selection:bg-[#373737] selection:text-white w-full h-[30px] bg-white border border-[#CCCCCC] px-2 text-[14px] focus:outline-none focus:border-2 focus:border-[#373737] text-[#1A1A1A]"
                            value={filters[col.id] || ""}
                            onKeyDown={(e) => {
                              if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'a') {
                                e.stopPropagation();
                                e.preventDefault();
                                const target = e.target as HTMLInputElement;
                                target.setSelectionRange(0, target.value.length);
                              }
                            }}
                            onFocus={(e) => {
                              const target = e.target;
                              setTimeout(() => {
                                (target as HTMLInputElement).setSelectionRange(0, (target as HTMLInputElement).value.length);
                              }, 0);
                            }}
                            onChange={(e) => setFilters({ ...filters, [col.id]: e.target.value })}
                          />
                        )}
                      </div>
                      {col.id !== "inactive" && (
                        <FilterMenu
                          isOpen={openMenuColumn === col.id}
                          onOpenChange={(open) => setOpenMenuColumn(open ? col.id : null)}
                          activeOption={filterModes[col.id] || "Contains"}
                          onOptionSelect={(option) => setFilterModes({ ...filterModes, [col.id]: option })}
                          trigger={
                            <button className="w-[30px] h-[30px] shrink-0 bg-white border border-[#CCCCCC] flex items-center justify-center transition-colors hover:bg-[#F7F7F7] cursor-pointer outline-none focus:outline-none">
                              <svg className="size-4" viewBox="0 0 20 20" fill="none">
                                <path d={svgPathsMain.p25e92080} fill="#3A3A3A" />
                              </svg>
                            </button>
                          }
                        />
                      )}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="select-none selection:bg-[#373737] selection:text-white">
            {filteredData.length === 0 ? (
              <tr className="h-[40px] bg-white">
                <td 
                  colSpan={columns.length} 
                  className="px-4 text-sm text-[#1A1A1A] border-b border-[#CCCCCC] text-center"
                >
                  No records available
                </td>
              </tr>
            ) : (
              filteredData.map((contact) => {
                const isSelected = selectedIds.has(contact.id);
                const isAnonymized = isContactAnonymized(contact.id);
                
                return (
                  <tr
                    key={contact.id}
                    onClick={() => handleRowClick(contact.id)}
                    onDoubleClick={() => handleRowDoubleClick(contact.id)}
                    className={`h-[40px] group ${
                      isSelected ? "bg-[#D2F6E8]" : "bg-white hover:bg-[#F7F7F7]"
                    }`}
                  >
                    {columns.map((col, colIdx) => (
                      <td
                        key={`${contact.id}-${col.id}`}
                        className={`px-4 text-sm text-[#1A1A1A] border-b ${isSelected ? "border-[#AFCDBF]" : "border-[#CCCCCC]"} ${
                          col.sticky ? "sticky z-20" : ""
                        } ${isSelected ? "bg-[#D2F6E8]" : "bg-white group-hover:bg-[#F7F7F7]"}`}
                        style={{ 
                          width: `${col.width}px`,
                          minWidth: `${col.width}px`,
                          left: col.sticky ? `${col.offset}px` : undefined,
                          transform: col.sticky ? "translateZ(0)" : undefined,
                          WebkitTransform: col.sticky ? "translateZ(0)" : undefined,
                          willChange: col.sticky ? "transform, left" : undefined
                        }}
                      >
                        {col.id === "actions" ? (
                          <div className="flex items-center justify-start">
                            {/* Action icon space */}
                          </div>
                        ) : col.id === "inactive" ? (
                          <div className="flex items-center justify-center">
                            <input
                              type="checkbox"
                              checked={isAnonymized}
                              readOnly
                              className="cursor-pointer"
                              onClick={(e) => e.stopPropagation()}
                            />
                          </div>
                        ) : col.id === "identityNumber" && !isAnonymized ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/customer/contacts/${contact.id}`);
                            }}
                            className="truncate block text-left border-b border-[#666] hover:border-[#1a1a1a] transition-colors cursor-pointer bg-transparent text-[14px] text-[#1a1a1a] p-0 hover:text-[#e58108]"
                          >
                            {contact[col.id as keyof typeof contact]}
                          </button>
                        ) : (
                          <span className="truncate block">
                            {isAnonymized && col.id !== "modifiedBy" && col.id !== "modifiedDate" 
                              ? "Anonymized" 
                              : contact[col.id as keyof typeof contact]}
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}