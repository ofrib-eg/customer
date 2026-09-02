import React from "react";
import * as Popover from "@radix-ui/react-popover";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router";
import { Calendar } from "../ui/calendar";
import { mockOffers, Offer, OfferScope, OfferStatus } from "./offersTypes";
import { OfferDrawer } from "./OfferDrawer";

const SCOPE_OPTIONS: OfferScope[] = ["Customer group", "Personal"];
const OFFER_STATUS_OPTIONS: OfferStatus[] = ["Active", "Upcoming", "Expired", "Redeemed", "Cancelled"];
const DEFAULT_STATUS_FILTER: OfferStatus[] = ["Active", "Upcoming", "Redeemed"];

const columns = [
  { id: "promotionName", label: "Promotion name", width: 220 },
  { id: "offerName", label: "Offer name", width: 160 },
  { id: "offerId", label: "Offer ID", width: 120 },
  { id: "validFrom", label: "Valid from", width: 140 },
  { id: "validTo", label: "Valid to", width: 140 },
  { id: "status", label: "Status", width: 130 },
  { id: "scope", label: "Offer type", width: 160 }
];

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

function MultiSelectFilter<T extends string>({
  options,
  selected,
  onChange
}: {
  options: T[];
  selected: T[];
  onChange: (next: T[]) => void;
}) {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggle = (option: T) => {
    onChange(selected.includes(option) ? selected.filter((s) => s !== option) : [...selected, option]);
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
        <Popover.Content align="start" sideOffset={4} className="z-[3000] bg-white border border-[#CCCCCC] shadow-lg min-w-[180px] outline-none">
          <div className="flex flex-col py-1">
            {options.map((option) => (
              <label key={option} className="flex items-center gap-[8px] px-[12px] h-[36px] cursor-pointer hover:bg-[#EAEAEA]">
                <input
                  type="checkbox"
                  checked={selected.includes(option)}
                  onChange={() => toggle(option)}
                  className="size-[14px] cursor-pointer accent-[#1a1a1a]"
                />
                <span className="text-[14px] font-['Roboto:Regular',sans-serif] text-[#1A1A1A]">{option}</span>
              </label>
            ))}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export function OffersGrid() {
  const [promotionNameFilter, setPromotionNameFilter] = React.useState("");
  const [offerNameFilter, setOfferNameFilter] = React.useState("");
  const [validFromFilter, setValidFromFilter] = React.useState("");
  const [validToFilter, setValidToFilter] = React.useState("");
  const [scopeFilter, setScopeFilter] = React.useState<OfferScope[]>([]);
  const [statusFilter, setStatusFilter] = React.useState<OfferStatus[]>(DEFAULT_STATUS_FILTER);
  const [selectedOffer, setSelectedOffer] = React.useState<Offer | null>(null);
  const navigate = useNavigate();

  const filteredOffers = React.useMemo(() => {
    return mockOffers.filter((offer) => {
      if (statusFilter.length > 0 && !statusFilter.includes(offer.status)) return false;
      if (promotionNameFilter && !offer.promotionName.toLowerCase().includes(promotionNameFilter.toLowerCase())) return false;
      if (offerNameFilter && !offer.offerName.toLowerCase().includes(offerNameFilter.toLowerCase())) return false;
      if (validFromFilter && offer.validFrom !== validFromFilter) return false;
      if (validToFilter && offer.validTo !== validToFilter) return false;
      if (scopeFilter.length > 0 && !scopeFilter.includes(offer.scope)) return false;
      return true;
    });
  }, [statusFilter, promotionNameFilter, offerNameFilter, validFromFilter, validToFilter, scopeFilter]);

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
                    {col.id === "promotionName" ? (
                      <input
                        type="text"
                        value={promotionNameFilter}
                        onChange={(e) => setPromotionNameFilter(e.target.value)}
                        className="w-full h-[30px] bg-white border border-[#CCCCCC] px-2 text-[14px] focus:outline-none focus:border-2 focus:border-[#373737] text-[#1A1A1A]"
                      />
                    ) : col.id === "offerName" ? (
                      <input
                        type="text"
                        value={offerNameFilter}
                        onChange={(e) => setOfferNameFilter(e.target.value)}
                        className="w-full h-[30px] bg-white border border-[#CCCCCC] px-2 text-[14px] focus:outline-none focus:border-2 focus:border-[#373737] text-[#1A1A1A]"
                      />
                    ) : col.id === "validFrom" ? (
                      <DateFilter value={validFromFilter} onChange={setValidFromFilter} />
                    ) : col.id === "validTo" ? (
                      <DateFilter value={validToFilter} onChange={setValidToFilter} />
                    ) : col.id === "status" ? (
                      <MultiSelectFilter options={OFFER_STATUS_OPTIONS} selected={statusFilter} onChange={setStatusFilter} />
                    ) : col.id === "scope" ? (
                      <MultiSelectFilter options={SCOPE_OPTIONS} selected={scopeFilter} onChange={setScopeFilter} />
                    ) : null}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="select-none">
              {filteredOffers.length === 0 ? (
                <tr className="h-[40px] bg-white">
                  <td colSpan={columns.length} className="px-4 text-sm text-[#1A1A1A] border-b border-[#CCCCCC] text-center">
                    No offers available
                  </td>
                </tr>
              ) : (
                filteredOffers.map((offer) => {
                  const isSelected = selectedOffer?.id === offer.id;
                  return (
                    <tr
                      key={offer.id}
                      onClick={() => setSelectedOffer(offer)}
                      className={`h-[40px] cursor-pointer group ${isSelected ? "bg-[#D2F6E8]" : "bg-white hover:bg-[#F7F7F7]"}`}
                    >
                      {columns.map((col, idx) => (
                        <td
                          key={col.id}
                          className={`px-4 text-sm text-[#1A1A1A] border-b ${
                            isSelected ? "border-[#AFCDBF] bg-[#D2F6E8]" : "border-[#CCCCCC] bg-white group-hover:bg-[#F7F7F7]"
                          } ${idx !== columns.length - 1 ? "border-r border-r-white" : ""}`}
                          style={{ width: col.width, minWidth: col.width }}
                        >
                          {col.id === "promotionName" ? (
                            <span className="truncate block">{offer.promotionName}</span>
                          ) : col.id === "offerName" ? (
                            <span
                              className="truncate block underline cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/customer/offers/${offer.id}`);
                              }}
                            >
                              {offer.offerName}
                            </span>
                          ) : col.id === "offerId" ? (
                            <span className="truncate block">{offer.id}</span>
                          ) : col.id === "validFrom" ? (
                            <span className="truncate block">{offer.validFrom}</span>
                          ) : col.id === "validTo" ? (
                            <span className="truncate block">{offer.validTo}</span>
                          ) : col.id === "status" ? (
                            <span className="truncate block">{offer.status}</span>
                          ) : col.id === "scope" ? (
                            <span className="truncate block">{offer.scope}</span>
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

      <OfferDrawer offer={selectedOffer} onClose={() => setSelectedOffer(null)} />
    </div>
  );
}
