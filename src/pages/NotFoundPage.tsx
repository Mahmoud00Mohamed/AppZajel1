import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Home, Search } from "lucide-react";
import { ProductImage } from "../features/images";

const NotFoundPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <ProductImage
            src="https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt={isArabic ? "صفحة غير موجودة" : "Page not found"}
            className="w-64 h-64 object-cover rounded-full mx-auto shadow-2xl"
            width={256}
            height={256}
            aspectRatio="square"
            sizes="256px"
            quality={85}
            priority={true}
            showZoom={false}
          />
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <div className="flex items-center justify-center mb-6">
            <Search size={48} className="text-gray-400" />
          </div>

          <h1 className="text-6xl font-bold text-primary mb-6">404</h1>

          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-800">
            {isArabic ? "الصفحة غير موجودة" : "Page Not Found"}
          </h2>

          <p className="text-gray-600 mb-8 text-lg leading-relaxed max-w-md mx-auto">
            {isArabic
              ? "عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها. ربما تكون قد كتبت العنوان خطأ أو أن الصفحة لم تعد متاحة."
              : "Sorry, the page you are looking for doesn't exist or has been moved. You may have mistyped the address or the page may no longer be available."}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-3 rounded-xl hover:bg-primary-dark transition-colors shadow-lg hover:shadow-xl font-medium"
            >
              <Home size={20} />
              {isArabic ? "العودة للصفحة الرئيسية" : "Back to Home"}
            </Link>

            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-8 py-3 rounded-xl hover:bg-gray-200 transition-colors shadow-lg hover:shadow-xl font-medium"
            >
              <Search size={20} />
              {isArabic ? "تصفح المنتجات" : "Browse Products"}
            </Link>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              {isArabic
                ? "إذا كنت تعتقد أن هذا خطأ، يرجى"
                : "If you think this is an error, please"}{" "}
              <Link
                to="/contact"
                className="text-primary hover:text-primary-dark underline"
              >
                {isArabic ? "اتصل بنا" : "contact us"}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
