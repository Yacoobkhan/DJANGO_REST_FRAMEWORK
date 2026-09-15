import React from 'react'

const ProductCard = ({ product, onViewDetails }) => {
  return (
    <div className="overflow-hidden rounded-lg border bg-white shadow-sm">

      {/* Product Image */}
      {product.image && (
        <div className="flex h-64 w-full items-center justify-center bg-gray-100 p-4">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-contain"
          />
        </div>
      )}

      {/* Product Information */}
      <div className="p-5">

        <h2 className="text-xl font-bold">
          {product.title}
        </h2>

        <p className="mt-2 text-gray-600">
          {product.body}
        </p>

        <p className="mt-3 font-semibold">
          Price: ₹{product.price}
        </p>

        <p className="mt-2 font-semibold text-green-600">
          Sale Price: ₹{product.sale_price}
        </p>

        <button
          onClick={onViewDetails}
          className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          View Details
        </button>

      </div>

    </div>
  )
}

export default ProductCard