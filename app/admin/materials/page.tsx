import { AdminNotice, DeleteButton, PageIntro, SaveButton, TextInput, VisibilitySelect } from "../_components";
import { deleteMaterialAction, saveMaterialAction } from "../actions";
import { prisma } from "@/lib/prisma";

type PageProps = {
  searchParams: Promise<{ saved?: string; deleted?: string; error?: string }>;
};

export default async function MaterialsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const materials = await prisma.material.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div className="grid gap-6">
      <PageIntro
        kicker="Materials"
        title="Manage Materials"
        body="List the scrap materials Rising Sun Global handles."
      />
      <AdminNotice saved={params.saved} deleted={params.deleted} error={params.error} />

      <form action={saveMaterialAction} className="grid gap-5 rounded-lg border border-rsg-line bg-white p-6 shadow-sm">
        <h2 className="text-xl font-black text-rsg-ink">Add Material</h2>
        <div className="grid gap-5 md:grid-cols-2">
          <TextInput name="title" label="Title" required />
          <TextInput name="slug" label="Slug" />
          <TextInput name="sortOrder" label="Sort Order" type="number" defaultValue={0} />
          <VisibilitySelect />
        </div>
        <div>
          <SaveButton label="Add Material" />
        </div>
      </form>

      <div className="grid gap-4">
        {materials.map((material) => (
          <form key={material.id} action={saveMaterialAction} className="grid gap-5 rounded-lg border border-rsg-line bg-white p-6 shadow-sm">
            <input type="hidden" name="id" value={material.id} />
            <div className="grid gap-5 md:grid-cols-2">
              <TextInput name="title" label="Title" defaultValue={material.title} required />
              <TextInput name="slug" label="Slug" defaultValue={material.slug} required />
              <TextInput name="sortOrder" label="Sort Order" type="number" defaultValue={material.sortOrder} />
              <VisibilitySelect defaultValue={material.visibility} />
            </div>
            <div>
              <SaveButton label="Save Changes" />
            </div>
          </form>
        ))}
      </div>

      {materials.length ? (
        <div className="grid gap-3 rounded-lg border border-rsg-line bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black text-rsg-ink">Delete Materials</h2>
          {materials.map((material) => (
            <form key={material.id} action={deleteMaterialAction} className="flex items-center justify-between gap-4 border-t border-rsg-line pt-3 first:border-t-0 first:pt-0">
              <input type="hidden" name="id" value={material.id} />
              <span className="font-bold text-rsg-charcoal">{material.title}</span>
              <DeleteButton />
            </form>
          ))}
        </div>
      ) : null}
    </div>
  );
}
