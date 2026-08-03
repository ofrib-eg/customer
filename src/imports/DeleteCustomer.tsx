import svgPaths from "./svg-pghxzxfdsi";

function Content1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[24px] items-start min-h-px min-w-px py-[6px] relative" data-name="Content">
      <p className="font-['Roboto:Regular',sans-serif] leading-[1.4] not-italic relative shrink-0 text-[#191919] text-[15px]">This customer will permanently be deleted.</p>
    </div>
  );
}

function Left() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Left">
      <div className="content-stretch flex gap-[16px] items-start pl-[8px] relative w-full">
        <div className="overflow-clip relative self-stretch shrink-0 w-[20px]" data-name="Info icon">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%-0.5px)] size-[19px] top-[calc(50%-0.5px)]" data-name="Primary">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 19">
              <path d={svgPaths.p1513dd70} fill="var(--fill-0, #191919)" id="Primary" />
            </svg>
          </div>
        </div>
        <Content1 />
      </div>
    </div>
  );
}

function Checkbox() {
  return (
    <button className="block cursor-pointer relative shrink-0 size-[16px]" data-name="Checkbox">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Checkbox">
          <rect fill="#808080" height="16" width="16" />
          <path d={svgPaths.p1637d280} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </button>
  );
}

function Content() {
  return (
    <div className="relative shrink-0 w-full" data-name="Content">
      <div className="content-stretch flex flex-col gap-[10px] items-start pb-[16px] pt-[8px] px-[30px] relative w-full">
        <div className="bg-[rgba(0,0,0,0.04)] relative rounded-[8px] shrink-0 w-full" data-name="Alert">
          <div aria-hidden="true" className="absolute border-2 border-[#666] border-solid inset-0 pointer-events-none rounded-[8px]" />
          <div className="content-stretch flex gap-[16px] items-start p-[12px] relative w-full">
            <Left />
          </div>
        </div>
        <div className="content-stretch flex gap-[10px] items-start pb-[15px] pt-[5px] relative shrink-0 w-[240px]" data-name="Selector">
          <Checkbox />
          <p className="flex-[1_0_0] font-['Roboto:Regular',sans-serif] leading-[normal] min-h-px min-w-px not-italic relative text-[#1a1a1a] text-[14px] whitespace-pre-wrap">Don’t show this again</p>
        </div>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#eaeaea] content-stretch flex h-[29.993px] items-center justify-center px-[15.582px] py-[0.582px] relative rounded-[19512200px] shrink-0 w-[74.233px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[0.582px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[19512200px]" />
      <p className="font-['Roboto_Condensed:SemiBold',sans-serif] leading-[13px] not-italic relative shrink-0 text-[#1a1a1a] text-[13px] text-center uppercase">CANCEL</p>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#1c7862] content-stretch flex h-[30px] items-center justify-center px-[16px] py-px relative rounded-[33554400px] shrink-0 w-[81.859px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#1c7862] border-solid inset-0 pointer-events-none rounded-[33554400px]" />
      <p className="font-['Roboto_Condensed:SemiBold',sans-serif] leading-[19.5px] not-italic relative shrink-0 text-[13px] text-center text-white uppercase">Confirm</p>
    </div>
  );
}

function Toolbar() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Toolbar">
      <div className="flex flex-row items-center justify-end overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-end px-[20px] py-[10px] relative w-full">
          <Button />
          <Button1 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#e5e5e5] border-solid border-t inset-0 pointer-events-none" />
    </div>
  );
}

export default function DeleteCustomer() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] size-full" data-name="delete customer?">
      <div className="bg-white h-[64px] relative shrink-0 w-full" data-name="// Modal: Header">
        <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex items-center px-[30px] py-[16px] relative size-full">
            <p className="flex-[1_0_0] font-['Roboto_Condensed:Bold',sans-serif] leading-[19px] min-h-px min-w-px not-italic relative text-[#1a1a1a] text-[16px] uppercase whitespace-pre-wrap">Delete Customer?</p>
          </div>
        </div>
      </div>
      <Content />
      <Toolbar />
    </div>
  );
}