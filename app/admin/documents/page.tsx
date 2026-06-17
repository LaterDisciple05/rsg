import {
  ArrowLeft,
  Building2,
  CalendarDays,
  ExternalLink,
  FileText,
  Files,
  FolderOpen,
  Plus,
  Search,
  SlidersHorizontal,
  UploadCloud,
} from "lucide-react";
import {
  AdminNotice,
  DeleteButton,
  FileUpload,
  PageIntro,
  RelationSelect,
  SaveButton,
  TextArea,
  TextInput,
  VisibilitySelect,
} from "../_components";
import {
  deleteCompanyDocumentHolderAction,
  deleteDocumentAction,
  saveCompanyDocumentHolderAction,
  saveDocumentAction,
} from "../actions";
import { prisma } from "@/lib/prisma";

type PageProps = {
  searchParams: Promise<{
    saved?: string;
    deleted?: string;
    error?: string;
    scope?: string;
    mode?: string;
    id?: string;
    q?: string;
    alpha?: string;
    date?: string;
  }>;
};

type SortDirection = "" | "asc" | "desc";

type DocumentItem = {
  id: string;
  title: string;
  fileUrl: string;
  description: string | null;
  visibility: string;
  projectId: string | null;
  holderId: string | null;
  createdAt: Date;
};

type HolderItem = {
  id: string;
  title: string;
  description: string | null;
  visibility: string;
  createdAt: Date;
  documents: DocumentItem[];
};

type ProjectItem = {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  country: string | null;
  industry: string | null;
  status: string;
  visibility: string;
  createdAt: Date;
  documents: DocumentItem[];
};

const documentAccept = ".pdf,.doc,.docx,.png,.jpg,.jpeg,.xlsx,.xls";

function documentsHref(params: Record<string, string | undefined>) {
  const search = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value) search.set(key, value);
  }

  const query = search.toString();
  return query ? `/admin/documents?${query}` : "/admin/documents";
}

function documentUrl(fileUrl: string) {
  return `/uploads${fileUrl}`;
}

function fileName(fileUrl: string) {
  return fileUrl.split("/").pop() ?? fileUrl;
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-AU", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function sortDirection(value?: string): SortDirection {
  return value === "asc" || value === "desc" ? value : "";
}

function matchesSearch(values: (string | null | undefined)[], query: string) {
  if (!query) return true;

  const needle = query.toLowerCase();
  return values.some((value) => value?.toLowerCase().includes(needle));
}

function sortItems<T extends { title: string; createdAt: Date }>(
  items: T[],
  alpha: SortDirection,
  date: SortDirection
) {
  return [...items].sort((left, right) => {
    if (alpha) {
      const result = left.title.localeCompare(right.title);
      if (result !== 0) return alpha === "asc" ? result : -result;
    }

    if (date) {
      const result = left.createdAt.getTime() - right.createdAt.getTime();
      if (result !== 0) return date === "asc" ? result : -result;
    }

    return 0;
  });
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md bg-rsg-paper px-2.5 py-1 text-[11px] font-black uppercase tracking-wide text-rsg-muted">
      {children}
    </span>
  );
}

function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="inline-flex w-fit items-center gap-2 text-sm font-black text-rsg-muted hover:text-rsg-orange-dark"
    >
      <ArrowLeft size={17} />
      {label}
    </a>
  );
}

function ChoiceCard({
  href,
  icon: Icon,
  title,
  body,
}: {
  href: string;
  icon: React.ElementType;
  title: string;
  body: string;
}) {
  return (
    <a
      href={href}
      className="rounded-lg border border-rsg-line bg-white p-6 shadow-sm transition-colors hover:border-rsg-orange hover:bg-rsg-orange-soft"
    >
      <Icon className="text-rsg-orange-dark" size={28} />
      <h2 className="mt-5 text-xl font-black text-rsg-ink">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-rsg-muted">{body}</p>
    </a>
  );
}

