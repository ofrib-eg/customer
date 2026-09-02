import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { Plus } from "lucide-react";
import { SectionHeader } from "./sharedFields";

interface RelationshipsGridProps {
  isAnonymized?: boolean;
  onAddRelationship?: () => void;
}

interface RelationshipRow {
  id: number;
  relationshipType: string;
  identifier: string;
  name: string;
  connection: string;
  status: string;
}

const mockRelationships: RelationshipRow[] = [
  { id: 1, relationshipType: "Business customer", identifier: "44332211", name: "EG Retail Göteborg", connection: "x-store name", status: "Draft" },
  { id: 2, relationshipType: "Private customer", identifier: "11223300", name: "Melina Andersson", connection: "x-store name", status: "Active" },
  { id: 3, relationshipType: "Member", identifier: "11223300", name: "Melina Andersson", connection: "Loyalty program X", status: "Active" },
];

const columns = [
  { id: "relationshipType", label: "Relationship type", width: 200 },
  { id: "identifier", label: "Identifier", width: 150 },
  { id: "name", label: "Name", width: 220 },
  { id: "connection", label: "Connection", width: 220 },
  { id: "status", label: "Status", width: 120 },
];

export function RelationshipsGrid({ isAnonymized = false, onAddRelationship }: RelationshipsGridProps) {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const identifierToContactId: Record<string, number> = {
    '44332211': 2,
    '11223300': 1,
  };

  const filteredData = useMemo(() => {
    return mockRelationships.filter((row) =>
      columns.every((col) => {
        const filterValue = filters[col.id];
        if (!filterValue) return true;
        const cellValue = String(row[col.id as keyof RelationshipRow] ?? "").toLowerCase();
        return cellValue.includes(filterValue.toLowerCase());
      })
    );
  }, [filters]);

  const handleIdentifierClick = (identifier: string) => {
    const contactId = identifierToContactId[identifier];
    if (contactId) {
      navigate(`/customer/contacts/${contactId}`);
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden min-w-0 pt-[30px] pb-[20px] pl-[30px] pr-[30px] bg-white">
      <div className="flex items-center justify-between mb-[10px]">
        <SectionHeader className="">Relationships</SectionHeader>
        {onAddRelationship && (
          <button
            type="button"
            onClick={onAddRelationship}
            aria-label="Add relationship"
            className="size-[36px] rounded-full flex items-center justify-center hover:bg-[#f5f5f5] cursor-pointer shrink-0 transition-colors"
          >
            <Plus className="size-[16px] text-[#1a1a1a]" />
          </button>
        )}
      </div>
      <div className="flex-1 overflow-auto relative overscroll-none">
        <table className="border-separate border-spacing-0 table-fixed w-max">
          <thead>
            <tr className="h-[30px] bg-[#595959]">
              {columns.map((col) => (
                <th
                  key={col.id}
                  style={{ width: col.width, minWidth: col.width }}
                  className="text-left px-[10px] text-[#ffffff] text-[13px] font-medium uppercase tracking-wider sticky top-0 bg-[#595959] border-r border-white"
                >
                  {col.label}
                </th>
              ))}
            </tr>
            <tr className="h-[45px] bg-[#F4F6F7] sticky top-[30px]">
              {columns.map((col) => (
                <th key={col.id} style={{ width: col.width, minWidth: col.width }} className="px-[6px] bg-[#F4F6F7]">
                  <input
                    type="text"
                    value={filters[col.id] || ""}
                    onChange={(e) => setFilters((prev) => ({ ...prev, [col.id]: e.target.value }))}
                    className="w-full h-[30px] bg-white border border-[#CCCCCC] px-2 text-[14px] font-['Roboto:Regular',sans-serif] text-[#1a1a1a] outline-none focus:border-2 focus:border-[#373737]"
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row) => (
              <tr
                key={row.id}
                onClick={() => setSelectedId(row.id)}
                className={`h-[40px] group cursor-pointer ${selectedId === row.id ? "bg-[#D2F6E8]" : "bg-white hover:bg-[#F7F7F7]"}`}
              >
                <td className={`px-[12px] font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a] border-b ${selectedId === row.id ? "border-[#AFCDBF]" : "border-[#CCCCCC]"} ${selectedId === row.id ? "" : "group-hover:bg-[#F7F7F7]"}`}>
                  {row.relationshipType}
                </td>
                <td className={`px-[12px] font-['Roboto:Regular',sans-serif] text-[14px] border-b ${selectedId === row.id ? "border-[#AFCDBF]" : "border-[#CCCCCC]"} ${selectedId === row.id ? "" : "group-hover:bg-[#F7F7F7]"}`}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleIdentifierClick(row.identifier);
                    }}
                    className="text-[#1a1a1a] underline hover:text-[#e58108] cursor-pointer bg-transparent p-0 text-[14px] font-['Roboto:Regular',sans-serif]"
                  >
                    {isAnonymized && row.relationshipType !== "Business customer" ? "–" : row.identifier}
                  </button>
                </td>
                <td className={`px-[12px] font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a] border-b ${selectedId === row.id ? "border-[#AFCDBF]" : "border-[#CCCCCC]"} ${selectedId === row.id ? "" : "group-hover:bg-[#F7F7F7]"}`}>
                  {isAnonymized && row.relationshipType !== "Business customer" ? "–" : row.name}
                </td>
                <td className={`px-[12px] font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a] border-b ${selectedId === row.id ? "border-[#AFCDBF]" : "border-[#CCCCCC]"} ${selectedId === row.id ? "" : "group-hover:bg-[#F7F7F7]"}`}>
                  {row.connection}
                </td>
                <td className={`px-[12px] font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a] border-b ${selectedId === row.id ? "border-[#AFCDBF]" : "border-[#CCCCCC]"} ${selectedId === row.id ? "" : "group-hover:bg-[#F7F7F7]"}`}>
                  {row.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
