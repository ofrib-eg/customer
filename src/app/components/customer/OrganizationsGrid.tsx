import React, { useState, useMemo, useRef, useCallback } from "react";
import { useNavigate } from "react-router";
import svgPathsMain from "@/imports/svg-16ystvll8u";
import { FilterMenu } from "@/app/components/FilterMenu";

export const mockOrganizations = [
  { 
    id: 1, 
    orgNumber: "556789-1234",
    organizationName: "TechCorp Solutions AB", 
    branchNumber: "–",
    country: "SE", 
    organizationType: "Parent", 
    source: "Dun & Bradstreet",
    b2bCustomers: 15,
    status: "Active"
  },
  { 
    id: 2, 
    orgNumber: "559876-5432",
    organizationName: "Nordic Retail Group", 
    branchNumber: "–",
    country: "SE", 
    organizationType: "Subsidiary", 
    source: "Manual",
    b2bCustomers: 32,
    status: "Active"
  },
  { 
    id: 3, 
    orgNumber: "551234-5678",
    organizationName: "Scandinavian Logistics AB", 
    branchNumber: "–",
    country: "SE", 
    organizationType: "Parent", 
    source: "Dun & Bradstreet",
    b2bCustomers: 8,
    status: "Active"
  },
  { 
    id: 4, 
    orgNumber: "923456789",
    organizationName: "Green Energy Partners", 
    branchNumber: "912345678",
    country: "NO", 
    organizationType: "Branch", 
    source: "Dun & Bradstreet",
    b2bCustomers: 21,
    status: "Active"
  },
  { 
    id: 5, 
    orgNumber: "12345678",
    organizationName: "Baltic Consulting Group", 
    branchNumber: "–",
    country: "DK", 
    organizationType: "Parent", 
    source: "Manual",
    b2bCustomers: 4,
    status: "Inactive"
  },
  { 
    id: 6, 
    orgNumber: "1234567-8",
    organizationName: "Nordic Manufacturing Ltd", 
    branchNumber: "–",
    country: "FI", 
    organizationType: "Subsidiary", 
    source: "Dun & Bradstreet",
    b2bCustomers: 52,
    status: "Active"
  },
  { 
    id: 7, 
    orgNumber: "556123-4567",
    organizationName: "Digital Solutions Nordic", 
    branchNumber: "–",
    country: "SE", 
    organizationType: "Parent", 
    source: "Manual",
    b2bCustomers: 9,
    status: "Active"
  },
  {
    id: 8,
    orgNumber: "559999-8888",
    organizationName: "Scandinavian Foods AB",
    branchNumber: "–",
    country: "SE",
    organizationType: "Branch",
    source: "Dun & Bradstreet",
    b2bCustomers: 18,
    status: "Active"
  },
  {
    id: 9,
    orgNumber: "968992600",
    organizationName: "EG Retail Trondheim",
    branchNumber: "9689926",
    country: "NO",
    organizationType: "Branch",
    source: "Manual",
    b2bCustomers: 1,
    status: "Active"
  },
];

const defaultColumns = [
  { id: "actions", label: "+", width: "50px", minWidth: 50, sticky: true },
  { id: "orgNumber", label: "ORG NUMBER", width: "160px", minWidth: 160, sticky: true },
  { id: "organizationName", label: "ORGANIZATION NAME", width: "1fr", minWidth: 200, sticky: true },
  { id: "organizationType", label: "ORGANIZATION TYPE", width: "180px", minWidth: 180 },
  { id: "branchNumber", label: "BRANCH NUMBER", width: "150px", minWidth: 150 },
  { id: "country", label: "COUNTRY", width: "100px", minWidth: 100 },
  { id: "source", label: "SOURCE", width: "120px", minWidth: 120 },
  { id: "b2bCustomers", label: "B2B CUSTOMERS", width: "140px", minWidth: 140 },
  { id: "status", label: "STATUS", width: "120px", minWidth: 120 },
];

