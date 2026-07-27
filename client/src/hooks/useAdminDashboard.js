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

  const loadDashboard = useCallback(async () => {

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

      setStats({
        users:
          dashboardData?.stats?.customers ||
          dashboardData?.stats?.users ||
          0,

        products:
          dashboardData?.stats?.products ||
          0,

        orders:
          dashboardData?.stats?.orders ||
          0,

        revenue:
          dashboardData?.stats?.revenue ||
          0,

        reviews:
          (reviewsData?.reviews || reviewsData || []).length,

        brands:
          (brandsData?.brands || brandsData || []).length,

        coupons:
          (couponsData?.coupons || couponsData || []).length,
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

      setProducts(
        productsData?.products ||
        productsData ||
        []
      );

      setUsers(
        usersData?.users ||
        usersData ||
        []
      );

      setOrders(
        ordersData?.orders ||
        ordersData ||
        []
      );

      setReviews(
        reviewsData?.reviews ||
        reviewsData ||
        []
      );

      setBrands(
        brandsData?.brands ||
        brandsData ||
        []
      );

      setCoupons(
        couponsData?.coupons ||
        couponsData ||
        []
      );

    } catch (err) {

      console.error(
        "Dashboard error:",
        err
      );

      setError(
        err.response?.data?.message ||
        err.message ||
        "Dashboard loading failed"
      );

    } finally {

      setLoading(false);

    }

  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  /*
    PRODUCT ACTIONS
  */

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

  /*
    BRAND ACTIONS
  */

  const createBrand = async (data) => {

    try {

      setActionLoading(true);

      await brandService.create(data);

      await loadDashboard();

      return {
        success: true,
        message: "Brand created successfully",
      };

    } catch (err) {

      return {
        success: false,
        message:
          err.response?.data?.message ||
          "Failed to create brand",
      };

    } finally {

      setActionLoading(false);

    }

  };

  const updateBrand = async (id, data) => {

    try {

      setActionLoading(true);

      await brandService.update(id, data);

      await loadDashboard();

      return {
        success: true,
        message: "Brand updated successfully",
      };

    } catch (err) {

      return {
        success: false,
        message:
          err.response?.data?.message ||
          "Failed to update brand",
      };

    } finally {

      setActionLoading(false);

    }

  };

  const deleteBrand = async (id) => {

    try {

      setActionLoading(true);

      await brandService.remove(id);

      await loadDashboard();

      return {
        success: true,
        message: "Brand deleted successfully",
      };

    } catch (err) {

      return {
        success: false,
        message:
          err.response?.data?.message ||
          "Failed to delete brand",
      };

    } finally {

      setActionLoading(false);

    }

  };

  /*
    COUPON ACTIONS
  */

  const createCoupon = async (data) => {

    try {

      setActionLoading(true);

      await couponService.create(data);

      await loadDashboard();

      return {
        success: true,
        message: "Coupon created successfully",
      };

    } catch (err) {

      return {
        success: false,
        message:
          err.response?.data?.message ||
          "Failed to create coupon",
      };

    } finally {

      setActionLoading(false);

    }

  };

  const updateCoupon = async (id, data) => {

    try {

      setActionLoading(true);

      await couponService.update(id, data);

      await loadDashboard();

      return {
        success: true,
        message: "Coupon updated successfully",
      };

    } catch (err) {

      return {
        success: false,
        message:
          err.response?.data?.message ||
          "Failed to update coupon",
      };

    } finally {

      setActionLoading(false);

    }

  };

  const deleteCoupon = async (id) => {

    try {

      setActionLoading(true);

      await couponService.remove(id);

      await loadDashboard();

      return {
        success: true,
        message: "Coupon deleted successfully",
      };

    } catch (err) {

      return {
        success: false,
        message:
          err.response?.data?.message ||
          "Failed to delete coupon",
      };

    } finally {

      setActionLoading(false);

    }

  };

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

    createProduct,
    updateProduct,
    deleteProduct,

    createBrand,
    updateBrand,
    deleteBrand,

    createCoupon,
    updateCoupon,
    deleteCoupon,

  };

}

export default useAdminDashboard;