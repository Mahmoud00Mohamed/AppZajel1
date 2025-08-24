import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  Heart,
  ShoppingCart,
  Trash2,
  Sparkles,
  Grid,
  List,
  Search,
  Crown,
  Calendar,
  Eye,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { allProducts } from "../data/index";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";
import { ProductImage } from "../features/images";
import { useImagePreloader } from "../features/images";
import AddToCartButton from "../components/ui/AddToCartButton";
import FavoriteButton from "../components/ui/FavoriteButton";

interface FavoriteItem {
  id: number;
  nameEn: string;
  nameAr: string;
  price: number;
  imageUrl: string;
  categoryId?: string;
  occasionId?: string;
  isBestSeller?: boolean;
  isSpecialGift?: boolean;
  dateAdded: string;
}

const FavoritesPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  const { addToCart } = useCart();
  const { favorites, removeFromFavorites, clearFavorites, favoritesCount } =
    useFavorites();

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("recent");
  const [filterBy, setFilterBy] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  // تصفية وترتيب المفضلة
  const filteredFavorites = favorites
    .filter((item) => {
      const matchesSearch =
        searchTerm === "" ||
        (isRtl ? item.nameAr : item.nameEn)
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesFilter =
        filterBy === "all" ||
        (filterBy === "bestseller" && item.isBestSeller) ||
        (filterBy === "special" && item.isSpecialGift) ||
        (filterBy === "recent" &&
          new Date(item.dateAdded) >
            new Date(Date.now() - 1000 * 60 * 60 * 24));

      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name":
          return isRtl
            ? a.nameAr.localeCompare(b.nameAr)
            : a.nameEn.localeCompare(b.nameEn);
        case "recent":
        default:
          return (
            new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
          );
      }
    });

  // Preload favorite images
  const favoriteImages = React.useMemo(
    () => filteredFavorites.slice(0, 12).map((item) => item.imageUrl),
    [filteredFavorites]
  );
  useImagePreloader(favoriteImages, { priority: false });

  const handleAddToCart = (product: FavoriteItem) => {
    try {
      addToCart({
        id: product.id,
        nameEn: product.nameEn,
        nameAr: product.nameAr,
        price: product.price,
        imageUrl: product.imageUrl,
        quantity: 1,
      });
    } catch (error) {
      console.error("خطأ في إضافة المنتج إلى عربة التسوق:", error);
    }
  };

  const toggleSelectItem = (productId: number) => {
    setSelectedItems((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const selectAllItems = () => {
    setSelectedItems(filteredFavorites.map((item) => item.id));
  };

  const clearSelection = () => {
    setSelectedItems([]);
  };

  const removeSelectedItems = () => {
    selectedItems.forEach((id) => {
      removeFromFavorites(id);
    });
    setSelectedItems([]);
  };

  const addSelectedToCart = () => {
    selectedItems.forEach((id) => {
      const item = favorites.find((fav) => fav.id === id);
      if (item) {
        handleAddToCart(item);
      }
    });
    setSelectedItems([]);
  };

  const filterOptions = [
    { value: "all", label: isRtl ? "الكل" : "All", icon: Heart },
    { value: "recent", label: isRtl ? "الأحدث" : "Recent", icon: Calendar },
    {
      value: "bestseller",
      label: isRtl ? "الأكثر مبيعاً" : "Best Sellers",
      icon: Sparkles,
    },
    {
      value: "special",
      label: isRtl ? "هدايا مميزة" : "Special Gifts",
      icon: Crown,
    },
  ];

  // منتجات مقترحة (فقط إذا كانت المفضلة فارغة)
  const suggestedProducts = allProducts
    .filter((product) => !favorites.some((fav) => fav.id === product.id))
    .slice(0, 8);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
        {/* Animated Background */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 1, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <motion.div
            className="text-center text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Heart className="w-10 h-10 text-white" fill="currentColor" />
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t("favorites.title")}
            </h1>
            <p className="text-xl text-white/90 mb-6">
              {t("favorites.description")}
            </p>

            <div className="flex justify-center items-center space-x-8 rtl:space-x-reverse text-white/90">
              <div className="text-center">
                <div className="text-3xl font-bold">{favoritesCount}</div>
                <div className="text-sm">{isRtl ? "عنصر" : "Items"}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">
                  {favorites.reduce((sum, item) => sum + item.price, 0)}
                </div>
                <div className="text-sm">
                  {isRtl ? "ر.س إجمالي" : "SAR Total"}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {favorites.length === 0 ? (
          // Empty State
          <div className="text-center py-20">
            <motion.div
              className="w-32 h-32 bg-gradient-to-r from-pink-200 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-8"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Heart size={48} className="text-pink-500" />
            </motion.div>

            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              {t("favorites.empty")}
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto text-lg">
              {isRtl
                ? "ابدأ في إضافة المنتجات المفضلة لديك لتجدها هنا بسهولة"
                : "Start adding your favorite products to find them here easily"}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                to="/categories"
                className="btn btn-primary px-8 py-4 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all"
              >
                <ShoppingCart size={20} className="mr-2 rtl:ml-2 rtl:mr-0" />
                {t("favorites.startShopping")}
              </Link>
              <Link
                to="/special-gifts"
                className="btn btn-secondary px-8 py-4 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all"
              >
                <Sparkles size={20} className="mr-2 rtl:ml-2 rtl:mr-0" />
                {isRtl ? "الهدايا المميزة" : "Special Gifts"}
              </Link>
            </div>

            {/* Suggested Products - نفس آلية ProductsPage */}
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
                {t("favorites.recommendations")}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {suggestedProducts.slice(0, 6).map((product) => (
                  <div
                    key={product.id}
                    className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
                  >
                    <div className="relative aspect-square overflow-hidden">
                      <ProductImage
                        src={product.imageUrl}
                        alt={isRtl ? product.nameAr : product.nameEn}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        width={160}
                        height={160}
                        aspectRatio="square"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 160px"
                        quality={75}
                        priority={false}
                        showZoom={false}
                        placeholderSize={24}
                        fallbackSrc="https://images.pexels.com/photos/1058775/pexels-photo-1058775.jpeg?auto=compress&cs=tinysrgb&w=400"
                      />
                      <div className="absolute top-2 right-2 rtl:left-2 rtl:right-auto opacity-0 group-hover:opacity-100 transition-opacity">
                        <FavoriteButton
                          product={product}
                          className="w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full shadow-md"
                          size={12}
                        />
                      </div>
                    </div>
                    <div className="p-3">
                      <Link to={`/product/${product.id}`}>
                        <h3 className="font-medium text-gray-800 text-xs line-clamp-2 mb-2 hover:text-primary transition-colors min-h-[2rem]">
                          {isRtl ? product.nameAr : product.nameEn}
                        </h3>
                      </Link>
                      <div className="flex items-center justify-between">
                        <p className="text-primary font-bold text-sm">
                          {product.price} {isRtl ? "ر.س" : "SAR"}
                        </p>
                        <AddToCartButton
                          product={product}
                          variant="icon"
                          size="sm"
                          showLabel={false}
                          className="w-6 h-6 text-xs"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          // Favorites Content
          <>
            {/* Filters and Controls */}
            <motion.div
              className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-6 mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Search
                    size={20}
                    className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    placeholder={
                      isRtl ? "ابحث في المفضلة..." : "Search favorites..."
                    }
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 rtl:pr-10 rtl:pl-4 pr-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all"
                  />
                </div>

                {/* Filter Buttons */}
                <div className="flex flex-wrap gap-3">
                  {filterOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                      <button
                        key={option.value}
                        onClick={() => setFilterBy(option.value)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                          filterBy === option.value
                            ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        <Icon size={16} />
                        <span className="font-medium text-sm">
                          {option.label}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Sort and View Controls */}
                <div className="flex items-center gap-4">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 bg-white"
                  >
                    <option value="recent">
                      {isRtl ? "الأحدث" : "Recent"}
                    </option>
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
                          ? "bg-white shadow-sm text-pink-500"
                          : "text-gray-500"
                      }`}
                    >
                      <Grid size={18} />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 rounded-lg transition-all ${
                        viewMode === "list"
                          ? "bg-white shadow-sm text-pink-500"
                          : "text-gray-500"
                      }`}
                    >
                      <List size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Bulk Actions */}
              <AnimatePresence>
                {selectedItems.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 pt-6 border-t border-gray-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-gray-600 font-medium">
                          {selectedItems.length}{" "}
                          {isRtl ? "عنصر محدد" : "items selected"}
                        </span>
                        <button
                          onClick={clearSelection}
                          className="text-gray-500 hover:text-gray-700 font-medium text-sm"
                        >
                          {isRtl ? "إلغاء التحديد" : "Clear selection"}
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={addSelectedToCart}
                          className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
                        >
                          <ShoppingCart size={16} />
                          {isRtl ? "أضف للسلة" : "Add to Cart"}
                        </button>
                        <button
                          onClick={removeSelectedItems}
                          className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:from-red-600 hover:to-pink-600 transition-all shadow-lg"
                        >
                          <Trash2 size={16} />
                          {isRtl ? "حذف" : "Remove"}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Favorites List */}
            {filteredFavorites.length > 0 && (
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <button
                    onClick={selectAllItems}
                    className="text-pink-600 hover:text-pink-700 font-semibold"
                  >
                    {isRtl ? "تحديد الكل" : "Select All"}
                  </button>
                  <span className="text-gray-500">
                    {filteredFavorites.length} {isRtl ? "عنصر" : "items"}
                  </span>
                </div>
                <button
                  onClick={clearFavorites}
                  className="text-red-500 hover:text-red-600 font-semibold flex items-center gap-2"
                >
                  <Trash2 size={16} />
                  {isRtl ? "مسح الكل" : "Clear All"}
                </button>
              </div>
            )}

            <AnimatePresence mode="wait">
              {viewMode === "grid" ? (
                <motion.div
                  key="grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
                >
                  {filteredFavorites.map((item, index) => (
                    <div
                      key={item.id}
                      className="group relative bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
                    >
                      {/* Selection Checkbox */}
                      <div className="absolute top-2 left-2 rtl:right-2 rtl:left-auto z-20">
                        <button
                          onClick={() => toggleSelectItem(item.id)}
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all shadow-md ${
                            selectedItems.includes(item.id)
                              ? "bg-gradient-to-r from-pink-500 to-purple-500 border-transparent text-white"
                              : "bg-white/90 border-gray-300 hover:border-pink-500"
                          }`}
                        >
                          {selectedItems.includes(item.id) && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-2 h-2 bg-white rounded-full"
                            />
                          )}
                        </button>
                      </div>

                      {/* Product Image */}
                      <div className="relative aspect-square overflow-hidden">
                        <Link to={`/product/${item.id}`}>
                          <ProductImage
                            src={item.imageUrl}
                            alt={isRtl ? item.nameAr : item.nameEn}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            width={200}
                            height={200}
                            aspectRatio="square"
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 200px"
                            quality={80}
                            priority={index < 10}
                            showZoom={false}
                            placeholderSize={24}
                            fallbackSrc="https://images.pexels.com/photos/1058775/pexels-photo-1058775.jpeg?auto=compress&cs=tinysrgb&w=400"
                          />
                        </Link>

                        {/* Badges */}
                        <div className="absolute top-2 right-2 rtl:left-2 rtl:right-auto flex flex-col gap-1">
                          {item.isBestSeller && (
                            <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold py-1 px-2 rounded-full flex items-center gap-1">
                              <Sparkles size={8} />
                              {isRtl ? "الأكثر مبيعاً" : "Best"}
                            </div>
                          )}
                          {item.isSpecialGift && (
                            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold py-1 px-2 rounded-full">
                              {isRtl ? "مميز" : "Special"}
                            </div>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                          <div className="flex gap-1">
                            <AddToCartButton
                              product={item}
                              variant="primary"
                              size="sm"
                              className="flex-1 text-xs py-1"
                              showLabel={false}
                            />
                            <button
                              onClick={() => removeFromFavorites(item.id)}
                              className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-1 rounded-lg hover:from-red-600 hover:to-pink-600 transition-all shadow-md"
                            >
                              <Trash2 size={12} />
                            </button>
                            <Link
                              to={`/product/${item.id}`}
                              className="bg-white/90 backdrop-blur-sm text-gray-800 p-1 rounded-lg hover:bg-white transition-all shadow-md"
                            >
                              <Eye size={12} />
                            </Link>
                          </div>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="p-3">
                        <Link to={`/product/${item.id}`}>
                          <h3 className="font-medium text-gray-800 hover:text-pink-600 transition-colors line-clamp-2 mb-2 text-sm min-h-[2.5rem]">
                            {isRtl ? item.nameAr : item.nameEn}
                          </h3>
                        </Link>
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-pink-600 font-bold text-sm">
                            {item.price} {isRtl ? "ر.س" : "SAR"}
                          </p>
                        </div>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                          {isRtl ? "أُضيف في" : "Added on"}{" "}
                          {new Date(item.dateAdded).toLocaleDateString(
                            isRtl ? "ar-EG" : "en-US"
                          )}
                        </span>
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
                  {filteredFavorites.map((item, index) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                    >
                      <div className="flex">
                        <div className="relative w-32 h-32 flex-shrink-0">
                          <button
                            onClick={() => toggleSelectItem(item.id)}
                            className={`absolute top-2 left-2 rtl:right-2 rtl:left-auto z-10 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                              selectedItems.includes(item.id)
                                ? "bg-gradient-to-r from-pink-500 to-purple-500 border-transparent text-white"
                                : "bg-white/90 border-gray-300 hover:border-pink-500"
                            }`}
                          >
                            {selectedItems.includes(item.id) && (
                              <div className="w-2 h-2 bg-white rounded-full" />
                            )}
                          </button>
                          <Link to={`/product/${item.id}`}>
                            <ProductImage
                              src={item.imageUrl}
                              alt={isRtl ? item.nameAr : item.nameEn}
                              className="w-full h-full object-cover"
                              width={128}
                              height={128}
                              aspectRatio="square"
                              sizes="128px"
                              quality={85}
                              priority={index < 5}
                              showZoom={false}
                              placeholderSize={24}
                              fallbackSrc="https://images.pexels.com/photos/1058775/pexels-photo-1058775.jpeg?auto=compress&cs=tinysrgb&w=400"
                            />
                          </Link>
                        </div>

                        <div className="flex-1 p-4 flex items-center justify-between">
                          <div className="flex-1">
                            <Link to={`/product/${item.id}`}>
                              <h3 className="font-bold text-gray-800 hover:text-pink-600 transition-colors mb-2">
                                {isRtl ? item.nameAr : item.nameEn}
                              </h3>
                            </Link>
                            <p className="text-xl font-bold text-pink-600 mb-2">
                              {item.price} {isRtl ? "ر.س" : "SAR"}
                            </p>
                            <div className="flex items-center gap-3">
                              {item.isBestSeller && (
                                <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">
                                  {isRtl ? "الأكثر مبيعاً" : "Best Seller"}
                                </span>
                              )}
                              {item.isSpecialGift && (
                                <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                                  {isRtl ? "مميز" : "Special"}
                                </span>
                              )}
                              <span className="text-xs text-gray-500">
                                {new Date(item.dateAdded).toLocaleDateString(
                                  isRtl ? "ar-EG" : "en-US"
                                )}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <AddToCartButton
                              product={item}
                              variant="primary"
                              size="sm"
                              showLabel={false}
                              className="p-2"
                            />
                            <button
                              onClick={() => removeFromFavorites(item.id)}
                              className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-2 rounded-xl hover:from-red-600 hover:to-pink-600 transition-all shadow-lg"
                            >
                              <Trash2 size={16} />
                            </button>
                            <Link
                              to={`/product/${item.id}`}
                              className="bg-gray-100 text-gray-700 p-2 rounded-xl hover:bg-gray-200 transition-all"
                            >
                              <Eye size={16} />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {filteredFavorites.length === 0 && favorites.length > 0 && (
              <div className="text-center py-16">
                <Search size={48} className="text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {isRtl ? "لا توجد نتائج" : "No Results Found"}
                </h3>
                <p className="text-gray-600 mb-6">
                  {isRtl
                    ? "لا توجد منتجات تطابق معايير البحث أو الفلتر"
                    : "No products match your search or filter criteria"}
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setFilterBy("all");
                  }}
                  className="btn btn-primary"
                >
                  {isRtl ? "مسح الفلاتر" : "Clear Filters"}
                </button>
              </div>
            )}

            {/* Recommendations - نفس آلية ProductsPage */}
            {favorites.length > 0 && (
              <div className="mt-16">
                <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
                  {t("favorites.recommendations")}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                  {suggestedProducts.slice(0, 6).map((product) => (
                    <div
                      key={product.id}
                      className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
                    >
                      <div className="relative aspect-square overflow-hidden">
                        <ProductImage
                          src={product.imageUrl}
                          alt={isRtl ? product.nameAr : product.nameEn}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          width={160}
                          height={160}
                          aspectRatio="square"
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 160px"
                          quality={75}
                          priority={false}
                          showZoom={false}
                          placeholderSize={20}
                          fallbackSrc="https://images.pexels.com/photos/1058775/pexels-photo-1058775.jpeg?auto=compress&cs=tinysrgb&w=400"
                        />
                        <div className="absolute top-2 right-2 rtl:left-2 rtl:right-auto opacity-0 group-hover:opacity-100 transition-opacity">
                          <FavoriteButton
                            product={product}
                            className="w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full shadow-md"
                            size={12}
                          />
                        </div>
                      </div>
                      <div className="p-3">
                        <Link to={`/product/${product.id}`}>
                          <h3 className="font-medium text-gray-800 text-xs line-clamp-2 mb-2 hover:text-primary transition-colors min-h-[2rem]">
                            {isRtl ? product.nameAr : product.nameEn}
                          </h3>
                        </Link>
                        <div className="flex items-center justify-between">
                          <p className="text-primary font-bold text-sm">
                            {product.price} {isRtl ? "ر.س" : "SAR"}
                          </p>
                          <AddToCartButton
                            product={product}
                            variant="icon"
                            size="sm"
                            showLabel={false}
                            className="w-6 h-6 text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
