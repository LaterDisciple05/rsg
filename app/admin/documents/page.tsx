import { AdminNotice, DeleteButton, PageIntro, SaveButton, TextArea, TextInput, VisibilitySelect } from "../_components";
import { deleteDocumentAction, saveDocumentAction } from "../actions";
import { listDocuments } from "@/lib/cms-db";

type PageProps = {
  searchParams: Promise<{ saved?: string; deleted?: string; error?: string }>;
};

export default async function DocumentsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const documents = listDocuments();

  return (
    <div className="grid gap-6">
      <PageIntro
        kicker="Documents"
        title="Manage Documents"
        body="Store document links or uploaded file paths. Local upload automation can be added next."
      />
      <AdminNotice saved={params.saved} deleted={params.deleted} error={params.error} />

      <form action={saveDocumentAction} className="grid gap-5 rounded-lg border border-rsg-line bg-white p-6 shadow-sm">
        <h2 className="text-xl font-black text-rsg-ink">Add Document</h2>
        <div className="grid gap-5 md:grid-cols-2">
          <TextInput name="title" label="Title" required />
          <TextInput name="fileUrl" label="File URL or Path" required />
          <VisibilitySelect defaultValue="PRIVATE" />
        </div>
        <TextArea name="description" label="Description" />
        <div>
          <SaveButton label="Add Document" />
        </div>
      </form>

      <div className="grid gap-4">
        {documents.map((document) => (
          <form key={document.id} action={saveDocumentAction} className="grid gap-5 rounded-lg border border-rsg-line bg-white p-6 shadow-sm">
            <input type="hidden" name="id" value={document.id} />
            <div className="grid gap-5 md:grid-cols-2">
              <TextInput name="title" label="Title" defaultValue={document.title} required />
              <TextInput name="fileUrl" label="File URL or Path" defaultValue={document.fileUrl} required />
              <VisibilitySelect defaultValue={document.visibility} />
            </div>
            <TextArea name="description" label="Description" defaultValue={document.description} />
            <div>
              <SaveButton label="Save Changes" />
            </div>
          </form>
        ))}
      </div>

      {documents.length ? (
        <div className="grid gap-3 rounded-lg border border-rsg-line bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black text-rsg-ink">Delete Documents</h2>
          {documents.map((document) => (
            <form key={document.id} action={deleteDocumentAction} className="flex items-center justify-between gap-4 border-t border-rsg-line pt-3 first:border-t-0 first:pt-0">
              <input type="hidden" name="id" value={document.id} />
              <span className="font-bold text-rsg-charcoal">{document.title}</span>
              <DeleteButton />
            </form>
          ))}
        </div>
      ) : null}
    </div>
  );
}
