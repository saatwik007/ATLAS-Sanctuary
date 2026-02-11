import mongoose from "mongoose";

const OtpRequestSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, index: true },
    codeHash: { type: String, required: true },
    expiresAt: { type: Date, required: true, index: true },
    consumedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

OtpRequestSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const OtpRequest =
  mongoose.models.OtpRequest || mongoose.model("OtpRequest", OtpRequestSchema);