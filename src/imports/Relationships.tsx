import svgPaths from "./svg-lm497l9faw";

function Header() {
  return (
    <div className="content-stretch flex items-start overflow-clip pb-[10px] relative shrink-0 w-[240px]" data-name="Header 1">
      <p className="flex-[1_0_0] font-['Roboto_Condensed:Bold',sans-serif] leading-[19px] min-h-px min-w-px not-italic relative text-[#1a1a1a] text-[16px] uppercase whitespace-pre-wrap">relationships</p>
    </div>
  );
}

function GridHeader() {
  return (
    <div className="bg-[#595959] h-[28px] overflow-clip relative shrink-0 w-full" data-name="// Grid header">
      <p className="absolute bottom-[21.43%] font-['Roboto:Bold',sans-serif] leading-[normal] left-[10px] not-italic text-[13px] text-white top-[21.43%] uppercase">relationship type</p>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_-1px_0px_0px_0px_white]" />
    </div>
  );
}

function Input() {
  return <div className="-translate-y-1/2 absolute bg-white border border-[#ccc] border-solid h-[30px] left-[6px] right-[64px] top-[calc(50%+1.5px)]" data-name="Input" />;
}

function ActionIcon() {
  return (
    <div className="absolute left-[4px] size-[20px] top-[4px]" data-name="Action icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Action icon">
          <mask height="15" id="mask0_1_9970" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="14" x="3" y="3">
            <path d={svgPaths.p7871880} fill="var(--fill-0, #666666)" id="Union" />
          </mask>
          <g mask="url(#mask0_1_9970)">
            <rect fill="var(--fill-0, #1A1A1A)" height="20" id="Color" width="20" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame3() {
  return (
    <div className="-translate-y-1/2 absolute bg-white border border-[#ccc] border-solid overflow-clip right-[30px] size-[30px] top-[calc(50%+1.5px)]">
      <ActionIcon />
    </div>
  );
}

function FilterRow() {
  return (
    <div className="bg-[#f4f6f7] h-[45px] overflow-clip relative shrink-0 w-full" data-name="// Filter row">
      <Input />
      <Frame3 />
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_2px_0px_0px_white,inset_-1px_0px_0px_0px_white]" />
    </div>
  );
}

function Cell() {
  return (
    <div className="bg-[#e8ecee] h-[43px] overflow-clip relative shrink-0 w-full" data-name="// Cell">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] left-[12px] not-italic text-[#1a1a1a] text-[14px] top-1/2 whitespace-nowrap">
        <p className="leading-[normal]">Business customer</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#b3b3b3,inset_0px_1px_0px_0px_#b3b3b3]" />
    </div>
  );
}

function Cell1() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-full" data-name="// Cell">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] left-[12px] not-italic text-[#1a1a1a] text-[14px] top-1/2 whitespace-nowrap">
        <p className="leading-[normal]">Association</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Cell2() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-full" data-name="// Cell">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] left-[12px] not-italic text-[#1a1a1a] text-[14px] top-1/2 whitespace-nowrap">
        <p className="leading-[normal]">Private customer</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Cell3() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-full" data-name="// Cell">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] left-[12px] not-italic text-[#1a1a1a] text-[14px] top-1/2 whitespace-nowrap">
        <p className="leading-[normal]">Member</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Cell4() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-full" data-name="// Cell">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] left-[12px] not-italic text-[#1a1a1a] text-[14px] top-1/2 whitespace-nowrap">
        <p className="leading-[normal]">Text</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Cell5() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-full" data-name="// Cell">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] left-[12px] not-italic text-[#1a1a1a] text-[14px] top-1/2 whitespace-nowrap">
        <p className="leading-[normal]">Text</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Cell6() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-full" data-name="// Cell">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] left-[12px] not-italic text-[#1a1a1a] text-[14px] top-1/2 whitespace-nowrap">
        <p className="leading-[normal]">Text</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Cell7() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-full" data-name="// Cell">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] left-[12px] not-italic text-[#1a1a1a] text-[14px] top-1/2 whitespace-nowrap">
        <p className="leading-[normal]">Text</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Cell8() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-full" data-name="// Cell">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] left-[12px] not-italic text-[#1a1a1a] text-[14px] top-1/2 whitespace-nowrap">
        <p className="leading-[normal]">Text</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Cell9() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-full" data-name="// Cell">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] left-[12px] not-italic text-[#1a1a1a] text-[14px] top-1/2 whitespace-nowrap">
        <p className="leading-[normal]">Text</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Cell10() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-full" data-name="// Cell">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] left-[12px] not-italic text-[#1a1a1a] text-[14px] top-1/2 whitespace-nowrap">
        <p className="leading-[normal]">Text</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Cell11() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-full" data-name="// Cell">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] left-[12px] not-italic text-[#1a1a1a] text-[14px] top-1/2 whitespace-nowrap">
        <p className="leading-[normal]">Text</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Cell12() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-full" data-name="// Cell">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] left-[12px] not-italic text-[#1a1a1a] text-[14px] top-1/2 whitespace-nowrap">
        <p className="leading-[normal]">Text</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Cell13() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-full" data-name="// Cell">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] left-[12px] not-italic text-[#1a1a1a] text-[14px] top-1/2 whitespace-nowrap">
        <p className="leading-[normal]">Text</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Cell14() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-full" data-name="// Cell">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] left-[12px] not-italic text-[#1a1a1a] text-[14px] top-1/2 whitespace-nowrap">
        <p className="leading-[normal]">Text</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Cell15() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-full" data-name="// Cell">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] left-[12px] not-italic text-[#1a1a1a] text-[14px] top-1/2 whitespace-nowrap">
        <p className="leading-[normal]">Text</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Cell16() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-full" data-name="// Cell">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] left-[12px] not-italic text-[#1a1a1a] text-[14px] top-1/2 whitespace-nowrap">
        <p className="leading-[normal]">Text</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Cell17() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-full" data-name="// Cell">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] left-[12px] not-italic text-[#1a1a1a] text-[14px] top-1/2 whitespace-nowrap">
        <p className="leading-[normal]">Text</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function RelationshipType() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[199px]" data-name="Relationship type">
      <GridHeader />
      <FilterRow />
      <Cell />
      <Cell1 />
      <Cell2 />
      <Cell3 />
      <Cell4 />
      <Cell5 />
      <Cell6 />
      <Cell7 />
      <Cell8 />
      <Cell9 />
      <Cell10 />
      <Cell11 />
      <Cell12 />
      <Cell13 />
      <Cell14 />
      <Cell15 />
      <Cell16 />
      <Cell17 />
    </div>
  );
}

