import { AdminNotice, PageIntro, SaveButton, TextArea, TextInput } from "../_components";
import { saveCompanyAction } from "../actions";
import { getCompanyProfile } from "@/lib/cms-db";

type PageProps = {
  searchParams: Promise<{
    saved?: string;
  }>;
};

export default async function CompanyPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const company = getCompanyProfile();

  return (
    <div className="grid gap-6">
      <PageIntro
        kicker="Company"
        title="Company Information"
        body="Manage the company profile used by the CMS. Empty fields are allowed and should be hidden gracefully on the public site later."
      />
      <AdminNotice saved={params.saved} />

      <form
        action={saveCompanyAction}
        className="grid gap-5 rounded-lg border border-rsg-line bg-white p-6 shadow-sm"
      >
        <div className="grid gap-5 md:grid-cols-2">
          <TextInput name="name" label="Company Name" defaultValue={company?.name ?? "Rising Sun Global"} required />
          <TextInput name="email" label="Email" defaultValue={company?.email} />
          <TextInput name="phone" label="Phone" defaultValue={company?.phone} />
          <TextInput name="whatsapp" label="WhatsApp" defaultValue={company?.whatsapp} />
          <TextInput name="linkedinUrl" label="LinkedIn URL" defaultValue={company?.linkedinUrl} />
          <TextInput name="city" label="City" defaultValue={company?.city} />
          <TextInput name="country" label="Country" defaultValue={company?.country} />
          <TextInput name="address" label="Address" defaultValue={company?.address} />
        </div>

        <TextArea name="about" label="About" defaultValue={company?.about} rows={5} />
        <TextArea name="mission" label="Mission" defaultValue={company?.mission} />
        <TextArea name="vision" label="Vision" defaultValue={company?.vision} />

        <div>
          <SaveButton label="Save Company" />
        </div>
      </form>
    </div>
  );
}
