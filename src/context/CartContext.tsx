// src/context/CartContext.tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useAuth } from "./AuthContext";
import { useToast } from "./ToastContext";

interface CartItem {
  id: number;
  nameEn: string;
  nameAr: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  isLoading: boolean;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const API_BASE_URL = "https://localhost:3002/api/cart";
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const { showSuccess, showError } = useToast();

  const getAuthHeaders = () => {
    const token = localStorage.getItem("accessToken");
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  };

  // Load cart from server when user is authenticated
  const refreshCart = useCallback(async () => {
    if (!isAuthenticated) return;

    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}`, {
        headers: getAuthHeaders(),
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setCart(data.cart || []);
      } else {
        console.error("Failed to fetch cart");
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated && user) {
      refreshCart();
    } else {
      // Clear cart when user logs out
      setCart([]);
    }

  const addToCart = (product: CartItem) => {
    if (!isAuthenticated) {
      showError(
        "تسجيل الدخول مطلوب",
        "يجب تسجيل الدخول لإضافة المنتجات إلى السلة"
      );
      return;
    }

    try {
      addToCartServer(product);
    } catch (error) {
      console.error("خطأ في إضافة المنتج إلى عربة التسوق:", error);
      showError("خطأ", "حدث خطأ أثناء إضافة المنتج إلى السلة");
      throw error;
    }
  };

  const addToCartServer = async (product: CartItem) => {
    try {
      const response = await fetch(`${API_BASE_URL}/add`, {
        method: "POST",
        headers: getAuthHeaders(),
        credentials: "include",
        body: JSON.stringify({ 
          productData: product,
          quantity: product.quantity || 1 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Update local state immediately for better UX
        setCart((prev) => {
          const existingItem = prev.find((item) => item.id === product.id);

          if (existingItem) {
            return prev.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + (product.quantity || 1) }
                : item
            );
          } else {
            const newItem = { ...product, quantity: product.quantity || 1 };
            return [...prev, newItem];
          }
        });
        
        showSuccess(
          "تم الإضافة للسلة",
          `تم إضافة ${product.nameAr} إلى السلة`,
          undefined,
          "cart-success"
        );
      } else {
        throw new Error(data.message || "فشل في إضافة المنتج");
      }
    } catch (error) {
      console.error("Error adding to cart server:", error);
      showError("خطأ", (error as Error).message);
      throw error;
    }
  };
  const removeFromCart = (id: number) => {
    if (!isAuthenticated) {
      showError(
        "تسجيل الدخول مطلوب",
        "يجب تسجيل الدخول لإدارة السلة"
      );
      return;
    }

    try {
      removeFromCartServer(id);
    } catch (error) {
      console.error("خطأ في حذف المنتج من عربة التسوق:", error);
      showError("خطأ", "حدث خطأ أثناء حذف المنتج من السلة");
    }
  };

  const removeFromCartServer = async (productId: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/remove/${productId}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        // Remove from local state immediately
        setCart((prev) => prev.filter((item) => item.id !== productId));
        
        const removedItem = cart.find((item) => item.id === productId);
        if (removedItem) {
          showSuccess(
            "تم الحذف من السلة",
            `تم حذف ${removedItem.nameAr} من السلة`
          );
        }
      } else {
        throw new Error(data.message || "فشل في حذف المنتج");
      }
    } catch (error) {
      console.error("Error removing from cart server:", error);
      showError("خطأ", (error as Error).message);
      throw error;
    }
  };
  const updateQuantity = (id: number, quantity: number) => {
    if (!isAuthenticated) {
      showError(
        "تسجيل الدخول مطلوب",
        "يجب تسجيل الدخول لإدارة السلة"
      );
      return;
    }

    try {
      if (quantity <= 0) {
        removeFromCart(id);
        return;
      }

      updateQuantityServer(id, quantity);
    } catch (error) {
      console.error("خطأ في تحديث كمية المنتج:", error);
      showError("خطأ", "حدث خطأ أثناء تحديث الكمية");
    }
  };

  const updateQuantityServer = async (productId: number, quantity: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/update/${productId}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        credentials: "include",
        body: JSON.stringify({ quantity }),
      });

      const data = await response.json();

      if (response.ok) {
        // Update local state immediately
        setCart((prev) =>
          prev.map((item) =>
            item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
          )
        );
      } else {
        throw new Error(data.message || "فشل في تحديث الكمية");
      }
    } catch (error) {
      console.error("Error updating quantity server:", error);
      showError("خطأ", (error as Error).message);
      throw error;
    }
  };
  const clearCart = () => {
    if (!isAuthenticated) {
      showError(
        "تسجيل الدخول مطلوب",
        "يجب تسجيل الدخول لإدارة السلة"
      );
      return;
    }

    try {
      clearCartServer();
    } catch (error) {
      console.error("خطأ في مسح عربة التسوق:", error);
      showError("خطأ", "حدث خطأ أثناء مسح السلة");
    }
  };

  const clearCartServer = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/clear`, {
        method: "DELETE",
        headers: getAuthHeaders(),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        setCart([]);
        showSuccess("تم المسح", "تم مسح السلة بنجاح");
      } else {
        throw new Error(data.message || "فشل في مسح السلة");
      }
    } catch (error) {
      console.error("Error clearing cart server:", error);
      showError("خطأ", (error as Error).message);
      throw error;
    }
  };
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        isLoading,
        refreshCart,
        isLoading,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
