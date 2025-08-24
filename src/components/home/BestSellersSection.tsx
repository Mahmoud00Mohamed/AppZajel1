import React, { useRef, useEffect, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ChevronRight, ChevronLeft, Crown } from "lucide-react";
import { getBestSellers } from "../../data";
import { ProductImage } from "../../features/images";
import { useImagePreloader } from "../../features/images";

const BestSellersSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const bestSellers = React.useMemo(() => getBestSellers(), []);

  const bestSellerImages = React.useMemo(
    () => bestSellers.slice(0, 8).map((product) => product.imageUrl),
    [bestSellers]
  );
  useImagePreloader(bestSellerImages, { priority: true });

  const handle3dScrollEffect = useCallback(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    if (window.innerWidth >= 768) {
      (Array.from(scrollContainer.children) as HTMLElement[]).forEach(
        (card) => {
          card.style.transform = "";
        }
      );
      return;
    }

    const containerViewportCenter =
      scrollContainer.getBoundingClientRect().left +
      scrollContainer.offsetWidth / 2;

    (Array.from(scrollContainer.children) as HTMLElement[]).forEach((card) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const distance = cardCenter - containerViewportCenter;

      const maxDistance = scrollContainer.offsetWidth / 2;
      const ratio = Math.min(Math.max(distance / maxDistance, -1), 1);

      const scale = 1 - Math.abs(ratio) * 0.35;
      const rotateY = ratio * -35;

      card.style.transform = `scale(${scale}) rotateY(${rotateY}deg)`;
    });
  }, []);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer && window.innerWidth < 768) {
      const cardWidth = 160 + 12;
      const middleIndex = Math.floor(bestSellers.length / 2);
      const scrollPosition =
        middleIndex * cardWidth -
        scrollContainer.offsetWidth / 2 +
        cardWidth / 2;
      scrollContainer.scrollLeft = isRtl ? -scrollPosition : scrollPosition;
    }
  }, [isRtl, bestSellers.length]);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      handle3dScrollEffect();
      scrollContainer.addEventListener("scroll", handle3dScrollEffect, {
        passive: true,
      });
      window.addEventListener("resize", handle3dScrollEffect);
    }

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handle3dScrollEffect);
      }
      window.removeEventListener("resize", handle3dScrollEffect);
      window.removeEventListener("resize", handleResize);
    };
  }, [handle3dScrollEffect]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const cardWidth = window.innerWidth >= 768 ? 192 + 8 : 160 + 12;
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

  return (
    <section className="py-14 sm:py-18 bg-white">
      <div className="container-custom px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium text-purple-800 leading-tight">
            {t("home.bestSellers.title")}
          </h2>
          <p className="mt-2.5 text-sm sm:text-base max-w-xs sm:max-w-md md:max-w-lg mx-auto leading-relaxed">
            {isRtl
              ? "اكتشف أكثر منتجاتنا مبيعًا وشعبية."
              : "Discover our most popular and best-selling products."}
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
            className="flex overflow-x-auto gap-x-3 pb-4 snap-x snap-mandatory scroll-smooth px-[calc(50%-80px)] sm:px-[calc(50%-80px)] md:px-4 md:gap-x-2"
            style={{
              perspective: "1000px",
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: isMobile ? "none" : "thin",
              scrollbarColor: isMobile ? "transparent" : "#8A2BE2 transparent",
            }}
          >
            {bestSellers.map((product, index) => (
              <div
                key={product.id}
                className="flex-shrink-0 w-40 sm:w-40 md:w-48 snap-center touch-manipulation"
              >
                <Link to={`/product/${product.id}`}>
                  <div className="bg-white rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300 overflow-hidden group h-[220px] md:h-[260px] flex flex-col">
                    <div className="relative aspect-square overflow-hidden rounded-t-xl">
                      <ProductImage
                        src={product.imageUrl}
                        alt={
                          i18n.language === "ar"
                            ? product.nameAr
                            : product.nameEn
                        }
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        width={160}
                        height={160}
                        aspectRatio="square"
                        sizes="(max-width: 767px) 160px, 192px"
                        quality={80}
                        priority={index < 3}
                        showZoom={false}
                        placeholderSize={28}
                        fallbackSrc="https://images.pexels.com/photos/1058775/pexels-photo-1058775.jpeg?auto=compress&cs=tinysrgb&w=400"
                      />
                      <div className="absolute top-2 left-2 rtl:right-2 rtl:left-auto z-10">
                        <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white text-xs font-bold py-1 px-2 rounded-full flex items-center gap-1 shadow-sm">
                          <Crown size={12} />
                          {t("home.bestSellers.bestSeller")}
                        </div>
                      </div>
                    </div>
                    <div className="p-3 flex flex-col">
                      <h3 className="text-sm font-semibold text-gray-800 line-clamp-1 overflow-hidden text-ellipsis whitespace-nowrap mb-1">
                        {i18n.language === "ar"
                          ? product.nameAr
                          : product.nameEn}
                      </h3>
                      <p className="text-base font-bold text-purple-700">
                        {product.price} {i18n.language === "ar" ? "ر.س" : "SAR"}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(BestSellersSection);
