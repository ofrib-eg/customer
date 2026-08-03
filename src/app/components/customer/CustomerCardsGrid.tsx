import React from "react";
import { useNavigate } from "react-router";

const mockCustomerCards = [
  { id: 1, cardNumber: "1234-5678-9012-3456", customerName: "Acme Corporation", issuedDate: "2024-01-15", expiryDate: "2027-01-15", status: "Active", cardType: "Gold" },
  { id: 2, cardNumber: "2345-6789-0123-4567", customerName: "Nordic Solutions AS", issuedDate: "2024-02-20", expiryDate: "2027-02-20", status: "Active", cardType: "Platinum" },
  { id: 3, cardNumber: "3456-7890-1234-5678", customerName: "Tech Innovators", issuedDate: "2023-11-10", expiryDate: "2026-11-10", status: "Expired", cardType: "Silver" },
  { id: 4, cardNumber: "4567-8901-2345-6789", customerName: "Retail Group Norway", issuedDate: "2024-03-05", expiryDate: "2027-03-05", status: "Active", cardType: "Gold" },
  { id: 5, cardNumber: "5678-9012-3456-7890", customerName: "Local Shop AS", issuedDate: "2024-01-25", expiryDate: "2027-01-25", status: "Active", cardType: "Silver" },
];

export function CustomerCardsGrid() {
  const navigate = useNavigate();

  const handleRowClick = (cardId: number) => {
    navigate(`/customer/customer-cards/${cardId}`);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex-1 overflow-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">Card Number</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">Customer Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">Card Type</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">Issued Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">Expiry Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockCustomerCards.map((card) => (
              <tr
                key={card.id}
                onClick={() => handleRowClick(card.id)}
                className="hover:bg-blue-50 cursor-pointer transition-colors"
              >
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{card.cardNumber}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{card.customerName}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{card.cardType}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{card.issuedDate}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{card.expiryDate}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    card.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}>
                    {card.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