function GridHeader1() {
  return (
    <div className="bg-[#595959] h-[28px] overflow-clip relative shrink-0 w-full" data-name="// Grid header">
      <p className="absolute bottom-[21.43%] font-['Roboto:Bold',sans-serif] leading-[normal] left-[10px] not-italic text-[13px] text-white top-[21.43%] uppercase">Identifieer</p>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_-1px_0px_0px_0px_white]" />
    </div>
  );
}

function Input1() {
  return <div className="-translate-y-1/2 absolute bg-white border border-[#ccc] border-solid h-[30px] left-[6px] right-[63.75px] top-[calc(50%+1.5px)]" data-name="Input" />;
}

function ActionIcon1() {
  return (
    <div className="absolute left-[4px] size-[20px] top-[4px]" data-name="Action icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Action icon">
          <mask height="15" id="mask0_1_9970" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="14" x="3" y="3">
            <path d={svgPaths.p7871880} fill="var(--fill-0, #666666)" id="Union" />
          </mask>
          <g mask="url(#mask0_1_9970)">
            <rect fill="var(--fill-0, #1A1A1A)" height="20" id="Color" width="20" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame4() {
  return (
    <div className="-translate-y-1/2 absolute bg-white border border-[#ccc] border-solid overflow-clip right-[29.75px] size-[30px] top-[calc(50%+1.5px)]">
      <ActionIcon1 />
    </div>
  );
}

function FilterRow1() {
  return (
    <div className="bg-[#f4f6f7] h-[45px] overflow-clip relative shrink-0 w-full" data-name="// Filter row">
      <Input1 />
      <Frame4 />
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_2px_0px_0px_white,inset_-1px_0px_0px_0px_white]" />
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.01)] content-stretch flex items-start left-[12px] pb-px top-[13px]">
      <div className="flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] whitespace-nowrap">
        <p className="leading-[normal]">44332211</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-2px_0px_0px_#e58108]" />
    </div>
  );
}

