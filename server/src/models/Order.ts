import mongoose, { Document, Schema } from "mongoose";

interface IOrderItem {
  product: mongoose.Schema.Types.ObjectId;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

interface IAddress {
  fullName: string;
  phone: string;
  line1: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export interface IOrder extends Document {
  user: mongoose.Schema.Types.ObjectId;
  products: IOrderItem[];
  totalPrice: number;
  paymentStatus: "pending" | "paid" | "failed";
  shippingStatus: "processing" | "shipped" | "delivered";
  address: IAddress;
  trackingId: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        title: String,
        price: Number,
        quantity: Number,
        image: String,
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    shippingStatus: {
      type: String,
      enum: ["processing", "shipped", "delivered"],
      default: "processing",
    },
    address: {
      fullName: String,
      phone: String,
      line1: String,
      city: String,
      state: String,
      pincode: String,
      country: String,
    },
    trackingId: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model<IOrder>("Order", OrderSchema);