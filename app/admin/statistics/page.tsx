import { AdminNotice, DeleteButton, PageIntro, SaveButton, TextInput } from "../_components";
import { deleteStatisticAction, saveStatisticAction } from "../actions";
import { prisma } from "@/lib/prisma";

type PageProps = {
  searchParams: Promise<{ saved?: string; deleted?: string; error?: string }>;
};

export default async function StatisticsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const stats = await prisma.statistic.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div className="grid gap-6">
      <PageIntro
        kicker="Statistics"
        title="Manage Metrics"
        body="Control the visibility and values of company performance metrics."
      />
      <AdminNotice saved={params.saved} deleted={params.deleted} error={params.error} />

      <form action={saveStatisticAction} className="grid gap-5 rounded-lg border border-rsg-line bg-white p-6 shadow-sm">
        <h2 className="text-xl font-black text-rsg-ink">Add Metric</h2>
        <div className="grid gap-5 md:grid-cols-2">
          <TextInput name="label" label="Label (e.g., Projects Done)" required />
          <TextInput name="value" label="Value (e.g., 50)" />
          <TextInput name="suffix" label="Suffix (e.g., +)" />
          <TextInput name="sortOrder" label="Sort Order" type="number" defaultValue={0} />
          <label className="flex items-center gap-3 rounded-md border border-rsg-line px-4 py-3 text-sm font-bold text-rsg-charcoal">
            <input name="isVisible" type="checkbox" className="h-4 w-4" defaultChecked />
            Visible on Site
          </label>
        </div>
        <div>
          <SaveButton label="Add Metric" />
        </div>
      </form>

      <div className="grid gap-4">
        {stats.map((stat) => (
          <form key={stat.id} action={saveStatisticAction} className="grid gap-5 rounded-lg border border-rsg-line bg-white p-6 shadow-sm">
            <input type="hidden" name="id" value={stat.id} />
            <div className="grid gap-5 md:grid-cols-2">
              <TextInput name="label" label="Label" defaultValue={stat.label} required />
              <TextInput name="value" label="Value" defaultValue={stat.value ?? ""} />
              <TextInput name="suffix" label="Suffix" defaultValue={stat.suffix ?? ""} />
              <TextInput name="sortOrder" label="Sort Order" type="number" defaultValue={stat.sortOrder} />
              <label className="flex items-center gap-3 rounded-md border border-rsg-line px-4 py-3 text-sm font-bold text-rsg-charcoal">
                <input name="isVisible" type="checkbox" defaultChecked={stat.isVisible} className="h-4 w-4" />
                Visible on Site
              </label>
            </div>
            <div>
              <SaveButton label="Save Changes" />
            </div>
          </form>
        ))}
      </div>

      {stats.length ? (
        <div className="grid gap-3 rounded-lg border border-rsg-line bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black text-rsg-ink">Delete Metrics</h2>
          {stats.map((stat) => (
            <form key={stat.id} action={deleteStatisticAction} className="flex items-center justify-between gap-4 border-t border-rsg-line pt-3 first:border-t-0 first:pt-0">
              <input type="hidden" name="id" value={stat.id} />
              <span className="font-bold text-rsg-charcoal">{stat.label}</span>
              <DeleteButton />
            </form>
          ))}
        </div>
      ) : null}
    </div>
  );
}
