import api from "./api";

export const authService = {
  login: (data) => api.post("/auth/login", data).then((r) => r.data),
  register: (data) => api.post("/auth/register", data).then((r) => r.data),
  getMe: () => api.get("/auth/me").then((r) => r.data),
  updateProfile: (data) => api.put("/auth/profile", data).then((r) => r.data),
  addAddress: (data) => api.post("/auth/addresses", data).then((r) => r.data),
};

export const productService = {
  getAll: (params) => api.get("/products", { params }).then((r) => r.data),
  getBySlug: (slug) => api.get(`/products/${slug}`).then((r) => r.data),
  getAdminAll: () => api.get("/products/admin/all").then((r) => r.data),
  create: (data) => api.post("/products", data).then((r) => r.data),
  update: (id, data) => api.put(`/products/${id}`, data).then((r) => r.data),
  remove: (id) => api.delete(`/products/${id}`).then((r) => r.data),
  uploadImages: (slug, formData) =>
    api.post(`/products/${slug}/images`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }).then((r) => r.data),
  reorderImages: (id, images) =>
    api.put(`/products/${id}/images/reorder`, { images }).then((r) => r.data),
  deleteImage: (id, imageId) =>
    api.delete(`/products/${id}/images/${imageId}`).then((r) => r.data),
};

export const brandService = {
  getAll: () => api.get("/brands").then((r) => r.data),
  create: (data) => api.post("/brands", data).then((r) => r.data),
  update: (id, data) => api.put(`/brands/${id}`, data).then((r) => r.data),
  remove: (id) => api.delete(`/brands/${id}`).then((r) => r.data),
};

export const orderService = {
  create: (data) => api.post("/orders", data).then((r) => r.data),
  getMy: () => api.get("/orders/my").then((r) => r.data),
  getById: (id) => api.get(`/orders/${id}`).then((r) => r.data),
  getAdminAll: () => api.get("/orders/admin/all").then((r) => r.data),
  updateStatus: (id, data) => api.patch(`/orders/${id}/status`, data).then((r) => r.data),
};

export const prescriptionService = {
  getAll: () => api.get("/prescriptions").then((r) => r.data),
  create: (formData) =>
    api.post("/prescriptions", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }).then((r) => r.data),
  remove: (id) => api.delete(`/prescriptions/${id}`).then((r) => r.data),
};

export const reviewService = {
  getByProduct: (productId) => api.get(`/reviews/product/${productId}`).then((r) => r.data),
  create: (productId, formData) =>
    api.post(`/reviews/product/${productId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }).then((r) => r.data),
  getAdminAll: () => api.get("/reviews/admin/all").then((r) => r.data),
  approve: (id, approved) => api.patch(`/reviews/${id}/approve`, { approved }).then((r) => r.data),
  remove: (id) => api.delete(`/reviews/${id}`).then((r) => r.data),
};

export const couponService = {
  validate: (code, subtotal) =>
    api.post("/coupons/validate", { code, subtotal }).then((r) => r.data),
  getAll: () => api.get("/coupons").then((r) => r.data),
  create: (data) => api.post("/coupons", data).then((r) => r.data),
  update: (id, data) => api.put(`/coupons/${id}`, data).then((r) => r.data),
  remove: (id) => api.delete(`/coupons/${id}`).then((r) => r.data),
};

export const wishlistService = {
  getAll: () => api.get("/wishlist").then((r) => r.data),
  add: (productId) => api.post(`/wishlist/${productId}`).then((r) => r.data),
  remove: (productId) => api.delete(`/wishlist/${productId}`).then((r) => r.data),
};

export const adminService = {
  getDashboard: () => api.get("/admin/dashboard").then((r) => r.data),
  getCustomers: () => api.get("/admin/customers").then((r) => r.data),
  getUsers: () => api.get("/admin/users").then((r) => r.data),
  updateUser: (id, data) => api.put(`/admin/users/${id}`, data).then((r) => r.data),
  deleteUser: (id) => api.delete(`/admin/users/${id}`).then((r) => r.data),
};

export const storeService = {
  getConfig: () => api.get("/store/config").then((r) => r.data),
};
