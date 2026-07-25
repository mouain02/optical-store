import { useCallback, useState } from "react";

import {
  adminService,
  brandService,
  couponService,
  orderService,
  productService,
  reviewService,
} from "../services";


function useAdminDashboard() {

  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [brands, setBrands] = useState([]);

  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const [error, setError] = useState(null);



  const loadDashboard = useCallback(async () => {

    try {

      setLoading(true);
      setError(null);


      const [
        productsData,
        usersData,
        ordersData,
        reviewsData,
        couponsData,
        brandsData,
      ] = await Promise.all([

        productService.getAdminAll(),

        adminService.getUsers(),

        orderService.getAdminAll(),

        reviewService.getAdminAll(),

        couponService.getAll(),

        brandService.getAll(),

      ]);


      setProducts(
        productsData.products || productsData || []
      );

      setUsers(
        usersData.users || usersData || []
      );

      setOrders(
        ordersData.orders || ordersData || []
      );

      setReviews(
        reviewsData.reviews || reviewsData || []
      );

      setCoupons(
        couponsData.coupons || couponsData || []
      );

      setBrands(
        brandsData.brands || brandsData || []
      );


    } catch (err) {

      console.error(err);

      setError(
        err.response?.data?.message ||
        err.message ||
        "Dashboard loading failed"
      );

    } finally {

      setLoading(false);

    }

  }, []);



  const createProduct = async (data) => {

    try {

      setActionLoading(true);

      await productService.create(data);

      await loadDashboard();

      return {
        success: true,
        message: "Product created successfully",
      };


    } catch (err) {

      return {
        success: false,
        message:
          err.response?.data?.message ||
          "Failed to create product",
      };

    } finally {

      setActionLoading(false);

    }

  };



  const updateProduct = async (id, data) => {

    try {

      setActionLoading(true);

      await productService.update(id, data);

      await loadDashboard();

      return {
        success: true,
        message: "Product updated successfully",
      };


    } catch (err) {

      return {
        success: false,
        message:
          err.response?.data?.message ||
          "Failed to update product",
      };

    } finally {

      setActionLoading(false);

    }

  };



  const deleteProduct = async (id) => {

    try {

      setActionLoading(true);

      await productService.remove(id);

      await loadDashboard();

      return {
        success: true,
        message: "Product deleted successfully",
      };


    } catch (err) {

      return {
        success: false,
        message:
          err.response?.data?.message ||
          "Failed to delete product",
      };

    } finally {

      setActionLoading(false);

    }

  };
  const stats = {
  users: users.length,
  products: products.length,
  orders: orders.length,
  reviews: reviews.length,
  brands: brands.length,
  coupons: coupons.length,
};



return {
  stats,

  dashboard: {
    products,
    users,
    orders,
    reviews,
    coupons,
    brands,
  },

  products,
  users,
  orders,
  reviews,
  coupons,
  brands,

  loading,
  actionLoading,
  error,

  refresh: loadDashboard,
  loadDashboard,

  createProduct,
  updateProduct,
  deleteProduct,
};

}


export default useAdminDashboard;