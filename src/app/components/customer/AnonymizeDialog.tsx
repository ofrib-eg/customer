import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import InfoIcon from "@/imports/InfoIcon";

interface AnonymizeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (sendReport: boolean, email?: string) => void;
  contactEmail?: string;
  contactName?: string;
  linkedCustomers?: Array<{
    customerNumber: string;
    customerName: string;
    type?: string; // "Private customer", "Member", etc.
  }>;
}

export function AnonymizeDialog({ 
  isOpen, 
  onClose, 
  onConfirm,
  contactEmail = "",
  contactName = "",
  linkedCustomers = []
}: AnonymizeDialogProps) {
  const [sendReport, setSendReport] = useState(true);
  const [email, setEmail] = useState(contactEmail || "");

  const handleConfirm = () => {
    onConfirm(sendReport, sendReport ? email : undefined);
    onClose();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-[9999]" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border border-[#ccc] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] w-[500px] z-[10000] outline-none max-h-[90vh] overflow-auto">
          {/* Header */}
          <div className="h-[65px] relative shrink-0 w-full">
            <div aria-hidden="true" className="absolute border-[#eaeaea] border-b border-solid inset-0 pointer-events-none" />
            <div className="content-stretch flex flex-col items-start pb-px pt-[24px] px-[24px] relative size-full">
              <div className="h-[24px] relative shrink-0 w-full">
                <Dialog.Title className="absolute font-['Roboto_Condensed:Bold',sans-serif] leading-[24px] left-0 not-italic text-[#1a1a1a] text-[16px] top-0 uppercase">
                  Anonymize contact
                </Dialog.Title>
              </div>
            </div>
            <Dialog.Description className="sr-only">
              Anonymize this contact and optionally send a report of the anonymized data
            </Dialog.Description>
          </div>

          {/* Body */}
          <div className="relative shrink-0 w-full pt-[24px] px-[24px] pb-[24px]">
            {/* Radio button section */}
            <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full mb-[24px]">
              <div className="h-[21px] relative shrink-0 w-full">
                <p className="font-['Roboto:Regular',sans-serif] leading-[21px] left-0 not-italic text-[#1a1a1a] text-[14px]">
                  Send a report of the anonymized data?
                </p>
              </div>

              <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
                <label className="content-stretch flex gap-[8px] h-[21px] items-center relative shrink-0 w-full cursor-pointer">
                  <input
                    type="radio"
                    checked={sendReport}
                    onChange={() => setSendReport(true)}
                    className="shrink-0 size-[16px] cursor-pointer"
                  />
                  <div className="h-[21px] relative shrink-0">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                      <p className="font-['Roboto:Regular',sans-serif] leading-[21px] not-italic text-[#1a1a1a] text-[14px]">
                        Yes
                      </p>
                    </div>
                  </div>
                </label>

                <label className="content-stretch flex gap-[8px] h-[21px] items-center relative shrink-0 w-full cursor-pointer">
                  <input
                    type="radio"
                    checked={!sendReport}
                    onChange={() => setSendReport(false)}
                    className="shrink-0 size-[16px] cursor-pointer"
                  />
                  <div className="h-[21px] relative shrink-0">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                      <p className="font-['Roboto:Regular',sans-serif] leading-[21px] not-italic text-[#1a1a1a] text-[14px]">
                        No
                      </p>
                    </div>
                  </div>
                </label>
              </div>

              {/* Email input - conditional */}
              {sendReport && (
                <div className="bg-white h-[36px] relative shrink-0 w-full mt-[4px]">
                  <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                    <div className="content-stretch flex items-center px-[12px] relative size-full">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="j.anderson@acme.com"
                        className="font-['Roboto:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[14px] text-[#1a1a1a] bg-transparent border-none outline-none w-full placeholder:text-[rgba(26,26,26,0.5)]"
                      />
                    </div>
                  </div>
                  <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-0 pointer-events-none" />
                </div>
              )}
            </div>

            {/* Linked Relationships Section */}
            {linkedCustomers.length > 0 && (
              <>
                <div className="mb-[16px]">
                  <p className="font-['Roboto:Regular',sans-serif] leading-[21px] not-italic text-[#1a1a1a] text-[14px]">
                    Linked relationships will be affected:
                  </p>
                </div>

                {/* Customer/Member List */}
                <div className="space-y-[8px] w-full">
                  {linkedCustomers.map((item, index) => (
                    <div key={index} className="bg-[#f5f5f5] content-stretch flex gap-[8px] items-start pb-[11px] pt-[11px] px-[11px] relative rounded-[4px] shrink-0 w-full">
                      <div className="flex-[1_0_0] h-[32px] min-w-px relative">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
                          <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full">
                            <p className="flex-[1_0_0] font-['Roboto:Medium',sans-serif] leading-[16px] min-h-px min-w-px not-italic relative text-[#1a1a1a] text-[13px] whitespace-pre-wrap">
                              {item.customerName}
                            </p>
                          </div>
                          <div className="h-[16px] relative shrink-0 w-full">
                            <p className="font-['Roboto:Regular',sans-serif] leading-[16px] not-italic text-[#666] text-[12px]">
                              {item.type || "Private customer"} #: {item.customerNumber}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-[#666] content-stretch flex h-[18px] items-center px-[6px] relative rounded-[4px] shrink-0">
                        <p className="font-['Roboto:Regular',sans-serif] leading-[18px] not-italic text-white text-[11px] whitespace-nowrap">
                          Will be deactivated
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
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
                <button
                  onClick={handleConfirm}
                  className="bg-[#1c7862] h-[30px] relative rounded-[33554400px] shrink-0 px-[16px] border border-[#1c7862] hover:bg-[#248E73] hover:border-[#248E73] transition-colors"
                >
                  <p className="font-['Roboto_Condensed:SemiBold',sans-serif] leading-[19.5px] not-italic text-[13px] text-center text-white uppercase">
                    Confirm
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