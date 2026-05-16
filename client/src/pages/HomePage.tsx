import Container from "../components/layout/Container";
import HeroCarousel from "../components/home/HeroCarousel";
import CategoryStrip from "../components/home/CategoryStrip";
import FeaturedProducts from "../components/home/FeaturedProducts";
import BrandStory from "../components/home/BrandStory";
import CareGuidePreview from "../components/home/CareGuidePreview";


export default function HomePage() {
  return (
    <div className="bg-slate-950 py-10 md:py-12">
      <Container>
        <HeroCarousel />
        <CategoryStrip />
        <FeaturedProducts />
        <BrandStory />
        <CareGuidePreview />
      </Container>
    </div>
  );
}