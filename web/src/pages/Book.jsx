import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Container from "../components/Container";
import NavBar from "../components/NavBar";
import Card from "../components/Card";
import Button from "../components/Button";
import Badge from "../components/Badge";
import { mockApi } from "../api/mock";

function todayISO() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export default function Book() {
  const { zooId } = useParams();
  const navigate = useNavigate();

  const [date, setDate] = useState(todayISO());
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [msg, setMsg] = useState("");

  const total = useMemo(() => qty * 100, [qty]);

  async function submit() {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    setLoading(true);
    setMsg("");
    try {
      const res = await mockApi.createBooking({ zooId, date, qty: Number(qty) });
      if (!res.ok) throw new Error(res.error || "Booking failed");
      setResult(res.booking);
      setMsg("Booking submitted.");
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
          <h1 className="text-3xl font-bold tracking-tight">Book Visit Pass</h1>
          <p className="mt-2 text-slate-300">
            Day-based booking. First N bookings are auto-confirmed; later ones go to admin approval.
          </p>

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
            <div className="font-semibold">Pricing (demo)</div>
            <div className="mt-1 text-slate-300">₹100 per ticket (we will make this admin-configurable later).</div>
          </div>
        </div>

        <Card>
          <div className="text-sm font-semibold text-slate-200">Visit Date</div>
          <input
            type="date"
            className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/40 px-3 py-2 text-sm outline-none focus:border-indigo-400/50"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <div className="mt-4 text-sm font-semibold text-slate-200">Quantity</div>
          <input
            type="number"
            min="1"
            max="10"
            className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/40 px-3 py-2 text-sm outline-none focus:border-indigo-400/50"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
          />

          <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-3 text-sm">
            <div className="flex items-center justify-between">
              <div className="text-slate-300">Total</div>
              <div className="text-lg font-bold">₹{total}</div>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <Button onClick={submit} disabled={loading}>
              {loading ? "Submitting..." : "Submit Booking"}
            </Button>
            <Button variant="ghost" onClick={() => navigate("/my-bookings")}>
              Download Pass
            </Button>
          </div>

          {msg && <div className="mt-4 text-sm text-slate-200">{msg}</div>}

          {result && (
            <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/30 p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-semibold">Booking Created</div>
                <Badge status={result.status} />
              </div>

              <div className="mt-3 text-sm text-slate-300">
                <div>Booking ID: <span className="font-mono text-slate-100">{result.id}</span></div>
                <div>Date: <span className="text-slate-100">{result.date}</span></div>
                <div>Qty: <span className="text-slate-100">{result.qty}</span></div>
              </div>

              {result.paymentLink && (
                <div className="mt-4">
                  <a href={result.paymentLink} target="_blank" rel="noreferrer">
                    <Button>Pay Now</Button>
                  </a>
                </div>
              )}

              {!result.paymentLink && (
                <div className="mt-4 text-sm text-slate-300">
                  Payment link will be shared after admin approval.
                </div>
              )}
            </div>
          )}
        </Card>
      </div>
    </Container>
  );
}