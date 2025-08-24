import React from "react";
import { useTranslation } from "react-i18next";
import { ProductImage } from "../features/images";

const AboutPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-purple-50 px-4 sm:px-6 lg:px-8 font-serif text-neutral-800">
      <div className="max-w-7xl mx-auto py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-neutral-100">
          <h1 className="text-4xl font-bold mb-8 text-purple-800 text-center">
            {isArabic ? "من نحن" : "About Us"}
          </h1>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            <div className="relative">
              <ProductImage
                src="https://images.pexels.com/photos/1974508/pexels-photo-1974508.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt={isArabic ? "زاجل السعادة" : "Zajil Al-Saadah"}
                className="rounded-2xl shadow-lg w-full transition-transform duration-500 hover:scale-105"
                width={600}
                height={400}
                aspectRatio="landscape"
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={85}
                priority={true}
                showZoom={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent rounded-2xl"></div>
            </div>

            <div className="space-y-6">
              <p className="text-lg text-neutral-700 leading-relaxed font-medium">
                {isArabic
                  ? "زاجل السعادة هو متجر متخصص في تقديم الهدايا الفريدة والمميزة لجميع المناسبات. نحن نؤمن بأن كل هدية تحمل معها لحظة من السعادة والبهجة."
                  : "Zajil Al-Saadah is a specialty store dedicated to providing unique and distinctive gifts for all occasions. We believe that every gift carries with it a moment of joy and happiness."}
              </p>

              <p className="text-neutral-600 leading-relaxed">
                {isArabic
                  ? "منذ تأسيسنا، نسعى لتقديم تجربة استثنائية لعملائنا من خلال منتجات عالية الجودة وخدمة متميزة تلبي توقعاتهم وتفوقها."
                  : "Since our establishment, we strive to provide an exceptional experience for our customers through high-quality products and outstanding service that meets and exceeds their expectations."}
              </p>

              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-rose-50 rounded-xl border border-purple-100 shadow-sm">
                  <div className="text-3xl font-bold text-purple-700 mb-2">
                    10K+
                  </div>
                  <div className="text-neutral-600 font-medium">
                    {isArabic ? "عملاء سعداء" : "Happy Customers"}
                  </div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-rose-50 to-purple-50 rounded-xl border border-rose-100 shadow-sm">
                  <div className="text-3xl font-bold text-rose-700 mb-2">
                    50K+
                  </div>
                  <div className="text-neutral-600 font-medium">
                    {isArabic ? "هدية تم توصيلها" : "Gifts Delivered"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-xl border border-amber-100 shadow-sm">
              <div className="relative mb-4">
                <ProductImage
                  src="https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt={isArabic ? "الجودة العالية" : "Premium Quality"}
                  className="w-full h-32 object-cover rounded-lg"
                  width={300}
                  height={128}
                  aspectRatio="landscape"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  quality={75}
                  showZoom={false}
                />
              </div>
              <h3 className="text-lg font-bold text-amber-800 mb-2">
                {isArabic ? "الجودة العالية" : "Premium Quality"}
              </h3>
              <p className="text-neutral-600 text-sm">
                {isArabic
                  ? "نختار منتجاتنا بعناية فائقة لضمان أعلى معايير الجودة"
                  : "We carefully select our products to ensure the highest quality standards"}
              </p>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl border border-emerald-100 shadow-sm">
              <div className="relative mb-4">
                <ProductImage
                  src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt={
                    isArabic
                      ? "خدمة عملاء متميزة"
                      : "Outstanding Customer Service"
                  }
                  className="w-full h-32 object-cover rounded-lg"
                  width={300}
                  height={128}
                  aspectRatio="landscape"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  quality={75}
                  showZoom={false}
                />
              </div>
              <h3 className="text-lg font-bold text-emerald-800 mb-2">
                {isArabic
                  ? "خدمة عملاء متميزة"
                  : "Outstanding Customer Service"}
              </h3>
              <p className="text-neutral-600 text-sm">
                {isArabic
                  ? "فريق دعم متخصص متاح على مدار الساعة لخدمتكم"
                  : "Specialized support team available 24/7 to serve you"}
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100 shadow-sm">
              <div className="relative mb-4">
                <ProductImage
                  src="https://images.pexels.com/photos/4481259/pexels-photo-4481259.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt={isArabic ? "توصيل سريع" : "Fast Delivery"}
                  className="w-full h-32 object-cover rounded-lg"
                  width={300}
                  height={128}
                  aspectRatio="landscape"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  quality={75}
                  showZoom={false}
                />
              </div>
              <h3 className="text-lg font-bold text-blue-800 mb-2">
                {isArabic ? "توصيل سريع" : "Fast Delivery"}
              </h3>
              <p className="text-neutral-600 text-sm">
                {isArabic
                  ? "نضمن وصول هداياكم في الوقت المحدد وبأفضل حالة"
                  : "We guarantee your gifts arrive on time and in perfect condition"}
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-rose-50 p-8 rounded-xl border border-purple-100 shadow-sm">
            <h2 className="text-2xl font-bold mb-6 text-purple-800 text-center">
              {isArabic ? "رؤيتنا ورسالتنا" : "Our Vision & Mission"}
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-100">
                <h3 className="text-lg font-bold text-purple-700 mb-4">
                  {isArabic ? "رؤيتنا" : "Our Vision"}
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  {isArabic
                    ? "أن نكون الوجهة الأولى للهدايا المميزة في المملكة العربية السعودية، ونشر السعادة والبهجة في كل بيت."
                    : "To be the premier destination for distinctive gifts in Saudi Arabia, spreading happiness and joy to every home."}
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-100">
                <h3 className="text-lg font-bold text-rose-700 mb-4">
                  {isArabic ? "رسالتنا" : "Our Mission"}
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  {isArabic
                    ? "تقديم هدايا استثنائية تعبر عن المشاعر الصادقة وتخلق ذكريات جميلة تدوم مدى الحياة."
                    : "Providing exceptional gifts that express genuine feelings and create beautiful memories that last a lifetime."}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="relative inline-block">
              <ProductImage
                src="https://images.pexels.com/photos/6169668/pexels-photo-6169668.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt={isArabic ? "فريق زاجل السعادة" : "Zajil Al-Saadah Team"}
                className="w-full max-w-2xl mx-auto rounded-2xl shadow-lg"
                width={800}
                height={400}
                aspectRatio="landscape"
                sizes="(max-width: 768px) 100vw, 800px"
                quality={85}
                showZoom={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-2xl flex items-end justify-center pb-8">
                <div className="text-white text-center">
                  <h3 className="text-2xl font-bold mb-2">
                    {isArabic ? "فريق العمل المتميز" : "Our Outstanding Team"}
                  </h3>
                  <p className="text-lg opacity-90">
                    {isArabic
                      ? "نعمل معاً لإسعادكم"
                      : "Working together to make you happy"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
