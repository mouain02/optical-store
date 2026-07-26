import {
  Search,
  Bell,
  ChevronDown,
} from "lucide-react";

import { useState } from "react";


function Topbar({ title = "Dashboard" }) {

  const [open, setOpen] = useState(false);


  return (

    <header
      className="
        h-24
        bg-white
        border-b border-gray-200
        flex items-center
        justify-between
        px-8
        sticky top-0
        z-30
      "
    >


      {/* PAGE TITLE */}

      <div>

        <h1
          className="
            text-2xl
            font-semibold
            text-gray-900
            tracking-tight
          "
        >
          {title}
        </h1>


        <p
          className="
            text-sm
            text-gray-400
            mt-1
          "
        >
          Manage your optical store
        </p>

      </div>





      {/* RIGHT SIDE */}

      <div
        className="
          flex
          items-center
          gap-5
        "
      >



        {/* SEARCH */}

        <div
          className="
            hidden
            lg:flex
            items-center
            gap-3
            bg-gray-100
            rounded-xl
            px-4
            py-3
            w-72
          "
        >

          <Search
            size={18}
            className="text-gray-400"
          />


          <input

            type="text"

            placeholder="Search..."

            className="
              bg-transparent
              outline-none
              text-sm
              w-full
              placeholder:text-gray-400
            "

          />

        </div>





        {/* NOTIFICATION */}

        <button

          className="
            relative
            w-12
            h-12
            rounded-xl
            border
            border-gray-200
            flex
            items-center
            justify-center
            hover:bg-gray-50
            transition
          "

        >

          <Bell size={20}/>


          <span
            className="
              absolute
              top-2
              right-2
              w-2.5
              h-2.5
              rounded-full
              bg-[#C4A574]
            "
          />

        </button>






        {/* PROFILE */}

        <div className="relative">


          <button

            onClick={() => setOpen(!open)}

            className="
              flex
              items-center
              gap-3
              px-3
              py-2
              rounded-xl
              hover:bg-gray-50
              transition
            "

          >


            <div
              className="
                w-11
                h-11
                rounded-full
                bg-black
                text-white
                flex
                items-center
                justify-center
                font-semibold
              "
            >
              A
            </div>



            <div
              className="
                hidden
                md:block
                text-left
              "
            >

              <p
                className="
                  text-sm
                  font-medium
                "
              >
                Admin
              </p>


              <p
                className="
                  text-xs
                  text-gray-400
                "
              >
                Manager
              </p>

            </div>



            <ChevronDown
              size={18}
              className={`
                transition
                ${open ? "rotate-180" : ""}
              `}
            />



          </button>





          {open && (

            <div

              className="
                absolute
                right-0
                mt-3
                w-48
                bg-white
                rounded-xl
                shadow-xl
                border
                border-gray-100
                overflow-hidden
              "

            >

              <button

                className="
                  w-full
                  text-left
                  px-5
                  py-3
                  text-sm
                  hover:bg-gray-50
                "

              >
                Profile

              </button>



              <button

                className="
                  w-full
                  text-left
                  px-5
                  py-3
                  text-sm
                  hover:bg-gray-50
                  text-red-500
                "

              >
                Logout

              </button>


            </div>

          )}



        </div>



      </div>


    </header>

  );

}


export default Topbar;