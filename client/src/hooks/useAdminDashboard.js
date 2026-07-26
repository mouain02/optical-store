import {
  useCallback,
  useEffect,
  useState,
} from "react";


import {
  adminService,
  productService,
  brandService,
  couponService,
  reviewService,
  orderService,
} from "../services";



function useAdminDashboard() {


  const [stats, setStats] = useState({

    users: 0,

    products: 0,

    orders: 0,

    reviews: 0,

    brands: 0,

    coupons: 0,

    revenue: 0,

  });



  const [products, setProducts] = useState([]);

  const [users, setUsers] = useState([]);

  const [orders, setOrders] = useState([]);

  const [reviews, setReviews] = useState([]);

  const [brands, setBrands] = useState([]);

  const [coupons, setCoupons] = useState([]);



  const [recentOrders, setRecentOrders] = useState([]);

  const [monthlyRevenue, setMonthlyRevenue] = useState([]);

  const [bestSellers, setBestSellers] = useState([]);



  const [loading, setLoading] = useState(true);

  const [actionLoading, setActionLoading] = useState(false);

  const [error, setError] = useState(null);





  const loadDashboard = useCallback(async()=>{


    try {


      setLoading(true);

      setError(null);



      const [

        dashboardData,

        productsData,

        usersData,

        ordersData,

        reviewsData,

        brandsData,

        couponsData,


      ] = await Promise.all([


        adminService.getDashboard(),


        productService.getAdminAll(),


        adminService.getUsers(),


        orderService.getAdminAll(),


        reviewService.getAdminAll(),


        brandService.getAll(),


        couponService.getAll(),


      ]);





      /*
        Analytics data
      */


      setStats({

        users:
          dashboardData?.stats?.customers
          ||
          dashboardData?.stats?.users
          ||
          0,


        products:
          dashboardData?.stats?.products
          ||
          0,


        orders:
          dashboardData?.stats?.orders
          ||
          0,


        revenue:
          dashboardData?.stats?.revenue
          ||
          0,


        reviews:
          reviewsData?.length
          ||
          reviewsData?.reviews?.length
          ||
          0,


        brands:
          brandsData?.length
          ||
          brandsData?.brands?.length
          ||
          0,


        coupons:
          couponsData?.length
          ||
          couponsData?.coupons?.length
          ||
          0,

      });






      setRecentOrders(
        dashboardData?.recentOrders || []
      );



      setMonthlyRevenue(
        dashboardData?.monthlyRevenue || []
      );



      setBestSellers(
        dashboardData?.bestSellers || []
      );







      /*
        Tables data
      */


      setProducts(
        productsData?.products
        ||
        productsData
        ||
        []
      );



      setUsers(
        usersData?.users
        ||
        usersData
        ||
        []
      );



      setOrders(
        ordersData?.orders
        ||
        ordersData
        ||
        []
      );



      setReviews(
        reviewsData?.reviews
        ||
        reviewsData
        ||
        []
      );



      setBrands(
        brandsData?.brands
        ||
        brandsData
        ||
        []
      );



      setCoupons(
        couponsData?.coupons
        ||
        couponsData
        ||
        []
      );




    }

    catch(err){


      console.error(
        "Dashboard error:",
        err
      );


      setError(

        err.response?.data?.message
        ||
        err.message
        ||
        "Dashboard loading failed"

      );


    }

    finally{

      setLoading(false);

    }



  },[]);






  useEffect(()=>{

    loadDashboard();

  },[loadDashboard]);







  return {


    stats,


    products,

    users,

    orders,

    reviews,

    brands,

    coupons,


    recentOrders,

    monthlyRevenue,

    bestSellers,



    loading,

    actionLoading,

    error,



    refresh: loadDashboard,

    loadDashboard,

  };


}



export default useAdminDashboard;