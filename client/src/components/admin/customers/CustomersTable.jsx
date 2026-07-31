import { useMemo, useState } from "react";
import { Search, Eye, Trash2 } from "lucide-react";

import CustomerDrawer from "./CustomerDrawer";


function CustomersTable({
  users = [],
  refresh,
}) {


  const [search,setSearch] = useState("");

  const [selectedCustomer,setSelectedCustomer] = useState(null);

  const [drawerOpen,setDrawerOpen] = useState(false);



  const filteredUsers = useMemo(()=>{

    return users.filter((user)=>{

      return (

        user.name
          ?.toLowerCase()
          .includes(search.toLowerCase())

        ||

        user.email
          ?.toLowerCase()
          .includes(search.toLowerCase())

      );

    });


  },[users,search]);




  return (

    <div
      className="
        bg-white
        rounded-2xl
        border
        border-gray-200
        shadow-sm
        overflow-hidden
      "
    >


      <div
        className="
          p-6
          border-b
          flex
          justify-between
        "
      >

        <h2 className="text-xl font-semibold">
          Customer List
        </h2>


        <div className="relative">

          <Search
            size={18}
            className="
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              text-gray-400
            "
          />

          <input

            value={search}

            onChange={(e)=>setSearch(e.target.value)}

            placeholder="Search customers..."

            className="
              input-field
              pl-10
              w-72
            "

          />

        </div>


      </div>




      <div className="overflow-x-auto">

      <table className="w-full min-w-[720px]">


        <thead className="bg-gray-50">


          <tr>

            <th className="px-6 py-4 text-left">
              Customer
            </th>

            <th className="px-6 py-4 text-left">
              Email
            </th>

            <th className="px-6 py-4 text-center">
              Role
            </th>

            <th className="px-6 py-4 text-center">
              Actions
            </th>


          </tr>


        </thead>





        <tbody>


        {
          filteredUsers.map((user)=>(


            <tr
              key={user._id}
              className="
                border-b
                hover:bg-gray-50
              "
            >


              <td className="px-6 py-5">


                <div className="font-medium">

                  {user.name}

                </div>


              </td>




              <td className="px-6 text-gray-500">

                {user.email}

              </td>




              <td className="text-center">


                <span
                  className="
                    px-3
                    py-1
                    rounded-full
                    bg-gray-100
                    text-sm
                  "
                >

                  {user.role}

                </span>


              </td>





              <td className="text-center">


                <button

                  onClick={()=>{

                    setSelectedCustomer(user);

                    setDrawerOpen(true);

                  }}

                  className="
                    p-2
                    rounded-lg
                    bg-black
                    text-white
                    mr-2
                  "

                >

                  <Eye size={16}/>

                </button>



                <button

                  className="
                    p-2
                    rounded-lg
                    bg-red-50
                    text-red-600
                  "

                >

                  <Trash2 size={16}/>

                </button>


              </td>



            </tr>


          ))
        }


        </tbody>


      </table>

      </div>




      <CustomerDrawer

        customer={selectedCustomer}

        open={drawerOpen}

        onClose={()=>{

          setDrawerOpen(false);

          setSelectedCustomer(null);

        }}

      />



    </div>


  );

}


export default CustomersTable;