import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Star,
  Tag,
  Building2,
  X,
  ArrowLeft,
} from "lucide-react";
const menu = [
  { id: "dashboard", name: "Dashboard", icon: LayoutDashboard },
  { id: "products", name: "Products", icon: Package },
  { id: "orders", name: "Orders", icon: ShoppingBag },
  { id: "customers", name: "Customers", icon: Users },
  { id: "reviews", name: "Reviews", icon: Star },
  { id: "coupons", name: "Coupons", icon: Tag },
  { id: "brands", name: "Brands", icon: Building2 },
];

function Sidebar({
  activeSection,
  setActiveSection,
  mobileMenuOpen,
  closeMobileMenu,
}) {
  return (
    <>
      {mobileMenuOpen && (
        <div
          onClick={closeMobileMenu}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      <aside
        className={`
    w-72 bg-black text-white min-h-screen p-6
    fixed top-0 left-0 z-50
    transform transition-transform duration-200 ease-in-out
    overflow-y-auto
    flex flex-col
    lg:sticky lg:translate-x-0
    ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
  `}
      >
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-2xl font-bold tracking-widest">LUMIÈRE</h1>
          <button onClick={closeMobileMenu} className="lg:hidden p-1">
            <X size={22} />
          </button>
        </div>

        <nav className="space-y-2">
          {menu.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`
                  w-full flex items-center gap-4 px-4 py-3 text-sm uppercase tracking-wider transition
                  ${activeSection === item.id
                    ? "bg-white text-black"
                    : "hover:bg-white hover:text-black"
                  }
                `}
              >
                <Icon size={18} />
                {item.name}
              </button>
            );
          })}
        </nav>
        <div className="mt-auto pt-8 border-t border-white/10">
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="
      flex items-center gap-4
      px-4 py-3
      text-sm uppercase tracking-wider
      rounded-lg
      transition
      hover:bg-white hover:text-black
    "
          >
            <ArrowLeft size={18} />
            Back to Store
          </Link>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;