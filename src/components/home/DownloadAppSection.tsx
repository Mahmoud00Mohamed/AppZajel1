import React from "react";
import { useTranslation } from "react-i18next";
import { Smartphone, Apple } from "lucide-react";
import { ProductImage } from "../../features/images";

const DownloadAppSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  const features = React.useMemo(
    () => [
      {
        icon: <Smartphone size={24} className="text-purple-600" />,
        text: t("home.downloadApp.features.feature1"),
      },
      {
        icon: <Smartphone size={24} className="text-purple-600" />,
        text: t("home.downloadApp.features.feature2"),
      },
      {
        icon: <Smartphone size={24} className="text-purple-600" />,
        text: t("home.downloadApp.features.feature3"),
      },
    ],
    [t]
  );

  const downloadButtons = React.useMemo(
    () => [
      {
        href: "https://www.apple.com/app-store/",
        icon: <Apple size={24} className="text-white" />,
        platform: t("home.downloadApp.iosPlatform"),
        label: t("home.downloadApp.downloadOn"),
        storeName: "App Store",
        bgColor:
          "bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900",
      },
      {
        href: "https://play.google.com/store",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-6 h-6 fill-white"
          >
            <path d="M3.063 3.627A1.947 1.947 0 0 0 3 4.02v15.96c0 .72.405 1.384 1.055 1.723l7.89-9.683-7.882-9.393zm.742 16.028l7.878-9.677 2.47 2.945-10.348 6.732zm10.612-6.918l-2.6-3.102L21.001 4.02c.374.218.666.548.832.941L12.42 12.74zm1.553-1.356l6.53-6.55c.147.366.227.78.227 1.23v15.13c0 .63-.166 1.21-.453 1.71l-6.304-6.55 6.57-6.57-6.57-6.57z" />
          </svg>
        ),
        platform: t("home.downloadApp.androidPlatform"),
        label: t("home.downloadApp.getItOn"),
        storeName: "Google Play",
        bgColor:
          "bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900",
      },
    ],
    [t]
  );

  return (
    <section className="py-14 sm:py-18 bg-white">
      <div className="container-custom px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className={`${isRtl ? "lg:order-2" : "lg:order-1"}`}>
            <div className="text-center lg:text-start mb-10">
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium text-purple-800 leading-tight flex items-center justify-center lg:justify-start gap-3">
                <Smartphone size={32} className="text-purple-700" />
                {t("home.downloadApp.title")}
              </h2>
              <p className="mt-2.5 text-sm sm:text-base max-w-xs sm:max-w-md md:max-w-lg mx-auto lg:mx-0 leading-relaxed text-gray-600">
                {t("home.downloadApp.description")}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 rtl:space-x-reverse bg-white rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all duration-300 p-4"
                >
                  <div className="flex-shrink-0 p-2 bg-purple-50 rounded-lg">
                    {feature.icon}
                  </div>
                  <span className="text-gray-600 text-xs leading-relaxed">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              {downloadButtons.map((button, index) => (
                <a
                  key={index}
                  href={button.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-center ${button.bgColor} text-white px-5 py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105`}
                >
                  <div className="mr-3 rtl:ml-3 rtl:mr-0">{button.icon}</div>
                  <div className="text-left rtl:text-right">
                    <div className="text-xs opacity-80">{button.label}</div>
                    <div className="text-base font-semibold">
                      {button.storeName}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className={`${isRtl ? "lg:order-1" : "lg:order-2"} relative`}>
            <div className="relative w-full aspect-square md:h-80 rounded-xl overflow-hidden">
              <div className="absolute inset-0 border border-gray-200 rounded-xl shadow-lg z-10"></div>
              <ProductImage
                src="https://images.pexels.com/photos/12759222/pexels-photo-12759222.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt={t("home.downloadApp.title")}
                className="w-full h-full object-cover rounded-xl relative z-0"
                width={300}
                height={300}
                aspectRatio="square"
                sizes="(max-width: 768px) 300px, 400px"
                quality={90}
                priority={false}
                showZoom={false}
                placeholderSize={40}
                fallbackSrc="https://images.pexels.com/photos/1058775/pexels-photo-1058775.jpeg?auto=compress&cs=tinysrgb&w=600"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(DownloadAppSection);
