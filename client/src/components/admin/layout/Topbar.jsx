import { Menu } from "lucide-react";

function Topbar({ onMenuClick }) {
  return (
    <header className="h-20 bg-white border-b flex items-center justify-between px-4 sm:px-8 gap-4">
      <div className="flex items-center gap-3 min-w-0">
        <button onClick={onMenuClick} className="lg:hidden p-2 -ml-2 shrink-0">
          <Menu size={22} />
        </button>

        <div className="min-w-0">
          <h2 className="text-lg sm:text-xl font-semibold truncate">Admin Panel</h2>
          <p className="text-sm text-gray-500 hidden sm:block">
            Manage your optical store
          </p>
        </div>
      </div>

      <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center shrink-0">
        A
      </div>
    </header>
  );
}

export default Topbar;