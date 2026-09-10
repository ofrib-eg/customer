import * as React from "react";

import { cn } from "./utils";

/**
 * `React.Children.toArray` does NOT flatten `<>...</>` Fragments — a Fragment
 * wrapping N real elements still counts as exactly 1 child. Since callers of
 * `CardRowAuto`/`CardRowSplit` commonly pass a conditional block like
 * `{cond ? <>{a}{b}{c}</> : <>{d}</>}`, naively using `toArray` would always
 * see "1 child" and collapse the row to a single column regardless of how
 * many cards actually render. This recursively unwraps Fragments (and drops
 * null/undefined/false/true, same as `toArray`) so row primitives measure the
 * real, renderable child count.
 */
function flattenRowChildren(children: React.ReactNode): React.ReactNode[] {
  const result: React.ReactNode[] = [];
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && child.type === React.Fragment) {
      result.push(...flattenRowChildren((child.props as { children?: React.ReactNode }).children));
    } else if (child !== null && child !== undefined && typeof child !== "boolean") {
      result.push(child);
    }
  });
  return result;
}

/**
 * ---------------------------------------------------------------------------
 * PROTOTYPE NOTICE
 * ---------------------------------------------------------------------------
 * `CardSection` and the responsive container-query behavior added to `Card`
 * below are a local, prototype-only re-implementation of the `Card` /
 * `CardSection` contract documented in the (not-installed-here) @eg/design-
 * system Storybook. They exist so this Figma Make prototype can demonstrate
 * the intended responsive card behavior end to end, but they are NOT meant to
 * become the permanent implementation — the design system team should build
 * the real versions in @eg/design-system, at which point this local
 * implementation should be replaced with the real import.
 * ---------------------------------------------------------------------------
 */

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground @container flex flex-col gap-6 rounded-xl border",
        className,
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <h4
      data-slot="card-title"
      className={cn("leading-none", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <p
      data-slot="card-description"
      className={cn("text-muted-foreground", className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className,
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6 [&:last-child]:pb-6", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 pb-6 [.border-t]:pt-6", className)}
      {...props}
    />
  );
}

/**
 * Shorthand props added to `Card` so a section-driven layout (see `CardSection`
 * below) doesn't always need the full CardHeader/CardTitle/CardAction
 * sub-component composition for the simple "title + optional top-right action"
 * case. The existing sub-component style keeps working unchanged for anything
 * already using it elsewhere in the app.
 */
interface CardShorthandProps {
  /** Simple header title. Ignored if children already contain a CardHeader. */
  title?: React.ReactNode;
  /** Top-right header slot (e.g. an icon button or "..." menu), shown next to `title`. */
  action?: React.ReactNode;
  /** Draws a divider under the title header, matching CardHeader's `.border-b` convention. */
  headerDivider?: boolean;
}

function CardWithShorthand({
  className,
  title,
  action,
  headerDivider,
  children,
  ...props
}: React.ComponentProps<"div"> & CardShorthandProps) {
  const hasShorthandHeader = title !== undefined || action !== undefined;

  return (
    <Card className={className} {...props}>
      {hasShorthandHeader && (
        <CardHeader className={headerDivider ? "border-b" : undefined}>
          {title !== undefined && <CardTitle>{title}</CardTitle>}
          {action !== undefined && <CardAction>{action}</CardAction>}
        </CardHeader>
      )}
      {children}
    </Card>
  );
}

/**
 * CardSection — a repeatable content block within a Card.
 *
 * Behavioral contract replicated from the @eg/design-system Storybook docs
 * (prototype-local implementation, see notice above):
 * - Every CardSection after the first draws a divider above itself. The
 *   Card's own border already separates the first section from the page, so
 *   the first section stays undivided.
 * - `columns`: lays the section's own children out as an even N-column grid
 *   with a consistent gap. Not combinable with `flush`.
 * - `flush`: zeroes the section's own padding, for content that manages its
 *   own edges (e.g. a data table/grid). Not combinable with `columns`.
 * - An uneven split (e.g. 8/4, or any ratio other than an even N-way divide)
 *   is intentionally NOT covered by `columns` — compose that manually with
 *   flex/grid directly inside a plain CardSection (see the `Split` row
 *   primitive further down for the row-level equivalent).
 *
 * Field-level responsiveness: when `columns` is set, the grid collapses to a
 * single column once the Card itself (the nearest `@container`, see `Card`
 * above) gets narrow. The 480px threshold below is a reasonable starting
 * guess, not a confirmed design spec — verify visually and adjust if needed.
 */
const CARD_SECTION_FIELD_COLLAPSE = "@min-[480px]" as const;

interface CardSectionProps extends React.ComponentProps<"div"> {
  /** Even N-column split for this section's own children. Not combinable with `flush`. */
  columns?: 2 | 3 | 4;
  /** Zero out this section's own padding (e.g. for a flush data table/grid). Not combinable with `columns`. */
  flush?: boolean;
  /** Set false only for a section you know is always first in its Card — suppresses the top divider. Defaults to true (safe default: most sections are not the first child). */
  divider?: boolean;
}

const COLUMN_GRID_CLASS: Record<NonNullable<CardSectionProps["columns"]>, string> = {
  2: `grid grid-cols-1 ${CARD_SECTION_FIELD_COLLAPSE}:grid-cols-2`,
  3: `grid grid-cols-1 ${CARD_SECTION_FIELD_COLLAPSE}:grid-cols-3`,
  4: `grid grid-cols-1 ${CARD_SECTION_FIELD_COLLAPSE}:grid-cols-4`,
};