function Cell18() {
  return (
    <div className="bg-[#e8ecee] h-[43px] overflow-clip relative shrink-0 w-full" data-name="// Cell">
      <Frame1 />
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#b3b3b3,inset_0px_1px_0px_0px_#b3b3b3]" />
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.01)] content-stretch flex items-start left-[12px] pb-px top-[13px]">
      <div className="flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] whitespace-nowrap">
        <p className="leading-[normal]">00112233</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#666]" />
    </div>
  );
}

function Cell19() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-full" data-name="// Cell">
      <Frame />
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Frame2() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.01)] content-stretch flex items-start left-[12px] pb-px top-[13px]">
      <div className="flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] whitespace-nowrap">
        <p className="leading-[normal]">{`11223300 `}</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#666]" />
    </div>
  );
}

function Cell20() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-full" data-name="// Cell">
      <Frame2 />
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Frame5() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.01)] content-stretch flex items-start left-[12px] pb-px top-[13px]">
      <div className="flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] whitespace-nowrap">
        <p className="leading-[normal]">{`11223300 `}</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#666]" />
    </div>
  );
}

function Cell21() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-full" data-name="// Cell">
      <Frame5 />
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Frame6() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.01)] content-stretch flex items-start left-[12px] pb-px top-[13px]">
      <div className="flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] whitespace-nowrap">
        <p className="leading-[normal]">Text</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#666]" />
    </div>
  );
}

function Cell22() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-full" data-name="// Cell">
      <Frame6 />
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Frame7() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.01)] content-stretch flex items-start left-[12px] pb-px top-[13px]">
      <div className="flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] whitespace-nowrap">
        <p className="leading-[normal]">Text</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#666]" />
    </div>
  );
}

function Cell23() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-full" data-name="// Cell">
      <Frame7 />
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Frame8() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.01)] content-stretch flex items-start left-[12px] pb-px top-[13px]">
      <div className="flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] whitespace-nowrap">
        <p className="leading-[normal]">Text</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#666]" />
    </div>
  );
}

function Cell24() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-full" data-name="// Cell">
      <Frame8 />
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Frame9() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.01)] content-stretch flex items-start left-[12px] pb-px top-[13px]">
      <div className="flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] whitespace-nowrap">
        <p className="leading-[normal]">Text</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#666]" />
    </div>
  );
}

function Cell25() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-full" data-name="// Cell">
      <Frame9 />
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Frame10() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.01)] content-stretch flex items-start left-[12px] pb-px top-[13px]">
      <div className="flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] whitespace-nowrap">
        <p className="leading-[normal]">Text</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#666]" />
    </div>
  );
}

function Cell26() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-full" data-name="// Cell">
      <Frame10 />
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Frame11() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.01)] content-stretch flex items-start left-[12px] pb-px top-[13px]">
      <div className="flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] whitespace-nowrap">
        <p className="leading-[normal]">Text</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#666]" />
    </div>
  );
}

function Cell27() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-full" data-name="// Cell">
      <Frame11 />
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Frame12() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.01)] content-stretch flex items-start left-[12px] pb-px top-[13px]">
      <div className="flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] whitespace-nowrap">
        <p className="leading-[normal]">Text</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#666]" />
    </div>
  );
}

function Cell28() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-full" data-name="// Cell">
      <Frame12 />
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Frame13() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.01)] content-stretch flex items-start left-[12px] pb-px top-[13px]">
      <div className="flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] whitespace-nowrap">
        <p className="leading-[normal]">Text</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#666]" />
    </div>
  );
}

function Cell29() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-full" data-name="// Cell">
      <Frame13 />
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Frame14() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.01)] content-stretch flex items-start left-[12px] pb-px top-[13px]">
      <div className="flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] whitespace-nowrap">
        <p className="leading-[normal]">Text</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#666]" />
    </div>
  );
}

function Cell30() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-full" data-name="// Cell">
      <Frame14 />
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Frame15() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.01)] content-stretch flex items-start left-[12px] pb-px top-[13px]">
      <div className="flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] whitespace-nowrap">
        <p className="leading-[normal]">Text</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#666]" />
    </div>
  );
}

