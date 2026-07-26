import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function AdminLayout({
  title,
  children,
}) {
  return (
    <div className="min-h-screen bg-[#F7F7F5] flex">

      {/* SIDEBAR */}

      <Sidebar />



      {/* MAIN */}

      <div className="flex-1 flex flex-col min-w-0">

        <Topbar title={title} />



        <main className="flex-1 overflow-y-auto">

          <div className="max-w-[1700px] mx-auto px-8 py-8">

            {children}

          </div>

        </main>

      </div>

    </div>
  );
}

export default AdminLayout;