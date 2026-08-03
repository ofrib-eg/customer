import React from "react";

interface OrganizationDeletedDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
  organizationName: string;
}

export function OrganizationDeletedDialog({ 
  isOpen, 
  onClose, 
  onContinue,
  organizationName 
}: OrganizationDeletedDialogProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div 
        className="bg-white w-[600px] shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-[20px] pt-[20px] pb-[16px]">
          <h2 className="font-['Roboto_Condensed:Bold',sans-serif] text-[16px] leading-[19px] text-[#1a1a1a] uppercase">
            Organization Deleted
          </h2>
        </div>

        {/* Content */}
        <div className="px-[20px] pb-[20px]">
          <p className="font-['Roboto:Regular',sans-serif] text-[14px] leading-[20px] text-[#1a1a1a]">
            The organization tied to <strong className="font-['Roboto:Bold',sans-serif]">{organizationName}</strong> was permanently deleted when the customer was deactivated. Add a new organization in order to activate the customer.
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-[10px] px-[20px] py-[16px]">
          <button
            onClick={onClose}
            className="px-[20px] h-[32px] font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a] bg-white hover:bg-[#f5f5f5] transition-colors cursor-pointer uppercase"
          >
            Cancel
          </button>
          <button
            onClick={onContinue}
            className="px-[20px] h-[32px] font-['Roboto:Bold',sans-serif] text-[14px] text-white bg-[#00897b] hover:bg-[#00796b] transition-colors cursor-pointer uppercase"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}