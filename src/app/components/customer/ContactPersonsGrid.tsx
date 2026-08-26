import React from "react";
import svgPaths from "../../../imports/svg-uks517y0el";
import imgCheckbox from "figma:asset/898d19ffff6bfdba80f8fefc8d425930bb2656d8.png";
import imgCheckboxUnchecked from "figma:asset/74bd78976a668e1cc61b38017d679dff360ace45.png";
import { Search } from "lucide-react";

interface ContactPerson {
  id: string;
  name: string;
  identifier: string;
  email: string;
  phoneNumber: string;
  status: string;
  isMainContact: boolean;
}

const mockContacts: ContactPerson[] = [
  {
    id: "1",
    name: "Olivia Friberg",
    identifier: "11223344",
    email: "ofrib@eg.se",
    phoneNumber: "+46 707257076",
    status: "Active",
    isMainContact: true,
  },
  {
    id: "2",
    name: "Adrian Finnager",
    identifier: "44332211",
    email: "adfin@eg.no",
    phoneNumber: "+47 673578962",
    status: "Active",
    isMainContact: false,
  },
  {
    id: "3",
    name: "Emma Dahlgren",
    identifier: "00112233",
    email: "emdah@eg.se",
    phoneNumber: "+46 707257076",
    status: "Inactive",
    isMainContact: false,
  },
  {
    id: "4",
    name: "Sara Börjesson",
    identifier: "11223300",
    email: "sabor@eg.se",
    phoneNumber: "+46 707257076",
    status: "Active",
    isMainContact: false,
  },
];

