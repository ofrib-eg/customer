import React from "react";
import { Pencil, Plus } from "lucide-react";
import {
  Card,
  CardWithShorthand,
  CardSection,
  CardRowAuto,
  CardRowSplit,
} from "@/app/components/ui/card";
import { InputField, ReadOnlyField, SectionHeader } from "./sharedFields";

/**
 * PROTOTYPE DEMO — not part of the real Customer detail UI.
 *
 * Scratch route for visually verifying the CardSection primitives added in
 * ui/card.tsx (step 1 of the responsive card system) before anything real
 * (CustomerDetail.tsx) depends on them. Safe to delete once step 2+ has
 * migrated real usages and this is no longer needed for verification.
 *
 * Resize the browser window (or, once embedded, the sidebar) to see each
 * primitive react to its own container width, independent of the others.
 */
export function CardSectionDemo() {
  const [tileCount, setTileCount] = React.useState<1 | 2 | 3>(3);
  const [splitBothVisible, setSplitBothVisible] = React.useState(true);

  return (
    <div className="p-8 flex flex-col gap-10 max-w-[1200px] mx-auto">
      <div>
        <h1 className="font-['Roboto_Condensed',sans-serif] font-bold text-[24px] text-[#1a1a1a] mb-2">
          CardSection demo (prototype)
        </h1>
        <p className="font-['Roboto:Regular',sans-serif] text-[14px] text-[#666]">
          Resize your browser window to see each row respond to its own container width.
        </p>
      </div>

      {/* ------------------------------------------------------------------ */}
      <section className="flex flex-col gap-3">
        <SectionHeader>1. CardSection basics — divider + columns</SectionHeader>
        <Card>
          <CardSection>
            <p className="font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a]">
              First section — no divider above (Card's own border separates it from the page).
            </p>
          </CardSection>
          <CardSection>
            <p className="font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a]">
              Second section — divider drawn above automatically.
            </p>
          </CardSection>
          <CardSection columns={2}>
            <InputField label="Field A" value="Two-column section" />
            <InputField label="Field B" value="Collapses to 1 col when this Card narrows" />
          </CardSection>
          <CardSection flush>
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="bg-[#595959] h-[28px] text-left px-[10px] text-white font-['Roboto:Bold',sans-serif] text-[13px] uppercase border-r border-white">
                    Flush section
                  </th>
                  <th className="bg-[#595959] h-[28px] text-left px-[10px] text-white font-['Roboto:Bold',sans-serif] text-[13px] uppercase">
                    Zero padding
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="bg-white h-[36px] px-[10px] font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a] border-b border-[#e5e5e5]">Edge-to-edge</td>
                  <td className="bg-white h-[36px] px-[10px] font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a] border-b border-[#e5e5e5]">table content</td>
                </tr>
              </tbody>
            </table>
          </CardSection>
        </Card>
      </section>

      {/* ------------------------------------------------------------------ */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <SectionHeader className="mb-0">2. CardRowAuto — row-level tile step-down</SectionHeader>
          <div className="flex gap-2">
            {([1, 2, 3] as const).map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setTileCount(n)}
                className={`h-[28px] px-3 rounded-full border text-[12px] font-['Roboto_Condensed:SemiBold',sans-serif] uppercase cursor-pointer ${
                  tileCount === n ? "bg-[#1a1a1a] text-white border-[#1a1a1a]" : "bg-white text-[#1a1a1a] border-[#ccc]"
                }`}
              >
                {n} card{n > 1 ? "s" : ""}
              </button>
            ))}
          </div>
        </div>
        <p className="font-['Roboto:Regular',sans-serif] text-[13px] text-[#666] -mt-2">
          3→2→1 step-down around 708px / 643px container width. Toggle card count above to confirm the "expand to fill, no reserved empty space" rule.
        </p>
        <CardRowAuto maxColumns={3}>
          {Array.from({ length: tileCount }, (_, i) => (
            <CardWithShorthand key={i} title={`Tile ${i + 1}`} action={<Pencil className="size-[16px] text-[#666]" />}>
              <CardSection>
                <ReadOnlyField compact label="Example field" value="Some value" />
                <ReadOnlyField compact label="Another field" value="Another value" />
              </CardSection>
            </CardWithShorthand>
          ))}
        </CardRowAuto>
      </section>

      {/* ------------------------------------------------------------------ */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <SectionHeader className="mb-0">3. CardRowSplit — 8/4 asymmetric split</SectionHeader>
          <button
            type="button"
            onClick={() => setSplitBothVisible((v) => !v)}
            className="h-[28px] px-3 rounded-full border border-[#ccc] text-[12px] font-['Roboto_Condensed:SemiBold',sans-serif] uppercase cursor-pointer bg-white text-[#1a1a1a]"
          >
            {splitBothVisible ? "Hide second card" : "Show second card"}
          </button>
        </div>
        <p className="font-['Roboto:Regular',sans-serif] text-[13px] text-[#666] -mt-2">
          Stacks below 800px container width; switches to an 8/4 (2:1) column split at/above 800px.
        </p>
        <CardRowSplit>
          <CardWithShorthand title="Wider (8fr)">
            <CardSection>
              <p className="font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a]">Primary content, e.g. Organisation.</p>
            </CardSection>
          </CardWithShorthand>
          {splitBothVisible && (
            <CardWithShorthand title="Narrower (4fr)">
              <CardSection>
                <p className="font-['Roboto:Regular',sans-serif] text-[14px] text-[#1a1a1a]">Secondary content, e.g. Notes.</p>
              </CardSection>
            </CardWithShorthand>
          )}
        </CardRowSplit>
      </section>

      <div className="flex items-center gap-2 text-[#666]">
        <Plus className="size-[14px]" />
        <p className="font-['Roboto:Regular',sans-serif] text-[13px]">
          Step 1 demo only — nothing here is wired into the real CustomerDetail.tsx yet.
        </p>
      </div>
    </div>
  );
}
