import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  ArrowRight,
  Share2,
  ShoppingCart,
  Plus,
  Minus,
  Shield,
  Truck,
  RotateCcw,
  Award,
  CheckCircle,
  Clock,
  Package,
  Gift,
  Crown,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  X,
  Copy,
  Facebook,
  Twitter,
  Instagram,
  MessageCircle,
  Phone,
  Mail,
  ZoomIn,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { allProducts, getProductById } from "../data";
import { ProductImage } from "../features/images";
import {
  usePreloadCriticalImages,
  useImagePreloader,
} from "../features/images";
import FavoriteButton from "../components/ui/FavoriteButton";
import AddToCartButton from "../components/ui/AddToCartButton";

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showShareModal, setShowShareModal] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showImageZoomModal, setShowImageZoomModal] = useState(false);

  const product = getProductById(parseInt(id || "0"));

  // Mock images for gallery
  const productImages = [
    product?.imageUrl || "",
    product?.imageUrl || "",
    product?.imageUrl || "",
    product?.imageUrl || "",
  ].filter(Boolean);

  // Preload product images immediately
  usePreloadCriticalImages(productImages);

  const relatedProducts = React.useMemo(() => {
    if (!product) return [];

    return allProducts
      .filter(
        (p) =>
          p.id !== product.id &&
          (p.categoryId === product.categoryId ||
            p.occasionId === product.occasionId)
      )
      .slice(0, 8);
  }, [product]);

  // Preload related product images
  const relatedImages = React.useMemo(
    () => relatedProducts.slice(0, 6).map((p) => p.imageUrl),
    [relatedProducts]
  );
  useImagePreloader(relatedImages, { priority: false });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  // Hide header on mobile
  useEffect(() => {
    const header = document.querySelector("header");
    const handleResize = () => {
      if (window.innerWidth < 768) {
        if (header) header.style.display = "none";
      } else {
        if (header) header.style.display = "block";
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (header) header.style.display = "block";
    };
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md mx-auto"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-red-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Gift size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold mb-4 text-gray-800">
            {t("product.notFound")}
          </h1>
          <p className="text-gray-600 mb-6">
            {isRtl
              ? "عذراً، المنتج المطلوب غير متوفر."
              : "Sorry, the requested product is not available."}
          </p>
          <Link to="/" className="btn btn-primary">
            {t("product.backToHome")}
          </Link>
        </motion.div>
      </div>
    );
  }

  const features = [
    {
      icon: <Truck size={20} className="text-blue-600" />,
      title: isRtl ? "توصيل سريع" : "Fast Delivery",
      description: isRtl ? "خلال 24-48 ساعة" : "Within 24-48 hours",
    },
    {
      icon: <Shield size={20} className="text-green-600" />,
      title: isRtl ? "ضمان الجودة" : "Quality Guarantee",
      description: isRtl ? "منتجات أصلية 100%" : "100% Authentic Products",
    },
    {
      icon: <RotateCcw size={20} className="text-purple-600" />,
      title: isRtl ? "إرجاع مجاني" : "Free Returns",
      description: isRtl ? "خلال 7 أيام" : "Within 7 days",
    },
    {
      icon: <Award size={20} className="text-amber-600" />,
      title: isRtl ? "خدمة مميزة" : "Premium Service",
      description: isRtl ? "دعم على مدار الساعة" : "24/7 Support",
    },
  ];

  const tabs = [
    {
      id: "description",
      label: isRtl ? "الوصف" : "Description",
      icon: <MessageCircle size={16} />,
    },
    {
      id: "shipping",
      label: isRtl ? "الشحن" : "Shipping",
      icon: <Truck size={16} />,
    },
  ];

  const getCategoryName = (categoryId: string) => {
    const camelCaseId = categoryId.replace(/-([a-z])/g, (g) =>
      g[1].toUpperCase()
    );
    return t(`home.categories.items.${camelCaseId}`);
  };

  const shareProduct = () => setShowShareModal(true);
  const copyToClipboard = () =>
    navigator.clipboard.writeText(window.location.href);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30">
      {/* Mobile Back Button */}
      <div className="md:hidden fixed top-2 left-2 rtl:right-2 rtl:left-auto z-50">
        <Link
          to="/"
          className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:bg-white transition-all"
        >
          {isRtl ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </Link>
      </div>

      {/* Desktop Breadcrumb */}
      <div className="hidden md:block">
        <div className="container-custom pt-6 pb-3">
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-xs text-gray-600 bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-sm border border-white/20"
          >
            <Link to="/" className="hover:text-primary transition-colors">
              {isRtl ? "الرئيسية" : "Home"}
            </Link>
            <span>/</span>
            <Link
              to="/categories"
              className="hover:text-primary transition-colors"
            >
              {isRtl ? "الفئات" : "Categories"}
            </Link>
            <span>/</span>
            <Link
              to={`/category/${product.categoryId}`}
              className="hover:text-primary transition-colors"
            >
              {getCategoryName(product.categoryId)}
            </Link>
            <span>/</span>
            <span className="text-gray-800 font-medium truncate">
              {isRtl ? product.nameAr : product.nameEn}
            </span>
          </motion.nav>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="md:container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-8">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="md:sticky md:top-6">
              {/* Main Image */}
              <div className="relative bg-white md:rounded-xl overflow-hidden shadow-md">
                <div className="aspect-square relative">
                  <ProductImage
                    src={productImages[selectedImageIndex]}
                    alt={isRtl ? product.nameAr : product.nameEn}
                    className="w-full h-full object-cover"
                    width={600}
                    height={600}
                    aspectRatio="square"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    quality={90}
                    priority={true}
                    showZoom={false}
                  />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 rtl:right-3 rtl:left-auto flex flex-col gap-1.5">
                    {product.isBestSeller && (
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold py-1.5 px-2.5 rounded-full flex items-center gap-1.5 shadow-md"
                      >
                        <Crown size={12} />
                        {t("home.bestSellers.bestSeller")}
                      </motion.div>
                    )}
                    {product.isSpecialGift && (
                      <motion.div
                        initial={{ scale: 0, rotate: 180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold py-1.5 px-2.5 rounded-full flex items-center gap-1.5 shadow-md"
                      >
                        <Sparkles size={12} />
                        {t("home.featuredCollections.specialGift")}
                      </motion.div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute top-3 right-3 rtl:left-3 rtl:right-auto flex flex-col gap-1.5">
                    <FavoriteButton
                      product={product}
                      className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-all"
                      size={16}
                    />
                    <button
                      onClick={shareProduct}
                      className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-all flex items-center justify-center text-gray-700 hover:text-primary"
                    >
                      <Share2 size={16} />
                    </button>
                    <button
                      onClick={() => setShowImageZoomModal(true)}
                      className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-all flex items-center justify-center text-gray-700 hover:text-primary"
                      aria-label={isRtl ? "تكبير الصورة" : "Zoom Image"}
                    >
                      <ZoomIn size={16} />
                    </button>
                  </div>

                  {/* Image Navigation */}
                  {productImages.length > 1 && (
                    <>
                      <button
                        onClick={() =>
                          setSelectedImageIndex(
                            selectedImageIndex === 0
                              ? productImages.length - 1
                              : selectedImageIndex - 1
                          )
                        }
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full shadow-md flex items-center justify-center text-gray-700 hover:bg-white transition-all"
                      >
                        {isRtl ? (
                          <ChevronRight size={16} />
                        ) : (
                          <ChevronLeft size={16} />
                        )}
                      </button>
                      <button
                        onClick={() =>
                          setSelectedImageIndex(
                            selectedImageIndex === productImages.length - 1
                              ? 0
                              : selectedImageIndex + 1
                          )
                        }
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full shadow-md flex items-center justify-center text-gray-700 hover:bg-white transition-all"
                      >
                        {isRtl ? (
                          <ChevronLeft size={16} />
                        ) : (
                          <ChevronRight size={16} />
                        )}
                      </button>
                    </>
                  )}
                </div>

                {/* Thumbnail Gallery */}
                <div className="p-3 bg-gray-50">
                  <div className="flex gap-2 justify-center">
                    {productImages.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`w-14 h-14 rounded-md overflow-hidden border-2 transition-all ${
                          selectedImageIndex === index
                            ? "border-primary shadow-sm"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <ProductImage
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                          width={56}
                          height={56}
                          aspectRatio="square"
                          sizes="56px"
                          quality={80}
                          priority={false}
                          showZoom={false}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-5 md:p-0 space-y-5"
          >
            {/* Product Header */}
            <div className="bg-white md:bg-transparent rounded-xl p-5 md:p-0 shadow-sm md:shadow-none">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-1.5 leading-tight">
                    {isRtl ? product.nameAr : product.nameEn}
                  </h1>
                  <div className="flex items-center gap-1.5 text-xs text-gray-600">
                    <span>{isRtl ? "كود المنتج:" : "Product ID:"}</span>
                    <span className="font-mono bg-gray-100 px-1.5 py-0.5 rounded">
                      #{product.id}
                    </span>
                  </div>
                </div>
              </div>

              {/* Price Section */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-3 mb-5 border border-purple-100">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                      {product.price} {isRtl ? "ر.س" : "SAR"}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="bg-green-100 text-green-800 text-xs font-medium py-0.5 px-1.5 rounded-full">
                        {isRtl ? "شامل الضريبة" : "Tax Included"}
                      </span>
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium py-0.5 px-1.5 rounded-full">
                        {isRtl ? "توصيل مجاني" : "Free Shipping"}
                      </span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-600 mb-1">
                      {isRtl ? "توفير" : "Save"}
                    </div>
                    <div className="text-base font-bold text-green-600">
                      {Math.round(product.price * 0.15)} {isRtl ? "ر.س" : "SAR"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-2 gap-2.5 mb-5">
                <div className="bg-gray-50 rounded-md p-2.5 text-center">
                  <CheckCircle
                    size={14}
                    className="text-green-500 mx-auto mb-1"
                  />
                  <div className="text-xs font-medium text-gray-700">
                    {isRtl ? "متوفر" : "In Stock"}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-md p-2.5 text-center">
                  <Clock size={14} className="text-blue-500 mx-auto mb-1" />
                  <div className="text-xs font-medium text-gray-700">
                    {isRtl ? "توصيل سريع" : "Fast Delivery"}
                  </div>
                </div>
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="bg-white rounded-xl p-5 shadow-sm space-y-4">
              <div>
                <label className="flex items-center gap-2 text-base font-semibold text-gray-800 mb-2.5">
                  <Package size={16} />
                  {isRtl ? "الكمية" : "Quantity"}
                </label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center bg-gray-100 rounded-lg border border-gray-200">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-9 h-9 rounded-l-lg hover:bg-gray-200 flex items-center justify-center transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-10 text-center font-bold text-base bg-white h-9 flex items-center justify-center border-x border-gray-200">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-9 h-9 rounded-r-lg hover:bg-gray-200 flex items-center justify-center transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5">
                <AddToCartButton
                  product={product}
                  quantity={quantity}
                  size="md"
                  className="flex-1 h-10 text-sm font-semibold"
                />
                <button className="h-10 px-5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all font-semibold flex items-center justify-center gap-1.5 text-sm">
                  <ShoppingCart size={16} />
                  {isRtl ? "اشتري الآن" : "Buy Now"}
                </button>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 transition-all duration-300"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="flex-shrink-0">{feature.icon}</div>
                    <div>
                      <div className="font-medium text-gray-800 text-xs">
                        {feature.title}
                      </div>
                      <div className="text-xs text-gray-600">
                        {feature.description}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-8 md:mt-12">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            {/* Tab Headers */}
            <div className="border-b border-gray-200 bg-gray-50">
              <div className="flex">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 py-3 px-3 font-medium transition-all flex items-center justify-center gap-1.5 relative text-sm ${
                      activeTab === tab.id
                        ? "text-primary bg-white border-b-2 border-primary"
                        : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                    }`}
                  >
                    {tab.icon}
                    <span className="hidden sm:inline">{tab.label}</span>
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-5">
              <AnimatePresence mode="wait">
                {activeTab === "description" && (
                  <motion.div
                    key="description"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="space-y-3"
                  >
                    <h3 className="text-lg font-bold text-gray-800 mb-3">
                      {t("product.description")}
                    </h3>
                    <div className="prose max-w-none">
                      <p className="text-gray-600 leading-relaxed text-sm">
                        {showFullDescription
                          ? isRtl
                            ? product.descriptionAr
                            : product.descriptionEn
                          : `${(isRtl
                              ? product.descriptionAr
                              : product.descriptionEn
                            )?.substring(0, 150)}...`}
                      </p>
                      <button
                        onClick={() =>
                          setShowFullDescription(!showFullDescription)
                        }
                        className="text-primary hover:text-primary-dark font-medium mt-1.5 text-xs flex items-center gap-1"
                      >
                        {showFullDescription
                          ? isRtl
                            ? "عرض أقل"
                            : "Show less"
                          : isRtl
                          ? "عرض المزيد"
                          : "Show more"}
                        {isRtl ? (
                          <ArrowLeft size={12} />
                        ) : (
                          <ArrowRight size={12} />
                        )}
                      </button>
                    </div>

                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-3 mt-5 border border-purple-100">
                      <h4 className="font-semibold text-gray-800 mb-2.5 flex items-center gap-1.5 text-sm">
                        <CheckCircle size={14} className="text-primary" />
                        {isRtl ? "المميزات الرئيسية" : "Key Features"}
                      </h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
                        {[
                          isRtl
                            ? "جودة عالية مضمونة"
                            : "Premium quality guaranteed",
                          isRtl
                            ? "تصميم أنيق وعصري"
                            : "Elegant and modern design",
                          isRtl
                            ? "مناسب لجميع المناسبات"
                            : "Perfect for all occasions",
                          isRtl ? "تغليف فاخر مجاني" : "Free luxury packaging",
                        ].map((feature, index) => (
                          <li
                            key={index}
                            className="flex items-center gap-1.5 text-gray-700 text-xs"
                          >
                            <CheckCircle
                              size={11}
                              className="text-green-500 flex-shrink-0"
                            />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}

                {activeTab === "shipping" && (
                  <motion.div
                    key="shipping"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="space-y-5"
                  >
                    <h3 className="text-lg font-bold text-gray-800 mb-3">
                      {isRtl ? "معلومات الشحن والتوصيل" : "Shipping & Delivery"}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="space-y-3">
                        <div className="flex items-start gap-2.5 p-3 bg-blue-50 rounded-lg border border-blue-100">
                          <Truck size={18} className="text-blue-600 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-gray-800 mb-0.5 text-sm">
                              {isRtl ? "التوصيل السريع" : "Express Delivery"}
                            </h4>
                            <p className="text-xs text-gray-600">
                              {isRtl
                                ? "توصيل في نفس اليوم للطلبات قبل الساعة 2 ظهراً"
                                : "Same-day delivery for orders before 2 PM"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2.5 p-3 bg-green-50 rounded-lg border border-green-100">
                          <Shield size={18} className="text-green-600 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-gray-800 mb-0.5 text-sm">
                              {isRtl ? "التغليف الآمن" : "Secure Packaging"}
                            </h4>
                            <p className="text-xs text-gray-600">
                              {isRtl
                                ? "نضمن وصول منتجاتك بحالة مثالية"
                                : "We guarantee your products arrive in perfect condition"}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-start gap-2.5 p-3 bg-purple-50 rounded-lg border border-purple-100">
                          <Clock size={18} className="text-purple-600 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-gray-800 mb-0.5 text-sm">
                              {isRtl ? "أوقات التوصيل" : "Delivery Times"}
                            </h4>
                            <p className="text-xs text-gray-600">
                              {isRtl
                                ? "الرياض وجدة: 24 ساعة، المدن الأخرى: 2-3 أيام"
                                : "Riyadh & Jeddah: 24 hours, Other cities: 2-3 days"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2.5 p-3 bg-amber-50 rounded-lg border border-amber-100">
                          <RotateCcw
                            size={18}
                            className="text-amber-600 mt-0.5"
                          />
                          <div>
                            <h4 className="font-medium text-gray-800 mb-0.5 text-sm">
                              {isRtl ? "سياسة الإرجاع" : "Return Policy"}
                            </h4>
                            <p className="text-xs text-gray-600">
                              {isRtl
                                ? "إمكانية الإرجاع خلال 7 أيام"
                                : "Returns accepted within 7 days"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-10 md:mt-12 pb-6">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <div className="text-center mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-1.5">
                  {t("product.relatedProducts")}
                </h2>
                <p className="text-gray-600 text-sm">
                  {isRtl
                    ? "منتجات أخرى قد تعجبك"
                    : "Other products you might like"}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {relatedProducts.slice(0, 8).map((relatedProduct, index) => (
                  <motion.div
                    key={relatedProduct.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.05 }}
                    className="group bg-white rounded-lg shadow-sm transition-all duration-300 overflow-hidden border border-gray-100"
                  >
                    <div className="relative aspect-square overflow-hidden">
                      <Link to={`/product/${relatedProduct.id}`}>
                        <ProductImage
                          src={relatedProduct.imageUrl}
                          alt={
                            isRtl
                              ? relatedProduct.nameAr
                              : relatedProduct.nameEn
                          }
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          width={300}
                          height={300}
                          aspectRatio="square"
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          quality={85}
                          priority={false}
                          showZoom={false}
                          placeholderSize={24}
                          fallbackSrc="https://images.pexels.com/photos/1058775/pexels-photo-1058775.jpeg?auto=compress&cs=tinysrgb&w=400"
                        />
                      </Link>
                      {relatedProduct.isBestSeller && (
                        <div className="absolute top-1.5 right-1.5 rtl:left-1.5 rtl:right-auto bg-amber-500 text-white text-xs py-0.5 px-1.5 rounded-full font-medium">
                          {isRtl ? "الأكثر مبيعاً" : "Best"}
                        </div>
                      )}
                      <div className="absolute top-1.5 left-1.5 rtl:right-1.5 rtl:left-auto opacity-0 group-hover:opacity-100 transition-opacity">
                        <FavoriteButton
                          product={relatedProduct}
                          className="w-6 h-6 bg-white/90 backdrop-blur-sm rounded-full shadow-sm"
                          size={10}
                        />
                      </div>
                    </div>
                    <div className="p-2.5">
                      <Link to={`/product/${relatedProduct.id}`}>
                        <h3 className="font-medium text-gray-800 hover:text-primary transition-colors line-clamp-2 mb-1.5 text-xs">
                          {isRtl
                            ? relatedProduct.nameAr
                            : relatedProduct.nameEn}
                        </h3>
                      </Link>
                      <div className="flex items-center justify-between">
                        <p className="font-bold text-primary text-sm">
                          {relatedProduct.price} {isRtl ? "ر.س" : "SAR"}
                        </p>
                        <AddToCartButton
                          product={relatedProduct}
                          variant="icon"
                          size="sm"
                          showLabel={false}
                          className="w-6 h-6 text-xs"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowShareModal(false)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="bg-white rounded-xl p-5 max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-gray-800">
                  {isRtl ? "مشاركة المنتج" : "Share Product"}
                </h3>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                >
                  <X size={14} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2.5 mb-3">
                <button className="flex items-center gap-2 p-2.5 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                  <Facebook size={16} className="text-blue-600" />
                  <span className="text-blue-600 font-medium text-sm">
                    Facebook
                  </span>
                </button>
                <button className="flex items-center gap-2 p-2.5 bg-sky-50 hover:bg-sky-100 rounded-lg transition-colors">
                  <Twitter size={16} className="text-sky-600" />
                  <span className="text-sky-600 font-medium text-sm">
                    Twitter
                  </span>
                </button>
                <button className="flex items-center gap-2 p-2.5 bg-pink-50 hover:bg-pink-100 rounded-lg transition-colors">
                  <Instagram size={16} className="text-pink-600" />
                  <span className="text-pink-600 font-medium text-sm">
                    Instagram
                  </span>
                </button>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 p-2.5 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Copy size={16} className="text-gray-600" />
                  <span className="text-gray-600 font-medium text-sm">
                    {isRtl ? "نسخ الرابط" : "Copy Link"}
                  </span>
                </button>
              </div>

              <div className="border-t border-gray-200 pt-3">
                <div className="flex items-center gap-2.5 text-sm text-gray-600">
                  <MessageCircle size={14} />
                  <span>
                    {isRtl
                      ? "أو تواصل معنا مباشرة:"
                      : "Or contact us directly:"}
                  </span>
                </div>
                <div className="flex gap-2 mt-2">
                  <button className="flex items-center gap-1 px-2.5 py-1.5 bg-green-50 hover:bg-green-100 rounded-md transition-colors text-green-600 text-xs">
                    <Phone size={12} />
                    {isRtl ? "اتصال" : "Call"}
                  </button>
                  <button className="flex items-center gap-1 px-2.5 py-1.5 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors text-blue-600 text-xs">
                    <Mail size={12} />
                    {isRtl ? "إيميل" : "Email"}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Zoom Modal */}
      <AnimatePresence>
        {showImageZoomModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4"
            onClick={() => setShowImageZoomModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-full w-full h-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowImageZoomModal(false)}
                className="absolute top-4 right-4 bg-white/70 backdrop-blur-sm rounded-full p-2 text-gray-800 hover:bg-white transition-colors z-10"
                aria-label={isRtl ? "إغلاق" : "Close"}
              >
                <X size={20} />
              </button>
              <ProductImage
                src={productImages[selectedImageIndex]}
                alt={isRtl ? product.nameAr : product.nameEn}
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl mx-auto"
                width={1200}
                height={1200}
                aspectRatio="auto"
                sizes="100vw"
                quality={100}
                priority={true}
                showZoom={false}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductPage;
