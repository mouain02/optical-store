import {
  Pencil,
  Trash2,
} from "lucide-react";


function BrandsTable({
  brands = [],
  onEdit,
  onDelete,
}) {


  return (

    <div
      className="
        bg-white
        rounded-2xl
        border
        border-gray-200
        overflow-hidden
      "
    >


      <div className="overflow-x-auto">

      <table className="w-full min-w-[720px]">


        <thead
          className="
            bg-gray-50
            border-b
          "
        >

          <tr>


            <th
              className="
                px-6
                py-4
                text-left
                text-xs
                uppercase
              "
            >
              Brand
            </th>



            <th
              className="
                px-6
                py-4
                text-left
                text-xs
                uppercase
              "
            >
              Products
            </th>



            <th
              className="
                px-6
                py-4
                text-center
                text-xs
                uppercase
              "
            >
              Status
            </th>



            <th
              className="
                px-6
                py-4
                text-center
                text-xs
                uppercase
              "
            >
              Actions
            </th>


          </tr>


        </thead>





        <tbody>


        {
          brands.length === 0 ? (

            <tr>

              <td
                colSpan="4"
                className="
                  text-center
                  py-20
                  text-gray-400
                "
              >

                No brands found

              </td>


            </tr>


          ) : (


            brands.map((brand)=>(

              <tr

                key={brand._id}

                className="
                  border-b
                  hover:bg-gray-50
                "

              >



                <td className="px-6 py-5">


                  <div className="flex items-center gap-4">


                    {
                      brand.logo ? (

                        <img

                          src={brand.logo}

                          alt={brand.name}

                          className="
                            w-12
                            h-12
                            rounded-xl
                            object-cover
                            bg-gray-100
                          "

                        />

                      ) : (

                        <div
                          className="
                            w-12
                            h-12
                            rounded-xl
                            bg-gray-100
                            flex
                            items-center
                            justify-center
                            font-semibold
                          "
                        >

                          {
                            brand.name
                              ?.charAt(0)
                              .toUpperCase()
                          }


                        </div>

                      )

                    }



                    <div>

                      <h3
                        className="
                          font-semibold
                        "
                      >

                        {brand.name}

                      </h3>



                      <p
                        className="
                          text-sm
                          text-gray-400
                        "
                      >

                        {
                          brand.slug ||
                          "-"
                        }

                      </p>


                    </div>


                  </div>


                </td>






                <td className="px-6">


                  {
                    brand.productsCount ||
                    brand.products?.length ||
                    0
                  }


                </td>






                <td className="px-6 text-center">


                  <span
                    className={`
                      px-3
                      py-1
                      rounded-full
                      text-xs
                      font-medium

                      ${
                        brand.isActive !== false
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-700"
                      }

                    `}
                  >

                    {
                      brand.isActive !== false
                      ? "Active"
                      : "Hidden"
                    }


                  </span>


                </td>






                <td className="px-6">


                  <div
                    className="
                      flex
                      justify-center
                      gap-3
                    "
                  >



                    <button

                      onClick={()=>onEdit(brand)}

                      className="
                        w-10
                        h-10
                        rounded-lg
                        bg-gray-100
                        hover:bg-black
                        hover:text-white
                        transition
                        flex
                        items-center
                        justify-center
                      "

                    >

                      <Pencil size={17}/>


                    </button>





                    <button

                      onClick={()=>onDelete(brand)}

                      className="
                        w-10
                        h-10
                        rounded-lg
                        bg-red-50
                        text-red-600
                        hover:bg-red-600
                        hover:text-white
                        transition
                        flex
                        items-center
                        justify-center
                      "

                    >

                      <Trash2 size={17}/>


                    </button>



                  </div>


                </td>



              </tr>


            ))


          )
        }


        </tbody>


      </table>

      </div>


    </div>

  );

}


export default BrandsTable;