export default function Card({ children, className = "" }) {
  return (
    <div
      className={[
        "rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl shadow-black/20 backdrop-blur",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}