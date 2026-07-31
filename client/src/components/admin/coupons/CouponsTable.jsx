import {
  Pencil,
  Trash2,
} from "lucide-react";

function CouponsTable({
  coupons = [],
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
              Code
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
              Discount
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
              Expires
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
          coupons.length === 0 ? (

            <tr>

              <td
                colSpan="5"
                className="
                  py-20
                  text-center
                  text-gray-400
                "
              >

                No coupons found

              </td>

            </tr>

          ) : (

            coupons.map((coupon)=>(

              <tr

                key={coupon._id}

                className="
                  border-b
                  hover:bg-gray-50
                "

              >

                <td className="px-6 py-5">

                  <span
                    className="
                      font-semibold
                    "
                  >

                    {coupon.code}

                  </span>

                </td>

                <td className="px-6 text-center">

                  {coupon.discount}%

                </td>

                <td className="px-6 text-center">

                  {

                    coupon.expiryDate
                    ?

                    new Date(
                      coupon.expiryDate
                    ).toLocaleDateString()

                    :

                    "-"

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
                        coupon.active !== false
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-700"
                      }

                    `}
                  >

                    {
                      coupon.active !== false
                      ? "Active"
                      : "Disabled"
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

                      onClick={()=>
                        onEdit(coupon)
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

                      onClick={()=>
                        onDelete(coupon)
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

            ))

          )

        }

        </tbody>

      </table>

      </div>

    </div>

  );

}

export default CouponsTable;