function Cell31() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-full" data-name="// Cell">
      <Frame15 />
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Frame16() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.01)] content-stretch flex items-start left-[12px] pb-px top-[13px]">
      <div className="flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] whitespace-nowrap">
        <p className="leading-[normal]">Text</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#666]" />
    </div>
  );
}

function Cell32() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-full" data-name="// Cell">
      <Frame16 />
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Frame17() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.01)] content-stretch flex items-start left-[12px] pb-px top-[13px]">
      <div className="flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] whitespace-nowrap">
        <p className="leading-[normal]">Text</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#666]" />
    </div>
  );
}

function Cell33() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-full" data-name="// Cell">
      <Frame17 />
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Frame18() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.01)] content-stretch flex items-start left-[12px] pb-px top-[13px]">
      <div className="flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] whitespace-nowrap">
        <p className="leading-[normal]">Text</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#666]" />
    </div>
  );
}

function Cell34() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-full" data-name="// Cell">
      <Frame18 />
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Frame19() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.01)] content-stretch flex items-start left-[12px] pb-px top-[13px]">
      <div className="flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] whitespace-nowrap">
        <p className="leading-[normal]">Text</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#666]" />
    </div>
  );
}

function Cell35() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-full" data-name="// Cell">
      <Frame19 />
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Number() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px overflow-clip relative" data-name="Number">
      <GridHeader1 />
      <FilterRow1 />
      <Cell18 />
      <Cell19 />
      <Cell20 />
      <Cell21 />
      <Cell22 />
      <Cell23 />
      <Cell24 />
      <Cell25 />
      <Cell26 />
      <Cell27 />
      <Cell28 />
      <Cell29 />
      <Cell30 />
      <Cell31 />
      <Cell32 />
      <Cell33 />
      <Cell34 />
      <Cell35 />
    </div>
  );
}

function GridHeader2() {
  return (
    <div className="bg-[#595959] h-[28px] overflow-clip relative shrink-0 w-full" data-name="// Grid header">
      <p className="absolute bottom-[21.43%] font-['Roboto:Bold',sans-serif] leading-[normal] left-[10px] not-italic text-[13px] text-white top-[21.43%] uppercase">name</p>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_-1px_0px_0px_0px_white]" />
    </div>
  );
}

function Input2() {
  return <div className="-translate-y-1/2 absolute bg-white border border-[#ccc] border-solid h-[30px] left-[6px] right-[63.75px] top-[calc(50%+1.5px)]" data-name="Input" />;
}

