import svgPaths from "./svg-xrenxgf0fu";

function Header() {
  return (
    <div className="content-stretch flex items-start overflow-clip pb-[10px] relative shrink-0 w-[240px]" data-name="Header 1">
      <p className="flex-[1_0_0] font-['Roboto_Condensed:Bold',sans-serif] leading-[19px] min-h-px min-w-px not-italic relative text-[#1a1a1a] text-[16px] uppercase whitespace-pre-wrap">identifiers</p>
    </div>
  );
}

function FieldLabel() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="// Field label">
      <p className="flex-[1_0_0] font-['Roboto:Regular',sans-serif] leading-[normal] min-h-px min-w-px not-italic relative text-[#666] text-[14px] whitespace-pre-wrap">Loyalty program</p>
    </div>
  );
}

function ActionIcon() {
  return (
    <div className="-translate-y-1/2 absolute right-[6px] size-[20px] top-1/2" data-name="Action icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Action icon">
          <mask height="4" id="mask0_loyalty" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="8" x="6" y="8">
            <path d="M14 8L10 12L6 8H14Z" fill="var(--fill-0, #666666)" id="Union" />
          </mask>
          <g mask="url(#mask0_loyalty)">
            <rect fill="var(--fill-0, #666666)" height="20" id="Color" width="20" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-white h-[32px] relative shrink-0 w-full" data-name="Input">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <input 
          type="text"
          defaultValue="EG Trondheim"
          className="absolute font-['Roboto:Regular',sans-serif] inset-[8px_10px_7px_10px] leading-[normal] not-italic text-[#1a1a1a] text-[14px] bg-transparent border-none outline-none w-full"
        />
        <ActionIcon />
      </div>
      <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function LoyaltyProgram() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start pb-[10px] relative shrink-0 w-[240px]" data-name="Loyalty program">
      <FieldLabel />
      <Input />
    </div>
  );
}

function FieldLabelIdentity() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="// Field label">
      <p className="flex-[1_0_0] font-['Roboto:Regular',sans-serif] leading-[normal] min-h-px min-w-px not-italic relative text-[#666] text-[14px] whitespace-pre-wrap">Identity number</p>
    </div>
  );
}

function InputIdentity() {
  return (
    <div className="bg-white h-[32px] relative shrink-0 w-full" data-name="Input">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <input 
          type="text"
          defaultValue="19029871"
          className="absolute font-['Roboto:Regular',sans-serif] inset-[8px_10px_7px_10px] leading-[normal] not-italic text-[#1a1a1a] text-[14px] bg-transparent border-none outline-none w-full"
        />
      </div>
      <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function IdentityNumber() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start pb-[10px] relative shrink-0 w-[240px]" data-name="Identity number">
      <FieldLabelIdentity />
      <InputIdentity />
    </div>
  );
}

function FieldLabel1() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="// Field label">
      <p className="flex-[1_0_0] font-['Roboto:Regular',sans-serif] leading-[normal] min-h-px min-w-px not-italic relative text-[#666] text-[14px] whitespace-pre-wrap">Mobile number</p>
    </div>
  );
}

function Input1() {
  return (
    <div className="bg-white h-[32px] relative shrink-0 w-full" data-name="Input">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <input 
          type="text"
          defaultValue="+4792231501"
          className="absolute font-['Roboto:Regular',sans-serif] inset-[8px_10px_7px_10px] leading-[normal] not-italic text-[#1a1a1a] text-[14px] bg-transparent border-none outline-none w-full"
        />
      </div>
      <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function MobileNumber() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start pb-[10px] relative shrink-0 w-[240px]" data-name="Mobile number">
      <FieldLabel1 />
      <Input1 />
    </div>
  );
}

function FieldLabel2() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="// Field label">
      <p className="flex-[1_0_0] font-['Roboto:Regular',sans-serif] leading-[normal] min-h-px min-w-px not-italic relative text-[#666] text-[14px] whitespace-pre-wrap">Email</p>
    </div>
  );
}

function Input2() {
  return (
    <div className="bg-white h-[32px] relative shrink-0 w-full" data-name="Input">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <input 
          type="email"
          defaultValue="Ola.n@eg.no"
          className="absolute font-['Roboto:Regular',sans-serif] inset-[8px_10px_7px_10px] leading-[normal] not-italic text-[#1a1a1a] text-[14px] bg-transparent border-none outline-none w-full"
        />
      </div>
      <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Email() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start pb-[10px] relative shrink-0 w-[240px]" data-name="Email">
      <FieldLabel2 />
      <Input2 />
    </div>
  );
}

