import { MailCheck, Send } from "lucide-react";
import {
  AdminNotice,
  DeleteButton,
  DismissibleAdminNotice,
  PageIntro,
  SaveButton,
  TextInput,
} from "../_components";
import {
  deleteInquiryAction,
  saveInquiryEmailSettingsAction,
  updateInquiryStatusAction,
} from "../actions";
import { getInquiryEmailSettings } from "@/lib/inquiry-email-settings";
import { prisma } from "@/lib/prisma";

type PageProps = {
  searchParams: Promise<{
    saved?: string;
    deleted?: string;
    emailSettings?: string;
    emailError?: string;
  }>;
};

function StatusSelect({ defaultValue = "NEW" }: { defaultValue?: string }) {
  return (
    <select
      name="status"
      defaultValue={defaultValue}
      className="rounded-md border border-rsg-line bg-white px-3 py-2 text-xs font-bold text-rsg-ink outline-none focus:border-rsg-orange"
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
  const [inquiries, emailSettings] = await Promise.all([
    prisma.inquiry.findMany({
      orderBy: { createdAt: "desc" },
    }),
    getInquiryEmailSettings(),
  ]);

  return (
    <div className="grid gap-6">
      <PageIntro
        kicker="Inquiries"
        title="Customer Leads"
        body="Review and manage business inquiries received through the website."
      />
      <AdminNotice saved={params.saved} deleted={params.deleted} />
      {params.emailSettings ? (
        <DismissibleAdminNotice
          removeParams={["emailSettings"]}
          className="rounded-md border border-rsg-orange/25 bg-rsg-orange-soft px-4 py-3 text-sm font-bold text-rsg-orange-dark"
        >
          Inquiry email settings saved.
        </DismissibleAdminNotice>
      ) : null}
      {params.emailError ? (
        <DismissibleAdminNotice
          removeParams={["emailError"]}
          className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-800"
        >
          Please enter a valid receive email address.
        </DismissibleAdminNotice>
      ) : null}

      <form
        action={saveInquiryEmailSettingsAction}
        className="rounded-lg border border-rsg-line bg-white p-6 shadow-sm"
      >
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-rsg-orange-soft text-rsg-orange-dark">
              <MailCheck size={22} />
            </div>
            <div>
              <h2 className="text-lg font-black text-rsg-ink">
                Inquiry Email Routing
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-rsg-muted">
                Set the email address that receives new website inquiries.
                Sender stays protected in SMTP settings.
              </p>
            </div>
          </div>
          <div className="rounded-md border border-rsg-line bg-rsg-paper px-3 py-2 text-xs font-bold text-rsg-muted">
            Sender and password stay protected in server settings.
          </div>
        </div>

        <div className="mt-5 max-w-2xl">
          <TextInput
            name="receiverEmail"
            label="Inquiry Receive Email"
            type="email"
            defaultValue={emailSettings.receiverEmail}
            required
          />
        </div>

        <div className="mt-5 flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-rsg-navy px-5 py-3 text-sm font-black text-white hover:bg-rsg-orange-dark"
          >
            <Send size={17} />
            Save Email Settings
          </button>
        </div>
      </form>

      <div className="grid gap-4">
        {inquiries.length === 0 && (
          <div className="rounded-lg border border-dashed border-rsg-line p-12 text-center">
            <p className="text-sm font-bold text-rsg-muted">No inquiries yet.</p>
          </div>
        )}

        {inquiries.map((inquiry) => (
          <div key={inquiry.id} className="rounded-lg border border-rsg-line bg-white p-6 shadow-sm">
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
              <div className="grid gap-1">
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-black text-rsg-ink">
                    {inquiry.name || "Anonymous"}
                  </h2>
                  <span className="rounded-full bg-rsg-orange-soft px-3 py-1 text-[10px] font-black uppercase tracking-wider text-rsg-orange-dark">
                    {inquiry.status}
                  </span>
                </div>
                <p className="text-sm font-bold text-rsg-muted">
                  {inquiry.company ? `${inquiry.company} • ` : ""}{inquiry.email} • {inquiry.phone}
                </p>
                <p className="mt-1 text-xs text-rsg-muted">
                  Received on {new Date(inquiry.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <form action={updateInquiryStatusAction} className="flex items-center gap-2">
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

            <div className="mt-6 grid gap-4 rounded-md border border-rsg-line bg-rsg-paper p-4 lg:grid-cols-3">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-rsg-muted">Country</p>
                <p className="mt-1 text-sm font-bold text-rsg-charcoal">{inquiry.country || "Not specified"}</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-rsg-muted">Material</p>
                <p className="mt-1 text-sm font-bold text-rsg-charcoal">{inquiry.material || "Not specified"}</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-rsg-muted">Quantity</p>
                <p className="mt-1 text-sm font-bold text-rsg-charcoal">{inquiry.quantity || "Not specified"}</p>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-rsg-muted">Message</p>
              <p className="mt-2 text-sm leading-relaxed text-rsg-ink">
                {inquiry.message || "No message provided."}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
