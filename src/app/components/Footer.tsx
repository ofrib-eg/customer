import React, { useState, useRef, useLayoutEffect, useEffect, useMemo } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import { MoreHorizontal, ChevronRight } from "lucide-react";
import * as Popover from "@radix-ui/react-popover";
import Icon from "@/imports/Icon-10-653";
import svgPathsMore from "@/imports/svg-oqev7ygrue";
import { useModified } from "@/app/contexts/ModifiedContext";
import { NewOrganizationChoiceModal } from "./customer/NewOrganizationChoiceModal";
import { ChooseOrganizationSearchModal } from "./customer/ChooseOrganizationSearchModal";

// Try to import useContact but don't fail if not available
let useContact: any;
try {
  useContact = require("@/app/contexts/ContactContext").useContact;
} catch {
  // Context not available
}

interface ActionButtonProps {
  children: React.ReactNode;
  isPrimary?: boolean;
  isActive?: boolean;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  hasIcon?: boolean;
}

const ActionButton = React.forwardRef<HTMLButtonElement, ActionButtonProps>(({ 
  children, 
  isPrimary = false, 
  isActive = false,
  className = "", 
  onClick, 
  disabled,
  hasIcon = false
}, ref) => (
  <button 
    ref={ref}
    onClick={onClick}
    disabled={disabled}
    className={`h-[30px] flex items-center justify-center text-[13px] font-semibold uppercase tracking-[0px] rounded-full leading-none font-roboto-condensed cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed px-[15px] border whitespace-nowrap ${
    isPrimary 
      ? "bg-[#1C7862] text-white hover:bg-[#248E73] border-[#1C7862] hover:border-[#248E73]" 
      : isActive
        ? "bg-[#373737] text-white border-[#373737] hover:bg-[#373737]"
        : "bg-[#EAEAEA] text-[#1A1A1A] border-transparent hover:bg-[#E0E0E0]"
  } ${hasIcon ? "gap-1.5" : ""} ${className}`}
  >
    {children}
  </button>
));

interface FooterItem {
  id: string;
  label: string;
  isPrimary?: boolean;
  onClick?: () => void;
  hasIcon?: boolean;
  disabled?: boolean;
  popoverContent?: React.ReactNode;
  popoverOpen?: boolean;
  onPopoverOpenChange?: (open: boolean) => void;
}