function FieldLabel3() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="// Field label">
      <p className="flex-[1_0_0] font-['Roboto:Regular',sans-serif] leading-[normal] min-h-px min-w-px not-italic relative text-[#666] text-[14px] whitespace-pre-wrap">SSN</p>
    </div>
  );
}

function Input3() {
  return (
    <div className="bg-white h-[32px] relative shrink-0 w-full" data-name="Input">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <input 
          type="text"
          defaultValue="223150167865"
          className="absolute font-['Roboto:Regular',sans-serif] inset-[8px_10px_7px_10px] leading-[normal] not-italic text-[#1a1a1a] text-[14px] bg-transparent border-none outline-none w-full"
        />
      </div>
      <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Ssn() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start pb-[10px] relative shrink-0 w-[240px]" data-name="SSN">
      <FieldLabel3 />
      <Input3 />
    </div>
  );
}

function FieldLabel4() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="// Field label">
      <p className="flex-[1_0_0] font-['Roboto:Regular',sans-serif] leading-[normal] min-h-px min-w-px not-italic relative text-[#666] text-[14px] whitespace-pre-wrap">Contact status</p>
    </div>
  );
}

function ActionIconStatus() {
  return (
    <div className="-translate-y-1/2 absolute right-[6px] size-[20px] top-1/2" data-name="Action icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Action icon">
          <mask height="4" id="mask0_status" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="8" x="6" y="8">
            <path d="M14 8L10 12L6 8H14Z" fill="var(--fill-0, #666666)" id="Union" />
          </mask>
          <g mask="url(#mask0_status)">
            <rect fill="var(--fill-0, #666666)" height="20" id="Color" width="20" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Input4() {
  return (
    <div className="bg-white h-[32px] relative shrink-0 w-full" data-name="Input">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <select 
          defaultValue="Active"
          className="absolute font-['Roboto:Regular',sans-serif] inset-[8px_29px_7px_10px] leading-[normal] not-italic text-[#1a1a1a] text-[14px] bg-transparent border-none outline-none w-full appearance-none cursor-pointer"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <ActionIconStatus />
      </div>
      <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function ContactStatus() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start pb-[10px] relative shrink-0 w-[240px]" data-name="Contact status">
      <FieldLabel4 />
      <Input4 />
    </div>
  );
}

function Edit() {
  return (
    <div className="bg-[rgba(51,51,51,0.8)] content-stretch flex h-[24px] items-center px-[12px] py-[5px] relative shrink-0" data-name="Edit">
      <p className="font-['Roboto_Condensed:Bold',sans-serif] leading-[14px] not-italic opacity-90 relative shrink-0 text-[#e5e5e5] text-[12px] text-center text-shadow-[0px_0px_4px_rgba(0,0,0,0.5)] uppercase">Edit</p>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-2px_0px_0px_rgba(0,0,0,0.2)]" />
    </div>
  );
}

function Identifiers() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Identifiers">
      <Header />
      <LoyaltyProgram />
      <IdentityNumber />
      <MobileNumber />
      <Email />
      <Ssn />
      <ContactStatus />
      <Edit />
    </div>
  );
}

function Header1() {
  return (
    <div className="content-stretch flex items-start overflow-clip pb-[10px] relative shrink-0 w-[240px]" data-name="Header 1">
      <p className="flex-[1_0_0] font-['Roboto_Condensed:Bold',sans-serif] leading-[19px] min-h-px min-w-px not-italic relative text-[#1a1a1a] text-[16px] uppercase whitespace-pre-wrap">pERsonal details</p>
    </div>
  );
}

function FieldLabel5() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="// Field label">
      <p className="flex-[1_0_0] font-['Roboto:Regular',sans-serif] leading-[normal] min-h-px min-w-px not-italic relative text-[#666] text-[14px] whitespace-pre-wrap">First name</p>
    </div>
  );
}

