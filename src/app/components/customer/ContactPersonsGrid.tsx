import React from "react";
import svgPaths from "../../../imports/svg-uks517y0el";
import imgCheckbox from "figma:asset/898d19ffff6bfdba80f8fefc8d425930bb2656d8.png";
import imgCheckboxUnchecked from "figma:asset/74bd78976a668e1cc61b38017d679dff360ace45.png";
import { Search, Plus, Maximize2, Minimize2 } from "lucide-react";
import { AddContactPersonModal } from "./AddContactPersonModal";
import { LinkedContact } from "./contactTypes";

interface ContactPerson {
  id: string;
  name: string;
  identifier: string;
  email: string;
  phoneNumber: string;
  status: string;
  isMainContact: boolean;
  customerCard: string;
}

const mockContacts: ContactPerson[] = [
  {
    id: "1",
    name: "Olivia Friberg",
    identifier: "11223344",
    email: "ofrib@eg.se",
    phoneNumber: "+46 707257076",
    status: "Active",
    isMainContact: true,
    customerCard: "0000000010",
  },
  {
    id: "2",
    name: "Adrian Finnager",
    identifier: "44332211",
    email: "adfin@eg.no",
    phoneNumber: "+47 673578962",
    status: "Active",
    isMainContact: false,
    customerCard: "0000000011",
  },
  {
    id: "3",
    name: "Emma Dahlgren",
    identifier: "00112233",
    email: "emdah@eg.se",
    phoneNumber: "+46 707257076",
    status: "Inactive",
    isMainContact: false,
    customerCard: "0000000012",
  },
  {
    id: "4",
    name: "Sara Börjesson",
    identifier: "11223300",
    email: "sabor@eg.se",
    phoneNumber: "+46 707257076",
    status: "Active",
    isMainContact: false,
    customerCard: "0000000013",
  },
];

type FilterType = "text" | "status" | "checkbox";

interface ColumnDef {
  id: string;
  label: string;
  minWidth: number;
  filterType: FilterType;
  linkStyle?: boolean;
  grow?: boolean;
  growWeight?: number;
  cell: (contact: ContactPerson) => React.ReactNode;
}

const COLUMN_DEFS: Record<string, ColumnDef> = {
  name: { id: "name", label: "Name", minWidth: 70, filterType: "text", grow: true, cell: (c) => c.name },
  identifier: { id: "identifier", label: "Identifier", minWidth: 60, filterType: "text", linkStyle: true, grow: true, cell: (c) => c.identifier },
  email: { id: "email", label: "Email", minWidth: 70, filterType: "text", grow: true, cell: (c) => c.email },
  phone: { id: "phone", label: "Phone number", minWidth: 70, filterType: "text", grow: true, cell: (c) => c.phoneNumber },
  status: { id: "status", label: "Status", minWidth: 45, filterType: "status", grow: true, cell: (c) => c.status },
  mainContact: { id: "mainContact", label: "Main contact", minWidth: 65, filterType: "checkbox", cell: (c) => c.isMainContact as unknown as React.ReactNode },
  customerCard: { id: "customerCard", label: "Customer card", minWidth: 55, filterType: "text", linkStyle: true, grow: true, growWeight: 0.5, cell: (c) => c.customerCard }
};

const DEFAULT_COLUMN_ORDER = ["name", "identifier", "email", "phone", "status", "mainContact", "customerCard"];

const DEFAULT_COLUMN_WIDTHS: Record<string, number> = {
  name: 80,
  identifier: 70,
  email: 80,
  phone: 80,
  status: 55,
  mainContact: 75,
  customerCard: 60
};

const ACTIONS_COLUMN_WIDTH = 48;