function ActionIcon2() {
  return (
    <div className="absolute left-[4px] size-[20px] top-[4px]" data-name="Action icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Action icon">
          <mask height="15" id="mask0_1_9970" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="14" x="3" y="3">
            <path d={svgPaths.p7871880} fill="var(--fill-0, #666666)" id="Union" />
          </mask>
          <g mask="url(#mask0_1_9970)">
            <rect fill="var(--fill-0, #1A1A1A)" height="20" id="Color" width="20" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame20() {
  return (
    <div className="-translate-y-1/2 absolute bg-white border border-[#ccc] border-solid overflow-clip right-[29.75px] size-[30px] top-[calc(50%+1.5px)]">
      <ActionIcon2 />
    </div>
  );
}

function FilterRow2() {
  return (
    <div className="bg-[#f4f6f7] h-[45px] overflow-clip relative shrink-0 w-full" data-name="// Filter row">
      <Input2 />
      <Frame20 />
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_2px_0px_0px_white,inset_-1px_0px_0px_0px_white]" />
    </div>
  );
}

function Cell36() {
  return (
    <div className="bg-[#e8ecee] h-[43px] overflow-clip relative shrink-0 w-[240px]" data-name="// Cell">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] left-[12px] not-italic text-[#1a1a1a] text-[14px] top-1/2 whitespace-nowrap">
        <p className="leading-[normal]">EG Retail Göteborg</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#b3b3b3,inset_0px_1px_0px_0px_#b3b3b3]" />
    </div>
  );
}

function Cell37() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-[240px]" data-name="// Cell">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] left-[12px] not-italic text-[#1a1a1a] text-[14px] top-1/2 whitespace-nowrap">
        <p className="leading-[normal]">Association name</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Cell38() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-[240px]" data-name="// Cell">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] left-[12px] not-italic text-[#1a1a1a] text-[14px] top-1/2 whitespace-nowrap">
        <p className="leading-[normal]">Ola Nordmann</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Cell39() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-[240px]" data-name="// Cell">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] left-[12px] not-italic text-[#1a1a1a] text-[14px] top-1/2 whitespace-nowrap">
        <p className="leading-[normal]">Ola Normann</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Cell40() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-[240px]" data-name="// Cell">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] left-[12px] not-italic text-[#1a1a1a] text-[14px] top-1/2 whitespace-nowrap">
        <p className="leading-[normal]">Text</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Cell41() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-[240px]" data-name="// Cell">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] left-[12px] not-italic text-[#1a1a1a] text-[14px] top-1/2 whitespace-nowrap">
        <p className="leading-[normal]">Text</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Cell42() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-[240px]" data-name="// Cell">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] left-[12px] not-italic text-[#1a1a1a] text-[14px] top-1/2 whitespace-nowrap">
        <p className="leading-[normal]">Text</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Cell43() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-[240px]" data-name="// Cell">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] left-[12px] not-italic text-[#1a1a1a] text-[14px] top-1/2 whitespace-nowrap">
        <p className="leading-[normal]">Text</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Cell44() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-[240px]" data-name="// Cell">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] left-[12px] not-italic text-[#1a1a1a] text-[14px] top-1/2 whitespace-nowrap">
        <p className="leading-[normal]">Text</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Cell45() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-[240px]" data-name="// Cell">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] left-[12px] not-italic text-[#1a1a1a] text-[14px] top-1/2 whitespace-nowrap">
        <p className="leading-[normal]">Text</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Cell46() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-[240px]" data-name="// Cell">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] left-[12px] not-italic text-[#1a1a1a] text-[14px] top-1/2 whitespace-nowrap">
        <p className="leading-[normal]">Text</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Cell47() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-[240px]" data-name="// Cell">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] left-[12px] not-italic text-[#1a1a1a] text-[14px] top-1/2 whitespace-nowrap">
        <p className="leading-[normal]">Text</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Cell48() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-[240px]" data-name="// Cell">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] left-[12px] not-italic text-[#1a1a1a] text-[14px] top-1/2 whitespace-nowrap">
        <p className="leading-[normal]">Text</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Cell49() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-[240px]" data-name="// Cell">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] left-[12px] not-italic text-[#1a1a1a] text-[14px] top-1/2 whitespace-nowrap">
        <p className="leading-[normal]">Text</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Cell50() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-[240px]" data-name="// Cell">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] left-[12px] not-italic text-[#1a1a1a] text-[14px] top-1/2 whitespace-nowrap">
        <p className="leading-[normal]">Text</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Cell51() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-[240px]" data-name="// Cell">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] left-[12px] not-italic text-[#1a1a1a] text-[14px] top-1/2 whitespace-nowrap">
        <p className="leading-[normal]">Text</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Cell52() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-[240px]" data-name="// Cell">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] left-[12px] not-italic text-[#1a1a1a] text-[14px] top-1/2 whitespace-nowrap">
        <p className="leading-[normal]">Text</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Cell53() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-[240px]" data-name="// Cell">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] left-[12px] not-italic text-[#1a1a1a] text-[14px] top-1/2 whitespace-nowrap">
        <p className="leading-[normal]">Text</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function OrgName() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px overflow-clip relative" data-name="Org name">
      <GridHeader2 />
      <FilterRow2 />
      <Cell36 />
      <Cell37 />
      <Cell38 />
      <Cell39 />
      <Cell40 />
      <Cell41 />
      <Cell42 />
      <Cell43 />
      <Cell44 />
      <Cell45 />
      <Cell46 />
      <Cell47 />
      <Cell48 />
      <Cell49 />
      <Cell50 />
      <Cell51 />
      <Cell52 />
      <Cell53 />
    </div>
  );
}

function GridHeader3() {
  return (
    <div className="bg-[#595959] h-[28px] overflow-clip relative shrink-0 w-full" data-name="// Grid header">
      <p className="absolute bottom-[21.43%] font-['Roboto:Bold',sans-serif] leading-[normal] left-[10px] not-italic text-[13px] text-white top-[21.43%] uppercase">Connection</p>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_-1px_0px_0px_0px_white]" />
    </div>
  );
}

