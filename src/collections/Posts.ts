import mongoose, { Model, Schema, Types } from "mongoose";
import { IUser } from "./Users";
import { ISessionUser } from "@/lib/auth";

export interface IArticle {
  _id?: string;
  author: { id: string; email: string };
  title: string;
  body?: string;
  description?: string;
  image?: string;
  createdAt: string;
  updated_at: string;
  category?: "technology" | "politics" | "sport";
}

const articleSchema = new Schema<IArticle>(
  {
    author: {
      required: [true, "Author is required."],
      type: {
        id: { type: String, required: true },
        email: { type: String, required: true },
      },
    },
    title: { type: String, required: true },
    description: { type: String, required: [true, "Description is required."] },
    body: { type: String },
    image: { type: String },
    category: { type: String },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Article: Model<IArticle> =
  mongoose.models.Article || mongoose.model<IArticle>("Article", articleSchema);

export default Article;
