import {
  Pencil,
  Trash2,
} from "lucide-react";

import { formatPrice } from "../../../utils/helpers";


function ProductTable({
  products = [],
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
        shadow-sm
        overflow-hidden
      "
    >

      <table className="w-full">


        <thead
          className="
            bg-gray-50
            border-b
            border-gray-200
          "
        >

          <tr>


            <th className="px-4 py-4">

              <input
                type="checkbox"
                className="w-4 h-4"
              />

            </th>



            <th className="
              text-left
              px-6
              py-4
              text-xs
              uppercase
              tracking-wider
            ">
              Product
            </th>



            <th className="
              text-left
              px-6
              py-4
              text-xs
              uppercase
              tracking-wider
            ">
              Brand
            </th>



            <th className="
              text-center
              px-6
              py-4
              text-xs
              uppercase
              tracking-wider
            ">
              Stock
            </th>



            <th className="
              text-right
              px-6
              py-4
              text-xs
              uppercase
              tracking-wider
            ">
              Price
            </th>



            <th className="
              text-center
              px-6
              py-4
              text-xs
              uppercase
              tracking-wider
            ">
              Status
            </th>



            <th className="
              text-center
              px-6
              py-4
              text-xs
              uppercase
              tracking-wider
            ">
              Updated
            </th>



            <th className="
              text-center
              px-6
              py-4
              text-xs
              uppercase
              tracking-wider
            ">
              Actions
            </th>


          </tr>

        </thead>



        <tbody>


          {
            products.length === 0 && (

              <tr>

                <td
                  colSpan={8}
                  className="
                    text-center
                    py-20
                    text-gray-400
                  "
                >

                  No products found

                </td>

              </tr>

            )
          }





          {
            products.map((product)=>{


              const stock =
                product.stock || 0;



              return (

                <tr
                  key={product._id}
                  className="
                    border-b
                    border-gray-100
                    hover:bg-gray-50
                    transition
                  "
                >



                  <td className="px-4">

                    <input
                      type="checkbox"
                      className="w-4 h-4"
                    />

                  </td>





                  <td className="px-6 py-5">


                    <div className="
                      flex
                      items-center
                      gap-4
                    ">


                      <img

                        src={
                          product.images?.[0]?.url ||
                          product.image ||
                          "/placeholder-product.jpg"
                        }

                        alt={product.name}

                        className="
                          w-20
                          h-20
                          rounded-xl
                          object-cover
                          bg-gray-100
                        "

                      />



                      <div>


                        <h3 className="
                          font-semibold
                          text-gray-900
                        ">

                          {product.name}

                        </h3>



                        <p className="
                          text-sm
                          text-gray-400
                          mt-1
                        ">

                          {product.category || "Eyewear"}

                        </p>


                      </div>


                    </div>


                  </td>





                  <td className="px-6">


                    {
                      product.brand?.name ||
                      product.brand ||
                      "-"
                    }


                  </td>






                  <td className="text-center px-6">


                    <span
                      className={`
                        px-3
                        py-1
                        rounded-full
                        text-xs
                        font-semibold

                        ${
                          stock === 0

                          ? "bg-red-100 text-red-700"

                          : stock <= 5

                          ? "bg-orange-100 text-orange-700"

                          : "bg-green-100 text-green-700"
                        }

                      `}
                    >


                      {
                        stock === 0

                        ? "Out"

                        : stock <= 5

                        ? `${stock} Left`

                        : stock
                      }


                    </span>


                  </td>






                  <td className="
                    text-right
                    px-6
                    font-semibold
                  ">


                    {formatPrice(product.price)}


                  </td>







                  <td className="text-center px-6">


                    <span

                      className={`
                        px-3
                        py-1
                        rounded-full
                        text-xs
                        font-semibold

                        ${
                          product.isActive

                          ? "bg-green-100 text-green-700"

                          : "bg-gray-200 text-gray-700"

                        }

                      `}

                    >


                      {
                        product.isActive
                        ? "Active"
                        : "Hidden"
                      }


                    </span>


                  </td>







                  <td className="
                    text-center
                    px-6
                    text-sm
                    text-gray-400
                  ">


                    {
                      product.updatedAt

                      ? new Date(
                          product.updatedAt
                        ).toLocaleDateString(
                          "fr-FR"
                        )

                      : "-"
                    }


                  </td>







                  <td className="px-6">


                    <div className="
                      flex
                      justify-center
                      gap-3
                    ">



                      <button

                        onClick={() =>
                          onEdit(product)
                        }

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

                        onClick={() =>
                          onDelete(product)
                        }

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

              );

            })
          }


        </tbody>


      </table>


    </div>

  );

}


export default ProductTable;