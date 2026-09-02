import React from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import { mockOffers } from "./offersTypes";

export function OfferRegistryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const offer = mockOffers.find((o) => o.id === id);

  if (!offer) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Offer not found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#F9F9F9] overflow-auto">
      <div className="p-8 max-w-[720px] w-full mx-auto">
        <button
          type="button"
          onClick={() => navigate("/customer/offers")}
          className="flex items-center gap-[6px] mb-[20px] text-[#666] hover:text-[#1a1a1a] cursor-pointer transition-colors"
        >
          <ArrowLeft className="size-[16px]" />
          <span className="font-['Roboto:Regular',sans-serif] text-[14px]">Offers</span>
        </button>

        <div className="bg-white rounded-lg p-8 shadow-sm">
          {/* Header */}
          <div className="mb-[24px]">
            <p className="font-['Roboto_Condensed:Bold',sans-serif] leading-[28px] not-italic text-[#1a1a1a] text-[20px]">
              {offer.offerName}
            </p>
            <p className="font-['Roboto:Regular',sans-serif] text-[14px] text-[#666] mt-[2px]">
              {offer.promotionName} · {offer.id}
            </p>
          </div>

          {/* Meta */}
          <div className="grid grid-cols-3 gap-x-[16px] gap-y-[16px] mb-[28px]">
            <div>
              <p className="font-['Roboto:Regular',sans-serif] text-[12px] text-[#666] uppercase mb-[2px]">Valid from</p>
              <p className="font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a]">{offer.validFrom}</p>
            </div>
            <div>
              <p className="font-['Roboto:Regular',sans-serif] text-[12px] text-[#666] uppercase mb-[2px]">Valid to</p>
              <p className="font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a]">{offer.validTo}</p>
            </div>
            <div>
              <p className="font-['Roboto:Regular',sans-serif] text-[12px] text-[#666] uppercase mb-[2px]">Status</p>
              <p className="font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a]">{offer.status}</p>
            </div>
            <div className="col-span-3">
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
          <div className="mb-[28px]">
            <p className="font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a] mb-[4px]">{offer.requirement}</p>
            <p className="font-['Roboto:Regular',sans-serif] text-[14px] text-[#666]">{offer.discount}</p>
          </div>

          {/* Items */}
          <p className="font-['Roboto_Condensed:Bold',sans-serif] text-[13px] text-[#1a1a1a] uppercase mb-[8px]">Items included</p>
          <div className="border-t border-[#e5e5e5] mb-[28px]">
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
    </div>
  );
}
