const LOW_STOCK = 5;

const ProductTable = ({ products, onEdit, onDelete }) => (
  <div className="overflow-x-auto rounded-xl shadow-md bg-white">
    <table className="min-w-full text-sm">
      <thead>
        <tr className="border-b border-gray-200">
          {["#", "Name", "Category", "Price (UGX)", "Quantity", "Status", "Actions"].map((h) => (
            <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {products.length === 0 ? (
          <tr>
            <td colSpan={7} className="text-center py-12 text-gray-400 text-sm">
              No products found.
            </td>
          </tr>
        ) : (
          products.map((p, index) => (
            <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3 text-gray-400 text-xs">{index + 1}</td>
              <td className="px-4 py-3 font-semibold text-gray-800">{p.name}</td>
              <td className="px-4 py-3">
                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-md">{p.category}</span>
              </td>
              <td className="px-4 py-3 text-gray-700">{Number(p.price).toLocaleString("en-UG")}</td>
              <td className="px-4 py-3 text-gray-700">{p.quantity}</td>
              <td className="px-4 py-3">
                {p.quantity <= LOW_STOCK ? (
                  <span className="bg-red-50 text-red-500 text-xs font-medium px-2.5 py-1 rounded-md">Low Stock</span>
                ) : (
                  <span className="bg-green-50 text-green-600 text-xs font-medium px-2.5 py-1 rounded-md">In Stock</span>
                )}
              </td>
              <td className="px-4 py-3">
                <div className="flex gap-3">
                  <button
                    onClick={() => onEdit(p)}
                    className="text-xs text-blue-600 hover:text-blue-800 font-medium transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(p.id)}
                    className="text-xs text-red-500 hover:text-red-700 font-medium transition"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);

export default ProductTable;
