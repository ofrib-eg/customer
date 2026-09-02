import React from "react";
import { Calendar, ChevronDown, Search } from "lucide-react";

export const DETAIL_CARD_CLASS = "shadow-none";

const PHONE_COUNTRIES = [
  { country: "Norway", code: "+47" },
  { country: "Sweden", code: "+46" },
  { country: "Denmark", code: "+45" },
  { country: "Finland", code: "+358" }
];

const DEFAULT_PHONE_COUNTRY_CODE = "+47";

export function PhoneCountryCodeSelect({ value, onChange, highlighted }: { value?: string; onChange?: (value: string) => void; highlighted?: boolean }) {
  const [internalValue, setInternalValue] = React.useState(value || DEFAULT_PHONE_COUNTRY_CODE);
  const [isOpen, setIsOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const containerRef = React.useRef<HTMLDivElement>(null);

  const current = value !== undefined ? value : internalValue;

  const setValue = (next: string) => {
    if (onChange) onChange(next);
    else setInternalValue(next);
  };

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = PHONE_COUNTRIES.filter((c) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return c.country.toLowerCase().includes(q) || c.code.replace("+", "").includes(q.replace("+", ""));
  });

  return (
    <div className="relative w-[72px] shrink-0" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full h-[32px] pl-[10px] pr-[6px] border bg-[#F7F7F7] flex items-center justify-between font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a] outline-none cursor-pointer ${highlighted ? "border-[#e58108]" : "border-[#CCCCCC]"}`}
      >
        <span>{current}</span>
        <ChevronDown className="size-[14px] text-[#666]" />
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-[4px] w-[200px] bg-white border border-[#ccc] shadow-lg">
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
                  key={c.code}
                  type="button"
                  onClick={() => { setValue(c.code); setIsOpen(false); setQuery(""); }}
                  className={`w-full flex items-center justify-between text-left px-[10px] py-[8px] text-[14px] font-['Roboto:Regular',sans-serif] text-[#1a1a1a] hover:bg-[#f5f5f5] ${c.code === current ? "border-2 border-[#e58108]" : ""}`}
                >
                  <span>{c.country}</span>
                  <span className="text-[#666]">{c.code}</span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function SectionHeader({ children, icon, className = "mb-[10px]" }: { children: React.ReactNode; icon?: React.ReactNode; className?: string }) {
  return (
    <div className={`flex items-center gap-[6px] ${className}`}>
      <h3 className="font-['Roboto_Condensed',sans-serif] font-bold text-[16px] leading-[19px] tracking-[0px] text-[#1a1a1a] uppercase">{children}</h3>
      {icon}
    </div>
  );
}

export function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block font-['Roboto:Regular',sans-serif] text-[14px] leading-[17px] text-[#666] mb-[2px]">
      {required && "* "}{children}
    </label>
  );
}

export function InputField({ label, value, required, disabled, compact, highlighted, onChange }: { label: string; value: string; required?: boolean; disabled?: boolean; compact?: boolean; highlighted?: boolean; onChange?: (value: string) => void }) {
  return (
    <div className={compact ? "mb-[5px]" : "mb-[16px]"}>
      <FieldLabel required={required}>{label}</FieldLabel>
      <div className="bg-white h-[32px] relative">
        <div className="overflow-clip relative rounded-[inherit] size-full">
          <input
            type="text"
            disabled={disabled}
            {...(onChange
              ? { value, onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value) }
              : { defaultValue: value })}
            className="absolute font-['Roboto:Regular',sans-serif] inset-[8px_10px_7px_10px] leading-[normal] not-italic text-[#1a1a1a] text-[14px] bg-transparent border-none outline-none w-full disabled:text-[#999]"
          />
        </div>
        <div aria-hidden="true" className={`absolute border border-solid inset-0 pointer-events-none ${disabled ? 'border-[#e0e0e0]' : highlighted ? 'border-[#e58108]' : 'border-[#ccc]'}`} />
      </div>
    </div>
  );
}

export function SelectField({ label, value, options, required, compact, onChange, hideBlankOption }: { label: string; value: string; options: { value: string; label: string }[]; required?: boolean; compact?: boolean; onChange?: (value: string) => void; hideBlankOption?: boolean }) {
  return (
    <div className={compact ? "mb-[5px]" : "mb-[16px]"}>
      <FieldLabel required={required}>{label}</FieldLabel>
      <div className="bg-white h-[32px] relative">
        <div className="overflow-clip relative rounded-[inherit] size-full">
          <select
            {...(onChange
              ? { value, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => onChange(e.target.value) }
              : { defaultValue: value })}
            className="absolute font-['Roboto:Regular',sans-serif] inset-[8px_29px_7px_10px] leading-[normal] not-italic text-[#1a1a1a] text-[14px] bg-transparent border-none outline-none w-full appearance-none cursor-pointer"
          >
            {!hideBlankOption && <option value="">Select...</option>}
            {options.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <div className="-translate-y-1/2 absolute right-[6px] size-[20px] top-1/2">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
              <g>
                <mask height="4" id="mask0_select" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="8" x="6" y="8">
                  <path d="M14 8L10 12L6 8H14Z" fill="var(--fill-0, #666666)" />
                </mask>
                <g mask="url(#mask0_select)">
                  <rect fill="var(--fill-0, #666666)" height="20" width="20" />
                </g>
              </g>
            </svg>
          </div>
        </div>
        <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-0 pointer-events-none" />
      </div>
    </div>
  );
}

export function ReadOnlyField({ label, value, compact, hideIfEmpty, valueClassName = "" }: { label: string; value: string; compact?: boolean; hideIfEmpty?: boolean; valueClassName?: string }) {
  if (hideIfEmpty && (!value || value === "–")) return null;

  return (
    <div className={compact ? "mb-[5px]" : "mb-[16px]"}>
      <FieldLabel>{label}</FieldLabel>
      <div className={`h-[32px] flex items-center font-['Roboto:Regular',sans-serif] text-[14px] leading-[17px] text-[#1a1a1a] ${valueClassName}`}>
        {value}
      </div>
    </div>
  );
}

export function CheckboxField({ label, checked, compact, disabled, onChange }: { label: string; checked: boolean; compact?: boolean; disabled?: boolean; onChange?: (checked: boolean) => void }) {
  return (
    <label className={`h-[32px] flex items-center gap-[8px] ${disabled ? "cursor-not-allowed" : "cursor-pointer"} ${compact ? "mb-[5px]" : "mb-[16px]"}`}>
      <input
        type="checkbox"
        disabled={disabled}
        {...(onChange
          ? { checked, onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.checked) }
          : { defaultChecked: checked })}
        className="w-[16px] h-[16px] cursor-pointer accent-[#1a1a1a] disabled:cursor-not-allowed"
      />
      <span className={`font-['Roboto:Regular',sans-serif] text-[14px] leading-[17px] ${disabled ? "text-[#999]" : "text-[#1a1a1a]"}`}>
        {label}
      </span>
    </label>
  );
}

export function DateField({ label, value, onChange, compact, required, disabled }: { label: string; value: string; onChange: (value: string) => void; compact?: boolean; required?: boolean; disabled?: boolean }) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className={compact ? "mb-[5px]" : "mb-[16px]"}>
      <FieldLabel required={required}>{label}</FieldLabel>
      <div className="bg-white h-[32px] relative">
        <div className="overflow-clip relative rounded-[inherit] size-full">
          <input
            ref={inputRef}
            type="date"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            className="absolute font-['Roboto:Regular',sans-serif] inset-[8px_29px_7px_10px] leading-[normal] not-italic text-[#1a1a1a] text-[14px] bg-transparent border-none outline-none w-full [&::-webkit-calendar-picker-indicator]:opacity-0 disabled:text-[#999]"
          />
          <Calendar
            onClick={() => !disabled && inputRef.current?.showPicker?.()}
            className={`absolute right-[8px] top-1/2 -translate-y-1/2 size-[16px] ${disabled ? "text-[#ccc] cursor-not-allowed" : "text-[#666] cursor-pointer"}`}
          />
        </div>
        <div aria-hidden="true" className={`absolute border border-solid inset-0 pointer-events-none ${disabled ? "border-[#e0e0e0]" : "border-[#ccc]"}`} />
      </div>
    </div>
  );
}
