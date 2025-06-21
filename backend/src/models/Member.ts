import mongoose, { Document, Schema } from "mongoose";

export interface IMember extends Document {
  name: string;
  phone?: string;
  address?: string;
  StartedDate: Date;
  expiryDate: Date;
  gender?: "male" | "female";
  paymentType: string;
  paymentMethod: string;
  Price: number;
  createdAt: Date;
  updatedAt: Date;
}

const memberSchema = new Schema<IMember>(
  {
    name: { type: String, required: true },
    phone: { type: String },
    address: { type: String },
    StartedDate: { type: Date, required: true },
    expiryDate: { type: Date, required: true },
    gender: { type: String, enum: ["male", "female"] },
    paymentType: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    Price: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Member = mongoose.model<IMember>("Member", memberSchema);
export default Member;
