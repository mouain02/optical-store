import { X } from "lucide-react";


function ReviewDrawer({
  review,
  open,
  onClose,
}) {


  if (!open || !review) return null;


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
          md:w-[600px]
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

              Review Details

            </h2>


            <p
              className="
                text-gray-400
                mt-1
              "
            >

              Customer feedback

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





        <div
          className="
            p-6
            space-y-8
          "
        >



          <section>


            <h3
              className="
                font-semibold
                text-lg
                mb-4
              "
            >

              Customer

            </h3>


            <div className="space-y-2">


              <p>

                <strong>Name:</strong>{" "}

                {
                  review.user?.name ||
                  "Customer"
                }

              </p>



              <p>

                <strong>Email:</strong>{" "}

                {
                  review.user?.email ||
                  "-"
                }

              </p>


            </div>


          </section>







          <section>


            <h3
              className="
                font-semibold
                text-lg
                mb-4
              "
            >

              Product

            </h3>


            <p>

              {
                review.product?.name ||
                "-"
              }

            </p>


          </section>







          <section>


            <h3
              className="
                font-semibold
                text-lg
                mb-4
              "
            >

              Rating

            </h3>



            <div
              className="
                text-xl
              "
            >

              {"★".repeat(review.rating || 0)}

            </div>


          </section>








          <section>


            <h3
              className="
                font-semibold
                text-lg
                mb-4
              "
            >

              Comment

            </h3>



            <div
              className="
                bg-gray-50
                rounded-xl
                p-5
                text-gray-700
              "
            >

              {
                review.comment ||
                "No comment provided."
              }


            </div>


          </section>








          <section>


            <h3
              className="
                font-semibold
                text-lg
                mb-4
              "
            >

              Status

            </h3>



            <span
              className={`
                px-4
                py-2
                rounded-full
                text-sm
                font-medium

                ${
                  review.approved
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
                }

              `}
            >

              {
                review.approved
                ? "Approved"
                : "Pending"
              }


            </span>


          </section>





        </div>



      </div>


    </>

  );

}


export default ReviewDrawer;