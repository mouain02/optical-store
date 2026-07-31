import { Eye, Check, Trash2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

import { reviewService } from "../../../services";
import ReviewDrawer from "./ReviewDrawer";


function ReviewsTable({
  reviews = [],
  refresh,
}) {


  const [selectedReview, setSelectedReview] = useState(null);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [actionLoading, setActionLoading] = useState(null);






  const handleApprove = async (review) => {


    try {


      setActionLoading(
        review._id
      );



      await reviewService.approve(

        review._id,

        !review.approved

      );



      toast.success(

        review.approved

          ? "Review moved to pending"

          : "Review approved successfully"

      );




      if (refresh) {

        await refresh();

      }




    } catch (err) {


      console.error(
        "Approve review error:",
        err
      );



      toast.error(

        err.response?.data?.message ||

        "Failed to update review"

      );



    } finally {


      setActionLoading(null);


    }


  };









  const handleDelete = async (review) => {


    const confirmDelete = window.confirm(

      "Delete this review?"

    );



    if (!confirmDelete) return;





    try {


      setActionLoading(
        review._id
      );




      await reviewService.remove(

        review._id

      );




      toast.success(

        "Review deleted successfully"

      );





      if (refresh) {

        await refresh();

      }




    } catch(err) {


      console.error(
        "Delete review error:",
        err
      );



      toast.error(

        err.response?.data?.message ||

        "Failed to delete review"

      );



    } finally {


      setActionLoading(null);


    }


  };









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
          "
        >

          <tr>


            <th className="px-6 py-4 text-left">
              Customer
            </th>


            <th className="px-6 py-4 text-left">
              Product
            </th>


            <th className="px-6 py-4 text-center">
              Rating
            </th>


            <th className="px-6 py-4 text-center">
              Status
            </th>


            <th className="px-6 py-4 text-center">
              Actions
            </th>


          </tr>


        </thead>







        <tbody>


        {
          reviews.length === 0 ? (


            <tr>


              <td

                colSpan="5"

                className="
                  text-center
                  py-20
                  text-gray-400
                "

              >

                No reviews found


              </td>


            </tr>



          ) : (


            reviews.map((review)=>(


              <tr

                key={review._id}

                className="
                  border-b
                  border-gray-100
                  hover:bg-gray-50
                "

              >






                <td className="px-6 py-5">


                  <p className="font-medium">

                    {
                      review.user?.name ||

                      "Customer"
                    }


                  </p>



                  <p className="text-sm text-gray-400">


                    {
                      review.user?.email ||

                      "-"
                    }


                  </p>



                </td>









                <td className="px-6">


                  {
                    review.product?.name ||

                    "-"
                  }


                </td>









                <td className="px-6 text-center">


                  <span className="text-yellow-500">


                    {
                      "★".repeat(
                        review.rating || 0
                      )
                    }


                  </span>



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



                </td>









                <td className="px-6">


                  <div

                    className="
                      flex
                      justify-center
                      gap-2
                    "

                  >






                    <button

                      onClick={()=>{

                        setSelectedReview(review);

                        setDrawerOpen(true);

                      }}

                      className="
                        p-2
                        rounded-lg
                        bg-gray-100
                        hover:bg-gray-200
                      "

                    >

                      <Eye size={16}/>


                    </button>









                    <button


                      disabled={
                        actionLoading === review._id
                      }


                      onClick={()=>handleApprove(review)}


                      className="
                        p-2
                        rounded-lg
                        bg-green-50
                        text-green-600
                        hover:bg-green-100
                        disabled:opacity-50
                      "


                    >


                      <Check size={16}/>



                    </button>









                    <button


                      disabled={
                        actionLoading === review._id
                      }


                      onClick={()=>handleDelete(review)}


                      className="
                        p-2
                        rounded-lg
                        bg-red-50
                        text-red-600
                        hover:bg-red-100
                        disabled:opacity-50
                      "


                    >


                      <Trash2 size={16}/>



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








      <ReviewDrawer


        review={selectedReview}


        open={drawerOpen}


        onClose={()=>{


          setDrawerOpen(false);


          setSelectedReview(null);


        }}


      />






    </div>

  );

}


export default ReviewsTable;