export function OrganizationsGrid() {
  const navigate = useNavigate();
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [filterModes, setFilterModes] = useState<Record<string, string>>({});
  const [openMenuColumn, setOpenMenuColumn] = useState<string | null>(null);
  
  // State for resizable columns
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>(() => {
    const widths: Record<string, number> = {};
    defaultColumns.forEach(col => {
      widths[col.id] = col.minWidth;
    });
    return widths;
  });
  
  const [resizingColumn, setResizingColumn] = useState<string | null>(null);
  const [startX, setStartX] = useState<number>(0);
  const [startWidth, setStartWidth] = useState<number>(0);

  const handleResizeStart = useCallback((e: React.MouseEvent, columnId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setResizingColumn(columnId);
    setStartX(e.clientX);
    setStartWidth(columnWidths[columnId]);
  }, [columnWidths]);

  const handleResizeMove = useCallback((e: MouseEvent) => {
    if (!resizingColumn) return;
    
    const diff = e.clientX - startX;
    const column = defaultColumns.find(c => c.id === resizingColumn);
    if (!column) return;
    
    const newWidth = Math.max(column.minWidth, startWidth + diff);
    setColumnWidths(prev => ({
      ...prev,
      [resizingColumn]: newWidth
    }));
  }, [resizingColumn, startX, startWidth]);

  const handleResizeEnd = useCallback(() => {
    setResizingColumn(null);
  }, []);

  // Add and remove event listeners for resize
  React.useEffect(() => {
    if (resizingColumn) {
      document.addEventListener('mousemove', handleResizeMove);
      document.addEventListener('mouseup', handleResizeEnd);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
      
      return () => {
        document.removeEventListener('mousemove', handleResizeMove);
        document.removeEventListener('mouseup', handleResizeEnd);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      };
    }
  }, [resizingColumn, handleResizeMove, handleResizeEnd]);

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
      const width = columnWidths[col.id];
      const offset = col.sticky ? currentOffset : undefined;
      if (col.sticky) {
        currentOffset += width;
      }
      return { ...col, width, offset };
    });
  }, [columnWidths]);

  const filteredData = useMemo(() => {
    return mockOrganizations.filter((org) => {
      return Object.keys(filters).every((key) => {
        if (!filters[key]) return true;
        const value = org[key as keyof typeof org];
        if (value === null || value === undefined) return false;
        return String(value).toLowerCase().includes(filters[key].toLowerCase());
      });
    });
  }, [filters]);

  const handleRowClick = (orgId: number) => {
    setSelectedIds(new Set([orgId]));
  };

  const handleRowDoubleClick = (orgId: number) => {
    navigate(`/customer/organizations/${orgId}`);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-white border-t border-white">
      <div className="flex-1 overflow-auto relative overscroll-none">
        <table className="border-separate border-spacing-0 w-full" style={{ 
          tableLayout: 'fixed',
          minWidth: '1220px' // sum of minWidths
        }}>
          <colgroup>
            {columns.map((col) => (
              <col key={col.id} style={{ width: col.width }} />
            ))}
          </colgroup>

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
                    minWidth: `${col.minWidth}px`,
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
                  {/* Resize handle */}
                  {headIdx < columns.length - 1 && (
                    <div
                      className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-[#ffffff40] z-[200]"
                      onMouseDown={(e) => handleResizeStart(e, col.id)}
                      style={{
                        userSelect: 'none'
                      }}
                    />
                  )}
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
                    minWidth: `${col.minWidth}px`,
                    left: col.sticky ? `${col.offset}px` : undefined,
                    transform: col.sticky ? "translateZ(0)" : undefined,
                    WebkitTransform: col.sticky ? "translateZ(0)" : undefined,
                    willChange: col.sticky ? "transform, left" : undefined
                  }}
                >
                  {col.id !== "actions" && (
                    <div className="flex items-center gap-1 h-full py-2">
                      <div className="relative flex-1">
                        {col.id === "status" ? (
                          <select
                            className="w-full h-[30px] bg-white border border-[#CCCCCC] px-2 text-[14px] focus:outline-none focus:border-2 focus:border-[#373737] text-[#1A1A1A] cursor-pointer"
                            value={filters[col.id] || ""}
                            onChange={(e) => setFilters({ ...filters, [col.id]: e.target.value })}
                          >
                            <option value="">All</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                          </select>
                        ) : col.id === "source" ? (
                          <select
                            className="w-full h-[30px] bg-white border border-[#CCCCCC] px-2 text-[14px] focus:outline-none focus:border-2 focus:border-[#373737] text-[#1A1A1A] cursor-pointer"
                            value={filters[col.id] || ""}
                            onChange={(e) => setFilters({ ...filters, [col.id]: e.target.value })}
                          >
                            <option value="">All</option>
                            <option value="Dun & Bradstreet">Dun & Bradstreet</option>
                            <option value="Manual">Manual</option>
                          </select>
                        ) : col.id === "organizationType" ? (
                          <select
                            className="w-full h-[30px] bg-white border border-[#CCCCCC] px-2 text-[14px] focus:outline-none focus:border-2 focus:border-[#373737] text-[#1A1A1A] cursor-pointer"
                            value={filters[col.id] || ""}
                            onChange={(e) => setFilters({ ...filters, [col.id]: e.target.value })}
                          >
                            <option value="">All</option>
                            <option value="Parent">Parent</option>
                            <option value="Subsidiary">Subsidiary</option>
                            <option value="Branch">Branch</option>
                          </select>
                        ) : col.id === "country" ? (
                          <select
                            className="w-full h-[30px] bg-white border border-[#CCCCCC] px-2 text-[14px] focus:outline-none focus:border-2 focus:border-[#373737] text-[#1A1A1A] cursor-pointer"
                            value={filters[col.id] || ""}
                            onChange={(e) => setFilters({ ...filters, [col.id]: e.target.value })}
                          >
                            <option value="">All</option>
                            <option value="SE">SE</option>
                            <option value="NO">NO</option>
                            <option value="DK">DK</option>
                            <option value="FI">FI</option>
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
                      {!["status", "source", "organizationType", "country"].includes(col.id) && (
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
              filteredData.map((org) => {
                const isSelected = selectedIds.has(org.id);
                
                return (
                  <tr
                    key={org.id}
                    onClick={() => handleRowClick(org.id)}
                    onDoubleClick={() => handleRowDoubleClick(org.id)}
                    className={`h-[40px] group ${
                      isSelected ? "bg-[#D2F6E8]" : "bg-white hover:bg-[#F7F7F7]"
                    }`}
                  >
                    {columns.map((col, colIdx) => {
                      // Determine border-right class
                      let borderRightClass = "";
                      if (["actions", "orgNumber"].includes(col.id)) {
                        borderRightClass = "border-r-0";
                      } else if (col.sticky && colIdx < lastStickyIndex) {
                        borderRightClass = "border-r border-r-white";
                      } else if (colIdx === lastStickyIndex) {
                        borderRightClass = isSelected ? "border-r border-r-[#AFCDBF]" : "border-r border-r-[#CCCCCC]";
                      }
                      
                      return (
                        <td
                          key={`${org.id}-${col.id}`}
                          className={`px-4 text-sm text-[#1A1A1A] border-b ${isSelected ? "border-[#AFCDBF]" : "border-[#CCCCCC]"} ${
                            col.sticky ? "sticky z-20" : ""
                          } ${isSelected ? "bg-[#D2F6E8]" : "bg-white group-hover:bg-[#F7F7F7]"} ${borderRightClass} ${
                            ["orgNumber", "b2bCustomers"].includes(col.id) ? "cursor-pointer" : ""
                          }`}
                          style={{ 
                            width: `${col.width}px`,
                            minWidth: `${col.minWidth}px`,
                            left: col.sticky ? `${col.offset}px` : undefined,
                            transform: col.sticky ? "translateZ(0)" : undefined,
                            WebkitTransform: col.sticky ? "translateZ(0)" : undefined,
                            willChange: col.sticky ? "transform, left" : undefined
                          }}
                          onClick={(e) => {
                            if (col.id === "orgNumber") {
                              e.stopPropagation();
                              const targetPath = `/customer/organizations/${org.id}`;
                              navigate(targetPath);
                            } else if (col.id === "b2bCustomers") {
                              e.stopPropagation();
                              // Navigate to customers filtered by this organization
                              console.log('Navigating to customers for org:', org.id);
                            }
                          }}
                        >
                          {col.id === "actions" ? (
                            <div className="flex items-center justify-start">
                              {/* Action icon space */}
                            </div>
                          ) : col.id === "orgNumber" ? (
                            <span className="truncate block hover:underline cursor-pointer">{org.orgNumber}</span>
                          ) : col.id === "b2bCustomers" ? (
                            <span className="truncate block hover:underline cursor-pointer">{org.b2bCustomers}</span>
                          ) : (
                            <span className="truncate block">{org[col.id as keyof typeof org]}</span>
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
    </div>
  );
}