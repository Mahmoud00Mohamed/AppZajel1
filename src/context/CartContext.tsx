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
  categoryId?: string;
  occasionId?: string;
  isBestSeller?: boolean;
  isSpecialGift?: boolean;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: CartItem) => Promise<void>;
  removeFromCart: (id: number) => Promise<void>;
  updateQuantity: (id: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  cartCount: number;
  cartTotal: number;
  isLoading: boolean;
  syncCart: () => Promise<void>;
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
  useEffect(() => {
    if (isAuthenticated && user) {
      loadCartFromServer();
    } else {
      // Load from localStorage for non-authenticated users
      loadCartFromLocalStorage();
    }
  }, [isAuthenticated, user]);

  const loadCartFromLocalStorage = () => {
    try {
      const savedCart = localStorage.getItem("zajil-cart");
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
      }
    } catch (error) {
      console.error("خطأ في تحميل السلة من التخزين المحلي:", error);
    }
  };

  const saveCartToLocalStorage = (cartItems: CartItem[]) => {
    try {
      localStorage.setItem("zajil-cart", JSON.stringify(cartItems));
    } catch (error) {
      console.error("خطأ في حفظ السلة في التخزين المحلي:", error);
    }
  };

  const loadCartFromServer = async () => {
    if (!isAuthenticated) return;

    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}`, {
        headers: getAuthHeaders(),
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        const serverCartItems = data.cart.items.map((item: any) => ({
          id: item.productId,
          nameEn: item.productData.nameEn,
          nameAr: item.productData.nameAr,
          price: item.productData.price,
          imageUrl: item.productData.imageUrl,
          quantity: item.quantity,
          categoryId: item.productData.categoryId,
          occasionId: item.productData.occasionId,
          isBestSeller: item.productData.isBestSeller,
          isSpecialGift: item.productData.isSpecialGift,
        }));
        setCart(serverCartItems);
      } else {
        console.error("Failed to fetch cart from server");
      }
    } catch (error) {
      console.error("Error loading cart from server:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const syncCart = async () => {
    if (!isAuthenticated) return;

    try {
      // Get local cart items
      const localCartItems = JSON.parse(localStorage.getItem("zajil-cart") || "[]");
      
      if (localCartItems.length === 0) {
        await loadCartFromServer();
        return;
      }

      const response = await fetch(`${API_BASE_URL}/sync`, {
        method: "POST",
        headers: getAuthHeaders(),
        credentials: "include",
        body: JSON.stringify({ localCartItems }),
      });

      if (response.ok) {
        const data = await response.json();
        const syncedCartItems = data.cart.items.map((item: any) => ({
          id: item.productId,
          nameEn: item.productData.nameEn,
          nameAr: item.productData.nameAr,
          price: item.productData.price,
          imageUrl: item.productData.imageUrl,
          quantity: item.quantity,
          categoryId: item.productData.categoryId,
          occasionId: item.productData.occasionId,
          isBestSeller: item.productData.isBestSeller,
          isSpecialGift: item.productData.isSpecialGift,
        }));
        setCart(syncedCartItems);
        
        // Clear local storage after successful sync
        localStorage.removeItem("zajil-cart");
        
        showSuccess("تم مزامنة السلة", "تم دمج عناصر السلة المحلية مع حسابك");
      }
    } catch (error) {
      console.error("Error syncing cart:", error);
    }
  };

  const addToCart = async (product: CartItem) => {
    if (!isAuthenticated) {
      showError(
        "تسجيل الدخول مطلوب",
        "يجب تسجيل الدخول لإضافة المنتجات إلى السلة"
      );
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/add`, {
        method: "POST",
        headers: getAuthHeaders(),
        credentials: "include",
        body: JSON.stringify({ 
          productData: {
            id: product.id,
            nameEn: product.nameEn,
            nameAr: product.nameAr,
            price: product.price,
            imageUrl: product.imageUrl,
            categoryId: product.categoryId,
            occasionId: product.occasionId,
            isBestSeller: product.isBestSeller,
            isSpecialGift: product.isSpecialGift,
          },
          quantity: product.quantity 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const updatedCartItems = data.cart.items.map((item: any) => ({
          id: item.productId,
          nameEn: item.productData.nameEn,
          nameAr: item.productData.nameAr,
          price: item.productData.price,
          imageUrl: item.productData.imageUrl,
          quantity: item.quantity,
          categoryId: item.productData.categoryId,
          occasionId: item.productData.occasionId,
          isBestSeller: item.productData.isBestSeller,
          isSpecialGift: item.productData.isSpecialGift,
        }));
        setCart(updatedCartItems);
      } else {
        throw new Error(data.message || "فشل في إضافة المنتج");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      showError("خطأ", (error as Error).message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (productId: number) => {
    if (!isAuthenticated) {
      showError(
        "تسجيل الدخول مطلوب",
        "يجب تسجيل الدخول لإدارة السلة"
      );
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/remove/${productId}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        const updatedCartItems = data.cart.items.map((item: any) => ({
          id: item.productId,
          nameEn: item.productData.nameEn,
          nameAr: item.productData.nameAr,
          price: item.productData.price,
          imageUrl: item.productData.imageUrl,
          quantity: item.quantity,
          categoryId: item.productData.categoryId,
          occasionId: item.productData.occasionId,
          isBestSeller: item.productData.isBestSeller,
          isSpecialGift: item.productData.isSpecialGift,
        }));
        setCart(updatedCartItems);
      } else {
        throw new Error(data.message || "فشل في حذف المنتج");
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
      showError("خطأ", (error as Error).message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (productId: number, quantity: number) => {
    if (!isAuthenticated) {
      showError(
        "تسجيل الدخول مطلوب",
        "يجب تسجيل الدخول لإدارة السلة"
      );
      return;
    }

    if (quantity <= 0) {
      await removeFromCart(productId);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/update/${productId}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        credentials: "include",
        body: JSON.stringify({ quantity }),
      });

      const data = await response.json();

      if (response.ok) {
        const updatedCartItems = data.cart.items.map((item: any) => ({
          id: item.productId,
          nameEn: item.productData.nameEn,
          nameAr: item.productData.nameAr,
          price: item.productData.price,
          imageUrl: item.productData.imageUrl,
          quantity: item.quantity,
          categoryId: item.productData.categoryId,
          occasionId: item.productData.occasionId,
          isBestSeller: item.productData.isBestSeller,
          isSpecialGift: item.productData.isSpecialGift,
        }));
        setCart(updatedCartItems);
      } else {
        throw new Error(data.message || "فشل في تحديث الكمية");
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
      showError("خطأ", (error as Error).message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = async () => {
    if (!isAuthenticated) {
      showError(
        "تسجيل الدخول مطلوب",
        "يجب تسجيل الدخول لإدارة السلة"
      );
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/clear`, {
        method: "DELETE",
        headers: getAuthHeaders(),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        setCart([]);
        showSuccess("تم المسح", "تم مسح جميع عناصر السلة بنجاح");
      } else {
        throw new Error(data.message || "فشل في مسح السلة");
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
      showError("خطأ", (error as Error).message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // For non-authenticated users, use localStorage
  const addToCartLocal = (product: CartItem) => {
    try {
      setCart((prev) => {
        const existingItem = prev.find((item) => item.id === product.id);

        let updatedCart;
        if (existingItem) {
          updatedCart = prev.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + (product.quantity || 1) }
              : item
          );
        } else {
          const newItem = { ...product, quantity: product.quantity || 1 };
          updatedCart = [...prev, newItem];
        }

        saveCartToLocalStorage(updatedCart);
        return updatedCart;
      });
    } catch (error) {
      console.error("خطأ في إضافة المنتج إلى عربة التسوق:", error);
      throw error;
    }
  };

  const removeFromCartLocal = (id: number) => {
    try {
      setCart((prev) => {
        const updatedCart = prev.filter((item) => item.id !== id);
        saveCartToLocalStorage(updatedCart);
        return updatedCart;
      });
    } catch (error) {
      console.error("خطأ في حذف المنتج من عربة التسوق:", error);
    }
  };

  const updateQuantityLocal = (id: number, quantity: number) => {
    try {
      if (quantity <= 0) {
        removeFromCartLocal(id);
        return;
      }

      setCart((prev) => {
        const updatedCart = prev.map((item) =>
          item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
        );
        saveCartToLocalStorage(updatedCart);
        return updatedCart;
      });
    } catch (error) {
      console.error("خطأ في تحديث كمية المنتج:", error);
    }
  };

  const clearCartLocal = () => {
    try {
      setCart([]);
      localStorage.removeItem("zajil-cart");
    } catch (error) {
      console.error("خطأ في مسح عربة التسوق:", error);
    }
  };

  // Wrapper functions that choose between server and local operations
  const addToCartWrapper = async (product: CartItem) => {
    if (isAuthenticated) {
      await addToCart(product);
    } else {
      addToCartLocal(product);
    }
  };

  const removeFromCartWrapper = async (id: number) => {
    if (isAuthenticated) {
      await removeFromCart(id);
    } else {
      removeFromCartLocal(id);
    }
  };

  const updateQuantityWrapper = async (id: number, quantity: number) => {
    if (isAuthenticated) {
      await updateQuantity(id, quantity);
    } else {
      updateQuantityLocal(id, quantity);
    }
  };

  const clearCartWrapper = async () => {
    if (isAuthenticated) {
      await clearCart();
    } else {
      clearCartLocal();
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
        addToCart: addToCartWrapper,
        removeFromCart: removeFromCartWrapper,
        updateQuantity: updateQuantityWrapper,
        clearCart: clearCartWrapper,
        cartCount,
        cartTotal,
        isLoading,
        syncCart,
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