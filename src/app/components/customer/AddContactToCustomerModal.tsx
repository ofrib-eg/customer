import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ChevronUp, ChevronDown } from "lucide-react";
import { LinkedContact, createContactFromForm } from "./contactTypes";
import { PhoneCountryCodeSelect } from "./sharedFields";

export type { LinkedContact };

interface AddContactToCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (contact: LinkedContact) => void;
}

function emptyNewContactForm() {
  return {
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    ssn: "",
    birthDate: "",
    gender: "",
    addressLine1: "",
    addressLine2: "",
    postalCode: "",
    city: "",
    country: "",
    phoneNumber: ""
  };
}

function CollapsibleSection({ title, open, onToggle, children }: { title: string; open: boolean; onToggle: () => void; children: React.ReactNode }) {
  return (
    <div className="pt-[4px]">
      <button
        type="button"
        onClick={onToggle}
        className="flex items-center gap-[6px] mb-[12px] cursor-pointer group"
      >
        <span className="font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a] underline underline-offset-2">
          {title}
        </span>
        {open ? <ChevronUp className="size-[14px] text-[#1a1a1a]" /> : <ChevronDown className="size-[14px] text-[#1a1a1a]" />}
      </button>
      {open && <div className="grid grid-cols-2 gap-x-[16px] mb-[8px]">{children}</div>}
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="mb-[16px]">
      <label className="block mb-[4px]">
        <span className={`font-['Roboto:Regular',sans-serif] text-[13px] ${required ? "text-[#D32F2F]" : "text-[#666666]"}`}>
          {required && "* "}{label}
        </span>
      </label>
      {children}
    </div>
  );
}

const inputClass = "w-full h-[32px] px-[10px] border border-[#CCCCCC] font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a] focus:outline-none focus:border-[#1c7862]";

export function AddContactToCustomerModal({ isOpen, onClose, onAdd }: AddContactToCustomerModalProps) {
  const [form, setForm] = React.useState(emptyNewContactForm());
  const [openSections, setOpenSections] = React.useState<Record<string, boolean>>({ personal: false, address: false, other: false });

  const resetAndClose = () => {
    setForm(emptyNewContactForm());
    setOpenSections({ personal: false, address: false, other: false });
    onClose();
  };

  if (!isOpen) return null;

  const toggleSection = (key: string) => setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));

  const isValid = form.firstName.trim().length > 0 && form.lastName.trim().length > 0;

  const handleAdd = () => {
    if (!isValid) return;

    onAdd(createContactFromForm(form));
    resetAndClose();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={resetAndClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-[9999]" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border border-[#ccc] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] w-[480px] max-h-[85vh] overflow-y-auto z-[10000] outline-none">
          {/* Header */}
          <div className="pt-[24px] px-[24px] pb-px">
            <Dialog.Title className="font-['Roboto_Condensed:Bold',sans-serif] leading-[24px] not-italic text-[#1a1a1a] text-[16px] uppercase">
              New contact
            </Dialog.Title>
            <Dialog.Description className="sr-only">Create a new contact for this customer</Dialog.Description>
          </div>

          {/* Content */}
          <div className="p-[24px]">
            <div>
              <Field label="First name" required>
                <input type="text" value={form.firstName} onChange={(e) => setForm((p) => ({ ...p, firstName: e.target.value }))} className={inputClass} />
              </Field>
              <Field label="Last name" required>
                <input type="text" value={form.lastName} onChange={(e) => setForm((p) => ({ ...p, lastName: e.target.value }))} className={inputClass} />
              </Field>
              <Field label="Email">
                <input type="text" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} className={inputClass} />
              </Field>
              <Field label="Mobile">
                <div className="flex gap-[6px]">
                  <PhoneCountryCodeSelect />
                  <input type="text" value={form.mobileNumber} onChange={(e) => setForm((p) => ({ ...p, mobileNumber: e.target.value }))} placeholder="xxx xxx xxx" className={`flex-1 ${inputClass}`} />
                </div>
              </Field>
              <Field label="SSN">
                <input type="text" value={form.ssn} onChange={(e) => setForm((p) => ({ ...p, ssn: e.target.value }))} className={inputClass} />
              </Field>

              <CollapsibleSection title="Personal details" open={openSections.personal} onToggle={() => toggleSection("personal")}>
                <Field label="Birthday">
                  <input type="date" value={form.birthDate} onChange={(e) => setForm((p) => ({ ...p, birthDate: e.target.value }))} className={inputClass} />
                </Field>
                <Field label="Gender">
                  <select value={form.gender} onChange={(e) => setForm((p) => ({ ...p, gender: e.target.value }))} className={`${inputClass} bg-white`}>
                    <option value="">Select...</option>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                  </select>
                </Field>
              </CollapsibleSection>

              <CollapsibleSection title="Home address" open={openSections.address} onToggle={() => toggleSection("address")}>
                <Field label="Address line 1">
                  <input type="text" value={form.addressLine1} onChange={(e) => setForm((p) => ({ ...p, addressLine1: e.target.value }))} className={inputClass} />
                </Field>
                <Field label="Address line 2">
                  <input type="text" value={form.addressLine2} onChange={(e) => setForm((p) => ({ ...p, addressLine2: e.target.value }))} className={inputClass} />
                </Field>
                <Field label="Postal code">
                  <input type="text" value={form.postalCode} onChange={(e) => setForm((p) => ({ ...p, postalCode: e.target.value }))} className={inputClass} />
                </Field>
                <Field label="City">
                  <input type="text" value={form.city} onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))} className={inputClass} />
                </Field>
                <Field label="Country">
                  <input type="text" value={form.country} onChange={(e) => setForm((p) => ({ ...p, country: e.target.value }))} className={inputClass} />
                </Field>
              </CollapsibleSection>

              <CollapsibleSection title="Other" open={openSections.other} onToggle={() => toggleSection("other")}>
                <Field label="Phone number">
                  <div className="flex gap-[6px]">
                    <PhoneCountryCodeSelect />
                    <input type="text" value={form.phoneNumber} onChange={(e) => setForm((p) => ({ ...p, phoneNumber: e.target.value }))} className={`flex-1 ${inputClass}`} />
                  </div>
                </Field>
              </CollapsibleSection>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-[8px] px-[24px] py-[16px] border-t border-[#e5e5e5]">
            <button
              onClick={resetAndClose}
              className="bg-[#eaeaea] h-[30px] px-[16px] rounded-[33554400px] hover:bg-[#e0e0e0] transition-colors"
            >
              <p className="font-['Roboto_Condensed:SemiBold',sans-serif] leading-[19.5px] not-italic text-[#1a1a1a] text-[13px] text-center uppercase">
                Cancel
              </p>
            </button>
            <button
              onClick={handleAdd}
              disabled={!isValid}
              className="bg-[#1c7862] h-[30px] px-[16px] rounded-[33554400px] border border-[#1c7862] hover:bg-[#248E73] hover:border-[#248E73] disabled:bg-[#ccc] disabled:border-[#ccc] disabled:cursor-not-allowed transition-colors"
            >
              <p className="font-['Roboto_Condensed:SemiBold',sans-serif] leading-[19.5px] not-italic text-[13px] text-center text-white uppercase">
                Create
              </p>
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
