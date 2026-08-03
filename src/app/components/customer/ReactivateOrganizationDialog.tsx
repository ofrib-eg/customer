import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import svgPaths from "@/imports/svg-mllssziw4p";

interface ReactivateOrganizationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (action: 'activate' | 'choose-another' | 'cancel') => void;
  organizationName: string;
}

export function ReactivateOrganizationDialog({ 
  isOpen, 
  onClose, 
  onConfirm,
  organizationName 
}: ReactivateOrganizationDialogProps) {
  const handleYes = () => {
    onConfirm('activate');
  };

  const handleChooseAnother = () => {
    onConfirm('choose-another');
  };

  const handleCancel = () => {
    onConfirm('cancel');
    onClose();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-[9999]" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] w-[600px] z-[10000] outline-none flex flex-col">
          {/* Header */}
          <div className="bg-white h-[64px] relative shrink-0 w-full">
            <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
              <div className="content-stretch flex items-center px-[30px] py-[16px] relative size-full">
                <Dialog.Title className="flex-[1_0_0] font-['Roboto_Condensed:Bold',sans-serif] leading-[19px] min-h-px min-w-px not-italic relative text-[#1a1a1a] text-[16px] uppercase whitespace-pre-wrap">
                  Activate Organization
                </Dialog.Title>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="relative shrink-0 w-full">
            <div className="content-stretch flex flex-col gap-[10px] items-start pb-[16px] pt-[8px] px-[30px] relative w-full">
              <Dialog.Description className="sr-only">
                The organization {organizationName} is currently deactivated. Would you like to activate it along with the customer?
              </Dialog.Description>
              
              {/* Main text */}
              <p className="font-['Roboto:Regular',sans-serif] leading-[1.5] not-italic text-[#191919] text-[15px]">
                The organization <strong>{organizationName}</strong> is currently deactivated. Would you like to activate it along with the customer?
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-white relative shrink-0 w-full">
            <div className="flex flex-row items-center justify-end overflow-clip rounded-[inherit] size-full">
              <div className="content-stretch flex gap-[8px] items-center justify-end px-[20px] py-[10px] relative w-full">
                {/* Cancel Button */}
                <button
                  onClick={handleCancel}
                  className="bg-[#eaeaea] h-[30px] px-[16px] py-[1px] rounded-[19512200px] hover:bg-[#e0e0e0] transition-colors"
                >
                  <p className="font-['Roboto_Condensed:SemiBold',sans-serif] leading-[13px] not-italic text-[#1a1a1a] text-[13px] text-center uppercase">
                    Cancel
                  </p>
                </button>

                {/* Choose Another One Button */}
                <button
                  onClick={handleChooseAnother}
                  className="bg-[#eaeaea] h-[30px] px-[16px] py-[1px] rounded-[19512200px] hover:bg-[#e0e0e0] transition-colors"
                >
                  <p className="font-['Roboto_Condensed:SemiBold',sans-serif] leading-[13px] not-italic text-[#1a1a1a] text-[13px] text-center uppercase">
                    Choose another one
                  </p>
                </button>

                {/* Yes Button */}
                <button
                  onClick={handleYes}
                  className="bg-[#1c7862] h-[30px] px-[16px] py-px rounded-[33554400px] border border-[#1c7862] hover:bg-[#248E73] hover:border-[#248E73] transition-colors"
                >
                  <p className="font-['Roboto_Condensed:SemiBold',sans-serif] leading-[19.5px] not-italic text-[13px] text-center text-white uppercase">
                    Yes
                  </p>
                </button>
              </div>
            </div>
            <div aria-hidden="true" className="absolute border-[#e5e5e5] border-solid border-t inset-0 pointer-events-none" />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}