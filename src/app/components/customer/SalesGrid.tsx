import React from "react";
import * as Popover from "@radix-ui/react-popover";
import { ChevronDown } from "lucide-react";
import svgPathsMain from "@/imports/svg-16ystvll8u";
import { FilterMenu } from "@/app/components/FilterMenu";
import { Calendar } from "../ui/calendar";
import { mockReceipts, Receipt, PaymentType } from "./salesTypes";
import { ReceiptDrawer } from "./ReceiptDrawer";

const PAYMENT_TYPE_OPTIONS: PaymentType[] = ["Cash", "Bank card", "Credit"];

function getColumns(isBusiness: boolean) {
  return [
    { id: "storeNumber", label: "Store number", width: 130 },
    { id: "storeName", label: "Store name", width: 200 },
    { id: "receiptDate", label: "Receipt date", width: 160 },
    { id: "receiptNumber", label: "Receipt number", width: 180 },
    { id: "amount", label: "Amount", width: 130 },
    { id: "paymentType", label: "Payment type", width: 160 },
    ...(isBusiness
      ? [
          { id: "contactName", label: "Contact name", width: 180 },
          { id: "contactIdentifier", label: "Identifier", width: 140 }
        ]
      : [])
  ];
}

function PaymentTypeFilter({
  selected,
  onChange
}: {
  selected: PaymentType[];
  onChange: (next: PaymentType[]) => void;
}) {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggle = (type: PaymentType) => {
    onChange(selected.includes(type) ? selected.filter((t) => t !== type) : [...selected, type]);
  };

  return (
    <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger asChild>
        <button
          type="button"
          className="w-full h-[30px] bg-white border border-[#CCCCCC] px-[10px] flex items-center justify-between text-[14px] font-['Roboto:Regular',sans-serif] text-[#1A1A1A] cursor-pointer"
        >
          <span className="truncate">{selected.length === 0 ? "All" : selected.join(", ")}</span>
          <ChevronDown className="size-[14px] text-[#666] shrink-0" />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content align="start" sideOffset={4} className="z-[3000] bg-white border border-[#CCCCCC] shadow-lg min-w-[160px] outline-none">
          <div className="flex flex-col py-1">
            {PAYMENT_TYPE_OPTIONS.map((type) => (
              <label
                key={type}
                className="flex items-center gap-[8px] px-[12px] h-[36px] cursor-pointer hover:bg-[#EAEAEA]"
              >
                <input
                  type="checkbox"
                  checked={selected.includes(type)}
                  onChange={() => toggle(type)}
                  className="size-[14px] cursor-pointer accent-[#1a1a1a]"
                />
                <span className="text-[14px] font-['Roboto:Regular',sans-serif] text-[#1A1A1A]">{type}</span>
              </label>
            ))}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

function DateFilter({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const selectedDate = value ? new Date(value) : undefined;

  return (
    <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger asChild>
        <button
          type="button"
          className="w-full h-[30px] bg-white border border-[#CCCCCC] px-[10px] flex items-center justify-between text-[14px] font-['Roboto:Regular',sans-serif] text-[#1A1A1A] cursor-pointer"
        >
          <span className="truncate">{value || "All"}</span>
          <ChevronDown className="size-[14px] text-[#666] shrink-0" />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content align="start" sideOffset={4} className="z-[3000] bg-white border border-[#CCCCCC] shadow-lg outline-none">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => {
              onChange(date ? date.toISOString().slice(0, 10) : "");
              setIsOpen(false);
            }}
          />
          {value && (
            <div className="border-t border-[#e5e5e5] p-[8px]">
              <button
                type="button"
                onClick={() => {
                  onChange("");
                  setIsOpen(false);
                }}
                className="w-full h-[30px] text-[13px] font-['Roboto_Condensed:SemiBold',sans-serif] uppercase text-[#1a1a1a] hover:bg-[#f5f5f5] cursor-pointer"
              >
                Clear
              </button>
            </div>
          )}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export function SalesGrid({ isBusiness = false }: { isBusiness?: boolean }) {
  const [storeNumberFilter, setStoreNumberFilter] = React.useState("");
  const [storeNameFilter, setStoreNameFilter] = React.useState("");
  const [dateFilter, setDateFilter] = React.useState("");
  const [receiptNumberFilter, setReceiptNumberFilter] = React.useState("");
  const [amountFilter, setAmountFilter] = React.useState("");
  const [paymentTypeFilter, setPaymentTypeFilter] = React.useState<PaymentType[]>([]);
  const [contactNameFilter, setContactNameFilter] = React.useState("");
  const [contactIdentifierFilter, setContactIdentifierFilter] = React.useState("");
  const [selectedReceipt, setSelectedReceipt] = React.useState<Receipt | null>(null);
  const [filterModes, setFilterModes] = React.useState<Record<string, string>>({});
  const [openMenuColumn, setOpenMenuColumn] = React.useState<string | null>(null);

  const columns = React.useMemo(() => getColumns(isBusiness), [isBusiness]);

  const matchesFilterMode = (value: string, filterValue: string, mode: string) => {
    const v = value.toLowerCase();
    const f = filterValue.toLowerCase();
    if (mode === "Is equal to") return v === f;
    if (mode === "Starts with") return v.startsWith(f);
    return v.includes(f);
  };

  const filteredReceipts = React.useMemo(() => {
    return mockReceipts.filter((receipt) => {
      if (storeNumberFilter && !matchesFilterMode(receipt.storeNumber, storeNumberFilter, filterModes.storeNumber || "Contains")) return false;
      if (storeNameFilter && !matchesFilterMode(receipt.storeName, storeNameFilter, filterModes.storeName || "Contains")) return false;
      if (dateFilter && receipt.receiptDate !== dateFilter) return false;
      if (receiptNumberFilter && !matchesFilterMode(receipt.receiptNumber, receiptNumberFilter, filterModes.receiptNumber || "Contains")) return false;
      if (amountFilter && !matchesFilterMode(receipt.total.toFixed(2), amountFilter, filterModes.amount || "Contains")) return false;
      if (paymentTypeFilter.length > 0 && !paymentTypeFilter.includes(receipt.paymentType)) return false;
      if (contactNameFilter && !matchesFilterMode(receipt.contactName || "", contactNameFilter, filterModes.contactName || "Contains")) return false;
      if (contactIdentifierFilter && !matchesFilterMode(receipt.contactIdentifier || "", contactIdentifierFilter, filterModes.contactIdentifier || "Contains")) return false;
      return true;
    });
  }, [storeNumberFilter, storeNameFilter, dateFilter, receiptNumberFilter, amountFilter, paymentTypeFilter, contactNameFilter, contactIdentifierFilter, filterModes]);

  return (
    <div className="flex-1 flex overflow-hidden min-h-0">
      <div className="flex-1 flex flex-col overflow-hidden bg-white border-t border-white">
        <div className="flex-1 overflow-auto relative overscroll-none">
          <table className="border-separate border-spacing-0 table-fixed w-max">
          <thead>
            <tr className="h-[30px] bg-[#595959]">
              {columns.map((col, idx) => (
                <th
                  key={col.id}
                  className={`px-4 text-left text-[13px] text-white font-medium uppercase tracking-wider sticky top-0 bg-[#595959] ${
                    idx !== columns.length - 1 ? "border-r border-r-white" : ""
                  }`}
                  style={{ width: col.width, minWidth: col.width }}
                >
                  <div className="truncate">{col.label}</div>
                </th>
              ))}
            </tr>
            <tr className="h-[45px] bg-[#F4F6F7]">
              {columns.map((col, idx) => (
                <th
                  key={`filter-${col.id}`}
                  className={`px-[5px] border-b border-[#CCCCCC] sticky top-[30px] bg-[#F4F6F7] ${
                    idx !== columns.length - 1 ? "border-r border-r-white" : ""
                  }`}
                  style={{ width: col.width, minWidth: col.width }}
                >
                  {col.id === "storeNumber" ? (
                    <div className="flex items-center gap-1 h-full">
                      <input
                        type="number"
                        value={storeNumberFilter}
                        onChange={(e) => setStoreNumberFilter(e.target.value)}
                        className="flex-1 h-[30px] bg-white border border-[#CCCCCC] px-2 text-[14px] focus:outline-none focus:border-2 focus:border-[#373737] text-[#1A1A1A]"
                      />
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
                    </div>
                  ) : col.id === "storeName" ? (
                    <div className="flex items-center gap-1 h-full">
                      <input
                        type="text"
                        value={storeNameFilter}
                        onChange={(e) => setStoreNameFilter(e.target.value)}
                        className="flex-1 h-[30px] bg-white border border-[#CCCCCC] px-2 text-[14px] focus:outline-none focus:border-2 focus:border-[#373737] text-[#1A1A1A]"
                      />
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
                    </div>
                  ) : col.id === "receiptDate" ? (
                    <DateFilter value={dateFilter} onChange={setDateFilter} />
                  ) : col.id === "receiptNumber" ? (
                    <div className="flex items-center gap-1 h-full">
                      <input
                        type="text"
                        value={receiptNumberFilter}
                        onChange={(e) => setReceiptNumberFilter(e.target.value)}
                        className="flex-1 h-[30px] bg-white border border-[#CCCCCC] px-2 text-[14px] focus:outline-none focus:border-2 focus:border-[#373737] text-[#1A1A1A]"
                      />
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
                    </div>
                  ) : col.id === "amount" ? (
                    <div className="flex items-center gap-1 h-full">
                      <input
                        type="text"
                        value={amountFilter}
                        onChange={(e) => setAmountFilter(e.target.value)}
                        className="flex-1 h-[30px] bg-white border border-[#CCCCCC] px-2 text-[14px] focus:outline-none focus:border-2 focus:border-[#373737] text-[#1A1A1A]"
                      />
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
                    </div>
                  ) : col.id === "paymentType" ? (
                    <PaymentTypeFilter selected={paymentTypeFilter} onChange={setPaymentTypeFilter} />
                  ) : col.id === "contactName" ? (
                    <div className="flex items-center gap-1 h-full">
                      <input
                        type="text"
                        value={contactNameFilter}
                        onChange={(e) => setContactNameFilter(e.target.value)}
                        className="flex-1 h-[30px] bg-white border border-[#CCCCCC] px-2 text-[14px] focus:outline-none focus:border-2 focus:border-[#373737] text-[#1A1A1A]"
                      />
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
                    </div>
                  ) : col.id === "contactIdentifier" ? (
                    <div className="flex items-center gap-1 h-full">
                      <input
                        type="text"
                        value={contactIdentifierFilter}
                        onChange={(e) => setContactIdentifierFilter(e.target.value)}
                        className="flex-1 h-[30px] bg-white border border-[#CCCCCC] px-2 text-[14px] focus:outline-none focus:border-2 focus:border-[#373737] text-[#1A1A1A]"
                      />
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
                    </div>
                  ) : null}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="select-none">
            {filteredReceipts.length === 0 ? (
              <tr className="h-[40px] bg-white">
                <td colSpan={columns.length} className="px-4 text-sm text-[#1A1A1A] border-b border-[#CCCCCC] text-center">
                  No receipts available
                </td>
              </tr>
            ) : (
              filteredReceipts.map((receipt) => {
                const isSelected = selectedReceipt?.id === receipt.id;
                return (
                <tr
                  key={receipt.id}
                  onClick={() => setSelectedReceipt(receipt)}
                  className={`h-[40px] cursor-pointer group ${isSelected ? "bg-[#D2F6E8]" : "bg-white hover:bg-[#F7F7F7]"}`}
                >
                  {columns.map((col, idx) => (
                    <td
                      key={col.id}
                      className={`px-4 text-sm text-[#1A1A1A] border-b ${isSelected ? "border-[#AFCDBF] bg-[#D2F6E8]" : "border-[#CCCCCC] bg-white group-hover:bg-[#F7F7F7]"} ${
                        idx !== columns.length - 1 ? "border-r border-r-white" : ""
                      }`}
                      style={{ width: col.width, minWidth: col.width }}
                    >
                      {col.id === "storeNumber" ? (
                        <span className="truncate block">{receipt.storeNumber}</span>
                      ) : col.id === "storeName" ? (
                        <span className="truncate block">{receipt.storeName}</span>
                      ) : col.id === "receiptDate" ? (
                        <span className="truncate block">{receipt.receiptDate}</span>
                      ) : col.id === "receiptNumber" ? (
                        <span className="truncate block">{receipt.receiptNumber}</span>
                      ) : col.id === "amount" ? (
                        <span className="truncate block">{receipt.total.toFixed(2)}</span>
                      ) : col.id === "paymentType" ? (
                        <span className="truncate block">{receipt.paymentType}</span>
                      ) : col.id === "contactName" ? (
                        <span className="truncate block">{receipt.contactName}</span>
                      ) : col.id === "contactIdentifier" ? (
                        <span className="truncate block">{receipt.contactIdentifier}</span>
                      ) : null}
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

      <ReceiptDrawer receipt={selectedReceipt} onClose={() => setSelectedReceipt(null)} />
    </div>
  );
}
