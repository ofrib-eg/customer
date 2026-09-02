import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { InputField } from "./sharedFields";

interface ChangeCustomerNameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
  currentName: string;
}

export function ChangeCustomerNameModal({ isOpen, onClose, onSave, currentName }: ChangeCustomerNameModalProps) {
  const [name, setName] = React.useState(currentName);

  React.useEffect(() => {
    if (isOpen) setName(currentName);
  }, [isOpen, currentName]);

  const isValid = name.trim().length > 0;

  const handleSave = () => {
    if (!isValid) return;
    onSave(name.trim());
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
              Change customer name
            </Dialog.Title>
            <Dialog.Description className="sr-only">Update this customer's display name</Dialog.Description>
          </div>

          {/* Body */}
          <div className="p-[24px]">
            <InputField label="Customer name" value={name} onChange={setName} required />
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
              disabled={!isValid}
              className="bg-[#1c7862] h-[30px] px-[16px] rounded-[33554400px] border border-[#1c7862] hover:bg-[#248E73] hover:border-[#248E73] disabled:bg-[#ccc] disabled:border-[#ccc] disabled:cursor-not-allowed transition-colors"
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
