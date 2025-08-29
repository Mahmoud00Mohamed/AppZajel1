import mongoose from "mongoose";

const CartItemSchema = new mongoose.Schema({
  productId: {
    type: Number,
    required: true,
  },
  productData: {
    nameEn: { type: String, required: true },
    nameAr: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    categoryId: { type: String },
    occasionId: { type: String },
    isBestSeller: { type: Boolean, default: false },
    isSpecialGift: { type: Boolean, default: false },
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1,
  },
}, { _id: false });

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },
    items: [CartItemSchema],
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { 
    timestamps: true,
  }
);

// Update the updatedAt field on save
CartSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const Cart = mongoose.model("Cart", CartSchema);
export default Cart;