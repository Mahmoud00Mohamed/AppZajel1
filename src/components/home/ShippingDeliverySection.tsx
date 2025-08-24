import React from "react";
import { useTranslation } from "react-i18next";
import { Truck, Clock, MapPin, Shield, CheckCircle } from "lucide-react";
import { ProductImage } from "../../features/images";

const ShippingDeliverySection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  const features = React.useMemo(
    () => [
      {
        icon: <Clock size={24} className="text-purple-600" />,
        titleKey: "home.shipping.features.sameDay.title",
        descriptionKey: "home.shipping.features.sameDay.description",
      },
      {
        icon: <MapPin size={24} className="text-purple-600" />,
        titleKey: "home.shipping.features.nationwide.title",
        descriptionKey: "home.shipping.features.nationwide.description",
      },
      {
        icon: <Shield size={24} className="text-purple-600" />,
        titleKey: "home.shipping.features.secure.title",
        descriptionKey: "home.shipping.features.secure.description",
      },
      {
        icon: <CheckCircle size={24} className="text-purple-600" />,
        titleKey: "home.shipping.features.tracking.title",
        descriptionKey: "home.shipping.features.tracking.description",
      },
    ],
    []
  );

  return (
    <section className="py-14 sm:py-18 bg-white text-gray-900">
      <div className="container-custom px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className={`${isRtl ? "lg:order-2" : "lg:order-1"}`}>
            <div className="text-center lg:text-start mb-10">
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium text-purple-800 leading-tight flex items-center justify-center lg:justify-start gap-3">
                <Truck size={32} className="text-purple-700" />
                {t("home.shipping.title")}
              </h2>
              <p className="mt-2.5 text-sm sm:text-base max-w-xs sm:max-w-md md:max-w-lg mx-auto lg:mx-0 leading-relaxed text-gray-600">
                {t("home.shipping.description")}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group flex items-start space-x-3 rtl:space-x-reverse bg-white rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all duration-300 p-4"
                >
                  <div className="flex-shrink-0 p-2 bg-purple-50 rounded-lg">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 text-sm mb-1">
                      {t(feature.titleKey)}
                    </h3>
                    <p className="text-gray-600 text-xs leading-relaxed">
                      {t(feature.descriptionKey)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-purple-50 rounded-xl border border-purple-200 shadow-md">
              <div className="flex items-center mb-2">
                <Clock
                  size={20}
                  className="text-purple-600 mr-2 rtl:ml-2 rtl:mr-0"
                />
                <span className="font-semibold text-purple-800 text-sm">
                  {t("home.shipping.specialOffer.title")}
                </span>
              </div>
              <p className="text-purple-700 text-xs leading-relaxed">
                {t("home.shipping.specialOffer.description")}
              </p>
            </div>
          </div>

          {/* Image */}
          <div className={`${isRtl ? "lg:order-1" : "lg:order-2"} relative`}>
            <div className="relative w-full aspect-square md:h-80 rounded-xl overflow-hidden">
              <div className="absolute inset-0 border border-gray-200 rounded-xl shadow-lg z-10"></div>
              <ProductImage
                src="https://images.pexels.com/photos/4391470/pexels-photo-4391470.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt={t("home.shipping.title")}
                className="w-full h-full object-cover rounded-xl relative z-0"
                width={1260}
                height={750}
                aspectRatio="square"
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={85}
                priority={false}
                showZoom={false}
                placeholderSize={50}
                fallbackSrc="https://images.pexels.com/photos/1058775/pexels-photo-1058775.jpeg?auto=compress&cs=tinysrgb&w=800"
              />
              <div className="absolute top-2 left-2 rtl:right-2 rtl:left-auto z-20">
                <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white text-xs font-bold py-1 px-2 rounded-full flex items-center gap-1 shadow-sm">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>{t("home.shipping.badge")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(ShippingDeliverySection);
