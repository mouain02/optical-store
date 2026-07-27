function DeleteCouponModal({
  open,
  coupon,
  onCancel,
  onConfirm,
}) {

  if (!open || !coupon) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={onCancel}
      />

      <div
        className="
          fixed
          inset-0
          flex
          items-center
          justify-center
          z-50
          p-4
        "
      >
        <div
          className="
            bg-white
            rounded-2xl
            shadow-2xl
            w-full
            max-w-md
            p-8
          "
        >

          <h2 className="text-2xl font-semibold">
            Delete Coupon
          </h2>

          <p className="mt-4 text-gray-500">
            Are you sure you want to delete
            <span className="font-semibold text-black">
              {" "}
              {coupon.code}
            </span>
            ?
          </p>

          <p className="mt-2 text-sm text-red-500">
            This action cannot be undone.
          </p>

          <div className="flex justify-end gap-4 mt-8">

            <button
              onClick={onCancel}
              className="
                px-5
                py-2
                rounded-xl
                border
                border-gray-300
                hover:bg-gray-100
              "
            >
              Cancel
            </button>

            <button
              onClick={onConfirm}
              className="
                px-5
                py-2
                rounded-xl
                bg-red-600
                text-white
                hover:bg-red-700
              "
            >
              Delete
            </button>

          </div>

        </div>
      </div>
    </>
  );
}

export default DeleteCouponModal;