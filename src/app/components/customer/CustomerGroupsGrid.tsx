import React from "react";
import { useNavigate } from "react-router";

const mockCustomerGroups = [
  { id: 1, groupCode: "VIP001", groupName: "VIP Customers", description: "Top-tier customers with premium benefits", memberCount: 25, discount: "15%" },
  { id: 2, groupCode: "CORP002", groupName: "Corporate Clients", description: "Business-to-business customers", memberCount: 42, discount: "10%" },
  { id: 3, groupCode: "REG003", groupName: "Regular Customers", description: "Standard customer group", memberCount: 156, discount: "5%" },
  { id: 4, groupCode: "NEW004", groupName: "New Customers", description: "Recently registered customers", memberCount: 18, discount: "0%" },
  { id: 5, groupCode: "SEAS005", groupName: "Seasonal Buyers", description: "Customers active during specific seasons", memberCount: 33, discount: "8%" },
];

export function CustomerGroupsGrid() {
  const navigate = useNavigate();

  const handleRowClick = (groupId: number) => {
    navigate(`/customer/customer-groups/${groupId}`);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex-1 overflow-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">Group Code</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">Group Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">Description</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">Members</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">Discount</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockCustomerGroups.map((group) => (
              <tr
                key={group.id}
                onClick={() => handleRowClick(group.id)}
                className="hover:bg-blue-50 cursor-pointer transition-colors"
              >
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{group.groupCode}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{group.groupName}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{group.description}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{group.memberCount}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{group.discount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
