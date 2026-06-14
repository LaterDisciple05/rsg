import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import About from "@/components/sections/about";
import ContactCta from "@/components/sections/contact-cta";
import Hero from "@/components/sections/hero";
import Materials from "@/components/sections/materials";
import Services from "@/components/sections/services";
import TrustStrip from "@/components/sections/trust-strip";
import WhyChoose from "@/components/sections/why-choose";

const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Rising Sun Global",
  url: "https://risingsunglobal.com",
  logo: "https://risingsunglobal.com/rsg_logo2.png",
  email: "risingsunglobal.au@gmail.com",
  telephone: "+61432753733",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Adelaide",
    addressCountry: "AU",
  },
  areaServed: ["Australia", "India"],
  sameAs: ["https://www.linkedin.com/in/rahul-shah-707847147/"],
  knowsAbout: [
    "Scrap metal purchasing",
    "Industrial demolition",
    "Metal recovery",
    "Industrial recycling",
    "Scrap metal export",
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(businessJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <About />
        <Services />
        <Materials />
        <WhyChoose />
        <ContactCta />
      </main>
      <Footer />
    </>
  );
}
