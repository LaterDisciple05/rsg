import Link from "next/link";
import {
  ExternalLink,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import Container from "@/components/ui/container";
import { submitInquiryAction } from "@/app/actions";

const whatsappHref =
  "https://wa.me/61432753733?text=Hello%20Rising%20Sun%20Global%2C%20I%20would%20like%20to%20discuss%20scrap%20metal%20or%20metal%20recovery.";

const contactMethods = [
  {
    label: "WhatsApp",
    value: "+61 432 753 733",
    href: whatsappHref,
    icon: MessageCircle,
    external: true,
  },
  {
    label: "Call",
    value: "+61 432 753 733",
    href: "tel:+61432753733",
    icon: Phone,
  },
  {
    label: "Email",
    value: "risingsunglobal.au@gmail.com",
    href: "mailto:risingsunglobal.au@gmail.com",
    icon: Mail,
  },
  {
    label: "LinkedIn",
    value: "Rahul Shah",
    href: "https://www.linkedin.com/in/rahul-shah-707847147/",
    icon: ExternalLink,
    external: true,
  },
];

export default function ContactCta() {
  return (
    <section id="contact" className="bg-rsg-paper py-20 sm:py-24">
      <Container>
        <div className="rounded-lg border border-rsg-line bg-white p-6 shadow-sm sm:p-10 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="rsg-section-kicker">Contact Director</p>
              <h2 className="mt-4 text-3xl font-black leading-tight text-rsg-ink sm:text-5xl">
                Start with a direct business conversation.
              </h2>
              <p className="mt-5 text-lg leading-8 text-rsg-muted">
                Share the material type, location, expected quantity, and any
                project timing. RSG can then move the discussion toward quote,
                inspection, documents, or next steps.
              </p>
              <div className="mt-7 flex items-start gap-3 text-rsg-charcoal">
                <MapPin className="mt-1 shrink-0 text-rsg-orange" size={21} />
                <p className="text-base leading-7">
                  Adelaide, Australia. Serving Australia and India.
                </p>
              </div>
            </div>

            <div className="grid gap-5">
              <div className="grid gap-4 sm:grid-cols-2">
                {contactMethods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <Link
                      key={method.label}
                      href={method.href}
                      target={method.external ? "_blank" : undefined}
                      rel={method.external ? "noreferrer" : undefined}
                      className="rounded-lg border border-rsg-line bg-rsg-paper p-5 transition-colors hover:border-rsg-orange hover:bg-rsg-orange-soft"
                    >
                      <Icon className="text-rsg-navy" size={25} />
                      <p className="mt-5 text-sm font-bold uppercase text-rsg-orange-dark">
                        {method.label}
                      </p>
                      <p className="mt-2 break-words text-base font-black text-rsg-ink">
                        {method.value}
                      </p>
                    </Link>
                  );
                })}
              </div>

              <form
                action={submitInquiryAction}
                className="grid gap-4 rounded-lg border border-rsg-line bg-rsg-paper p-5"
              >
                <h3 className="text-xl font-black text-rsg-ink">
                  Send an enquiry
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    name="name"
                    placeholder="Name"
                    className="rounded-md border border-rsg-line px-4 py-3 text-sm outline-none focus:border-rsg-orange"
                  />
                  <input
                    name="company"
                    placeholder="Company"
                    className="rounded-md border border-rsg-line px-4 py-3 text-sm outline-none focus:border-rsg-orange"
                  />
                  <input
                    name="phone"
                    placeholder="Phone"
                    className="rounded-md border border-rsg-line px-4 py-3 text-sm outline-none focus:border-rsg-orange"
                  />
                  <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="rounded-md border border-rsg-line px-4 py-3 text-sm outline-none focus:border-rsg-orange"
                  />
                  <input
                    name="material"
                    placeholder="Material type"
                    className="rounded-md border border-rsg-line px-4 py-3 text-sm outline-none focus:border-rsg-orange"
                  />
                  <input
                    name="quantity"
                    placeholder="Approx quantity"
                    className="rounded-md border border-rsg-line px-4 py-3 text-sm outline-none focus:border-rsg-orange"
                  />
                </div>
                <input
                  name="country"
                  placeholder="Country / location"
                  className="rounded-md border border-rsg-line px-4 py-3 text-sm outline-none focus:border-rsg-orange"
                />
                <textarea
                  name="message"
                  placeholder="Message"
                  rows={4}
                  className="rounded-md border border-rsg-line px-4 py-3 text-sm leading-6 outline-none focus:border-rsg-orange"
                />
                <button
                  type="submit"
                  className="rounded-md bg-rsg-orange px-5 py-3 text-sm font-black text-white hover:bg-rsg-orange-dark"
                >
                  Send Enquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
