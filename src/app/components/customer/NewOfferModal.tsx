import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Search, X } from "lucide-react";
import { DateField, FieldLabel, InputField } from "./sharedFields";

interface ArticleOption {
  id: string;
  label: string;
}

const ARTICLE_OPTIONS: ArticleOption[] = [
  { id: "7021460001300", label: "7021460001300 - Freia Melkesjokolade (200g)" },
  { id: "7021460002100", label: "7021460002100 - Coffee 250g" },
  { id: "7021460002101", label: "7021460002101 - Coffee 500g" },
  { id: "7021460003200", label: "7021460003200 - Milk 1L" },
  { id: "7021460004300", label: "7021460004300 - Bread" },
  { id: "7021460004301", label: "7021460004301 - Butter 500g" },
  { id: "7021460005400", label: "7021460005400 - Chicken fillet 1kg" },
  { id: "7021460006500", label: "7021460006500 - Bananas 1kg" },
  { id: "7021460006501", label: "7021460006501 - Oranges 1kg" }
];

function ArticleSearch({ selectedIds, onChange }: { selectedIds: string[]; onChange: (ids: string[]) => void }) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const containerRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const filtered = ARTICLE_OPTIONS.filter((o) => !selectedIds.includes(o.id) && o.label.toLowerCase().includes(query.toLowerCase()));

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const addArticle = (id: string) => {
    onChange([...selectedIds, id]);
    setQuery("");
    inputRef.current?.focus();
  };

  const removeArticle = (id: string) => onChange(selectedIds.filter((sid) => sid !== id));

  return (
    <div className="relative" ref={containerRef}>
      <div
        onClick={() => {
          setOpen(true);
          inputRef.current?.focus();
        }}
        className={`flex flex-wrap items-center gap-[6px] w-full min-h-[32px] p-[6px] border bg-white cursor-text ${open ? "border-[#1c7862]" : "border-[#ccc]"}`}
      >
        {selectedIds.map((id) => {
          const option = ARTICLE_OPTIONS.find((o) => o.id === id);
          if (!option) return null;
          return (
            <span key={id} className="inline-flex items-center gap-[6px] pl-[8px] pr-[6px] py-[3px] bg-[#595959] rounded-[3px]">
              <span className="font-['Roboto:Regular',sans-serif] text-[13px] text-white whitespace-nowrap">{option.label}</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeArticle(id);
                }}
                className="flex items-center justify-center size-[14px] rounded-full bg-white cursor-pointer shrink-0"
                aria-label={`Remove ${option.label}`}
              >
                <X className="size-[10px] text-[#1a1a1a]" />
              </button>
            </span>
          );
        })}
        <div className="relative flex-1 min-w-[120px]">
          <Search className="absolute left-[2px] top-1/2 -translate-y-1/2 size-[14px] text-[#666] pointer-events-none" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            placeholder={selectedIds.length === 0 ? "Search articles..." : ""}
            className="w-full min-w-[80px] h-[22px] pl-[20px] border-none outline-none font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a] bg-transparent"
          />
        </div>
      </div>
      {open && filtered.length > 0 && (
        <div className="absolute z-10 mt-[4px] w-full bg-white border border-[#ccc] shadow-lg max-h-[200px] overflow-y-auto">
          {filtered.map((o) => (
            <button
              key={o.id}
              type="button"
              onClick={() => addArticle(o.id)}
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

interface NewOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  customerName: string;
}

export function NewOfferModal({ isOpen, onClose, customerName }: NewOfferModalProps) {
  const [offerName, setOfferName] = React.useState("");
  const [validFrom, setValidFrom] = React.useState("");
  const [validTo, setValidTo] = React.useState("");
  const [articleIds, setArticleIds] = React.useState<string[]>([]);

  const handleClose = () => {
    setOfferName("");
    setValidFrom("");
    setValidTo("");
    setArticleIds([]);
    onClose();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-[9999]" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border border-[#ccc] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] w-[480px] max-h-[85vh] overflow-y-auto z-[10000] outline-none">
          <div className="pt-[24px] px-[24px] pb-px">
            <Dialog.Title className="font-['Roboto_Condensed:Bold',sans-serif] leading-[24px] not-italic text-[#1a1a1a] text-[16px] uppercase">
              New private offer
            </Dialog.Title>
            <Dialog.Description className="font-['Roboto:Regular',sans-serif] text-[13px] text-[#666]">
              For {customerName}
            </Dialog.Description>
          </div>

          <div className="p-[24px] flex flex-col gap-[16px]">
            <InputField label="Offer name" value={offerName} onChange={setOfferName} required />

            <div className="flex gap-[16px]">
              <div className="flex-1">
                <DateField label="Valid from" value={validFrom} onChange={setValidFrom} required />
              </div>
              <div className="flex-1">
                <DateField label="Valid to" value={validTo} onChange={setValidTo} required />
              </div>
            </div>

            <div>
              <FieldLabel>Price rule</FieldLabel>
              <button
                type="button"
                onClick={() => {
                  // Price rule builder is not implemented yet - placeholder for future work.
                }}
                className="h-[30px] px-[16px] rounded-[33554400px] bg-[#eaeaea] hover:bg-[#e0e0e0] transition-colors cursor-pointer"
              >
                <span className="font-['Roboto_Condensed:SemiBold',sans-serif] leading-[19.5px] not-italic text-[13px] text-[#1a1a1a] uppercase">
                  Set price rule
                </span>
              </button>
            </div>

            <div>
              <FieldLabel>Articles</FieldLabel>
              <ArticleSearch selectedIds={articleIds} onChange={setArticleIds} />
            </div>
          </div>

          <div className="flex items-center justify-end gap-[8px] px-[24px] py-[16px] border-t border-[#e5e5e5]">
            <button
              onClick={handleClose}
              className="bg-[#eaeaea] h-[30px] px-[16px] rounded-[33554400px] hover:bg-[#e0e0e0] transition-colors cursor-pointer"
            >
              <p className="font-['Roboto_Condensed:SemiBold',sans-serif] leading-[19.5px] not-italic text-[#1a1a1a] text-[13px] text-center uppercase">
                Cancel
              </p>
            </button>
            <button
              onClick={handleClose}
              className="bg-[#1C7862] h-[30px] px-[16px] rounded-[33554400px] hover:bg-[#248E73] transition-colors cursor-pointer"
            >
              <p className="font-['Roboto_Condensed:SemiBold',sans-serif] leading-[19.5px] not-italic text-white text-[13px] text-center uppercase">
                Create offer
              </p>
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
