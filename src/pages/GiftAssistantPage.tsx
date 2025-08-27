import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  Wand2,
  Heart,
  Gift,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  User,
  Calendar,
  DollarSign,
  Tag,
  Search,
  Crown,
  Star,
  Palette,
  Clock,
  Gem,
  Music,
  Coffee,
  Book,
  Camera,
  Gamepad2,
  Dumbbell,
  Plane,
  Home,
  PawPrint,
  Utensils,
  Shirt,
  Flower,
  Zap,
  Target,
  TrendingUp,
  Award,
  CheckCircle,
  RefreshCw,
  Eye,
  ShoppingBag,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { allProducts } from "../data";
import { ProductImage } from "../features/images";
import AddToCartButton from "../components/ui/AddToCartButton";
import FavoriteButton from "../components/ui/FavoriteButton";

interface FormData {
  recipientName: string;
  relationship: string;
  occasion: string;
  budget: string;
  interests: string[];
  personalityType: string;
  giftType: string;
  deliveryDate: string;
}

interface AnalysisResult {
  style: "romantic" | "creative" | "classic" | "modern";
  recommendations: typeof allProducts;
  reasoning: string;
  confidence: number;
}

const GiftAssistantPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  const [currentStep, setCurrentStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null
  );
  const [showResults, setShowResults] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    recipientName: "",
    relationship: "",
    occasion: "",
    budget: "",
    interests: [],
    personalityType: "",
    giftType: "",
    deliveryDate: "",
  });

  const relationships = [
    { value: "spouse", label: isRtl ? "الزوج/الزوجة" : "Spouse", icon: "💕" },
    { value: "parent", label: isRtl ? "الوالدين" : "Parent", icon: "👨‍👩‍👧‍👦" },
    { value: "sibling", label: isRtl ? "الأخ/الأخت" : "Sibling", icon: "👫" },
    { value: "friend", label: isRtl ? "صديق" : "Friend", icon: "👥" },
    { value: "colleague", label: isRtl ? "زميل عمل" : "Colleague", icon: "💼" },
    { value: "child", label: isRtl ? "طفل" : "Child", icon: "👶" },
    { value: "relative", label: isRtl ? "قريب" : "Relative", icon: "👪" },
    { value: "teacher", label: isRtl ? "معلم" : "Teacher", icon: "📚" },
  ];

  const occasions = [
    { value: "birthday", label: isRtl ? "عيد ميلاد" : "Birthday", icon: "🎂" },
    {
      value: "anniversary",
      label: isRtl ? "ذكرى سنوية" : "Anniversary",
      icon: "💍",
    },
    { value: "wedding", label: isRtl ? "زفاف" : "Wedding", icon: "👰" },
    { value: "graduation", label: isRtl ? "تخرج" : "Graduation", icon: "🎓" },
    {
      value: "valentine",
      label: isRtl ? "عيد الحب" : "Valentine's Day",
      icon: "💝",
    },
    {
      value: "mother-day",
      label: isRtl ? "عيد الأم" : "Mother's Day",
      icon: "🌸",
    },
    {
      value: "father-day",
      label: isRtl ? "عيد الأب" : "Father's Day",
      icon: "👔",
    },
    { value: "eid", label: isRtl ? "عيد" : "Eid", icon: "🌙" },
    {
      value: "christmas",
      label: isRtl ? "عيد الميلاد" : "Christmas",
      icon: "🎄",
    },
    { value: "thank-you", label: isRtl ? "شكر" : "Thank You", icon: "🙏" },
    { value: "apology", label: isRtl ? "اعتذار" : "Apology", icon: "😔" },
    {
      value: "congratulations",
      label: isRtl ? "تهنئة" : "Congratulations",
      icon: "🎉",
    },
  ];

  const budgetRanges = [
    { value: "under-100", label: isRtl ? "أقل من 100 ر.س" : "Under 100 SAR" },
    { value: "100-300", label: isRtl ? "100-300 ر.س" : "100-300 SAR" },
    { value: "300-500", label: isRtl ? "300-500 ر.س" : "300-500 SAR" },
    { value: "500-1000", label: isRtl ? "500-1000 ر.س" : "500-1000 SAR" },
    { value: "over-1000", label: isRtl ? "أكثر من 1000 ر.س" : "Over 1000 SAR" },
    { value: "unlimited", label: isRtl ? "بدون تقييد" : "No Limit" },
  ];

  const interests = [
    {
      value: "art",
      label: isRtl ? "الفن" : "Art",
      icon: <Palette size={20} />,
    },
    {
      value: "music",
      label: isRtl ? "الموسيقى" : "Music",
      icon: <Music size={20} />,
    },
    {
      value: "reading",
      label: isRtl ? "القراءة" : "Reading",
      icon: <Book size={20} />,
    },
    {
      value: "cooking",
      label: isRtl ? "الطبخ" : "Cooking",
      icon: <Utensils size={20} />,
    },
    {
      value: "fashion",
      label: isRtl ? "الموضة" : "Fashion",
      icon: <Shirt size={20} />,
    },
    {
      value: "technology",
      label: isRtl ? "التكنولوجيا" : "Technology",
      icon: <Gamepad2 size={20} />,
    },
    {
      value: "sports",
      label: isRtl ? "الرياضة" : "Sports",
      icon: <Dumbbell size={20} />,
    },
    {
      value: "travel",
      label: isRtl ? "السفر" : "Travel",
      icon: <Plane size={20} />,
    },
    {
      value: "photography",
      label: isRtl ? "التصوير" : "Photography",
      icon: <Camera size={20} />,
    },
    {
      value: "gardening",
      label: isRtl ? "البستنة" : "Gardening",
      icon: <Flower size={20} />,
    },
    {
      value: "coffee",
      label: isRtl ? "القهوة" : "Coffee",
      icon: <Coffee size={20} />,
    },
    {
      value: "jewelry",
      label: isRtl ? "المجوهرات" : "Jewelry",
      icon: <Gem size={20} />,
    },
    {
      value: "home-decor",
      label: isRtl ? "ديكور المنزل" : "Home Decor",
      icon: <Home size={20} />,
    },
    {
      value: "beauty",
      label: isRtl ? "الجمال" : "Beauty",
      icon: <Sparkles size={20} />,
    },
    {
      value: "wellness",
      label: isRtl ? "العافية" : "Wellness",
      icon: <Heart size={20} />,
    },
    {
      value: "pets",
      label: isRtl ? "الحيوانات الأليفة" : "Pets",
      icon: <PawPrint size={20} />,
    },
  ];

  const personalityTypes = [
    {
      value: "romantic",
      label: isRtl ? "رومانسي" : "Romantic",
      icon: "💕",
      color: "from-pink-500 to-rose-500",
    },
    {
      value: "creative",
      label: isRtl ? "إبداعي" : "Creative",
      icon: "🎨",
      color: "from-purple-500 to-indigo-500",
    },
    {
      value: "classic",
      label: isRtl ? "كلاسيكي" : "Classic",
      icon: "👑",
      color: "from-amber-500 to-yellow-500",
    },
    {
      value: "modern",
      label: isRtl ? "عصري" : "Modern",
      icon: "⚡",
      color: "from-blue-500 to-cyan-500",
    },
    {
      value: "adventurous",
      label: isRtl ? "مغامر" : "Adventurous",
      icon: "🌟",
      color: "from-green-500 to-teal-500",
    },
    {
      value: "practical",
      label: isRtl ? "عملي" : "Practical",
      icon: "🎯",
      color: "from-gray-500 to-slate-500",
    },
  ];

  const giftTypes = [
    {
      value: "physical",
      label: isRtl ? "هدية مادية" : "Physical Gift",
      icon: <Gift size={20} />,
    },
    {
      value: "experience",
      label: isRtl ? "تجربة" : "Experience",
      icon: <Star size={20} />,
    },
    {
      value: "voucher",
      label: isRtl ? "قسيمة" : "Voucher",
      icon: <Tag size={20} />,
    },
    {
      value: "subscription",
      label: isRtl ? "اشتراك" : "Subscription",
      icon: <RefreshCw size={20} />,
    },
  ];

  const handleInputChange = (
    field: keyof FormData,
    value: string | string[]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleInterest = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const analyzeGifts = async () => {
    setIsAnalyzing(true);

    // Simulate analysis delay
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Determine style based on personality and occasion
    let style: AnalysisResult["style"] = "modern";
    if (
      formData.personalityType === "romantic" ||
      formData.occasion === "valentine" ||
      formData.occasion === "anniversary"
    ) {
      style = "romantic";
    } else if (
      formData.personalityType === "creative" ||
      formData.interests.includes("art")
    ) {
      style = "creative";
    } else if (
      formData.personalityType === "classic" ||
      formData.relationship === "parent"
    ) {
      style = "classic";
    } else {
      style = "modern";
    }

    // Filter products based on form data
    let filteredProducts = allProducts.filter((product) => {
      // Budget filter
      if (formData.budget && formData.budget !== "unlimited") {
        const [min, max] = formData.budget.split("-").map((p) => {
          if (p === "under") return 0;
          if (p === "over") return Infinity;
          return parseInt(p);
        });
        if (product.price < min || product.price > max) return false;
      }

      // Occasion filter
      if (formData.occasion && product.occasionId) {
        const occasionMap: { [key: string]: string } = {
          birthday: "birthdays",
          anniversary: "anniversary",
          wedding: "wedding",
          graduation: "graduation",
          valentine: "valentines-day",
          "mother-day": "mothers-day",
          eid: "eid-adha",
          "thank-you": "thank-you",
        };
        if (product.occasionId !== occasionMap[formData.occasion]) return false;
      }

      // Interest-based category filter
      if (formData.interests.length > 0) {
        const interestCategoryMap: { [key: string]: string[] } = {
          art: ["vases", "plants"],
          beauty: ["beauty-care", "personal-care"],
          jewelry: ["jewelry"],
          "home-decor": ["vases", "plants"],
          wellness: ["personal-care"],
          fashion: ["jewelry", "perfumes"],
        };

        const relevantCategories = formData.interests.flatMap(
          (interest) => interestCategoryMap[interest] || []
        );

        if (relevantCategories.length > 0 && product.categoryId) {
          if (!relevantCategories.includes(product.categoryId)) return false;
        }
      }

      return true;
    });

    // If no products match, show all special gifts
    if (filteredProducts.length === 0) {
      filteredProducts = allProducts.filter((p) => p.isSpecialGift);
    }

    // Sort by relevance
    filteredProducts = filteredProducts
      .sort((a, b) => {
        let scoreA = 0,
          scoreB = 0;

        // Boost special gifts and bestsellers
        if (a.isSpecialGift) scoreA += 2;
        if (a.isBestSeller) scoreA += 1;
        if (b.isSpecialGift) scoreB += 2;
        if (b.isBestSeller) scoreB += 1;

        return scoreB - scoreA;
      })
      .slice(0, 12);

    const result: AnalysisResult = {
      style,
      recommendations: filteredProducts,
      reasoning: generateReasoning(style, formData),
      confidence: Math.floor(Math.random() * 20) + 80, // 80-99%
    };

    setAnalysisResult(result);
    setIsAnalyzing(false);
    setShowResults(true);
  };

  const generateReasoning = (
    style: AnalysisResult["style"],
    data: FormData
  ): string => {
    const styleMessages = {
      romantic: {
        ar: `بناءً على تحليلنا، نرى أن ${data.recipientName} يستحق هدية رومانسية تعبر عن عمق المشاعر. الهدايا المختارة تحمل طابعاً رومانسياً كلاسيكياً يلامس القلب ويخلق ذكريات جميلة تدوم إلى الأبد.`,
        en: `Based on our analysis, we believe ${data.recipientName} deserves a romantic gift that expresses deep emotions. The selected gifts carry a classic romantic touch that touches the heart and creates beautiful memories that last forever.`,
      },
      creative: {
        ar: `تحليلنا يشير إلى أن ${data.recipientName} شخص مبدع يقدر الفن والجمال. الهدايا المقترحة تعكس روحاً إبداعية وتصميماً فنياً يلهم الخيال ويثري الحواس بتجربة استثنائية.`,
        en: `Our analysis indicates that ${data.recipientName} is a creative person who appreciates art and beauty. The suggested gifts reflect a creative spirit and artistic design that inspires imagination and enriches the senses with an exceptional experience.`,
      },
      classic: {
        ar: `نستنتج أن ${data.recipientName} يميل للأناقة الكلاسيكية والتقاليد العريقة. الهدايا المختارة تجسد الفخامة الخالدة والذوق الرفيع، مع لمسة من النبل والأصالة التي تعكس قيمة العلاقة المميزة.`,
        en: `We conclude that ${data.recipientName} leans towards classic elegance and noble traditions. The selected gifts embody timeless luxury and refined taste, with a touch of nobility and authenticity that reflects the value of this special relationship.`,
      },
      modern: {
        ar: `تحليلنا يكشف أن ${data.recipientName} شخص عصري يواكب أحدث الاتجاهات. الهدايا المقترحة تمزج بين التطور والأناقة المعاصرة، مع تصاميم مبتكرة تعكس روح العصر والتميز الحديث.`,
        en: `Our analysis reveals that ${data.recipientName} is a modern person who keeps up with the latest trends. The suggested gifts blend sophistication with contemporary elegance, featuring innovative designs that reflect the spirit of the times and modern distinction.`,
      },
    };

    return styleMessages[style][isRtl ? "ar" : "en"];
  };

  const getStyleTheme = (style: AnalysisResult["style"]) => {
    const themes = {
      romantic: {
        gradient: "from-pink-500 via-rose-500 to-red-500",
        bgGradient: "from-pink-50 to-rose-50",
        icon: "💕",
        title: isRtl ? "تحليل رومانسي" : "Romantic Analysis",
        accent: "text-pink-600",
        border: "border-pink-200",
      },
      creative: {
        gradient: "from-purple-500 via-indigo-500 to-blue-500",
        bgGradient: "from-purple-50 to-indigo-50",
        icon: "🎨",
        title: isRtl ? "تحليل إبداعي" : "Creative Analysis",
        accent: "text-purple-600",
        border: "border-purple-200",
      },
      classic: {
        gradient: "from-amber-500 via-yellow-500 to-orange-500",
        bgGradient: "from-amber-50 to-yellow-50",
        icon: "👑",
        title: isRtl ? "تحليل كلاسيكي" : "Classic Analysis",
        accent: "text-amber-600",
        border: "border-amber-200",
      },
      modern: {
        gradient: "from-blue-500 via-cyan-500 to-teal-500",
        bgGradient: "from-blue-50 to-cyan-50",
        icon: "⚡",
        title: isRtl ? "تحليل عصري" : "Modern Analysis",
        accent: "text-blue-600",
        border: "border-blue-200",
      },
    };
    return themes[style];
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return (
          formData.recipientName && formData.relationship && formData.occasion
        );
      case 2:
        return formData.budget && formData.interests.length > 0;
      case 3:
        return formData.personalityType && formData.giftType;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const resetForm = () => {
    setFormData({
      recipientName: "",
      relationship: "",
      occasion: "",
      budget: "",
      interests: [],
      personalityType: "",
      giftType: "",
      deliveryDate: "",
    });
    setCurrentStep(1);
    setAnalysisResult(null);
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8 font-serif text-neutral-800">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full mb-6 shadow-lg">
            <Wand2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium text-purple-800 leading-tight">
            {isRtl
              ? "مساعد اختيار الهدية المثالية"
              : "Perfect Gift Selection Assistant"}
          </h1>
          <p className="mt-2.5 text-sm sm:text-base max-w-xs sm:max-w-md md:max-w-lg mx-auto leading-relaxed text-gray-600">
            {isRtl
              ? "دعنا نساعدك في العثور على الهدية المثالية من خلال تحليل ذكي"
              : "Let us help you find the perfect gift through intelligent analysis"}
          </p>
        </motion.div>

        {!showResults ? (
          <>
            {/* Progress Bar */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="flex justify-center mb-4">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  {[1, 2, 3, 4].map((step) => (
                    <React.Fragment key={step}>
                      <motion.div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm transition-all duration-300 ${
                          currentStep >= step
                            ? "bg-purple-600 text-white shadow-md"
                            : "bg-gray-200 text-gray-500"
                        }`}
                        whileHover={{ scale: 1.1 }}
                        animate={
                          currentStep === step ? { scale: [1, 1.05, 1] } : {}
                        }
                        transition={{
                          duration: 0.6,
                          repeat: currentStep === step ? Infinity : 0,
                        }}
                      >
                        {currentStep > step ? <CheckCircle size={18} /> : step}
                      </motion.div>
                      {step < 4 && (
                        <div
                          className={`w-8 h-1 rounded-full transition-all duration-300 ${
                            currentStep > step ? "bg-purple-600" : "bg-gray-200"
                          }`}
                        />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  {isRtl ? "الخطوة" : "Step"} {currentStep}{" "}
                  {isRtl ? "من" : "of"} 4
                </p>
              </div>
            </motion.div>

            {/* Form Steps */}
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <AnimatePresence mode="wait">
                {/* Step 1: Basic Information */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: isRtl ? -30 : 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: isRtl ? 30 : -30 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-purple-800 mb-2">
                        {isRtl
                          ? "من هو الشخص المميز؟"
                          : "Who is the special person?"}
                      </h3>
                      <p className="text-gray-600">
                        {isRtl
                          ? "أخبرنا عن الشخص الذي تريد إهداءه"
                          : "Tell us about the person you want to gift"}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        <User
                          size={16}
                          className="inline mr-2 rtl:ml-2 rtl:mr-0"
                        />
                        {isRtl ? "اسم المستقبل" : "Recipient's Name"}
                      </label>
                      <input
                        type="text"
                        value={formData.recipientName}
                        onChange={(e) =>
                          handleInputChange("recipientName", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        placeholder={
                          isRtl ? "اسم الشخص المميز" : "Special person's name"
                        }
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        <Heart
                          size={16}
                          className="inline mr-2 rtl:ml-2 rtl:mr-0"
                        />
                        {isRtl ? "العلاقة" : "Relationship"}
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {relationships.map((rel) => (
                          <motion.button
                            key={rel.value}
                            type="button"
                            onClick={() =>
                              handleInputChange("relationship", rel.value)
                            }
                            className={`p-3 rounded-xl border transition-all duration-300 ${
                              formData.relationship === rel.value
                                ? "bg-purple-600 text-white border-purple-600 shadow-md"
                                : "border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-50"
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="text-2xl mb-2">{rel.icon}</div>
                            <div className="text-xs font-medium">
                              {rel.label}
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        <Calendar
                          size={16}
                          className="inline mr-2 rtl:ml-2 rtl:mr-0"
                        />
                        {isRtl ? "المناسبة" : "Occasion"}
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                        {occasions.map((occ) => (
                          <motion.button
                            key={occ.value}
                            type="button"
                            onClick={() =>
                              handleInputChange("occasion", occ.value)
                            }
                            className={`p-3 rounded-xl border transition-all duration-300 ${
                              formData.occasion === occ.value
                                ? "bg-purple-600 text-white border-purple-600 shadow-md"
                                : "border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-50"
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="text-xl mb-2">{occ.icon}</div>
                            <div className="text-xs font-medium">
                              {occ.label}
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Budget and Interests */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: isRtl ? -30 : 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: isRtl ? 30 : -30 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-purple-800 mb-2">
                        {isRtl ? "الميزانية والاهتمامات" : "Budget & Interests"}
                      </h3>
                      <p className="text-gray-600">
                        {isRtl
                          ? "حدد ميزانيتك واهتمامات الشخص"
                          : "Set your budget and the person's interests"}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        <DollarSign
                          size={16}
                          className="inline mr-2 rtl:ml-2 rtl:mr-0"
                        />
                        {isRtl ? "الميزانية" : "Budget"}
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {budgetRanges.map((budget) => (
                          <motion.button
                            key={budget.value}
                            type="button"
                            onClick={() =>
                              handleInputChange("budget", budget.value)
                            }
                            className={`p-4 rounded-xl border transition-all duration-300 ${
                              formData.budget === budget.value
                                ? "bg-purple-600 text-white border-purple-600 shadow-md"
                                : "border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-50"
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="text-sm font-medium">
                              {budget.label}
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        <Sparkles
                          size={16}
                          className="inline mr-2 rtl:ml-2 rtl:mr-0"
                        />
                        {isRtl ? "الاهتمامات" : "Interests"}
                        <span className="text-xs text-gray-500 mr-2 rtl:ml-2 rtl:mr-0">
                          (
                          {isRtl
                            ? "يمكن اختيار عدة خيارات"
                            : "Multiple selections allowed"}
                          )
                        </span>
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                        {interests.map((interest) => (
                          <motion.button
                            key={interest.value}
                            type="button"
                            onClick={() => toggleInterest(interest.value)}
                            className={`p-3 rounded-xl border transition-all duration-300 ${
                              formData.interests.includes(interest.value)
                                ? "bg-purple-600 text-white border-purple-600 shadow-md"
                                : "border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-50"
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="mb-2">{interest.icon}</div>
                            <div className="text-xs font-medium">
                              {interest.label}
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Personality and Gift Type */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: isRtl ? -30 : 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: isRtl ? 30 : -30 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-purple-800 mb-2">
                        {isRtl
                          ? "الشخصية ونوع الهدية"
                          : "Personality & Gift Type"}
                      </h3>
                      <p className="text-gray-600">
                        {isRtl
                          ? "ما نوع شخصية المستقبل؟"
                          : "What's the recipient's personality like?"}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        <Star
                          size={16}
                          className="inline mr-2 rtl:ml-2 rtl:mr-0"
                        />
                        {isRtl ? "نوع الشخصية" : "Personality Type"}
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {personalityTypes.map((type) => (
                          <motion.button
                            key={type.value}
                            type="button"
                            onClick={() =>
                              handleInputChange("personalityType", type.value)
                            }
                            className={`p-4 rounded-xl border transition-all duration-300 ${
                              formData.personalityType === type.value
                                ? `bg-gradient-to-r ${type.color} text-white border-transparent shadow-md`
                                : "border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-50"
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="text-2xl mb-2">{type.icon}</div>
                            <div className="text-sm font-medium">
                              {type.label}
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        <Gift
                          size={16}
                          className="inline mr-2 rtl:ml-2 rtl:mr-0"
                        />
                        {isRtl ? "نوع الهدية المفضل" : "Preferred Gift Type"}
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {giftTypes.map((type) => (
                          <motion.button
                            key={type.value}
                            type="button"
                            onClick={() =>
                              handleInputChange("giftType", type.value)
                            }
                            className={`p-4 rounded-xl border transition-all duration-300 ${
                              formData.giftType === type.value
                                ? "bg-purple-600 text-white border-purple-600 shadow-md"
                                : "border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-50"
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="mb-2">{type.icon}</div>
                            <div className="text-xs font-medium">
                              {type.label}
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        <Clock
                          size={16}
                          className="inline mr-2 rtl:ml-2 rtl:mr-0"
                        />
                        {isRtl
                          ? "تاريخ التسليم المطلوب"
                          : "Preferred Delivery Date"}
                        <span className="text-xs text-gray-500 mr-2 rtl:ml-2 rtl:mr-0">
                          ({isRtl ? "اختياري" : "Optional"})
                        </span>
                      </label>
                      <input
                        type="date"
                        value={formData.deliveryDate}
                        onChange={(e) =>
                          handleInputChange("deliveryDate", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Review and Analyze */}
                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: isRtl ? -30 : 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: isRtl ? 30 : -30 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-purple-800 mb-2">
                        {isRtl ? "مراجعة المعلومات" : "Review Information"}
                      </h3>
                      <p className="text-gray-600">
                        {isRtl
                          ? "تأكد من صحة المعلومات قبل التحليل"
                          : "Confirm the information before analysis"}
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-purple-800 mb-2">
                              {isRtl
                                ? "معلومات المستقبل"
                                : "Recipient Information"}
                            </h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">
                                  {isRtl ? "الاسم:" : "Name:"}
                                </span>
                                <span className="font-medium">
                                  {formData.recipientName}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">
                                  {isRtl ? "العلاقة:" : "Relationship:"}
                                </span>
                                <span className="font-medium">
                                  {
                                    relationships.find(
                                      (r) => r.value === formData.relationship
                                    )?.label
                                  }
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">
                                  {isRtl ? "المناسبة:" : "Occasion:"}
                                </span>
                                <span className="font-medium">
                                  {
                                    occasions.find(
                                      (o) => o.value === formData.occasion
                                    )?.label
                                  }
                                </span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold text-purple-800 mb-2">
                              {isRtl ? "التفضيلات" : "Preferences"}
                            </h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">
                                  {isRtl ? "الميزانية:" : "Budget:"}
                                </span>
                                <span className="font-medium">
                                  {
                                    budgetRanges.find(
                                      (b) => b.value === formData.budget
                                    )?.label
                                  }
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">
                                  {isRtl ? "الشخصية:" : "Personality:"}
                                </span>
                                <span className="font-medium">
                                  {
                                    personalityTypes.find(
                                      (p) =>
                                        p.value === formData.personalityType
                                    )?.label
                                  }
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">
                                  {isRtl ? "نوع الهدية:" : "Gift Type:"}
                                </span>
                                <span className="font-medium">
                                  {
                                    giftTypes.find(
                                      (g) => g.value === formData.giftType
                                    )?.label
                                  }
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-purple-800 mb-2">
                            {isRtl
                              ? "الاهتمامات المختارة"
                              : "Selected Interests"}
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {formData.interests.map((interestValue) => {
                              const interest = interests.find(
                                (i) => i.value === interestValue
                              );
                              return (
                                <span
                                  key={interestValue}
                                  className="inline-flex items-center gap-1 bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-medium"
                                >
                                  {interest?.icon}
                                  {interest?.label}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-center">
                      <motion.button
                        onClick={analyzeGifts}
                        disabled={isAnalyzing}
                        className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {isAnalyzing ? (
                          <>
                            <motion.div
                              className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                            />
                            <span>
                              {isRtl ? "جاري التحليل..." : "Analyzing..."}
                            </span>
                          </>
                        ) : (
                          <>
                            <Wand2 size={24} />
                            <span>
                              {isRtl ? "تحليل النتائج" : "Analyze Results"}
                            </span>
                            {isRtl ? (
                              <ArrowLeft size={20} />
                            ) : (
                              <ArrowRight size={20} />
                            )}
                          </>
                        )}
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              {currentStep < 4 && (
                <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                  <motion.button
                    type="button"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                      currentStep === 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                    whileHover={currentStep > 1 ? { scale: 1.02 } : {}}
                    whileTap={currentStep > 1 ? { scale: 0.98 } : {}}
                  >
                    {isRtl ? (
                      <ArrowRight size={18} className="inline mr-2" />
                    ) : (
                      <ArrowLeft size={18} className="inline mr-2" />
                    )}
                    {isRtl ? "السابق" : "Previous"}
                  </motion.button>

                  <motion.button
                    type="button"
                    onClick={nextStep}
                    disabled={!isStepValid()}
                    className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                      isStepValid()
                        ? "bg-purple-600 text-white hover:bg-purple-700 shadow-md"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                    whileHover={isStepValid() ? { scale: 1.02 } : {}}
                    whileTap={isStepValid() ? { scale: 0.98 } : {}}
                  >
                    {isRtl ? "التالي" : "Next"}
                    {isRtl ? (
                      <ArrowLeft size={18} className="inline ml-2" />
                    ) : (
                      <ArrowRight size={18} className="inline ml-2" />
                    )}
                  </motion.button>
                </div>
              )}
            </motion.div>
          </>
        ) : (
          /* Results Section */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {analysisResult && (
              <>
                {/* Analysis Header */}
                <div
                  className={`bg-gradient-to-br ${
                    getStyleTheme(analysisResult.style).bgGradient
                  } rounded-2xl p-8 border ${
                    getStyleTheme(analysisResult.style).border
                  } shadow-lg`}
                >
                  <div className="text-center mb-6">
                    <div className="text-6xl mb-4">
                      {getStyleTheme(analysisResult.style).icon}
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">
                      {getStyleTheme(analysisResult.style).title}
                    </h2>
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <div className="flex items-center gap-1">
                        <Target
                          size={16}
                          className={getStyleTheme(analysisResult.style).accent}
                        />
                        <span className="text-sm font-medium text-gray-700">
                          {isRtl ? "دقة التحليل:" : "Analysis Accuracy:"}
                        </span>
                      </div>
                      <div
                        className={`px-3 py-1 rounded-full bg-gradient-to-r ${
                          getStyleTheme(analysisResult.style).gradient
                        } text-white font-bold text-sm`}
                      >
                        {analysisResult.confidence}%
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/50">
                    <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                      <TrendingUp
                        size={18}
                        className={getStyleTheme(analysisResult.style).accent}
                      />
                      {isRtl ? "تحليل شخصي مخصص" : "Personalized Analysis"}
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-base">
                      {analysisResult.reasoning}
                    </p>
                  </div>

                  <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 text-center">
                      <Award
                        size={24}
                        className={`mx-auto mb-2 ${
                          getStyleTheme(analysisResult.style).accent
                        }`}
                      />
                      <div className="font-bold text-gray-800 text-lg">
                        {analysisResult.recommendations.length}
                      </div>
                      <div className="text-sm text-gray-600">
                        {isRtl ? "هدية مقترحة" : "Suggested Gifts"}
                      </div>
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 text-center">
                      <Zap
                        size={24}
                        className={`mx-auto mb-2 ${
                          getStyleTheme(analysisResult.style).accent
                        }`}
                      />
                      <div className="font-bold text-gray-800 text-lg">
                        {analysisResult.style}
                      </div>
                      <div className="text-sm text-gray-600">
                        {isRtl ? "نمط الهدية" : "Gift Style"}
                      </div>
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 text-center">
                      <CheckCircle
                        size={24}
                        className={`mx-auto mb-2 ${
                          getStyleTheme(analysisResult.style).accent
                        }`}
                      />
                      <div className="font-bold text-gray-800 text-lg">
                        {analysisResult.confidence}%
                      </div>
                      <div className="text-sm text-gray-600">
                        {isRtl ? "دقة التطابق" : "Match Accuracy"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recommended Products */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full bg-gradient-to-r ${
                          getStyleTheme(analysisResult.style).gradient
                        } flex items-center justify-center`}
                      >
                        <Gift className="w-5 h-5 text-white" />
                      </div>
                      {isRtl ? "الهدايا المقترحة" : "Recommended Gifts"}
                    </h3>
                    <div className="text-sm text-gray-600">
                      {analysisResult.recommendations.length}{" "}
                      {isRtl ? "هدية" : "gifts"}
                    </div>
                  </div>

                  {analysisResult.recommendations.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {analysisResult.recommendations.map((product, index) => (
                        <motion.div
                          key={product.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="group bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300"
                        >
                          <div className="relative aspect-square overflow-hidden">
                            <ProductImage
                              src={product.imageUrl}
                              alt={isRtl ? product.nameAr : product.nameEn}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              width={240}
                              height={240}
                              aspectRatio="square"
                              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                              quality={100}
                              priority={index < 4}
                              showZoom={false}
                              placeholderSize={28}
                            />
                            <div className="absolute top-2 left-2 flex flex-col gap-1">
                              {product.isBestSeller && (
                                <span className="bg-amber-100 text-amber-800 text-xs font-bold py-0.5 px-1.5 rounded-full flex items-center gap-1 shadow-sm">
                                  <Crown size={10} />
                                  {isRtl ? "الأكثر مبيعاً" : "Best Seller"}
                                </span>
                              )}
                              {product.isSpecialGift && (
                                <span className="bg-purple-100 text-purple-800 text-xs font-bold py-0.5 px-1.5 rounded-full flex items-center gap-1 shadow-sm">
                                  <Sparkles size={10} />
                                  {isRtl ? "مميز" : "Special"}
                                </span>
                              )}
                            </div>
                            <div className="absolute top-2 right-2">
                              <FavoriteButton
                                product={product}
                                className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300"
                                size={16}
                              />
                            </div>
                          </div>
                          <div className="p-4">
                            <Link to={`/product/${product.id}`}>
                              <h4 className="font-bold text-gray-800 hover:text-purple-600 transition-colors line-clamp-2 mb-2 text-sm">
                                {isRtl ? product.nameAr : product.nameEn}
                              </h4>
                            </Link>
                            <div className="flex items-center justify-between mb-3">
                              <p className="text-lg font-bold text-purple-700">
                                {product.price} {isRtl ? "ر.س" : "SAR"}
                              </p>
                              <div
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  getStyleTheme(analysisResult.style)
                                    .gradient.replace("from-", "bg-")
                                    .replace("via-", "")
                                    .replace("to-", "")
                                    .split(" ")[0]
                                } text-white`}
                              >
                                {Math.floor(Math.random() * 20) + 80}%{" "}
                                {isRtl ? "تطابق" : "Match"}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <AddToCartButton
                                product={product}
                                variant="primary"
                                size="sm"
                                className="flex-1 text-xs"
                                showLabel={true}
                              />
                              <Link
                                to={`/product/${product.id}`}
                                className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all flex items-center justify-center"
                              >
                                <Eye size={16} />
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search size={32} className="text-gray-400" />
                      </div>
                      <h4 className="text-lg font-bold text-gray-800 mb-2">
                        {isRtl
                          ? "لم نجد هدايا مناسبة"
                          : "No Suitable Gifts Found"}
                      </h4>
                      <p className="text-gray-600 mb-6">
                        {isRtl
                          ? "جرب تعديل المعايير أو توسيع نطاق البحث"
                          : "Try adjusting the criteria or expanding the search scope"}
                      </p>
                      <button
                        onClick={resetForm}
                        className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition-all"
                      >
                        <RefreshCw size={18} />
                        {isRtl ? "بحث جديد" : "New Search"}
                      </button>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={resetForm}
                    className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-200 transition-all font-medium"
                  >
                    <RefreshCw size={18} />
                    {isRtl ? "بحث جديد" : "New Search"}
                  </button>
                  <Link
                    to="/categories"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg font-medium"
                  >
                    <ShoppingBag size={18} />
                    {isRtl ? "تصفح المزيد" : "Browse More"}
                    {isRtl ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
                  </Link>
                </div>
              </>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default GiftAssistantPage;
