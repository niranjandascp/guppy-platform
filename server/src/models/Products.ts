import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
  title: string;
  slug: string;
  description: string;
  category: string;
  breed: string;
  price: number;
  discountPrice: number;
  stock: number;
  images: string[];
  featured: boolean;
  rating: number;
  reviewsCount: number;
  genetics: string;
  tankSize: string;
  lifespan: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    breed: { type: String, default: "" },
    price: { type: Number, required: true },
    discountPrice: { type: Number, default: 0 },
    stock: { type: Number, required: true, default: 0 },
    images: [{ type: String }],
    featured: { type: Boolean, default: false },
    rating: { type: Number, default: 0 },
    reviewsCount: { type: Number, default: 0 },
    genetics: { type: String, default: "" },
    tankSize: { type: String, default: "" },
    lifespan: { type: String, default: "" },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

ProductSchema.index({ title: "text" });
ProductSchema.index({ category: 1 });
ProductSchema.index({ featured: 1 });

export default mongoose.model<IProduct>("Product", ProductSchema);