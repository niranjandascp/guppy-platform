import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";
import { getActiveBanners } from "../../features/admin/bannerApi";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export default function HeroCarousel() {
  const { data: banners = [] } = useQuery({
    queryKey: ["active-banners"],
    queryFn: getActiveBanners,
  });

  if (!banners.length) {
    return (
      <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(34,211,238,0.18),rgba(15,23,42,0.85),rgba(16,185,129,0.12))]">
        <div className="grid min-h-[520px] place-items-center px-6 py-16 text-center">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.4em] text-cyan-300/80">AquaCrest</p>
            <h1 className="mt-4 text-5xl font-semibold text-white md:text-6xl">
              Premium guppy genetics for modern aquarists
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              Discover rare guppy lines, cinematic product showcases, and a luxury aquatic shopping experience.
            </p>
            <Link to="/shop" className="mt-8 inline-block">
              <Button className="inline-flex items-center gap-2">
                Explore Collection <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="overflow-hidden rounded-[2rem] border border-white/10">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        autoplay={{ delay: 4500 }}
        pagination={{ clickable: true }}
        loop
        className="hero-swiper"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner._id}>
            <div className="relative min-h-[520px]">
              <img
                src={banner.image}
                alt={banner.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,23,0.88),rgba(2,6,23,0.55),rgba(2,6,23,0.2))]" />

              <div className="relative z-10 flex min-h-[520px] items-center px-6 py-16 md:px-12">
                <div className="max-w-3xl">
                  <p className="text-sm uppercase tracking-[0.4em] text-cyan-300/80">
                    Premium Collection
                  </p>
                  <h1 className="mt-4 text-5xl font-semibold text-white md:text-6xl">
                    {banner.title}
                  </h1>
                  <p className="mt-6 text-lg leading-8 text-slate-300">
                    {banner.subtitle}
                  </p>

                  {banner.ctaLink && banner.ctaText ? (
                    <Link to={banner.ctaLink} className="mt-8 inline-block">
                      <Button className="inline-flex items-center gap-2">
                        {banner.ctaText} <ArrowRight size={16} />
                      </Button>
                    </Link>
                  ) : null}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}