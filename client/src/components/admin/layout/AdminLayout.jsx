import { useState } from "react";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";


function AdminLayout({
  children,
  activeSection,
  setActiveSection,
}) {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSetActiveSection = (section) => {
    setActiveSection(section);
    setMobileMenuOpen(false);
  };

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

        setActiveSection={handleSetActiveSection}

        mobileMenuOpen={mobileMenuOpen}

        closeMobileMenu={() => setMobileMenuOpen(false)}

      />



      <div
        className="
          flex-1
          flex
          flex-col
          min-w-0
        "
      >


        <Topbar
          onMenuClick={() => setMobileMenuOpen(true)}
        />



        <main
          className="
            p-4
            sm:p-6
          "
        >

          {children}

        </main>



      </div>



    </div>

  );

}


export default AdminLayout;