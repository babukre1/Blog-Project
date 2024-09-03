import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface IUser {
  _id: Types.ObjectId;
  name?: string;
  hash: string;
  email: string;
  verified: boolean;
  verificationToken: string;
  imageUrl?: string;
  role?: string;
  created_at?: Date;
}
const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    imageUrl: { type: String, required: false },
    role: { type: String, default: "user" },
    verified: { type: Boolean, default: false },
    hash: { type: String, required: true },
    verificationToken: { type: String },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const User: Model<IUser> =
  mongoose.models.user || mongoose.model<IUser>("User", UserSchema);
export default User;
