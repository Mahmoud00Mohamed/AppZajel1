import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Send,
  Mail,
  Phone,
  MessageCircle,
  Gift,
  Sparkles,
  Heart,
  Star,
  Zap,
  CheckCircle,
  Clock,
  User,
  Calendar,
  Wand2,
  PartyPopper,
  Smile,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ProductImage } from "../features/images";

interface NotificationForm {
  recipientName: string;
  recipientEmail: string;
  recipientPhone: string;
  message: string;
  occasion: string;
  sendMethod: "email" | "sms" | "both";
}

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  icon: React.ReactNode;
  color: string;
  delay: number;
}

const NotificationsPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  const containerRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState<NotificationForm>({
    recipientName: "",
    recipientEmail: "",
    recipientPhone: "",
    message: "",
    occasion: "",
    sendMethod: "email",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [floatingElements, setFloatingElements] = useState<FloatingElement[]>(
    []
  );

  // Generate floating elements
  useEffect(() => {
    const elements: FloatingElement[] = [];
    const icons = [
      <Heart size={16} />,
      <Star size={16} />,
      <Sparkles size={16} />,
      <Gift size={16} />,
      <PartyPopper size={16} />,
      <Smile size={16} />,
    ];
    const colors = [
      "text-pink-400",
      "text-purple-400",
      "text-blue-400",
      "text-green-400",
      "text-yellow-400",
      "text-red-400",
    ];

    for (let i = 0; i < 15; i++) {
      elements.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        icon: icons[Math.floor(Math.random() * icons.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 5,
      });
    }
    setFloatingElements(elements);
  }, []);

  const occasions = [
    {
      value: "birthday",
      labelKey: "notifications.occasions.birthday",
      icon: <PartyPopper size={20} />,
      color: "from-pink-500 to-rose-500",
    },
    {
      value: "anniversary",
      labelKey: "notifications.occasions.anniversary",
      icon: <Heart size={20} />,
      color: "from-red-500 to-pink-500",
    },
    {
      value: "wedding",
      labelKey: "notifications.occasions.wedding",
      icon: <Sparkles size={20} />,
      color: "from-purple-500 to-pink-500",
    },
    {
      value: "graduation",
      labelKey: "notifications.occasions.graduation",
      icon: <Star size={20} />,
      color: "from-blue-500 to-indigo-500",
    },
    {
      value: "eid",
      labelKey: "notifications.occasions.eid",
      icon: <Gift size={20} />,
      color: "from-green-500 to-emerald-500",
    },
    {
      value: "thank-you",
      labelKey: "notifications.occasions.thankYou",
      icon: <Smile size={20} />,
      color: "from-yellow-500 to-orange-500",
    },
    {
      value: "congratulations",
      labelKey: "notifications.occasions.congratulations",
      icon: <Zap size={20} />,
      color: "from-indigo-500 to-purple-500",
    },
  ];

  const sendMethods = [
    {
      value: "email",
      icon: <Mail size={24} />,
      label: t("notifications.email"),
      description: isRtl ? "إرسال فوري وموثوق" : "Instant & Reliable",
      color: "from-blue-500 to-cyan-500",
    },
    {
      value: "sms",
      icon: <MessageCircle size={24} />,
      label: t("notifications.sms"),
      description: isRtl ? "وصول مباشر" : "Direct Reach",
      color: "from-green-500 to-emerald-500",
    },
    {
      value: "both",
      icon: <Zap size={24} />,
      label: t("notifications.both"),
      description: isRtl ? "تأثير مضاعف" : "Double Impact",
      color: "from-purple-500 to-pink-500",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setShowSuccess(true);

    // Reset form after success
    setTimeout(() => {
      setShowSuccess(false);
      setForm({
        recipientName: "",
        recipientEmail: "",
        recipientPhone: "",
        message: "",
        occasion: "",
        sendMethod: "email",
      });
      setCurrentStep(1);
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return form.recipientName && form.occasion;
      case 2:
        return (
          form.sendMethod &&
          (form.sendMethod === "email" || form.sendMethod === "both"
            ? form.recipientEmail
            : true) &&
          (form.sendMethod === "sms" || form.sendMethod === "both"
            ? form.recipientPhone
            : true)
        );
      case 3:
        return form.message;
      default:
        return false;
    }
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden"
    >
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingElements.map((element) => (
          <motion.div
            key={element.id}
            className={`absolute ${element.color} opacity-20`}
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: element.delay,
              ease: "easeInOut",
            }}
          >
            {element.icon}
          </motion.div>
        ))}
      </div>

      {/* Animated Background Shapes */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-2xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      <div className="container-custom py-8 pb-24 relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6 relative"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Wand2 className="w-10 h-10 text-white" />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            <motion.h1
              className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              {t("notifications.title")}
            </motion.h1>

            <motion.p
              className="text-gray-600 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {t("notifications.description")}
            </motion.p>
          </motion.div>

          {/* Progress Indicator */}
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              {[1, 2, 3].map((step) => (
                <React.Fragment key={step}>
                  <motion.div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                      currentStep >= step
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                        : "bg-gray-200 text-gray-500"
                    }`}
                    whileHover={{ scale: 1.1 }}
                    animate={currentStep === step ? { scale: [1, 1.1, 1] } : {}}
                    transition={{
                      duration: 0.5,
                      repeat: currentStep === step ? Infinity : 0,
                    }}
                  >
                    {currentStep > step ? <CheckCircle size={20} /> : step}
                  </motion.div>
                  {step < 3 && (
                    <div
                      className={`w-8 h-1 rounded-full transition-all duration-300 ${
                        currentStep > step
                          ? "bg-gradient-to-r from-purple-500 to-pink-500"
                          : "bg-gray-200"
                      }`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </motion.div>

          {/* Form Card */}
          <motion.div
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="p-8">
              <form onSubmit={handleSubmit}>
                <AnimatePresence mode="wait">
                  {/* Step 1: Recipient & Occasion */}
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      className="space-y-6"
                    >
                      <div className="text-center mb-6">
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">
                          {isRtl ? "من المستقبل؟" : "Who's the recipient?"}
                        </h3>
                        <p className="text-gray-600">
                          {isRtl
                            ? "أخبرنا عن الشخص المميز"
                            : "Tell us about the special person"}
                        </p>
                      </div>

                      {/* Recipient Name */}
                      <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <User
                            size={16}
                            className="inline mr-2 rtl:ml-2 rtl:mr-0"
                          />
                          {t("notifications.recipientName")}
                        </label>
                        <input
                          type="text"
                          name="recipientName"
                          value={form.recipientName}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 bg-white/50"
                          placeholder={
                            isRtl ? "اسم الشخص المميز" : "Special person's name"
                          }
                          required
                        />
                      </div>

                      {/* Occasion Selection */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-4">
                          <Calendar
                            size={16}
                            className="inline mr-2 rtl:ml-2 rtl:mr-0"
                          />
                          {t("notifications.occasion")}
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {occasions.map((occasion) => (
                            <motion.button
                              key={occasion.value}
                              type="button"
                              onClick={() =>
                                setForm({ ...form, occasion: occasion.value })
                              }
                              className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                                form.occasion === occasion.value
                                  ? `bg-gradient-to-r ${occasion.color} text-white border-transparent shadow-lg`
                                  : "border-gray-200 hover:border-gray-300 bg-white/50"
                              }`}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <div className="flex flex-col items-center space-y-2">
                                {occasion.icon}
                                <span className="text-sm font-medium">
                                  {t(occasion.labelKey)}
                                </span>
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Send Method & Contact */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      className="space-y-6"
                    >
                      <div className="text-center mb-6">
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">
                          {isRtl ? "كيف تريد الإرسال؟" : "How to send?"}
                        </h3>
                        <p className="text-gray-600">
                          {isRtl
                            ? "اختر الطريقة المناسبة"
                            : "Choose the perfect method"}
                        </p>
                      </div>

                      {/* Send Method */}
                      <div className="grid grid-cols-1 gap-4">
                        {sendMethods.map((method) => (
                          <motion.button
                            key={method.value}
                            type="button"
                            onClick={() =>
                              setForm({
                                ...form,
                                sendMethod: method.value as
                                  | "email"
                                  | "sms"
                                  | "both",
                              })
                            }
                            className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                              form.sendMethod === method.value
                                ? `bg-gradient-to-r ${method.color} text-white border-transparent shadow-lg`
                                : "border-gray-200 hover:border-gray-300 bg-white/50"
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="flex items-center space-x-4 rtl:space-x-reverse">
                              {method.icon}
                              <div className="text-left rtl:text-right">
                                <div className="font-medium">
                                  {method.label}
                                </div>
                                <div className="text-sm opacity-80">
                                  {method.description}
                                </div>
                              </div>
                            </div>
                          </motion.button>
                        ))}
                      </div>

                      {/* Contact Fields */}
                      <div className="space-y-4">
                        {(form.sendMethod === "email" ||
                          form.sendMethod === "both") && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="relative"
                          >
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              <Mail
                                size={16}
                                className="inline mr-2 rtl:ml-2 rtl:mr-0"
                              />
                              {t("notifications.recipientEmail")}
                            </label>
                            <input
                              type="email"
                              name="recipientEmail"
                              value={form.recipientEmail}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white/50"
                              placeholder="example@email.com"
                              required
                            />
                          </motion.div>
                        )}

                        {(form.sendMethod === "sms" ||
                          form.sendMethod === "both") && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="relative"
                          >
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              <Phone
                                size={16}
                                className="inline mr-2 rtl:ml-2 rtl:mr-0"
                              />
                              {t("notifications.recipientPhone")}
                            </label>
                            <input
                              type="tel"
                              name="recipientPhone"
                              value={form.recipientPhone}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 bg-white/50"
                              placeholder="+966 50 123 4567"
                              required
                            />
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Message */}
                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      className="space-y-6"
                    >
                      <div className="text-center mb-6">
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">
                          {isRtl ? "رسالتك المميزة" : "Your special message"}
                        </h3>
                        <p className="text-gray-600">
                          {isRtl
                            ? "اكتب كلمات من القلب"
                            : "Write words from the heart"}
                        </p>
                      </div>

                      <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <MessageCircle
                            size={16}
                            className="inline mr-2 rtl:ml-2 rtl:mr-0"
                          />
                          {t("notifications.message")}
                        </label>
                        <textarea
                          name="message"
                          value={form.message}
                          onChange={handleChange}
                          rows={6}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 bg-white/50 resize-none"
                          placeholder={t("notifications.messagePlaceholder")}
                          required
                        />
                        <div className="absolute bottom-3 right-3 rtl:left-3 rtl:right-auto text-xs text-gray-400">
                          {form.message.length}/500
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation Buttons */}
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
                    whileHover={currentStep > 1 ? { scale: 1.05 } : {}}
                    whileTap={currentStep > 1 ? { scale: 0.95 } : {}}
                  >
                    {isRtl ? "السابق" : "Previous"}
                  </motion.button>

                  {currentStep < 3 ? (
                    <motion.button
                      type="button"
                      onClick={nextStep}
                      disabled={!isStepValid()}
                      className={`px-8 py-3 rounded-xl font-medium transition-all duration-300 ${
                        isStepValid()
                          ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl"
                          : "bg-gray-200 text-gray-400 cursor-not-allowed"
                      }`}
                      whileHover={isStepValid() ? { scale: 1.05 } : {}}
                      whileTap={isStepValid() ? { scale: 0.95 } : {}}
                    >
                      {isRtl ? "التالي" : "Next"}
                    </motion.button>
                  ) : (
                    <motion.button
                      type="submit"
                      disabled={!isStepValid() || isSubmitting}
                      className={`px-8 py-3 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 rtl:space-x-reverse ${
                        isStepValid() && !isSubmitting
                          ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl"
                          : "bg-gray-200 text-gray-400 cursor-not-allowed"
                      }`}
                      whileHover={
                        isStepValid() && !isSubmitting ? { scale: 1.05 } : {}
                      }
                      whileTap={
                        isStepValid() && !isSubmitting ? { scale: 0.95 } : {}
                      }
                    >
                      {isSubmitting ? (
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
                            {isRtl ? "جاري الإرسال..." : "Sending..."}
                          </span>
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          <span>{t("notifications.sendGreeting")}</span>
                        </>
                      )}
                    </motion.button>
                  )}
                </div>
              </form>
            </div>
          </motion.div>

          {/* Recent Notifications */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              {t("notifications.recentNotifications")}
            </h2>
            <div className="space-y-4">
              {[
                {
                  name: isRtl ? "أحمد محمد" : "Ahmed Mohamed",
                  time: isRtl ? "منذ ساعتين" : "2 hours ago",
                  message: t("notifications.sampleMessage1"),
                  occasion: "birthday",
                  color: "from-pink-500 to-rose-500",
                  image:
                    "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100",
                },
                {
                  name: isRtl ? "فاطمة علي" : "Fatima Ali",
                  time: isRtl ? "أمس" : "Yesterday",
                  message: t("notifications.sampleMessage2"),
                  occasion: "graduation",
                  color: "from-blue-500 to-indigo-500",
                  image:
                    "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100",
                },
              ].map((notification, index) => (
                <motion.div
                  key={index}
                  className="bg-white/60 backdrop-blur-sm p-4 rounded-2xl border border-white/20 shadow-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 + index * 0.2 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <div className="flex items-start space-x-3 rtl:space-x-reverse">
                    <ProductImage
                      src={notification.image}
                      alt={notification.name}
                      className="w-10 h-10 rounded-full object-cover"
                      width={40}
                      height={40}
                      aspectRatio="square"
                      sizes="40px"
                      quality={100}
                      showZoom={false}
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium text-gray-800">
                          {notification.name}
                        </span>
                        <span className="text-xs text-gray-500 flex items-center">
                          <Clock size={12} className="mr-1 rtl:ml-1 rtl:mr-0" />
                          {notification.time}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {notification.message}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 0.6,
                  ease: "easeInOut",
                }}
              >
                <CheckCircle size={40} className="text-white" />
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {isRtl ? "تم الإرسال بنجاح!" : "Successfully Sent!"}
              </h3>
              <p className="text-gray-600 mb-6">
                {t("notifications.successMessage")}
              </p>
              <motion.div
                className="flex justify-center space-x-2 rtl:space-x-reverse"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationsPage;
