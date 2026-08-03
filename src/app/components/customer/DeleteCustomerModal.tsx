import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import svgPaths from "@/imports/svg-mllssziw4p";

interface DeleteCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  customerName: string;
  customerType?: "Business customer" | "Private customer";
  // For Private customers
  hasActiveSales?: boolean;
  activeSalesCount?: number;
  // For Business customers
  organizationName?: string;
  isSoleCustomer?: boolean;
}

export function DeleteCustomerModal({
  isOpen,
  onClose,
  onConfirm,
  customerName,
  customerType = "Private customer",
  hasActiveSales = false,
  activeSalesCount = 0,
  organizationName,
  isSoleCustomer = true
}: DeleteCustomerModalProps) {
  const isPrivate = customerType === "Private customer";
  const canDelete = isPrivate ? !hasActiveSales : isSoleCustomer;

  const handleConfirm = () => {
    if (!canDelete) return;
    onConfirm();
    onClose();
  };

  // Get the appropriate message based on the scenario
  const getMessage = () => {
    if (canDelete) {
      return "This customer will permanently be deleted.";
    }
    
    if (isPrivate && hasActiveSales) {
      return `This customer has ${activeSalesCount} active sale${activeSalesCount !== 1 ? 's' : ''} that must be completed or cancelled before deletion.`;
    }
    
    return `This customer is part of the organization "${organizationName}" and cannot be deleted individually.`;
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-[9999]" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] w-[500px] z-[10000] outline-none flex flex-col">
          {/* Header */}
          <div className="bg-white h-[64px] relative shrink-0 w-full">
            <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
              <div className="content-stretch flex items-center px-[30px] py-[16px] relative size-full">
                <Dialog.Title className="flex-[1_0_0] font-['Roboto_Condensed:Bold',sans-serif] leading-[19px] min-h-px min-w-px not-italic relative text-[#1a1a1a] text-[16px] uppercase whitespace-pre-wrap">
                  Delete Customer?
                </Dialog.Title>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="relative shrink-0 w-full">
            <div className="content-stretch flex flex-col gap-[10px] items-start pb-[16px] pt-[8px] px-[30px] relative w-full">
              <Dialog.Description className="sr-only">
                {getMessage()}
              </Dialog.Description>
              
              {canDelete ? (
                // Simple text message when deletion is allowed
                <>
                  <p className="font-['Roboto:Regular',sans-serif] leading-[1.5] not-italic text-[#191919] text-[15px] mb-[10px]">
                    This customer will permanently be deleted. This action cannot be undone.
                  </p>
                </>
              ) : (
                // Alert Box for error cases
                <div className="bg-[#fff3e0] relative rounded-[8px] shrink-0 w-full">
                  <div aria-hidden="true" className="absolute border-[1.719px] border-[#f57c00] border-solid inset-0 pointer-events-none rounded-[8px]" />
                  <div className="content-stretch flex gap-[16px] items-start p-[12px] relative w-full">
                    <div className="flex-[1_0_0] min-h-px min-w-px relative">
                      <div className="content-stretch flex gap-[16px] items-start pl-[8px] relative w-full">
                        {/* Icon */}
                        <div className="overflow-clip relative self-stretch shrink-0 w-[19px]">
                          <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%-0.5px)] size-[19px] top-[calc(50%-0.5px)]">
                            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.9943 18.9943">
                              <path d={svgPaths.p3312c6e0} fill="#f57c00" />
                            </svg>
                          </div>
                        </div>
                        
                        {/* Content */}
                        <div className="content-stretch flex flex-[1_0_0] gap-[24px] items-start min-h-px min-w-px py-[6px] relative">
                          <p className="font-['Roboto:Regular',sans-serif] leading-[21px] not-italic relative shrink-0 text-[#191919] text-[15px]">
                            {getMessage()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="bg-white relative shrink-0 w-full">
            <div className="flex flex-row items-center justify-end overflow-clip rounded-[inherit] size-full">
              <div className="content-stretch flex gap-[8px] items-center justify-end px-[20px] py-[10px] relative w-full">
                {/* Cancel Button */}
                <button
                  onClick={onClose}
                  className="bg-[#eaeaea] h-[30px] px-[16px] py-[1px] rounded-[19512200px] hover:bg-[#e0e0e0] transition-colors"
                >
                  <p className="font-['Roboto_Condensed:SemiBold',sans-serif] leading-[13px] not-italic text-[#1a1a1a] text-[13px] text-center uppercase">
                    {canDelete ? 'CANCEL' : 'CLOSE'}
                  </p>
                </button>

                {/* Confirm Button - only show when can delete */}
                {canDelete && (
                  <button
                    onClick={handleConfirm}
                    className="bg-[#1c7862] h-[30px] px-[16px] py-px rounded-[33554400px] border border-[#1c7862] hover:bg-[#248E73] hover:border-[#248E73] transition-colors"
                  >
                    <p className="font-['Roboto_Condensed:SemiBold',sans-serif] leading-[19.5px] not-italic text-[13px] text-center text-white uppercase">
                      CONFIRM
                    </p>
                  </button>
                )}
              </div>
            </div>
            <div aria-hidden="true" className="absolute border-[#e5e5e5] border-solid border-t inset-0 pointer-events-none" />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}