function SearchSortForm({
  scope,
  q,
  alpha,
  date,
}: {
  scope: "company" | "projects";
  q: string;
  alpha: SortDirection;
  date: SortDirection;
}) {
  return (
    <form
      action="/admin/documents"
      className="grid gap-4 rounded-lg border border-rsg-line bg-white p-5 shadow-sm lg:grid-cols-[1fr_180px_180px_auto]"
    >
      <input type="hidden" name="scope" value={scope} />
      <input type="hidden" name="mode" value="review" />
      <label className="grid gap-2">
        <span className="inline-flex items-center gap-2 text-sm font-bold text-rsg-charcoal">
          <Search size={16} />
          Search
        </span>
        <input
          name="q"
          defaultValue={q}
          placeholder={
            scope === "company"
              ? "Search company document holders"
              : "Search project names or details"
          }
          className="rounded-md border border-rsg-line bg-white px-4 py-3 text-sm text-rsg-ink outline-none focus:border-rsg-orange"
        />
      </label>
      <label className="grid gap-2">
        <span className="inline-flex items-center gap-2 text-sm font-bold text-rsg-charcoal">
          <SlidersHorizontal size={16} />
          Alphabet
        </span>
        <select
          name="alpha"
          defaultValue={alpha}
          className="rounded-md border border-rsg-line bg-white px-4 py-3 text-sm font-semibold text-rsg-ink outline-none focus:border-rsg-orange"
        >
          <option value="">No alphabet sort</option>
          <option value="asc">A to Z</option>
          <option value="desc">Z to A</option>
        </select>
      </label>
      <label className="grid gap-2">
        <span className="inline-flex items-center gap-2 text-sm font-bold text-rsg-charcoal">
          <CalendarDays size={16} />
          Date
        </span>
        <select
          name="date"
          defaultValue={date}
          className="rounded-md border border-rsg-line bg-white px-4 py-3 text-sm font-semibold text-rsg-ink outline-none focus:border-rsg-orange"
        >
          <option value="">No date sort</option>
          <option value="desc">Newest first</option>
          <option value="asc">Oldest first</option>
        </select>
      </label>
      <div className="flex items-end">
        <button
          type="submit"
          className="w-full rounded-md bg-rsg-navy px-5 py-3 text-sm font-black text-white hover:bg-rsg-orange-dark"
        >
          Apply
        </button>
      </div>
    </form>
  );
}

function DocumentRows({
  documents,
  redirectTo,
  projectId,
  holderId,
}: {
  documents: DocumentItem[];
  redirectTo: string;
  projectId?: string;
  holderId?: string;
}) {
  if (!documents.length) {
    return (
      <div className="rounded-md border border-dashed border-rsg-line bg-rsg-paper px-4 py-5 text-sm font-bold text-rsg-muted">
        No documents uploaded yet.
      </div>
    );
  }

  return (
    <div className="divide-y divide-rsg-line rounded-md border border-rsg-line">
      {documents.map((doc) => (
        <div key={doc.id} className="grid gap-5 p-4 xl:grid-cols-[1fr_1.3fr_auto]">
          <div className="min-w-0">
            <a
              href={documentUrl(doc.fileUrl)}
              target="_blank"
              className="inline-flex max-w-full items-center gap-2 font-black text-rsg-ink hover:text-rsg-orange-dark"
            >
              <FileText className="shrink-0 text-rsg-orange" size={18} />
              <span className="truncate">{doc.title}</span>
              <ExternalLink className="shrink-0" size={15} />
            </a>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs font-bold text-rsg-muted">
              <Pill>{doc.visibility.toLowerCase()}</Pill>
              <span>{formatDate(doc.createdAt)}</span>
              <span className="max-w-full truncate">{fileName(doc.fileUrl)}</span>
            </div>
            {doc.description ? (
              <p className="mt-3 text-sm leading-6 text-rsg-muted">
                {doc.description}
              </p>
            ) : null}
          </div>

          <form action={saveDocumentAction} className="grid gap-3">
            <input type="hidden" name="id" value={doc.id} />
            <input type="hidden" name="existingFileUrl" value={doc.fileUrl} />
            <input type="hidden" name="redirectTo" value={redirectTo} />
            {projectId ? (
              <input type="hidden" name="projectId" value={projectId} />
            ) : null}
            {holderId ? (
              <input type="hidden" name="holderId" value={holderId} />
            ) : null}
            <div className="grid gap-3 md:grid-cols-2">
              <TextInput
                name="title"
                label="Document Title"
                defaultValue={doc.title}
                required
              />
              <VisibilitySelect defaultValue={doc.visibility} />
              <FileUpload
                name="file"
                label="Replace File"
                accept={documentAccept}
              />
            </div>
            <TextArea
              name="description"
              label="Document Details"
              defaultValue={doc.description}
              rows={2}
            />
            <div>
              <SaveButton label="Save Document" />
            </div>
          </form>

          <form action={deleteDocumentAction} className="xl:pt-8">
            <input type="hidden" name="id" value={doc.id} />
            <input type="hidden" name="redirectTo" value={redirectTo} />
            <DeleteButton />
          </form>
        </div>
      ))}
    </div>
  );
}

