import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Search, ChevronDown, X } from "lucide-react";

export type StoreAccessType = "all" | "profile" | "team" | "stores";

export interface StoreAccessValue {
  type: StoreAccessType;
  profileId: string;
  teamId: string;
  storeIds: string[];
}

interface Option {
  id: string;
  label: string;
}

export const PROFILE_OPTIONS: Option[] = [
  { id: "1001", label: "1001 - Coop Midt" },
  { id: "1002", label: "1002 - Coop Øst" },
  { id: "1003", label: "1003 - Coop Nord" }
];

export const TEAM_OPTIONS: Option[] = [
  { id: "north", label: "Team North" },
  { id: "south", label: "Team South" },
  { id: "west", label: "Team West" }
];

export const STORE_OPTIONS: Option[] = [
  { id: "1050", label: "1050 - Coop Extra Grilstad" },
  { id: "1051", label: "1051 - Bryggen" },
  { id: "1052", label: "1052 - Trondelag" },
  { id: "1053", label: "1053 - Madlaveien" }
];

export function getStoreOrProfileLabel(id: string): string {
  const match = STORE_OPTIONS.find((o) => o.id === id) || PROFILE_OPTIONS.find((o) => o.id === id);
  return match ? match.label : id;
}

export function getStoreGroupLabel(customer: { store?: string; storeAccess?: StoreAccessValue }): string {
  const { storeAccess } = customer;
  if (!storeAccess) {
    return customer.store ? getStoreOrProfileLabel(customer.store) : "–";
  }

  if (storeAccess.type === "all") return "All stores";

  if (storeAccess.type === "profile") {
    const profile = PROFILE_OPTIONS.find((o) => o.id === storeAccess.profileId);
    return profile ? profile.label : "Selected profile";
  }

  if (storeAccess.type === "team") {
    const team = TEAM_OPTIONS.find((o) => o.id === storeAccess.teamId);
    return team ? team.label : "Selected team";
  }

  const storeLabels = storeAccess.storeIds.map((id) => getStoreOrProfileLabel(id));
  if (storeLabels.length === 0) return "–";
  if (storeLabels.length === 1) return storeLabels[0];
  return storeLabels.join(", ");
}

interface ChangeStoreAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (value: StoreAccessValue) => void;
  value: StoreAccessValue;
}