function ColumnBlock({
  column,
  style,
  contacts,
  selectedRow,
  onSelectRow,
  isDragOver,
  onDragStart,
  onDragOver,
  onDragLeave,
  onDrop,
  onDragEnd,
  onResizeStart
}: {
  column: ColumnDef;
  style: React.CSSProperties;
  contacts: ContactPerson[];
  selectedRow: string | null;
  onSelectRow: (id: string) => void;
  isDragOver: boolean;
  onDragStart: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onDragEnd: () => void;
  onResizeStart: (e: React.MouseEvent) => void;
}) {
  return (
    <div className="flex flex-col relative" style={style}>
      {/* Header */}
      <div
        draggable
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onDragEnd={onDragEnd}
        className={`h-[28px] overflow-clip relative flex items-center px-[10px] cursor-grab active:cursor-grabbing select-none ${
          isDragOver ? "bg-[#3d3d3d]" : "bg-[#595959]"
        }`}
      >
        <p className="font-['Roboto:Bold',sans-serif] leading-[normal] not-italic text-[13px] text-white uppercase truncate">
          {column.label}
        </p>
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_-1px_0px_0px_0px_white]" />
      </div>

      {/* Resize handle - spans the whole column height */}
      <div
        onMouseDown={onResizeStart}
        draggable={false}
        className="absolute right-0 top-0 bottom-0 w-[6px] cursor-col-resize hover:bg-[#e58108]/50 z-10"
      />

      {/* Filter Row */}
      <div className="bg-[#f4f6f7] h-[45px] overflow-clip relative flex items-center px-[6px] gap-[6px]">
        {column.filterType === "checkbox" ? (
          <div className="bg-white border border-[#ccc] size-[30px] flex items-center justify-center shrink-0">
            <div className="size-[20px] relative">
              <div className="absolute bg-white inset-[10%]" />
              <div className="absolute inset-0 mix-blend-multiply">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img alt="" className="absolute h-[130%] left-[-15%] max-w-none top-[-15%] w-[135%]" src={imgCheckboxUnchecked} />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <input
              type="text"
              className="flex-1 min-w-0 bg-white border border-[#ccc] h-[30px] px-[10px] text-[14px] font-['Roboto:Regular',sans-serif]"
            />
            <button className="bg-white border border-[#ccc] size-[30px] flex items-center justify-center shrink-0">
              {column.filterType === "status" ? (
                <svg className="size-[20px]" fill="none" viewBox="0 0 20 20">
                  <g>
                    <mask height="4" id={`mask-filter-${column.id}`} maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="8" x="6" y="8">
                      <path d="M14 8L10 12L6 8H14Z" fill="var(--fill-0, #666666)" />
                    </mask>
                    <g mask={`url(#mask-filter-${column.id})`}>
                      <rect fill="var(--fill-0, #666666)" height="20" width="20" />
                    </g>
                  </g>
                </svg>
              ) : (
                <Search className="size-[16px] text-[#1a1a1a]" />
              )}
            </button>
          </>
        )}
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_2px_0px_0px_white,inset_-1px_0px_0px_0px_white]" />
      </div>

      {/* Rows */}
      {contacts.map((contact) => (
        <div
          key={contact.id}
          onClick={() => onSelectRow(contact.id)}
          className={`h-[43px] overflow-clip relative cursor-pointer ${selectedRow === contact.id ? "bg-[#e8ecee]" : "bg-white"}`}
        >
          {column.id === "mainContact" ? (
            <div className="-translate-y-1/2 absolute left-[10px] size-[20px] top-[calc(50%+0.5px)]">
              <div className="absolute bg-white inset-[10%]" />
              <div className="absolute inset-0 mix-blend-multiply">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img
                    alt=""
                    className="absolute h-[130%] left-[-15%] max-w-none top-[-15%] w-[135%]"
                    src={contact.isMainContact ? imgCheckbox : imgCheckboxUnchecked}
                  />
                </div>
              </div>
            </div>
          ) : column.linkStyle ? (
            <div className="absolute bg-[rgba(255,255,255,0.01)] content-stretch flex items-start left-[12px] max-w-[calc(100%-24px)] pb-px top-[13px] overflow-hidden">
              <div className="flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] whitespace-nowrap max-w-full overflow-hidden">
                <p className="leading-[normal] truncate">{column.cell(contact)}</p>
              </div>
              <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#666]" />
            </div>
          ) : (
            <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] left-[12px] right-[12px] not-italic text-[#1a1a1a] text-[14px] top-1/2 whitespace-nowrap overflow-hidden">
              <p className="leading-[normal] truncate">{column.cell(contact)}</p>
            </div>
          )}
          <div
            className={`absolute inset-0 pointer-events-none rounded-[inherit] ${
              selectedRow === contact.id
                ? "shadow-[inset_0px_-1px_0px_0px_#b3b3b3,inset_0px_1px_0px_0px_#b3b3b3]"
                : "shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]"
            }`}
          />
        </div>
      ))}
    </div>
  );
}

