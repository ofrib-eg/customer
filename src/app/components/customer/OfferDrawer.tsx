import React from "react";
import { X } from "lucide-react";
import { Offer } from "./offersTypes";

interface OfferDrawerProps {
  offer: Offer | null;
  onClose: () => void;
}

export function OfferDrawer({ offer, onClose }: OfferDrawerProps) {
  if (!offer) return null;

  return (
    <div className="w-[420px] max-w-full shrink-0 bg-white border-l border-[#e5e5e5] flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 px-[24px] pt-[24px] pb-[16px] border-b border-[#e5e5e5] flex items-start justify-between gap-[10px]">
        <div>
          <p className="font-['Roboto_Condensed:Bold',sans-serif] leading-[24px] not-italic text-[#1a1a1a] text-[16px]">
            {offer.offerName}
          </p>
          <p className="font-['Roboto:Regular',sans-serif] text-[13px] text-[#666] mt-[2px]">
            {offer.promotionName}
          </p>
        </div>
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
            <p className="font-['Roboto:Regular',sans-serif] text-[12px] text-[#666] uppercase mb-[2px]">Valid from</p>
            <p className="font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a]">{offer.validFrom}</p>
          </div>
          <div>
            <p className="font-['Roboto:Regular',sans-serif] text-[12px] text-[#666] uppercase mb-[2px]">Valid to</p>
            <p className="font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a]">{offer.validTo}</p>
          </div>
          <div className="col-span-2">
            <p className="font-['Roboto:Regular',sans-serif] text-[12px] text-[#666] uppercase mb-[4px]">Offer type</p>
            <span
              className={`inline-flex items-center px-[10px] py-[2px] rounded-full border font-['Roboto_Condensed',sans-serif] text-[11px] font-bold uppercase ${
                offer.scope === "Personal" ? "border-[#1a1a1a] text-[#1a1a1a]" : "border-[#666] text-[#666]"
              }`}
            >
              {offer.scope}
            </span>
          </div>
        </div>

        {/* Requirement */}
        <p className="font-['Roboto_Condensed:Bold',sans-serif] text-[13px] text-[#1a1a1a] uppercase mb-[8px]">Requirement</p>
        <div className="mb-[24px]">
          <p className="font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a] mb-[4px]">{offer.requirement}</p>
          <p className="font-['Roboto:Regular',sans-serif] text-[14px] text-[#666]">{offer.discount}</p>
        </div>

        {/* Items */}
        <p className="font-['Roboto_Condensed:Bold',sans-serif] text-[13px] text-[#1a1a1a] uppercase mb-[8px]">Items included</p>
        <div className="border-t border-[#e5e5e5] mb-[24px]">
          {offer.items.map((item, index) => (
            <div key={index} className="flex items-center justify-between gap-[10px] py-[10px] border-b border-[#e5e5e5]">
              <p className="font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a] truncate">{item.name}</p>
              <p className="font-['Roboto:Regular',sans-serif] text-[12px] text-[#666] shrink-0">{item.itemNumber}</p>
            </div>
          ))}
        </div>

        {/* Usage */}
        <p className="font-['Roboto_Condensed:Bold',sans-serif] text-[13px] text-[#1a1a1a] uppercase mb-[8px]">Usage</p>
        <div className="grid grid-cols-2 gap-x-[16px] gap-y-[12px]">
          <div>
            <p className="font-['Roboto:Regular',sans-serif] text-[12px] text-[#666] uppercase mb-[2px]">Used</p>
            <p className="font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a]">{offer.usageStatus}</p>
          </div>
          <div>
            <p className="font-['Roboto:Regular',sans-serif] text-[12px] text-[#666] uppercase mb-[2px]">Used on</p>
            <p className="font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a]">{offer.usedDate || "–"}</p>
          </div>
          <div>
            <p className="font-['Roboto:Regular',sans-serif] text-[12px] text-[#666] uppercase mb-[2px]">Times used</p>
            <p className="font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a]">{offer.timesUsed}</p>
          </div>
          <div>
            <p className="font-['Roboto:Regular',sans-serif] text-[12px] text-[#666] uppercase mb-[2px]">Usage limit</p>
            <p className="font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a]">
              {offer.usageLimit === null ? "Unlimited" : `${offer.timesUsed} / ${offer.usageLimit}`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
