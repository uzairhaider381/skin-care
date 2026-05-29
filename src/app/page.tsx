import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutDoctor from "@/components/AboutDoctor";
import Services from "@/components/Services";
import BeforeAfter from "@/components/BeforeAfter";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <AboutDoctor />
      <Services />
      <BeforeAfter />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}