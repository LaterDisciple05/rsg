import { Eye, EyeOff } from "lucide-react";
import { saveSectionVisibilityAction } from "../actions";
import type { SectionVisibilityKey } from "@/lib/section-visibility";

type SectionVisibilityCardProps = {
  section: SectionVisibilityKey;
  title: string;
  body: string;
  isVisible: boolean;
  redirectTo: string;
};

export function SectionVisibilityCard({
  section,
  title,
  body,
  isVisible,
  redirectTo,
}: SectionVisibilityCardProps) {
  const Icon = isVisible ? Eye : EyeOff;

  return (
    <form
      action={saveSectionVisibilityAction}
      className="grid gap-4 rounded-lg border border-rsg-line bg-white p-5 shadow-sm md:grid-cols-[1fr_auto] md:items-center"
    >
      <input type="hidden" name="section" value={section} />
      <input type="hidden" name="redirectTo" value={redirectTo} />
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-rsg-orange-soft text-rsg-orange-dark">
          <Icon size={22} />
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-lg font-black text-rsg-ink">{title}</h2>
            <span
              className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] ${
                isVisible
                  ? "bg-green-50 text-green-700"
                  : "bg-rsg-paper text-rsg-muted"
              }`}
            >
              {isVisible ? "Visible" : "Hidden"}
            </span>
          </div>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-rsg-muted">
            {body}
          </p>
        </div>
      </div>

      <label className="flex items-center justify-between gap-4 rounded-md border border-rsg-line px-4 py-3 md:min-w-64">
        <span className="text-sm font-black text-rsg-charcoal">
          Show section
        </span>
        <input
          name="isVisible"
          type="checkbox"
          defaultChecked={isVisible}
          className="peer sr-only"
        />
        <span className="relative h-7 w-12 rounded-full bg-rsg-metal/40 transition-colors after:absolute after:left-1 after:top-1 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow-sm after:transition-transform peer-checked:bg-rsg-orange peer-checked:after:translate-x-5" />
      </label>

      <div className="md:col-start-2 md:flex md:justify-end">
        <button
          type="submit"
          className="w-full rounded-md bg-rsg-navy px-5 py-3 text-sm font-black text-white hover:bg-rsg-orange-dark md:w-auto"
        >
          Save Visibility
        </button>
      </div>
    </form>
  );
}
