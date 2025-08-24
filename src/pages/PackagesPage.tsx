import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  Package,
  Star,
  Gift,
  Crown,
  Sparkles,
  Check,
  Zap,
  Heart,
  Truck,
  Clock,
  Phone,
  MessageCircle,
  ArrowRight,
  ArrowLeft,
  Gem,
  Award,
  Target,
  Users,
  TrendingUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PackageFeature {
  icon: React.ReactNode;
  text: string;
  highlight?: boolean;
}

interface PackageData {
  id: string;
  icon: React.ReactNode;
  nameKey: string;
  descriptionKey: string;
  price: number;
  originalPrice: number;
  features: PackageFeature[];
  color: string;
  gradient: string;
  popular: boolean;
  badge?: string;
  savings: number;
  deliveryTime: string;
  includes: string[];
}

const PackagesPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [showComparison, setShowComparison] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const packages: PackageData[] = [
    {
      id: "basic",
      icon: <Package size={32} />,
      nameKey: "packages.basic.name",
      descriptionKey: "packages.basic.description",
      price: 199,
      originalPrice: 299,
      savings: 100,
      deliveryTime: isRtl ? "2-3 أيام" : "2-3 days",
      color: "blue",
      gradient: "from-blue-500 to-cyan-500",
      popular: false,
      features: [
        { icon: <Gift size={16} />, text: t("packages.basic.feature1") },
        { icon: <Package size={16} />, text: t("packages.basic.feature2") },
        { icon: <Truck size={16} />, text: t("packages.basic.feature3") },
      ],
      includes: [
        isRtl ? "تنسيق زهور واحد" : "1 flower arrangement",
        isRtl ? "تغليف هدايا أساسي" : "Basic gift wrapping",
        isRtl ? "بطاقة تهنئة" : "Greeting card",
        isRtl ? "توصيل عادي" : "Standard delivery",
      ],
    },
    {
      id: "premium",
      icon: <Star size={32} />,
      nameKey: "packages.premium.name",
      descriptionKey: "packages.premium.description",
      price: 399,
      originalPrice: 599,
      savings: 200,
      deliveryTime: isRtl ? "24 ساعة" : "24 hours",
      color: "primary",
      gradient: "from-purple-500 to-pink-500",
      popular: true,
      badge: isRtl ? "الأكثر شعبية" : "Most Popular",
      features: [
        { icon: <Gift size={16} />, text: t("packages.premium.feature1") },
        {
          icon: <Crown size={16} />,
          text: t("packages.premium.feature2"),
          highlight: true,
        },
        {
          icon: <Zap size={16} />,
          text: t("packages.premium.feature3"),
          highlight: true,
        },
        { icon: <Heart size={16} />, text: t("packages.premium.feature4") },
      ],
      includes: [
        isRtl ? "تنسيقان من الزهور" : "2 flower arrangements",
        isRtl ? "صندوق هدايا مميز" : "Premium gift box",
        isRtl ? "شوكولاتة فاخرة" : "Premium chocolates",
        isRtl ? "بطاقة شخصية" : "Personalized card",
        isRtl ? "توصيل سريع" : "Express delivery",
      ],
    },
    {
      id: "luxury",
      icon: <Crown size={32} />,
      nameKey: "packages.luxury.name",
      descriptionKey: "packages.luxury.description",
      price: 699,
      originalPrice: 999,
      savings: 300,
      deliveryTime: isRtl ? "نفس اليوم" : "Same day",
      color: "amber",
      gradient: "from-amber-500 to-orange-500",
      popular: false,
      badge: isRtl ? "فاخر" : "Luxury",
      features: [
        {
          icon: <Gem size={16} />,
          text: t("packages.luxury.feature1"),
          highlight: true,
        },
        {
          icon: <Crown size={16} />,
          text: t("packages.luxury.feature2"),
          highlight: true,
        },
        {
          icon: <Zap size={16} />,
          text: t("packages.luxury.feature3"),
          highlight: true,
        },
        {
          icon: <Sparkles size={16} />,
          text: t("packages.luxury.feature4"),
          highlight: true,
        },
        { icon: <Gift size={16} />, text: t("packages.luxury.feature5") },
      ],
      includes: [
        isRtl ? "3 تنسيقات فاخرة" : "3 premium arrangements",
        isRtl ? "تغليف هدايا فاخر" : "Luxury gift packaging",
        isRtl ? "شوكولاتة مستوردة" : "Imported chocolates",
        isRtl ? "رسالة شخصية مخطوطة" : "Handwritten personal message",
        isRtl ? "توصيل في نفس اليوم" : "Same-day delivery",
        isRtl ? "خدمة عملاء مخصصة" : "Dedicated customer service",
      ],
    },
  ];

  const testimonials = [
    {
      name: isRtl ? "سارة أحمد" : "Sarah Ahmed",
      package: isRtl ? "الباقة المميزة" : "Premium Package",
      rating: 5,
      text: isRtl
        ? "باقة رائعة! الهدايا كانت مذهلة والتوصيل سريع جداً. أنصح الجميع بها."
        : "Amazing package! The gifts were stunning and delivery was super fast. Highly recommend!",
      image:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100",
    },
    {
      name: isRtl ? "محمد علي" : "Mohamed Ali",
      package: isRtl ? "الباقة الفاخرة" : "Luxury Package",
      rating: 5,
      text: isRtl
        ? "تجربة استثنائية! كل التفاصيل كانت مثالية. زوجتي أحبت الهدية كثيراً."
        : "Exceptional experience! Every detail was perfect. My wife absolutely loved the gift.",
      image:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100",
    },
    {
      name: isRtl ? "فاطمة محمد" : "Fatima Mohamed",
      package: isRtl ? "الباقة الأساسية" : "Basic Package",
      rating: 5,
      text: isRtl
        ? "قيمة ممتازة مقابل السعر. الجودة فاقت توقعاتي بكثير."
        : "Excellent value for money. Quality exceeded my expectations by far.",
      image:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100",
    },
  ];

  const stats = [
    {
      icon: <Users size={24} />,
      value: "10K+",
      label: isRtl ? "عميل سعيد" : "Happy Customers",
    },
    {
      icon: <Award size={24} />,
      value: "50K+",
      label: isRtl ? "باقة تم توصيلها" : "Packages Delivered",
    },
    {
      icon: <TrendingUp size={24} />,
      value: "98%",
      label: isRtl ? "معدل الرضا" : "Satisfaction Rate",
    },
    {
      icon: <Target size={24} />,
      value: "24/7",
      label: isRtl ? "دعم العملاء" : "Customer Support",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const getPackageStyle = (pkg: PackageData) => {
    return (
      {
        basic: {
          bg: "bg-blue-50",
          border: "border-blue-200",
          text: "text-blue-800",
          button: "bg-blue-600 hover:bg-blue-700",
          icon: "text-blue-600",
        },
        primary: {
          bg: "bg-purple-50",
          border: "border-purple-200",
          text: "text-purple-800",
          button:
            "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600",
          icon: "text-purple-600",
        },
        amber: {
          bg: "bg-amber-50",
          border: "border-amber-200",
          text: "text-amber-800",
          button: "bg-amber-600 hover:bg-amber-700",
          icon: "text-amber-600",
        },
      }[pkg.color] || {
        bg: "bg-gray-50",
        border: "border-gray-200",
        text: "text-gray-800",
        button: "bg-gray-600 hover:bg-gray-700",
        icon: "text-gray-600",
      }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
        {/* Animated Background */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 1, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>

        <div className="container-custom py-20 relative z-10">
          <motion.div
            className="text-center text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.div
              className="inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full mb-8"
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Gift className="w-12 h-12 text-white" />
              <motion.div
                className="absolute inset-0 bg-white/10 rounded-full"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {t("packages.title")}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8">
              {t("packages.description")}
            </p>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-3">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="container-custom py-16">
        {/* Package Comparison Toggle */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button
            onClick={() => setShowComparison(!showComparison)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-white/20 hover:shadow-xl transition-all"
          >
            <Target size={20} className="text-purple-600" />
            <span className="font-medium text-gray-800">
              {showComparison
                ? isRtl
                  ? "إخفاء المقارنة"
                  : "Hide Comparison"
                : isRtl
                ? "مقارنة الباقات"
                : "Compare Packages"}
            </span>
          </button>
        </motion.div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {packages.map((pkg, index) => {
            const style = getPackageStyle(pkg);

            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`relative rounded-3xl overflow-hidden shadow-2xl border-2 transition-all duration-500 hover:shadow-3xl ${
                  pkg.popular
                    ? "border-purple-300 bg-gradient-to-br from-purple-50 to-pink-50"
                    : `${style.border} ${style.bg}`
                }`}
                onHoverStart={() => setSelectedPackage(pkg.id)}
                onHoverEnd={() => setSelectedPackage(null)}
              >
                {/* Popular Badge */}
                {pkg.popular && (
                  <motion.div
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10"
                    initial={{ scale: 0, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
                  >
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
                      <Sparkles size={16} />
                      {pkg.badge}
                    </div>
                  </motion.div>
                )}

                {/* Package Header */}
                <div className="p-8 text-center">
                  <motion.div
                    className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 ${
                      pkg.popular
                        ? "bg-gradient-to-r from-purple-500 to-pink-500"
                        : style.bg
                    }`}
                    animate={selectedPackage === pkg.id ? { rotate: 360 } : {}}
                    transition={{ duration: 0.6 }}
                  >
                    <div className={pkg.popular ? "text-white" : style.icon}>
                      {pkg.icon}
                    </div>
                  </motion.div>

                  <h3
                    className={`text-2xl font-bold mb-2 ${
                      pkg.popular ? "text-purple-800" : style.text
                    }`}
                  >
                    {t(pkg.nameKey)}
                  </h3>
                  <p className="text-gray-600 mb-6">{t(pkg.descriptionKey)}</p>

                  {/* Pricing */}
                  <div className="mb-6">
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <span
                        className={`text-4xl font-bold ${
                          pkg.popular ? "text-purple-800" : style.text
                        }`}
                      >
                        {pkg.price} {isRtl ? "ر.س" : "SAR"}
                      </span>
                      <span className="text-gray-400 line-through text-xl">
                        {pkg.originalPrice} {isRtl ? "ر.س" : "SAR"}
                      </span>
                    </div>
                    <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      <Zap size={14} />
                      {t("packages.save")} {pkg.savings} {isRtl ? "ر.س" : "SAR"}
                    </div>
                  </div>

                  {/* Delivery Time */}
                  <div className="flex items-center justify-center gap-2 mb-6 text-gray-600">
                    <Clock size={16} />
                    <span className="text-sm">{pkg.deliveryTime}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="px-8 pb-8">
                  <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Check size={16} className="text-green-500" />
                    {isRtl ? "ما يشمله:" : "What's included:"}
                  </h4>
                  <ul className="space-y-3 mb-8">
                    {pkg.includes.map((item, i) => (
                      <motion.li
                        key={i}
                        className="flex items-center gap-3 text-gray-700"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + i * 0.1 }}
                      >
                        <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button
                    className={`w-full text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl ${style.button}`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <span>{t("packages.selectPackage")}</span>
                      {isRtl ? (
                        <ArrowLeft size={20} />
                      ) : (
                        <ArrowRight size={20} />
                      )}
                    </div>
                  </button>
                </div>

                {/* Hover Effect */}
                <AnimatePresence>
                  {selectedPackage === pkg.id && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Comparison Table */}
        <AnimatePresence>
          {showComparison && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-16"
            >
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">
                    {isRtl
                      ? "مقارنة تفصيلية للباقات"
                      : "Detailed Package Comparison"}
                  </h3>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left rtl:text-right py-4 px-6 font-semibold text-gray-800">
                            {isRtl ? "الميزة" : "Feature"}
                          </th>
                          {packages.map((pkg) => (
                            <th key={pkg.id} className="text-center py-4 px-6">
                              <div className="font-semibold text-gray-800">
                                {t(pkg.nameKey)}
                              </div>
                              <div className="text-sm text-gray-500">
                                {pkg.price} {isRtl ? "ر.س" : "SAR"}
                              </div>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {
                            feature: isRtl ? "عدد التنسيقات" : "Arrangements",
                            values: ["1", "2", "3"],
                          },
                          {
                            feature: isRtl ? "نوع التغليف" : "Packaging",
                            values: [
                              isRtl ? "أساسي" : "Basic",
                              isRtl ? "مميز" : "Premium",
                              isRtl ? "فاخر" : "Luxury",
                            ],
                          },
                          {
                            feature: isRtl ? "الشوكولاتة" : "Chocolates",
                            values: [
                              "❌",
                              "✅",
                              "✅ " + (isRtl ? "مستوردة" : "Imported"),
                            ],
                          },
                          {
                            feature: isRtl
                              ? "البطاقة الشخصية"
                              : "Personal Card",
                            values: [
                              isRtl ? "عادية" : "Standard",
                              "✅",
                              "✅ " + (isRtl ? "مخطوطة" : "Handwritten"),
                            ],
                          },
                          {
                            feature: isRtl ? "وقت التوصيل" : "Delivery Time",
                            values: [
                              isRtl ? "2-3 أيام" : "2-3 days",
                              isRtl ? "24 ساعة" : "24 hours",
                              isRtl ? "نفس اليوم" : "Same day",
                            ],
                          },
                          {
                            feature: isRtl ? "دعم العملاء" : "Customer Support",
                            values: [
                              isRtl ? "عادي" : "Standard",
                              isRtl ? "أولوية" : "Priority",
                              isRtl ? "مخصص" : "Dedicated",
                            ],
                          },
                        ].map((row, index) => (
                          <motion.tr
                            key={index}
                            className="border-b border-gray-100 hover:bg-gray-50/50"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <td className="py-4 px-6 font-medium text-gray-700">
                              {row.feature}
                            </td>
                            {row.values.map((value, i) => (
                              <td
                                key={i}
                                className="py-4 px-6 text-center text-gray-600"
                              >
                                {value}
                              </td>
                            ))}
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Testimonials */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            {isRtl ? "آراء عملائنا" : "What Our Customers Say"}
          </h2>

          <div className="relative max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 text-center"
              >
                <div className="flex justify-center mb-4">
                  {[...Array(testimonials[currentTestimonial].rating)].map(
                    (_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className="text-yellow-400"
                        fill="currentColor"
                      />
                    )
                  )}
                </div>

                <blockquote className="text-lg text-gray-700 mb-6 italic">
                  "{testimonials[currentTestimonial].text}"
                </blockquote>

                <div className="flex items-center justify-center gap-4">
                  <img
                    src={testimonials[currentTestimonial].image}
                    alt={testimonials[currentTestimonial].name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-gray-800">
                      {testimonials[currentTestimonial].name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {testimonials[currentTestimonial].package}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Testimonial Indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentTestimonial
                      ? "bg-purple-500"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Custom Package CTA */}
        <motion.div
          className="bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 rounded-3xl shadow-2xl overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <div className="relative p-12 text-center text-white">
            {/* Background Animation */}
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
                  }}
                  transition={{
                    duration: 3 + Math.random(),
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>

            <div className="relative z-10">
              <motion.div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
                <Sparkles className="w-8 h-8" />
              </motion.div>

              <h3 className="text-3xl font-bold mb-4">
                {t("packages.custom.title")}
              </h3>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                {t("packages.custom.description")}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
                >
                  <Phone size={20} />
                  {t("packages.custom.contact")}
                </Link>
                <button className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/30 transition-all border border-white/20">
                  <MessageCircle size={20} />
                  {isRtl ? "دردشة مباشرة" : "Live Chat"}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PackagesPage;
