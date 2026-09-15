import React from 'react'

const ProductCard = ({ product, onViewDetails }) => {

  return (
    <div className="rounded border bg-white p-5">

      <h2 className="text-xl font-bold">
        {product.title}
      </h2>

      <p className="mt-2 text-gray-600">
        {product.body}
      </p>

      <p className="mt-3 font-semibold">
        Price: ₹{product.price}
      </p>

      <button
        onClick={() => onViewDetails()}
        className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        View Details
      </button>

    </div>
  )
}

export default ProductCard