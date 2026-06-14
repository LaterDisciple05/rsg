import { AdminNotice, DeleteButton, PageIntro, SaveButton } from "../_components";
import { deleteInquiryAction, updateInquiryStatusAction } from "../actions";
import { listInquiries } from "@/lib/cms-db";

type PageProps = {
  searchParams: Promise<{ saved?: string; deleted?: string }>;
};

function StatusSelect({ defaultValue }: { defaultValue: string }) {
  return (
    <select
      name="status"
      defaultValue={defaultValue}
      className="rounded-md border border-rsg-line bg-white px-4 py-3 text-sm font-semibold text-rsg-ink outline-none focus:border-rsg-orange"
    >
      <option value="NEW">New</option>
      <option value="CONTACTED">Contacted</option>
      <option value="QUOTED">Quoted</option>
      <option value="WON">Won</option>
      <option value="LOST">Lost</option>
      <option value="ARCHIVED">Archived</option>
    </select>
  );
}

export default async function InquiriesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const inquiries = listInquiries();

  return (
    <div className="grid gap-6">
      <PageIntro
        kicker="Inquiries"
        title="Manage Customer Inquiries"
        body="Track incoming leads and update their status as the business conversation progresses."
      />
      <AdminNotice saved={params.saved} deleted={params.deleted} />

      <div className="grid gap-4">
        {inquiries.map((inquiry) => (
          <article key={inquiry.id} className="rounded-lg border border-rsg-line bg-white p-6 shadow-sm">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto]">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.14em] text-rsg-orange-dark">
                  {inquiry.status}
                </p>
                <h2 className="mt-2 text-xl font-black text-rsg-ink">
                  {inquiry.name || "Unnamed inquiry"}
                </h2>
                <div className="mt-4 grid gap-2 text-sm leading-6 text-rsg-muted md:grid-cols-2">
                  <p><strong>Company:</strong> {inquiry.company || "-"}</p>
                  <p><strong>Email:</strong> {inquiry.email || "-"}</p>
                  <p><strong>Phone:</strong> {inquiry.phone || "-"}</p>
                  <p><strong>Country:</strong> {inquiry.country || "-"}</p>
                  <p><strong>Material:</strong> {inquiry.material || "-"}</p>
                  <p><strong>Quantity:</strong> {inquiry.quantity || "-"}</p>
                </div>
                {inquiry.message ? (
                  <p className="mt-4 rounded-md bg-rsg-paper p-4 text-sm leading-6 text-rsg-charcoal">
                    {inquiry.message}
                  </p>
                ) : null}
              </div>

              <div className="grid content-start gap-3">
                <form action={updateInquiryStatusAction} className="grid gap-3">
                  <input type="hidden" name="id" value={inquiry.id} />
                  <StatusSelect defaultValue={inquiry.status} />
                  <SaveButton label="Update" />
                </form>
                <form action={deleteInquiryAction}>
                  <input type="hidden" name="id" value={inquiry.id} />
                  <DeleteButton />
                </form>
              </div>
            </div>
          </article>
        ))}
      </div>

      {!inquiries.length ? (
        <div className="rounded-lg border border-rsg-line bg-white p-8 text-center text-rsg-muted">
          No inquiries yet.
        </div>
      ) : null}
    </div>
  );
}
