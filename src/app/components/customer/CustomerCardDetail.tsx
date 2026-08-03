import React from "react";
import { useParams, useNavigate } from "react-router";

export function CustomerCardDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-white p-6">
      <div className="mb-6">
        <button
          onClick={() => navigate("/customer/customer-cards")}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          ← Back to Customer Cards
        </button>
      </div>

      <div className="max-w-4xl">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Customer Card Details</h1>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
              <div className="text-gray-900">{id}234-5678-9012-3456</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Card Type</label>
              <div className="text-gray-900">Gold</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
              <div className="text-gray-900">Customer for Card {id}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                Active
              </span>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Issued Date</label>
              <div className="text-gray-900">2024-01-15</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
              <div className="text-gray-900">2027-01-15</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