function CardSection({
  className,
  columns,
  flush = false,
  divider = true,
  children,
  ...props
}: CardSectionProps) {
  if (columns && flush) {
    // Defensive: these two are documented as not combinable. Prefer `columns`.
    // eslint-disable-next-line no-console
    console.warn("CardSection: `columns` and `flush` are not combinable; `flush` is ignored.");
  }

  return (
    <div
      data-slot="card-section"
      className={cn(
        "[&:not(:first-child)]:border-t [&:not(:first-child)]:border-border",
        flush && !columns ? "p-0" : "px-6 py-6",
        columns ? `${COLUMN_GRID_CLASS[columns]} gap-x-8 gap-y-6` : undefined,
        // `divider={false}` is an explicit escape hatch for a section a consumer
        // knows will always render first; the default (divider above every
        // non-first section) is handled automatically by :not(:first-child) above.
        divider === false ? "border-t-0!" : undefined,
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * Row-level "Auto" tile primitive: lays out 1..N CardSections/Cards side by
 * side, stepping the column count down as the row's own container narrows,
 * and expanding evenly to fill whatever number of children actually render
 * (no reserved empty space for a conditionally-absent card).
 *
 * Thresholds replicated from Adrian's documented container breakpoint tokens
 * (theme.eg.breakpoint.container.*), recreated locally as pixel values since
 * the real design tokens aren't available in this repo:
 *   - full N columns above ~1088px  (tile-matrix-collapse)
 *   - step down at ~708px           (tile-row-collapse)
 *   - step down again at ~643px     (tile-row-collapse-2)
 *
 * `maxColumns` caps how many columns the row can ever show (e.g. a 2-card
 * row never needs a 3-column step), independent of how many children are
 * currently rendered.
 */
interface CardRowAutoProps extends React.ComponentProps<"div"> {
  maxColumns?: 2 | 3 | 4;
}

const AUTO_ROW_STEP_CLASSES: Record<2 | 3 | 4, string> = {
  2: "@min-[708px]:grid-cols-2",
  3: "@min-[643px]:grid-cols-2 @min-[708px]:grid-cols-3",
  4: "@min-[643px]:grid-cols-2 @min-[708px]:grid-cols-3 @min-[1088px]:grid-cols-4",
};

function CardRowAuto({ className, maxColumns = 3, children, ...props }: CardRowAutoProps) {
  // The effective column count is capped by however many children actually
  // rendered, not just `maxColumns` — this is what makes a lone remaining
  // card expand to fill the full row width instead of sitting in a
  // reserved-but-empty N-column grid track (the "no reserved empty space"
  // rule from the design spec).
  const childCount = flattenRowChildren(children).length;
  const effectiveMax = Math.min(maxColumns, Math.max(childCount, 1)) as 2 | 3 | 4;
  const gridColsClass = effectiveMax === 1 ? "grid-cols-1" : `grid-cols-1 ${AUTO_ROW_STEP_CLASSES[effectiveMax]}`;

  return (
    // `@container` (container-type: inline-size) must live on the OUTER element,
    // and the responsive `@min-[Npx]:grid-cols-N` classes on an INNER descendant -
    // a container query can't be applied to the same element that establishes the
    // container (self-referential container queries are a no-op per spec), which
    // previously left this row unable to resolve its own width correctly. Mirrors
    // the same outer/inner split already used by `CardRowSplit` below.
    <div data-slot="card-row-auto" className={cn("@container w-full", className)} {...props}>
      <div className={cn("grid gap-6 items-stretch", gridColsClass)}>{children}</div>
    </div>
  );
}

/**
 * Row-level "Split" primitive: a single stacked column below 800px container
 * width, switching to an asymmetric multi-column layout (e.g. 8/4, wider
 * left / narrower right) at and above 800px. This is intentionally NOT built
 * on `columns` (which only covers even splits) — `ratio` maps to fixed grid
 * template columns using fr units, composed manually.
 *
 * If only one child is present, it takes the full row width at any size —
 * pass `children` conditionally (same "no reserved empty space" rule as
 * `CardRowAuto`) and this component measures how many actually rendered.
 */
interface CardRowSplitProps extends React.ComponentProps<"div"> {
  /** fr-unit ratio for [first, second] column when both children are present. Defaults to 8:4 (2:1). */
  ratio?: [number, number];
}

function CardRowSplit({ className, ratio = [8, 4], children, ...props }: CardRowSplitProps) {
  const childArray = flattenRowChildren(children);
  const isSingleChild = childArray.length === 1;

  return (
    <div
      data-slot="card-row-split"
      className={cn("@container grid grid-cols-1 gap-6 items-stretch", className)}
      style={
        isSingleChild
          ? undefined
          : ({
              // Custom property read by the @min-[800px] utility below via arbitrary value,
              // since Tailwind can't interpolate a JS value directly into a responsive variant.
              "--card-row-split-cols": `${ratio[0]}fr ${ratio[1]}fr`,
            } as React.CSSProperties)
      }
      {...props}
    >
      {isSingleChild ? (
        childArray
      ) : (
        <div className="contents @min-[800px]:grid @min-[800px]:grid-cols-[var(--card-row-split-cols)] @min-[800px]:gap-6 @min-[800px]:col-span-full">
          {childArray}
        </div>
      )}
    </div>
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  CardWithShorthand,
  CardSection,
  CardRowAuto,
  CardRowSplit,
};
