import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Star,
  TicketPercent,
  Tags,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { useState } from "react";
import { NavLink } from "react-router-dom";


const menuItems = [
  {
    name: "Dashboard",
    path: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Products",
    path: "/admin/products",
    icon: Package,
  },
  {
    name: "Orders",
    path: "/admin/orders",
    icon: ShoppingBag,
  },
  {
    name: "Customers",
    path: "/admin/customers",
    icon: Users,
  },
  {
    name: "Reviews",
    path: "/admin/reviews",
    icon: Star,
  },
  {
    name: "Coupons",
    path: "/admin/coupons",
    icon: TicketPercent,
  },
  {
    name: "Brands",
    path: "/admin/brands",
    icon: Tags,
  },
  {
    name: "Settings",
    path: "/admin/settings",
    icon: Settings,
  },
];


function Sidebar() {

  const [collapsed, setCollapsed] = useState(false);


  return (

    <aside
      className={`
        h-screen sticky top-0
        bg-black text-white
        transition-all duration-300
        flex flex-col
        ${collapsed ? "w-20" : "w-72"}
      `}
    >


      {/* LOGO */}

      <div className="h-24 flex items-center justify-between px-6 border-b border-white/10">

        {!collapsed && (

          <div>

            <h1 className="text-xl font-semibold tracking-[0.25em]">
              LUMIÈRE
            </h1>

            <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">
              Admin Panel
            </p>

          </div>

        )}



        <button
          onClick={() => setCollapsed(!collapsed)}
          className="
            w-10 h-10 rounded-xl
            bg-white/10
            flex items-center justify-center
            hover:bg-white/20
            transition
          "
        >

          {collapsed ? (
            <ChevronRight size={18}/>
          ) : (
            <ChevronLeft size={18}/>
          )}

        </button>


      </div>





      {/* NAVIGATION */}

      <nav className="flex-1 px-4 py-8 space-y-2">


        {menuItems.map((item)=>{


          const Icon = item.icon;


          return (

            <NavLink

              key={item.name}

              to={item.path}

              end={item.path === "/admin"}

              className={({isActive}) => `

                group
                flex items-center gap-4
                px-4 py-3
                rounded-xl
                transition-all duration-200

                ${
                  isActive
                  ?
                  "bg-[#C4A574] text-black"
                  :
                  "text-gray-300 hover:bg-white/10 hover:text-white"
                }

              `}

            >

              <Icon size={21}/>


              {!collapsed && (

                <span className="
                  text-sm
                  uppercase
                  tracking-wider
                  font-medium
                ">
                  {item.name}
                </span>

              )}


            </NavLink>

          );

        })}


      </nav>







      {/* USER AREA */}

      <div className="
        border-t
        border-white/10
        p-4
      ">


        <div className={`
          flex items-center
          gap-3
          ${collapsed ? "justify-center" : ""}
        `}>


          <div className="
            w-11 h-11
            rounded-full
            bg-[#C4A574]
            text-black
            flex items-center justify-center
            font-semibold
          ">
            A
          </div>



          {!collapsed && (

            <div className="flex-1">

              <p className="text-sm font-medium">
                Admin
              </p>

              <p className="text-xs text-gray-400">
                Store Manager
              </p>

            </div>

          )}



        </div>





        <button

          className="
            mt-4
            w-full
            flex items-center
            gap-3
            px-4 py-3
            rounded-xl
            text-gray-300
            hover:bg-red-500/20
            hover:text-red-400
            transition
          "

        >

          <LogOut size={20}/>


          {!collapsed && (

            <span className="
              text-sm
              uppercase
              tracking-wider
            ">
              Logout
            </span>

          )}

        </button>



      </div>



    </aside>

  );

}


export default Sidebar;