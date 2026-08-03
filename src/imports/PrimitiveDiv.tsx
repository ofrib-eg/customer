import svgPaths from "./svg-5rst3ksu76";

function PrimitiveH() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Primitive.h2">
      <p className="absolute font-['Roboto_Condensed:Bold',sans-serif] leading-[24px] left-0 not-italic text-[#1a1a1a] text-[16px] top-0 uppercase">Anonymize contact</p>
    </div>
  );
}

function Container() {
  return (
    <div className="h-[65px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#eaeaea] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start pb-px pt-[24px] px-[24px] relative size-full">
        <PrimitiveH />
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Text">
      <p className="font-['Roboto:Bold',sans-serif] leading-[1.4] not-italic overflow-hidden relative shrink-0 text-[#1a1a1a] text-[16px] text-ellipsis">Linked relationships will be affected</p>
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-h-px min-w-px py-[6px] relative" data-name="Content">
      <Text />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex gap-[10px] items-start relative shrink-0 w-full">
      <div className="h-[32px] overflow-clip relative shrink-0 w-[20px]" data-name="Info icon">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[20px] top-1/2" data-name="Primary">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
            <path d={svgPaths.p100f2e80} fill="var(--fill-0, #E79C30)" id="Primary" />
          </svg>
        </div>
      </div>
      <Content />
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Roboto:Medium',sans-serif] leading-[16px] min-h-px min-w-px not-italic relative text-[#1a1a1a] text-[13px] whitespace-pre-wrap">Melina Andersson</p>
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Roboto:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#666] text-[12px] top-0">Private customer #: 0000000011</p>
    </div>
  );
}

function Container3() {
  return (
    <div className="flex-[1_0_0] h-[32px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container4 />
        <Container5 />
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="flex-[1_0_0] h-[14px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Roboto:Regular',sans-serif] leading-[14px] not-italic relative shrink-0 text-[#f57c00] text-[11px]">Will be anonymized</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="bg-[#fff3e0] h-[18px] relative rounded-[2px] shrink-0 w-[110.594px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center px-[8px] relative size-full">
        <Text1 />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="bg-white content-stretch flex gap-[8px] h-[54px] items-start pb-px pt-[11px] px-[11px] relative rounded-[4px] shrink-0 w-[405px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e0e0e0] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Container3 />
      <Container6 />
    </div>
  );
}

function Left() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start pl-[8px] relative shrink-0" data-name="Left">
      <Frame />
      <Container2 />
    </div>
  );
}

function Alert() {
  return (
    <div className="bg-[#fff1e1] content-stretch flex gap-[16px] h-[143px] items-start p-[12px] relative rounded-[8px] shrink-0 w-[450px]" data-name="Alert">
      <div aria-hidden="true" className="absolute border-2 border-[#e79c30] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Left />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Roboto:Regular',sans-serif] leading-[21px] left-0 not-italic text-[#1a1a1a] text-[14px] top-0">Send a report of the anonymized data?</p>
    </div>
  );
}

function RadioButton() {
  return <div className="shrink-0 size-[16px]" data-name="Radio Button" />;
}

function Text2() {
  return (
    <div className="h-[21px] relative shrink-0 w-[22.625px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Roboto:Regular',sans-serif] leading-[21px] left-0 not-italic text-[#1a1a1a] text-[14px] top-0">Yes</p>
      </div>
    </div>
  );
}

function Label() {
  return (
    <div className="content-stretch flex gap-[8px] h-[21px] items-center relative shrink-0 w-full" data-name="Label">
      <RadioButton />
      <Text2 />
    </div>
  );
}

function RadioButton1() {
  return <div className="shrink-0 size-[16px]" data-name="Radio Button" />;
}

function Text3() {
  return (
    <div className="h-[21px] relative shrink-0 w-[17.984px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Roboto:Regular',sans-serif] leading-[21px] left-0 not-italic text-[#1a1a1a] text-[14px] top-0">No</p>
      </div>
    </div>
  );
}

function Label1() {
  return (
    <div className="content-stretch flex gap-[8px] h-[21px] items-center relative shrink-0 w-full" data-name="Label">
      <RadioButton1 />
      <Text3 />
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[50px] items-start relative shrink-0 w-full" data-name="Container">
      <Label />
      <Label1 />
    </div>
  );
}

function EmailInput() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Email Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[12px] relative size-full">
          <p className="font-['Roboto:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[14px] text-[rgba(26,26,26,0.5)]">Ola.n@eg.no</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[131px] items-start relative shrink-0 w-full" data-name="Container">
      <Paragraph />
      <Container8 />
      <EmailInput />
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[370px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[24px] items-start pt-[24px] px-[24px] relative size-full">
        <Alert />
        <Container7 />
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#eaeaea] h-[30px] relative rounded-[33554400px] shrink-0 w-[75.109px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[33554400px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[16px] py-px relative size-full">
        <p className="font-['Roboto_Condensed:SemiBold',sans-serif] leading-[19.5px] not-italic relative shrink-0 text-[#1a1a1a] text-[13px] text-center uppercase">Cancel</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#1c7862] h-[30px] relative rounded-[33554400px] shrink-0 w-[81.859px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#1c7862] border-solid inset-0 pointer-events-none rounded-[33554400px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[16px] py-px relative size-full">
        <p className="font-['Roboto_Condensed:SemiBold',sans-serif] leading-[19.5px] not-italic relative shrink-0 text-[13px] text-center text-white uppercase">Confirm</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[54px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-end pr-[24px] relative size-full">
          <Button />
          <Button1 />
        </div>
      </div>
    </div>
  );
}

export default function PrimitiveDiv() {
  return (
    <div className="bg-white relative size-full" data-name="Primitive.div">
      <div className="content-stretch flex flex-col items-start p-px relative size-full">
        <Container />
        <Container1 />
        <Container9 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-0 pointer-events-none shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
    </div>
  );
}