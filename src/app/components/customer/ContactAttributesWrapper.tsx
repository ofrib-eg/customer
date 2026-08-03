import React from "react";

interface ContactAttributesWrapperProps {
  isAnonymized: boolean;
  displayOption?: 1 | 2 | 3;
}

function AnonymizedBanner({ displayOption }: { displayOption?: 1 | 2 | 3 }) {
  return null;
}

function Header({ text }: { text: string }) {
  return (
    <div className="content-stretch flex items-start overflow-clip pb-[10px] relative shrink-0 w-[240px]" data-name="Header 1">
      <p className="flex-[1_0_0] font-['Roboto_Condensed:Bold',sans-serif] leading-[19px] min-h-px min-w-px not-italic relative text-[#1a1a1a] text-[16px] uppercase whitespace-pre-wrap">{text}</p>
    </div>
  );
}

function ReadOnlyField({ label, value }: { label: string; value: string }) {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start pb-[10px] relative shrink-0 w-[240px]">
      <div className="content-stretch flex items-start relative shrink-0 w-full">
        <p className="flex-[1_0_0] font-['Roboto:Regular',sans-serif] leading-[normal] min-h-px min-w-px not-italic relative text-[#666] text-[14px] whitespace-pre-wrap">{label}</p>
      </div>
      <div className="content-stretch flex items-start overflow-clip relative shrink-0 w-full">
        <p className="flex-[1_0_0] font-['Roboto:Regular',sans-serif] leading-[normal] min-h-px min-w-px not-italic relative text-[#1a1a1a] text-[14px] whitespace-pre-wrap">{value}</p>
      </div>
    </div>
  );
}

function InputField({ label, value, type = "text" }: { label: string; value: string; type?: string }) {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start pb-[10px] relative shrink-0 w-[240px]">
      <div className="content-stretch flex items-start relative shrink-0 w-full">
        <p className="flex-[1_0_0] font-['Roboto:Regular',sans-serif] leading-[normal] min-h-px min-w-px not-italic relative text-[#666] text-[14px] whitespace-pre-wrap">{label}</p>
      </div>
      <div className="bg-white h-[32px] relative shrink-0 w-full">
        <div className="overflow-clip relative rounded-[inherit] size-full">
          <input 
            type={type}
            defaultValue={value}
            className="absolute font-['Roboto:Regular',sans-serif] inset-[8px_10px_7px_10px] leading-[normal] not-italic text-[#1a1a1a] text-[14px] bg-transparent border-none outline-none w-full"
          />
        </div>
        <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-0 pointer-events-none" />
      </div>
    </div>
  );
}

function SelectField({ label, value, options }: { label: string; value: string; options: { value: string; label: string }[] }) {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start pb-[10px] relative shrink-0 w-[240px]">
      <div className="content-stretch flex items-start relative shrink-0 w-full">
        <p className="flex-[1_0_0] font-['Roboto:Regular',sans-serif] leading-[normal] min-h-px min-w-px not-italic relative text-[#666] text-[14px] whitespace-pre-wrap">{label}</p>
      </div>
      <div className="bg-white h-[32px] relative shrink-0 w-full">
        <div className="overflow-clip relative rounded-[inherit] size-full">
          <select 
            defaultValue={value}
            className="absolute font-['Roboto:Regular',sans-serif] inset-[8px_29px_7px_10px] leading-[normal] not-italic text-[#1a1a1a] text-[14px] bg-transparent border-none outline-none w-full appearance-none cursor-pointer"
          >
            {options.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <div className="-translate-y-1/2 absolute right-[6px] size-[20px] top-1/2">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
              <g>
                <mask height="4" id="mask0_select" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="8" x="6" y="8">
                  <path d="M14 8L10 12L6 8H14Z" fill="var(--fill-0, #666666)" />
                </mask>
                <g mask="url(#mask0_select)">
                  <rect fill="var(--fill-0, #666666)" height="20" width="20" />
                </g>
              </g>
            </svg>
          </div>
        </div>
        <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-0 pointer-events-none" />
      </div>
    </div>
  );
}