function Input3() {
  return <div className="-translate-y-1/2 absolute bg-white border border-[#ccc] border-solid h-[30px] left-[6px] right-[64px] top-[calc(50%+1.5px)]" data-name="Input" />;
}

function ActionIcon3() {
  return (
    <div className="absolute left-[4px] size-[20px] top-[4px]" data-name="Action icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Action icon">
          <mask height="15" id="mask0_1_9970" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="14" x="3" y="3">
            <path d={svgPaths.p7871880} fill="var(--fill-0, #666666)" id="Union" />
          </mask>
          <g mask="url(#mask0_1_9970)">
            <rect fill="var(--fill-0, #1A1A1A)" height="20" id="Color" width="20" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame21() {
  return (
    <div className="-translate-y-1/2 absolute bg-white border border-[#ccc] border-solid overflow-clip right-[30px] size-[30px] top-[calc(50%+1.5px)]">
      <ActionIcon3 />
    </div>
  );
}

function FilterRow3() {
  return (
    <div className="bg-[#f4f6f7] h-[45px] overflow-clip relative shrink-0 w-[240px]" data-name="// Filter row">
      <Input3 />
      <Frame21 />
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_2px_0px_0px_white,inset_-1px_0px_0px_0px_white]" />
    </div>
  );
}

function Cell54() {
  return (
    <div className="bg-[#e8ecee] h-[43px] overflow-clip relative shrink-0 w-[240px]" data-name="// Cell">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] left-[12px] not-italic text-[#1a1a1a] text-[14px] top-1/2 whitespace-nowrap">
        <p className="leading-[normal]">x-store name</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#b3b3b3,inset_0px_1px_0px_0px_#b3b3b3]" />
    </div>
  );
}

function Cell55() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-[240px]" data-name="// Cell">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] left-[12px] not-italic text-[#1a1a1a] text-[14px] top-1/2 whitespace-nowrap">
        <p className="leading-[normal]">x-store name</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Cell56() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-[240px]" data-name="// Cell">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] left-[12px] not-italic text-[#1a1a1a] text-[14px] top-1/2 whitespace-nowrap">
        <p className="leading-[normal]">x-store name</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Cell57() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-[240px]" data-name="// Cell">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] left-[12px] not-italic text-[#1a1a1a] text-[14px] top-1/2 whitespace-nowrap">
        <p className="leading-[normal]">Loyalty program X</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Cell58() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-[240px]" data-name="// Cell">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] left-[12px] not-italic text-[#1a1a1a] text-[14px] top-1/2 whitespace-nowrap">
        <p className="leading-[normal]">Text</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Cell59() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-[240px]" data-name="// Cell">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] left-[12px] not-italic text-[#1a1a1a] text-[14px] top-1/2 whitespace-nowrap">
        <p className="leading-[normal]">Text</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Cell60() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-[240px]" data-name="// Cell">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] left-[12px] not-italic text-[#1a1a1a] text-[14px] top-1/2 whitespace-nowrap">
        <p className="leading-[normal]">Text</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Cell61() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-[240px]" data-name="// Cell">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] left-[12px] not-italic text-[#1a1a1a] text-[14px] top-1/2 whitespace-nowrap">
        <p className="leading-[normal]">Text</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Cell62() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-[240px]" data-name="// Cell">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] left-[12px] not-italic text-[#1a1a1a] text-[14px] top-1/2 whitespace-nowrap">
        <p className="leading-[normal]">Text</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Cell63() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-[240px]" data-name="// Cell">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] left-[12px] not-italic text-[#1a1a1a] text-[14px] top-1/2 whitespace-nowrap">
        <p className="leading-[normal]">Text</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Cell64() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-[240px]" data-name="// Cell">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] left-[12px] not-italic text-[#1a1a1a] text-[14px] top-1/2 whitespace-nowrap">
        <p className="leading-[normal]">Text</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Cell65() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-[240px]" data-name="// Cell">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] left-[12px] not-italic text-[#1a1a1a] text-[14px] top-1/2 whitespace-nowrap">
        <p className="leading-[normal]">Text</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Cell66() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-[240px]" data-name="// Cell">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] left-[12px] not-italic text-[#1a1a1a] text-[14px] top-1/2 whitespace-nowrap">
        <p className="leading-[normal]">Text</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Cell67() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-[240px]" data-name="// Cell">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] left-[12px] not-italic text-[#1a1a1a] text-[14px] top-1/2 whitespace-nowrap">
        <p className="leading-[normal]">Text</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Cell68() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-[240px]" data-name="// Cell">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] left-[12px] not-italic text-[#1a1a1a] text-[14px] top-1/2 whitespace-nowrap">
        <p className="leading-[normal]">Text</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Cell69() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-[240px]" data-name="// Cell">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] left-[12px] not-italic text-[#1a1a1a] text-[14px] top-1/2 whitespace-nowrap">
        <p className="leading-[normal]">Text</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Cell70() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-[240px]" data-name="// Cell">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] left-[12px] not-italic text-[#1a1a1a] text-[14px] top-1/2 whitespace-nowrap">
        <p className="leading-[normal]">Text</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Cell71() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-[240px]" data-name="// Cell">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] left-[12px] not-italic text-[#1a1a1a] text-[14px] top-1/2 whitespace-nowrap">
        <p className="leading-[normal]">Text</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Store() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px overflow-clip relative" data-name="Store">
      <GridHeader3 />
      <FilterRow3 />
      <Cell54 />
      <Cell55 />
      <Cell56 />
      <Cell57 />
      <Cell58 />
      <Cell59 />
      <Cell60 />
      <Cell61 />
      <Cell62 />
      <Cell63 />
      <Cell64 />
      <Cell65 />
      <Cell66 />
      <Cell67 />
      <Cell68 />
      <Cell69 />
      <Cell70 />
      <Cell71 />
    </div>
  );
}

