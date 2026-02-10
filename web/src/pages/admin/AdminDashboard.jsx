import { useEffect, useState } from "react";
import Container from "../../components/Container";
import NavBar from "../../components/NavBar";
import Card from "../../components/Card";
import Button from "../../components/Button";
import Badge from "../../components/Badge";
import { mockApi } from "../../api/mock";

export default function AdminDashboard() {
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await mockApi.adminListPending();
    setPending(res.bookings || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function approve(id) {
    await mockApi.adminApprove(id);
    await load();
  }

  async function reject(id) {
    await mockApi.adminReject(id);
    await load();
  }

  return (
    <Container>
      <NavBar />

      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard (Demo)</h1>
          <p className="mt-2 text-slate-300">Approve overflow bookings and generate payment links.</p>
        </div>
        <Button variant="ghost" onClick={load}>
          Refresh
        </Button>
      </div>

      <div className="mt-8 grid gap-4">
        <Card>
          <div className="text-lg font-bold">Pending Approvals</div>
          <div className="mt-1 text-sm text-slate-300">
            These are bookings created after the auto-confirm threshold.
          </div>
        </Card>

        {loading ? (
          <div className="text-slate-300">Loading...</div>
        ) : pending.length === 0 ? (
          <div className="text-slate-300">No pending bookings right now.</div>
        ) : (
          pending.map((b) => (
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

              <div className="mt-4 flex gap-2">
                <Button onClick={() => approve(b.id)}>Approve</Button>
                <Button variant="danger" onClick={() => reject(b.id)}>
                  Reject
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </Container>
  );
}