import svgPaths from "./svg-mllssziw4p";

function Container2() {
  return <div className="absolute border-[#666] border-[1.719px] border-solid h-[56.965px] left-0 rounded-[8px] top-0 w-[440.011px]" data-name="Container" />;
}

function Icon() {
  return (
    <div className="h-[18.994px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.9943 18.9943">
        <path d={svgPaths.p3312c6e0} fill="var(--fill-0, #191919)" id="Vector" />
      </svg>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col h-[18.994px] items-start relative shrink-0 w-full" data-name="Container">
      <Icon />
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute content-stretch flex flex-col h-[32.982px] items-start left-[8px] overflow-clip pl-[-0.005px] pr-[1.008px] pt-[6.488px] top-0 w-[19.997px]" data-name="Container">
      <Container6 />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="absolute h-[21px] left-0 top-[5.99px] w-[285.389px]" data-name="Paragraph">
      <p className="absolute font-['Roboto:Regular',sans-serif] leading-[21px] left-0 not-italic text-[#191919] text-[15px] top-[-0.28px]">This customer will permanently be deleted.</p>
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute h-[32.982px] left-[43.99px] top-0 w-[372.04px]" data-name="Container">
      <Paragraph />
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute h-[32.982px] left-[11.99px] top-[11.99px] w-[416.029px]" data-name="Container">
      <Container5 />
      <Container7 />
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute h-[56.965px] left-0 top-0 w-[440.011px]" data-name="Container">
      <Container4 />
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0.04)] h-[56.965px] left-[29.99px] rounded-[8px] top-[8px] w-[440.011px]" data-name="Container">
      <Container2 />
      <Container3 />
    </div>
  );
}

function Button() {
  return <div className="absolute left-0 size-[15.994px] top-0" data-name="Button" />;
}

function Icon1() {
  return (
    <div className="overflow-clip relative shrink-0 size-[15.994px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9944 15.9944">
        <g id="Group">
          <path d={svgPaths.p1d97d780} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p21bfed00} id="Vector_2" stroke="var(--stroke-0, #808080)" strokeWidth="0.999639" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="content-stretch flex h-[15.994px] items-center relative shrink-0 w-[214.006px]" data-name="Paragraph">
      <p className="font-['Roboto:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#1a1a1a] text-[14px]">{`Don't show this again`}</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute content-stretch flex items-center justify-between left-0 top-0 w-[239.994px]">
      <Icon1 />
      <Paragraph1 />
    </div>
  );
}

function Label() {
  return (
    <div className="flex-[1_0_0] h-[15.994px] min-h-px min-w-px relative" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Button />
        <Frame />
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute content-stretch flex h-[35.983px] items-start left-[29.99px] pt-[4.997px] top-[74.96px] w-[239.994px]" data-name="Container">
      <Label />
    </div>
  );
}

export default function Container() {
  return (
    <div className="relative size-full" data-name="Container">
      <Container1 />
      <Container8 />
    </div>
  );
}