function ReviewDocumentLinks({
  documents,
  detailHref,
}: {
  documents: DocumentItem[];
  detailHref: string;
}) {
  return (
    <div className="mt-4 rounded-md bg-rsg-paper p-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs font-black uppercase tracking-wide text-rsg-muted">
          Uploaded Documents
        </p>
        <a
          href={detailHref}
          className="text-xs font-black text-rsg-orange-dark hover:underline"
        >
          Open details / edit
        </a>
      </div>

      {documents.length ? (
        <div className="mt-3 grid gap-2">
          {documents.map((doc) => (
            <a
              key={doc.id}
              href={documentUrl(doc.fileUrl)}
              target="_blank"
              className="flex items-center justify-between gap-3 rounded-md border border-rsg-line bg-white px-3 py-2 text-sm font-bold text-rsg-charcoal hover:border-rsg-orange hover:text-rsg-orange-dark"
            >
              <span className="inline-flex min-w-0 items-center gap-2">
                <FileText className="shrink-0 text-rsg-orange" size={16} />
                <span className="truncate">{doc.title}</span>
              </span>
              <span className="shrink-0 text-xs text-rsg-muted">
                {formatDate(doc.createdAt)}
              </span>
            </a>
          ))}
        </div>
      ) : (
        <div className="mt-3 rounded-md border border-dashed border-rsg-line bg-white px-3 py-3 text-sm font-bold text-rsg-muted">
          No documents uploaded yet.
        </div>
      )}
    </div>
  );
}

function InitialChoice() {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <ChoiceCard
        href={documentsHref({ scope: "company" })}
        icon={Building2}
        title="Company-Level Documents"
        body="Create and review document holders for company certificates, agreements, and general business files."
      />
      <ChoiceCard
        href={documentsHref({ scope: "projects" })}
        icon={FolderOpen}
        title="Existing Project Documents"
        body="Select existing public or private projects, add documents, and review all uploaded project files."
      />
    </div>
  );
}

function ModeChoice({ scope }: { scope: "company" | "projects" }) {
  const isCompany = scope === "company";

  return (
    <div className="grid gap-5">
      <BackLink href="/admin/documents" label="Back to document areas" />
      <div className="grid gap-5 lg:grid-cols-2">
        <ChoiceCard
          href={documentsHref({ scope, mode: "add" })}
          icon={Plus}
          title={isCompany ? "Add New Company Holder" : "Add New Project Documents"}
          body={
            isCompany
              ? "Create a company-level document holder and optionally upload documents into it immediately."
              : "Select an existing project and upload one or many documents with shared details."
          }
        />
        <ChoiceCard
          href={documentsHref({ scope, mode: "review" })}
          icon={Files}
          title="Review Existing"
          body={
            isCompany
              ? "Search, sort, and open existing company document holders."
              : "Search, sort, and open existing projects to review their documents."
          }
        />
      </div>
    </div>
  );
}

