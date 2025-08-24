import React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { Search, Filter, Grid, List, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import categories from "../data/categories.json";
import { allProducts, getProductsByCategory } from "../data";
import FavoriteButton from "../components/ui/FavoriteButton";
import AddToCartButton from "../components/ui/AddToCartButton";
import { ProductImage } from "../features/images";
import { useImagePreloader } from "../features/images";

const CategoryPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  const { slug } = useParams<{ slug: string }>();

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const filteredCategories = slug
    ? categories.filter((category) => category.id === slug)
    : categories;

  let filteredProducts = slug ? getProductsByCategory(slug) : allProducts;

  if (searchTerm) {
    filteredProducts = filteredProducts.filter((product) =>
      (isRtl ? product.nameAr : product.nameEn)
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }

  filteredProducts = filteredProducts.filter(
    (product) =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
  );

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

  // Preload visible product images
  const visibleProducts = React.useMemo(
    () => sortedProducts.slice(0, 12),
    [sortedProducts]
  );
  const productImages = React.useMemo(
    () => visibleProducts.map((product) => product.imageUrl),
    [visibleProducts]
  );
  useImagePreloader(productImages, { priority: false });

  if (slug && filteredCategories.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-8 bg-white rounded-3xl shadow-2xl max-w-md mx-4"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
            <Search size={40} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold mb-4 text-gray-800">
            {isRtl ? "الفئة غير موجودة" : "Category Not Found"}
          </h1>
          <p className="text-gray-600 mb-6">
            {isRtl
              ? "عذراً، الفئة المطلوبة غير متوفرة."
              : "Sorry, the requested category is not available."}
          </p>
          <Link to="/" className="btn btn-primary">
            {t("product.backToHome")}
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary/5">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-90"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative container-custom py-20">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              {slug
                ? t(`home.categories.items.${slug}`)
                : t("home.categories.title")}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
              {isRtl
                ? "اكتشف مجموعتنا المميزة من الهدايا الفاخرة"
                : "Discover our exclusive collection of premium gifts"}
            </p>
          </div>
        </div>
      </div>

      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="container-custom py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search
                size={20}
                className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder={t("header.search")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 rtl:pr-10 rtl:pl-4 pr-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>

            <div className="flex items-center gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="featured">{isRtl ? "مميز" : "Featured"}</option>
                <option value="price-low">
                  {isRtl ? "السعر: منخفض إلى مرتفع" : "Price: Low to High"}
                </option>
                <option value="price-high">
                  {isRtl ? "السعر: مرتفع إلى منخفض" : "Price: High to Low"}
                </option>
                <option value="name">{isRtl ? "الاسم" : "Name"}</option>
              </select>

              <div className="flex bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === "grid"
                      ? "bg-white shadow-sm text-primary"
                      : "text-gray-500"
                  }`}
                >
                  <Grid size={18} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === "list"
                      ? "bg-white shadow-sm text-primary"
                      : "text-gray-500"
                  }`}
                >
                  <List size={18} />
                </button>
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary-dark transition-all"
              >
                <Filter size={18} />
                {isRtl ? "فلتر" : "Filter"}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 p-4 bg-gray-50 rounded-2xl"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {isRtl ? "نطاق السعر" : "Price Range"}
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={priceRange[0]}
                        onChange={(e) =>
                          setPriceRange([
                            parseInt(e.target.value) || 0,
                            priceRange[1],
                          ])
                        }
                        className="w-20 px-2 py-1 border border-gray-300 rounded-lg text-sm"
                        placeholder="0"
                      />
                      <span className="text-gray-500">-</span>
                      <input
                        type="number"
                        value={priceRange[1]}
                        onChange={(e) =>
                          setPriceRange([
                            priceRange[0],
                            parseInt(e.target.value) || 1000,
                          ])
                        }
                        className="w-20 px-2 py-1 border border-gray-300 rounded-lg text-sm"
                        placeholder="1000"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="container-custom py-8">
        {!slug && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              {isRtl ? "تصفح الفئات" : "Browse Categories"}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {filteredCategories.map((category, index) => (
                <div key={category.id}>
                  <Link to={`/category/${category.id}`} className="group block">
                    <div className="relative aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 to-secondary/10 shadow-lg hover:shadow-2xl transition-all duration-500">
                      <ProductImage
                        src={category.imageUrl}
                        alt={t(category.nameKey)}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        width={200}
                        height={200}
                        aspectRatio="square"
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 16.66vw, 200px"
                        quality={85}
                        priority={index < 6}
                        showZoom={false}
                        placeholderSize={24}
                        fallbackSrc="https://images.pexels.com/photos/1058775/pexels-photo-1058775.jpeg?auto=compress&cs=tinysrgb&w=400"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-white font-bold text-center text-sm md:text-base drop-shadow-lg">
                          {t(category.nameKey)}
                        </h3>
                      </div>
                      <div className="absolute top-2 right-2 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Eye size={16} className="text-white" />
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">
            {isRtl ? "المنتجات" : "Products"}
            <span className="text-primary ml-2">({sortedProducts.length})</span>
          </h2>
        </div>

        <AnimatePresence mode="wait">
          {viewMode === "grid" ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            >
              {sortedProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <ProductImage
                      src={product.imageUrl}
                      alt={isRtl ? product.nameAr : product.nameEn}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      width={320}
                      height={240}
                      aspectRatio="landscape"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      quality={80}
                      priority={index < 8}
                      showZoom={false}
                      placeholderSize={28}
                      fallbackSrc="https://images.pexels.com/photos/1058775/pexels-photo-1058775.jpeg?auto=compress&cs=tinysrgb&w=400"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-3 left-3 rtl:right-3 rtl:left-auto flex flex-col gap-2">
                      {product.isBestSeller && (
                        <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold py-1 px-3 rounded-full flex items-center gap-1">
                          {t("home.bestSellers.bestSeller")}
                        </div>
                      )}
                      {product.isSpecialGift && (
                        <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold py-1 px-3 rounded-full">
                          {t("home.featuredCollections.specialGift")}
                        </div>
                      )}
                    </div>
                    <div className="absolute top-3 right-3 rtl:left-3 rtl:right-auto flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                      <FavoriteButton
                        product={product}
                        className="w-10 h-10 rounded-full backdrop-blur-sm border border-white/20 shadow-lg"
                        size={16}
                      />
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <div className="flex gap-2">
                        <AddToCartButton
                          product={product}
                          variant="primary"
                          size="sm"
                          className="flex-1"
                          showLabel={false}
                        />
                        <Link
                          to={`/product/${product.id}`}
                          className="bg-white/90 backdrop-blur-sm text-gray-800 py-2 px-4 rounded-xl font-medium text-center hover:bg-white transition-all duration-300 shadow-lg"
                        >
                          {isRtl ? "عرض" : "View"}
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <Link to={`/product/${product.id}`} className="block">
                      <h3 className="font-bold text-gray-800 hover:text-primary transition-colors line-clamp-2 mb-2">
                        {isRtl ? product.nameAr : product.nameEn}
                      </h3>
                    </Link>
                    <div className="flex items-center justify-between">
                      <p className="text-xl font-bold text-primary">
                        {product.price} {isRtl ? "ر.س" : "SAR"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {sortedProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="flex">
                    <div className="w-32 h-32 flex-shrink-0">
                      <ProductImage
                        src={product.imageUrl}
                        alt={isRtl ? product.nameAr : product.nameEn}
                        className="w-full h-full object-cover"
                        width={128}
                        height={128}
                        aspectRatio="square"
                        sizes="128px"
                        quality={80}
                        priority={index < 4}
                        showZoom={false}
                        placeholderSize={24}
                        fallbackSrc="https://images.pexels.com/photos/1058775/pexels-photo-1058775.jpeg?auto=compress&cs=tinysrgb&w=400"
                      />
                    </div>
                    <div className="flex-1 p-4 flex items-center justify-between">
                      <div>
                        <Link to={`/product/${product.id}`}>
                          <h3 className="font-bold text-gray-800 hover:text-primary transition-colors mb-1">
                            {isRtl ? product.nameAr : product.nameEn}
                          </h3>
                        </Link>
                        <p className="text-primary font-bold text-lg">
                          {product.price} {isRtl ? "ر.س" : "SAR"}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          {product.isBestSeller && (
                            <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">
                              {t("home.bestSellers.bestSeller")}
                            </span>
                          )}
                          {product.isSpecialGift && (
                            <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                              {t("home.featuredCollections.specialGift")}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <FavoriteButton
                          product={product}
                          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                          size={18}
                        />
                        <AddToCartButton
                          product={product}
                          variant="primary"
                          size="sm"
                          showLabel={false}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {sortedProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search size={40} className="text-gray-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {isRtl ? "لا توجد منتجات" : "No Products Found"}
            </h3>
            <p className="text-gray-600 mb-6">
              {isRtl
                ? "لا توجد منتجات متاحة لهذه الفئة أو البحث."
                : "No products available for this category or search."}
            </p>
            <Link to="/categories" className="btn btn-primary">
              {t("home.categories.title")}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
