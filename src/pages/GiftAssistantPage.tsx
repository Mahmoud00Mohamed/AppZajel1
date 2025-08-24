import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  Wand2,
  Heart,
  Gift,
  CheckCircle,
  Star,
  User,
  Clock,
  RefreshCw,
  Award,
  Target,
  ChevronRight,
  ChevronLeft,
  TrendingUp,
  Lightbulb,
  Calendar,
  Users,
  DollarSign,
  Share2,
  Eye,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { allProducts } from "../data";
import { ProductImage } from "../features/images";
import AddToCartButton from "../components/ui/AddToCartButton";
import FavoriteButton from "../components/ui/FavoriteButton";

interface FormData {
  occasion: string;
  relationship: string;
  interests: string[];
  budget: string;
  age: string;
  gender: string;
  personality: string;
}

interface SuggestionResult {
  products: typeof allProducts;
  reasoning: string;
  confidence: number;
  matchScore: number;
  personalizedMessage: string;
}

const GiftAssistantPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  const [currentStep, setCurrentStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [suggestions, setSuggestions] = useState<SuggestionResult | null>(null);

  const [formData, setFormData] = useState<FormData>({
    occasion: "",
    relationship: "",
    interests: [],
    budget: "",
    age: "",
    gender: "",
    personality: "",
  });

  const occasions = [
    {
      id: "birthday",
      nameAr: "عيد ميلاد",
      nameEn: "Birthday",
      icon: "🎂",
      weight: 1.0,
      categories: ["chocolate-cake", "balloons", "flowers", "jewelry"],
      color: "from-pink-500 to-rose-500",
    },
    {
      id: "anniversary",
      nameAr: "ذكرى سنوية",
      nameEn: "Anniversary",
      icon: "💕",
      weight: 1.0,
      categories: ["jewelry", "flowers", "perfumes", "coupons"],
      color: "from-red-500 to-pink-500",
    },
    {
      id: "wedding",
      nameAr: "زفاف",
      nameEn: "Wedding",
      icon: "💍",
      weight: 1.0,
      categories: ["jewelry", "vases", "flowers", "coupons"],
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "graduation",
      nameAr: "التخرج",
      nameEn: "Graduation",
      icon: "🎓",
      weight: 1.0,
      categories: ["jewelry", "plants", "coupons", "perfumes"],
      color: "from-blue-500 to-indigo-500",
    },
    {
      id: "mothers-day",
      nameAr: "عيد الأم",
      nameEn: "Mother's Day",
      icon: "🌸",
      weight: 1.0,
      categories: ["flowers", "beauty-care", "jewelry", "perfumes"],
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "valentines-day",
      nameAr: "عيد الحب",
      nameEn: "Valentine's Day",
      icon: "❤️",
      weight: 1.0,
      categories: ["flowers", "jewelry", "chocolate-cake", "perfumes"],
      color: "from-red-500 to-pink-500",
    },
    {
      id: "thank-you",
      nameAr: "شكر وتقدير",
      nameEn: "Thank You",
      icon: "🙏",
      weight: 0.8,
      categories: ["flowers", "personal-care", "chocolate-cake", "plants"],
      color: "from-yellow-500 to-orange-500",
    },
    {
      id: "eid",
      nameAr: "عيد",
      nameEn: "Eid",
      icon: "🌙",
      weight: 1.0,
      categories: ["perfumes", "coupons", "chocolate-cake", "jewelry"],
      color: "from-indigo-500 to-purple-500",
    },
  ];

  const relationships = [
    {
      id: "spouse",
      nameAr: "الزوج/الزوجة",
      nameEn: "Spouse",
      icon: "💑",
      intimacyLevel: 5,
      budgetMultiplier: 1.3,
    },
    {
      id: "parent",
      nameAr: "الوالدين",
      nameEn: "Parent",
      icon: "👨‍👩‍👧‍👦",
      intimacyLevel: 5,
      budgetMultiplier: 1.2,
    },
    {
      id: "child",
      nameAr: "الأطفال",
      nameEn: "Child",
      icon: "👶",
      intimacyLevel: 5,
      budgetMultiplier: 1.0,
    },
    {
      id: "sibling",
      nameAr: "الأشقاء",
      nameEn: "Sibling",
      icon: "👫",
      intimacyLevel: 4,
      budgetMultiplier: 1.0,
    },
    {
      id: "friend",
      nameAr: "صديق",
      nameEn: "Friend",
      icon: "👥",
      intimacyLevel: 3,
      budgetMultiplier: 0.8,
    },
    {
      id: "colleague",
      nameAr: "زميل عمل",
      nameEn: "Colleague",
      icon: "💼",
      intimacyLevel: 2,
      budgetMultiplier: 0.7,
    },
    {
      id: "relative",
      nameAr: "قريب",
      nameEn: "Relative",
      icon: "👪",
      intimacyLevel: 3,
      budgetMultiplier: 0.9,
    },
  ];

  const interests = [
    {
      id: "beauty",
      nameAr: "الجمال والعناية",
      nameEn: "Beauty & Care",
      icon: "💄",
      categories: ["beauty-care", "personal-care"],
      weight: 1.0,
    },
    {
      id: "fashion",
      nameAr: "الموضة والأناقة",
      nameEn: "Fashion & Style",
      icon: "👗",
      categories: ["jewelry", "perfumes"],
      weight: 1.0,
    },
    {
      id: "home",
      nameAr: "المنزل والديكور",
      nameEn: "Home & Decor",
      icon: "🏠",
      categories: ["vases", "plants"],
      weight: 0.9,
    },
    {
      id: "food",
      nameAr: "الطعام والحلويات",
      nameEn: "Food & Sweets",
      icon: "🍰",
      categories: ["chocolate-cake"],
      weight: 0.8,
    },
    {
      id: "flowers",
      nameAr: "الزهور والطبيعة",
      nameEn: "Flowers & Nature",
      icon: "🌺",
      categories: ["flowers", "plants"],
      weight: 1.0,
    },
    {
      id: "luxury",
      nameAr: "الفخامة والرفاهية",
      nameEn: "Luxury & Premium",
      icon: "💎",
      categories: ["jewelry", "perfumes"],
      weight: 1.2,
    },
    {
      id: "experiences",
      nameAr: "التجارب والذكريات",
      nameEn: "Experiences & Memories",
      icon: "🎫",
      categories: ["coupons"],
      weight: 0.9,
    },
    {
      id: "celebration",
      nameAr: "الاحتفالات والمرح",
      nameEn: "Celebration & Fun",
      icon: "🎉",
      categories: ["balloons", "party-favors"],
      weight: 0.8,
    },
  ];

  const budgetRanges = [
    {
      id: "budget-low",
      nameAr: "أقل من 200 ر.س",
      nameEn: "Under 200 SAR",
      min: 0,
      max: 200,
      weight: 0.8,
    },
    {
      id: "budget-medium",
      nameAr: "200 - 500 ر.س",
      nameEn: "200 - 500 SAR",
      min: 200,
      max: 500,
      weight: 1.0,
    },
    {
      id: "budget-high",
      nameAr: "500 - 1000 ر.س",
      nameEn: "500 - 1000 SAR",
      min: 500,
      max: 1000,
      weight: 1.2,
    },
    {
      id: "budget-premium",
      nameAr: "أكثر من 1000 ر.س",
      nameEn: "Over 1000 SAR",
      min: 1000,
      max: 10000,
      weight: 1.5,
    },
  ];

  const ageGroups = [
    {
      id: "child",
      nameAr: "طفل (أقل من 12)",
      nameEn: "Child (Under 12)",
      preferences: ["balloons", "chocolate-cake"],
    },
    {
      id: "teen",
      nameAr: "مراهق (12-18)",
      nameEn: "Teen (12-18)",
      preferences: ["jewelry", "perfumes"],
    },
    {
      id: "young-adult",
      nameAr: "شاب (18-30)",
      nameEn: "Young Adult (18-30)",
      preferences: ["jewelry", "perfumes", "flowers"],
    },
    {
      id: "adult",
      nameAr: "بالغ (30-50)",
      nameEn: "Adult (30-50)",
      preferences: ["jewelry", "perfumes", "beauty-care", "coupons"],
    },
    {
      id: "senior",
      nameAr: "كبير السن (50+)",
      nameEn: "Senior (50+)",
      preferences: ["flowers", "plants", "personal-care"],
    },
  ];

  const personalities = [
    {
      id: "romantic",
      nameAr: "رومانسي",
      nameEn: "Romantic",
      icon: "💕",
      categories: ["flowers", "jewelry", "perfumes"],
      weight: 1.2,
    },
    {
      id: "practical",
      nameAr: "عملي",
      nameEn: "Practical",
      icon: "🎯",
      categories: ["coupons", "personal-care", "plants"],
      weight: 1.0,
    },
    {
      id: "creative",
      nameAr: "مبدع",
      nameEn: "Creative",
      icon: "🎨",
      categories: ["vases", "plants", "jewelry"],
      weight: 1.1,
    },
    {
      id: "elegant",
      nameAr: "أنيق",
      nameEn: "Elegant",
      icon: "✨",
      categories: ["jewelry", "perfumes", "vases"],
      weight: 1.3,
    },
    {
      id: "fun-loving",
      nameAr: "محب للمرح",
      nameEn: "Fun-loving",
      icon: "🎊",
      categories: ["balloons", "party-favors", "chocolate-cake"],
      weight: 0.9,
    },
    {
      id: "sophisticated",
      nameAr: "راقي",
      nameEn: "Sophisticated",
      icon: "🎩",
      categories: ["jewelry", "perfumes", "beauty-care"],
      weight: 1.4,
    },
  ];

  // خوارزمية تحليل ذكية محسنة
  const analyzeAndSuggest = async () => {
    setIsAnalyzing(true);
    await new Promise((resolve) => setTimeout(resolve, 2500));

    let filteredProducts = [...allProducts];
    let reasoning = "";
    let confidence = 70;
    let matchScore = 0;
    let personalizedMessage = "";

    // 1. تصفية حسب المناسبة (أولوية عالية)
    const selectedOccasion = occasions.find((o) => o.id === formData.occasion);
    if (selectedOccasion) {
      const occasionProducts = filteredProducts.filter(
        (product) =>
          product.occasionId === formData.occasion ||
          selectedOccasion.categories.includes(product.categoryId)
      );

      if (occasionProducts.length > 0) {
        filteredProducts = occasionProducts;
        confidence += 15;
        matchScore += selectedOccasion.weight * 25;
        reasoning += isRtl
          ? `تم اختيار منتجات مناسبة لمناسبة ${selectedOccasion.nameAr}. `
          : `Selected products suitable for ${selectedOccasion.nameEn} occasion. `;
      }
    }

    // 2. تحليل العلاقة وتأثيرها على نوع الهدية
    const selectedRelationship = relationships.find(
      (r) => r.id === formData.relationship
    );
    if (selectedRelationship) {
      confidence += selectedRelationship.intimacyLevel * 2;
      matchScore += selectedRelationship.intimacyLevel * 5;

      // تعديل الميزانية حسب العلاقة
      const budgetRange = budgetRanges.find((b) => b.id === formData.budget);
      if (budgetRange) {
        const adjustedMin =
          budgetRange.min * selectedRelationship.budgetMultiplier;
        const adjustedMax =
          budgetRange.max * selectedRelationship.budgetMultiplier;

        filteredProducts = filteredProducts.filter(
          (product) =>
            product.price >= adjustedMin && product.price <= adjustedMax
        );
      }
    }

    // 3. تصفية حسب الاهتمامات مع نظام الأوزان
    if (formData.interests.length > 0) {
      const interestCategories = formData.interests.flatMap((interestId) => {
        const interest = interests.find((i) => i.id === interestId);
        return interest ? interest.categories : [];
      });

      if (interestCategories.length > 0) {
        const interestProducts = filteredProducts.filter((product) =>
          interestCategories.includes(product.categoryId)
        );

        if (interestProducts.length > 0) {
          filteredProducts = interestProducts;
          confidence += formData.interests.length * 5;
          matchScore += formData.interests.length * 10;
        }
      }
    }

    // 4. تصفية حسب الميزانية
    const budgetRange = budgetRanges.find((b) => b.id === formData.budget);
    if (budgetRange) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.price >= budgetRange.min && product.price <= budgetRange.max
      );
      confidence += 10;
      matchScore += budgetRange.weight * 15;
    }

    // 5. تحليل الشخصية والعمر
    const selectedPersonality = personalities.find(
      (p) => p.id === formData.personality
    );

    if (selectedPersonality) {
      const personalityProducts = filteredProducts.filter((product) =>
        selectedPersonality.categories.includes(product.categoryId)
      );

      if (personalityProducts.length > 0) {
        filteredProducts = personalityProducts;
        confidence += 8;
        matchScore += selectedPersonality.weight * 12;
      }
    }

    // 6. ترتيب ذكي للمنتجات
    filteredProducts.sort((a, b) => {
      let scoreA = 0;
      let scoreB = 0;

      // نقاط للمنتجات المميزة والأكثر مبيعاً
      if (a.isBestSeller) scoreA += 20;
      if (a.isSpecialGift) scoreA += 15;
      if (b.isBestSeller) scoreB += 20;
      if (b.isSpecialGift) scoreB += 15;

      // نقاط للمطابقة مع المناسبة
      if (a.occasionId === formData.occasion) scoreA += 30;
      if (b.occasionId === formData.occasion) scoreB += 30;

      // نقاط للمطابقة مع الاهتمامات
      const interestCategories = formData.interests.flatMap(
        (interestId) =>
          interests.find((i) => i.id === interestId)?.categories || []
      );
      if (interestCategories.includes(a.categoryId)) scoreA += 25;
      if (interestCategories.includes(b.categoryId)) scoreB += 25;

      // نقاط للمطابقة مع الشخصية
      if (selectedPersonality?.categories.includes(a.categoryId)) scoreA += 20;
      if (selectedPersonality?.categories.includes(b.categoryId)) scoreB += 20;

      return scoreB - scoreA;
    });

    // 7. أخذ أفضل 8 منتجات
    const topProducts = filteredProducts.slice(0, 8);

    // 8. إنشاء رسالة شخصية
    if (selectedOccasion && selectedRelationship) {
      personalizedMessage = isRtl
        ? `بناءً على اختياراتك، وجدنا هدايا مثالية لمناسبة ${selectedOccasion.nameAr} لـ${selectedRelationship.nameAr}. هذه الاقتراحات مصممة خصيصاً لتناسب ذوقهم وتترك انطباعاً رائعاً.`
        : `Based on your choices, we found perfect gifts for ${selectedOccasion.nameEn} for your ${selectedRelationship.nameEn}. These suggestions are specially curated to match their taste and leave a wonderful impression.`;
    }

    // 9. التعامل مع عدم وجود نتائج
    if (topProducts.length === 0) {
      const fallbackProducts = allProducts
        .filter((p) => p.isSpecialGift || p.isBestSeller)
        .slice(0, 6);

      setSuggestions({
        products: fallbackProducts,
        reasoning: isRtl
          ? "لم نجد منتجات تطابق معاييرك بالضبط، لكن إليك مجموعة من أفضل هداياناالمميزة التي قد تعجبك."
          : "We couldn't find products that exactly match your criteria, but here are some of our best special gifts you might like.",
        confidence: 50,
        matchScore: 30,
        personalizedMessage: isRtl
          ? "نعتذر عن عدم العثور على مطابقة مثالية، لكن هذه الهدايا المختارة بعناية قد تكون خياراً رائعاً."
          : "We apologize for not finding a perfect match, but these carefully selected gifts might be a great choice.",
      });
    } else {
      // حساب نقاط المطابقة النهائية
      const finalMatchScore = Math.min(matchScore, 100);
      const finalConfidence = Math.min(confidence, 95);

      setSuggestions({
        products: topProducts,
        reasoning:
          reasoning ||
          (isRtl
            ? "تم اختيار هذه المنتجات بناءً على تحليل شامل لتفضيلاتك."
            : "These products were selected based on comprehensive analysis of your preferences."),
        confidence: finalConfidence,
        matchScore: finalMatchScore,
        personalizedMessage,
      });
    }

    setIsAnalyzing(false);
    setShowResults(true);
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.occasion !== "" && formData.relationship !== "";
      case 2:
        return formData.interests.length > 0 && formData.budget !== "";
      case 3:
        return formData.age !== "" && formData.gender !== "";
      case 4:
        return formData.personality !== "";
      default:
        return false;
    }
  };

  const toggleInterest = (interestId: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter((id) => id !== interestId)
        : [...prev.interests, interestId],
    }));
  };

  const resetForm = () => {
    setFormData({
      occasion: "",
      relationship: "",
      interests: [],
      budget: "",
      age: "",
      gender: "",
      personality: "",
    });
    setCurrentStep(1);
    setShowResults(false);
    setSuggestions(null);
  };

  useEffect(() => {
    document.title = isRtl
      ? "مساعد اختيار الهدية المثالية | زاجل السعادة"
      : "Perfect Gift Assistant | Zajil Al-Sa'adah";
  }, [isRtl]);

  if (showResults && suggestions) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        {/* Header */}
        <div className="bg-white border-b border-gray-100 shadow-sm">
          <div className="container-custom py-8 md:py-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mb-6 shadow-lg">
                <CheckCircle size={32} className="text-white" />
              </div>
              <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
                {isRtl
                  ? "اقتراحاتك الشخصية جاهزة!"
                  : "Your Personal Suggestions Are Ready!"}
              </h1>
              <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-gray-600">
                <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                  <Target size={16} className="text-emerald-600" />
                  <span className="font-medium text-sm">
                    {suggestions.matchScore}% {isRtl ? "مطابقة" : "Match"}
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                  <TrendingUp size={16} className="text-blue-600" />
                  <span className="font-medium text-sm">
                    {suggestions.confidence}% {isRtl ? "دقة" : "Accuracy"}
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                  <Gift size={16} className="text-purple-600" />
                  <span className="font-medium text-sm">
                    {suggestions.products.length}{" "}
                    {isRtl ? "اقتراح" : "Suggestions"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container-custom py-8 md:py-12">
          {/* Analysis Summary */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 mb-8 md:mb-12">
            <div className="flex flex-col md:flex-row md:items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Lightbulb size={24} className="text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                  {isRtl ? "تحليل اختياراتك" : "Analysis of Your Choices"}
                </h2>
                <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                  {suggestions.personalizedMessage}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
              <div className="text-center p-3 md:p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                <Calendar size={20} className="text-blue-600 mx-auto mb-2" />
                <div className="text-xs md:text-sm font-medium text-gray-800">
                  {
                    occasions.find((o) => o.id === formData.occasion)?.[
                      isRtl ? "nameAr" : "nameEn"
                    ]
                  }
                </div>
              </div>
              <div className="text-center p-3 md:p-4 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl border border-pink-100">
                <Users size={20} className="text-pink-600 mx-auto mb-2" />
                <div className="text-xs md:text-sm font-medium text-gray-800">
                  {
                    relationships.find((r) => r.id === formData.relationship)?.[
                      isRtl ? "nameAr" : "nameEn"
                    ]
                  }
                </div>
              </div>
              <div className="text-center p-3 md:p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border border-purple-100">
                <Heart size={20} className="text-purple-600 mx-auto mb-2" />
                <div className="text-xs md:text-sm font-medium text-gray-800">
                  {formData.interests.length} {isRtl ? "اهتمام" : "Interests"}
                </div>
              </div>
              <div className="text-center p-3 md:p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
                <DollarSign size={20} className="text-green-600 mx-auto mb-2" />
                <div className="text-xs md:text-sm font-medium text-gray-800">
                  {
                    budgetRanges.find((b) => b.id === formData.budget)?.[
                      isRtl ? "nameAr" : "nameEn"
                    ]
                  }
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
              <button
                onClick={resetForm}
                className="flex items-center justify-center gap-2 px-4 md:px-6 py-3 bg-gray-100 text-gray-700 rounded-xl border border-gray-200 transition-colors text-sm md:text-base"
              >
                <RefreshCw size={16} />
                {isRtl ? "بحث جديد" : "New Search"}
              </button>
              <button className="flex items-center justify-center gap-2 px-4 md:px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl shadow-lg transition-all text-sm md:text-base">
                <Share2 size={16} />
                {isRtl ? "مشاركة النتائج" : "Share Results"}
              </button>
            </div>
          </div>

          {/* Suggested Products */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {suggestions.products.map((product, index) => (
              <div
                key={product.id}
                className="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300"
              >
                <div className="relative aspect-square overflow-hidden">
                  <ProductImage
                    src={product.imageUrl}
                    alt={isRtl ? product.nameAr : product.nameEn}
                    className="w-full h-full object-cover transition-transform duration-300"
                    width={300}
                    height={300}
                    aspectRatio="square"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 300px"
                    quality={85}
                    priority={index < 8}
                    showZoom={false}
                  />

                  {/* شارة الاقتراح الذكي */}
                  <div className="absolute top-3 left-3 rtl:right-3 rtl:left-auto">
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs font-bold py-1.5 px-3 rounded-full flex items-center gap-1 shadow-lg">
                      <Wand2 size={10} />
                      {isRtl ? "اقتراح ذكي" : "Smart Pick"}
                    </div>
                  </div>

                  {/* أزرار التفاعل */}
                  <div className="absolute top-3 right-3 rtl:left-3 rtl:right-auto flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <FavoriteButton
                      product={product}
                      className="w-10 h-10 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200"
                      size={16}
                    />
                    <Link
                      to={`/product/${product.id}`}
                      className="w-10 h-10 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 flex items-center justify-center text-gray-700 transition-colors"
                    >
                      <Eye size={16} />
                    </Link>
                  </div>

                  {/* زر الإضافة السريعة */}
                  <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <AddToCartButton
                      product={product}
                      variant="primary"
                      size="sm"
                      className="w-full shadow-lg"
                      showLabel={true}
                    />
                  </div>
                </div>

                <div className="p-4 md:p-5">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-semibold text-gray-900 transition-colors line-clamp-2 mb-3 text-base md:text-lg">
                      {isRtl ? product.nameAr : product.nameEn}
                    </h3>
                  </Link>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-lg md:text-xl font-bold text-emerald-600">
                      {product.price} {isRtl ? "ر.س" : "SAR"}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-amber-600">
                      <Star size={12} fill="currentColor" />
                      <span className="font-medium">
                        {(Math.random() * 1 + 4).toFixed(1)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span className="text-xs text-gray-600 font-medium">
                      {isRtl ? "مطابقة عالية" : "High Match"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="container-custom py-12 md:py-16">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl mb-6 md:mb-8 shadow-lg">
              <Wand2 size={32} className="text-white" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
              {isRtl
                ? "مساعد اختيار الهدية المثالية"
                : "Perfect Gift Selection Assistant"}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-6 md:mb-8 px-4">
              {isRtl
                ? "أجب على بعض الأسئلة البسيطة وسنقترح عليك الهدية المثالية بناءً على تحليل ذكي لاحتياجاتك"
                : "Answer a few simple questions and we'll suggest the perfect gift based on intelligent analysis of your needs"}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-gray-500">
              <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                <Clock size={16} />
                <span className="text-sm">
                  {isRtl ? "3 دقائق" : "3 minutes"}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                <Target size={16} />
                <span className="text-sm">
                  {isRtl ? "دقة عالية" : "High Accuracy"}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                <Award size={16} />
                <span className="text-sm">{isRtl ? "مجاني" : "Free"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Progress Indicator */}
          <div className="mb-8 md:mb-12">
            <div className="flex justify-center items-center mb-6 md:mb-8">
              <div className="flex items-center space-x-2 md:space-x-4 rtl:space-x-reverse">
                {[1, 2, 3, 4].map((step) => (
                  <React.Fragment key={step}>
                    <div
                      className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center font-bold transition-all duration-300 border-2 ${
                        currentStep >= step
                          ? "bg-gradient-to-br from-purple-500 to-indigo-600 text-white border-purple-500 shadow-lg"
                          : "bg-white text-gray-400 border-gray-200"
                      }`}
                    >
                      {currentStep > step ? <CheckCircle size={16} /> : step}
                    </div>
                    {step < 4 && (
                      <div
                        className={`w-8 md:w-12 h-1 rounded-full transition-all duration-300 ${
                          currentStep > step
                            ? "bg-gradient-to-r from-purple-500 to-indigo-600"
                            : "bg-gray-200"
                        }`}
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div className="text-center text-gray-600 font-medium">
              {isRtl ? "الخطوة" : "Step"} {currentStep} {isRtl ? "من" : "of"} 4
            </div>
          </div>

          {/* Form Steps */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-6 md:p-12">
              <AnimatePresence mode="wait">
                {/* Step 1: Occasion & Relationship */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-6 md:space-y-8"
                  >
                    <div className="text-center mb-6 md:mb-8">
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                        {isRtl
                          ? "ما هي المناسبة والعلاقة؟"
                          : "What is the occasion and relationship?"}
                      </h2>
                      <p className="text-gray-600 text-base md:text-lg">
                        {isRtl
                          ? "هذان العاملان الأساسيان يساعداننا في اختيار نوع الهدية المناسبة"
                          : "These two key factors help us choose the right type of gift"}
                      </p>
                    </div>

                    {/* Occasions */}
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <Calendar size={20} />
                        {isRtl ? "المناسبة" : "Occasion"}
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {occasions.map((occasion) => (
                          <button
                            key={occasion.id}
                            onClick={() =>
                              setFormData((prev) => ({
                                ...prev,
                                occasion: occasion.id,
                              }))
                            }
                            className={`p-3 md:p-4 rounded-xl border-2 transition-all duration-300 text-center ${
                              formData.occasion === occasion.id
                                ? "bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-300 shadow-lg"
                                : "border-gray-200 bg-white"
                            }`}
                          >
                            <div className="text-xl md:text-2xl mb-2">
                              {occasion.icon}
                            </div>
                            <span className="text-xs md:text-sm font-medium text-gray-800">
                              {isRtl ? occasion.nameAr : occasion.nameEn}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Relationships */}
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <Users size={20} />
                        {isRtl ? "العلاقة" : "Relationship"}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {relationships.map((relationship) => (
                          <button
                            key={relationship.id}
                            onClick={() =>
                              setFormData((prev) => ({
                                ...prev,
                                relationship: relationship.id,
                              }))
                            }
                            className={`p-3 md:p-4 rounded-xl border-2 transition-all duration-300 ${
                              formData.relationship === relationship.id
                                ? "bg-gradient-to-br from-pink-50 to-rose-50 border-pink-300 shadow-lg"
                                : "border-gray-200 bg-white"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-lg md:text-xl">
                                {relationship.icon}
                              </span>
                              <span className="font-medium text-gray-800 text-sm md:text-base">
                                {isRtl
                                  ? relationship.nameAr
                                  : relationship.nameEn}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Interests & Budget */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-6 md:space-y-8"
                  >
                    <div className="text-center mb-6 md:mb-8">
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                        {isRtl
                          ? "ما هي اهتماماته وميزانيتك؟"
                          : "What are their interests and your budget?"}
                      </h2>
                      <p className="text-gray-600 text-base md:text-lg">
                        {isRtl
                          ? "هذه المعلومات تساعدنا في تخصيص الاقتراحات بدقة أكبر"
                          : "This information helps us personalize suggestions more accurately"}
                      </p>
                    </div>

                    {/* Interests */}
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <Heart size={20} />
                        {isRtl ? "الاهتمامات" : "Interests"}
                        <span className="text-sm text-gray-500 font-normal">
                          (
                          {isRtl
                            ? "يمكن اختيار أكثر من واحد"
                            : "multiple selection allowed"}
                          )
                        </span>
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {interests.map((interest) => (
                          <button
                            key={interest.id}
                            onClick={() => toggleInterest(interest.id)}
                            className={`p-3 md:p-4 rounded-xl border-2 transition-all duration-300 text-center ${
                              formData.interests.includes(interest.id)
                                ? "bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-300 shadow-lg"
                                : "border-gray-200 bg-white"
                            }`}
                          >
                            <div className="text-xl md:text-2xl mb-2">
                              {interest.icon}
                            </div>
                            <span className="text-xs md:text-sm font-medium text-gray-800">
                              {isRtl ? interest.nameAr : interest.nameEn}
                            </span>
                          </button>
                        ))}
                      </div>
                      {formData.interests.length > 0 && (
                        <div className="mt-3 text-center text-sm text-gray-500">
                          {formData.interests.length}{" "}
                          {isRtl ? "اهتمام محدد" : "interests selected"}
                        </div>
                      )}
                    </div>

                    {/* Budget */}
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <DollarSign size={20} />
                        {isRtl ? "الميزانية" : "Budget"}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {budgetRanges.map((budget) => (
                          <button
                            key={budget.id}
                            onClick={() =>
                              setFormData((prev) => ({
                                ...prev,
                                budget: budget.id,
                              }))
                            }
                            className={`p-3 md:p-4 rounded-xl border-2 transition-all duration-300 ${
                              formData.budget === budget.id
                                ? "bg-gradient-to-br from-green-50 to-emerald-50 border-green-300 shadow-lg"
                                : "border-gray-200 bg-white"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <DollarSign
                                size={20}
                                className="text-green-600"
                              />
                              <span className="font-medium text-gray-800 text-sm md:text-base">
                                {isRtl ? budget.nameAr : budget.nameEn}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Age & Gender */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-6 md:space-y-8"
                  >
                    <div className="text-center mb-6 md:mb-8">
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                        {isRtl ? "معلومات إضافية" : "Additional Information"}
                      </h2>
                      <p className="text-gray-600 text-base md:text-lg">
                        {isRtl
                          ? "هذه التفاصيل تساعدنا في تحسين دقة الاقتراحات"
                          : "These details help us improve the accuracy of suggestions"}
                      </p>
                    </div>

                    {/* Age Group */}
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <User size={20} />
                        {isRtl ? "الفئة العمرية" : "Age Group"}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {ageGroups.map((age) => (
                          <button
                            key={age.id}
                            onClick={() =>
                              setFormData((prev) => ({ ...prev, age: age.id }))
                            }
                            className={`p-3 md:p-4 rounded-xl border-2 transition-all duration-300 ${
                              formData.age === age.id
                                ? "bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-300 shadow-lg"
                                : "border-gray-200 bg-white"
                            }`}
                          >
                            <span className="font-medium text-gray-800 text-sm md:text-base">
                              {isRtl ? age.nameAr : age.nameEn}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Gender */}
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <Users size={20} />
                        {isRtl ? "الجنس" : "Gender"}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {[
                          {
                            id: "male",
                            nameAr: "ذكر",
                            nameEn: "Male",
                            icon: "👨",
                          },
                          {
                            id: "female",
                            nameAr: "أنثى",
                            nameEn: "Female",
                            icon: "👩",
                          },
                          {
                            id: "unisex",
                            nameAr: "غير محدد",
                            nameEn: "Unisex",
                            icon: "👤",
                          },
                        ].map((gender) => (
                          <button
                            key={gender.id}
                            onClick={() =>
                              setFormData((prev) => ({
                                ...prev,
                                gender: gender.id,
                              }))
                            }
                            className={`p-3 md:p-4 rounded-xl border-2 transition-all duration-300 ${
                              formData.gender === gender.id
                                ? "bg-gradient-to-br from-pink-50 to-rose-50 border-pink-300 shadow-lg"
                                : "border-gray-200 bg-white"
                            }`}
                          >
                            <div className="flex items-center gap-3 justify-center">
                              <span className="text-lg md:text-xl">
                                {gender.icon}
                              </span>
                              <span className="font-medium text-gray-800 text-sm md:text-base">
                                {isRtl ? gender.nameAr : gender.nameEn}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Personality */}
                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-6 md:space-y-8"
                  >
                    <div className="text-center mb-6 md:mb-8">
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                        {isRtl
                          ? "كيف تصف شخصيته؟"
                          : "How would you describe their personality?"}
                      </h2>
                      <p className="text-gray-600 text-base md:text-lg">
                        {isRtl
                          ? "اختر الوصف الأقرب لشخصية المستقبل لنقترح عليك الهدية الأنسب"
                          : "Choose the description closest to the recipient's personality for the most suitable gift"}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                      {personalities.map((personality) => (
                        <button
                          key={personality.id}
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              personality: personality.id,
                            }))
                          }
                          className={`p-4 md:p-6 rounded-xl border-2 transition-all duration-300 text-center ${
                            formData.personality === personality.id
                              ? "bg-gradient-to-br from-amber-50 to-orange-50 border-amber-300 shadow-lg"
                              : "border-gray-200 bg-white"
                          }`}
                        >
                          <div className="text-2xl md:text-3xl mb-2 md:mb-3">
                            {personality.icon}
                          </div>
                          <span className="text-xs md:text-sm font-medium text-gray-800">
                            {isRtl ? personality.nameAr : personality.nameEn}
                          </span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex flex-col sm:flex-row justify-between items-center mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-200 gap-4">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`w-full sm:w-auto flex items-center justify-center gap-2 px-4 md:px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    currentStep === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-gray-200 text-gray-700 border border-gray-300"
                  }`}
                >
                  {isRtl ? (
                    <ChevronRight size={18} />
                  ) : (
                    <ChevronLeft size={18} />
                  )}
                  {isRtl ? "السابق" : "Previous"}
                </button>

                {currentStep < 4 ? (
                  <button
                    onClick={nextStep}
                    disabled={!isStepValid()}
                    className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 md:px-8 py-3 rounded-xl font-medium transition-all duration-300 ${
                      isStepValid()
                        ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {isRtl ? "التالي" : "Next"}
                    {isRtl ? (
                      <ChevronLeft size={18} />
                    ) : (
                      <ChevronRight size={18} />
                    )}
                  </button>
                ) : (
                  <button
                    onClick={analyzeAndSuggest}
                    disabled={!isStepValid() || isAnalyzing}
                    className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 md:px-8 py-3 rounded-xl font-medium transition-all duration-300 ${
                      isStepValid() && !isAnalyzing
                        ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {isAnalyzing ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
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
                        <Wand2 size={18} />
                        <span>
                          {isRtl
                            ? "اعثر على الهدية المثالية"
                            : "Find Perfect Gift"}
                        </span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Analysis Loading */}
          <AnimatePresence>
            {isAnalyzing && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-8 bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 text-center"
              >
                <div className="flex flex-col items-center space-y-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <Wand2 size={32} className="text-white" />
                    </motion.div>
                  </div>

                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                      {isRtl
                        ? "جاري تحليل اختياراتك..."
                        : "Analyzing your choices..."}
                    </h3>
                    <p className="text-gray-600 text-base md:text-lg">
                      {isRtl
                        ? "نحن نبحث عن أفضل الهدايا المناسبة لك باستخدام خوارزمية ذكية"
                        : "We're finding the best gifts for you using intelligent algorithms"}
                    </p>
                  </div>

                  <div className="flex justify-center space-x-2 rtl:space-x-reverse">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-3 h-3 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full"
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </div>

                  {/* تقدم التحليل */}
                  <div className="w-full max-w-md">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>{isRtl ? "تحليل البيانات" : "Analyzing data"}</span>
                      <span>85%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-purple-500 to-indigo-600 h-2 rounded-full"
                        initial={{ width: "0%" }}
                        animate={{ width: "85%" }}
                        transition={{ duration: 2 }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default GiftAssistantPage;
