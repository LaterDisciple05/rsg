import { AdminNotice, DeleteButton, FileUpload, PageIntro, SaveButton, TextArea, TextInput, VisibilitySelect } from "../_components";
import { deleteDocumentAction, saveDocumentAction } from "../actions";
import { prisma } from "@/lib/prisma";

type PageProps = {
  searchParams: Promise<{ saved?: string; deleted?: string; error?: string }>;
};

export default async function DocumentsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const documents = await prisma.document.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="grid gap-6">
      <PageIntro
        kicker="Documents"
        title="Manage Documents"
        body="Upload and manage company certificates, agreements, and other files."
      />
      <AdminNotice saved={params.saved} deleted={params.deleted} error={params.error} />

      <form action={saveDocumentAction} className="grid gap-5 rounded-lg border border-rsg-line bg-white p-6 shadow-sm">
        <h2 className="text-xl font-black text-rsg-ink">Upload Document</h2>
        <div className="grid gap-5 md:grid-cols-2">
          <TextInput name="title" label="Title" required />
          <VisibilitySelect defaultValue="PRIVATE" />
          <FileUpload name="file" label="Document File (PDF, etc.)" accept=".pdf,.doc,.docx,.png,.jpg" required />
        </div>
        <TextArea name="description" label="Description" />
        <div>
          <SaveButton label="Upload" />
        </div>
      </form>

      <div className="grid gap-4">
        {documents.map((doc) => (
          <form key={doc.id} action={saveDocumentAction} className="grid gap-5 rounded-lg border border-rsg-line bg-white p-6 shadow-sm">
            <input type="hidden" name="id" value={doc.id} />
            <input type="hidden" name="existingFileUrl" value={doc.fileUrl} />
            <div className="grid gap-5 md:grid-cols-2">
              <TextInput name="title" label="Title" defaultValue={doc.title} required />
              <VisibilitySelect defaultValue={doc.visibility} />
              <FileUpload name="file" label="Replace File (Optional)" accept=".pdf,.doc,.docx,.png,.jpg" />
            </div>
            <div className="text-sm font-bold text-rsg-muted italic">
              Current file: <a href={`/uploads${doc.fileUrl}`} target="_blank" className="text-rsg-orange hover:underline">{doc.fileUrl}</a>
            </div>
            <TextArea name="description" label="Description" defaultValue={doc.description} />
            <div>
              <SaveButton label="Save Changes" />
            </div>
          </form>
        ))}
      </div>

      {documents.length ? (
        <div className="grid gap-3 rounded-lg border border-rsg-line bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black text-rsg-ink">Delete Documents</h2>
          {documents.map((doc) => (
            <form key={doc.id} action={deleteDocumentAction} className="flex items-center justify-between gap-4 border-t border-rsg-line pt-3 first:border-t-0 first:pt-0">
              <input type="hidden" name="id" value={doc.id} />
              <span className="font-bold text-rsg-charcoal">{doc.title}</span>
              <DeleteButton />
            </form>
          ))}
        </div>
      ) : null}
    </div>
  );
}
