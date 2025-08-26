import React, { useRef, useEffect, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ChevronRight, ChevronLeft } from "lucide-react";
import categoriesData from "../../data/categories.json";
import { ProductImage } from "../../features/images";
import { useImagePreloader } from "../../features/images";

interface Category {
  id: string;
  nameKey: string;
  imageUrl: string;
}

const categories: Category[] = categoriesData;

const CategoriesSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const categoryImages = useMemo(
    () => categories.slice(0, 8).map((category) => category.imageUrl),
    []
  );
  useImagePreloader(categoryImages, { priority: true });

  // For mobile marquee effect, we need to duplicate the items
  const displayCategories = useMemo(() => {
    if (isMobile) {
      return [...categories, ...categories];
    }
    return categories;
  }, [isMobile]);

  // Animation duration calculated based on the number of items for consistent speed
  const animationDuration = `${categories.length * 5}s`;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      // Desktop scrolling remains unchanged
      const cardWidth = 192 + 8;
      scrollRef.current.scrollBy({
        left: isRtl
          ? direction === "left"
            ? cardWidth
            : -cardWidth
          : direction === "left"
          ? -cardWidth
          : cardWidth,
        behavior: "smooth",
      });
    }
  };

  const prevDirection = isRtl ? "right" : "left";
  const nextDirection = isRtl ? "left" : "right";

  const marqueeKeyframes = `
    @keyframes marquee-ltr {
      from { transform: translateX(0%); }
      to { transform: translateX(-50%); }
    }
    @keyframes marquee-rtl {
      from { transform: translateX(0%); }
      to { transform: translateX(50%); }
    }
  `;

  return (
    <section className="py-0 bg-white">
      <style>{marqueeKeyframes}</style>
      <div className="container-custom px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium text-purple-800 leading-tight">
            {t("home.categories.title")}
          </h2>
          <p className="mt-2.5 text-sm sm:text-base max-w-xs sm:max-w-md md:max-w-lg mx-auto leading-relaxed">
            {isRtl
              ? "استكشف مجموعتنا المتنوعة من الهدايا حسب الفئة."
              : "Explore our diverse collection of gifts by category."}
          </p>
        </div>

        <div className="relative">
          <button
            onClick={() => scroll(prevDirection)}
            className="hidden md:flex items-center justify-center absolute top-[40%] -translate-y-1/2 bg-white/90 text-stone-600 rounded-full w-9 h-9 shadow ring-1 ring-stone-200 z-10 -left-8"
            aria-label={t("common.scrollLeft")}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scroll(nextDirection)}
            className="hidden md:flex items-center justify-center absolute top-[40%] -translate-y-1/2 bg-white/90 text-stone-600 rounded-full w-9 h-9 shadow ring-1 ring-stone-200 z-10 -right-8"
            aria-label={t("common.scrollRight")}
          >
            <ChevronRight size={18} />
          </button>

          <div
            ref={scrollRef}
            className={`
              ${
                isMobile
                  ? "overflow-hidden"
                  : "flex overflow-x-auto gap-x-2 pb-4 scroll-smooth md:px-4"
              }
            `}
            // Add a gradient mask for mobile for a fade-out effect
            style={
              isMobile
                ? {
                    maskImage:
                      "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
                    WebkitMaskImage:
                      "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
                  }
                : {}
            }
          >
            <div
              className={`
                ${isMobile ? "flex group" : "contents"}
              `}
              style={
                isMobile
                  ? {
                      width: `${categories.length * 2 * 10}rem`, // 2x items * 10rem width per item (w-40)
                      animation: `${
                        isRtl ? "marquee-rtl" : "marquee-ltr"
                      } ${animationDuration} linear infinite`,
                    }
                  : {}
              }
            >
              {displayCategories.map((category: Category, index) => (
                <div
                  key={`${category.id}-${index}`}
                  className="flex-shrink-0 w-40 sm:w-40 md:w-48 touch-manipulation px-2 md:px-0 group-hover:[animation-play-state:paused]"
                  style={isMobile ? {} : { flex: "0 0 auto" }}
                >
                  <Link to={`/category/${category.id}`}>
                    <div className="bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-[box-shadow,border-color] duration-300 overflow-hidden group">
                      <div className="relative aspect-square overflow-hidden rounded-t-xl">
                        <ProductImage
                          src={category.imageUrl}
                          alt={t(category.nameKey)}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2"
                          width={160}
                          height={160}
                          aspectRatio="square"
                          sizes="(max-width: 767px) 160px, 192px"
                          quality={100}
                          priority={index < 3}
                          showZoom={false}
                          placeholderSize={28}
                          fallbackSrc="https://images.pexels.com/photos/1058775/pexels-photo-1058775.jpeg?auto=compress&cs=tinysrgb&w=400"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-center p-4 transition-opacity duration-300 group-hover:opacity-90">
                          <h3 className="text-base font-semibold text-white text-center transform transition-transform duration-300 group-hover:-translate-y-1">
                            {t(category.nameKey)}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(CategoriesSection);