function Input5() {
  return (
    <div className="bg-white h-[32px] relative shrink-0 w-full" data-name="Input">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <input 
          type="text"
          defaultValue="Melina"
          className="absolute font-['Roboto:Regular',sans-serif] inset-[8px_10px_7px_10px] leading-[normal] not-italic text-[#1a1a1a] text-[14px] bg-transparent border-none outline-none w-full"
        />
      </div>
      <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function FirstName() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] h-[61px] items-start pb-[10px] relative shrink-0 w-[240px]" data-name="First name">
      <FieldLabel5 />
      <Input5 />
    </div>
  );
}

function FieldLabel6() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="// Field label">
      <p className="flex-[1_0_0] font-['Roboto:Regular',sans-serif] leading-[normal] min-h-px min-w-px not-italic relative text-[#666] text-[14px] whitespace-pre-wrap">Last name</p>
    </div>
  );
}

function Input6() {
  return (
    <div className="bg-white h-[32px] relative shrink-0 w-full" data-name="Input">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <input 
          type="text"
          defaultValue="Andersson"
          className="absolute font-['Roboto:Regular',sans-serif] inset-[8px_10px_7px_10px] leading-[normal] not-italic text-[#1a1a1a] text-[14px] bg-transparent border-none outline-none w-full"
        />
      </div>
      <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function LastName() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start pb-[10px] relative shrink-0 w-[240px]" data-name="Last name">
      <FieldLabel6 />
      <Input6 />
    </div>
  );
}

function FieldLabel7() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="// Field label">
      <p className="flex-[1_0_0] font-['Roboto:Regular',sans-serif] leading-[normal] min-h-px min-w-px not-italic relative text-[#666] text-[14px] whitespace-pre-wrap">Birth date</p>
    </div>
  );
}

function ActionIconDate() {
  return (
    <div className="-translate-y-1/2 absolute right-[6px] size-[20px] top-1/2" data-name="Action icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Action icon">
          <mask height="15" id="mask0_13_14780" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="14" x="3" y="2">
            <path d={svgPaths.p30b96200} fill="var(--fill-0, #666666)" id="Union" />
          </mask>
          <g mask="url(#mask0_13_14780)">
            <rect fill="var(--fill-0, #666666)" height="20" id="Color" width="20" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Input7() {
  return (
    <div className="bg-white h-[32px] relative shrink-0 w-full" data-name="Input">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <input 
          type="text"
          defaultValue="23/07/1979"
          className="absolute font-['Roboto:Regular',sans-serif] inset-[8px_29px_7px_10px] leading-[normal] not-italic text-[#1a1a1a] text-[14px] bg-transparent border-none outline-none w-full"
        />
        <ActionIconDate />
      </div>
      <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function BirthDate() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start pb-[10px] relative shrink-0 w-[240px]" data-name="Birth date">
      <FieldLabel7 />
      <Input7 />
    </div>
  );
}

function FieldLabel8() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="// Field label">
      <p className="flex-[1_0_0] font-['Roboto:Regular',sans-serif] leading-[normal] min-h-px min-w-px not-italic relative text-[#666] text-[14px] whitespace-pre-wrap">Gender</p>
    </div>
  );
}

function ActionIcon1() {
  return (
    <div className="-translate-y-1/2 absolute right-[6px] size-[20px] top-1/2" data-name="Action icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Action icon">
          <mask height="4" id="mask0_13_14775" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="8" x="6" y="8">
            <path d="M14 8L10 12L6 8H14Z" fill="var(--fill-0, #666666)" id="Union" />
          </mask>
          <g mask="url(#mask0_13_14775)">
            <rect fill="var(--fill-0, #666666)" height="20" id="Color" width="20" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Input8() {
  return (
    <div className="bg-white h-[32px] relative shrink-0 w-full" data-name="Input">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <select 
          defaultValue="Female"
          className="absolute font-['Roboto:Regular',sans-serif] inset-[8px_29px_7px_10px] leading-[normal] not-italic text-[#1a1a1a] text-[14px] bg-transparent border-none outline-none w-full appearance-none cursor-pointer"
        >
          <option value="Female">Female</option>
          <option value="Male">Male</option>
          <option value="Other">Other</option>
        </select>
        <ActionIcon1 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Gender() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start pb-[10px] relative shrink-0 w-[240px]" data-name="Gender">
      <FieldLabel8 />
      <Input8 />
    </div>
  );
}

function PersonalDetails() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Personal details">
      <Header1 />
      <FirstName />
      <LastName />
      <BirthDate />
      <Gender />
    </div>
  );
}