function FieldWithIcon({ label, value, showIcon }: { label: string; value: string; showIcon?: boolean }) {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start pb-[10px] relative shrink-0 w-[240px]">
      <div className="content-stretch flex items-start relative shrink-0 w-full">
        <p className="flex-[1_0_0] font-['Roboto:Regular',sans-serif] leading-[normal] min-h-px min-w-px not-italic relative text-[#666] text-[14px] whitespace-pre-wrap">{label}</p>
      </div>
      <div className="content-stretch flex items-start overflow-clip relative shrink-0 w-full">
        <p className="flex-[1_0_0] font-['Roboto:Regular',sans-serif] leading-[normal] min-h-px min-w-px not-italic relative text-[#1a1a1a] text-[14px] whitespace-pre-wrap">{value}</p>
      </div>
    </div>
  );
}

function EditButton({ show }: { show: boolean }) {
  if (!show) return null;
  
  return (
    <div className="bg-[rgba(51,51,51,0.8)] content-stretch flex h-[24px] items-center px-[12px] py-[5px] relative shrink-0" data-name="Edit">
      <p className="font-['Roboto_Condensed:Bold',sans-serif] leading-[14px] not-italic opacity-90 relative shrink-0 text-[#e5e5e5] text-[12px] text-center text-shadow-[0px_0px_4px_rgba(0,0,0,0.5)] uppercase">Edit</p>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-2px_0px_0px_rgba(0,0,0,0.2)]" />
    </div>
  );
}

function SkeletonField({ label, width }: { label: string; width: string }) {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start pb-[10px] relative shrink-0 w-[240px]">
      <div className="content-stretch flex items-start relative shrink-0 w-full">
        <p className="flex-[1_0_0] font-['Roboto:Regular',sans-serif] leading-[normal] min-h-px min-w-px not-italic relative text-[#666] text-[14px] whitespace-pre-wrap">{label}</p>
      </div>
      <div className="content-stretch flex items-start overflow-clip relative shrink-0 w-full">
        <div 
          className="h-[14px] bg-[#E0E0E0] rounded" 
          style={{ width }}
        />
      </div>
    </div>
  );
}

function SkeletonFieldWithIcon({ label }: { label: string }) {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start pb-[10px] relative shrink-0 w-[240px]">
      <div className="content-stretch flex items-start relative shrink-0 w-full">
        <p className="flex-[1_0_0] font-['Roboto:Regular',sans-serif] leading-[normal] min-h-px min-w-px not-italic relative text-[#666] text-[14px] whitespace-pre-wrap">{label}</p>
      </div>
      <div className="content-stretch flex items-start overflow-clip relative shrink-0 w-full">
        <div className="h-[14px] w-[100px] bg-[#E0E0E0] rounded" />
      </div>
    </div>
  );
}

function Identifiers({ isAnonymized, displayOption }: { isAnonymized: boolean; displayOption?: 1 | 2 | 3 }) {
  const anonymizedText = displayOption === 2 ? "–" : "Anonymized";
  
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Identifiers">
      <Header text="identifiers" />
      {isAnonymized ? (
        displayOption === 3 ? (
          <>
            <ReadOnlyField label="Loyalty program" value="EG Trondheim" />
            <ReadOnlyField label="Identity number" value="19029871" />
            <SkeletonField label="Ext. identity number" width="70%" />
            <SkeletonField label="Mobile number" width="65%" />
            <SkeletonField label="Email" width="75%" />
            <SkeletonField label="SSN" width="60%" />
            <FieldWithIcon 
              label="Contact status" 
              value="Anonymized"
              showIcon={true}
            />
          </>
        ) : (
          <>
            <ReadOnlyField label="Loyalty program" value="EG Trondheim" />
            <ReadOnlyField label="Identity number" value="19029871" />
            <ReadOnlyField label="Ext. identity number" value={anonymizedText} />
            <ReadOnlyField label="Mobile number" value={anonymizedText} />
            <ReadOnlyField label="Email" value={anonymizedText} />
            <ReadOnlyField label="SSN" value={anonymizedText} />
            <FieldWithIcon 
              label="Contact status" 
              value="Anonymized"
              showIcon={true}
            />
          </>
        )
      ) : (
        <>
          <ReadOnlyField label="Loyalty program" value="EG Trondheim" />
          <ReadOnlyField label="Identity number" value="19029871" />
          <ReadOnlyField label="Mobile number" value="+4792231501" />
          <ReadOnlyField label="Email" value="Ola.n@eg.no" />
          <ReadOnlyField label="SSN" value="223150167865" />
          <ReadOnlyField label="Contact status" value="Active" />
          <EditButton show={true} />
        </>
      )}
    </div>
  );
}

