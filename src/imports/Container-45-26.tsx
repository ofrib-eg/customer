function Container2() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Roboto:Medium',sans-serif] leading-[16px] min-h-px min-w-px not-italic relative text-[#1a1a1a] text-[13px] whitespace-pre-wrap">Melina Andersson</p>
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Roboto:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#666] text-[12px] top-0">Private customer #: 0000000011</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="flex-[1_0_0] h-[32px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container2 />
        <Container3 />
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="flex-[1_0_0] h-[14px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Roboto:Regular',sans-serif] leading-[14px] not-italic relative shrink-0 text-[#f57c00] text-[11px]">Will be deleted</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="bg-[#fff3e0] h-[18px] relative rounded-[2px] shrink-0 w-[87px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center px-[8px] relative size-full">
        <Text />
      </div>
    </div>
  );
}

export default function Container() {
  return (
    <div className="bg-white content-stretch flex gap-[8px] items-start pb-px pt-[11px] px-[11px] relative rounded-[4px] size-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e0e0e0] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Container1 />
      <Container4 />
    </div>
  );
}