import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import ContactAttributesWrapper from "./ContactAttributesWrapper";
import RelationshipsWrapper from "./RelationshipsWrapper";
import { AnonymizeDialog } from "./AnonymizeDialog";
import { ExportGDPRDialog } from "./ExportGDPRDialog";
import { useContact } from "@/app/contexts/ContactContext";
import { motion as Motion, AnimatePresence } from "motion/react";
import { Check, X } from "lucide-react";
import { mockContacts } from "./ContactsGrid";

// Mock mapping of contact ID to linked private customers and members
const contactToCustomersMap: Record<number, Array<{ customerNumber: string; customerName: string; type?: string }>> = {
  1: [
    { customerNumber: "0000000011", customerName: "Melina Andersson", type: "Private customer" }
    // Future: Could also include members
    // { customerNumber: "M00123", customerName: "Gold Membership", type: "Member" }
  ]
  // Other contacts don't have linked customers in this example
};

export function ContactDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isContactAnonymized, setContactAnonymized } = useContact();
  
  const [showAnonymizeDialog, setShowAnonymizeDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const contactId = id ? parseInt(id) : 0;
  const isAnonymized = isContactAnonymized(contactId);
  
  // Get contact details
  const contact = mockContacts.find(c => c.id === contactId);
  const linkedCustomers = contactToCustomersMap[contactId] || [];

  const handleAnonymizeConfirm = (sendReport: boolean, email?: string) => {
    console.log("Anonymizing contact...", { sendReport, email });
    setContactAnonymized(contactId);
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 5000);
  };

  const handleExportConfirm = (includeRelated: boolean, email: string) => {
    console.log("Exporting GDPR data...", { includeRelated, email });
  };

  // Expose these functions globally so Footer can call them
  React.useEffect(() => {
    (window as any).openAnonymizeDialog = () => setShowAnonymizeDialog(true);
    (window as any).openExportGDPRDialog = () => setShowExportDialog(true);
    
    return () => {
      delete (window as any).openAnonymizeDialog;
      delete (window as any).openExportGDPRDialog;
    };
  }, []);

  return (
    <>
      <div className="flex flex-col h-full bg-white overflow-auto relative">
        <div className="p-4 sm:p-6 space-y-6 sm:space-y-8 flex-1">
          <ContactAttributesWrapper isAnonymized={isAnonymized} displayOption={2} />
          <div className="w-full">
            <RelationshipsWrapper isAnonymized={isAnonymized} />
          </div>
        </div>
      </div>

      <AnonymizeDialog
        isOpen={showAnonymizeDialog}
        onClose={() => setShowAnonymizeDialog(false)}
        onConfirm={handleAnonymizeConfirm}
        contactEmail={contact?.email || "Ola.n@eg.no"}
        contactName={contact?.name || ""}
        linkedCustomers={linkedCustomers}
        displayOption={2}
      />

      <ExportGDPRDialog
        isOpen={showExportDialog}
        onClose={() => setShowExportDialog(false)}
        onConfirm={handleExportConfirm}
        contactEmail="Ola.n@eg.no"
      />

      <AnimatePresence>
        {showSuccessToast && (
          <Motion.div 
            initial={{ y: "100%" }} 
            animate={{ y: 0 }} 
            exit={{ y: "100%" }} 
            transition={{ type: "spring", damping: 30, stiffness: 300 }} 
            className="fixed bottom-[56px] left-[95px] right-0 z-[1000] bg-[#262626] text-white h-[40px] flex items-center pl-[20px] pr-[10px] gap-4 justify-between"
          >
            <div className="flex items-center gap-[30px]">
              <div className="flex items-center gap-2">
                <Check className="size-[18px] text-white" />
                <p className="text-[14px] font-normal font-roboto">Contact was successfully anonymized.</p>
              </div>
            </div>
            <button 
              className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer flex items-center justify-center" 
              onClick={() => setShowSuccessToast(false)}
            >
              <X className="size-[18px] text-white" />
            </button>
          </Motion.div>
        )}
      </AnimatePresence>
    </>
  );
}