function CompanyAddView() {
  const redirectTo = documentsHref({ scope: "company", mode: "add" });

  return (
    <div className="grid gap-5">
      <BackLink
        href={documentsHref({ scope: "company" })}
        label="Back to company document options"
      />
      <form
        action={saveCompanyDocumentHolderAction}
        className="grid gap-5 rounded-lg border border-rsg-line bg-white p-6 shadow-sm"
      >
        <input type="hidden" name="redirectTo" value={redirectTo} />
        <div>
          <h2 className="text-xl font-black text-rsg-ink">
            Create Company Document Holder
          </h2>
          <p className="mt-2 text-sm leading-6 text-rsg-muted">
            Create the holder first. It will appear in Review Existing, where
            it can be opened, edited, and managed.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <TextInput name="title" label="Holder Name" required />
          <VisibilitySelect defaultValue="PRIVATE" />
        </div>
        <TextArea name="description" label="Holder Details" />
        <div className="grid gap-5 md:grid-cols-2">
          <FileUpload
            name="files"
            label="Documents (Optional)"
            accept={documentAccept}
            multiple
          />
          <TextArea
            name="documentDescription"
            label="Document Details (Optional)"
            rows={3}
          />
        </div>
        <div>
          <SaveButton label="Create Holder" />
        </div>
      </form>
    </div>
  );
}

function ProjectAddView({ projects }: { projects: ProjectItem[] }) {
  const redirectTo = documentsHref({ scope: "projects", mode: "add" });
  const projectOptions = projects.map((project) => ({
    id: project.id,
    name: project.title,
  }));

  return (
    <div className="grid gap-5">
      <BackLink
        href={documentsHref({ scope: "projects" })}
        label="Back to project document options"
      />
      <form
        action={saveDocumentAction}
        className="grid gap-5 rounded-lg border border-rsg-line bg-white p-6 shadow-sm"
      >
        <input type="hidden" name="redirectTo" value={redirectTo} />
        <div>
          <h2 className="text-xl font-black text-rsg-ink">
            Add Documents To Existing Project
          </h2>
          <p className="mt-2 text-sm leading-6 text-rsg-muted">
            Private and public projects are both available here.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <RelationSelect
            name="projectId"
            label="Project"
            options={projectOptions}
            required
          />
          <TextInput name="title" label="Title Prefix (Optional)" />
          <VisibilitySelect defaultValue="PRIVATE" />
          <FileUpload
            name="files"
            label="Documents"
            accept={documentAccept}
            required
            multiple
          />
        </div>
        <TextArea name="description" label="Document Details" />
        <div>
          <SaveButton label="Save Project Documents" />
        </div>
      </form>
    </div>
  );
}

function CompanyReviewView({
  holders,
  q,
  alpha,
  date,
}: {
  holders: HolderItem[];
  q: string;
  alpha: SortDirection;
  date: SortDirection;
}) {
  const filtered = sortItems(
    holders.filter((holder) =>
      matchesSearch([holder.title, holder.description], q)
    ),
    alpha,
    date
  );

  return (
    <div className="grid gap-5">
      <BackLink
        href={documentsHref({ scope: "company" })}
        label="Back to company document options"
      />
      <SearchSortForm scope="company" q={q} alpha={alpha} date={date} />
      <div className="grid gap-3">
        {filtered.map((holder) => {
          const detailHref = documentsHref({
            scope: "company",
            mode: "detail",
            id: holder.id,
          });

          return (
          <div
            key={holder.id}
            className="rounded-lg border border-rsg-line bg-white p-5 shadow-sm"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-black text-rsg-ink">
                  {holder.title}
                </h2>
                {holder.description ? (
                  <p className="mt-2 text-sm leading-6 text-rsg-muted">
                    {holder.description}
                  </p>
                ) : null}
              </div>
              <div className="flex flex-wrap gap-2">
                <Pill>{holder.visibility.toLowerCase()}</Pill>
                <Pill>{holder.documents.length} docs</Pill>
                <Pill>{formatDate(holder.createdAt)}</Pill>
              </div>
            </div>
            <ReviewDocumentLinks
              documents={holder.documents}
              detailHref={detailHref}
            />
          </div>
        );
        })}
        {!filtered.length ? (
          <div className="rounded-lg border border-dashed border-rsg-line bg-white p-6 text-sm font-bold text-rsg-muted">
            No company document holders found.
          </div>
        ) : null}
      </div>
    </div>
  );
}

