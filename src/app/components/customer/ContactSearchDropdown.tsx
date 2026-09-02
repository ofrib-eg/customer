import React from "react";
import { Search } from "lucide-react";
import { mockContacts } from "./ContactsGrid";
import { loadNewContacts } from "./newContacts";
import { LinkedContact, contactToLinkedContact } from "./contactTypes";

export function ContactSearchDropdown({ onSelect }: { onSelect: (contact: LinkedContact) => void }) {
  const [query, setQuery] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const allContacts = [...mockContacts, ...loadNewContacts()];
  const filtered = query.trim()
    ? allContacts.filter((c) =>
        `${c.firstName} ${c.lastName}`.toLowerCase().includes(query.toLowerCase()) ||
        c.identityNumber.toLowerCase().includes(query.toLowerCase())
      )
    : allContacts;

  return (
    <div className="relative" ref={containerRef}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          placeholder="Search by name or identity number"
          className="w-full h-[32px] px-[10px] pr-[35px] border border-[#CCCCCC] font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a] focus:outline-none focus:border-[#1c7862]"
        />
        <Search className="absolute right-[10px] top-1/2 -translate-y-1/2 w-[16px] h-[16px] text-[#666666] pointer-events-none" />
      </div>
      {open && (
        <div className="absolute z-10 mt-[4px] w-full bg-white border border-[#ccc] shadow-lg max-h-[220px] overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="px-[10px] py-[10px] font-['Roboto:Regular',sans-serif] text-[14px] text-[#999]">No contacts found</div>
          ) : (
            filtered.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => { onSelect(contactToLinkedContact(c)); setQuery(""); setOpen(false); }}
                className="w-full text-left px-[10px] py-[8px] border-b border-[#E0E0E0] last:border-b-0 hover:bg-[#f5f5f5] cursor-pointer"
              >
                <div className="font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a]">{c.firstName} {c.lastName}</div>
                <div className="font-['Roboto:Regular',sans-serif] text-[12px] text-[#666]">{c.identityNumber}</div>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
