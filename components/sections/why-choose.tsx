import { CheckCircle2, Globe2, MessageCircle, ShieldCheck } from "lucide-react";
import Container from "@/components/ui/container";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

const reasons = [
  {
    title: "Direct decision-maker access",
    body: "Industrial enquiries move faster when the first serious conversation reaches the director directly.",
    icon: MessageCircle,
  },
  {
    title: "Australia and India presence",
    body: "RSG is positioned for cross-market procurement, recovery, and export-linked opportunities.",
    icon: Globe2,
  },
  {
    title: "Discreet industrial handling",
    body: "Project details, commercial documents, and partner information should be handled carefully.",
    icon: ShieldCheck,
  },
  {
    title: "Useful first conversation",
    body: "Material type, location, quantity, timing, and photos help move quickly toward the right next step.",
    icon: CheckCircle2,
  },
];

export default function WhyChoose() {
  return (
    <section id="why-rsg" className="bg-rsg-navy py-20 text-white sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <Reveal tone="slide-right">
            <p className="rsg-section-kicker text-rsg-orange">Why RSG</p>
            <h2 className="mt-4 text-3xl font-black leading-tight text-white sm:text-5xl">
              Built for serious industrial conversations.
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/76">
              The goal is not to overload visitors. The goal is to make it easy
              for a genuine seller, buyer, contractor, or trading partner to
              understand the company and make contact.
            </p>
          </Reveal>

          <Stagger stagger={0.08} className="grid gap-4 md:grid-cols-2">
            {reasons.map((reason) => {
              const Icon = reason.icon;
              return (
                <StaggerItem
                  key={reason.title}
                  tone="card"
                  className="rounded-lg border border-white/14 bg-white/8 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-rsg-orange/45 hover:bg-white/10"
                >
                  <Icon className="text-rsg-orange" size={26} />
                  <h3 className="mt-5 text-xl font-black text-white">
                    {reason.title}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-white/72">
                    {reason.body}
                  </p>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </Container>
    </section>
  );
}
