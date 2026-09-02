import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ContactSearchDropdown } from "./ContactSearchDropdown";
import { AddContactToCustomerModal } from "./AddContactToCustomerModal";
import { LinkedContact } from "./contactTypes";

interface AddContactPersonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (contact: LinkedContact) => void;
}

export function AddContactPersonModal({ isOpen, onClose, onAdd }: AddContactPersonModalProps) {
  const [isNewContactOpen, setIsNewContactOpen] = React.useState(false);

  const handleSelectExisting = (contact: LinkedContact) => {
    onAdd(contact);
    onClose();
  };

  const handleAddNew = (contact: LinkedContact) => {
    onAdd(contact);
    setIsNewContactOpen(false);
    onClose();
  };

  return (
    <>
      <Dialog.Root open={isOpen && !isNewContactOpen} onOpenChange={onClose}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/40 z-[9999]" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border border-[#ccc] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] w-[420px] max-h-[85vh] overflow-y-auto z-[10000] outline-none">
            <div className="pt-[24px] px-[24px] pb-px">
              <Dialog.Title className="font-['Roboto_Condensed:Bold',sans-serif] leading-[24px] not-italic text-[#1a1a1a] text-[16px] uppercase">
                Add contact person
              </Dialog.Title>
              <Dialog.Description className="sr-only">Add a new or existing contact person to this customer</Dialog.Description>
            </div>

            <div className="p-[24px]">
              <label className="block font-['Roboto:Regular',sans-serif] text-[13px] text-[#666666] mb-[4px]">
                Search existing contact
              </label>
              <ContactSearchDropdown onSelect={handleSelectExisting} />

              <div className="flex items-center gap-[12px] my-[20px]">
                <div className="flex-1 h-px bg-[#e5e5e5]" />
                <span className="font-['Roboto:Regular',sans-serif] text-[13px] text-[#999]">or</span>
                <div className="flex-1 h-px bg-[#e5e5e5]" />
              </div>

              <button
                type="button"
                onClick={() => setIsNewContactOpen(true)}
                className="w-full h-[30px] rounded-[33554400px] bg-[#eaeaea] flex items-center justify-center gap-[8px] hover:bg-[#e0e0e0] transition-colors cursor-pointer"
              >
                <span className="font-['Roboto_Condensed:SemiBold',sans-serif] leading-[19.5px] not-italic text-[13px] text-[#1a1a1a] uppercase">
                  New contact
                </span>
              </button>
            </div>

            <div className="flex items-center justify-end gap-[8px] px-[24px] py-[16px] border-t border-[#e5e5e5]">
              <button
                onClick={onClose}
                className="bg-[#eaeaea] h-[30px] px-[16px] rounded-[33554400px] hover:bg-[#e0e0e0] transition-colors"
              >
                <p className="font-['Roboto_Condensed:SemiBold',sans-serif] leading-[19.5px] not-italic text-[#1a1a1a] text-[13px] text-center uppercase">
                  Cancel
                </p>
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <AddContactToCustomerModal
        isOpen={isOpen && isNewContactOpen}
        onClose={() => setIsNewContactOpen(false)}
        onAdd={handleAddNew}
      />
    </>
  );
}
