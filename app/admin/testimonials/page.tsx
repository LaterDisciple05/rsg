import { AdminNotice, DeleteButton, PageIntro, SaveButton, TextArea, TextInput, VisibilitySelect } from "../_components";
import { deleteTestimonialAction, saveTestimonialAction } from "../actions";
import { prisma } from "@/lib/prisma";

type PageProps = {
  searchParams: Promise<{ saved?: string; deleted?: string; error?: string }>;
};

export default async function TestimonialsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="grid gap-6">
      <PageIntro
        kicker="Testimonials"
        title="Manage Testimonials"
        body="Showcase customer trust and reviews."
      />
      <AdminNotice saved={params.saved} deleted={params.deleted} error={params.error} />

      <form action={saveTestimonialAction} className="grid gap-5 rounded-lg border border-rsg-line bg-white p-6 shadow-sm">
        <h2 className="text-xl font-black text-rsg-ink">Add Testimonial</h2>
        <div className="grid gap-5 md:grid-cols-2">
          <TextInput name="customerName" label="Customer Name" />
          <TextInput name="companyName" label="Company Name" />
          <VisibilitySelect defaultValue="PRIVATE" />
        </div>
        <TextArea name="message" label="Message" />
        <div>
          <SaveButton label="Add Testimonial" />
        </div>
      </form>

      <div className="grid gap-4">
        {testimonials.map((t) => (
          <form key={t.id} action={saveTestimonialAction} className="grid gap-5 rounded-lg border border-rsg-line bg-white p-6 shadow-sm">
            <input type="hidden" name="id" value={t.id} />
            <div className="grid gap-5 md:grid-cols-2">
              <TextInput name="customerName" label="Customer Name" defaultValue={t.customerName} />
              <TextInput name="companyName" label="Company Name" defaultValue={t.companyName} />
              <VisibilitySelect defaultValue={t.visibility} />
            </div>
            <TextArea name="message" label="Message" defaultValue={t.message} />
            <div>
              <SaveButton label="Save Changes" />
            </div>
          </form>
        ))}
      </div>

      {testimonials.length ? (
        <div className="grid gap-3 rounded-lg border border-rsg-line bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black text-rsg-ink">Delete Testimonials</h2>
          {testimonials.map((t) => (
            <form key={t.id} action={deleteTestimonialAction} className="flex items-center justify-between gap-4 border-t border-rsg-line pt-3 first:border-t-0 first:pt-0">
              <input type="hidden" name="id" value={t.id} />
              <span className="font-bold text-rsg-charcoal">{t.customerName || "Untitled"}</span>
              <DeleteButton />
            </form>
          ))}
        </div>
      ) : null}
    </div>
  );
}
