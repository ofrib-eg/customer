import svgPaths from "./svg-5gzr7b0vmk";

function InfoIcon() {
  return (
    <div className="h-[32px] relative shrink-0 w-[20px]" data-name="Info icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 32">
        <g id="Info icon">
          <path d={svgPaths.p3f104780} fill="var(--fill-0, #0C8955)" id="Primary" />
        </g>
      </svg>
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[24px] items-start min-h-px min-w-px py-[6px] relative" data-name="Content">
      <p className="font-['Roboto:Regular',sans-serif] leading-[1.4] not-italic relative shrink-0 text-[#191919] text-[15px]">{`Contact was successfully anonymized. `}</p>
    </div>
  );
}

function Left() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Left">
      <div className="content-stretch flex gap-[16px] items-start pl-[8px] relative w-full">
        <InfoIcon />
        <Content />
      </div>
    </div>
  );
}

function UiIcon() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="UI icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="UI icon">
          <path d={svgPaths.pc494100} fill="var(--fill-0, #191919)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function CloseButton() {
  return (
    <div className="content-stretch flex items-center justify-center p-[8px] relative rounded-[4px] shrink-0 size-[32px]" data-name="Close button">
      <UiIcon />
    </div>
  );
}

export default function Alert() {
  return (
    <div className="bg-[#e6f8ee] content-stretch flex gap-[16px] items-start p-[12px] relative rounded-[8px] size-full" data-name="Alert">
      <div aria-hidden="true" className="absolute border-2 border-[#55a075] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Left />
      <CloseButton />
    </div>
  );
}