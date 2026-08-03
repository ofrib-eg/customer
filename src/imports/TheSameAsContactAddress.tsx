import imgImage from "figma:asset/898d19ffff6bfdba80f8fefc8d425930bb2656d8.png";

function SelectorIcon() {
  return (
    <div className="absolute left-[-2px] mix-blend-multiply size-[20px] top-[-2px]" data-name="Selector icon">
      <div className="absolute inset-0 mix-blend-multiply" data-name="image">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[135%] left-[-15%] max-w-none top-[-20%] w-[125%]" src={imgImage} />
        </div>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="h-[17px] relative shrink-0 w-[16px]">
      <SelectorIcon />
    </div>
  );
}

export default function TheSameAsContactAddress() {
  return (
    <div className="content-stretch flex gap-[10px] items-start pb-[15px] pt-[5px] relative size-full" data-name="The same as contact address">
      <Frame />
      <p className="flex-[1_0_0] font-['Roboto:Regular',sans-serif] leading-[normal] min-h-px min-w-px not-italic relative text-[#1a1a1a] text-[14px] whitespace-pre-wrap">Inherit from organization</p>
    </div>
  );
}