export function ContactPersonsGrid({ isExpanded, onToggleExpand }: { isExpanded: boolean; onToggleExpand: () => void }) {
  const [selectedRow, setSelectedRow] = React.useState<string | null>("2");
  const [contacts, setContacts] = React.useState<ContactPerson[]>(mockContacts);
  const [isAddContactOpen, setIsAddContactOpen] = React.useState(false);
  const [columnOrder, setColumnOrder] = React.useState<string[]>(DEFAULT_COLUMN_ORDER);
  const [columnWidths, setColumnWidths] = React.useState<Record<string, number>>(DEFAULT_COLUMN_WIDTHS);
  const [manuallyResized, setManuallyResized] = React.useState<Record<string, boolean>>({});
  const [dragOverColumnId, setDragOverColumnId] = React.useState<string | null>(null);

  const dragColumnIdRef = React.useRef<string | null>(null);
  const resizingRef = React.useRef<{ id: string; startX: number; startWidth: number } | null>(null);

  const handleAddContact = (contact: LinkedContact) => {
    setContacts((prev) => [
      ...prev,
      {
        id: String(contact.id),
        name: `${contact.firstName} ${contact.lastName}`,
        identifier: contact.identityNumber,
        email: contact.email,
        phoneNumber: contact.phoneNumber,
        status: "Active",
        isMainContact: false,
        customerCard: ""
      }
    ]);
  };

  const handleResizeMove = React.useCallback((e: MouseEvent) => {
    const state = resizingRef.current;
    if (!state) return;
    const delta = e.clientX - state.startX;
    const minWidth = COLUMN_DEFS[state.id]?.minWidth ?? 60;
    const newWidth = Math.max(minWidth, state.startWidth + delta);
    setColumnWidths((prev) => ({ ...prev, [state.id]: newWidth }));
  }, []);

  const handleResizeEnd = React.useCallback(() => {
    resizingRef.current = null;
    window.removeEventListener("mousemove", handleResizeMove);
    window.removeEventListener("mouseup", handleResizeEnd);
  }, [handleResizeMove]);

  const makeResizeStartHandler = (columnId: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setManuallyResized((prev) => ({ ...prev, [columnId]: true }));
    resizingRef.current = { id: columnId, startX: e.clientX, startWidth: columnWidths[columnId] };
    window.addEventListener("mousemove", handleResizeMove);
    window.addEventListener("mouseup", handleResizeEnd);
  };

  const getColumnStyle = (column: ColumnDef): React.CSSProperties => {
    const width = columnWidths[column.id] ?? column.minWidth;
    if (column.grow && !manuallyResized[column.id]) {
      return { flex: `${column.growWeight ?? 1} 1 ${width}px`, minWidth: column.minWidth };
    }
    return { flex: `0 0 ${width}px`, minWidth: column.minWidth };
  };

  const makeDragStartHandler = (columnId: string) => (e: React.DragEvent) => {
    dragColumnIdRef.current = columnId;
    e.dataTransfer.effectAllowed = "move";
  };

  const makeDragOverHandler = (columnId: string) => (e: React.DragEvent) => {
    e.preventDefault();
    if (dragColumnIdRef.current && dragColumnIdRef.current !== columnId) {
      setDragOverColumnId(columnId);
    }
  };

  const handleDragLeave = () => setDragOverColumnId(null);

  const makeDropHandler = (columnId: string) => (e: React.DragEvent) => {
    e.preventDefault();
    const sourceId = dragColumnIdRef.current;
    dragColumnIdRef.current = null;
    setDragOverColumnId(null);
    if (!sourceId || sourceId === columnId) return;
    setColumnOrder((prev) => {
      const next = prev.filter((id) => id !== sourceId);
      const targetIndex = next.indexOf(columnId);
      next.splice(targetIndex, 0, sourceId);
      return next;
    });
  };

  const handleDragEnd = () => {
    dragColumnIdRef.current = null;
    setDragOverColumnId(null);
  };

  return (
    <div className="flex flex-col gap-[15px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-['Roboto_Condensed',sans-serif] font-bold text-[16px] leading-[19px] tracking-[0px] text-[#1a1a1a] uppercase">
          Contact person(s)
        </h3>
        <div className="flex items-center gap-[8px]">
          <button
            type="button"
            onClick={() => setIsAddContactOpen(true)}
            aria-label="Add contact person"
            className="h-[36px] px-[16px] rounded-full border border-[#ccc] flex items-center gap-[8px] hover:bg-[#f5f5f5] cursor-pointer shrink-0"
          >
            <Plus className="size-[16px] text-[#1a1a1a]" />
            <span className="font-['Roboto_Condensed:Bold',sans-serif] text-[15px] text-[#1a1a1a] whitespace-nowrap">
              Add contact
            </span>
          </button>
          <button
            type="button"
            onClick={onToggleExpand}
            aria-label={isExpanded ? "Collapse table" : "Expand table"}
            className="size-[36px] rounded-full flex items-center justify-center hover:bg-[#f5f5f5] cursor-pointer shrink-0 transition-colors"
          >
            {isExpanded ? (
              <Minimize2 className="size-[16px] text-[#1a1a1a]" />
            ) : (
              <Maximize2 className="size-[16px] text-[#1a1a1a]" />
            )}
          </button>
        </div>
      </div>

      <AddContactPersonModal
        isOpen={isAddContactOpen}
        onClose={() => setIsAddContactOpen(false)}
        onAdd={handleAddContact}
      />

      {/* Table */}
      <div className="overflow-auto w-full">
        <div className="flex min-w-full w-full">
          {/* Actions Column - pinned, not resizable/draggable */}
          <div className="flex flex-col shrink-0" style={{ width: ACTIONS_COLUMN_WIDTH }}>
            {/* Header */}
            <div className="bg-[#595959] h-[28px] overflow-clip relative">
              <div className="-translate-y-1/2 absolute bg-white h-[10px] right-[16px] top-[calc(50%+2px)] w-[2px]" />
              <div className="-translate-y-1/2 absolute bg-white h-[2px] right-[12px] top-[calc(50%+2px)] w-[10px]" />
              <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_-1px_0px_0px_0px_white]" />
            </div>

            {/* Filter Row */}
            <div className="bg-[#f4f6f7] h-[45px] relative">
              <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_2px_0px_0px_white,inset_-1px_0px_0px_0px_white]" />
            </div>

            {/* Rows */}
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className={`h-[43px] overflow-clip relative ${
                  selectedRow === contact.id ? "bg-[#e8ecee]" : "bg-white"
                }`}
              >
                {selectedRow === contact.id && (
                  <div className="-translate-y-1/2 absolute right-[20px] size-[20px] top-[calc(50%+0.5px)]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                      <g>
                        <mask height="4" id={`mask-${contact.id}`} maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="16" x="2" y="8">
                          <path d={svgPaths.p2d3e5d00} fill="var(--fill-0, #666666)" />
                        </mask>
                        <g mask={`url(#mask-${contact.id})`}>
                          <rect fill="var(--fill-0, #666666)" height="20" width="20" />
                        </g>
                      </g>
                    </svg>
                  </div>
                )}
                <div
                  className={`absolute inset-0 pointer-events-none rounded-[inherit] ${
                    selectedRow === contact.id
                      ? "shadow-[inset_0px_-1px_0px_0px_#b3b3b3,inset_0px_1px_0px_0px_#b3b3b3]"
                      : "shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]"
                  }`}
                />
              </div>
            ))}
          </div>

          {columnOrder.map((columnId) => {
            const column = COLUMN_DEFS[columnId];
            if (!column) return null;
            return (
              <ColumnBlock
                key={column.id}
                column={column}
                style={getColumnStyle(column)}
                contacts={contacts}
                selectedRow={selectedRow}
                onSelectRow={setSelectedRow}
                isDragOver={dragOverColumnId === column.id}
                onDragStart={makeDragStartHandler(column.id)}
                onDragOver={makeDragOverHandler(column.id)}
                onDragLeave={handleDragLeave}
                onDrop={makeDropHandler(column.id)}
                onDragEnd={handleDragEnd}
                onResizeStart={makeResizeStartHandler(column.id)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
