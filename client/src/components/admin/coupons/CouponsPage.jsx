import { useState } from "react";

import CouponsTable from "./CouponsTable";
import CouponModal from "./CouponModal";
import DeleteCouponModal from "./DeleteCouponModal";

import toast from "react-hot-toast";


function CouponsPage({

    coupons = [],

    createCoupon,

    updateCoupon,

    deleteCoupon,

}) {


    const [modalOpen, setModalOpen] = useState(false);

    const [editingCoupon, setEditingCoupon] = useState(null);


    const [deleteOpen, setDeleteOpen] = useState(false);

    const [couponToDelete, setCouponToDelete] = useState(null);





    const handleEdit = (coupon) => {

        setEditingCoupon(coupon);

        setModalOpen(true);

    };





    const handleDelete = (coupon) => {

        setCouponToDelete(coupon);

        setDeleteOpen(true);

    };







    return (


        <div className="space-y-6">



            <div

                className="
                    bg-white
                    rounded-2xl
                    border
                    border-gray-200
                    p-6
                    flex
                    justify-between
                    items-center
                "

            >


                <div>


                    <h1 className="text-3xl font-semibold">

                        Coupons

                    </h1>


                    <p className="text-gray-500 mt-2">

                        Manage discount codes.

                    </p>


                </div>




                <button

                    onClick={() => {

                        setEditingCoupon(null);

                        setModalOpen(true);

                    }}


                    className="
                        px-5
                        py-3
                        rounded-xl
                        bg-black
                        text-white
                    "

                >

                    Add Coupon

                </button>



            </div>








            <CouponsTable

                coupons={coupons}

                onEdit={handleEdit}

                onDelete={handleDelete}

            />









            <CouponModal


                open={modalOpen}


                initialData={editingCoupon}


                onClose={() => {

                    setModalOpen(false);

                    setEditingCoupon(null);

                }}



                onSave={async (data) => {


                    try {


                        let result;



                        if (editingCoupon) {


                            result =
                                await updateCoupon(

                                    editingCoupon._id,

                                    data

                                );


                        } else {


                            result =
                                await createCoupon(data);


                        }




                        toast[

                            result.success
                                ? "success"
                                : "error"

                        ](

                            result.message

                        );




                        if (result.success) {


                            setModalOpen(false);

                            setEditingCoupon(null);


                        }



                    } catch(error) {


                        toast.error(
                            "Something went wrong"
                        );


                    }



                }}


            />









            <DeleteCouponModal


                open={deleteOpen}


                coupon={couponToDelete}



                onCancel={() => {


                    setDeleteOpen(false);

                    setCouponToDelete(null);


                }}




                onConfirm={async () => {


                    try {


                        const result =

                            await deleteCoupon(

                                couponToDelete._id

                            );





                        toast[

                            result.success
                                ? "success"
                                : "error"

                        ](

                            result.message

                        );





                        if (result.success) {


                            setDeleteOpen(false);

                            setCouponToDelete(null);


                        }



                    } catch(error) {


                        toast.error(
                            "Something went wrong"
                        );


                    }



                }}



            />



        </div>


    );


}



export default CouponsPage;