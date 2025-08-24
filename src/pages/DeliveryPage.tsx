import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { MapPin, Truck, Clock } from "lucide-react";
import { ProductImage } from "../features/images";

const DeliveryPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    document.title = isRtl
      ? "زاجل السعادة | معلومات التوصيل"
      : "Zajil Al-Sa'adah | Delivery Information";

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isRtl]);

  return (
    <section className="py-12 bg-gray-50">
      <div className="container-custom">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">
          {t("footer.delivery")}
        </h1>

        {/* Hero Image */}
        <div className="mb-12">
          <ProductImage
            src="https://images.pexels.com/photos/4391470/pexels-photo-4391470.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt={isRtl ? "خدمة التوصيل" : "Delivery Service"}
            className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-lg"
            width={1200}
            height={isMobile ? 256 : 320}
            aspectRatio="landscape"
            sizes="100vw"
            quality={100}
            priority={true}
            showZoom={false}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Delivery Locations */}
          <div className="card p-6">
            <div className="flex items-center justify-center mb-4">
              <MapPin
                size={32}
                className="text-primary mr-2 rtl:ml-2 rtl:mr-0"
              />
              <h2 className="text-xl font-bold text-gray-800">
                {isRtl ? "مناطق التوصيل" : "Delivery Locations"}
              </h2>
            </div>
            <div className="mb-6">
              <ProductImage
                src="https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt={isRtl ? "مناطق التوصيل" : "Delivery Areas"}
                className="w-full h-32 object-cover rounded-lg"
                width={400}
                height={128}
                aspectRatio="landscape"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                quality={85}
                priority={false}
                showZoom={false}
              />
            </div>
            <p className="text-gray-600 text-center">
              {isRtl
                ? "نقدم خدمات التوصيل في الرياض، جدة، والدمام، مع خطط للتوسع إلى مدن أخرى قريباً."
                : "We offer delivery services in Riyadh, Jeddah, and Dammam, with plans to expand to other cities soon."}
            </p>

            <ul className="mt-4 space-y-2 text-gray-600">
              <li className="flex items-center justify-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-2 rtl:ml-2 rtl:mr-0"></span>
                {isRtl ? "الرياض" : "Riyadh"}
              </li>
              <li className="flex items-center justify-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-2 rtl:ml-2 rtl:mr-0"></span>
                {isRtl ? "جدة" : "Jeddah"}
              </li>
              <li className="flex items-center justify-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-2 rtl:ml-2 rtl:mr-0"></span>
                {isRtl ? "الدمام" : "Dammam"}
              </li>
            </ul>
          </div>

          {/* Delivery Time */}
          <div className="card p-6">
            <div className="flex items-center justify-center mb-4">
              <Clock
                size={32}
                className="text-primary mr-2 rtl:ml-2 rtl:mr-0"
              />
              <h2 className="text-xl font-bold text-gray-800">
                {isRtl ? "مدة التوصيل" : "Delivery Time"}
              </h2>
            </div>
            <div className="mb-6">
              <ProductImage
                src="https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt={isRtl ? "وقت التوصيل" : "Delivery Time"}
                className="w-full h-32 object-cover rounded-lg"
                width={400}
                height={128}
                aspectRatio="landscape"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                quality={85}
                priority={false}
                showZoom={false}
              />
            </div>
            <p className="text-gray-600 text-center">
              {isRtl
                ? "نضمن توصيل طلباتك خلال 24-48 ساعة داخل المدن المدعومة. التوصيل السريع متاح في نفس اليوم في مناطق محددة."
                : "We ensure delivery within 24-48 hours in supported cities. Same-day express delivery is available in select areas."}
            </p>
          </div>

          {/* Delivery Process */}
          <div className="card p-6">
            <div className="flex items-center justify-center mb-4">
              <Truck
                size={32}
                className="text-primary mr-2 rtl:ml-2 rtl:mr-0"
              />
              <h2 className="text-xl font-bold text-gray-800">
                {isRtl ? "عملية التوصيل" : "Delivery Process"}
              </h2>
            </div>
            <div className="mb-6">
              <ProductImage
                src="https://images.pexels.com/photos/906494/pexels-photo-906494.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt={isRtl ? "عملية التوصيل" : "Delivery Process"}
                className="w-full h-32 object-cover rounded-lg"
                width={400}
                height={128}
                aspectRatio="landscape"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                quality={85}
                priority={false}
                showZoom={false}
              />
            </div>
            <p className="text-gray-600 text-center">
              {isRtl
                ? "نقوم بتعبئة طلباتك بعناية لضمان وصولها بحالة ممتازة. تابع طلبك بسهولة من خلال حسابك على موقعنا."
                : "We carefully package your orders to ensure they arrive in perfect condition. Track your order easily through your account on our website."}
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <a
            href="/contact"
            className="btn btn-primary inline-flex items-center"
          >
            {isRtl
              ? "تواصل معنا للمزيد من المعلومات"
              : "Contact Us for More Information"}
          </a>
        </div>
      </div>
    </section>
  );
};

export default DeliveryPage;
