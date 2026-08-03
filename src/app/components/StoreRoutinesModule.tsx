import React, { useState } from "react";
import FilterIcon from "@/imports/Icon-9-4205";
import { ItemGroupPanel } from "./ItemGroupPanel";
import { StoreRoutinesGrid } from "./StoreRoutinesGrid";
import { AttributeDropdown } from "./AttributeDropdown";

interface ActionButtonProps {
  children: React.ReactNode;
  isPrimary?: boolean;
  isActive?: boolean;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  hasIcon?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({ 
  children, 
  isPrimary = false, 
  isActive = false,
  className = "", 
  onClick, 
  disabled,
  hasIcon = false
}) => {
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`h-[30px] flex items-center justify-center text-[13px] font-semibold uppercase tracking-[0px] rounded-full transition-colors leading-none font-roboto-condensed cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed px-[15px] min-w-[50px] border whitespace-nowrap ${
      isPrimary 
        ? "bg-[#1C7862] text-white hover:bg-[#248E73] border-[#1C7862] hover:border-[#248E73]" 
        : isActive
          ? "bg-[#373737] text-white border-[#373737] hover:bg-[#373737]"
          : "bg-[#EAEAEA] text-[#1A1A1A] border-transparent hover:bg-[#E0E0E0]"
    } ${hasIcon ? "gap-1.5" : ""} ${className}`}
    >
      {children}
    </button>
  );
};

