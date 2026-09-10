import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Info, Search, ChevronDown } from "lucide-react";

const COUNTRY_LIST = [
  "Sweden", "Norway", "Denmark", "Finland", "Iceland",
  "Germany", "United Kingdom", "France", "Netherlands", "Belgium",
  "Poland", "Spain", "Italy", "Portugal", "Switzerland",
  "Austria", "Ireland", "Estonia", "Latvia", "Lithuania",
  "United States", "Canada"
];

function CountrySelect({ value, onChange, disabled }: { value: string; onChange: (value: string) => void; disabled?: boolean }) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const containerRef = React.useRef<HTMLDivElement>(null);
  const filtered = COUNTRY_LIST.filter((c) => c.toLowerCase().includes(query.toLowerCase()));

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((prev) => !prev)}
        className={`w-full h-[32px] px-[10px] border flex items-center justify-between text-[14px] font-['Roboto:Regular',sans-serif] ${
          disabled ? "bg-[#F4F4F4] border-[#e0e0e0] text-[#999] cursor-not-allowed" : "bg-white border-[#ccc] text-[#1a1a1a] cursor-pointer"
        }`}
      >
        <span>{value || "Select..."}</span>
        <ChevronDown className="size-[16px] text-[#666]" />
      </button>
      {open && !disabled && (
        <div className="absolute z-10 mt-[4px] w-full bg-white border border-[#ccc] shadow-lg">
          <div className="p-[8px] border-b border-[#e5e5e5]">
            <div className="relative">
              <Search className="absolute left-[8px] top-1/2 -translate-y-1/2 size-[14px] text-[#666] pointer-events-none" />
              <input
                autoFocus
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full h-[30px] pl-[28px] pr-[8px] border border-[#ccc] text-[14px] font-['Roboto:Regular',sans-serif] outline-none focus:border-[#1c7862]"
              />
            </div>
          </div>
          <div className="max-h-[180px] overflow-y-auto p-[4px]">
            {filtered.length === 0 ? (
              <div className="px-[10px] py-[8px] text-[14px] font-['Roboto:Regular',sans-serif] text-[#999]">No countries found</div>
            ) : (
              filtered.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => { onChange(c); setOpen(false); setQuery(""); }}
                  className={`w-full text-left px-[10px] py-[8px] text-[14px] font-['Roboto:Regular',sans-serif] text-[#1a1a1a] hover:bg-[#f5f5f5] ${c === value ? "border-2 border-[#e58108]" : ""}`}
                >
                  {c}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export interface AddressFields {
  addressLine1: string;
  addressLine2: string;
  postalCode: string;
  city: string;
  country: string;
}

interface EditAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (fields: AddressFields, useAs?: { delivery: boolean; invoice: boolean }) => void;
  fields: AddressFields;
  title?: string;
  noticeText?: string;
  onRemove?: () => void;
  useAsOptions?: { deliveryMissing: boolean; invoiceMissing: boolean };
  /**
   * Lets an already-added Delivery/Invoice address card switch which of the two
   * types it is, from within edit mode (rather than a separate "..." menu action).
   * `currentType` is the type being edited. If the other type is already taken
   * (`otherTypeTaken`), selecting it is a swap - the other card takes on
   * `currentType` instead of being disabled, since with only two non-"general"
   * types a swap always has a valid resolution. `onTypeChange` receives
   * `isSwap` so the caller knows to move the other card's fields into the
   * vacated slot rather than clearing it.
   */
  addressTypeOptions?: {
    currentType: "delivery" | "invoice";
    otherTypeTaken: boolean;
    onTypeChange: (type: "delivery" | "invoice", fields: AddressFields, isSwap: boolean) => void;
  };
}

function ModalField({
  label,
  value,
  onChange,
  required,
  disabled
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
}) {
  return (
    <div className="mb-[16px]">
      <label className="block font-['Roboto:Regular',sans-serif] text-[14px] leading-[17px] text-[#666] mb-[2px]">
        {required && "* "}{label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`w-full border h-[32px] px-[10px] text-[14px] font-['Roboto:Regular',sans-serif] outline-none ${
          disabled ? "bg-[#F4F4F4] border-[#e0e0e0] text-[#999]" : "bg-white border-[#ccc] text-[#1a1a1a] focus:border-[#1c7862]"
        }`}
      />
    </div>
  );
}

export function EditAddressModal({
  isOpen,
  onClose,
  onSave,
  fields,
  title = "Edit address",
  noticeText = "Address information is shared for all relationships (i.e. customer, member and business contact).",
  onRemove,
  useAsOptions,
  addressTypeOptions
}: EditAddressModalProps) {
  const [draft, setDraft] = React.useState<AddressFields>(fields);
  const [useAsDelivery, setUseAsDelivery] = React.useState(false);
  const [useAsInvoice, setUseAsInvoice] = React.useState(false);
  const [selectedType, setSelectedType] = React.useState<"delivery" | "invoice">("delivery");

  React.useEffect(() => {
    if (isOpen) {
      setDraft(fields);
      if (useAsOptions) {
        setUseAsDelivery(useAsOptions.deliveryMissing);
        setUseAsInvoice(useAsOptions.invoiceMissing);
      }
      if (addressTypeOptions) {
        setSelectedType(addressTypeOptions.currentType);
      }
    }
  }, [isOpen, fields, useAsOptions, addressTypeOptions]);

  const update = (key: keyof AddressFields) => (value: string) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    if (addressTypeOptions && selectedType !== addressTypeOptions.currentType) {
      // Type changed: move the edited fields to the new slot instead of saving
      // them back under the old type. If the new type is already taken by the
      // other card, this is a swap - the other card moves into this card's
      // current type rather than being cleared.
      addressTypeOptions.onTypeChange(selectedType, draft, addressTypeOptions.otherTypeTaken);
    } else {
      onSave(draft, useAsOptions ? { delivery: useAsDelivery, invoice: useAsInvoice } : undefined);
    }
    onClose();
  };

  const handleRemove = () => {
    onRemove?.();
    onClose();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-[9999]" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border border-[#ccc] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] w-[600px] max-h-[90vh] overflow-y-auto z-[10000] outline-none">
          {/* Header */}
          <div className="pt-[24px] px-[24px] pb-px">
            <Dialog.Title className="font-['Roboto_Condensed:Bold',sans-serif] leading-[24px] not-italic text-[#1a1a1a] text-[16px] uppercase">
              {title}
            </Dialog.Title>
            <Dialog.Description className="sr-only">
              Edit this customer's address
            </Dialog.Description>
          </div>

          {/* Notice */}
          <div className="mx-[24px] mt-[16px] p-[16px] bg-white border border-[#999] rounded-[8px] flex items-start gap-[10px]">
            <Info className="size-[20px] text-[#1a1a1a] shrink-0" />
            <p className="font-['Roboto:Regular',sans-serif] text-[14px] leading-[20px] text-[#1a1a1a]">
              {noticeText}
            </p>
          </div>

          {/* Body */}
          <div className="px-[24px] pt-[16px] pb-[24px] flex flex-col max-w-[280px]">
            {addressTypeOptions && (
              <div className="mb-[16px]">
                <label className="block font-['Roboto:Regular',sans-serif] text-[14px] leading-[17px] text-[#666] mb-[2px]">
                  * Address type
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value as "delivery" | "invoice")}
                  className="w-full h-[32px] px-[10px] border border-[#ccc] bg-white text-[14px] font-['Roboto:Regular',sans-serif] text-[#1a1a1a] outline-none focus:border-[#1c7862] cursor-pointer"
                >
                  <option value="delivery">
                    {addressTypeOptions.otherTypeTaken && addressTypeOptions.currentType !== "delivery"
                      ? "Delivery address (swap with current)"
                      : "Delivery address"}
                  </option>
                  <option value="invoice">
                    {addressTypeOptions.otherTypeTaken && addressTypeOptions.currentType !== "invoice"
                      ? "Invoice address (swap with current)"
                      : "Invoice address"}
                  </option>
                </select>
                {addressTypeOptions.otherTypeTaken && selectedType !== addressTypeOptions.currentType && (
                  <p className="mt-[6px] font-['Roboto:Regular',sans-serif] text-[13px] text-[#666]">
                    The other card will switch to {addressTypeOptions.currentType === "delivery" ? "Delivery address" : "Invoice address"}.
                  </p>
                )}
              </div>
            )}
            <ModalField label="Address line 1" value={draft.addressLine1} onChange={update("addressLine1")} required />
            <ModalField label="Address line 2" value={draft.addressLine2} onChange={update("addressLine2")} />
            <ModalField label="Postal code" value={draft.postalCode} onChange={update("postalCode")} required />
            <ModalField label="City" value={draft.city} onChange={update("city")} required />
            <div className="mb-[16px]">
              <label className="block font-['Roboto:Regular',sans-serif] text-[14px] leading-[17px] text-[#666] mb-[2px]">
                * Country
              </label>
              <CountrySelect value={draft.country} onChange={update("country")} />
            </div>
            {useAsOptions && (
              <div className="mt-[8px]">
                <label className="block font-['Roboto:Regular',sans-serif] text-[14px] leading-[17px] text-[#666] mb-[8px]">
                  Use as:
                </label>
                <div className="flex flex-col gap-[8px]">
                  <label className="flex items-center gap-[8px] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={useAsDelivery}
                      onChange={(e) => setUseAsDelivery(e.target.checked)}
                      className="w-[16px] h-[16px] cursor-pointer accent-[#1a1a1a]"
                    />
                    <span className="font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a]">Delivery address</span>
                  </label>
                  <label className="flex items-center gap-[8px] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={useAsInvoice}
                      onChange={(e) => setUseAsInvoice(e.target.checked)}
                      className="w-[16px] h-[16px] cursor-pointer accent-[#1a1a1a]"
                    />
                    <span className="font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a]">Invoice address</span>
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between gap-[8px] px-[24px] py-[16px] border-t border-[#e5e5e5]">
            {onRemove ? (
              <button
                onClick={handleRemove}
                className="bg-[#eaeaea] h-[30px] px-[16px] rounded-[33554400px] hover:bg-[#e0e0e0] transition-colors"
              >
                <p className="font-['Roboto_Condensed:SemiBold',sans-serif] leading-[19.5px] not-italic text-[#1a1a1a] text-[13px] text-center uppercase">
                  Remove address
                </p>
              </button>
            ) : (
              <div />
            )}
            <div className="flex items-center gap-[8px]">
              <button
                onClick={onClose}
                className="bg-[#eaeaea] h-[30px] px-[16px] rounded-[33554400px] hover:bg-[#e0e0e0] transition-colors"
              >
                <p className="font-['Roboto_Condensed:SemiBold',sans-serif] leading-[19.5px] not-italic text-[#1a1a1a] text-[13px] text-center uppercase">
                  Cancel
                </p>
              </button>
              <button
                onClick={handleSave}
                className="bg-[#1c7862] h-[30px] px-[16px] rounded-[33554400px] border border-[#1c7862] hover:bg-[#248E73] hover:border-[#248E73] transition-colors"
              >
                <p className="font-['Roboto_Condensed:SemiBold',sans-serif] leading-[19.5px] not-italic text-[13px] text-center text-white uppercase">
                  Save
                </p>
              </button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
