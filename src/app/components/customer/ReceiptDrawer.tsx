import React from "react";
import { X, MoreHorizontal } from "lucide-react";
import { Receipt } from "./salesTypes";

interface ReceiptDrawerProps {
  receipt: Receipt | null;
  onClose: () => void;
}

const currency = (value: number) => `${value.toFixed(2)} kr`;

export function ReceiptDrawer({ receipt, onClose }: ReceiptDrawerProps) {
  if (!receipt) return null;

  return (
    <div className="w-[420px] max-w-full shrink-0 bg-white border-l border-[#e5e5e5] flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 px-[24px] pt-[24px] pb-[16px] border-b border-[#e5e5e5] flex items-start justify-between gap-[10px]">
        <p className="font-['Roboto_Condensed:Bold',sans-serif] leading-[24px] not-italic text-[#1a1a1a] text-[16px]">
          Receipt {receipt.receiptDate}
        </p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="p-[6px] -m-[6px] rounded-full text-[#666] hover:text-[#1a1a1a] hover:bg-[#f5f5f5] cursor-pointer transition-colors shrink-0"
        >
          <X className="size-[18px]" />
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 px-[24px] py-[20px]">
        {/* Meta */}
        <div className="grid grid-cols-2 gap-x-[16px] gap-y-[12px] mb-[24px]">
          <div>
            <p className="font-['Roboto:Regular',sans-serif] text-[12px] text-[#666] uppercase mb-[2px]">Receipt number</p>
            <p className="font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a]">{receipt.receiptNumber}</p>
          </div>
          <div>
            <p className="font-['Roboto:Regular',sans-serif] text-[12px] text-[#666] uppercase mb-[2px]">Date</p>
            <p className="font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a]">{receipt.receiptDate} · {receipt.receiptTime}</p>
          </div>
          <div>
            <p className="font-['Roboto:Regular',sans-serif] text-[12px] text-[#666] uppercase mb-[2px]">Store</p>
            <p className="font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a]">{receipt.storeNumber} · {receipt.storeName}</p>
          </div>
          <div>
            <p className="font-['Roboto:Regular',sans-serif] text-[12px] text-[#666] uppercase mb-[2px]">Payment type</p>
            <p className="font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a]">{receipt.paymentType}</p>
          </div>
        </div>

        {/* Items */}
        <p className="font-['Roboto_Condensed:Bold',sans-serif] text-[13px] text-[#1a1a1a] uppercase mb-[8px]">Items</p>
        <div className="border-t border-[#e5e5e5]">
          {receipt.items.map((item, index) => (
            <div key={index} className="flex items-center justify-between gap-[10px] py-[10px] border-b border-[#e5e5e5]">
              <div className="min-w-0">
                <p className="font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a] truncate">{item.name}</p>
                <p className="font-['Roboto:Regular',sans-serif] text-[12px] text-[#666]">
                  {item.quantity} × {currency(item.unitPrice)}
                </p>
              </div>
              <p className="font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a] shrink-0">{currency(item.lineTotal)}</p>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="mt-[16px] flex flex-col gap-[6px]">
          <div className="flex items-center justify-between">
            <p className="font-['Roboto:Regular',sans-serif] text-[14px] text-[#666]">Subtotal</p>
            <p className="font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a]">{currency(receipt.subtotal)}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-['Roboto:Regular',sans-serif] text-[14px] text-[#666]">VAT ({receipt.vatRate}%)</p>
            <p className="font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a]">{currency(receipt.vat)}</p>
          </div>
          <div className="flex items-center justify-between pt-[8px] border-t border-[#e5e5e5] mt-[4px]">
            <p className="font-['Roboto_Condensed:Bold',sans-serif] text-[15px] text-[#1a1a1a] uppercase">Total</p>
            <p className="font-['Roboto_Condensed:Bold',sans-serif] text-[15px] text-[#1a1a1a]">{currency(receipt.total)}</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="sticky bottom-0 bg-white flex items-center justify-end gap-[8px] px-[24px] py-[16px] border-t border-[#e5e5e5]">
        <button
          type="button"
          aria-label="More options"
          className="size-[36px] rounded-full flex items-center justify-center hover:bg-[#f5f5f5] cursor-pointer shrink-0 transition-colors"
        >
          <MoreHorizontal className="size-[18px] text-[#1a1a1a]" />
        </button>
        <button
          type="button"
          className="h-[30px] px-[16px] rounded-[33554400px] bg-[#eaeaea] hover:bg-[#e0e0e0] transition-colors cursor-pointer"
        >
          <span className="font-['Roboto_Condensed:SemiBold',sans-serif] leading-[19.5px] not-italic text-[13px] text-[#1a1a1a] uppercase">
            Export
          </span>
        </button>
      </div>
    </div>
  );
}
