function Frame() {
  return (
    <div className="bg-[#333] content-stretch flex items-start px-[25px] py-[9px] relative shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] shrink-0">
      <p className="font-['Roboto:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[13px] text-center text-white tracking-[-0.5px] uppercase">Contact</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="bg-[#333] content-stretch flex items-start px-[25px] py-[6px] relative shrink-0">
      <p className="font-['Roboto:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#ccc] text-[13px] text-center tracking-[-0.5px] uppercase">Details</p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="bg-[#333] content-stretch flex items-start px-[25px] py-[6px] relative shrink-0">
      <p className="font-['Roboto:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#ccc] text-[13px] text-center tracking-[-0.5px] uppercase">Remarks</p>
    </div>
  );
}

function Tabs1() {
  return (
    <div className="content-stretch flex gap-[2px] items-start relative shrink-0" data-name="Tabs">
      <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="// Tab">
        <Frame />
      </div>
      <div className="content-stretch flex flex-col items-start py-[3px] relative shrink-0" data-name="// Tab">
        <Frame1 />
      </div>
      <div className="content-stretch flex flex-col items-start py-[3px] relative shrink-0" data-name="// Tab">
        <Frame2 />
      </div>
    </div>
  );
}

function Autolayout() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex gap-[2px] items-start right-[10px] top-[calc(50%-2px)]" data-name="Autolayout">
      <Tabs1 />
    </div>
  );
}

export default function Tabs() {
  return (
    <div className="bg-[#37836e] relative size-full" data-name="Tabs">
      <Autolayout />
    </div>
  );
}