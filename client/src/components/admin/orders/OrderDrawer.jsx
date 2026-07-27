import { useEffect, useState } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";

import { formatPrice } from "../../../utils/helpers";
import { orderService } from "../../../services";
import OrderStatusBadge from "./OrderStatusBadge";


function OrderDrawer({
  order,
  open,
  onClose,
  refresh,
}) {


  const [status, setStatus] = useState("");

  const [saving, setSaving] = useState(false);





  useEffect(() => {

    if (order) {

      setStatus(order.status || "pending");

    }

  }, [order]);






  if (!open || !order) return null;






  const handleStatusChange = async (e) => {


    const newStatus = e.target.value;


    const previousStatus = status;


    setStatus(newStatus);



    try {


      setSaving(true);



      await orderService.updateStatus(

        order._id,

        {
          status: newStatus,
        }

      );





      toast.success(
        "Order status updated successfully"
      );





      if (refresh) {

        await refresh();

      }




    } catch (err) {


      console.error(
        "Status update error:",
        err
      );



      setStatus(previousStatus);



      toast.error(

        err.response?.data?.message ||

        "Failed to update order status"

      );



    } finally {


      setSaving(false);


    }


  };







  return (

    <>


      <div

        className="
          fixed
          inset-0
          bg-black/40
          z-40
        "

        onClick={onClose}

      />






      <div

        className="
          fixed
          top-0
          right-0
          h-full
          w-full
          md:w-[700px]
          bg-white
          z-50
          shadow-2xl
          overflow-y-auto
        "

      >






        <div

          className="
            sticky
            top-0
            bg-white
            border-b
            p-6
            flex
            justify-between
            items-center
          "

        >



          <div>


            <h2 className="text-2xl font-bold">

              Order #{order._id?.slice(-8)}

            </h2>




            <div className="mt-3">

              <OrderStatusBadge

                status={status}

              />

            </div>


          </div>







          <button

            onClick={onClose}

            className="
              w-10
              h-10
              rounded-lg
              bg-gray-100
              flex
              items-center
              justify-center
            "

          >

            <X size={20}/>

          </button>




        </div>









        <div className="p-6 space-y-8">






          <section>


            <h3 className="font-semibold text-lg mb-4">

              Customer

            </h3>



            <div className="space-y-2">


              <p>

                <strong>Name:</strong>{" "}

                {
                  order.user?.name ||

                  order.customerName ||

                  "Customer"
                }

              </p>





              <p>

                <strong>Email:</strong>{" "}

                {
                  order.user?.email ||

                  "-"
                }

              </p>





              <p>

                <strong>Phone:</strong>{" "}

                {
                  order.phone ||

                  "-"
                }

              </p>



            </div>



          </section>









          <section>


            <h3 className="font-semibold text-lg mb-4">

              Shipping Address

            </h3>



            <p>

              {
                order.shippingAddress?.address ||

                "-"
              }

            </p>



            <p>

              {
                order.shippingAddress?.city ||

                ""
              }

            </p>



          </section>









          <section>


            <h3 className="font-semibold text-lg mb-4">

              Products

            </h3>



            <div className="space-y-4">


              {
                (order.items || []).map(
                  (item,index)=>(


                    <div

                      key={index}

                      className="
                        flex
                        justify-between
                        border
                        rounded-xl
                        p-4
                      "

                    >



                      <div>


                        <h4 className="font-medium">

                          {item.name}

                        </h4>



                        <p className="text-sm text-gray-500">

                          Qty: {item.quantity}

                        </p>


                      </div>





                      <strong>

                        {
                          formatPrice(
                            item.price *
                            item.quantity
                          )
                        }

                      </strong>




                    </div>


                  )
                )
              }


            </div>



          </section>









          <section>


            <h3 className="font-semibold text-lg mb-4">

              Order Summary

            </h3>




            <div className="space-y-5">





              <div className="flex justify-between">


                <span>

                  Total

                </span>



                <strong>

                  {
                    formatPrice(
                      order.totalPrice || 0
                    )
                  }

                </strong>



              </div>








              <div className="flex justify-between items-center">


                <span>

                  Status

                </span>




                <OrderStatusBadge

                  status={status}

                />



              </div>









              <div>


                <label

                  className="
                    block
                    mb-2
                    text-sm
                    font-medium
                  "

                >

                  Change Status

                </label>





                <select


                  value={status}


                  onChange={handleStatusChange}


                  disabled={saving}


                  className="input-field"


                >


                  <option value="pending">
                    Pending
                  </option>


                  <option value="processing">
                    Processing
                  </option>


                  <option value="shipped">
                    Shipped
                  </option>


                  <option value="delivered">
                    Delivered
                  </option>


                  <option value="cancelled">
                    Cancelled
                  </option>


                </select>






                {
                  saving && (

                    <p className="mt-2 text-sm text-gray-500">

                      Saving...

                    </p>

                  )
                }



              </div>




            </div>



          </section>





        </div>





      </div>



    </>

  );


}


export default OrderDrawer;