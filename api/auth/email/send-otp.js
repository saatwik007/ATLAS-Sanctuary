import { connectToDb } from "../../_lib/db.js";
import { OtpRequest } from "../../_lib/models/OtpRequest.js";
import { generateOtp, hashOtp } from "../../_lib/crypto.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "METHOD_NOT_ALLOWED" });

  const { email } = req.body || {};
  if (!email) return res.status(400).json({ error: "EMAIL_REQUIRED" });

  await connectToDb();

  const code = generateOtp();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  await OtpRequest.create({
    email: email.toLowerCase(),
    codeHash: hashOtp(code),
    expiresAt,
  });

  // For MVP dev mode only: return OTP so you can test without email provider
  const devMode = process.env.OTP_DEV_MODE === "true";
  return res.status(200).json({ ok: true, devOtp: devMode ? code : undefined });
}