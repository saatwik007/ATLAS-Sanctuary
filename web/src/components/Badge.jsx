const colors = {
  CONFIRMED_AWAITING_PAYMENT: "bg-emerald-500/15 text-emerald-200 border-emerald-400/20",
  PENDING_APPROVAL: "bg-amber-500/15 text-amber-200 border-amber-400/20",
  APPROVED_AWAITING_PAYMENT: "bg-sky-500/15 text-sky-200 border-sky-400/20",
  CONFIRMED_PAID: "bg-fuchsia-500/15 text-fuchsia-200 border-fuchsia-400/20",
  REJECTED: "bg-rose-500/15 text-rose-200 border-rose-400/20",
};

export default function Badge({ status }) {
  const cls = colors[status] || "bg-white/10 text-slate-200 border-white/10";
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${cls}`}>
      {status.replaceAll("_", " ")}
    </span>
  );
}