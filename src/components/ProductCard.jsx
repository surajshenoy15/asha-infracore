function ProductCard({ product }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-xs text-center">
      <div className="h-40 flex items-center justify-center mb-3">
        <img
          src={product.image_url}
          alt={product.name}
          className="max-h-full max-w-full object-contain"
        />
      </div>
      <h3 className="text-lg font-bold text-gray-800 mb-1">{product.name}</h3>
      <p className="text-gray-600 text-sm mb-2">{product.description}</p>
      <div className="text-sm text-left text-gray-700 space-y-1">
        <p><strong>Model:</strong> {product.model}</p>
        <p><strong>Price:</strong> ₹ {product.price}</p>
        <p><strong>Horsepower:</strong> {product.horsepower} hp</p>
        <p><strong>Operating Weight:</strong> {product.weight} kg</p>
        <p><strong>Dig Depth:</strong> {product.dig_depth} mm</p>
      </div>
    </div>
  );
}

export default ProductCard;
