import { NavLink, Outlet, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export default function AdminLayout() {
  const { t } = useTranslation();
  const { user } = useSelector((s) => s.auth);

  if (!user || user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  const links = [
    { to: "/admin", label: t("admin.dashboard"), end: true },
    { to: "/admin#users", label: t("admin.users") },
    { to: "/admin#products", label: t("admin.products") },
    { to: "/admin#orders", label: t("admin.orders") },
    { to: "/admin#customers", label: t("admin.customers") },
    { to: "/admin#reviews", label: t("admin.reviews") },
    { to: "/admin#coupons", label: t("admin.coupons") },
    { to: "/admin#brands", label: t("admin.brands") },
    { to: "/admin#store", label: t("admin.store") },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-primary text-white p-6 shrink-0">
        <h1 className="font-heading text-2xl uppercase tracking-widest mb-8">{t("nav.admin")}</h1>
        <nav className="space-y-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `block px-3 py-2 text-sm uppercase tracking-widest rounded transition-colors ${
                  isActive ? "bg-accent text-white" : "text-gray-400 hover:text-white"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <NavLink to="/" className="block mt-8 text-xs text-gray-500 hover:text-white uppercase tracking-widest">
          ← Store
        </NavLink>
      </aside>
      <main className="flex-1 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
