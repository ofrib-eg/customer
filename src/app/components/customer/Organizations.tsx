import React from "react";
import { useNavigate } from "react-router";
import { OrganizationsGrid } from "./OrganizationsGrid";

export function Organizations() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full w-full bg-white">
      {/* Grid content */}
      <OrganizationsGrid />
    </div>
  );
}