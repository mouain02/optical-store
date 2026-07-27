import { useMemo, useState } from "react";
import { productService } from "../../../services";
import ProductToolbar from "./ProductToolbar";
import ProductTable from "./ProductTable";
import ProductModal from "./ProductModal";
import DeleteProductModal from "./DeleteProductModal";
import ProductStats from "./ProductStats";
import toast from "react-hot-toast";
function ProductsPage({

    products = [],

    brands = [],

    createProduct,

    updateProduct,

    deleteProduct,

}) {

    const [search, setSearch] = useState("");
    const [brand, setBrand] = useState("");
    const [status, setStatus] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);


    const filteredProducts = useMemo(() => {

        return products.filter((product) => {

            const matchesSearch =
                product.name
                    ?.toLowerCase()
                    .includes(search.toLowerCase());



            const matchesBrand =
                !brand ||
                product.brand?._id === brand ||
                product.brand === brand;



            const stock =
                product.stock || 0;



            const matchesStatus =

                !status ||

                (status === "active" &&
                    product.isActive) ||

                (status === "inactive" &&
                    !product.isActive) ||

                (status === "lowstock" &&
                    stock <= 5);



            return (
                matchesSearch &&
                matchesBrand &&
                matchesStatus
            );

        });

    }, [
        products,
        search,
        brand,
        status,
    ]);



    const handleAddProduct = () => {

        setEditingProduct(null);

        setModalOpen(true);

    };



    const handleEdit = (product) => {

        setEditingProduct(product);

        setModalOpen(true);

    };



    const handleDelete = (product) => {

        setProductToDelete(product);

        setDeleteModalOpen(true);

    };



    return (

        <div>

            <div className="mb-8">

                <h1 className="text-3xl font-semibold">

                    Products

                </h1>

                <p className="text-gray-500 mt-2">

                    Manage all products in your store.

                </p>

            </div>



            <ProductToolbar

                search={search}
                setSearch={setSearch}

                brand={brand}
                setBrand={setBrand}

                status={status}
                setStatus={setStatus}

                brands={brands}

                onAddProduct={handleAddProduct}

            />

            <ProductStats
                products={products}
            />

            <ProductTable

                products={filteredProducts}

                onEdit={handleEdit}

                onDelete={handleDelete}

            />



            <div
                className="
          flex
          justify-between
          mt-6
          text-sm
          text-gray-500
        "
            >

                <span>

                    Showing {filteredProducts.length} products

                </span>



                <span>

                    Total: {products.length}

                </span>

            </div>
            <ProductModal

                open={modalOpen}

                initialData={editingProduct}
                brands={brands}

                categories={[
                    {
                        value: "prescription",
                        label: "Prescription Glasses",
                    },
                    {
                        value: "sunglasses",
                        label: "Sunglasses",
                    },
                    {
                        value: "contact-lenses",
                        label: "Contact Lenses",
                    },
                    {
                        value: "blue-light",
                        label: "Blue Light Glasses",
                    },
                    {
                        value: "kids",
                        label: "Kids",
                    },
                    {
                        value: "accessories",
                        label: "Accessories",
                    },
                ]}
                onClose={() => {

                    setModalOpen(false);

                    setEditingProduct(null);

                }}

                onSave={async (form, images) => {

                    let result;

                    if (editingProduct) {

                        result = await updateProduct(
                            editingProduct._id,
                            form
                        );

                    } else {

                        result = await createProduct(
                            form
                        );

                    }


                    toast[result.success ? "success" : "error"](
                        result.message
                    );


                    if (result.success) {


                        // upload images after product creation
                        if (
                            !editingProduct &&
                            images &&
                            images.length > 0
                        ) {

                            const formData = new FormData();


                            images.forEach((image) => {

                                formData.append(
                                    "images",
                                    image
                                );

                            });


                            await productService.uploadImages(
                                result.product.slug,
                                formData
                            );

                        }


                        setModalOpen(false);

                        setEditingProduct(null);


                    }

                }}

            />
            <DeleteProductModal
                open={deleteModalOpen}
                product={productToDelete}
                onCancel={() => {
                    setDeleteModalOpen(false);
                    setProductToDelete(null);
                }}
                onConfirm={async () => {
                    const result = await deleteProduct(productToDelete._id);

                    toast[result.success ? "success" : "error"](
                        result.message
                    );

                    if (result.success) {
                        setDeleteModalOpen(false);
                        setProductToDelete(null);
                    }
                }}
            />
        </div>

    );

}

export default ProductsPage;