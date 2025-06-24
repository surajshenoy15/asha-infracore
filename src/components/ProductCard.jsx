function ProductCard({ product }) {
  return (
    <div className="shadow p-4 rounded bg-white">
      <img src={product.image_url} alt={product.name} className="h-48 w-full object-cover mb-4" />
      <h3 className="text-xl font-bold">{product.name}</h3>
      <p>Model: {product.model}</p>
      <p className="font-bold text-orange-600">₹ {product.price}</p>
      <p className="text-sm">{product.description}</p>
    </div>
  );
}

export default ProductCard;
