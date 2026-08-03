import React from 'react';
import { useNavigate } from 'react-router';

interface RelationshipsTableProps {
  isAnonymized?: boolean;
}

export default function RelationshipsTable({ isAnonymized = false }: RelationshipsTableProps) {
  const navigate = useNavigate();

  const handleIdentifierClick = (identifier: string) => {
    // Map identifiers to contact IDs (in real app, this would be an API call)
    const identifierToContactId: Record<string, number> = {
      '44332211': 2,
      '11223300': 1,
    };
    
    const contactId = identifierToContactId[identifier];
    if (contactId) {
      navigate(`/customer/contacts/${contactId}`);
    }
  };

  return (
    <div className="content-stretch flex flex-col gap-[13px] items-start relative w-full" data-name="Relationships">
      <div className="content-stretch flex items-start overflow-clip pb-[10px] relative shrink-0 w-[240px]" data-name="Header 1">
        <p className="flex-[1_0_0] font-['Roboto_Condensed:Bold',sans-serif] leading-[19px] min-h-px min-w-px not-italic relative text-[#1a1a1a] text-[16px] uppercase whitespace-pre-wrap">relationships</p>
      </div>
      
      <div className="overflow-x-auto w-full">
        <table className="w-full border-collapse min-w-[600px]">
          <thead>
            <tr>
              <th className="bg-[#595959] h-[28px] text-left px-[10px] text-white font-['Roboto:Bold',sans-serif] text-[13px] uppercase border-r border-white w-[20%] min-w-[150px]">Relationship type</th>
              <th className="bg-[#595959] h-[28px] text-left px-[10px] text-white font-['Roboto:Bold',sans-serif] text-[13px] uppercase border-r border-white w-[15%] min-w-[120px]">Identifier</th>
              <th className="bg-[#595959] h-[28px] text-left px-[10px] text-white font-['Roboto:Bold',sans-serif] text-[13px] uppercase border-r border-white w-[25%] min-w-[150px]">Name</th>
              <th className="bg-[#595959] h-[28px] text-left px-[10px] text-white font-['Roboto:Bold',sans-serif] text-[13px] uppercase border-r border-white w-[25%] min-w-[150px]">Connection</th>
              <th className="bg-[#595959] h-[28px] text-left px-[10px] text-white font-['Roboto:Bold',sans-serif] text-[13px] uppercase w-[15%] min-w-[100px]">Status</th>
            </tr>
          </thead>
          <tbody>
            {/* Row 1: Business customer */}
            <tr>
              <td className="bg-[#e8ecee] h-[43px] px-[12px] font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a] border-y border-[#b3b3b3]">Business customer</td>
              <td className="bg-[#e8ecee] h-[43px] px-[12px] font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a] border-y border-[#b3b3b3]">
                <button
                  onClick={() => handleIdentifierClick('44332211')}
                  className="border-b-2 border-[#e58108] hover:border-[#c66d06] transition-colors cursor-pointer bg-transparent text-[14px] font-['Roboto:Regular',sans-serif] text-[#1a1a1a] p-0 hover:text-[#e58108]"
                >
                  44332211
                </button>
              </td>
              <td className="bg-[#e8ecee] h-[43px] px-[12px] font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a] border-y border-[#b3b3b3]">
                EG Retail Göteborg
              </td>
              <td className="bg-[#e8ecee] h-[43px] px-[12px] font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a] border-y border-[#b3b3b3]">x-store name</td>
              <td className="bg-[#e8ecee] h-[43px] px-[12px] font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a] border-y border-[#b3b3b3]">Draft</td>
            </tr>
            
            {/* Row 2: Private customer - hidden when anonymized */}
            {!isAnonymized && (
              <tr>
                <td className="bg-white h-[43px] px-[12px] font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a] border-y border-[#e5e5e5]">Private customer</td>
                <td className="bg-white h-[43px] px-[12px] font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a] border-y border-[#e5e5e5]">
                  <button
                    onClick={() => handleIdentifierClick('11223300')}
                    className="border-b border-[#666] hover:border-[#1a1a1a] transition-colors cursor-pointer bg-transparent text-[14px] font-['Roboto:Regular',sans-serif] text-[#1a1a1a] p-0 hover:text-[#e58108]"
                  >
                    11223300
                  </button>
                </td>
                <td className="bg-white h-[43px] px-[12px] font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a] border-y border-[#e5e5e5]">
                  Melina Andersson
                </td>
                <td className="bg-white h-[43px] px-[12px] font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a] border-y border-[#e5e5e5]">x-store name</td>
                <td className="bg-white h-[43px] px-[12px] font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a] border-y border-[#e5e5e5]">Active</td>
              </tr>
            )}
            
            {/* Row 3: Member */}
            <tr>
              <td className="bg-white h-[43px] px-[12px] font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a] border-y border-[#e5e5e5]">Member</td>
              <td className="bg-white h-[43px] px-[12px] font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a] border-y border-[#e5e5e5]">
                <button
                  onClick={() => handleIdentifierClick('11223300')}
                  className="border-b border-[#666] hover:border-[#1a1a1a] transition-colors cursor-pointer bg-transparent text-[14px] font-['Roboto:Regular',sans-serif] text-[#1a1a1a] p-0 hover:text-[#e58108]"
                >
                  11223300
                </button>
              </td>
              <td className="bg-white h-[43px] px-[12px] font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a] border-y border-[#e5e5e5]">
                {isAnonymized ? '–' : 'Melina Andersson'}
              </td>
              <td className="bg-white h-[43px] px-[12px] font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a] border-y border-[#e5e5e5]">Loyalty program X</td>
              <td className="bg-white h-[43px] px-[12px] font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a] border-y border-[#e5e5e5]">Active</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}