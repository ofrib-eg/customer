import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Info } from "lucide-react";

export interface ContactFields {
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: string;
  email: string;
  mobileNumber: string;
  ssn: string;
  loyaltyProgramName: string;
  extIdentityNumber: string;
}

interface EditContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (fields: ContactFields) => void;
  fields: ContactFields;
}

function ModalField({
  label,
  value,
  onChange,
  required
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
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
        className="w-full bg-white border border-[#ccc] h-[32px] px-[10px] text-[14px] font-['Roboto:Regular',sans-serif] text-[#1a1a1a] outline-none focus:border-[#1c7862]"
      />
    </div>
  );
}

export function EditContactModal({ isOpen, onClose, onSave, fields }: EditContactModalProps) {
  const [draft, setDraft] = React.useState<ContactFields>(fields);

  React.useEffect(() => {
    if (isOpen) setDraft(fields);
  }, [isOpen, fields]);

  const update = (key: keyof ContactFields) => (value: string) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    onSave(draft);
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
              Edit contact
            </Dialog.Title>
            <Dialog.Description className="sr-only">
              Edit this customer's contact details
            </Dialog.Description>
          </div>

          {/* Notice */}
          <div className="mx-[24px] mt-[16px] p-[16px] bg-white border border-[#999] rounded-[8px] flex items-start gap-[10px]">
            <Info className="size-[20px] text-[#1a1a1a] shrink-0" />
            <p className="font-['Roboto:Regular',sans-serif] text-[14px] leading-[20px] text-[#1a1a1a]">
              Contact information is shared for all relationships (i.e. customer, member and business contact).
            </p>
          </div>

          {/* Body */}
          <div className="p-[24px] grid grid-cols-2 gap-x-[24px]">
            <ModalField label="First name" value={draft.firstName} onChange={update("firstName")} required />
            <ModalField label="Last name" value={draft.lastName} onChange={update("lastName")} required />
            <ModalField label="Birth date" value={draft.birthDate} onChange={update("birthDate")} />
            <ModalField label="Gender" value={draft.gender} onChange={update("gender")} />
            <ModalField label="Email" value={draft.email} onChange={update("email")} />
            <ModalField label="Mobile number" value={draft.mobileNumber} onChange={update("mobileNumber")} />
            <ModalField label="SSN" value={draft.ssn} onChange={update("ssn")} />
            <ModalField label="Loyalty program name" value={draft.loyaltyProgramName} onChange={update("loyaltyProgramName")} />
            <ModalField label="Ext. identity number" value={draft.extIdentityNumber} onChange={update("extIdentityNumber")} required />
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
