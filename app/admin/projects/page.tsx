import { AdminNotice, DeleteButton, PageIntro, SaveButton, TextArea, TextInput, VisibilitySelect } from "../_components";
import { deleteProjectAction, saveProjectAction } from "../actions";
import { listProjects } from "@/lib/cms-db";

type PageProps = {
  searchParams: Promise<{ saved?: string; deleted?: string; error?: string }>;
};

function StatusSelect({ defaultValue = "PLANNED" }: { defaultValue?: string }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-bold text-rsg-charcoal">Status</span>
      <select
        name="status"
        defaultValue={defaultValue}
        className="rounded-md border border-rsg-line bg-white px-4 py-3 text-sm font-semibold text-rsg-ink outline-none focus:border-rsg-orange"
      >
        <option value="PLANNED">Planned</option>
        <option value="ACTIVE">Active</option>
        <option value="COMPLETED">Completed</option>
        <option value="ARCHIVED">Archived</option>
      </select>
    </label>
  );
}

export default async function ProjectsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const projects = listProjects();

  return (
    <div className="grid gap-6">
      <PageIntro
        kicker="Projects"
        title="Manage Projects"
        body="Store public or private project records. Publish only approved work."
      />
      <AdminNotice saved={params.saved} deleted={params.deleted} error={params.error} />

      <form action={saveProjectAction} className="grid gap-5 rounded-lg border border-rsg-line bg-white p-6 shadow-sm">
        <h2 className="text-xl font-black text-rsg-ink">Add Project</h2>
        <div className="grid gap-5 md:grid-cols-2">
          <TextInput name="title" label="Title" required />
          <TextInput name="slug" label="Slug" />
          <TextInput name="category" label="Category" />
          <TextInput name="country" label="Country" />
          <TextInput name="industry" label="Industry" />
          <StatusSelect />
          <VisibilitySelect defaultValue="PRIVATE" />
          <label className="flex items-center gap-3 rounded-md border border-rsg-line px-4 py-3 text-sm font-bold text-rsg-charcoal">
            <input name="featured" type="checkbox" className="h-4 w-4" />
            Featured
          </label>
        </div>
        <TextArea name="description" label="Description" />
        <div>
          <SaveButton label="Add Project" />
        </div>
      </form>

      <div className="grid gap-4">
        {projects.map((project) => (
          <form key={project.id} action={saveProjectAction} className="grid gap-5 rounded-lg border border-rsg-line bg-white p-6 shadow-sm">
            <input type="hidden" name="id" value={project.id} />
            <div className="grid gap-5 md:grid-cols-2">
              <TextInput name="title" label="Title" defaultValue={project.title} required />
              <TextInput name="slug" label="Slug" defaultValue={project.slug} required />
              <TextInput name="category" label="Category" defaultValue={project.category} />
              <TextInput name="country" label="Country" defaultValue={project.country} />
              <TextInput name="industry" label="Industry" defaultValue={project.industry} />
              <StatusSelect defaultValue={project.status} />
              <VisibilitySelect defaultValue={project.visibility} />
              <label className="flex items-center gap-3 rounded-md border border-rsg-line px-4 py-3 text-sm font-bold text-rsg-charcoal">
                <input name="featured" type="checkbox" defaultChecked={project.featured} className="h-4 w-4" />
                Featured
              </label>
            </div>
            <TextArea name="description" label="Description" defaultValue={project.description} />
            <div>
              <SaveButton label="Save Changes" />
            </div>
          </form>
        ))}
      </div>

      {projects.length ? (
        <div className="grid gap-3 rounded-lg border border-rsg-line bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black text-rsg-ink">Delete Projects</h2>
          {projects.map((project) => (
            <form key={project.id} action={deleteProjectAction} className="flex items-center justify-between gap-4 border-t border-rsg-line pt-3 first:border-t-0 first:pt-0">
              <input type="hidden" name="id" value={project.id} />
              <span className="font-bold text-rsg-charcoal">{project.title}</span>
              <DeleteButton />
            </form>
          ))}
        </div>
      ) : null}
    </div>
  );
}
