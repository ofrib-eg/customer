import React, { createContext, useContext, useState, ReactNode } from "react";

interface ContactContextType {
  anonymizedContactIds: Set<number>;
  isContactAnonymized: (contactId: number) => boolean;
  setContactAnonymized: (contactId: number) => void;
}

const ContactContext = createContext<ContactContextType | undefined>(undefined);

export function ContactProvider({ children }: { children: ReactNode }) {
  const [anonymizedContactIds, setAnonymizedContactIds] = useState<Set<number>>(new Set());

  const isContactAnonymized = (contactId: number) => {
    return anonymizedContactIds.has(contactId);
  };

  const setContactAnonymized = (contactId: number) => {
    setAnonymizedContactIds(prev => new Set([...prev, contactId]));
  };

  return (
    <ContactContext.Provider value={{ 
      anonymizedContactIds, 
      isContactAnonymized, 
      setContactAnonymized 
    }}>
      {children}
    </ContactContext.Provider>
  );
}

export function useContact() {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error("useContact must be used within a ContactProvider");
  }
  return context;
}