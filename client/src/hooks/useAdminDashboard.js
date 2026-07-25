import { useCallback, useEffect, useState } from "react";

import {
  adminService,
  brandService,
  couponService,
  orderService,
  productService,
  reviewService,
} from "../services";

const initialStats = {
  users: 0,
  products: 0,
  orders: 0,
  reviews: 0,
  coupons: 0,
  brands: 0,
};

function useAdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);

  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [brands, setBrands] = useState([]);

  const [stats, setStats] = useState(initialStats);

  const loadDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [
        usersResponse,
        productsResponse,
        ordersResponse,
        reviewsResponse,
        couponsResponse,
        brandsResponse,
      ] = await Promise.all([
        adminService.getUsers(),
        productService.getProducts(),
        orderService.getOrders(),
        reviewService.getReviews(),
        couponService.getCoupons(),
        brandService.getBrands(),
      ]);

      const usersData = usersResponse?.data || usersResponse || [];
      const productsData =
        productsResponse?.data || productsResponse || [];
      const ordersData = ordersResponse?.data || ordersResponse || [];
      const reviewsData = reviewsResponse?.data || reviewsResponse || [];
      const couponsData = couponsResponse?.data || couponsResponse || [];
      const brandsData = brandsResponse?.data || brandsResponse || [];

      setUsers(usersData);
      setProducts(productsData);
      setOrders(ordersData);
      setReviews(reviewsData);
      setCoupons(couponsData);
      setBrands(brandsData);

      setStats({
        users: usersData.length,
        products: productsData.length,
        orders: ordersData.length,
        reviews: reviewsData.length,
        coupons: couponsData.length,
        brands: brandsData.length,
      });
    } catch (err) {
      console.error("Dashboard loading error:", err);
      setError(
        err?.response?.data?.message ||
          err.message ||
          "Failed to load dashboard data"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);


  // PRODUCTS

  const createProduct = async (formData) => {
    try {
      setActionLoading(true);

      const response = await productService.createProduct(formData);

      await loadDashboard();

      return {
        success: true,
        data: response,
        message: "Product added successfully",
      };
    } catch (err) {
      console.error(err);

      return {
        success: false,
        message:
          err?.response?.data?.message ||
          "Failed to create product",
      };
    } finally {
      setActionLoading(false);
    }
  };


  const updateProduct = async (id, data) => {
    try {
      setActionLoading(true);

      const response = await productService.updateProduct(id, data);

      await loadDashboard();

      return {
        success: true,
        data: response,
        message: "Product updated successfully",
      };
    } catch (err) {
      return {
        success: false,
        message:
          err?.response?.data?.message ||
          "Failed to update product",
      };
    } finally {
      setActionLoading(false);
    }
  };


  const deleteProduct = async (id) => {
    try {
      setActionLoading(true);

      await productService.deleteProduct(id);

      await loadDashboard();

      return {
        success: true,
        message: "Product deleted successfully",
      };
    } catch (err) {
      return {
        success: false,
        message:
          err?.response?.data?.message ||
          "Failed to delete product",
      };
    } finally {
      setActionLoading(false);
    }
  };


  // GENERIC REFRESH

  const refresh = async () => {
    await loadDashboard();
  };


  return {
    loading,
    actionLoading,
    error,

    users,
    products,
    orders,
    reviews,
    coupons,
    brands,

    stats,

    refresh,

    createProduct,
    updateProduct,
    deleteProduct,

    loadDashboard,
  };
}

export default useAdminDashboard;