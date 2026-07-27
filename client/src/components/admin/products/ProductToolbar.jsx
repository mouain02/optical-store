import { Search, Plus } from "lucide-react";

function ProductToolbar({
  search,
  setSearch,
  brand,
  setBrand,
  status,
  setStatus,
  brands = [],
  onAddProduct,
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 shadow-sm">

      <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">

        <div className="flex flex-1 gap-4 flex-wrap">

          {/* Search */}

          <div className="relative flex-1 min-w-[280px]">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                w-full
                h-12
                pl-11
                pr-4
                rounded-xl
                border
                border-gray-300
                focus:outline-none
                focus:ring-2
                focus:ring-black
              "
            />

          </div>

          {/* Brand */}

          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="
              h-12
              rounded-xl
              border
              border-gray-300
              px-4
              bg-white
              min-w-[170px]
            "
          >
            <option value="">
              All Brands
            </option>

            {brands.map((b) => (
              <option
                key={b._id}
                value={b._id}
              >
                {b.name}
              </option>
            ))}
          </select>

          {/* Status */}

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="
              h-12
              rounded-xl
              border
              border-gray-300
              px-4
              bg-white
              min-w-[170px]
            "
          >
            <option value="">
              All Status
            </option>

            <option value="active">
              Active
            </option>

            <option value="inactive">
              Hidden
            </option>

            <option value="lowstock">
              Low Stock
            </option>

          </select>

        </div>

        {/* Add Button */}

        <button
          onClick={onAddProduct}
          className="
            h-12
            px-6
            rounded-xl
            bg-black
            text-white
            flex
            items-center
            gap-2
            hover:bg-gray-800
            transition
          "
        >
          <Plus size={18} />

          New Product
        </button>

      </div>

    </div>
  );
}

export default ProductToolbar;