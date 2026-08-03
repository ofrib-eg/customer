import React, { useState } from "react";
import { X } from "lucide-react";

interface DeleteBusinessCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  customerName: string;
  organizationName?: string;
  isSoleCustomer?: boolean;
}

export function DeleteBusinessCustomerModal({
  isOpen,
  onClose,
  onConfirm,
  customerName,
  organizationName,
  isSoleCustomer = false
}: DeleteBusinessCustomerModalProps) {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      
      {/* Modal */}
      <div className="relative bg-white rounded-[4px] shadow-[0px_4px_16px_rgba(0,0,0,0.2)] w-[500px] max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-[20px] py-[16px] border-b border-[#e0e0e0]">
          <h2 className="font-['Roboto:Bold',sans-serif] text-[16px] leading-[19px] text-[#1a1a1a] uppercase">
            Delete Business Customer
          </h2>
          <button
            onClick={onClose}
            className="w-[24px] h-[24px] flex items-center justify-center hover:bg-[#f0f0f0] rounded-[2px] transition-colors"
          >
            <X className="w-[16px] h-[16px] text-[#666]" />
          </button>
        </div>

        {/* Content */}
        <div className="px-[20px] py-[20px]">
          {/* Warning */}
          <div className="mb-[20px] p-[16px] bg-[#ffebee] border border-[#ffcdd2] rounded-[4px]">
            <p className="font-['Roboto:Bold',sans-serif] text-[14px] leading-[20px] text-[#d32f2f] mb-[8px]">
              ⚠ Warning: This action is permanent and cannot be undone
            </p>
            <p className="font-['Roboto:Regular',sans-serif] text-[14px] leading-[20px] text-[#666]">
              Business customer "{customerName}" will be permanently deleted from the system.
            </p>
            {isSoleCustomer && organizationName && (
              <p className="font-['Roboto:Regular',sans-serif] text-[14px] leading-[20px] text-[#666] mt-[8px]">
                The linked organization "{organizationName}" will also be permanently deleted.
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-[8px] px-[20px] py-[16px] border-t border-[#e0e0e0]">
          <button
            onClick={onClose}
            className="px-[20px] h-[36px] font-['Roboto:Medium',sans-serif] text-[14px] leading-[17px] text-[#1a1a1a] bg-white border border-[#ccc] rounded-[4px] hover:bg-[#f5f5f5] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-[20px] h-[36px] font-['Roboto:Medium',sans-serif] text-[14px] leading-[17px] text-white bg-[#d32f2f] rounded-[4px] hover:bg-[#b71c1c] transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}