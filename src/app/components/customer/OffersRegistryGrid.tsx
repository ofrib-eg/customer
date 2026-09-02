import React from "react";
import { useNavigate } from "react-router";
import { mockOffers } from "./offersTypes";

const columns = [
  { id: "offerName", label: "Offer name", width: 180 },
  { id: "id", label: "Offer ID", width: 120 },
  { id: "promotionName", label: "Promotion name", width: 260 },
  { id: "validFrom", label: "Valid from", width: 140 },
  { id: "validTo", label: "Valid to", width: 140 },
  { id: "status", label: "Status", width: 130 },
  { id: "scope", label: "Offer type", width: 160 }
];

export function OffersRegistryGrid() {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = React.useState<string | null>(null);

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-white border-t border-white">
      <div className="flex-1 overflow-auto relative overscroll-none">
        <table className="border-separate border-spacing-0 table-fixed w-max">
          <thead>
            <tr className="h-[30px] bg-[#595959]">
              {columns.map((col, idx) => (
                <th
                  key={col.id}
                  className={`px-4 text-left text-[13px] text-white font-medium uppercase tracking-wider sticky top-0 bg-[#595959] ${
                    idx !== columns.length - 1 ? "border-r border-r-white" : ""
                  }`}
                  style={{ width: col.width, minWidth: col.width }}
                >
                  <div className="truncate">{col.label}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="select-none">
            {mockOffers.length === 0 ? (
              <tr className="h-[40px] bg-white">
                <td colSpan={columns.length} className="px-4 text-sm text-[#1A1A1A] border-b border-[#CCCCCC] text-center">
                  No offers available
                </td>
              </tr>
            ) : (
              mockOffers.map((offer) => {
                const isSelected = selectedId === offer.id;
                return (
                  <tr
                    key={offer.id}
                    onClick={() => setSelectedId(offer.id)}
                    onDoubleClick={() => navigate(`/customer/offers/${offer.id}`)}
                    className={`h-[40px] cursor-pointer group ${isSelected ? "bg-[#D2F6E8]" : "bg-white hover:bg-[#F7F7F7]"}`}
                  >
                    {columns.map((col, idx) => (
                      <td
                        key={col.id}
                        className={`px-4 text-sm text-[#1A1A1A] border-b ${
                          isSelected ? "border-[#AFCDBF] bg-[#D2F6E8]" : "border-[#CCCCCC] bg-white group-hover:bg-[#F7F7F7]"
                        } ${idx !== columns.length - 1 ? "border-r border-r-white" : ""} ${col.id === "offerName" ? "cursor-pointer" : ""}`}
                        style={{ width: col.width, minWidth: col.width }}
                        onClick={(e) => {
                          if (col.id === "offerName") {
                            e.stopPropagation();
                            navigate(`/customer/offers/${offer.id}`);
                          }
                        }}
                      >
                        {col.id === "offerName" ? (
                          <span className="truncate block underline">{offer.offerName}</span>
                        ) : col.id === "id" ? (
                          <span className="truncate block">{offer.id}</span>
                        ) : col.id === "promotionName" ? (
                          <span className="truncate block">{offer.promotionName}</span>
                        ) : col.id === "validFrom" ? (
                          <span className="truncate block">{offer.validFrom}</span>
                        ) : col.id === "validTo" ? (
                          <span className="truncate block">{offer.validTo}</span>
                        ) : col.id === "status" ? (
                          <span className="truncate block">{offer.status}</span>
                        ) : col.id === "scope" ? (
                          <span className="truncate block">{offer.scope}</span>
                        ) : null}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
