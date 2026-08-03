import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useNavigate } from "react-router";

interface NewRelationshipModalProps {
  isOpen: boolean;
  onClose: () => void;
  contactId?: string;
}

export function NewRelationshipModal({ 
  isOpen, 
  onClose,
  contactId
}: NewRelationshipModalProps) {
  const navigate = useNavigate();

  const handleMembership = () => {
    // Navigate to Loyalty module (placeholder path - adjust as needed)
    navigate('/loyalty/new-member', { state: { contactId } });
    onClose();
  };

  const handleBusinessCustomer = () => {
    navigate('/customer/customer/new', { state: { type: 'b2bcustomer', contactId } });
    onClose();
  };

  const handlePrivateCustomer = () => {
    navigate('/customer/customer/new', { state: { type: 'b2ccustomer', contactId } });
    onClose();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-[9999]" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border border-[#ccc] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] w-[400px] z-[10000] outline-none">
          {/* Header */}
          <div className="h-[65px] relative shrink-0 w-full">
            <div className="content-stretch flex flex-col items-start pb-px pt-[24px] px-[24px] relative size-full">
              <div className="h-[24px] relative shrink-0 w-full">
                <Dialog.Title className="absolute font-['Roboto_Condensed:Bold',sans-serif] leading-[24px] left-0 not-italic text-[#1a1a1a] text-[16px] top-0 uppercase">
                  New relationship
                </Dialog.Title>
              </div>
            </div>
            <Dialog.Description className="sr-only">
              Select the type of relationship to create
            </Dialog.Description>
          </div>

          {/* Body */}
          <div className="relative shrink-0 w-full pt-[24px] px-[24px] pb-[24px]">
            <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
              <p className="font-['Roboto:Regular',sans-serif] leading-[21px] not-italic text-[#1a1a1a] text-[14px] mb-[8px]">
                Select relationship type:
              </p>

              <button
                onClick={handleMembership}
                className="w-full bg-white h-[48px] border border-[#ccc] rounded-[4px] hover:bg-[#f5f5f5] transition-colors text-left px-[16px]"
              >
                <p className="font-['Roboto:Medium',sans-serif] text-[14px] text-[#1a1a1a]">
                  Membership
                </p>
                <p className="font-['Roboto:Regular',sans-serif] text-[12px] text-[#666] mt-[2px]">
                  Add as a new member in Loyalty module
                </p>
              </button>

              <button
                onClick={handleBusinessCustomer}
                className="w-full bg-white h-[48px] border border-[#ccc] rounded-[4px] hover:bg-[#f5f5f5] transition-colors text-left px-[16px]"
              >
                <p className="font-['Roboto:Medium',sans-serif] text-[14px] text-[#1a1a1a]">
                  Business customer
                </p>
                <p className="font-['Roboto:Regular',sans-serif] text-[12px] text-[#666] mt-[2px]">
                  Create new business customer relationship
                </p>
              </button>

              <button
                onClick={handlePrivateCustomer}
                className="w-full bg-white h-[48px] border border-[#ccc] rounded-[4px] hover:bg-[#f5f5f5] transition-colors text-left px-[16px]"
              >
                <p className="font-['Roboto:Medium',sans-serif] text-[14px] text-[#1a1a1a]">
                  Private customer
                </p>
                <p className="font-['Roboto:Regular',sans-serif] text-[12px] text-[#666] mt-[2px]">
                  Create new private customer relationship
                </p>
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="h-[54px] relative shrink-0 w-full">
            <div className="flex flex-row items-center justify-end size-full">
              <div className="content-stretch flex gap-[8px] items-center justify-end pr-[24px] relative size-full">
                <button
                  onClick={onClose}
                  className="bg-[#eaeaea] h-[30px] relative rounded-[33554400px] shrink-0 px-[16px] hover:bg-[#e0e0e0] transition-colors"
                >
                  <p className="font-['Roboto_Condensed:SemiBold',sans-serif] leading-[19.5px] not-italic text-[#1a1a1a] text-[13px] text-center uppercase">
                    Cancel
                  </p>
                </button>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}