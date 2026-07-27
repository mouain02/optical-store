import { useMemo, useState } from "react";
import { Search, Eye } from "lucide-react";

import { formatPrice } from "../../../utils/helpers";
import OrderStatusBadge from "./OrderStatusBadge";
import OrderDrawer from "./OrderDrawer";


function OrdersTable({
    orders = [],
    refresh,
}) {


    const [search, setSearch] = useState("");

    const [selectedOrder, setSelectedOrder] = useState(null);

    const [drawerOpen, setDrawerOpen] = useState(false);





    const filteredOrders = useMemo(() => {


        const safeOrders = Array.isArray(orders)
            ? orders
            : [];



        return safeOrders.filter((order) => {


            const customer =

                order.user?.name ||

                order.customerName ||

                "";



            const orderId =

                order._id || "";



            return (

                customer
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )

                ||

                orderId
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )

            );


        });


    }, [orders, search]);







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
                    border-gray-200
                    flex
                    items-center
                    justify-between
                "
            >


                <h2
                    className="
                        text-xl
                        font-semibold
                    "
                >

                    Orders

                </h2>




                <div
                    className="
                        relative
                        w-80
                    "
                >


                    <Search

                        size={18}

                        className="
                            absolute
                            left-4
                            top-1/2
                            -translate-y-1/2
                            text-gray-400
                        "

                    />



                    <input

                        value={search}

                        onChange={(e)=>setSearch(e.target.value)}

                        placeholder="Search order..."

                        className="
                            input-field
                            pl-11
                        "

                    />


                </div>


            </div>







            <table className="w-full">


                <thead
                    className="
                        bg-gray-50
                        border-b
                    "
                >

                    <tr>

                        <th className="text-left px-6 py-4">
                            Order
                        </th>


                        <th className="text-left px-6 py-4">
                            Customer
                        </th>


                        <th className="text-right px-6 py-4">
                            Total
                        </th>


                        <th className="text-center px-6 py-4">
                            Status
                        </th>


                        <th className="text-center px-6 py-4">
                            Date
                        </th>


                        <th className="text-center px-6 py-4">
                            Action
                        </th>


                    </tr>

                </thead>






                <tbody>


                {
                    filteredOrders.length === 0 && (

                        <tr>

                            <td

                                colSpan={6}

                                className="
                                    py-20
                                    text-center
                                    text-gray-400
                                "

                            >

                                No orders found

                            </td>

                        </tr>

                    )
                }







                {
                    filteredOrders.map((order)=>(


                        <tr

                            key={order._id}

                            className="
                                border-b
                                border-gray-100
                                hover:bg-gray-50
                            "

                        >



                            <td className="px-6 py-5">


                                <div
                                    className="
                                        font-semibold
                                    "
                                >

                                    #{order._id?.slice(-8)}

                                </div>


                            </td>







                            <td className="px-6">


                                <div>


                                    <div className="font-medium">

                                        {
                                            order.user?.name ||

                                            order.customerName ||

                                            "Customer"
                                        }

                                    </div>



                                    <div
                                        className="
                                            text-sm
                                            text-gray-400
                                        "
                                    >

                                        {
                                            order.user?.email ||
                                            "-"
                                        }

                                    </div>


                                </div>


                            </td>







                            <td
                                className="
                                    text-right
                                    px-6
                                    font-semibold
                                "
                            >

                                {formatPrice(
                                    order.totalPrice || 0
                                )}

                            </td>







                            <td
                                className="
                                    text-center
                                    px-6
                                "
                            >

                                <OrderStatusBadge

                                    status={order.status}

                                />


                            </td>







                            <td
                                className="
                                    text-center
                                    px-6
                                    text-gray-500
                                "
                            >

                                {
                                    order.createdAt

                                    ?

                                    new Date(
                                        order.createdAt
                                    )
                                    .toLocaleDateString(
                                        "fr-FR"
                                    )

                                    :

                                    "-"
                                }


                            </td>








                            <td
                                className="
                                    text-center
                                    px-6
                                "
                            >


                                <button

                                    onClick={()=>{

                                        setSelectedOrder(order);

                                        setDrawerOpen(true);

                                    }}

                                    className="
                                        inline-flex
                                        items-center
                                        gap-2
                                        px-4
                                        py-2
                                        rounded-lg
                                        bg-black
                                        text-white
                                        hover:bg-gray-800
                                    "

                                >

                                    <Eye size={16}/>

                                    View


                                </button>


                            </td>




                        </tr>



                    ))
                }



                </tbody>



            </table>








            <OrderDrawer

                open={drawerOpen}

                order={selectedOrder}

                refresh={refresh}

                onClose={()=>{

                    setDrawerOpen(false);

                    setSelectedOrder(null);

                }}

            />




        </div>


    );

}


export default OrdersTable;