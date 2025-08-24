import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import {
  Heart,
  ShoppingCart,
  Calendar,
  Gift,
  Sparkles,
  Clock,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { allProducts, getProductsByOccasion } from "../data";
import occasions from "../data/occasions.json";
import { useCart } from "../context/CartContext";
import { ProductImage } from "../features/images";

interface Product {
  id: number;
  nameEn: string;
  nameAr: string;
  price: number;
  imageUrl: string;
  occasionId: string;
  isBestSeller?: boolean;
  isSpecialGift?: boolean;
}

const toCamelCase = (str: string) => {
  return str
    .split("-")
    .map((word, index) =>
      index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join("");
};

const OccasionsPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  const { slug } = useParams<{ slug: string }>();
  const { addToCart } = useCart();

  const [favorites, setFavorites] = useState<number[]>([]);
  const [hoveredOccasion, setHoveredOccasion] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("featured");

  const filteredProducts = slug ? getProductsByOccasion(slug) : allProducts;

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name":
        return isRtl
          ? a.nameAr.localeCompare(b.nameAr)
          : a.nameEn.localeCompare(b.nameEn);
      default:
        return b.isBestSeller ? 1 : -1;
    }
  });

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      nameEn: product.nameEn,
      nameAr: product.nameAr,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: 1,
    });
  };

  const filteredOccasions = slug
    ? occasions.filter((occasion) => occasion.id === slug)
    : occasions;

  if (slug && filteredOccasions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-8 bg-white rounded-3xl shadow-2xl max-w-md mx-4"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
            <Calendar size={40} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold mb-4 text-gray-800">
            {isRtl ? "المناسبة غير موجودة" : "Occasion Not Found"}
          </h1>
          <p className="text-gray-600 mb-6">
            {isRtl
              ? "عذراً، المناسبة المطلوبة غير متوفرة."
              : "Sorry, the requested occasion is not available."}
          </p>
          <Link to="/" className="btn btn-primary">
            {t("product.backToHome")}
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 opacity-90"></div>
          <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
          <div
            className="absolute top-40 right-20 w-32 h-32 bg-white/5 rounded-full animate-float"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-20 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-float"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute top-1/2 right-10 w-24 h-24 bg-white/5 rounded-full animate-float"
            style={{ animationDelay: "0.5s" }}
          ></div>
        </div>

        <div className="relative container-custom py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6"
            >
              <Gift size={40} className="text-white" />
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              {slug
                ? t(`home.occasions.items.${toCamelCase(slug)}`)
                : t("home.occasions.title")}
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-8"
            >
              {isRtl
                ? "اجعل كل مناسبة لا تُنسى مع هدايانا المميزة"
                : "Make every occasion unforgettable with our special gifts"}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex justify-center gap-8 text-white/90"
            >
              <div className="text-center">
                <div className="text-2xl font-bold">{occasions.length}+</div>
                <div className="text-sm">{isRtl ? "مناسبة" : "Occasions"}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{allProducts.length}+</div>
                <div className="text-sm">{isRtl ? "هدية" : "Gifts"}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-sm">{isRtl ? "توصيل" : "Delivery"}</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="container-custom py-12">
        {!slug && (
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                {isRtl ? "اختر مناسبتك" : "Choose Your Occasion"}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {isRtl
                  ? "اكتشف مجموعتنا المتنوعة من الهدايا المصممة خصيصاً لكل مناسبة مميزة"
                  : "Discover our diverse collection of gifts specially designed for every special occasion"}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {filteredOccasions.map((occasion, index) => (
                <motion.div
                  key={occasion.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  onHoverStart={() => setHoveredOccasion(occasion.id)}
                  onHoverEnd={() => setHoveredOccasion(null)}
                >
                  <Link to={`/occasion/${occasion.id}`} className="group block">
                    <div className="relative aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-white to-gray-50 shadow-lg hover:shadow-2xl transition-all duration-500">
                      <ProductImage
                        src={occasion.imageUrl}
                        alt={t(occasion.nameKey)}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        width={200}
                        height={200}
                        aspectRatio="square"
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 200px"
                        quality={85}
                        priority={index < 6}
                        showZoom={false}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <AnimatePresence>
                        {hoveredOccasion === occasion.id && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0"
                          >
                            {[...Array(6)].map((_, i) => (
                              <motion.div
                                key={i}
                                initial={{ scale: 0, rotate: 0 }}
                                animate={{
                                  scale: [0, 1, 0],
                                  rotate: [0, 180, 360],
                                  x: [0, Math.random() * 100 - 50],
                                  y: [0, Math.random() * 100 - 50],
                                }}
                                transition={{
                                  duration: 2,
                                  delay: i * 0.2,
                                  repeat: Infinity,
                                  repeatDelay: 1,
                                }}
                                className="absolute top-1/2 left-1/2 w-2 h-2"
                              >
                                <Sparkles size={8} className="text-white" />
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-white font-bold text-center text-sm md:text-base drop-shadow-lg">
                          {t(occasion.nameKey)}
                        </h3>
                      </div>
                      <div className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <Calendar size={16} className="text-white" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {(slug || !slug) && (
          <div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  {slug
                    ? isRtl
                      ? "هدايا المناسبة"
                      : "Occasion Gifts"
                    : isRtl
                    ? "جميع الهدايا"
                    : "All Gifts"}
                  <span className="text-primary ml-2">
                    ({sortedProducts.length})
                  </span>
                </h2>
                <p className="text-gray-600">
                  {isRtl
                    ? "اختر الهدية المثالية لمناسبتك الخاصة"
                    : "Choose the perfect gift for your special occasion"}
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-white shadow-sm"
                >
                  <option value="featured">
                    {isRtl ? "مميز" : "Featured"}
                  </option>
                  <option value="price-low">
                    {isRtl ? "السعر: منخفض إلى مرتفع" : "Price: Low to High"}
                  </option>
                  <option value="price-high">
                    {isRtl ? "السعر: مرتفع إلى منخفض" : "Price: High to Low"}
                  </option>
                  <option value="name">{isRtl ? "الاسم" : "Name"}</option>
                </select>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {sortedProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <ProductImage
                      src={product.imageUrl}
                      alt={isRtl ? product.nameAr : product.nameEn}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      width={300}
                      height={300}
                      aspectRatio="square"
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 300px"
                      quality={85}
                      priority={index < 8}
                      showZoom={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-3 left-3 rtl:right-3 rtl:left-auto flex flex-col gap-2">
                      {product.isBestSeller && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold py-1 px-3 rounded-full flex items-center gap-1 shadow-lg"
                        >
                          {t("home.bestSellers.bestSeller")}
                        </motion.div>
                      )}
                      {product.isSpecialGift && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.1 }}
                          className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold py-1 px-3 rounded-full shadow-lg"
                        >
                          {t("home.featuredCollections.specialGift")}
                        </motion.div>
                      )}
                    </div>
                    <div className="absolute top-3 right-3 rtl:left-3 rtl:right-auto flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                      <button
                        onClick={() => toggleFavorite(product.id)}
                        className={`w-10 h-10 rounded-full backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-300 shadow-lg ${
                          favorites.includes(product.id)
                            ? "bg-red-500 text-white"
                            : "bg-white/20 text-white hover:bg-white hover:text-red-500"
                        }`}
                      >
                        <Heart
                          size={16}
                          fill={
                            favorites.includes(product.id)
                              ? "currentColor"
                              : "none"
                          }
                        />
                      </button>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="w-10 h-10 bg-primary text-white rounded-full backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-primary-dark transition-all duration-300 shadow-lg"
                      >
                        <ShoppingCart size={16} />
                      </button>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <Link
                        to={`/product/${product.id}`}
                        className="w-full bg-white/90 backdrop-blur-sm text-gray-800 py-2 px-4 rounded-xl font-medium text-center block hover:bg-white transition-all duration-300 shadow-lg"
                      >
                        {isRtl ? "عرض سريع" : "Quick View"}
                      </Link>
                    </div>
                  </div>
                  <div className="p-5">
                    <Link to={`/product/${product.id}`} className="block">
                      <h3 className="font-bold text-gray-800 hover:text-primary transition-colors line-clamp-2 mb-3 text-lg">
                        {isRtl ? product.nameAr : product.nameEn}
                      </h3>
                    </Link>
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-2xl font-bold text-primary">
                        {product.price} {isRtl ? "ر.س" : "SAR"}
                      </p>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock
                        size={12}
                        className={`${isRtl ? "ml-1" : "mr-1"}`}
                      />
                      {isRtl ? "توصيل سريع متاح" : "Fast delivery available"}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
            {sortedProducts.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Gift size={40} className="text-gray-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {isRtl ? "لا توجد هدايا" : "No Gifts Found"}
                </h3>
                <p className="text-gray-600 mb-6">
                  {isRtl
                    ? "لا توجد هدايا متاحة لهذه المناسبة حالياً."
                    : "No gifts available for this occasion at the moment."}
                </p>
                <Link to="/categories" className="btn btn-primary">
                  {t("home.categories.title")}
                </Link>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OccasionsPage;
