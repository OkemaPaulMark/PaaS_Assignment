import { useState, useEffect } from "react";

const EMPTY = { name: "", description: "", price: "", quantity: "", category: "" };

const ProductForm = ({ initial, onSubmit, onCancel, loading }) => {
  const [form, setForm] = useState(EMPTY);

  useEffect(() => {
    setForm(initial ? { ...initial, price: initial.price, quantity: initial.quantity } : EMPTY);
  }, [initial]);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...form, price: parseFloat(form.price), quantity: parseInt(form.quantity) });
  };

  const fields = [
    { name: "name", label: "Product Name", type: "text", required: true },
    { name: "category", label: "Category", type: "text", required: true },
    { name: "price", label: "Price (UGX)", type: "number", required: true },
    { name: "quantity", label: "Quantity", type: "number", required: true },
    { name: "description", label: "Description", type: "text", required: false },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map(({ name, label, type, required }) => (
        <div key={name}>
          <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
          <input
            name={name}
            type={type}
            value={form[name]}
            onChange={handleChange}
            required={required}
            min={type === "number" ? "0" : undefined}
            step={name === "price" ? "0.01" : undefined}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      ))}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition disabled:opacity-50"
        >
          {loading ? "Saving..." : initial ? "Update Product" : "Add Product"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg text-sm font-medium transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
