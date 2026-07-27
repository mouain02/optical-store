import Sidebar from "./Sidebar";
import Topbar from "./Topbar";


function AdminLayout({
  children,
  activeSection,
  setActiveSection,
}) {


  return (

    <div
      className="
        min-h-screen
        bg-[#f8f7f5]
        flex
      "
    >   

      <Sidebar

        activeSection={activeSection}

        setActiveSection={setActiveSection}

      />



      <div
        className="
          flex-1
          flex
          flex-col
        "
      >


        <Topbar />



        <main
          className="
            p-6
          "
        >

          {children}

        </main>



      </div>



    </div>

  );

}


export default AdminLayout;