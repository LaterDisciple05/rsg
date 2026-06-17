import { Quote, ShieldCheck, UserCheck } from "lucide-react";
import Container from "@/components/ui/container";
import TestimonialSlider from "./testimonial-slider";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

type PublicTestimonial = {
  id: string;
  customerName?: string | null;
  companyName?: string | null;
  message?: string | null;
};

const trustItems = [
  {
    title: "Customer words need consent",
    body: "Testimonials should be public only when the customer is comfortable being represented.",
    icon: Quote,
  },
  {
    title: "Private feedback stays private",
    body: "Not every business relationship needs to become public proof. Discretion is part of trust.",
    icon: ShieldCheck,
  },
  {
    title: "Director access builds trust",
    body: "For a high-value industrial business, direct access is stronger than anonymous automation.",
    icon: UserCheck,
  },
];

export default function Testimonials({
  testimonials = [],
}: {
  testimonials?: PublicTestimonial[];
}) {
  return (
    <section id="testimonials" className="bg-white py-20 sm:py-24">
      <Container>
        <Reveal tone="scale" className="max-w-3xl">
          <p className="rsg-section-kicker">Trust Standard</p>
          <h2 className="mt-4 text-3xl font-black leading-tight text-rsg-ink sm:text-5xl">
            Trust should be earned, not invented.
          </h2>
          <p className="mt-5 text-lg leading-8 text-rsg-muted">
            RSG should publish customer voices only when they are real,
            approved, and aligned with the professionalism expected in
            industrial business.
          </p>
        </Reveal>

        {testimonials.length ? (
          <Reveal tone="slide-left" delay={0.12}>
            <TestimonialSlider testimonials={testimonials} />
          </Reveal>
        ) : (
          <Stagger stagger={0.1} className="mt-12 grid gap-5 md:grid-cols-3">
            {trustItems.map((item) => {
              const Icon = item.icon;
              return (
                <StaggerItem
                  key={item.title}
                  tone="scale"
                  className="rounded-lg border border-rsg-line bg-rsg-paper p-6"
                >
                  <Icon className="text-rsg-orange-dark" size={26} />
                  <h3 className="mt-5 text-xl font-black text-rsg-ink">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-rsg-muted">
                    {item.body}
                  </p>
                </StaggerItem>
              );
            })}
          </Stagger>
        )}
      </Container>
    </section>
  );
}
