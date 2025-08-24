import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { ProductImage } from "../features/images";

const FAQPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      questionEn: "How can I track my order?",
      questionAr: "كيف يمكنني تتبع طلبي؟",
      answerEn:
        "You can track your order by logging into your account and visiting the order tracking section. You will also receive email updates about your order status.",
      answerAr:
        "يمكنك تتبع طلبك عن طريق تسجيل الدخول إلى حسابك وزيارة قسم تتبع الطلب. ستتلقى أيضًا تحديثات عبر البريد الإلكتروني حول حالة طلبك.",
    },
    {
      questionEn: "What are your delivery hours?",
      questionAr: "ما هي ساعات التوصيل لديكم؟",
      answerEn:
        "We deliver from 9 AM to 10 PM every day across Saudi Arabia. For special occasions like Eid, we extend our delivery hours.",
      answerAr:
        "نقوم بالتوصيل من 9 صباحًا حتى 10 مساءً كل يوم في جميع أنحاء السعودية. في المناسبات الخاصة مثل العيد، نقوم بتمديد ساعات التوصيل.",
    },
    {
      questionEn: "Can I modify or cancel my order?",
      questionAr: "هل يمكنني تعديل أو إلغاء طلبي؟",
      answerEn:
        "You can modify or cancel your order within 1 hour of placing it. Please contact our customer service for assistance.",
      answerAr:
        "يمكنك تعديل أو إلغاء طلبك خلال ساعة من تقديمه. يرجى الاتصال بخدمة العملاء للمساعدة.",
    },
    {
      questionEn: "What payment methods do you accept?",
      questionAr: "ما هي طرق الدفع المقبولة لديكم؟",
      answerEn:
        "We accept credit cards, debit cards, and cash on delivery. All online payments are secure and encrypted.",
      answerAr:
        "نقبل بطاقات الائتمان وبطاقات الخصم والدفع عند الاستلام. جميع المدفوعات عبر الإنترنت آمنة ومشفرة.",
    },
    {
      questionEn: "Do you offer same-day delivery?",
      questionAr: "هل تقدمون خدمة التوصيل في نفس اليوم؟",
      answerEn:
        "Yes, we offer same-day delivery for orders placed before 4 PM. This service is available in selected areas.",
      answerAr:
        "نعم، نقدم خدمة التوصيل في نفس اليوم للطلبات المقدمة قبل الساعة 4 مساءً. هذه الخدمة متوفرة في مناطق مختارة.",
    },
  ];

  return (
    <div className="container-custom py-12">
      <div className="text-center mb-12">
        <div className="mb-8">
          <ProductImage
            src="https://images.pexels.com/photos/5428010/pexels-photo-5428010.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt={isArabic ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
            className="w-full h-64 object-cover rounded-2xl shadow-lg"
            width={800}
            height={256}
            aspectRatio="landscape"
            sizes="100vw"
            quality={85}
            priority={true}
            showZoom={false}
          />
        </div>
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          {isArabic ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {isArabic
            ? "نجيب على أكثر الأسئلة شيوعاً لمساعدتك في الحصول على أفضل تجربة تسوق"
            : "We answer the most common questions to help you get the best shopping experience"}
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-medium flex items-center gap-3">
                  <HelpCircle size={20} className="text-primary" />
                  {isArabic ? faq.questionAr : faq.questionEn}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>

              {openIndex === index && (
                <div className="px-6 pb-4 text-gray-600 border-t border-gray-100 pt-4">
                  {isArabic ? faq.answerAr : faq.answerEn}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 bg-primary/5 p-8 rounded-2xl text-center">
          <div className="mb-6">
            <ProductImage
              src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400"
              alt={isArabic ? "خدمة العملاء" : "Customer Service"}
              className="w-24 h-24 object-cover rounded-full mx-auto shadow-lg"
              width={96}
              height={96}
              aspectRatio="square"
              sizes="96px"
              quality={80}
              showZoom={false}
            />
          </div>
          <h2 className="text-xl font-semibold mb-4">
            {isArabic ? "هل لديك المزيد من الأسئلة؟" : "Still have questions?"}
          </h2>
          <p className="text-gray-600 mb-6">
            {isArabic
              ? "فريق خدمة العملاء لدينا متاح للمساعدة على مدار الساعة"
              : "Our customer support team is here to help 24/7"}
          </p>
          <a
            href="/contact"
            className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors shadow-lg"
          >
            {isArabic ? "اتصل بنا" : "Contact Us"}
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
