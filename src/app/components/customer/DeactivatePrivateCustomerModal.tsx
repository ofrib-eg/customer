import React, { useState } from "react";

interface DeactivatePrivateCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string, reasonText?: string) => void;
  customerName: string;
}

const deactivationReasons = [
  { value: "business-closed", label: "Business closed" },
  { value: "customer-request", label: "Customer request" },
  { value: "no-longer-purchasing", label: "No longer purchasing" },
  { value: "credit-issues", label: "Credit issues" },
  { value: "merged-with-another", label: "Merged with another" },
  { value: "data-quality-issue", label: "Data quality issue" },
  { value: "other", label: "Other" }
];

export function DeactivatePrivateCustomerModal({
  isOpen,
  onClose,
  onConfirm,
  customerName
}: DeactivatePrivateCustomerModalProps) {
  const [reason, setReason] = useState("");
  const [reasonText, setReasonText] = useState("");

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (!reason) return;
    if (reason === "other" && !reasonText.trim()) return;

    onConfirm(reason, reasonText);
    handleClose();
  };

  const handleClose = () => {
    setReason("");
    setReasonText("");
    onClose();
  };

  const isValid = reason && (reason !== "other" || reasonText.trim());

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={handleClose} />
      
      {/* Modal */}
      <div className="relative bg-white rounded-[4px] shadow-[0px_4px_16px_rgba(0,0,0,0.2)] w-[500px] max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-[20px] py-[16px]">
          <h2 className="font-['Roboto:Bold',sans-serif] text-[16px] leading-[19px] text-[#1a1a1a] uppercase">
            Deactivate Private Customer
          </h2>
        </div>

        {/* Content */}
        <div className="px-[20px] py-[20px]">
          {/* Deactivation Reason */}
          <div className="mb-[20px]">
            <label className="block font-['Roboto:Regular',sans-serif] text-[14px] leading-[17px] text-[#666] mb-[4px]">
              * Deactivation reason
            </label>
            <div className="bg-white h-[32px] relative">
              <div className="overflow-clip relative rounded-[inherit] size-full">
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="absolute font-['Roboto:Regular',sans-serif] inset-[8px_29px_7px_10px] leading-[normal] not-italic text-[#1a1a1a] text-[14px] bg-transparent border-none outline-none w-full appearance-none cursor-pointer"
                >
                  <option value="">Select reason...</option>
                  {deactivationReasons.map(r => (
                    <option key={r.value} value={r.value}>{r.label}</option>
                  ))}
                </select>
                <div className="-translate-y-1/2 absolute right-[6px] size-[20px] top-1/2">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                    <g>
                      <mask height="4" id="mask0_select" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="8" x="6" y="8">
                        <path d="M14 8L10 12L6 8H14Z" fill="var(--fill-0, #666666)" />
                      </mask>
                      <g mask="url(#mask0_select)">
                        <rect fill="var(--fill-0, #666666)" height="20" width="20" />
                      </g>
                    </g>
                  </svg>
                </div>
              </div>
              <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-0 pointer-events-none" />
            </div>
          </div>

          {/* Other Reason Text */}
          {reason === "other" && (
            <div className="mb-[20px]">
              <label className="block font-['Roboto:Regular',sans-serif] text-[14px] leading-[17px] text-[#666] mb-[4px]">
                * Specify reason
              </label>
              <div className="bg-white h-[80px] relative">
                <div className="overflow-clip relative rounded-[inherit] size-full">
                  <textarea
                    value={reasonText}
                    onChange={(e) => setReasonText(e.target.value)}
                    className="absolute font-['Roboto:Regular',sans-serif] inset-[8px_10px] leading-[normal] not-italic text-[#1a1a1a] text-[14px] bg-transparent border-none outline-none w-full resize-none"
                    placeholder="Enter reason..."
                  />
                </div>
                <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-0 pointer-events-none" />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-[8px] px-[20px] py-[16px]">
          <button
            onClick={handleClose}
            className="bg-[#eaeaea] h-[29.993px] px-[15.582px] py-[0.582px] rounded-[19512200px] hover:bg-[#e0e0e0] transition-colors"
          >
            <div aria-hidden="true" className="absolute border-[0.582px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[19512200px]" />
            <p className="font-['Roboto_Condensed:SemiBold',sans-serif] leading-[13px] not-italic text-[#1a1a1a] text-[13px] text-center uppercase">
              Cancel
            </p>
          </button>
          <button
            onClick={handleConfirm}
            disabled={!isValid}
            className="bg-[#1c7862] h-[30px] px-[16px] py-px rounded-[33554400px] border border-[#1c7862] hover:bg-[#248E73] hover:border-[#248E73] transition-colors disabled:bg-[#ccc] disabled:border-[#ccc] disabled:cursor-not-allowed"
          >
            <p className="font-['Roboto_Condensed:SemiBold',sans-serif] leading-[19.5px] not-italic text-[13px] text-center text-white uppercase">
              Confirm
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}