function ProjectReviewView({
  projects,
  q,
  alpha,
  date,
}: {
  projects: ProjectItem[];
  q: string;
  alpha: SortDirection;
  date: SortDirection;
}) {
  const filtered = sortItems(
    projects.filter((project) =>
      matchesSearch(
        [
          project.title,
          project.description,
          project.category,
          project.country,
          project.industry,
        ],
        q
      )
    ),
    alpha,
    date
  );

  return (
    <div className="grid gap-5">
      <BackLink
        href={documentsHref({ scope: "projects" })}
        label="Back to project document options"
      />
      <SearchSortForm scope="projects" q={q} alpha={alpha} date={date} />
      <div className="grid gap-3">
        {filtered.map((project) => {
          const detailHref = documentsHref({
            scope: "projects",
            mode: "detail",
            id: project.id,
          });

          return (
          <div
            key={project.id}
            className="rounded-lg border border-rsg-line bg-white p-5 shadow-sm"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-black text-rsg-ink">
                  {project.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-rsg-muted">
                  {[project.category, project.industry, project.country]
                    .filter(Boolean)
                    .join(" / ") || "No project details added yet."}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Pill>{project.status.toLowerCase()}</Pill>
                <Pill>{project.visibility.toLowerCase()}</Pill>
                <Pill>{project.documents.length} docs</Pill>
                <Pill>{formatDate(project.createdAt)}</Pill>
              </div>
            </div>
            <ReviewDocumentLinks
              documents={project.documents}
              detailHref={detailHref}
            />
          </div>
        );
        })}
        {!filtered.length ? (
          <div className="rounded-lg border border-dashed border-rsg-line bg-white p-6 text-sm font-bold text-rsg-muted">
            No projects found.
          </div>
        ) : null}
      </div>
    </div>
  );
}

function CompanyDetailView({ holder }: { holder: HolderItem }) {
  const redirectTo = documentsHref({
    scope: "company",
    mode: "detail",
    id: holder.id,
  });

  return (
    <div className="grid gap-5">
      <BackLink
        href={documentsHref({ scope: "company", mode: "review" })}
        label="Back to company holder review"
      />
      <section className="rounded-lg border border-rsg-line bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-rsg-ink">{holder.title}</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              <Pill>created {formatDate(holder.createdAt)}</Pill>
              <Pill>{holder.visibility.toLowerCase()}</Pill>
              <Pill>{holder.documents.length} documents</Pill>
            </div>
          </div>
          <form action={deleteCompanyDocumentHolderAction}>
            <input type="hidden" name="id" value={holder.id} />
            <DeleteButton />
          </form>
        </div>

        <form
          action={saveCompanyDocumentHolderAction}
          className="mt-6 grid gap-4 rounded-md bg-rsg-paper p-4"
        >
          <input type="hidden" name="id" value={holder.id} />
          <input type="hidden" name="redirectTo" value={redirectTo} />
          <div className="grid gap-4 md:grid-cols-2">
            <TextInput
              name="title"
              label="Holder Name"
              defaultValue={holder.title}
              required
            />
            <VisibilitySelect defaultValue={holder.visibility} />
          </div>
          <TextArea
            name="description"
            label="Holder Details"
            defaultValue={holder.description}
          />
          <div>
            <SaveButton label="Save Holder Details" />
          </div>
        </form>

        <form
          action={saveDocumentAction}
          className="mt-5 grid gap-4 rounded-md bg-rsg-paper p-4"
        >
          <input type="hidden" name="holderId" value={holder.id} />
          <input type="hidden" name="redirectTo" value={redirectTo} />
          <div className="flex items-center gap-2 text-sm font-black uppercase text-rsg-orange-dark">
            <UploadCloud size={18} />
            Add Documents To This Holder
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <TextInput name="title" label="Title Prefix (Optional)" />
            <VisibilitySelect defaultValue="PRIVATE" />
            <FileUpload
              name="files"
              label="Documents"
              accept={documentAccept}
              required
              multiple
            />
          </div>
          <TextArea name="description" label="Document Details" rows={2} />
          <div>
            <SaveButton label="Add Documents" />
          </div>
        </form>

        <div className="mt-6">
          <DocumentRows
            documents={holder.documents}
            redirectTo={redirectTo}
            holderId={holder.id}
          />
        </div>
      </section>
    </div>
  );
}

function ProjectDetailView({ project }: { project: ProjectItem }) {
  const redirectTo = documentsHref({
    scope: "projects",
    mode: "detail",
    id: project.id,
  });

  return (
    <div className="grid gap-5">
      <BackLink
        href={documentsHref({ scope: "projects", mode: "review" })}
        label="Back to project review"
      />
      <section className="rounded-lg border border-rsg-line bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-rsg-ink">{project.title}</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              <Pill>created {formatDate(project.createdAt)}</Pill>
              <Pill>{project.status.toLowerCase()}</Pill>
              <Pill>{project.visibility.toLowerCase()}</Pill>
              <Pill>{project.documents.length} documents</Pill>
            </div>
            {project.description ? (
              <p className="mt-4 max-w-3xl text-sm leading-6 text-rsg-muted">
                {project.description}
              </p>
            ) : null}
          </div>
          <a
            href="/admin/projects"
            className="rounded-md border border-rsg-line px-4 py-2 text-sm font-bold text-rsg-charcoal hover:bg-rsg-paper"
          >
            Edit Project
          </a>
        </div>

        <form
          action={saveDocumentAction}
          className="mt-6 grid gap-4 rounded-md bg-rsg-paper p-4"
        >
          <input type="hidden" name="projectId" value={project.id} />
          <input type="hidden" name="redirectTo" value={redirectTo} />
          <div className="flex items-center gap-2 text-sm font-black uppercase text-rsg-orange-dark">
            <UploadCloud size={18} />
            Add Documents To This Project
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <TextInput name="title" label="Title Prefix (Optional)" />
            <VisibilitySelect defaultValue="PRIVATE" />
            <FileUpload
              name="files"
              label="Documents"
              accept={documentAccept}
              required
              multiple
            />
          </div>
          <TextArea name="description" label="Document Details" rows={2} />
          <div>
            <SaveButton label="Add Documents" />
          </div>
        </form>

        <div className="mt-6">
          <DocumentRows
            documents={project.documents}
            redirectTo={redirectTo}
            projectId={project.id}
          />
        </div>
      </section>
    </div>
  );
}

export default async function DocumentsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const scope = params.scope === "company" || params.scope === "projects"
    ? params.scope
    : "";
  const mode =
    params.mode === "add" ||
    params.mode === "review" ||
    params.mode === "detail"
      ? params.mode
      : "";
  const q = (params.q ?? "").trim();
  const alpha = sortDirection(params.alpha);
  const date = sortDirection(params.date);
  const [holders, projects] = await Promise.all([
    prisma.companyDocumentHolder.findMany({
      include: {
        documents: { orderBy: { createdAt: "desc" } },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.project.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        category: true,
        country: true,
        industry: true,
        status: true,
        visibility: true,
        createdAt: true,
        documents: {
          orderBy: { createdAt: "desc" },
        },
      },
      orderBy: { createdAt: "desc" },
    }),
  ]);
  const holder = holders.find((item) => item.id === params.id);
  const project = projects.find((item) => item.id === params.id);

  return (
    <div className="grid gap-6">
      <PageIntro
        kicker="Documents"
        title="Document Management"
        body="Choose company-level documents or existing project documents, then add new records or review existing files with search and layered sorting."
      />
      <AdminNotice
        saved={params.saved}
        deleted={params.deleted}
        error={params.error}
      />

      {!scope ? <InitialChoice /> : null}
      {scope && !mode ? <ModeChoice scope={scope} /> : null}
      {scope === "company" && mode === "add" ? <CompanyAddView /> : null}
      {scope === "projects" && mode === "add" ? (
        <ProjectAddView projects={projects} />
      ) : null}
      {scope === "company" && mode === "review" ? (
        <CompanyReviewView
          holders={holders}
          q={q}
          alpha={alpha}
          date={date}
        />
      ) : null}
      {scope === "projects" && mode === "review" ? (
        <ProjectReviewView
          projects={projects}
          q={q}
          alpha={alpha}
          date={date}
        />
      ) : null}
      {scope === "company" && mode === "detail" && holder ? (
        <CompanyDetailView holder={holder} />
      ) : null}
      {scope === "projects" && mode === "detail" && project ? (
        <ProjectDetailView project={project} />
      ) : null}
      {mode === "detail" && !holder && !project ? (
        <div className="rounded-lg border border-dashed border-rsg-line bg-white p-6 text-sm font-bold text-rsg-muted">
          The selected document record could not be found.
        </div>
      ) : null}
    </div>
  );
}
