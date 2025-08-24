import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

const CartPage: React.FC = () => {
  const { t } = useTranslation();
  const isEmpty = true; // This would normally be determined by checking the cart state

  return (
    <div className="container-custom py-8">
      <h1 className="text-2xl font-bold mb-6">{t("cart.title")}</h1>

      {isEmpty ? (
        <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-lg">
          <ShoppingCart size={48} className="text-gray-300 mb-4" />
          <p className="text-gray-500 mb-6">{t("cart.empty")}</p>
          <Link to="/" className="btn btn-primary">
            {t("cart.continueShopping")}
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">{/* Cart items would go here */}</div>

          <div className="bg-gray-50 p-6 rounded-lg h-fit">
            <h3 className="text-lg font-bold mb-4">{t("cart.summary")}</h3>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">{t("cart.subtotal")}</span>
                <span>0.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{t("cart.shipping")}</span>
                <span>0.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{t("cart.tax")}</span>
                <span>0.00</span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between text-lg font-bold">
                <span>{t("cart.total")}</span>
                <span>0.00</span>
              </div>
            </div>

            <button className="btn btn-primary w-full mt-6">
              {t("cart.checkout")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
