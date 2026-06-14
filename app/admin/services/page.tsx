import { AdminNotice, DeleteButton, PageIntro, SaveButton, TextArea, TextInput, VisibilitySelect } from "../_components";
import { deleteServiceAction, saveServiceAction } from "../actions";
import { prisma } from "@/lib/prisma";

type PageProps = {
  searchParams: Promise<{
    saved?: string;
    deleted?: string;
    error?: string;
  }>;
};

export default async function ServicesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const services = await prisma.service.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div className="grid gap-6">
      <PageIntro
        kicker="Services"
        title="Manage Services"
        body="Create, edit, reorder, and control public/private visibility for RSG services."
      />
      <AdminNotice saved={params.saved} deleted={params.deleted} error={params.error} />

      <form action={saveServiceAction} className="grid gap-5 rounded-lg border border-rsg-line bg-white p-6 shadow-sm">
        <h2 className="text-xl font-black text-rsg-ink">Add Service</h2>
        <div className="grid gap-5 md:grid-cols-2">
          <TextInput name="title" label="Title" required />
          <TextInput name="slug" label="Slug" />
          <TextInput name="icon" label="Icon Name" />
          <TextInput name="sortOrder" label="Sort Order" type="number" defaultValue={0} />
          <VisibilitySelect />
        </div>
        <TextArea name="description" label="Description" />
        <div>
          <SaveButton label="Add Service" />
        </div>
      </form>

      <div className="grid gap-4">
        {services.map((service) => (
          <form key={service.id} action={saveServiceAction} className="grid gap-5 rounded-lg border border-rsg-line bg-white p-6 shadow-sm">
            <input type="hidden" name="id" value={service.id} />
            <div className="grid gap-5 md:grid-cols-2">
              <TextInput name="title" label="Title" defaultValue={service.title} required />
              <TextInput name="slug" label="Slug" defaultValue={service.slug} required />
              <TextInput name="icon" label="Icon Name" defaultValue={service.icon ?? ""} />
              <TextInput name="sortOrder" label="Sort Order" type="number" defaultValue={service.sortOrder} />
              <VisibilitySelect defaultValue={service.visibility} />
            </div>
            <TextArea name="description" label="Description" defaultValue={service.description} />
            <div className="flex flex-wrap gap-3">
              <SaveButton label="Save Changes" />
            </div>
          </form>
        ))}
      </div>

      {services.length ? (
        <div className="grid gap-3 rounded-lg border border-rsg-line bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black text-rsg-ink">Delete Services</h2>
          {services.map((service) => (
            <form key={service.id} action={deleteServiceAction} className="flex items-center justify-between gap-4 border-t border-rsg-line pt-3 first:border-t-0 first:pt-0">
              <input type="hidden" name="id" value={service.id} />
              <span className="font-bold text-rsg-charcoal">{service.title}</span>
              <DeleteButton />
            </form>
          ))}
        </div>
      ) : null}
    </div>
  );
}
