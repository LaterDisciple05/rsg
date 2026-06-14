import { AdminNotice, PageIntro, SaveButton, TextArea, TextInput } from "../_components";
import { saveCompanyAction } from "../actions";
import { prisma } from "@/lib/prisma";

type PageProps = {
  searchParams: Promise<{ saved?: string }>;
};

export default async function CompanyPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const company = await prisma.companyProfile.findUnique({ where: { id: "main" } });

  return (
    <div className="grid gap-6">
      <PageIntro
        kicker="Company"
        title="Company Profile"
        body="Manage the official identity and contact details of Rising Sun Global."
      />
      <AdminNotice saved={params.saved} />

      <form action={saveCompanyAction} className="grid gap-5 rounded-lg border border-rsg-line bg-white p-6 shadow-sm">
        <div className="grid gap-5 md:grid-cols-2">
          <TextInput name="name" label="Company Name" defaultValue={company?.name} required />
          <TextInput name="email" label="Public Email" defaultValue={company?.email} />
          <TextInput name="phone" label="Phone Number" defaultValue={company?.phone} />
          <TextInput name="whatsapp" label="WhatsApp Number" defaultValue={company?.whatsapp} />
          <TextInput name="linkedinUrl" label="LinkedIn URL" defaultValue={company?.linkedinUrl} />
          <TextInput name="city" label="City" defaultValue={company?.city} />
          <TextInput name="country" label="Country" defaultValue={company?.country} />
        </div>
        <TextArea name="about" label="About Us" defaultValue={company?.about} />
        <TextArea name="mission" label="Mission Statement" defaultValue={company?.mission} />
        <TextArea name="vision" label="Vision Statement" defaultValue={company?.vision} />
        <TextArea name="address" label="Full Address" defaultValue={company?.address} />
        <div>
          <SaveButton label="Save Profile" />
        </div>
      </form>
    </div>
  );
}
