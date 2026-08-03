import React, { useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import svgPathsMore from "@/imports/svg-oqev7ygrue";
import { NewRelationshipModal } from "./NewRelationshipModal";

interface ActionButtonProps {
  children: React.ReactNode;
  isPrimary?: boolean;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const ActionButton = React.forwardRef<HTMLButtonElement, ActionButtonProps>(({ 
  children, 
  isPrimary = false, 
  className = "", 
  onClick, 
  disabled = false
}, ref) => {
  const baseStyles = "h-[30px] px-[15px] rounded-full flex items-center justify-center cursor-pointer outline-none focus:outline-none transition-colors text-[14px] font-normal";
  const primaryStyles = isPrimary 
    ? "bg-[#E58108] text-white hover:bg-[#CC7307]" 
    : "bg-[#EAEAEA] text-[#1A1A1A] hover:bg-[#E0E0E0]";
  const disabledStyles = disabled 
    ? "opacity-50 cursor-not-allowed hover:bg-[#EAEAEA]" 
    : "";

  return (
    <button
      ref={ref}
      className={`${baseStyles} ${primaryStyles} ${disabledStyles} ${className}`}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
});

ActionButton.displayName = "ActionButton";

interface ContactDetailFooterProps {
  isAnonymized: boolean;
  onAnonymize: () => void;
  onExportGDPR: () => void;
  onSave: () => void;
  contactId?: string;
}

export function ContactDetailFooter({ 
  isAnonymized, 
  onAnonymize, 
  onExportGDPR,
  onSave,
  contactId
}: ContactDetailFooterProps) {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isNewRelationshipOpen, setIsNewRelationshipOpen] = useState(false);

  return (
    <>
      <div className="h-[60px] bg-white border-t border-[#CCCCCC] flex items-center justify-end px-[20px] shrink-0">
        <div className="flex items-center gap-2">
          {!isAnonymized && (
            <Popover.Root open={isMoreOpen} onOpenChange={setIsMoreOpen}>
              <Popover.Trigger asChild>
                <button className="h-[30px] px-[15px] bg-[#EAEAEA] text-[#1A1A1A] rounded-full flex items-center justify-center hover:bg-[#E0E0E0] cursor-pointer outline-none focus:outline-none">
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
                        onAnonymize();
                        setIsMoreOpen(false);
                      }}
                      className="text-left text-[14px] font-normal text-[#C72E2E] hover:bg-[#EAEAEA] relative outline-none cursor-pointer flex items-center h-[36px] w-full pl-4 whitespace-nowrap"
                    >
                      Anonymize contact
                    </button>
                    <button
                      onClick={() => {
                        onExportGDPR();
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
          <ActionButton onClick={() => setIsNewRelationshipOpen(true)}>New relationship</ActionButton>
          <ActionButton isPrimary onClick={onSave} disabled={isAnonymized}>Save</ActionButton>
        </div>
      </div>

      <NewRelationshipModal
        isOpen={isNewRelationshipOpen}
        onClose={() => setIsNewRelationshipOpen(false)}
        contactId={contactId}
      />
    </>
  );
}