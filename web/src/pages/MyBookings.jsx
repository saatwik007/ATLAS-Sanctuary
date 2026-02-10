import { useEffect, useState } from "react";
import Container from "../components/Container";
import NavBar from "../components/NavBar";
import Card from "../components/Card";
import Button from "../components/Button";
import Badge from "../components/Badge";
import { mockApi } from "../api/mock";

export default function MyBookings() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  async function refresh() {
    setLoading(true);
    const res = await mockApi.myBookings();
    setItems(res.bookings || []);
    setLoading(false);
  }

  useEffect(() => {
    refresh();
  }, []);

  return (
    <Container>
      <NavBar />

      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Bookings</h1>
          <p className="mt-2 text-slate-300">Track approval, payment, and download ticket after payment.</p>
        </div>
        <Button variant="ghost" onClick={refresh}>
          Refresh
        </Button>
      </div>

      {loading ? (
        <div className="mt-8 text-slate-300">Loading...</div>
      ) : items.length === 0 ? (
        <div className="mt-8 text-slate-300">No bookings yet. Go to Zoos and book tickets.</div>
      ) : (
        <div className="mt-8 grid gap-4">
          {items.map((b) => (
            <Card key={b.id}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-lg font-bold">Booking #{b.id.slice(-6)}</div>
                  <div className="mt-1 text-sm text-slate-300">
                    Date: <span className="text-slate-100">{b.date}</span> • Qty:{" "}
                    <span className="text-slate-100">{b.qty}</span> • Total:{" "}
                    <span className="text-slate-100">₹{b.total}</span>
                  </div>
                </div>
                <Badge status={b.status} />
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {b.paymentLink && (b.status === "CONFIRMED_AWAITING_PAYMENT" || b.status === "APPROVED_AWAITING_PAYMENT") && (
                  <a href={b.paymentLink} target="_blank" rel="noreferrer">
                    <Button>Pay Now</Button>
                  </a>
                )}

                {b.status === "CONFIRMED_PAID" && (
                  <Button variant="ghost" onClick={() => alert("Later: download ticket PDF")}>
                    Download Ticket
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </Container>
  );
}