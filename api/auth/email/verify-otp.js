import { connectToDb } from "../../_lib/db.js";
import { OtpRequest } from "../../_lib/models/OtpRequest.js";
import { hashOtp } from "../../_lib/crypto.js";
import { signToken } from "../../_lib/jwt.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "METHOD_NOT_ALLOWED" });

  const { email, code } = req.body || {};
  if (!email || !code) return res.status(400).json({ error: "EMAIL_AND_CODE_REQUIRED" });

  await connectToDb();

  const record = await OtpRequest.findOne({
    email: email.toLowerCase(),
    codeHash: hashOtp(code),
    consumedAt: null,
    expiresAt: { $gt: new Date() },
  }).sort({ createdAt: -1 });

  if (!record) return res.status(401).json({ error: "INVALID_OR_EXPIRED_OTP" });

  record.consumedAt = new Date();
  await record.save();

  const token = signToken({ email: email.toLowerCase(), role: "USER" });
  return res.status(200).json({ ok: true, token });
}