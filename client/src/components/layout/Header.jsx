import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import storeConfig from "../../config/storeConfig";
import { toggleMobileMenu, closeMobileMenu, toggleSearch, setLanguage } from "../../redux/slices/uiSlice";
import { selectCartCount } from "../../redux/slices/cartSlice";
import { logout } from "../../redux/slices/authSlice";
import i18n from "../../i18n";

const IconSearch = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const IconUser = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const IconCart = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
  </svg>
);

const IconMenu = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

export default function Header() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const { mobileMenuOpen, searchOpen } = useSelector((s) => s.ui);
  const cartCount = useSelector(selectCartCount);
  const { user } = useSelector((s) => s.auth);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navLinks = [
    { to: "/shop", label: t("nav.shop") },
    { to: "/shop?category=prescription", label: t("nav.prescription") },
    { to: "/shop?category=sunglasses", label: t("nav.sunglasses") },
    { to: "/shop?category=blue-light", label: t("nav.blueLight") },
    { to: "/shop?category=kids", label: t("nav.kids") },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    const q = e.target.search.value.trim();
    if (q) navigate(`/shop?search=${encodeURIComponent(q)}`);
    dispatch(toggleSearch());
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    dispatch(setLanguage(lng));
  };

  const handleLogout = () => {
    dispatch(logout());
    setUserMenuOpen(false);
    dispatch(closeMobileMenu());
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const userMenuItems = user?.role === "admin"
    ? [
        { to: "/admin", label: t("admin.dashboard") },
        { to: "/admin#products", label: t("admin.products") },
        { to: "/admin#orders", label: t("admin.orders") },
        { to: "/admin#customers", label: t("admin.customers") },
        { to: "/admin#reviews", label: t("admin.reviews") },
        { to: "/admin#coupons", label: t("admin.coupons") },
        { to: "/admin#brands", label: t("admin.brands") },
      ]
    : [
        { to: "/dashboard", label: t("account.dashboard") },
        { to: "/dashboard#profile", label: t("account.profile") },
        { to: "/dashboard#orders", label: t("account.orders") },
        { to: "/dashboard#addresses", label: t("account.addresses") },
        { to: "/dashboard#wishlist", label: t("account.wishlist") },
        { to: "/dashboard#reviews", label: t("account.reviews") },
      ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="section-padding flex items-center justify-between h-16">
        <Link to="/" className="font-heading text-2xl tracking-widest uppercase" onClick={() => dispatch(closeMobileMenu())}>
          {storeConfig.storeName}
        </Link>

        <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} className="text-xs uppercase tracking-widest hover:text-accent transition-colors duration-120">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <select
            className="hidden sm:block text-xs border-none bg-transparent focus:outline-none cursor-pointer"
            value={i18n.language}
            onChange={(e) => changeLanguage(e.target.value)}
            aria-label="Language"
          >
            <option value="en">EN</option>
            <option value="fr">FR</option>
            <option value="ar">AR</option>
          </select>

          <button type="button" onClick={() => dispatch(toggleSearch())} className="p-1 hover:text-accent transition-colors" aria-label={t("common.search")}>
            <IconSearch />
          </button>

          {user ? (
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setUserMenuOpen((open) => !open)}
                className="inline-flex items-center gap-2 text-sm uppercase tracking-widest hover:text-accent transition-colors"
                aria-haspopup="menu"
                aria-expanded={userMenuOpen}
              >
                <span className="h-8 px-3 inline-flex items-center justify-center rounded-full border border-gray-200 bg-gray-50 text-xs font-medium tracking-wide">
                  {user.name}
                </span>
                <span className="hidden md:inline text-[10px] text-gray-500">{user.role === "admin" ? t("nav.admin") : t("account.dashboard")}</span>
              </button>

              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-3 w-72 rounded-2xl border border-gray-100 bg-white shadow-xl overflow-hidden z-50"
                    role="menu"
                  >
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                    </div>
                    <div className="py-2">
                      {userMenuItems.map((item) => (
                        <Link
                          key={item.to}
                          to={item.to}
                          onClick={() => setUserMenuOpen(false)}
                          className="block px-4 py-2 text-sm hover:bg-gray-50"
                          role="menuitem"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                    <div className="border-t border-gray-100 p-2">
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
                        role="menuitem"
                      >
                        {t("nav.logout")}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link to="/login" className="p-1 hover:text-accent transition-colors" aria-label={t("nav.login")}>
              <IconUser />
            </Link>
          )}

          <Link to="/cart" className="p-1 hover:text-accent transition-colors relative" aria-label={t("nav.cart")}>
            <IconCart />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          <button type="button" className="lg:hidden p-1" onClick={() => dispatch(toggleMobileMenu())} aria-label="Menu">
            <IconMenu />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-gray-100 overflow-hidden"
          >
            <form onSubmit={handleSearch} className="section-padding py-4">
              <input
                name="search"
                type="search"
                placeholder={t("common.search")}
                className="input-field"
                autoFocus
              />
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
              onClick={() => dispatch(closeMobileMenu())}
            />
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.2 }}
              className="fixed top-0 right-0 h-full w-72 bg-white z-50 p-6 lg:hidden"
              aria-label="Mobile navigation"
            >
              <button type="button" className="mb-8 text-sm uppercase tracking-widest" onClick={() => dispatch(closeMobileMenu())}>
                ✕ {t("common.back")}
              </button>
              <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <Link key={link.to} to={link.to} className="text-sm uppercase tracking-widest" onClick={() => dispatch(closeMobileMenu())}>
                    {link.label}
                  </Link>
                ))}
                {user ? (
                  <>
                    {userMenuItems.map((item) => (
                      <Link key={item.to} to={item.to} onClick={() => dispatch(closeMobileMenu())} className="text-sm uppercase tracking-widest">
                        {item.label}
                      </Link>
                    ))}
                    <button type="button" onClick={handleLogout} className="text-sm uppercase tracking-widest text-left">
                      {t("nav.logout")}
                    </button>
                  </>
                ) : (
                  <Link to="/login" onClick={() => dispatch(closeMobileMenu())}>{t("nav.login")}</Link>
                )}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
