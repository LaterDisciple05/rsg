import { AdminNotice, DeleteButton, PageIntro, SaveButton, TextArea, TextInput, VisibilitySelect } from "../_components";
import { deleteTestimonialAction, saveTestimonialAction } from "../actions";
import { listTestimonials } from "@/lib/cms-db";

type PageProps = {
  searchParams: Promise<{ saved?: string; deleted?: string }>;
};

export default async function TestimonialsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const testimonials = listTestimonials();

  return (
    <div className="grid gap-6">
      <PageIntro
        kicker="Testimonials"
        title="Manage Testimonials"
        body="Store public and private testimonials. Only approved public testimonials should appear on the website later."
      />
      <AdminNotice saved={params.saved} deleted={params.deleted} />

      <form action={saveTestimonialAction} className="grid gap-5 rounded-lg border border-rsg-line bg-white p-6 shadow-sm">
        <h2 className="text-xl font-black text-rsg-ink">Add Testimonial</h2>
        <div className="grid gap-5 md:grid-cols-2">
          <TextInput name="customerName" label="Customer Name" />
          <TextInput name="companyName" label="Company Name" />
          <VisibilitySelect defaultValue="PRIVATE" />
        </div>
        <TextArea name="message" label="Message" rows={5} />
        <div>
          <SaveButton label="Add Testimonial" />
        </div>
      </form>

      <div className="grid gap-4">
        {testimonials.map((testimonial) => (
          <form key={testimonial.id} action={saveTestimonialAction} className="grid gap-5 rounded-lg border border-rsg-line bg-white p-6 shadow-sm">
            <input type="hidden" name="id" value={testimonial.id} />
            <div className="grid gap-5 md:grid-cols-2">
              <TextInput name="customerName" label="Customer Name" defaultValue={testimonial.customerName} />
              <TextInput name="companyName" label="Company Name" defaultValue={testimonial.companyName} />
              <VisibilitySelect defaultValue={testimonial.visibility} />
            </div>
            <TextArea name="message" label="Message" defaultValue={testimonial.message} rows={5} />
            <div>
              <SaveButton label="Save Changes" />
            </div>
          </form>
        ))}
      </div>

      {testimonials.length ? (
        <div className="grid gap-3 rounded-lg border border-rsg-line bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black text-rsg-ink">Delete Testimonials</h2>
          {testimonials.map((testimonial) => (
            <form key={testimonial.id} action={deleteTestimonialAction} className="flex items-center justify-between gap-4 border-t border-rsg-line pt-3 first:border-t-0 first:pt-0">
              <input type="hidden" name="id" value={testimonial.id} />
              <span className="font-bold text-rsg-charcoal">{testimonial.customerName || testimonial.companyName || "Untitled testimonial"}</span>
              <DeleteButton />
            </form>
          ))}
        </div>
      ) : null}
    </div>
  );
}
