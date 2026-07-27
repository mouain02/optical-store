import { TriangleAlert } from "lucide-react";

function DeleteProductModal({
  open,
  product,
  onCancel,
  onConfirm,
  loading = false,
}) {
  if (!open || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">

        <div className="flex justify-center">

          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">

            <TriangleAlert
              size={32}
              className="text-red-600"
            />

          </div>

        </div>

        <h2 className="mt-6 text-center text-2xl font-semibold">

          Delete Product?

        </h2>

        <p className="mt-4 text-center text-gray-500">

          Are you sure you want to delete

          <span className="font-semibold text-black">
            {" "}
            {product.name}
          </span>

          ?

        </p>

        <p className="mt-2 text-center text-sm text-red-500">

          This action cannot be undone.

        </p>

        <div className="mt-8 flex gap-4">

          <button
            onClick={onCancel}
            className="btn-outline flex-1"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="btn-primary flex-1 bg-red-600 hover:bg-red-700"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default DeleteProductModal;