function GridHeader4() {
  return (
    <div className="bg-[#595959] h-[28px] overflow-clip relative shrink-0 w-full" data-name="// Grid header">
      <p className="absolute bottom-[21.43%] font-['Roboto:Bold',sans-serif] leading-[normal] left-[10px] not-italic text-[13px] text-white top-[21.43%] uppercase">Status</p>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_-1px_0px_0px_0px_white]" />
    </div>
  );
}

function Input4() {
  return <div className="-translate-y-1/2 absolute bg-white border border-[#ccc] border-solid h-[30px] left-[6px] right-[5.75px] top-[calc(50%+1.5px)]" data-name="Input" />;
}

function ActionIcon4() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Action icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Action icon">
          <mask height="4" id="mask0_1_9975" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="8" x="6" y="8">
            <path d="M14 8L10 12L6 8H14Z" fill="var(--fill-0, #666666)" id="Union" />
          </mask>
          <g mask="url(#mask0_1_9975)">
            <rect fill="var(--fill-0, #333333)" height="20" id="Color" width="20" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame22() {
  return (
    <div className="-translate-y-1/2 absolute bg-white content-stretch flex items-start pr-[4px] py-[4px] right-[6.75px] top-[calc(50%+1.5px)]">
      <ActionIcon4 />
    </div>
  );
}

function FilterRow4() {
  return (
    <div className="bg-[#f4f6f7] h-[45px] overflow-clip relative shrink-0 w-full" data-name="// Filter row">
      <Input4 />
      <Frame22 />
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_2px_0px_0px_white,inset_-1px_0px_0px_0px_white]" />
    </div>
  );
}

function Cell72() {
  return (
    <div className="bg-[#e8ecee] h-[43px] overflow-clip relative shrink-0 w-full" data-name="// Cell">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] left-[12px] not-italic text-[#1a1a1a] text-[14px] top-1/2 whitespace-nowrap">
        <p className="leading-[normal]">Draft</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#b3b3b3,inset_0px_1px_0px_0px_#b3b3b3]" />
    </div>
  );
}

