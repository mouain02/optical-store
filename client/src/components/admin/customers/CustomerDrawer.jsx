import { useEffect, useState } from "react";
import { X } from "lucide-react";

import { adminService } from "../../../services";
import { formatPrice } from "../../../utils/helpers";


function CustomerDrawer({
  customer,
  open,
  onClose,
}) {


  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(false);



  useEffect(() => {

    if (!customer || !open) return;


    const loadCustomer = async () => {

      try {

        setLoading(true);


        const result =
          await adminService.getCustomerById(
            customer._id
          );


        setData(result);


      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    };


    loadCustomer();


  }, [customer, open]);





  if (!open || !customer) return null;



  const customerInfo =
    data?.customer || customer;


  const orders =
    data?.orders || [];



  const totalSpent = orders.reduce(
    (sum, order) =>
      sum + (order.totalPrice || 0),
    0
  );



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
          md:w-[650px]
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


            <h2
              className="
                text-2xl
                font-bold
              "
            >

              Customer Profile

            </h2>


            <p
              className="
                text-gray-400
                mt-1
              "
            >

              {customerInfo.name}

            </p>


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


          {
            loading ? (

              <p className="text-gray-400">
                Loading customer information...
              </p>


            ) : (


              <>



                <section>


                  <h3
                    className="
                      text-lg
                      font-semibold
                      mb-4
                    "
                  >

                    Personal Information

                  </h3>



                  <div
                    className="
                      space-y-3
                    "
                  >


                    <p>
                      <strong>Name:</strong>{" "}
                      {customerInfo.name}
                    </p>


                    <p>
                      <strong>Email:</strong>{" "}
                      {customerInfo.email}
                    </p>


                    <p>
                      <strong>Phone:</strong>{" "}
                      {customerInfo.phone || "-"}
                    </p>


                    <p>
                      <strong>Role:</strong>{" "}
                      {customerInfo.role}
                    </p>


                  </div>


                </section>





                <section>


                  <h3
                    className="
                      text-lg
                      font-semibold
                      mb-4
                    "
                  >

                    Statistics

                  </h3>



                  <div
                    className="
                      grid
                      grid-cols-2
                      gap-4
                    "
                  >


                    <div
                      className="
                        bg-gray-50
                        rounded-xl
                        p-4
                      "
                    >

                      <p className="text-gray-400 text-sm">
                        Orders
                      </p>

                      <strong className="text-xl">
                        {orders.length}
                      </strong>


                    </div>




                    <div
                      className="
                        bg-gray-50
                        rounded-xl
                        p-4
                      "
                    >

                      <p className="text-gray-400 text-sm">
                        Total Spent
                      </p>

                      <strong className="text-xl">
                        {formatPrice(totalSpent)}
                      </strong>


                    </div>


                  </div>


                </section>






                <section>


                  <h3
                    className="
                      text-lg
                      font-semibold
                      mb-4
                    "
                  >

                    Order History

                  </h3>




                  <div className="space-y-4">


                    {
                      orders.length === 0 ? (

                        <p className="text-gray-400">
                          No orders yet.
                        </p>


                      ) : (


                        orders.map((order)=>(


                          <div

                            key={order._id}

                            className="
                              border
                              rounded-xl
                              p-4
                              flex
                              justify-between
                            "

                          >


                            <div>


                              <p className="font-medium">

                                Order #{order._id.slice(-8)}

                              </p>


                              <p
                                className="
                                  text-sm
                                  text-gray-400
                                "
                              >

                                {order.status}

                              </p>


                            </div>



                            <strong>

                              {formatPrice(
                                order.totalPrice
                              )}

                            </strong>



                          </div>


                        ))

                      )
                    }


                  </div>


                </section>



              </>

            )
          }


        </div>



      </div>


    </>

  );

}


export default CustomerDrawer;