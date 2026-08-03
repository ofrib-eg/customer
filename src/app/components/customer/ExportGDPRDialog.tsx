import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";

interface ExportGDPRDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (includeRelated: boolean, email: string) => void;
  contactEmail?: string;
}

export function ExportGDPRDialog({ 
  isOpen, 
  onClose, 
  onConfirm,
  contactEmail = ""
}: ExportGDPRDialogProps) {
  const [includeRelated, setIncludeRelated] = useState(true);
  const [email, setEmail] = useState(contactEmail || "");

  const handleConfirm = () => {
    onConfirm(includeRelated, email);
    onClose();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-[9999]" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border border-[#CCCCCC] shadow-lg w-[500px] z-[10000] outline-none">
          {/* Header */}
          <div className="px-6 pt-6 pb-4">
            <Dialog.Title className="text-[16px] font-['Roboto_Condensed:Bold',sans-serif] uppercase text-[#1A1A1A]">
              Export GDPR data
            </Dialog.Title>
            <Dialog.Description className="sr-only">
              Export GDPR data for this contact with optional related information
            </Dialog.Description>
          </div>

          {/* Body */}
          <div className="px-6 py-6 space-y-6">
            {/* Question */}
            <div className="space-y-3">
              <p className="text-[14px] font-['Roboto:Regular',sans-serif] text-[#1A1A1A]">
                Do you wish to include related customer and membership information in the report?
              </p>
              
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={includeRelated}
                    onChange={() => setIncludeRelated(true)}
                    className="w-4 h-4 cursor-pointer"
                  />
                  <span className="text-[14px] font-['Roboto:Regular',sans-serif] text-[#1A1A1A]">
                    Yes
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={!includeRelated}
                    onChange={() => setIncludeRelated(false)}
                    className="w-4 h-4 cursor-pointer"
                  />
                  <span className="text-[14px] font-['Roboto:Regular',sans-serif] text-[#1A1A1A]">
                    No
                  </span>
                </label>
              </div>
            </div>

            {/* Email input - always shown */}
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@domain.com"
                className="w-full h-[36px] px-3 border border-[#CCCCCC] bg-white text-[14px] font-['Roboto:Regular',sans-serif] text-[#1A1A1A] outline-none focus:border-[#999999]"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 pb-6 flex items-center justify-end gap-2">
            <button
              onClick={onClose}
              className="h-[30px] px-[15px] bg-[#EAEAEA] text-[#1A1A1A] rounded-full flex items-center justify-center hover:bg-[#E0E0E0] cursor-pointer outline-none text-[13px] font-semibold uppercase tracking-[0px] font-roboto-condensed border border-transparent"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="h-[30px] px-[15px] bg-[#1C7862] text-white rounded-full flex items-center justify-center hover:bg-[#248E73] cursor-pointer outline-none text-[13px] font-semibold uppercase tracking-[0px] font-roboto-condensed border border-[#1C7862] hover:border-[#248E73]"
            >
              Send
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}