export const StoreRoutinesModule = ({ 
  isItemPanelOpen, 
  setIsItemPanelOpen, 
  gridRef, 
  onOpenItemDetails, 
  onSelectionChange, 
  onDataChange,
  onOpenNewItemModal,
  attributeFilter,
  setAttributeFilter,
  data,
  currentWindowStates,
  onApplyWindowStates
}: {
  isItemPanelOpen: boolean;
  setIsItemPanelOpen: (open: boolean) => void;
  gridRef: React.RefObject<any>;
  onOpenItemDetails: () => void;
  onSelectionChange: (items: any[]) => void;
  onDataChange: (items: any[]) => void;
  onOpenNewItemModal: () => void;
  attributeFilter: string;
  setAttributeFilter: (val: string) => void;
  data: any[];
  currentWindowStates?: Record<string, any>;
  onApplyWindowStates?: (states: Record<string, any>) => void;
}) => {
  const [selectedGroupIds, setSelectedGroupIds] = useState<Set<string>>(new Set());
  const [expandedGroupIds, setExpandedGroupIds] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<string>("All");
  const [isMemberOffer, setIsMemberOffer] = useState(false);
  const [isMix, setIsMix] = useState(false);
  const [isPromotionPrice, setIsPromotionPrice] = useState(false);
  const [promotionType, setPromotionType] = useState<string>("");
  const [gridFilterCount, setGridFilterCount] = useState(0);
  const [gridFilters, setGridFilters] = useState<Record<string, string>>({});
  const [gridFilterModes, setGridFilterModes] = useState<Record<string, string>>({});
  const filterCount = selectedGroupIds.size + gridFilterCount + (isMemberOffer ? 1 : 0) + (isMix ? 1 : 0) + (isPromotionPrice ? 1 : 0) + (promotionType ? 1 : 0) + (attributeFilter ? 1 : 0);

  const handleClearAll = () => {
    setGridFilters({});
    setGridFilterModes({});
    setAttributeFilter("");
    setIsMemberOffer(false);
    setIsMix(false);
    setIsPromotionPrice(false);
    setPromotionType("");
    setSelectedGroupIds(new Set());
    setExpandedGroupIds(new Set());
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setIsMemberOffer(false);
    setIsMix(false);
    setIsPromotionPrice(false);
    setPromotionType("");
    setAttributeFilter("");
  };

  return (
    <div className="flex-1 flex flex-row overflow-hidden min-w-0 relative bg-white">
      <ItemGroupPanel 
        isOpen={isItemPanelOpen} 
        onToggle={() => setIsItemPanelOpen(!isItemPanelOpen)} 
        selectedIds={selectedGroupIds} 
        setSelectedIds={setSelectedGroupIds} 
        expandedIds={expandedGroupIds} 
        setExpandedIds={setExpandedGroupIds}
        onClearAll={handleClearAll}
        data={data}
        currentWindowStates={currentWindowStates}
        onApplyWindowStates={onApplyWindowStates}
        totalFilterCount={filterCount}
        presetKey="store_routines_filter_presets"
        activeTab={activeTab}
        onTabChange={handleTabChange}
        gridFilters={gridFilters}
        onGridFiltersChange={setGridFilters}
        gridFilterModes={gridFilterModes}
        onGridFilterModesChange={setGridFilterModes}
        isMemberOffer={isMemberOffer}
        onMemberOfferChange={setIsMemberOffer}
        isMix={isMix}
        onMixChange={setIsMix}
        isPromotionPrice={isPromotionPrice}
        onPromotionPriceChange={setIsPromotionPrice}
        promotionType={promotionType}
        onPromotionTypeChange={setPromotionType}
        attributeFilter={attributeFilter}
        onAttributeFilterChange={setAttributeFilter}
      />
      <div className="flex-1 flex flex-col overflow-hidden min-w-0 pt-[30px] pb-[20px] pl-[30px] pr-[30px]">
        <div className="mb-[10px] flex justify-start items-end gap-[30px]">
          <button onClick={() => setIsItemPanelOpen(!isItemPanelOpen)} className="h-[30px] px-4 flex items-center justify-center rounded-full bg-[#EAEAEA] hover:bg-[#E0E0E0] transition-colors cursor-pointer relative min-w-[50px] whitespace-nowrap">
            <div className="w-[14px] h-[11.5px] scale-[1.1]"><FilterIcon /></div>
            {filterCount > 0 && <span className="absolute -top-[8px] -right-[10px] flex items-center justify-center bg-[#373737] text-white text-[12px] font-bold rounded-full min-w-[22px] h-[22px] px-1 border-2 border-white">{filterCount}</span>}
          </button>
          
          <div className="flex gap-2">
            <ActionButton 
              isActive={activeTab === "All"}
              onClick={() => handleTabChange("All")}
            >
              All
            </ActionButton>
            <ActionButton 
              isActive={activeTab === "Promotions"}
              onClick={() => handleTabChange("Promotions")}
            >
              Promotions
            </ActionButton>
            <ActionButton 
              isActive={activeTab === "Local values"}
              onClick={() => handleTabChange("Local values")}
            >
              Local values
            </ActionButton>
            <ActionButton 
              isActive={activeTab === "Local items"}
              onClick={() => handleTabChange("Local items")}
            >
              Local items
            </ActionButton>
          </div>
          
          {activeTab === "Local values" && (
            <AttributeDropdown 
              value={attributeFilter}
              onChange={setAttributeFilter}
              placeholder="All"
              options={[
                "Alarm item",
                "Auto replenishment",
                "Available in store",
                "Best before",
                "Can be ordered",
                "Change VAT",
                "Country of origin",
                "Item declaration",
                "Item type",
                "Label text 2",
                "Phase in date",
                "Phase out date",
                "Scale label",
                "Self service",
                "Self service weights",
                "Shelf life (days)",
                "Special group",
                "Stop sale",
                "Stop sale reason code",
                "Tara (kg)",
                "Weight control"
              ]}
            />
          )}
          
          {activeTab === "Promotions" && (
            <div className="flex items-end gap-6 h-[30px]">
              <AttributeDropdown 
                value={promotionType}
                onChange={setPromotionType}
                placeholder="Promotion type"
                options={["Central", "Voluntary", "Local"]}
              />

              <div 
                className="flex gap-[10px] items-end cursor-pointer select-none group h-[30px]"
                onClick={() => setIsPromotionPrice(!isPromotionPrice)}
              >
                <div className={`size-[16px] transition-colors flex items-center justify-center border shrink-0 mb-[5px] ${isPromotionPrice ? 'bg-[#595959] border-[#595959]' : 'bg-white border-[#ccc]'}`}>
                  {isPromotionPrice && (
                    <svg className="size-[12px]" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 6L5 8.5L9.5 4" stroke="white" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" />
                    </svg>
                  )}
                </div>
                <span className="text-[#1A1A1A] text-[14px] leading-none mb-[5px] whitespace-nowrap">Promotion price</span>
              </div>

              <div 
                className="flex gap-[10px] items-end cursor-pointer select-none group h-[30px]"
                onClick={() => setIsMix(!isMix)}
              >
                <div className={`size-[16px] transition-colors flex items-center justify-center border shrink-0 mb-[5px] ${isMix ? 'bg-[#595959] border-[#595959]' : 'bg-white border-[#ccc]'}`}>
                  {isMix && (
                    <svg className="size-[12px]" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 6L5 8.5L9.5 4" stroke="white" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" />
                    </svg>
                  )}
                </div>
                <span className="text-[#1A1A1A] text-[14px] leading-none mb-[5px] whitespace-nowrap">Mix offer</span>
              </div>

              <div 
                className="flex gap-[10px] items-end cursor-pointer select-none group h-[30px]"
                onClick={() => setIsMemberOffer(!isMemberOffer)}
              >
                <div className={`size-[16px] transition-colors flex items-center justify-center border shrink-0 mb-[5px] ${isMemberOffer ? 'bg-[#595959] border-[#595959]' : 'bg-white border-[#ccc]'}`}>
                  {isMemberOffer && (
                    <svg className="size-[12px]" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 6L5 8.5L9.5 4" stroke="white" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" />
                    </svg>
                  )}
                </div>
                <span className="text-[#1A1A1A] text-[14px] leading-none mb-[5px] whitespace-nowrap">Member offer</span>
              </div>
            </div>
          )}
        </div>
        <StoreRoutinesGrid 
          ref={gridRef} 
          onOpenItemDetails={onOpenItemDetails} 
          onSelectionChange={onSelectionChange} 
          onDataChange={onDataChange}
          selectedGroupIds={selectedGroupIds}
          activeTab={activeTab}
          isMemberOfferFilter={isMemberOffer}
          isMixFilter={isMix}
          isPromotionPriceFilter={isPromotionPrice}
          promotionTypeFilter={promotionType}
          attributeFilter={attributeFilter}
          onFilterCountChange={setGridFilterCount}
          data={data}
          filters={gridFilters}
          onFiltersChange={setGridFilters}
          filterModes={gridFilterModes}
          onFilterModesChange={setGridFilterModes}
        />
      </div>
    </div>
  );
};