export function ContactPersonsGrid() {
  const [selectedRow, setSelectedRow] = React.useState<string | null>("2");

  return (
    <div className="flex flex-col gap-[13px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-['Roboto_Condensed',sans-serif] font-bold text-[16px] leading-[19px] tracking-[0px] text-[#1a1a1a] uppercase">
          Contact person(s)
        </h3>
        <button
          type="button"
          onClick={() => console.log("Add contact person clicked")}
          className="bg-[#262626] hover:bg-[#1a1a1a] text-white font-['Roboto_Condensed',sans-serif] font-bold text-[12px] uppercase tracking-[0px] px-[16px] py-[8px] rounded-[4px] cursor-pointer"
        >
          Add contact person
        </button>
      </div>

      {/* Table */}
      <div className="overflow-auto">
        <div className="flex min-w-max">
          {/* Actions Column */}
          <div className="flex flex-col shrink-0 w-[60px]">
            {/* Header */}
            <div className="bg-[#595959] h-[28px] overflow-clip relative">
              <div className="-translate-y-1/2 absolute bg-white h-[10px] right-[16px] top-[calc(50%+2px)] w-[2px]" />
              <div className="-translate-y-1/2 absolute bg-white h-[2px] right-[12px] top-[calc(50%+2px)] w-[10px]" />
              <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_-1px_0px_0px_0px_white]" />
            </div>

            {/* Filter Row */}
            <div className="bg-[#f4f6f7] h-[45px] relative">
              <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_2px_0px_0px_white,inset_-1px_0px_0px_0px_white]" />
            </div>

            {/* Rows */}
            {mockContacts.map((contact) => (
              <div
                key={contact.id}
                className={`h-[43px] overflow-clip relative ${
                  selectedRow === contact.id ? "bg-[#e8ecee]" : "bg-white"
                }`}
              >
                {selectedRow === contact.id && (
                  <div className="-translate-y-1/2 absolute right-[20px] size-[20px] top-[calc(50%+0.5px)]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                      <g>
                        <mask height="4" id={`mask-${contact.id}`} maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="16" x="2" y="8">
                          <path d={svgPaths.p2d3e5d00} fill="var(--fill-0, #666666)" />
                        </mask>
                        <g mask={`url(#mask-${contact.id})`}>
                          <rect fill="var(--fill-0, #666666)" height="20" width="20" />
                        </g>
                      </g>
                    </svg>
                  </div>
                )}
                <div
                  className={`absolute inset-0 pointer-events-none rounded-[inherit] ${
                    selectedRow === contact.id
                      ? "shadow-[inset_0px_-1px_0px_0px_#b3b3b3,inset_0px_1px_0px_0px_#b3b3b3]"
                      : "shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]"
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Name Column */}
          <div className="flex flex-col flex-1 min-w-[199px]">
            <div className="bg-[#595959] h-[28px] overflow-clip relative">
              <p className="absolute bottom-[21.43%] font-['Roboto:Bold',sans-serif] leading-[normal] left-[10px] not-italic text-[13px] text-white top-[21.43%] uppercase">
                Name
              </p>
              <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_-1px_0px_0px_0px_white]" />
            </div>

            <div className="bg-[#f4f6f7] h-[45px] overflow-clip relative flex items-center px-[6px] gap-[6px]">
              <input
                type="text"
                className="flex-1 bg-white border border-[#ccc] h-[30px] px-[10px] text-[14px] font-['Roboto:Regular',sans-serif]"
              />
              <button className="bg-white border border-[#ccc] size-[30px] flex items-center justify-center">
                <Search className="size-[16px] text-[#1a1a1a]" />
              </button>
              <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_2px_0px_0px_white,inset_-1px_0px_0px_0px_white]" />
            </div>

            {mockContacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => setSelectedRow(contact.id)}
                className={`h-[43px] overflow-clip relative cursor-pointer ${
                  selectedRow === contact.id ? "bg-[#e8ecee]" : "bg-white"
                }`}
              >
                <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] left-[12px] not-italic text-[#1a1a1a] text-[14px] top-1/2 whitespace-nowrap">
                  <p className="leading-[normal]">{contact.name}</p>
                </div>
                <div
                  className={`absolute inset-0 pointer-events-none rounded-[inherit] ${
                    selectedRow === contact.id
                      ? "shadow-[inset_0px_-1px_0px_0px_#b3b3b3,inset_0px_1px_0px_0px_#b3b3b3]"
                      : "shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]"
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Identifier Column */}
          <div className="flex flex-col flex-1 min-w-[150px]">
            <div className="bg-[#595959] h-[28px] overflow-clip relative">
              <p className="absolute bottom-[21.43%] font-['Roboto:Bold',sans-serif] leading-[normal] left-[10px] not-italic text-[13px] text-white top-[21.43%] uppercase">
                Identifier
              </p>
              <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_-1px_0px_0px_0px_white]" />
            </div>

            <div className="bg-[#f4f6f7] h-[45px] overflow-clip relative flex items-center px-[6px] gap-[6px]">
              <input
                type="text"
                className="flex-1 bg-white border border-[#ccc] h-[30px] px-[10px] text-[14px] font-['Roboto:Regular',sans-serif]"
              />
              <button className="bg-white border border-[#ccc] size-[30px] flex items-center justify-center">
                <Search className="size-[16px] text-[#1a1a1a]" />
              </button>
              <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_2px_0px_0px_white,inset_-1px_0px_0px_0px_white]" />
            </div>

            {mockContacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => setSelectedRow(contact.id)}
                className={`h-[43px] overflow-clip relative cursor-pointer ${
                  selectedRow === contact.id ? "bg-[#e8ecee]" : "bg-white"
                }`}
              >
                <div className="absolute bg-[rgba(255,255,255,0.01)] content-stretch flex items-start left-[12px] pb-px top-[13px]">
                  <div className="flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] whitespace-nowrap">
                    <p className="leading-[normal]">{contact.identifier}</p>
                  </div>
                  <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#666]" />
                </div>
                <div
                  className={`absolute inset-0 pointer-events-none rounded-[inherit] ${
                    selectedRow === contact.id
                      ? "shadow-[inset_0px_-1px_0px_0px_#b3b3b3,inset_0px_1px_0px_0px_#b3b3b3]"
                      : "shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]"
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Email Column */}
          <div className="flex flex-col flex-1 min-w-[200px]">
            <div className="bg-[#595959] h-[28px] overflow-clip relative">
              <p className="absolute bottom-[21.43%] font-['Roboto:Bold',sans-serif] leading-[normal] left-[10px] not-italic text-[13px] text-white top-[21.43%] uppercase">
                Email
              </p>
              <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_-1px_0px_0px_0px_white]" />
            </div>

            <div className="bg-[#f4f6f7] h-[45px] overflow-clip relative flex items-center px-[6px] gap-[6px]">
              <input
                type="text"
                className="flex-1 bg-white border border-[#ccc] h-[30px] px-[10px] text-[14px] font-['Roboto:Regular',sans-serif]"
              />
              <button className="bg-white border border-[#ccc] size-[30px] flex items-center justify-center">
                <Search className="size-[16px] text-[#1a1a1a]" />
              </button>
              <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_2px_0px_0px_white,inset_-1px_0px_0px_0px_white]" />
            </div>

            {mockContacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => setSelectedRow(contact.id)}
                className={`h-[43px] overflow-clip relative cursor-pointer ${
                  selectedRow === contact.id ? "bg-[#e8ecee]" : "bg-white"
                }`}
              >
                <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] left-[12px] not-italic text-[#1a1a1a] text-[14px] top-1/2 whitespace-nowrap">
                  <p className="leading-[normal]">{contact.email}</p>
                </div>
                <div
                  className={`absolute inset-0 pointer-events-none rounded-[inherit] ${
                    selectedRow === contact.id
                      ? "shadow-[inset_0px_-1px_0px_0px_#b3b3b3,inset_0px_1px_0px_0px_#b3b3b3]"
                      : "shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]"
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Phone Number Column */}
          <div className="flex flex-col flex-1 min-w-[180px]">
            <div className="bg-[#595959] h-[28px] overflow-clip relative">
              <p className="absolute bottom-[21.43%] font-['Roboto:Bold',sans-serif] leading-[normal] left-[10px] not-italic text-[13px] text-white top-[21.43%] uppercase">
                Phone number
              </p>
              <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_-1px_0px_0px_0px_white]" />
            </div>

            <div className="bg-[#f4f6f7] h-[45px] overflow-clip relative flex items-center px-[6px] gap-[6px]">
              <input
                type="text"
                className="flex-1 bg-white border border-[#ccc] h-[30px] px-[10px] text-[14px] font-['Roboto:Regular',sans-serif]"
              />
              <button className="bg-white border border-[#ccc] size-[30px] flex items-center justify-center">
                <Search className="size-[16px] text-[#1a1a1a]" />
              </button>
              <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_2px_0px_0px_white,inset_-1px_0px_0px_0px_white]" />
            </div>

            {mockContacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => setSelectedRow(contact.id)}
                className={`h-[43px] overflow-clip relative cursor-pointer ${
                  selectedRow === contact.id ? "bg-[#e8ecee]" : "bg-white"
                }`}
              >
                <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] left-[12px] not-italic text-[#1a1a1a] text-[14px] top-1/2 whitespace-nowrap">
                  <p className="leading-[normal]">{contact.phoneNumber}</p>
                </div>
                <div
                  className={`absolute inset-0 pointer-events-none rounded-[inherit] ${
                    selectedRow === contact.id
                      ? "shadow-[inset_0px_-1px_0px_0px_#b3b3b3,inset_0px_1px_0px_0px_#b3b3b3]"
                      : "shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]"
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Status Column */}
          <div className="flex flex-col flex-1 min-w-[150px]">
            <div className="bg-[#595959] h-[28px] overflow-clip relative">
              <p className="absolute bottom-[21.43%] font-['Roboto:Bold',sans-serif] leading-[normal] left-[10px] not-italic text-[13px] text-white top-[21.43%] uppercase">
                Status
              </p>
              <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_-1px_0px_0px_0px_white]" />
            </div>

            <div className="bg-[#f4f6f7] h-[45px] overflow-clip relative flex items-center px-[6px] gap-[6px]">
              <input
                type="text"
                className="flex-1 bg-white border border-[#ccc] h-[30px] px-[10px] text-[14px] font-['Roboto:Regular',sans-serif]"
              />
              <button className="bg-white border border-[#ccc] size-[30px] flex items-center justify-center">
                <svg className="size-[20px]" fill="none" viewBox="0 0 20 20">
                  <g>
                    <mask height="4" id="mask-filter" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="8" x="6" y="8">
                      <path d="M14 8L10 12L6 8H14Z" fill="var(--fill-0, #666666)" />
                    </mask>
                    <g mask="url(#mask-filter)">
                      <rect fill="var(--fill-0, #666666)" height="20" width="20" />
                    </g>
                  </g>
                </svg>
              </button>
              <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_2px_0px_0px_white,inset_-1px_0px_0px_0px_white]" />
            </div>

            {mockContacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => setSelectedRow(contact.id)}
                className={`h-[43px] overflow-clip relative cursor-pointer ${
                  selectedRow === contact.id ? "bg-[#e8ecee]" : "bg-white"
                }`}
              >
                <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] left-[12px] not-italic text-[#1a1a1a] text-[14px] top-1/2 whitespace-nowrap">
                  <p className="leading-[normal]">{contact.status}</p>
                </div>
                <div
                  className={`absolute inset-0 pointer-events-none rounded-[inherit] ${
                    selectedRow === contact.id
                      ? "shadow-[inset_0px_-1px_0px_0px_#b3b3b3,inset_0px_1px_0px_0px_#b3b3b3]"
                      : "shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]"
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Main Contact Column */}
          <div className="flex flex-col shrink-0 w-[120px]">
            <div className="bg-[#595959] h-[28px] overflow-clip relative">
              <p className="absolute bottom-[21.43%] font-['Roboto:Bold',sans-serif] leading-[normal] left-[10px] not-italic text-[13px] text-white top-[21.43%] uppercase">
                Main contact
              </p>
              <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_-1px_0px_0px_0px_white]" />
            </div>

            <div className="bg-[#f4f6f7] h-[45px] overflow-clip relative flex items-center justify-center">
              <div className="bg-white border border-[#ccc] size-[30px] flex items-center justify-center">
                <div className="size-[20px] relative">
                  <div className="absolute bg-white inset-[10%]" />
                  <div className="absolute inset-0 mix-blend-multiply">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <img alt="" className="absolute h-[130%] left-[-15%] max-w-none top-[-15%] w-[135%]" src={imgCheckboxUnchecked} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_2px_0px_0px_white,inset_-1px_0px_0px_0px_white]" />
            </div>

            {mockContacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => setSelectedRow(contact.id)}
                className={`h-[43px] overflow-clip relative cursor-pointer ${
                  selectedRow === contact.id ? "bg-[#e8ecee]" : "bg-white"
                }`}
              >
                <div className="-translate-y-1/2 absolute left-[10px] size-[20px] top-[calc(50%+0.5px)]">
                  <div className="absolute bg-white inset-[10%]" />
                  <div className="absolute inset-0 mix-blend-multiply">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <img
                        alt=""
                        className="absolute h-[130%] left-[-15%] max-w-none top-[-15%] w-[135%]"
                        src={contact.isMainContact ? imgCheckbox : imgCheckboxUnchecked}
                      />
                    </div>
                  </div>
                </div>
                <div
                  className={`absolute inset-0 pointer-events-none rounded-[inherit] ${
                    selectedRow === contact.id
                      ? "shadow-[inset_0px_-1px_0px_0px_#b3b3b3,inset_0px_1px_0px_0px_#b3b3b3]"
                      : "shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}