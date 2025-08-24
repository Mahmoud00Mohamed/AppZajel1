import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface FavoriteItem {
  id: number;
  nameEn: string;
  nameAr: string;
  price: number;
  imageUrl: string;
  categoryId?: string;
  occasionId?: string;
  isBestSeller?: boolean;
  isSpecialGift?: boolean;
  dateAdded: string;
}

interface FavoritesContextType {
  favorites: FavoriteItem[];
  addToFavorites: (item: Omit<FavoriteItem, "dateAdded">) => void;
  removeFromFavorites: (id: number) => void;
  isFavorite: (id: number) => boolean;
  clearFavorites: () => void;
  favoritesCount: number;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const savedFavorites = localStorage.getItem("zajil-favorites");
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } catch (error) {
      console.error("خطأ في تحميل المفضلة من التخزين المحلي:", error);
    }
  }, []);

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    try {
      localStorage.setItem("zajil-favorites", JSON.stringify(favorites));
    } catch (error) {
      console.error("خطأ في حفظ المفضلة في التخزين المحلي:", error);
    }
  }, [favorites]);

  const addToFavorites = (item: Omit<FavoriteItem, "dateAdded">) => {
    try {
      setFavorites((prev) => {
        // Check if item already exists
        if (prev.some((fav) => fav.id === item.id)) {
          console.log(`المنتج ${item.id} موجود بالفعل في المفضلة`);
          return prev;
        }

        const newFavorite: FavoriteItem = {
          ...item,
          dateAdded: new Date().toISOString(),
        };

        console.log(`تم إضافة المنتج ${item.id} إلى المفضلة بنجاح`);
        return [...prev, newFavorite];
      });
    } catch (error) {
      console.error("خطأ في إضافة المنتج إلى المفضلة:", error);
      throw error;
    }
  };

  const removeFromFavorites = (id: number) => {
    try {
      setFavorites((prev) => {
        const filtered = prev.filter((item) => item.id !== id);
        console.log(`تم حذف المنتج ${id} من المفضلة`);
        return filtered;
      });
    } catch (error) {
      console.error("خطأ في حذف المنتج من المفضلة:", error);
    }
  };

  const isFavorite = (id: number): boolean => {
    return favorites.some((item) => item.id === id);
  };

  const clearFavorites = () => {
    try {
      setFavorites([]);
      console.log("تم مسح جميع المفضلة");
    } catch (error) {
      console.error("خطأ في مسح المفضلة:", error);
    }
  };

  const favoritesCount = favorites.length;

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        clearFavorites,
        favoritesCount,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
