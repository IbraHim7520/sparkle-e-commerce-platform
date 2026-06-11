import Collections from "@/components/LandingPage/Collections";
import Faq from "@/components/LandingPage/faq";
import { FeaturedProducts } from "@/components/LandingPage/FeaturedProduct";
import Hero from "@/components/LandingPage/Hero";
import { PromoBanner } from "@/components/LandingPage/PromoBanner";
import WhyChooseUs from "@/components/LandingPage/WhyChooseUs";

export default function Home() {
  return (
    <div className="space-y-10">
    <Hero />
    <Collections />
    <FeaturedProducts />
    <PromoBanner />
    <WhyChooseUs />
    <Faq />
    </div>
  );
}
