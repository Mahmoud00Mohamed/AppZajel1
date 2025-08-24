import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { Home, Grid3X3, Bell, Heart, Package } from "lucide-react";
import { useFavorites } from "../../context/FavoritesContext";

const BottomNavigation: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { favoritesCount } = useFavorites();

  const navItems = [
    {
      id: "home",
      path: "/",
      icon: Home,
      labelKey: "bottomNav.home",
    },
    {
      id: "categories",
      path: "/categories",
      icon: Grid3X3,
      labelKey: "bottomNav.categories",
    },
    {
      id: "notifications",
      path: "/notifications",
      icon: Bell,
      labelKey: "bottomNav.notifications",
    },
    {
      id: "favorites",
      path: "/favorites",
      icon: Heart,
      labelKey: "bottomNav.favorites",
      badge: favoritesCount, // This `badge` property is what TypeScript is concerned about.
    },
    {
      id: "packages",
      path: "/packages",
      icon: Package,
      labelKey: "bottomNav.packages",
    },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 md:hidden"
      style={{ height: "70px" }}
    >
      <div className="flex justify-around items-center h-full">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <Link
              key={item.id}
              to={item.path}
              className={`flex flex-col items-center justify-center flex-1 transition-colors duration-200 relative ${
                active ? "text-indigo-600" : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <div className="relative">
                <Icon size={20} />
                {item.id === "notifications" && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
                {/* Fixed: Added a nullish coalescing operator (?? 0) or check if item.badge exists before comparing */}
                {/* The previous fix 'item.badge && item.badge > 0' was already robust, but sometimes linting might prefer explicit type narrowing. */}
                {/* Let's explicitly check if item.badge is a number AND greater than 0 to satisfy TypeScript. */}
                {item.id === "favorites" &&
                  typeof item.badge === "number" &&
                  item.badge > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] leading-none rounded-full w-4 h-4 flex items-center justify-center">
                      {item.badge > 99 ? "99+" : item.badge}
                    </span>
                  )}
              </div>
              <span
                className={`text-xs mt-1 font-medium truncate ${
                  active ? "text-indigo-600" : "text-gray-600"
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