function PersonalDetails({ isAnonymized, displayOption }: { isAnonymized: boolean; displayOption?: 1 | 2 | 3 }) {
  const anonymizedText = displayOption === 2 ? "–" : "Anonymized";
  
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Personal details">
      <Header text="personal details" />
      {isAnonymized ? (
        displayOption === 3 ? (
          <>
            <SkeletonField label="First name" width="55%" />
            <SkeletonField label="Last name" width="60%" />
            <SkeletonField label="Birth date" width="50%" />
            <SkeletonField label="Gender" width="45%" />
          </>
        ) : (
          <>
            <ReadOnlyField label="First name" value={anonymizedText} />
            <ReadOnlyField label="Last name" value={anonymizedText} />
            <ReadOnlyField label="Birth date" value={anonymizedText} />
            <ReadOnlyField label="Gender" value={anonymizedText} />
          </>
        )
      ) : (
        <>
          <InputField label="First name" value="Melina" />
          <InputField label="Last name" value="Andersson" />
          <InputField label="Birth date" value="14.03.1987" />
          <SelectField 
            label="Gender" 
            value="Female"
            options={[
              { value: "Female", label: "Female" },
              { value: "Male", label: "Male" },
              { value: "Other", label: "Other" }
            ]}
          />
        </>
      )}
    </div>
  );
}

function ContactAddress({ isAnonymized, displayOption }: { isAnonymized: boolean; displayOption?: 1 | 2 | 3 }) {
  const anonymizedText = displayOption === 2 ? "–" : "Anonymized";
  
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Contact address">
      <Header text="contact address" />
      {isAnonymized ? (
        displayOption === 3 ? (
          <>
            <SkeletonField label="Address" width="80%" />
            <SkeletonField label="Address line 2" width="70%" />
            <SkeletonField label="Postal code" width="40%" />
            <SkeletonField label="City" width="55%" />
            <SkeletonField label="Country" width="50%" />
          </>
        ) : (
          <>
            <ReadOnlyField label="Address" value={anonymizedText} />
            <ReadOnlyField label="Address line 2" value={anonymizedText} />
            <ReadOnlyField label="Postal code" value={anonymizedText} />
            <ReadOnlyField label="City" value={anonymizedText} />
            <ReadOnlyField label="Country" value={anonymizedText} />
          </>
        )
      ) : (
        <>
          <InputField label="Address" value="Munkegata 19" />
          <InputField label="Address line 2" value="" />
          <InputField label="Postal code" value="7011" />
          <InputField label="City" value="Trondheim" />
          <SelectField 
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
    </div>
  );
}

function Others({ isAnonymized, displayOption }: { isAnonymized: boolean; displayOption?: 1 | 2 | 3 }) {
  const anonymizedText = displayOption === 2 ? "–" : "Anonymized";
  
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Others">
      <Header text="others" />
      {isAnonymized ? (
        displayOption === 3 ? (
          <SkeletonField label="Phone number" width="65%" />
        ) : (
          <ReadOnlyField label="Phone number" value={anonymizedText} />
        )
      ) : (
        <InputField label="Phone number" value="+4792231501" />
      )}
    </div>
  );
}

export default function ContactAttributesWrapper({ isAnonymized, displayOption = 1 }: ContactAttributesWrapperProps) {
  return (
    <div className="w-full">
      {isAnonymized && (displayOption === 2 || displayOption === 3) && <AnonymizedBanner displayOption={displayOption} />}
      <div className="content-stretch flex flex-col lg:flex-row gap-[30px] lg:gap-[60px] items-start relative w-full" data-name="Contact attributes">
        <Identifiers isAnonymized={isAnonymized} displayOption={displayOption} />
        <PersonalDetails isAnonymized={isAnonymized} displayOption={displayOption} />
        <ContactAddress isAnonymized={isAnonymized} displayOption={displayOption} />
        <Others isAnonymized={isAnonymized} displayOption={displayOption} />
      </div>
    </div>
  );
}