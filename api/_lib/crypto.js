import crypto from "crypto";

export function generateOtp() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export function hashOtp(code) {
  return crypto.createHash("sha256").update(String(code)).digest("hex");
}