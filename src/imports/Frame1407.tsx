import svgPaths from "./svg-d51t3iscfp";

function Paragraph() {
  return (
    <div className="absolute content-stretch flex h-[15px] items-start left-[25px] top-[9px] w-[54.695px]" data-name="Paragraph">
      <p className="font-['Roboto:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[13px] text-center text-white tracking-[-0.5px] uppercase">Contact</p>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute bg-[#333] h-[33px] left-0 shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] top-0 w-[104.695px]" data-name="Button">
      <Paragraph />
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute h-[33px] left-0 top-0 w-[104.695px]" data-name="Container">
      <Button />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="absolute content-stretch flex h-[15px] items-start left-[25px] top-[6px] w-[46.539px]" data-name="Paragraph">
      <p className="font-['Roboto:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#ccc] text-[13px] text-center tracking-[-0.5px] uppercase">Details</p>
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute bg-[#333] h-[27px] left-0 top-[3px] w-[96.539px]" data-name="Button">
      <Paragraph1 />
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute h-[33px] left-[104.7px] top-0 w-[96.539px]" data-name="Container">
      <Button1 />
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="absolute content-stretch flex h-[15px] items-start left-[25px] top-[6px] w-[55.734px]" data-name="Paragraph">
      <p className="font-['Roboto:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#ccc] text-[13px] text-center tracking-[-0.5px] uppercase">Remarks</p>
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute bg-[#333] h-[27px] left-0 top-[3px] w-[105.734px]" data-name="Button">
      <Paragraph2 />
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute h-[33px] left-[201.23px] top-0 w-[105.734px]" data-name="Container">
      <Button2 />
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute h-[33px] left-[907.03px] top-[17px] w-[310.969px]" data-name="Container">
      <Container2 />
      <Container3 />
      <Container4 />
    </div>
  );
}

function Container() {
  return (
    <div className="absolute bg-[#37836e] h-[50px] left-0 top-[57px] w-[1228px]" data-name="Container">
      <Container1 />
    </div>
  );
}

function Text() {
  return (
    <div className="h-[13px] relative shrink-0 w-[19.945px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Roboto:Regular',sans-serif] leading-[13px] left-0 not-italic text-[13px] text-white top-0 uppercase">MA</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="bg-[#285f4f] flex-[1_0_0] h-[24px] min-h-px min-w-px relative rounded-[16777200px]" data-name="Container">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pr-[0.008px] relative size-full">
          <Text />
        </div>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="h-[6px] relative shrink-0 w-[10px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 6">
        <g id="Icon">
          <path d="M9 1L5 5L1 1H9Z" fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container10() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon />
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute content-stretch flex h-[32px] items-center left-[52px] px-[4px] rounded-[16777200px] top-[-4px] w-[68px]" data-name="Container">
      <Container9 />
      <Container10 />
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[22px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
        <g id="Icon">
          <path d={svgPaths.p20485000} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 rounded-[16777200px] size-[32px] top-[-4px]" data-name="Container">
      <Icon1 />
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute h-[24px] left-[1098px] top-[30px] w-[120px]" data-name="Container">
      <Container8 />
      <Container11 />
    </div>
  );
}

function Link() {
  return (
    <div className="absolute h-[26.25px] left-0 top-0 w-[101.344px]" data-name="Link">
      <p className="absolute font-['Roboto:Light',sans-serif] leading-[26.25px] left-0 not-italic text-[21px] text-[rgba(255,255,255,0.8)] top-[0.5px]">Customers</p>
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute h-[26.25px] left-0 top-0 w-[101.344px]" data-name="Container">
      <Link />
    </div>
  );
}

function Chevron() {
  return (
    <div className="absolute contents inset-[27.78%_10.01%_27.78%_5.01%]" data-name="Chevron">
      <div className="absolute inset-[27.78%_10.01%_27.78%_5.01%]" data-name="Vector">
        <div className="absolute inset-[-2.94%_-11.79%_-2.94%_-5.9%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.05498 12.7065">
            <path d={svgPaths.p816fa00} id="Vector" stroke="var(--stroke-0, white)" strokeWidth="0.999577" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="flex-[1_0_0] h-[27px] min-h-px min-w-px relative" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <Chevron />
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute content-stretch flex h-[27px] items-center left-[120.99px] top-0 w-[7.055px]" data-name="Container">
      <Icon2 />
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="absolute h-[26.25px] left-0 top-0 w-[136.32px]" data-name="Paragraph">
      <p className="absolute font-['Roboto:Light',sans-serif] leading-[26.25px] left-0 not-italic text-[21px] text-white top-[0.5px]">Hanna Hansen</p>
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute h-[26.25px] left-0 top-0 w-[136.32px]" data-name="Container">
      <Paragraph3 />
    </div>
  );
}

function Container15() {
  return (
    <div className="absolute h-[26.25px] left-[147.34px] top-0 w-[136.32px]" data-name="Container">
      <Container16 />
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute h-[27px] left-[30px] top-[30px] w-[283.664px]" data-name="Container">
      <Container13 />
      <Container14 />
      <Container15 />
    </div>
  );
}

function Container6() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[1228px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container7 />
        <Container12 />
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute bg-[#37836e] content-stretch flex flex-col h-[57px] items-start left-0 top-0 w-[1228px]" data-name="Container">
      <Container6 />
    </div>
  );
}

export default function Frame() {
  return (
    <div className="relative size-full">
      <Container />
      <Container5 />
    </div>
  );
}