import React, { useState } from "react";
import { useParams, useSearchParams } from "react-router";
import { AnonymizeDialog } from "./AnonymizeDialog";
import { ExportGDPRDialog } from "./ExportGDPRDialog";
import { useContact } from "@/app/contexts/ContactContext";
import { motion as Motion, AnimatePresence } from "motion/react";
import { Check, X, MoreHorizontal } from "lucide-react";
import { mockContacts } from "./ContactsGrid";
import { RelationshipsGrid } from "./RelationshipsGrid";
import { NewRelationshipModal } from "./NewRelationshipModal";
import { Card, CardContent } from "@/app/components/ui/card";
import { DETAIL_CARD_CLASS, SectionHeader, FieldLabel, ReadOnlyField, InputField, SelectField, DateField } from "./sharedFields";

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
  const [searchParams] = useSearchParams();
  const { isContactAnonymized, setContactAnonymized } = useContact();

  const activeTab = searchParams.get("tab") || "details";
  const contactId = id ? parseInt(id) : 0;
  const isAnonymized = isContactAnonymized(contactId);

  // Get contact details
  const contact = mockContacts.find(c => c.id === contactId);
  const linkedCustomers = contactToCustomersMap[contactId] || [];

  const [showAnonymizeDialog, setShowAnonymizeDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showSaveToast, setShowSaveToast] = useState(false);
  const [birthDate, setBirthDate] = useState("");
  const [ssn, setSsn] = useState("223150167865");
  const [externalIdentityNumber, setExternalIdentityNumber] = useState("19029871");
  const [isNewRelationshipModalOpen, setIsNewRelationshipModalOpen] = useState(false);

  const handleAnonymizeConfirm = (sendReport: boolean, email?: string) => {
    console.log("Anonymizing contact...", { sendReport, email });
    setContactAnonymized(contactId);
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 5000);
  };

  const handleExportConfirm = (includeRelated: boolean, email: string) => {
    console.log("Exporting GDPR data...", { includeRelated, email });
  };

  const handleSaveContact = () => {
    console.log("Saving contact...");
    setShowSaveToast(true);
    setTimeout(() => setShowSaveToast(false), 5000);
  };

  // Expose these functions globally so Footer can call them
  React.useEffect(() => {
    (window as any).openAnonymizeDialog = () => setShowAnonymizeDialog(true);
    (window as any).openExportGDPRDialog = () => setShowExportDialog(true);
    (window as any).saveContact = handleSaveContact;

    return () => {
      delete (window as any).openAnonymizeDialog;
      delete (window as any).openExportGDPRDialog;
      delete (window as any).saveContact;
    };
  }, []);

  if (!contact) {
    return <div className="p-[20px]">Contact not found</div>;
  }

  const anonymizedText = "–";

  return (
    <>
      {activeTab === "relationship" ? (
        <RelationshipsGrid isAnonymized={isAnonymized} onAddRelationship={() => setIsNewRelationshipModalOpen(true)} />
      ) : (
      <div className="flex flex-col h-full bg-[#F4F5F6] overflow-auto">
        <div className="@container">
          <div className="py-[20px] px-[16px] sm:px-[24px] lg:px-[32px] xl:px-[48px] max-w-[1200px] w-full mx-auto">
            <div className="flex flex-col gap-6 mb-4">
              {/* Contact identity card */}
              <Card className={DETAIL_CARD_CLASS}>
                <CardContent className="p-8">
                  <div className="flex items-start justify-between gap-[10px] mb-[4px]">
                    <div className="flex items-center gap-[10px]">
                      <h2 className="font-['Roboto_Condensed',sans-serif] font-bold text-[20px] leading-[24px] tracking-[0px] text-[#1a1a1a] uppercase">
                        {contact.name}
                      </h2>
                      <span className={`shrink-0 font-['Roboto_Condensed',sans-serif] text-[11px] font-bold uppercase px-[10px] py-[2px] rounded-full border ${isAnonymized ? "border-[#999] text-[#999]" : "border-[#1a1a1a] text-[#1a1a1a]"}`}>
                        {isAnonymized ? "Anonymized" : "Active"}
                      </span>
                    </div>
                    <button type="button" onClick={() => console.log("Contact menu clicked")} className="shrink-0 p-[4px] rounded-full text-[#666] hover:text-[#1a1a1a] hover:bg-[#f5f5f5] cursor-pointer transition-colors">
                      <MoreHorizontal className="size-[18px]" />
                    </button>
                  </div>
                  <p className="font-['Roboto:Regular',sans-serif] text-[14px] text-[#666] mb-[16px]">Contact</p>
                  <div className="border-t border-[#E5E7EB] mb-[16px]" />

                  <div className="flex flex-col @md:flex-row @md:justify-between gap-y-4">
                    <div className="w-full @md:w-[260px]">
                      {isAnonymized ? (
                        <>
                          <ReadOnlyField compact label="Identity number" value={anonymizedText} />
                          <ReadOnlyField compact label="Ext. identity number" value={anonymizedText} />
                          <ReadOnlyField compact label="Loyalty program name" value={anonymizedText} />
                        </>
                      ) : (
                        <>
                          <ReadOnlyField compact label="Identity number" value={contact.identityNumber} />
                          <InputField compact label="Ext. identity number" value={externalIdentityNumber} onChange={setExternalIdentityNumber} />
                          <ReadOnlyField compact label="Loyalty program name" value={contact.loyaltyProgramName} />
                        </>
                      )}
                    </div>
                    <div className="w-full @md:w-[260px]">
                      {isAnonymized ? (
                        <>
                          <ReadOnlyField compact label="First name" value={anonymizedText} />
                          <ReadOnlyField compact label="Last name" value={anonymizedText} />
                        </>
                      ) : (
                        <>
                          <InputField compact label="First name" value={contact.firstName} required />
                          <InputField compact label="Last name" value={contact.lastName} required />
                        </>
                      )}
                      {isAnonymized ? (
                        <ReadOnlyField compact label="Birth date" value={anonymizedText} />
                      ) : (
                        <DateField compact label="Birth date" value={birthDate} onChange={setBirthDate} />
                      )}
                      {isAnonymized ? (
                        <ReadOnlyField compact label="Gender" value={anonymizedText} />
                      ) : (
                        <SelectField
                          compact
                          label="Gender"
                          value="Female"
                          options={[
                            { value: "Female", label: "Female" },
                            { value: "Male", label: "Male" },
                            { value: "Other", label: "Other" }
                          ]}
                        />
                      )}
                    </div>
                    <div className="w-full @md:w-[260px]">
                      {isAnonymized ? (
                        <>
                          <ReadOnlyField compact label="Email" value={anonymizedText} />
                          <ReadOnlyField compact label="Mobile number" value={anonymizedText} />
                          <ReadOnlyField compact label="SSN" value={anonymizedText} />
                        </>
                      ) : (
                        <>
                          <InputField compact label="Email" value={contact.email} />
                          <InputField compact label="Mobile number" value={contact.mobile} />
                          <InputField compact label="SSN" value={ssn} onChange={setSsn} />
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Address + Notes */}
              <div className="grid grid-cols-1 @md:grid-cols-2 gap-6">
                <Card className={DETAIL_CARD_CLASS}>
                  <CardContent className="p-8">
                    <SectionHeader>Address</SectionHeader>
                    {isAnonymized ? (
                      <>
                        <ReadOnlyField compact hideIfEmpty label="Address line 1" value={anonymizedText} />
                        <ReadOnlyField compact hideIfEmpty label="Address line 2" value={anonymizedText} />
                        <ReadOnlyField compact hideIfEmpty label="Postal code" value={anonymizedText} />
                        <ReadOnlyField compact hideIfEmpty label="City" value={anonymizedText} />
                        <ReadOnlyField compact hideIfEmpty label="Country" value={anonymizedText} />
                      </>
                    ) : (
                      <>
                        <InputField compact label="Address line 1" value="Munkegata 19" />
                        <InputField compact label="Address line 2" value="" />
                        <InputField compact label="Postal code" value="7011" />
                        <InputField compact label="City" value="Trondheim" />
                        <SelectField
                          compact
                          label="Country"
                          value="Norway"
                          options={[
                            { value: "Norway", label: "Norway" },
                            { value: "Sweden", label: "Sweden" },
                            { value: "Denmark", label: "Denmark" },
                            { value: "Finland", label: "Finland" }
                          ]}
                        />
                      </>
                    )}
                  </CardContent>
                </Card>

                <Card className={DETAIL_CARD_CLASS}>
                  <CardContent className="p-8 h-full flex flex-col">
                    <SectionHeader>Notes</SectionHeader>
                    <FieldLabel>Customer notes</FieldLabel>
                    <div className="flex-1 border border-[#ccc] rounded-[2px] p-[10px] min-h-[80px] font-['Roboto:Regular',sans-serif] text-[14px] leading-[20px] text-[#1a1a1a]">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}

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

      <NewRelationshipModal
        isOpen={isNewRelationshipModalOpen}
        onClose={() => setIsNewRelationshipModalOpen(false)}
        contactId={String(contactId)}
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

      <AnimatePresence>
        {showSaveToast && (
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
                <p className="text-[14px] font-normal font-roboto">Changes were saved.</p>
              </div>
            </div>
            <button
              className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer flex items-center justify-center"
              onClick={() => setShowSaveToast(false)}
            >
              <X className="size-[18px] text-white" />
            </button>
          </Motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