export function Footer({ 
  onNewItem, 
  onOpenItemDetails, 
  onOpenLocalValues,
  onOpenActivePrice,
  onOpenFuturePrice,
  onOpenPriceHistory,
  onOpenLowest30Days,
  onOpenPromotionPrice,
  onOpenStorePrice,
  onOpenSales,
  onOpenItemDeclaration,
  onExportExcel,
  onSave,
  onClose,
  forceDetailsMode,
  detailsDisabled,
  isStoreRoutines,
  isItemsInPromotions,
  isPromotion,
  isItemDetails,
  isModified,
  modifiedCount,
  hideSecondary,
  onNewContact,
  onNewCustomer,
  onAnonymizeContact,
  onExportGDPR,
  isContactAnonymized,
  isCustomerInactive,
  onDeactivateCustomer,
  onActivateCustomer
}: { 
  onNewItem?: () => void; 
  onOpenItemDetails?: () => void; 
  onOpenActivePrice?: () => void;
  onOpenFuturePrice?: () => void;
  onOpenPriceHistory?: () => void;
  onOpenLowest30Days?: () => void;
  onOpenPromotionPrice?: () => void;
  onOpenStorePrice?: () => void;
  onOpenSales?: () => void;
  onOpenItemDeclaration?: () => void;
  onExportExcel?: () => void;
  onSave?: () => void;
  onClose?: () => void;
  forceDetailsMode?: boolean;
  detailsDisabled?: boolean;
  isStoreRoutines?: boolean;
  isItemsInPromotions?: boolean;
  isPromotion?: boolean;
  isItemDetails?: boolean;
  isModified?: boolean;
  modifiedCount?: number;
  hideSecondary?: boolean;
  onNewContact?: () => void;
  onNewCustomer?: () => void;
  onAnonymizeContact?: () => void;
  onExportGDPR?: () => void;
  isContactAnonymized?: boolean;
  isCustomerInactive?: boolean;
  onDeactivateCustomer?: () => void;
  onActivateCustomer?: () => void;
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const isPopup = forceDetailsMode;
  const isFullDetailsPage = location.pathname === "/item-details" && !forceDetailsMode;
  const isContactsPage = location.pathname === "/customer/contacts";
  const isCustomerPage = location.pathname === "/customer/customer";
  const isOrganizationsPage = location.pathname === "/customer/organizations";
  const isContactDetailPage = location.pathname.match(/^\/customer\/contacts\/(\d+)$/);
  const isCustomerDetailPage = location.pathname.match(/^\/customer\/customer\/(\d+)$/);
  const isNewCustomerPage = location.pathname === "/customer/new";
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "details";
  const isStorePriceTab = activeTab === "store-price";
  const isLocalValuesTab = activeTab === "local-values";
  const isCustomerSalesOrOffersTab = activeTab === "sales" || activeTab === "offers";
  
  // Try to use contact context if available
  let contactAnonymized = isContactAnonymized;
  if (isContactDetailPage && useContact) {
    try {
      const context = useContact();
      const contactId = parseInt(isContactDetailPage[1]);
      contactAnonymized = context?.isContactAnonymized(contactId) || false;
    } catch {
      // Context not available, use prop
    }
  }
  
  const [isOpen, setIsOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isLocalValuesOpen, setIsLocalValuesOpen] = useState(false);
  const [isNewOrgChoiceOpen, setIsNewOrgChoiceOpen] = useState(false);
  const [isOrgSearchOpen, setIsOrgSearchOpen] = useState(false);

  useEffect(() => {
    // Enter key handling removed as requested
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState<number>(100);
  const itemWidthsRef = useRef<Record<string, number>>({});
  const moreButtonWidthRef = useRef<number>(60); // Default estimate

  const storeRoutinesItems: FooterItem[] = [
    {
      id: "export",
      label: "Export to Excel",
      onClick: onExportExcel
    },
    {
      id: "sales",
      label: "Sales",
      hasIcon: true,
      onClick: onOpenSales
    },
    {
      id: "price",
      label: "Price",
      hasIcon: true,
      popoverOpen: isPriceOpen,
      onPopoverOpenChange: setIsPriceOpen,
      popoverContent: (
        <div className="flex flex-col py-1">
          <button
            onClick={() => { onOpenActivePrice?.(); setIsPriceOpen(false); }}
            className="text-left text-[14px] font-normal text-[#1A1A1A] hover:bg-[#EAEAEA] relative outline-none cursor-pointer flex items-center h-[36px] w-full pl-4 whitespace-nowrap"
          >
            <span>Active price</span>
          </button>
          <button
            onClick={() => { onOpenFuturePrice?.(); setIsPriceOpen(false); }}
            className="text-left text-[14px] font-normal text-[#1A1A1A] hover:bg-[#EAEAEA] relative outline-none cursor-pointer flex items-center h-[36px] w-full pl-4 whitespace-nowrap"
          >
            <span>Planned price</span>
          </button>
          <button
            onClick={() => { onOpenPriceHistory?.(); setIsPriceOpen(false); }}
            className="text-left text-[14px] font-normal text-[#1A1A1A] hover:bg-[#EAEAEA] relative outline-none cursor-pointer flex items-center h-[36px] w-full pl-4 whitespace-nowrap"
          >
            <span>Price history</span>
          </button>
          <button
            onClick={() => { onOpenLowest30Days?.(); setIsPriceOpen(false); }}
            className="text-left text-[14px] font-normal text-[#1A1A1A] hover:bg-[#EAEAEA] relative outline-none cursor-pointer flex items-center h-[36px] w-full pl-4 whitespace-nowrap"
          >
            <span>Lowest 30 days</span>
          </button>
          <button
            onClick={() => { 
              onOpenActivePrice?.(); 
              onOpenFuturePrice?.(); 
              onOpenPriceHistory?.(); 
              onOpenLowest30Days?.(); 
              setIsPriceOpen(false); 
            }}
            className="text-left text-[14px] font-normal text-[#1A1A1A] hover:bg-[#EAEAEA] relative outline-none cursor-pointer flex items-center h-[36px] w-full pl-4 border-t border-[#EAEAEA] whitespace-nowrap"
          >
            <span>All</span>
          </button>
        </div>
      )
    },
    {
      id: "local-values",
      label: "Local values",
      hasIcon: true,
      popoverOpen: isLocalValuesOpen,
      onPopoverOpenChange: setIsLocalValuesOpen,
      popoverContent: (
        <div className="flex flex-col py-1">
          <button
            onClick={() => { onOpenLocalValues?.(); setIsLocalValuesOpen(false); }}
            className="text-left text-[14px] font-normal text-[#1A1A1A] hover:bg-[#EAEAEA] relative outline-none cursor-pointer flex items-center h-[36px] w-full pl-4 whitespace-nowrap"
          >
            <span>Local values</span>
          </button>
          <button
            onClick={() => { onOpenItemDeclaration?.(); setIsLocalValuesOpen(false); }}
            className="text-left text-[14px] font-normal text-[#1A1A1A] hover:bg-[#EAEAEA] relative outline-none cursor-pointer flex items-center h-[36px] w-full pl-4 whitespace-nowrap"
          >
            <span>Item declaration</span>
          </button>
        </div>
      )
    },
    {
      id: "item-details",
      label: "Item details",
      hasIcon: true,
      onClick: onOpenItemDetails,
      disabled: detailsDisabled
    },
    {
      id: "create",
      label: "New store price",
      isPrimary: true,
      popoverOpen: isCreateOpen,
      onPopoverOpenChange: setIsCreateOpen,
      popoverContent: (
        <div className="flex flex-col py-1">
          <button
            onClick={() => { onOpenPromotionPrice?.(); setIsCreateOpen(false); }}
            className="text-left text-[14px] font-normal text-[#1A1A1A] hover:bg-[#EAEAEA] relative outline-none cursor-pointer flex items-center h-[36px] w-full pl-4 whitespace-nowrap"
          >
            <span>Promotion</span>
          </button>
          <button
            onClick={() => { onOpenStorePrice?.(); setIsCreateOpen(false); }}
            className="text-left text-[14px] font-normal text-[#1A1A1A] hover:bg-[#EAEAEA] relative outline-none cursor-pointer flex items-center h-[36px] w-full pl-4 whitespace-nowrap"
          >
            <span>Ordinary price</span>
          </button>
        </div>
      )
    }
  ];

  const itemsGridItems: FooterItem[] = [
    { id: "export", label: "Export to Excel", onClick: onExportExcel },
    { id: "new-item-list", label: "New item list" },
    { id: "new-mass-update", label: "New mass update" },
    {
      id: "local-values",
      label: "Local values",
      hasIcon: true,
      popoverOpen: isLocalValuesOpen,
      onPopoverOpenChange: setIsLocalValuesOpen,
      popoverContent: (
        <div className="flex flex-col py-1">
          <button
            onClick={() => { onOpenLocalValues?.(); setIsLocalValuesOpen(false); }}
            className="text-left text-[14px] font-normal text-[#1A1A1A] hover:bg-[#EAEAEA] relative outline-none cursor-pointer flex items-center h-[36px] w-full pl-4 whitespace-nowrap"
          >
            <span>Local values</span>
          </button>
          <button
            onClick={() => { onOpenItemDeclaration?.(); setIsLocalValuesOpen(false); }}
            className="text-left text-[14px] font-normal text-[#1A1A1A] hover:bg-[#EAEAEA] relative outline-none cursor-pointer flex items-center h-[36px] w-full pl-4 whitespace-nowrap"
          >
            <span>Item declaration</span>
          </button>
        </div>
      )
    },
    { 
      id: "item-details", 
      label: "Item details", 
      hasIcon: true, 
      onClick: onOpenItemDetails,
      disabled: detailsDisabled
    },
    { id: "new-item", label: "New item", isPrimary: true, onClick: onNewItem }
  ];

  const contactsPageItems: FooterItem[] = [
    { id: "new-contact", label: "New contact", isPrimary: true, onClick: onNewContact }
  ];

  const contactDetailPageItems: FooterItem[] = [
    { id: "anonymize-contact", label: "Anonymize contact", onClick: onAnonymizeContact, disabled: contactAnonymized },
    { id: "export-gdpr", label: "Export GDPR", onClick: onExportGDPR }
  ];

  const customerPageItems: FooterItem[] = [
    { id: "new-customer", label: "New customer", isPrimary: true, onClick: onNewCustomer }
  ];

  const organizationsPageItems: FooterItem[] = [
    { id: "new-organization", label: "New organization", isPrimary: true, onClick: () => setIsNewOrgChoiceOpen(true) }
  ];

  const currentItems = isOrganizationsPage ? organizationsPageItems : isContactsPage ? contactsPageItems : isCustomerPage ? customerPageItems : isStoreRoutines ? storeRoutinesItems : (location.pathname === "/items" ? itemsGridItems : []);

  useLayoutEffect(() => {
    const measure = () => {
      if (!containerRef.current) return;
      
      const safetyMargin = 32; 
      const availableWidth = containerRef.current.clientWidth - safetyMargin; 
      const gap = 8;
      
      const moreWidth = moreButtonWidthRef.current || 50;
      
      // Calculate how many fit from RIGHT to LEFT
      let currentWidth = moreWidth;
      let count = 0;
      
      // Check if ALL fit first
      let totalAll = moreWidth;
      currentItems.forEach(item => {
        totalAll += (itemWidthsRef.current[item.id] || 100) + gap;
      });

      if (totalAll <= availableWidth) {
        setVisibleCount(currentItems.length);
        return;
      }

      // If not all fit, find how many fit starting from the end
      for (let i = currentItems.length - 1; i >= 0; i--) {
        const currentItem = currentItems[i];
        const itemWidth = itemWidthsRef.current[currentItem.id] || 100;
        const widthNeeded = itemWidth + gap;
        
        if (currentWidth + widthNeeded <= availableWidth) {
          currentWidth += widthNeeded;
          count++;
        } else {
          break;
        }
      }
      
      setVisibleCount(count);
    };

    measure();
    const observer = new ResizeObserver(measure);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [currentItems]);

  // Initial measurement of all items (hidden render)
  useLayoutEffect(() => {
    const measureAll = () => {
      currentItems.forEach(item => {
        const el = document.getElementById(`measure-${item.id}`);
        if (el) {
          // Use offsetWidth for consistent measurement
          itemWidthsRef.current[item.id] = el.offsetWidth;
        }
      });
      const moreBtn = document.getElementById("measure-more-btn");
      if (moreBtn) {
        moreButtonWidthRef.current = moreBtn.offsetWidth;
      }
    };
    
    measureAll();
    // Re-measure after a frame to catch any font loading or layout shifts
    const raf = requestAnimationFrame(measureAll);
    return () => cancelAnimationFrame(raf);
  }, [currentItems]);

  const renderItem = (item: FooterItem, isInsideMenu = false) => {
    if (isInsideMenu) {
      if (item.popoverContent) {
        return (
          <Popover.Root key={item.id}>
            <Popover.Trigger asChild>
              <button className="text-left text-[14px] font-normal text-[#1A1A1A] hover:bg-[#EAEAEA] relative outline-none cursor-pointer flex items-center h-[36px] w-full pl-4 whitespace-nowrap justify-between pr-4 group">
                <span>{item.label}</span>
                <ChevronRight className="size-3.5 text-[#595959] opacity-50 group-hover:opacity-100" />
              </button>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content
                align="start"
                side="right"
                sideOffset={2}
                className="z-[10100] bg-white border border-[#CCCCCC] shadow-lg min-w-[150px] outline-none"
              >
                {item.popoverContent}
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        );
      }
      return (
          <button
            key={item.id}
            onClick={item.onClick}
            disabled={item.disabled}
            className="text-left text-[14px] font-normal text-[#1A1A1A] hover:bg-[#EAEAEA] relative outline-none cursor-pointer flex items-center h-[36px] w-full pl-4 whitespace-nowrap disabled:opacity-50"
          >
            <span>{item.label}</span>
          </button>
      );
    }

    if (item.popoverContent) {
      return (
        <Popover.Root key={item.id} open={item.popoverOpen} onOpenChange={item.onPopoverOpenChange}>
          <Popover.Trigger asChild>
            <button className={`h-[30px] flex items-center justify-center text-[13px] font-semibold uppercase tracking-[0px] rounded-full leading-none font-roboto-condensed cursor-pointer px-[15px] gap-1.5 outline-none focus:outline-none whitespace-nowrap ${
              item.isPrimary 
                ? "bg-[#1C7862] text-white hover:bg-[#248E73] border border-[#1C7862] hover:border-[#248E73]" 
                : "bg-[#EAEAEA] text-[#1A1A1A] border border-transparent hover:bg-[#E0E0E0]"
            }`}>
              {item.hasIcon && (
                <div className="w-[8px] h-[8px] shrink-0">
                  <Icon className="fill-current" />
                </div>
              )}
              {item.label}
            </button>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content
              align={item.isPrimary ? "end" : "start"}
              side="top"
              sideOffset={4}
              onOpenAutoFocus={(e) => e.preventDefault()}
              className="z-[10000] bg-white border border-[#CCCCCC] shadow-lg min-w-[150px] outline-none"
            >
              {item.popoverContent}
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      );
    }

    return (
      <ActionButton
        key={item.id}
        isPrimary={item.isPrimary}
        onClick={item.onClick}
        disabled={item.disabled}
        hasIcon={item.hasIcon}
      >
        {item.hasIcon && (
          <div className="w-[8px] h-[8px] shrink-0">
            <Icon className="fill-current" />
          </div>
        )}
        {item.label}
      </ActionButton>
    );
  };

  const renderContent = () => {
    const saveLabel = (modifiedCount || 0) > 1 ? `Save (${modifiedCount})` : "Save";
    
    if (isModified) {
      return (
        <div className="flex items-center gap-2">
          <ActionButton onClick={onClose}>Cancel</ActionButton>
          <ActionButton isPrimary onClick={onSave}>{saveLabel}</ActionButton>
        </div>
      );
    }
    if (isItemsInPromotions) return null;
    if (isLocalValuesTab) return null;

    if (isPopup) {
      return (
        <div className="flex items-center gap-2">
          {isStorePriceTab ? (
            <>
              {!hideSecondary && <ActionButton onClick={onOpenPromotionPrice}>Promotion</ActionButton>}
              <ActionButton isPrimary onClick={onOpenStorePrice}>New price</ActionButton>
            </>
          ) : isItemDetails ? (
            <>
              <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
                <Popover.Trigger asChild>
                  <button className="h-[30px] px-[15px] bg-[#EAEAEA] text-[#1A1A1A] rounded-full flex items-center justify-center hover:bg-[#E0E0E0] cursor-pointer outline-none focus:outline-none">
                    <MoreHorizontal className="size-4" />
                  </button>
                </Popover.Trigger>
                <Popover.Portal>
                  <Popover.Content
                    align="start"
                    side="top"
                    sideOffset={4}
                    onOpenAutoFocus={(e) => e.preventDefault()}
                    className="z-[10000] bg-white border border-[#CCCCCC] shadow-lg min-w-[150px] outline-none"
                  >
                    <div className="flex flex-col py-1">
                      <button
                        onClick={() => { 
                          const search = new URLSearchParams(location.search);
                          search.set("tab", "local-values");
                          navigate(`${location.pathname}?${search.toString()}`);
                          setIsOpen(false);
                        }}
                        className="text-left text-[14px] font-normal text-[#1A1A1A] hover:bg-[#EAEAEA] relative outline-none cursor-pointer flex items-center h-[36px] w-full pl-4 whitespace-nowrap"
                      >
                        <span>Local values</span>
                      </button>
                      <button className="text-left text-[14px] font-normal text-[#1A1A1A] hover:bg-[#EAEAEA] relative outline-none cursor-pointer flex items-center h-[36px] w-full pl-4">
                        <span>Print labels</span>
                      </button>
                      <button className="text-left text-[14px] font-normal text-[#1A1A1A] hover:bg-[#EAEAEA] relative outline-none cursor-pointer flex items-center h-[36px] w-full pl-4">
                        <span>Upload image</span>
                      </button>
                      <button 
                        onClick={() => { onExportExcel?.(); setIsOpen(false); }}
                        className="text-left text-[14px] font-normal text-[#1A1A1A] hover:bg-[#EAEAEA] relative outline-none cursor-pointer flex items-center h-[36px] w-full pl-4"
                      >
                        <span>Export to Excel</span>
                      </button>
                      <button className="text-left text-[14px] font-normal text-[#1A1A1A] hover:bg-[#EAEAEA] relative outline-none cursor-pointer flex items-center h-[36px] w-full pl-4">
                        <span>Manage item</span>
                      </button>
                    </div>
                  </Popover.Content>
                </Popover.Portal>
              </Popover.Root>
              <ActionButton isPrimary onClick={onSave}>{saveLabel}</ActionButton>
            </>
          ) : isPromotion ? (
            <>
              <ActionButton isPrimary onClick={onSave}>Save</ActionButton>
            </>
          ) : (
            <>
              {!hideSecondary && <ActionButton onClick={onSave}>Save + Next</ActionButton>}
              <ActionButton isPrimary onClick={onSave}>{saveLabel}</ActionButton>
            </>
          )}
        </div>
      );
    }

    if (isFullDetailsPage) {
      return (
        <div className="flex items-center gap-2">
          {!isStorePriceTab && (
            <button className="h-[30px] px-[15px] bg-[#EAEAEA] text-[#1A1A1A] rounded-full flex items-center justify-center hover:bg-[#E0E0E0] cursor-pointer outline-none focus:outline-none">
              <MoreHorizontal className="size-4" />
            </button>
          )}
          {isStorePriceTab ? (
            <>
              <ActionButton onClick={onOpenPromotionPrice}>Promotion</ActionButton>
              <ActionButton isPrimary onClick={onOpenStorePrice}>New price</ActionButton>
            </>
          ) : (
            <>
              <ActionButton onClick={() => navigate("/item-details?tab=local-values")}>Local values</ActionButton>
              <ActionButton>Print labels</ActionButton>
              <ActionButton>Upload image</ActionButton>
              <ActionButton onClick={onExportExcel}>Export to Excel</ActionButton>
              <ActionButton>Manage item</ActionButton>
              <ActionButton isPrimary>{saveLabel}</ActionButton>
            </>
          )}
        </div>
      );
    }

    // Responsive Logic for Store Routines and Items
    if (isStoreRoutines || location.pathname === "/items" || isContactsPage || isCustomerPage || isOrganizationsPage) {
      const splitIndex = currentItems.length - visibleCount;
      const overflowItems = currentItems.slice(0, Math.max(0, splitIndex));
      const visibleItems = currentItems.slice(Math.max(0, splitIndex));

      return (
        <div className="flex items-center gap-2 whitespace-nowrap">
          {overflowItems.length > 0 && (
            <Popover.Root open={isMoreOpen} onOpenChange={setIsMoreOpen}>
              <Popover.Trigger asChild>
                <button className="h-[30px] px-[15px] bg-[#EAEAEA] text-[#1A1A1A] rounded-full flex items-center justify-center hover:bg-[#E0E0E0] cursor-pointer outline-none focus:outline-none shrink-0">
                  <svg className="size-[18px]" viewBox="0 0 20 20" fill="none">
                    <path d={svgPathsMore.p2d3e5d00} fill="#1A1A1A" />
                  </svg>
                </button>
              </Popover.Trigger>
              <Popover.Portal>
                <Popover.Content
                  align="start"
                  side="top"
                  sideOffset={4}
                  onOpenAutoFocus={(e) => e.preventDefault()}
                  className="z-[10000] bg-white border border-[#CCCCCC] shadow-lg min-w-[150px] outline-none"
                >
                  <div className="flex flex-col py-1">
                    {overflowItems.map(item => renderItem(item, true))}
                  </div>
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
          )}

          {visibleItems.map(item => renderItem(item))}
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2">
        <ActionButton onClick={onExportExcel}>Export to Excel</ActionButton>
        <ActionButton>New item list</ActionButton>
        <ActionButton>New mass update</ActionButton>
        <ActionButton onClick={onOpenItemDetails} disabled={detailsDisabled} hasIcon>
          <div className="w-[8px] h-[8px] shrink-0">
            <Icon className="fill-current" />
          </div>
          Item details
        </ActionButton>
        <ActionButton isPrimary onClick={onNewItem}>
          New item
        </ActionButton>
      </div>
    );
  };

  return (
    <>
      {/* Hidden container for measuring button widths */}
      <div className="fixed opacity-0 pointer-events-none flex gap-2" style={{ top: -1000, left: -1000 }}>
        <button id="measure-more-btn" className="h-[30px] px-[15px] bg-[#EAEAEA] rounded-full flex items-center justify-center">
          <svg className="size-[18px]" viewBox="0 0 20 20" fill="none">
            <path d={svgPathsMore.p2d3e5d00} fill="#1A1A1A" />
          </svg>
        </button>
        {currentItems.map(item => (
          <button 
            key={item.id} 
            id={`measure-${item.id}`}
            className={`h-[30px] px-[15px] rounded-full text-[13px] font-semibold uppercase font-roboto-condensed border whitespace-nowrap flex items-center gap-1.5`}
          >
            {item.hasIcon && <div className="size-2 bg-black shrink-0" />}
            {item.label}
          </button>
        ))}
      </div>

      <div className="h-[56px] bg-white flex items-center px-[20px] shrink-0 border-t border-[#CCCCCC] justify-end relative z-[5100]">
        <div ref={containerRef} className="flex-1 max-w-full overflow-hidden flex justify-end">
          {isNewCustomerPage ? (
            <div className="flex items-center gap-2">
              <ActionButton onClick={() => navigate("/customer/customer")}>Cancel</ActionButton>
              <ActionButton
                isPrimary
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as any).createCustomer) {
                    (window as any).createCustomer();
                  }
                }}
              >
                Create
              </ActionButton>
            </div>
          ) : isCustomerDetailPage ? (
            <div className="flex items-center gap-2">
              <Popover.Root open={isMoreOpen} onOpenChange={setIsMoreOpen}>
                <Popover.Trigger asChild>
                  <button className="h-[30px] px-[15px] bg-[#EAEAEA] text-[#1A1A1A] rounded-full flex items-center justify-center hover:bg-[#E0E0E0] cursor-pointer outline-none focus:outline-none shrink-0">
                    <svg className="size-[18px]" viewBox="0 0 20 20" fill="none">
                      <path d={svgPathsMore.p2d3e5d00} fill="#1A1A1A" />
                    </svg>
                  </button>
                </Popover.Trigger>
                <Popover.Portal>
                  <Popover.Content
                    align="start"
                    side="top"
                    sideOffset={4}
                    onOpenAutoFocus={(e) => e.preventDefault()}
                    className="z-[10000] bg-white border border-[#CCCCCC] shadow-lg min-w-[200px] outline-none"
                  >
                    <div className="flex flex-col py-1">
                      {(typeof window !== 'undefined' && (window as any).isBusinessCustomer) ? (
                        <>
                          {/* Business customer menu options */}
                          {!(typeof window !== 'undefined' && (window as any).isCustomerInactive) ? (
                            <button
                              onClick={() => {
                                if (typeof window !== 'undefined' && (window as any).deactivateCustomer) {
                                  (window as any).deactivateCustomer();
                                }
                                setIsMoreOpen(false);
                              }}
                              className="text-left text-[14px] font-normal text-[#1A1A1A] hover:bg-[#EAEAEA] relative outline-none cursor-pointer flex items-center h-[36px] w-full pl-4 whitespace-nowrap"
                            >
                              Deactivate
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                if (typeof window !== 'undefined' && (window as any).activateCustomer) {
                                  (window as any).activateCustomer();
                                }
                                setIsMoreOpen(false);
                              }}
                              className="text-left text-[14px] font-normal text-[#1A1A1A] hover:bg-[#EAEAEA] relative outline-none cursor-pointer flex items-center h-[36px] w-full pl-4 whitespace-nowrap"
                            >
                              Activate
                            </button>
                          )}
                          {(typeof window !== 'undefined' && (window as any).isCustomerInactive && (window as any).canDeleteCustomer) && (
                            <button
                              onClick={() => {
                                if (typeof window !== 'undefined' && (window as any).deleteCustomer) {
                                  (window as any).deleteCustomer();
                                }
                                setIsMoreOpen(false);
                              }}
                              className="text-left text-[14px] font-normal text-[#1A1A1A] hover:bg-[#EAEAEA] relative outline-none cursor-pointer flex items-center h-[36px] w-full pl-4 whitespace-nowrap"
                            >
                              Delete
                            </button>
                          )}
                        </>
                      ) : (
                        <>
                          {/* Private customer menu options */}
                          {(typeof window !== 'undefined' && !(window as any).hasCustomerCard) && (
                            <button
                              onClick={() => {
                                if (typeof window !== 'undefined' && (window as any).addCustomerCard) {
                                  (window as any).addCustomerCard();
                                }
                                setIsMoreOpen(false);
                              }}
                              className="text-left text-[14px] font-normal text-[#1A1A1A] hover:bg-[#EAEAEA] relative outline-none cursor-pointer flex items-center h-[36px] w-full pl-4 whitespace-nowrap"
                            >
                              Add customer card
                            </button>
                          )}
                          {!(typeof window !== 'undefined' && (window as any).isCustomerInactive) ? (
                            <button
                              onClick={() => {
                                if (typeof window !== 'undefined' && (window as any).deactivateCustomer) {
                                  (window as any).deactivateCustomer();
                                }
                                setIsMoreOpen(false);
                              }}
                              className="text-left text-[14px] font-normal text-[#1A1A1A] hover:bg-[#EAEAEA] relative outline-none cursor-pointer flex items-center h-[36px] w-full pl-4 whitespace-nowrap"
                            >
                              Deactivate
                            </button>
                          ) : (
                            <>
                              <button
                                onClick={() => {
                                  if (typeof window !== 'undefined' && (window as any).activateCustomer) {
                                    (window as any).activateCustomer();
                                  }
                                  setIsMoreOpen(false);
                                }}
                                className="text-left text-[14px] font-normal text-[#1A1A1A] hover:bg-[#EAEAEA] relative outline-none cursor-pointer flex items-center h-[36px] w-full pl-4 whitespace-nowrap"
                              >
                                Activate
                              </button>
                              {(typeof window !== 'undefined' && (window as any).canDeleteCustomer) && (
                                <button
                                  onClick={() => {
                                    if (typeof window !== 'undefined' && (window as any).deleteCustomer) {
                                      (window as any).deleteCustomer();
                                    }
                                    setIsMoreOpen(false);
                                  }}
                                  className="text-left text-[14px] font-normal text-[#1A1A1A] hover:bg-[#EAEAEA] relative outline-none cursor-pointer flex items-center h-[36px] w-full pl-4 whitespace-nowrap"
                                >
                                  Delete
                                </button>
                              )}
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </Popover.Content>
                </Popover.Portal>
              </Popover.Root>
              {activeTab === "offers" ? (
                <ActionButton
                  onClick={() => {
                    if (typeof window !== 'undefined' && (window as any).openNewOfferModal) {
                      (window as any).openNewOfferModal();
                    }
                  }}
                >
                  New offer
                </ActionButton>
              ) : !isCustomerSalesOrOffersTab && (
                <ActionButton
                  isPrimary
                  onClick={() => {
                    if (typeof window !== 'undefined' && (window as any).saveCustomer) {
                      (window as any).saveCustomer();
                    }
                  }}
                >
                  Save
                </ActionButton>
              )}
            </div>
          ) : isContactDetailPage ? (
            <div className="flex items-center gap-2">
              {!contactAnonymized && (
                <Popover.Root open={isMoreOpen} onOpenChange={setIsMoreOpen}>
                  <Popover.Trigger asChild>
                    <button className="h-[30px] px-[15px] bg-[#EAEAEA] text-[#1A1A1A] rounded-full flex items-center justify-center hover:bg-[#E0E0E0] cursor-pointer outline-none focus:outline-none shrink-0">
                      <svg className="size-[18px]" viewBox="0 0 20 20" fill="none">
                        <path d={svgPathsMore.p2d3e5d00} fill="#1A1A1A" />
                      </svg>
                    </button>
                  </Popover.Trigger>
                  <Popover.Portal>
                    <Popover.Content
                      align="start"
                      side="top"
                      sideOffset={4}
                      onOpenAutoFocus={(e) => e.preventDefault()}
                      className="z-[10000] bg-white border border-[#CCCCCC] shadow-lg min-w-[200px] outline-none"
                    >
                      <div className="flex flex-col py-1">
                        <button
                          onClick={() => {
                            if (typeof window !== 'undefined' && (window as any).openAnonymizeDialog) {
                              (window as any).openAnonymizeDialog();
                            }
                            setIsMoreOpen(false);
                          }}
                          className="text-left text-[14px] font-normal hover:bg-[#EAEAEA] relative outline-none cursor-pointer flex items-center h-[36px] w-full pl-4 whitespace-nowrap text-[#000000]"
                        >
                          Anonymize contact
                        </button>
                        <button
                          onClick={() => {
                            if (typeof window !== 'undefined' && (window as any).openExportGDPRDialog) {
                              (window as any).openExportGDPRDialog();
                            }
                            setIsMoreOpen(false);
                          }}
                          className="text-left text-[14px] font-normal text-[#1A1A1A] hover:bg-[#EAEAEA] relative outline-none cursor-pointer flex items-center h-[36px] w-full pl-4 whitespace-nowrap"
                        >
                          Export GDPR data
                        </button>
                      </div>
                    </Popover.Content>
                  </Popover.Portal>
                </Popover.Root>
              )}
              <ActionButton
                isPrimary
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as any).saveContact) {
                    (window as any).saveContact();
                  }
                }}
                disabled={contactAnonymized}
              >
                Save
              </ActionButton>
            </div>
          ) : (
            renderContent()
          )}
        </div>
      </div>

      {/* NewOrganizationChoiceModal */}
      {isOrganizationsPage && (
        <NewOrganizationChoiceModal
          isOpen={isNewOrgChoiceOpen}
          onClose={() => setIsNewOrgChoiceOpen(false)}
          onSearchOrganization={() => {
            setIsNewOrgChoiceOpen(false);
            setIsOrgSearchOpen(true);
          }}
          onCreateOrganization={() => {
            setIsNewOrgChoiceOpen(false);
            // Navigate to create organization page
            navigate("/customer/organizations/new");
          }}
        />
      )}

      {/* ChooseOrganizationSearchModal */}
      {isOrganizationsPage && (
        <ChooseOrganizationSearchModal
          isOpen={isOrgSearchOpen}
          onClose={() => setIsOrgSearchOpen(false)}
          onSelectOrganization={(org) => {
            console.log("Selected organization:", org);
            setIsOrgSearchOpen(false);
            // TODO: Handle organization selection
          }}
        />
      )}
    </>
  );
}