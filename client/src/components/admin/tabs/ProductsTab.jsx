import { useState } from "react";

import Field from "./Field";
import Section from "./Section";

function ProductsTab({
  products,
  createProduct,
  updateProduct,
  deleteProduct,
  actionLoading,
}) {
  const [editingProduct, setEditingProduct] = useState(null);

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    brand: "",
    category: "",
    stock: "",
  });


  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };


  const resetForm = () => {
    setForm({
      name: "",
      price: "",
      description: "",
      brand: "",
      category: "",
      stock: "",
    });

    setEditingProduct(null);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    let result;

    if (editingProduct) {
      result = await updateProduct(
        editingProduct._id,
        form
      );
    } else {
      result = await createProduct(form);
    }


    if (result.success) {
      resetForm();
      alert(result.message);
    } else {
      alert(result.message);
    }
  };


  const handleEdit = (product) => {
    setEditingProduct(product);

    setForm({
      name: product.name || "",
      price: product.price || "",
      description: product.description || "",
      brand: product.brand?._id || product.brand || "",
      category: product.category || "",
      stock: product.stock || "",
    });
  };


  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this product?"
    );

    if (!confirmDelete) return;

    const result = await deleteProduct(id);

    alert(result.message);
  };


  return (
    <div className="admin-tab">


      <Section
        title={
          editingProduct
            ? "Edit Product"
            : "Add Product"
        }
      >

        <form
          onSubmit={handleSubmit}
          className="admin-form"
        >

          <Field
            label="Product Name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />


          <Field
            label="Price"
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
          />


          <Field
            label="Brand"
            name="brand"
            value={form.brand}
            onChange={handleChange}
          />


          <Field
            label="Category"
            name="category"
            value={form.category}
            onChange={handleChange}
          />


          <Field
            label="Stock"
            name="stock"
            type="number"
            value={form.stock}
            onChange={handleChange}
          />


          <Field
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            textarea
          />


          <div className="form-actions">

            <button
              type="submit"
              disabled={actionLoading}
            >
              {actionLoading
                ? "Saving..."
                : editingProduct
                ? "Update Product"
                : "Add Product"}
            </button>


            {editingProduct && (
              <button
                type="button"
                onClick={resetForm}
              >
                Cancel
              </button>
            )}

          </div>

        </form>

      </Section>




      <Section
        title={`Products (${products.length})`}
      >

        <div className="admin-products-list">

          {products.length === 0 ? (

            <p>
              No products found
            </p>

          ) : (

            products.map((product) => (

              <div
                key={product._id}
                className="admin-product-card"
              >

                <div>

                  <h3>
                    {product.name}
                  </h3>

                  <p>
                    {product.price} TND
                  </p>

                  <p>
                    Stock: {product.stock || 0}
                  </p>

                </div>


                <div className="actions">

                  <button
                    onClick={() =>
                      handleEdit(product)
                    }
                  >
                    Edit
                  </button>


                  <button
                    onClick={() =>
                      handleDelete(product._id)
                    }
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))

          )}

        </div>

      </Section>


    </div>
  );
}


export default ProductsTab;