function Header2() {
  return (
    <div className="content-stretch flex items-start overflow-clip pb-[10px] relative shrink-0 w-[240px]" data-name="Header 1">
      <p className="flex-[1_0_0] font-['Roboto_Condensed:Bold',sans-serif] leading-[19px] min-h-px min-w-px not-italic relative text-[#1a1a1a] text-[16px] uppercase whitespace-pre-wrap">contact address</p>
    </div>
  );
}

function FieldLabel9() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="// Field label">
      <p className="flex-[1_0_0] font-['Roboto:Regular',sans-serif] leading-[normal] min-h-px min-w-px not-italic relative text-[#666] text-[14px] whitespace-pre-wrap">Address</p>
    </div>
  );
}

function Input9() {
  return (
    <div className="bg-white h-[32px] relative shrink-0 w-full" data-name="Input">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <input 
          type="text"
          defaultValue="Fredsgatan 3"
          className="absolute font-['Roboto:Regular',sans-serif] inset-[8px_10px_7px_10px] leading-[normal] not-italic text-[#1a1a1a] text-[14px] bg-transparent border-none outline-none w-full"
        />
      </div>
      <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Address1() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start pb-[10px] relative shrink-0 w-[240px]" data-name="Address">
      <FieldLabel9 />
      <Input9 />
    </div>
  );
}

function FieldLabel10() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="// Field label">
      <p className="flex-[1_0_0] font-['Roboto:Regular',sans-serif] leading-[normal] min-h-px min-w-px not-italic relative text-[#666] text-[14px] whitespace-pre-wrap">Address line 2</p>
    </div>
  );
}

function Input10() {
  return (
    <div className="bg-white h-[32px] relative shrink-0 w-full" data-name="Input">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <input 
          type="text"
          defaultValue="ÖV"
          className="absolute font-['Roboto:Regular',sans-serif] inset-[8px_10px_7px_10px] leading-[normal] not-italic text-[#1a1a1a] text-[14px] bg-transparent border-none outline-none w-full"
        />
      </div>
      <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Address2() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start pb-[10px] relative shrink-0 w-[240px]" data-name="Address">
      <FieldLabel10 />
      <Input10 />
    </div>
  );
}

function FieldLabel11() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="// Field label">
      <p className="flex-[1_0_0] font-['Roboto:Regular',sans-serif] leading-[normal] min-h-px min-w-px not-italic relative text-[#666] text-[14px] whitespace-pre-wrap">Postal code</p>
    </div>
  );
}

function Input11() {
  return (
    <div className="bg-white h-[32px] relative shrink-0 w-full" data-name="Input">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <input 
          type="text"
          defaultValue="413 09"
          className="absolute font-['Roboto:Regular',sans-serif] inset-[8px_10px_7px_10px] leading-[normal] not-italic text-[#1a1a1a] text-[14px] bg-transparent border-none outline-none w-full"
        />
      </div>
      <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function PostalCode() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start pb-[10px] relative shrink-0 w-[100px]" data-name="Postal code">
      <FieldLabel11 />
      <Input11 />
    </div>
  );
}

function FieldLabel12() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="// Field label">
      <p className="flex-[1_0_0] font-['Roboto:Regular',sans-serif] leading-[normal] min-h-px min-w-px not-italic relative text-[#666] text-[14px] whitespace-pre-wrap">City</p>
    </div>
  );
}

function Input12() {
  return (
    <div className="bg-white h-[32px] relative shrink-0 w-full" data-name="Input">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <input 
          type="text"
          defaultValue="Göteborg"
          className="absolute font-['Roboto:Regular',sans-serif] inset-[8px_10px_7px_10px] leading-[normal] not-italic text-[#1a1a1a] text-[14px] bg-transparent border-none outline-none w-full"
        />
      </div>
      <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function City() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start pb-[10px] relative shrink-0 w-[240px]" data-name="City">
      <FieldLabel12 />
      <Input12 />
    </div>
  );
}

function FieldLabel13() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="// Field label">
      <p className="flex-[1_0_0] font-['Roboto:Regular',sans-serif] leading-[normal] min-h-px min-w-px not-italic relative text-[#666] text-[14px] whitespace-pre-wrap">Country</p>
    </div>
  );
}

