import Cart from "../models/Cart.js";
import User from "../models/User.js";

// Get user's cart
export const getCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    
    let cart = await Cart.findOne({ userId }).lean();
    
    if (!cart) {
      // Create empty cart if doesn't exist
      cart = new Cart({ userId, items: [] });
      await cart.save();
      cart = cart.toObject();
    }

    // Transform to match frontend format
    const formattedItems = cart.items.map(item => ({
      id: item.productId,
      nameEn: item.productData.nameEn,
      nameAr: item.productData.nameAr,
      price: item.productData.price,
      imageUrl: item.productData.imageUrl,
      quantity: item.quantity,
    }));

    const cartTotal = formattedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const cartCount = formattedItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    res.status(200).json({
      cart: formattedItems,
      cartTotal,
      cartCount,
    });
  } catch (err) {
    console.error("Error fetching cart:", err);
    res.status(500).json({ message: "خطأ في جلب السلة" });
  }
};

// Add to cart
export const addToCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productData, quantity = 1 } = req.body;

    // Validate required fields
    if (!productData || !productData.id) {
      return res.status(400).json({ message: "بيانات المنتج مطلوبة" });
    }

    if (quantity < 1) {
      return res.status(400).json({ message: "الكمية يجب أن تكون أكبر من صفر" });
    }

    let cart = await Cart.findOne({ userId });
    
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // Check if item already exists
    const existingItemIndex = cart.items.findIndex(
      item => item.productId === productData.id
    );

    if (existingItemIndex > -1) {
      // Update quantity if item exists
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      cart.items.push({
        productId: productData.id,
        productData: {
          nameEn: productData.nameEn,
          nameAr: productData.nameAr,
          price: productData.price,
          imageUrl: productData.imageUrl,
          categoryId: productData.categoryId,
          occasionId: productData.occasionId,
          isBestSeller: productData.isBestSeller || false,
          isSpecialGift: productData.isSpecialGift || false,
        },
        quantity: quantity,
      });
    }

    await cart.save();

    // Calculate totals
    const cartTotal = cart.items.reduce(
      (sum, item) => sum + item.productData.price * item.quantity,
      0
    );

    const cartCount = cart.items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    res.status(200).json({
      message: "تم إضافة المنتج إلى السلة بنجاح",
      cartTotal,
      cartCount,
    });
  } catch (err) {
    console.error("Error adding to cart:", err);
    res.status(500).json({ message: "خطأ في إضافة المنتج إلى السلة" });
  }
};

// Update item quantity
export const updateCartItem = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId } = req.params;
    const { quantity } = req.body;

    if (quantity < 1) {
      return res.status(400).json({ message: "الكمية يجب أن تكون أكبر من صفر" });
    }

    const cart = await Cart.findOne({ userId });
    
    if (!cart) {
      return res.status(404).json({ message: "السلة غير موجودة" });
    }

    const itemIndex = cart.items.findIndex(
      item => item.productId === parseInt(productId)
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "المنتج غير موجود في السلة" });
    }

    cart.items[itemIndex].quantity = quantity;
    await cart.save();

    // Calculate totals
    const cartTotal = cart.items.reduce(
      (sum, item) => sum + item.productData.price * item.quantity,
      0
    );

    const cartCount = cart.items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    res.status(200).json({
      message: "تم تحديث الكمية بنجاح",
      cartTotal,
      cartCount,
    });
  } catch (err) {
    console.error("Error updating cart item:", err);
    res.status(500).json({ message: "خطأ في تحديث المنتج" });
  }
};

// Remove from cart
export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId } = req.params;

    const cart = await Cart.findOne({ userId });
    
    if (!cart) {
      return res.status(404).json({ message: "السلة غير موجودة" });
    }

    const initialLength = cart.items.length;
    cart.items = cart.items.filter(
      item => item.productId !== parseInt(productId)
    );

    if (cart.items.length === initialLength) {
      return res.status(404).json({ message: "المنتج غير موجود في السلة" });
    }

    await cart.save();

    // Calculate totals
    const cartTotal = cart.items.reduce(
      (sum, item) => sum + item.productData.price * item.quantity,
      0
    );

    const cartCount = cart.items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    res.status(200).json({
      message: "تم حذف المنتج من السلة بنجاح",
      cartTotal,
      cartCount,
    });
  } catch (err) {
    console.error("Error removing from cart:", err);
    res.status(500).json({ message: "خطأ في حذف المنتج من السلة" });
  }
};

// Clear cart
export const clearCart = async (req, res) => {
  try {
    const userId = req.user.userId;

    const cart = await Cart.findOne({ userId });
    
    if (!cart) {
      return res.status(404).json({ message: "السلة غير موجودة" });
    }

    cart.items = [];
    await cart.save();

    res.status(200).json({
      message: "تم مسح السلة بنجاح",
      cartTotal: 0,
      cartCount: 0,
    });
  } catch (err) {
    console.error("Error clearing cart:", err);
    res.status(500).json({ message: "خطأ في مسح السلة" });
  }
};

// Get cart count
export const getCartCount = async (req, res) => {
  try {
    const userId = req.user.userId;
    
    const cart = await Cart.findOne({ userId });
    
    if (!cart) {
      return res.status(200).json({ count: 0 });
    }

    const cartCount = cart.items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    res.status(200).json({ count: cartCount });
  } catch (err) {
    console.error("Error getting cart count:", err);
    res.status(500).json({ message: "خطأ في جلب عدد عناصر السلة" });
  }
};