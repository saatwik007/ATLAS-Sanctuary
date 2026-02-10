export default function Button({ children, variant = "primary", className = "", ...props }) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:cursor-not-allowed disabled:opacity-60";

  const styles = {
    primary: "bg-indigo-500 hover:bg-indigo-400 text-white",
    ghost: "bg-white/10 hover:bg-white/15 text-white",
    danger: "bg-rose-500 hover:bg-rose-400 text-white",
  };

  return (
    <button className={[base, styles[variant], className].join(" ")} {...props}>
      {children}
    </button>
  );
}