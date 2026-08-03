import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import svgPathsMain from "@/imports/svg-16ystvll8u";
import { FilterMenu } from "@/app/components/FilterMenu";
import { motion as Motion, AnimatePresence } from "motion/react";
import { Check, X } from "lucide-react";

export const mockCustomers = [
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

const defaultColumns = [
  { id: "actions", label: "+", width: 50, sticky: true },
  { id: "customerNumber", label: "CUSTOMER NUMBER", width: 140, sticky: true },
  { id: "extCustomerNumber", label: "EXT. CUSTOMER NUMBER", width: 200, sticky: true },
  { id: "customerName", label: "CUSTOMER NAME", width: 200, sticky: true },
  { id: "customerType", label: "CUSTOMER TYPE", width: 160 },
  { id: "store", label: "STORE", width: 100 },
  { id: "address", label: "ADDRESS", width: 180 },
  { id: "postalCode", label: "POSTAL CODE", width: 120 },
  { id: "orgNumber", label: "ORG. NUMBER", width: 140 },
  { id: "customerGroup", label: "CUSTOMER GROUP", width: 200 },
  { id: "inactive", label: "INACTIVE", width: 100 },
  { id: "creditC", label: "CREDIT C...", width: 100 },
  { id: "creditBalance", label: "CREDIT BALANCE", width: 140 },
  { id: "email", label: "EMAIL", width: 200 },
  { id: "phone", label: "PHONE", width: 140 },
];

export function CustomerGrid() {
  const navigate = useNavigate();
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [filterModes, setFilterModes] = useState<Record<string, string>>({});
  const [openMenuColumn, setOpenMenuColumn] = useState<string | null>(null);
  const [showDeleteToast, setShowDeleteToast] = useState(false);
  const [deletedCustomerIds, setDeletedCustomerIds] = useState<Set<number>>(() => {
    // Load deleted customer IDs from localStorage on mount
    const stored = localStorage.getItem('deletedCustomerIds');
    return stored ? new Set(JSON.parse(stored)) : new Set();
  });

  // Check for delete toast flag on mount
  React.useEffect(() => {
    const shouldShowToast = localStorage.getItem('showDeletedCustomerToast');
    if (shouldShowToast === 'true') {
      localStorage.removeItem('showDeletedCustomerToast');
      setShowDeleteToast(true);
      setTimeout(() => setShowDeleteToast(false), 5000);
    }
  }, []);

  // Listen for storage changes to update when a customer is deleted
  React.useEffect(() => {
    const handleStorageChange = () => {
      const stored = localStorage.getItem('deletedCustomerIds');
      setDeletedCustomerIds(stored ? new Set(JSON.parse(stored)) : new Set());
    };

    window.addEventListener('storage', handleStorageChange);
    // Also listen for custom event for same-tab updates
    window.addEventListener('customerDeleted', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('customerDeleted', handleStorageChange);
    };
  }, []);

  const lastStickyIndex = useMemo(() => {
    let last = -1;
    defaultColumns.forEach((col, idx) => {
      if (col.sticky) last = idx;
    });
    return last;
  }, []);

  const columns = useMemo(() => {
    let currentOffset = 0;
    return defaultColumns.map((col) => {
      const offset = col.sticky ? currentOffset : undefined;
      if (col.sticky) currentOffset += col.width;
      return { ...col, offset };
    });
  }, []);

  const filteredData = useMemo(() => {
    return mockCustomers
      .filter((customer) => !deletedCustomerIds.has(customer.id)) // Filter out deleted customers
      .filter((customer) => {
        return Object.keys(filters).every((key) => {
          if (!filters[key]) return true;
          const value = customer[key as keyof typeof customer];
          if (value === null || value === undefined) return false;
          return String(value).toLowerCase().includes(filters[key].toLowerCase());
        });
      });
  }, [filters, deletedCustomerIds]);

  const handleRowClick = (customerId: number) => {
    setSelectedIds(new Set([customerId]));
  };

  const handleRowDoubleClick = (customerId: number) => {
    navigate(`/customer/customer/${customerId}`);
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
                  } ${headIdx < lastStickyIndex ? "border-r-white" : headIdx === lastStickyIndex ? "border-r-[#CCCCCC]" : (headIdx !== columns.length - 1 ? "border-r-white" : "")}`}
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
                  } ${filterIdx < lastStickyIndex ? "border-r-white" : filterIdx === lastStickyIndex ? "border-r-[#CCCCCC]" : (filterIdx !== columns.length - 1 ? "border-r-white" : "")}`}
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
                            value={filters[col.id] || ""}
                            onChange={(e) => setFilters({ ...filters, [col.id]: e.target.value })}
                          >
                            <option value="">All</option>
                            <option value="false">Active</option>
                            <option value="true">Inactive</option>
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
              filteredData.map((customer) => {
                const isSelected = selectedIds.has(customer.id);
                
                return (
                  <tr
                    key={customer.id}
                    onClick={() => handleRowClick(customer.id)}
                    onDoubleClick={() => handleRowDoubleClick(customer.id)}
                    className={`h-[40px] group ${
                      isSelected ? "bg-[#D2F6E8]" : "bg-white hover:bg-[#F7F7F7]"
                    }`}
                  >
                    {columns.map((col, colIdx) => {
                      // Determine border-right class
                      let borderRightClass = "";
                      if (["actions", "customerNumber", "extCustomerNumber"].includes(col.id)) {
                        borderRightClass = "border-r-0";
                      } else if (col.sticky && colIdx < lastStickyIndex) {
                        borderRightClass = "border-r border-r-white";
                      } else if (colIdx === lastStickyIndex) {
                        borderRightClass = isSelected ? "border-r border-r-[#AFCDBF]" : "border-r border-r-[#CCCCCC]";
                      }
                      
                      return (
                        <td
                          key={`${customer.id}-${col.id}`}
                          className={`px-4 text-sm text-[#1A1A1A] border-b ${isSelected ? "border-[#AFCDBF]" : "border-[#CCCCCC]"} ${
                            col.sticky ? "sticky z-20" : ""
                          } ${isSelected ? "bg-[#D2F6E8]" : "bg-white group-hover:bg-[#F7F7F7]"} ${borderRightClass} ${
                            col.id === "customerNumber" ? "cursor-pointer" : ""
                          }`}
                          style={{ 
                            width: `${col.width}px`,
                            minWidth: `${col.width}px`,
                            left: col.sticky ? `${col.offset}px` : undefined,
                            transform: col.sticky ? "translateZ(0)" : undefined,
                            WebkitTransform: col.sticky ? "translateZ(0)" : undefined,
                            willChange: col.sticky ? "transform, left" : undefined
                          }}
                          onClick={(e) => {
                            if (col.id === "customerNumber") {
                              e.stopPropagation();
                              const targetPath = `/customer/customer/${customer.id}`;
                              console.log('Navigating to:', targetPath);
                              navigate(targetPath);
                            }
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
                                checked={customer.inactive}
                                readOnly
                                className="cursor-pointer"
                                onClick={(e) => e.stopPropagation()}
                              />
                            </div>
                          ) : col.id === "customerNumber" ? (
                            <span className="truncate block text-[#1c7862] hover:underline">{customer[col.id as keyof typeof customer]}</span>
                          ) : (
                            <span className="truncate block">{customer[col.id as keyof typeof customer]}</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Toast */}
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
    </div>
  );
}