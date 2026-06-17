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
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

type CompanyContact = {
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  whatsapp?: string | null;
  linkedinUrl?: string | null;
  address?: string | null;
  city?: string | null;
  country?: string | null;
};

function phoneHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

function whatsappHref(phone: string, companyName: string) {
  const number = phone.replace(/[^\d]/g, "");
  const message = encodeURIComponent(
    `Hello ${companyName}, I would like to discuss scrap metal or metal recovery.`
  );

  return `https://wa.me/${number}?text=${message}`;
}

function contactLocation(company?: CompanyContact | null) {
  if (company?.address) return company.address;

  return [company?.city || "Adelaide", company?.country || "Australia"]
    .filter(Boolean)
    .join(", ");
}

export default function ContactCta({
  company,
}: {
  company?: CompanyContact | null;
}) {
  const companyName = company?.name || "Rising Sun Global";
  const phone = company?.phone || "+61 432 753 733";
  const whatsapp = company?.whatsapp || phone;
  const email = company?.email || "risingsunglobal.au@gmail.com";
  const linkedinUrl =
    company?.linkedinUrl ||
    "https://www.linkedin.com/in/rahul-shah-707847147/";

  const contactMethods = [
    {
      label: "WhatsApp",
      value: whatsapp,
      href: whatsappHref(whatsapp, companyName),
      icon: MessageCircle,
      external: true,
    },
    {
      label: "Call",
      value: phone,
      href: phoneHref(phone),
      icon: Phone,
    },
    {
      label: "Email",
      value: email,
      href: `mailto:${email}`,
      icon: Mail,
    },
    {
      label: "LinkedIn",
      value: "Rahul Shah",
      href: linkedinUrl,
      icon: ExternalLink,
      external: true,
    },
  ];

  return (
    <section id="contact" className="bg-rsg-paper py-20 sm:py-24">
      <Container>
        <Reveal tone="panel" className="rounded-lg border border-rsg-line bg-white p-6 shadow-sm sm:p-10 lg:p-12">
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
                  {contactLocation(company)}
                </p>
              </div>
            </div>

            <div className="grid gap-5">
              <Stagger stagger={0.075} className="grid gap-4 sm:grid-cols-2">
                {contactMethods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <StaggerItem
                      key={method.label}
                      tone="contact"
                      className="rounded-lg border border-rsg-line bg-rsg-paper transition-all duration-300 hover:-translate-y-1 hover:border-rsg-orange hover:bg-rsg-orange-soft"
                    >
                      <Link
                        href={method.href}
                        target={method.external ? "_blank" : undefined}
                        rel={method.external ? "noreferrer" : undefined}
                        className="block p-5"
                      >
                        <Icon className="text-rsg-navy" size={25} />
                        <p className="mt-5 text-sm font-bold uppercase text-rsg-orange-dark">
                          {method.label}
                        </p>
                        <p className="mt-2 break-words text-base font-black text-rsg-ink">
                          {method.value}
                        </p>
                      </Link>
                    </StaggerItem>
                  );
                })}
              </Stagger>

              <Reveal tone="scale" delay={0.14}>
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
              </Reveal>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
