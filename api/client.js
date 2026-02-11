const API_BASE = import.meta.env.VITE_API_BASE || "";

async function post(path, body) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
}

export const api = {
  sendEmailOtp(email) {
    return post("/api/auth/email/send-otp", { email });
  },
  verifyEmailOtp(email, code) {
    return post("/api/auth/email/verify-otp", { email, code });
  },
};