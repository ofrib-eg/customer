import React, { useState } from "react";

interface DeactivateBusinessCustomerModalProps {
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

export function DeactivateBusinessCustomerModal({
  isOpen,
  onClose,
  onConfirm,
  customerName
}: DeactivateBusinessCustomerModalProps) {
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
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={handleClose}
    >
      <div 
        className="bg-white w-[600px] shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-[20px] pt-[20px] pb-[16px]">
          <h2 className="font-['Roboto_Condensed:Bold',sans-serif] text-[16px] leading-[19px] text-[#1a1a1a] uppercase">
            Deactivate Business Customer
          </h2>
        </div>

        {/* Content */}
        <div className="px-[20px] pb-[20px]">
          <p className="font-['Roboto:Regular',sans-serif] text-[14px] leading-[20px] text-[#1a1a1a] mb-[16px]">
            Are you sure you want to deactivate <strong className="font-['Roboto:Bold',sans-serif]">{customerName}</strong>?
          </p>

          {/* Deactivation Reason */}
          <div className="mb-[16px]">
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
            <div className="mb-[16px]">
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
        <div className="flex items-center justify-end gap-[10px] px-[20px] py-[16px]">
          <button
            onClick={handleClose}
            className="px-[20px] h-[32px] font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a] bg-white hover:bg-[#f5f5f5] transition-colors cursor-pointer uppercase"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!isValid}
            className="px-[20px] h-[32px] font-['Roboto:Bold',sans-serif] text-[14px] text-white bg-[#00897b] hover:bg-[#00796b] transition-colors cursor-pointer uppercase disabled:bg-[#ccc] disabled:cursor-not-allowed"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}