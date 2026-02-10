import { useState } from "react";
import Container from "../components/Container";
import NavBar from "../components/NavBar";
import Card from "../components/Card";
import Button from "../components/Button";
import { mockApi } from "../api/mock";

export default function Login() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [devOtp, setDevOtp] = useState("");
  const [step, setStep] = useState("EMAIL"); // EMAIL -> OTP
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  async function sendOtp() {
    setLoading(true);
    setMsg("");
    try {
      const res = await mockApi.sendEmailOtp(email);
      if (!res.ok) throw new Error(res.error || "Failed to send OTP");
      setDevOtp(res.devOtp || "");
      setStep("OTP");
      setMsg("OTP sent. (Dev mode shows OTP below)");
    } catch (e) {
      setMsg(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function verifyOtp() {
    setLoading(true);
    setMsg("");
    try {
      const res = await mockApi.verifyEmailOtp(email, otp);
      if (!res.ok) throw new Error(res.error || "OTP verification failed");
      localStorage.setItem("token", res.token);
      setMsg("Logged in successfully. Go to Zoos to book tickets.");
    } catch (e) {
      setMsg(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <NavBar />

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Login (Email OTP)</h1>
          <p className="mt-2 text-slate-300">
            MVP demo login. Later we’ll switch domestic users to SMS OTP and foreign users to email + passport.
          </p>

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
            <div className="font-semibold">Demo note</div>
            <div className="mt-1 text-slate-300">
              OTP is always <span className="font-mono text-white">123456</span> in mock mode.
            </div>
          </div>
        </div>

        <Card>
          <div className="text-sm font-semibold text-slate-200">Your Email</div>
          <input
            className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/40 px-3 py-2 text-sm outline-none focus:border-indigo-400/50"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {step === "OTP" && (
            <>
              <div className="mt-4 text-sm font-semibold text-slate-200">OTP</div>
              <input
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/40 px-3 py-2 text-sm outline-none focus:border-indigo-400/50"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              {devOtp && (
                <div className="mt-3 rounded-xl border border-white/10 bg-white/5 p-3 text-sm">
                  <div className="text-slate-300">Dev OTP:</div>
                  <div className="mt-1 font-mono text-lg font-bold">{devOtp}</div>
                </div>
              )}
            </>
          )}

          <div className="mt-6 flex gap-3">
            {step === "EMAIL" ? (
              <Button onClick={sendOtp} disabled={loading || !email}>
                {loading ? "Sending..." : "Send OTP"}
              </Button>
            ) : (
              <>
                <Button variant="ghost" onClick={() => setStep("EMAIL")} disabled={loading}>
                  Back
                </Button>
                <Button onClick={verifyOtp} disabled={loading || !otp}>
                  {loading ? "Verifying..." : "Verify & Login"}
                </Button>
              </>
            )}
          </div>

          {msg && <div className="mt-4 text-sm text-slate-200">{msg}</div>}
        </Card>
      </div>
    </Container>
  );
}