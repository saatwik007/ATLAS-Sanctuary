import crypto from "crypto";

export function hashOtp(code) {
  return crypto.createHash("sha256").update(code).digest("hex");
}

export function generateOtp() {
  // 6-digit
  return String(Math.floor(100000 + Math.random() * 900000));
}