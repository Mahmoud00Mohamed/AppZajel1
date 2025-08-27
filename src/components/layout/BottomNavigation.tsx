import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { useFavorites } from "../../context/FavoritesContext";
import { motion } from "framer-motion";

// الخطوة 1: استيراد الأيقونات الجديدة من مكتبة react-icons (Material Design Icons)
import {
  MdOutlineHome,
  MdHome,
  MdOutlineGridView,
  MdGridView,
  MdOutlineNotifications,
  MdNotifications,
  MdOutlineFavoriteBorder,
  MdFavorite,
  MdOutlineInventory2,
  MdInventory2,
} from "react-icons/md";

const BottomNavigation: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { favoritesCount } = useFavorites();

  // الخطوة 2: تحديث بنية مصفوفة الأيقونات لتشمل نسختين لكل أيقونة
  const navItems = React.useMemo(
    () => [
      {
        id: "home",
        path: "/",
        icon: { outline: MdOutlineHome, filled: MdHome },
        labelKey: "bottomNav.home",
      },
      {
        id: "categories",
        path: "/categories",
        icon: { outline: MdOutlineGridView, filled: MdGridView },
        labelKey: "bottomNav.categories",
      },
      {
        id: "notifications",
        path: "/notifications",
        icon: { outline: MdOutlineNotifications, filled: MdNotifications },
        labelKey: "bottomNav.notifications",
      },
      {
        id: "favorites",
        path: "/favorites",
        icon: { outline: MdOutlineFavoriteBorder, filled: MdFavorite },
        labelKey: "bottomNav.favorites",
        badge: favoritesCount,
      },
      {
        id: "packages",
        path: "/packages",
        icon: { outline: MdOutlineInventory2, filled: MdInventory2 },
        labelKey: "bottomNav.packages",
      },
    ],
    [favoritesCount]
  );

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.04)] md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex h-[65px] justify-around">
        {navItems.map((item) => {
          const active = isActive(item.path);
          // الخطوة 3: اختيار الأيقونة المناسبة (ممتلئة أو مخططة) بناءً على الحالة
          const Icon = active ? item.icon.filled : item.icon.outline;

          return (
            <Link
              key={item.id}
              to={item.path}
              className="relative flex flex-1 flex-col items-center justify-center gap-1 pt-1 text-center"
            >
              {active && (
                <motion.div
                  layoutId="active-indicator"
                  className="absolute top-0 h-1 w-8 rounded-full bg-purple-800"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}

              <motion.div className="relative" whileTap={{ scale: 0.9 }}>
                {/* تم تعديل حجم الأيقونة ليتناسب مع التصميم الجديد */}
                <Icon
                  size={26}
                  className={`transition-colors ${
                    active ? "text-purple-800" : "text-gray-500"
                  }`}
                />

                {item.id === "notifications" && (
                  <span className="absolute -top-1 -right-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
                )}
                {item.id === "favorites" &&
                  typeof item.badge === "number" &&
                  item.badge > 0 && (
                    <span className="absolute -top-1.5 -right-2 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-medium text-white">
                      {item.badge > 9 ? "9+" : item.badge}
                    </span>
                  )}
              </motion.div>

              <span
                className={`text-[11px] font-medium transition-colors ${
                  active ? "text-purple-800" : "text-gray-600"
                }`}
              >
                {t(item.labelKey)}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;
