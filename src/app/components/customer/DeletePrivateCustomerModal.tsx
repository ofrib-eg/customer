import React, { useState } from "react";
import { X, AlertCircle } from "lucide-react";

interface DeletePrivateCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  customerName: string;
  customerId?: string;
}

export function DeletePrivateCustomerModal({
  isOpen,
  onClose,
  onConfirm,
  customerName,
  customerId
}: DeletePrivateCustomerModalProps) {
  if (!isOpen) return null;

  // Check if customer has active sales or credit - example: Melina Andersson has active sale
  const hasActiveSales = customerName === "Melina Andersson";
  const activeSalesCount = hasActiveSales ? 1 : 0;
  const activeCreditAmount = hasActiveSales ? 0 : 0;

  const canDelete = !hasActiveSales && activeCreditAmount === 0;

  const handleConfirm = () => {
    if (!canDelete) return;
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
            Delete Private Customer
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
          {/* Active Sales/Credit Blocker */}
          {!canDelete && (
            <div className="mb-[20px] p-[16px] bg-[#fff3e0] border border-[#ffb74d] rounded-[4px]">
              <div className="flex items-start gap-[12px]">
                <AlertCircle className="w-[20px] h-[20px] text-[#f57c00] flex-shrink-0 mt-[2px]" />
                <div>
                  <p className="font-['Roboto:Bold',sans-serif] text-[14px] leading-[20px] text-[#1a1a1a] mb-[8px]">
                    Cannot delete customer
                  </p>
                  <p className="font-['Roboto:Regular',sans-serif] text-[14px] leading-[20px] text-[#666] mb-[12px]">
                    This customer has ongoing activities that must be resolved before deletion:
                  </p>
                  
                  {/* Active Sales */}
                  {activeSalesCount > 0 && (
                    <div className="mb-[8px] p-[12px] bg-white border border-[#e0e0e0] rounded-[4px]">
                      <div className="flex items-center justify-between mb-[4px]">
                        <span className="font-['Roboto:Medium',sans-serif] text-[13px] leading-[16px] text-[#1a1a1a]">
                          Active Sales
                        </span>
                        <span className="font-['Roboto:Bold',sans-serif] text-[13px] leading-[16px] text-[#f57c00]">
                          {activeSalesCount}
                        </span>
                      </div>
                      <p className="font-['Roboto:Regular',sans-serif] text-[12px] leading-[16px] text-[#666]">
                        All sales must be completed or cancelled before deletion
                      </p>
                    </div>
                  )}

                  {/* Active Credit */}
                  {activeCreditAmount > 0 && (
                    <div className="p-[12px] bg-white border border-[#e0e0e0] rounded-[4px]">
                      <div className="flex items-center justify-between mb-[4px]">
                        <span className="font-['Roboto:Medium',sans-serif] text-[13px] leading-[16px] text-[#1a1a1a]">
                          Outstanding Credit
                        </span>
                        <span className="font-['Roboto:Bold',sans-serif] text-[13px] leading-[16px] text-[#f57c00]">
                          {activeCreditAmount.toLocaleString('sv-SE')} SEK
                        </span>
                      </div>
                      <p className="font-['Roboto:Regular',sans-serif] text-[12px] leading-[16px] text-[#666]">
                        All outstanding credit must be settled before deletion
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Warning */}
          {canDelete && (
            <div className="mb-[20px] p-[16px] bg-[#ffebee] border border-[#ffcdd2] rounded-[4px]">
              <p className="font-['Roboto:Bold',sans-serif] text-[14px] leading-[20px] text-[#d32f2f] mb-[8px]">
                ⚠ Warning: This action is permanent and cannot be undone
              </p>
              <p className="font-['Roboto:Regular',sans-serif] text-[14px] leading-[20px] text-[#666]">
                Private customer "{customerName}" will be permanently deleted from the system.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-[8px] px-[20px] py-[16px] border-t border-[#e0e0e0]">
          <button
            onClick={onClose}
            className="px-[20px] h-[36px] font-['Roboto:Medium',sans-serif] text-[14px] leading-[17px] text-[#1a1a1a] bg-white border border-[#ccc] rounded-[4px] hover:bg-[#f5f5f5] transition-colors"
          >
            {canDelete ? 'Cancel' : 'Close'}
          </button>
          {canDelete && (
            <button
              onClick={handleConfirm}
              className="px-[20px] h-[36px] font-['Roboto:Medium',sans-serif] text-[14px] leading-[17px] text-white bg-[#d32f2f] rounded-[4px] hover:bg-[#b71c1c] transition-colors"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}