function SearchableDropdown({ options, value, onChange }: { options: Option[]; value: string; onChange: (id: string) => void }) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const containerRef = React.useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.id === value);
  const filtered = options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()));

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full h-[32px] px-[10px] border border-[#ccc] bg-white flex items-center justify-between text-[14px] font-['Roboto:Regular',sans-serif] text-[#1a1a1a]"
      >
        <span>{selected ? selected.label : "Select..."}</span>
        <ChevronDown className="size-[16px] text-[#666]" />
      </button>
      {open && (
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
            {filtered.map((o) => (
              <button
                key={o.id}
                type="button"
                onClick={() => {
                  onChange(o.id);
                  setOpen(false);
                  setQuery("");
                }}
                className={`w-full text-left px-[10px] py-[8px] text-[14px] font-['Roboto:Regular',sans-serif] text-[#1a1a1a] hover:bg-[#f5f5f5] ${
                  o.id === value ? "border-2 border-[#e58108]" : ""
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function MultiSelectStoreCombobox({ options, selectedIds, onChange }: { options: Option[]; selectedIds: string[]; onChange: (ids: string[]) => void }) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const containerRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const filtered = options.filter((o) => !selectedIds.includes(o.id) && o.label.toLowerCase().includes(query.toLowerCase()));

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const addStore = (id: string) => {
    onChange([...selectedIds, id]);
    setQuery("");
    inputRef.current?.focus();
  };

  const removeStore = (id: string) => onChange(selectedIds.filter((sid) => sid !== id));

  return (
    <div className="relative" ref={containerRef}>
      <div
        onClick={() => { setOpen(true); inputRef.current?.focus(); }}
        className={`flex flex-wrap items-center gap-[6px] w-full min-h-[32px] p-[6px] border bg-white cursor-text ${open ? "border-[#e58108]" : "border-[#ccc]"}`}
      >
        {selectedIds.map((id) => {
          const option = options.find((o) => o.id === id);
          if (!option) return null;
          return (
            <span key={id} className="inline-flex items-center gap-[6px] pl-[8px] pr-[6px] py-[3px] bg-[#595959] rounded-[3px]">
              <span className="font-['Roboto:Regular',sans-serif] text-[13px] text-white whitespace-nowrap">{option.label}</span>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); removeStore(id); }}
                className="flex items-center justify-center size-[14px] rounded-full bg-white cursor-pointer shrink-0"
                aria-label={`Remove ${option.label}`}
              >
                <X className="size-[10px] text-[#1a1a1a]" />
              </button>
            </span>
          );
        })}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          placeholder={selectedIds.length === 0 ? "Search stores..." : ""}
          className="flex-1 min-w-[80px] h-[22px] border-none outline-none font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a] bg-transparent"
        />
      </div>
      {open && filtered.length > 0 && (
        <div className="absolute z-10 mt-[4px] w-full bg-white border border-[#ccc] shadow-lg max-h-[200px] overflow-y-auto">
          {filtered.map((o) => (
            <button
              key={o.id}
              type="button"
              onClick={() => addStore(o.id)}
              className="w-full text-left px-[10px] py-[8px] font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a] hover:bg-[#f5f5f5] cursor-pointer"
            >
              {o.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function StoreAccessFields({ value, onChange }: { value: StoreAccessValue; onChange: (value: StoreAccessValue) => void }) {
  return (
    <div className="flex flex-col gap-[12px]">
      <label className="flex items-center gap-[10px] cursor-pointer">
        <input
          type="radio"
          name="storeAccess"
          checked={value.type === "all"}
          onChange={() => onChange({ ...value, type: "all" })}
          className="w-[16px] h-[16px] accent-[#1a1a1a]"
        />
        <span className="font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a]">All stores</span>
      </label>

      <label className="flex items-center gap-[10px] cursor-pointer">
        <input
          type="radio"
          name="storeAccess"
          checked={value.type === "profile"}
          onChange={() => onChange({ ...value, type: "profile" })}
          className="w-[16px] h-[16px] accent-[#1a1a1a]"
        />
        <span className="font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a]">Selected profile</span>
      </label>
      {value.type === "profile" && (
        <div className="pl-[26px]">
          <SearchableDropdown
            options={PROFILE_OPTIONS}
            value={value.profileId}
            onChange={(id) => onChange({ ...value, profileId: id })}
          />
        </div>
      )}

      <label className="flex items-center gap-[10px] cursor-pointer">
        <input
          type="radio"
          name="storeAccess"
          checked={value.type === "team"}
          onChange={() => onChange({ ...value, type: "team" })}
          className="w-[16px] h-[16px] accent-[#1a1a1a]"
        />
        <span className="font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a]">Selected team</span>
      </label>
      {value.type === "team" && (
        <div className="pl-[26px]">
          <SearchableDropdown
            options={TEAM_OPTIONS}
            value={value.teamId}
            onChange={(id) => onChange({ ...value, teamId: id })}
          />
        </div>
      )}

      <label className="flex items-center gap-[10px] cursor-pointer">
        <input
          type="radio"
          name="storeAccess"
          checked={value.type === "stores"}
          onChange={() => onChange({ ...value, type: "stores" })}
          className="w-[16px] h-[16px] accent-[#1a1a1a]"
        />
        <span className="font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a]">Selected stores</span>
      </label>
      {value.type === "stores" && (
        <div className="pl-[26px]">
          <MultiSelectStoreCombobox
            options={STORE_OPTIONS}
            selectedIds={value.storeIds}
            onChange={(storeIds) => onChange({ ...value, storeIds })}
          />
        </div>
      )}
    </div>
  );
}

export function ChangeStoreAccessModal({ isOpen, onClose, onSave, value }: ChangeStoreAccessModalProps) {
  const [draft, setDraft] = React.useState<StoreAccessValue>(value);

  React.useEffect(() => {
    if (isOpen) setDraft(value);
  }, [isOpen, value]);

  const handleSave = () => {
    onSave(draft);
    onClose();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-[9999]" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border border-[#ccc] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] w-[420px] max-h-[90vh] overflow-y-auto z-[10000] outline-none">
          {/* Header */}
          <div className="pt-[24px] px-[24px] pb-px">
            <Dialog.Title className="font-['Roboto_Condensed:Bold',sans-serif] leading-[24px] not-italic text-[#1a1a1a] text-[16px] uppercase">
              Change store access
            </Dialog.Title>
            <Dialog.Description className="sr-only">
              Choose which stores this customer has access to
            </Dialog.Description>
          </div>

          {/* Body */}
          <div className="p-[24px]">
            <p className="font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a] mb-[12px]">
              Customer will have access to
            </p>

            <StoreAccessFields value={draft} onChange={setDraft} />
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-[8px] px-[24px] py-[16px] border-t border-[#e5e5e5]">
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
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