function ActionIcon2() {
  return (
    <div className="-translate-y-1/2 absolute right-[6px] size-[20px] top-1/2" data-name="Action icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Action icon">
          <mask height="4" id="mask0_country" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="8" x="6" y="8">
            <path d="M14 8L10 12L6 8H14Z" fill="var(--fill-0, #666666)" id="Union" />
          </mask>
          <g mask="url(#mask0_country)">
            <rect fill="var(--fill-0, #666666)" height="20" id="Color" width="20" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Input13() {
  return (
    <div className="bg-white h-[32px] relative shrink-0 w-full" data-name="Input">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <select 
          defaultValue="Sweden"
          className="absolute font-['Roboto:Regular',sans-serif] inset-[8px_29px_7px_10px] leading-[normal] not-italic text-[#1a1a1a] text-[14px] bg-transparent border-none outline-none w-full appearance-none cursor-pointer"
        >
          <option value="Sweden">Sweden</option>
          <option value="Norway">Norway</option>
          <option value="Denmark">Denmark</option>
          <option value="Finland">Finland</option>
        </select>
        <ActionIcon2 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Country() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start pb-[10px] relative shrink-0 w-[240px]" data-name="Country">
      <FieldLabel13 />
      <Input13 />
    </div>
  );
}

function Address() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Address">
      <Header2 />
      <Address1 />
      <Address2 />
      <PostalCode />
      <City />
      <Country />
    </div>
  );
}

function Header3() {
  return (
    <div className="content-stretch flex items-start overflow-clip pb-[10px] relative shrink-0 w-[240px]" data-name="Header 1">
      <p className="flex-[1_0_0] font-['Roboto_Condensed:Bold',sans-serif] leading-[19px] min-h-px min-w-px not-italic relative text-[#1a1a1a] text-[16px] uppercase whitespace-pre-wrap">others</p>
    </div>
  );
}

function FieldLabel14() {
  return (
    <div className="content-stretch flex h-[17px] items-start relative shrink-0 w-full" data-name="// Field label">
      <p className="flex-[1_0_0] font-['Roboto:Regular',sans-serif] leading-[normal] min-h-px min-w-px not-italic relative text-[#666] text-[14px] whitespace-pre-wrap">Phone number</p>
    </div>
  );
}

function ActionIcon3() {
  return (
    <div className="-translate-y-1/2 absolute right-[6px] size-[20px] top-1/2" data-name="Action icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Action icon">
          <mask height="4" id="mask0_phone" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="8" x="6" y="8">
            <path d="M14 8L10 12L6 8H14Z" fill="var(--fill-0, #666666)" id="Union" />
          </mask>
          <g mask="url(#mask0_phone)">
            <rect fill="var(--fill-0, #666666)" height="20" id="Color" width="20" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Input14() {
  return (
    <div className="bg-white h-[32px] relative shrink-0 w-[65px]" data-name="Input">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <select 
          defaultValue="+46"
          className="absolute font-['Roboto:Regular',sans-serif] inset-[8px_29px_7px_10px] leading-[normal] not-italic text-[#1a1a1a] text-[14px] bg-transparent border-none outline-none w-full appearance-none cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap"
        >
          <option value="+46">+46</option>
          <option value="+47">+47</option>
          <option value="+45">+45</option>
          <option value="+358">+358</option>
        </select>
        <ActionIcon3 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Input15() {
  return (
    <div className="bg-white flex-[1_0_0] h-[32px] min-h-px min-w-px relative" data-name="Input">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <input 
          type="text"
          defaultValue="031 56 45 45"
          className="absolute font-['Roboto:Regular',sans-serif] inset-[8px_10px_7px_10px] leading-[normal] not-italic text-[#1a1a1a] text-[14px] bg-transparent border-none outline-none w-full overflow-hidden text-ellipsis whitespace-nowrap"
        />
      </div>
      <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex gap-[2px] h-[42px] items-start pb-[10px] relative shrink-0 w-full">
      <Input14 />
      <Input15 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0 w-[242px]">
      <FieldLabel14 />
      <Frame />
    </div>
  );
}

function Other() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Other">
      <Header3 />
      <Frame1 />
    </div>
  );
}

export default function ContactAttributes() {
  return (
    <div className="content-stretch flex gap-[60px] items-start relative size-full" data-name="Contact attributes">
      <Identifiers />
      <PersonalDetails />
      <Address />
      <Other />
    </div>
  );
}