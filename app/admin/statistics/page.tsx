import { AdminNotice, DeleteButton, PageIntro, SaveButton, TextInput } from "../_components";
import { deleteStatisticAction, saveStatisticAction } from "../actions";
import { listStatistics } from "@/lib/cms-db";

type PageProps = {
  searchParams: Promise<{ saved?: string; deleted?: string; error?: string }>;
};

export default async function StatisticsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const statistics = listStatistics();

  return (
    <div className="grid gap-6">
      <PageIntro
        kicker="Statistics"
        title="Manage Statistics"
        body="Statistics are optional. Use the visible checkbox only when the number supports the brand."
      />
      <AdminNotice saved={params.saved} deleted={params.deleted} error={params.error} />

      <form action={saveStatisticAction} className="grid gap-5 rounded-lg border border-rsg-line bg-white p-6 shadow-sm">
        <h2 className="text-xl font-black text-rsg-ink">Add Statistic</h2>
        <div className="grid gap-5 md:grid-cols-2">
          <TextInput name="label" label="Label" required />
          <TextInput name="value" label="Value" />
          <TextInput name="suffix" label="Suffix" />
          <TextInput name="sortOrder" label="Sort Order" type="number" defaultValue={0} />
          <label className="flex items-center gap-3 rounded-md border border-rsg-line px-4 py-3 text-sm font-bold text-rsg-charcoal">
            <input name="isVisible" type="checkbox" className="h-4 w-4" />
            Visible on website
          </label>
        </div>
        <div>
          <SaveButton label="Add Statistic" />
        </div>
      </form>

      <div className="grid gap-4">
        {statistics.map((statistic) => (
          <form key={statistic.id} action={saveStatisticAction} className="grid gap-5 rounded-lg border border-rsg-line bg-white p-6 shadow-sm">
            <input type="hidden" name="id" value={statistic.id} />
            <div className="grid gap-5 md:grid-cols-2">
              <TextInput name="label" label="Label" defaultValue={statistic.label} required />
              <TextInput name="value" label="Value" defaultValue={statistic.value} />
              <TextInput name="suffix" label="Suffix" defaultValue={statistic.suffix} />
              <TextInput name="sortOrder" label="Sort Order" type="number" defaultValue={statistic.sortOrder} />
              <label className="flex items-center gap-3 rounded-md border border-rsg-line px-4 py-3 text-sm font-bold text-rsg-charcoal">
                <input name="isVisible" type="checkbox" defaultChecked={statistic.isVisible} className="h-4 w-4" />
                Visible on website
              </label>
            </div>
            <div>
              <SaveButton label="Save Changes" />
            </div>
          </form>
        ))}
      </div>

      {statistics.length ? (
        <div className="grid gap-3 rounded-lg border border-rsg-line bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black text-rsg-ink">Delete Statistics</h2>
          {statistics.map((statistic) => (
            <form key={statistic.id} action={deleteStatisticAction} className="flex items-center justify-between gap-4 border-t border-rsg-line pt-3 first:border-t-0 first:pt-0">
              <input type="hidden" name="id" value={statistic.id} />
              <span className="font-bold text-rsg-charcoal">{statistic.label}</span>
              <DeleteButton />
            </form>
          ))}
        </div>
      ) : null}
    </div>
  );
}
