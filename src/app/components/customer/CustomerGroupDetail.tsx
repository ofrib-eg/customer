import React from "react";
import { useParams, useNavigate } from "react-router";

export function CustomerGroupDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-white p-6">
      <div className="mb-6">
        <button
          onClick={() => navigate("/customer/customer-groups")}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          ← Back to Customer Groups
        </button>
      </div>

      <div className="max-w-4xl">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Customer Group Details</h1>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Group Code</label>
              <div className="text-gray-900">GRP00{id}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Group Name</label>
              <div className="text-gray-900">Customer Group {id}</div>
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <div className="text-gray-900">Description for customer group {id}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Member Count</label>
              <div className="text-gray-900">{parseInt(id || "0") * 10} members</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Discount</label>
              <div className="text-gray-900">{parseInt(id || "0") * 2}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