function Cell73() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-full" data-name="// Cell">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] left-[12px] not-italic text-[#1a1a1a] text-[14px] top-1/2 whitespace-nowrap">
        <p className="leading-[normal]">Inactive</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Cell74() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-full" data-name="// Cell">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] left-[12px] not-italic text-[#1a1a1a] text-[14px] top-1/2 whitespace-nowrap">
        <p className="leading-[normal]">Active</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Cell75() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-full" data-name="// Cell">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] left-[12px] not-italic text-[#1a1a1a] text-[14px] top-1/2 whitespace-nowrap">
        <p className="leading-[normal]">Active</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Cell76() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-full" data-name="// Cell">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] left-[12px] not-italic text-[#1a1a1a] text-[14px] top-1/2 whitespace-nowrap">
        <p className="leading-[normal]">Text</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Cell77() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-full" data-name="// Cell">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] left-[12px] not-italic text-[#1a1a1a] text-[14px] top-1/2 whitespace-nowrap">
        <p className="leading-[normal]">Text</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Cell78() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-full" data-name="// Cell">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] left-[12px] not-italic text-[#1a1a1a] text-[14px] top-1/2 whitespace-nowrap">
        <p className="leading-[normal]">Text</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Cell79() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-full" data-name="// Cell">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] left-[12px] not-italic text-[#1a1a1a] text-[14px] top-1/2 whitespace-nowrap">
        <p className="leading-[normal]">Text</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Cell80() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-full" data-name="// Cell">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] left-[12px] not-italic text-[#1a1a1a] text-[14px] top-1/2 whitespace-nowrap">
        <p className="leading-[normal]">Text</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Cell81() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-full" data-name="// Cell">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] left-[12px] not-italic text-[#1a1a1a] text-[14px] top-1/2 whitespace-nowrap">
        <p className="leading-[normal]">Text</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Cell82() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-full" data-name="// Cell">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] left-[12px] not-italic text-[#1a1a1a] text-[14px] top-1/2 whitespace-nowrap">
        <p className="leading-[normal]">Text</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Cell83() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-full" data-name="// Cell">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] left-[12px] not-italic text-[#1a1a1a] text-[14px] top-1/2 whitespace-nowrap">
        <p className="leading-[normal]">Text</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Cell84() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-full" data-name="// Cell">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] left-[12px] not-italic text-[#1a1a1a] text-[14px] top-1/2 whitespace-nowrap">
        <p className="leading-[normal]">Text</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Cell85() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-full" data-name="// Cell">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] left-[12px] not-italic text-[#1a1a1a] text-[14px] top-1/2 whitespace-nowrap">
        <p className="leading-[normal]">Text</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Cell86() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-full" data-name="// Cell">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] left-[12px] not-italic text-[#1a1a1a] text-[14px] top-1/2 whitespace-nowrap">
        <p className="leading-[normal]">Text</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Cell87() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-full" data-name="// Cell">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] left-[12px] not-italic text-[#1a1a1a] text-[14px] top-1/2 whitespace-nowrap">
        <p className="leading-[normal]">Text</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Cell88() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-full" data-name="// Cell">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] left-[12px] not-italic text-[#1a1a1a] text-[14px] top-1/2 whitespace-nowrap">
        <p className="leading-[normal]">Text</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Cell89() {
  return (
    <div className="bg-white h-[43px] overflow-clip relative shrink-0 w-full" data-name="// Cell">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] left-[12px] not-italic text-[#1a1a1a] text-[14px] top-1/2 whitespace-nowrap">
        <p className="leading-[normal]">Text</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#e5e5e5,inset_0px_1px_0px_0px_#e5e5e5]" />
    </div>
  );
}

function Status() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px overflow-clip relative" data-name="Status">
      <GridHeader4 />
      <FilterRow4 />
      <Cell72 />
      <Cell73 />
      <Cell74 />
      <Cell75 />
      <Cell76 />
      <Cell77 />
      <Cell78 />
      <Cell79 />
      <Cell80 />
      <Cell81 />
      <Cell82 />
      <Cell83 />
      <Cell84 />
      <Cell85 />
      <Cell86 />
      <Cell87 />
      <Cell88 />
      <Cell89 />
    </div>
  );
}

function Table() {
  return (
    <div className="content-stretch flex h-[288px] items-start overflow-clip relative shrink-0 w-[1126px]" data-name="Table">
      <RelationshipType />
      <Number />
      <OrgName />
      <Store />
      <Status />
    </div>
  );
}

export default function Relationships() {
  return (
    <div className="content-stretch flex flex-col gap-[13px] items-start relative size-full" data-name="Relationships">
      <Header />
      <Table />
    </div>
  );
}