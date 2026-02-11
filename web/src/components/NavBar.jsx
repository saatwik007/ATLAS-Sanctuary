import { Link, NavLink, useNavigate } from "react-router-dom";
import Button from "./Button";
import { getEmail, isLoggedIn, logout } from "../utils/auth";

const linkClass = ({ isActive }) =>
  [
    "rounded-lg px-3 py-2 text-sm font-medium transition",
    isActive ? "bg-white/10 text-white" : "text-slate-200 hover:bg-white/10 hover:text-white",
  ].join(" ");

export default function NavBar() {
  const navigate = useNavigate();
  const loggedIn = isLoggedIn();
  const email = getEmail();

  return (
    <div className="mb-8 flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
      <Link to="/zoos" className="flex items-center gap-2">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 font-black">
          W
        </div>
        <div className="leading-tight">
          <div className="text-sm font-semibold">Sanctuary Tickets</div>
          <div className="text-xs text-slate-300">MVP Demo</div>
        </div>
      </Link>

      <div className="flex flex-wrap items-center gap-2">
        <NavLink className={linkClass} to="/login">
          Login
        </NavLink>
        <NavLink className={linkClass} to="/zoos">
          Wildlife Sanctuary
        </NavLink>
        <NavLink className={linkClass} to="/my-bookings">
          My Bookings
        </NavLink>
        <NavLink className={linkClass} to="/admin">
          Admin
        </NavLink>

        {loggedIn && (
          <div className="ml-2 flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
            <div className="text-xs text-slate-300">Signed in</div>
            <div className="max-w-[180px] truncate text-xs font-semibold text-slate-100">{email}</div>
            <Button
              variant="ghost"
              className="px-3 py-1.5 text-xs"
              onClick={() => {
                logout();
                navigate("/login");
              }}
            >
              Logout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}