import React from "react";
import { Routes, Route, useNavigate, useLocation, Navigate } from "react-router";
import { CustomerGrid } from "./customer/CustomerGrid";
import { CustomerCardsGrid } from "./customer/CustomerCardsGrid";
import { CustomerGroupsGrid } from "./customer/CustomerGroupsGrid";
import { ContactsGrid } from "./customer/ContactsGrid";
import { Organizations } from "./customer/Organizations";
import { CustomerDetail } from "./customer/CustomerDetail";
import { CustomerCardDetail } from "./customer/CustomerCardDetail";
import { CustomerGroupDetail } from "./customer/CustomerGroupDetail";
import { ContactDetail } from "./customer/ContactDetail";
import { OrganizationDetail } from "./customer/OrganizationDetail";

export function CustomerModule() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex flex-col h-full w-full bg-white">
      {/* Sub-navigation tabs */}
      <div className="border-b border-gray-200 bg-white">
      </div>

      {/* Main content area */}
      <div className="flex-1 overflow-hidden">
        <Routes>
          <Route path="/" element={<Navigate to="/customer/customer" replace />} />
          <Route path="/customer" element={<CustomerGrid />} />
          <Route path="/customer/:id" element={<CustomerDetail />} />
          <Route path="/customer-cards" element={<CustomerCardsGrid />} />
          <Route path="/customer-cards/:id" element={<CustomerCardDetail />} />
          <Route path="/customer-groups" element={<CustomerGroupsGrid />} />
          <Route path="/customer-groups/:id" element={<CustomerGroupDetail />} />
          <Route path="/contacts" element={<ContactsGrid />} />
          <Route path="/contacts/:id" element={<ContactDetail />} />
          <Route path="/organizations" element={<Organizations />} />
          <Route path="/organizations/:id" element={<OrganizationDetail />} />
        </Routes>
      </div>
    </div>
  );
}