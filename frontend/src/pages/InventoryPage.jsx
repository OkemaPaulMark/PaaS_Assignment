import { useState, useEffect, useCallback } from "react";
import * as productService from "../services/productService";
import ProductTable from "../components/ProductTable";
import ProductForm from "../components/ProductForm";
import StatCard from "../components/StatCard";

const InventoryPage = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchProducts = useCallback(async () => {
    try {
      const { data } = await productService.getProducts();
      setProducts(data.data);
      setFiltered(data.data);
    } catch {
      setError("Failed to load products.");
    }
  }, []);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(
      products.filter(
        (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
      )
    );
  }, [search, products]);

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      if (editing) {
        await productService.updateProduct(editing.id, data);
      } else {
        await productService.createProduct(data);
      }
      await fetchProducts();
      setShowForm(false);
      setEditing(null);
    } catch {
      setError("Failed to save product.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setEditing(product);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    try {
      await productService.deleteProduct(id);
      await fetchProducts();
    } catch {
      setError("Failed to delete product.");
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditing(null);
  };

  const totalValue = products.reduce((sum, p) => sum + Number(p.price) * p.quantity, 0);
  const lowStock = products.filter((p) => p.quantity <= 5).length;
  const categories = new Set(products.map((p) => p.category)).size;

  const formatUGX = (val) => `UGX ${Number(val).toLocaleString("en-UG", { minimumFractionDigits: 0 })}`;

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-gray-800">Inventory Manager</h1>
          <p className="text-xs text-gray-400 mt-0.5">Track and manage your products</p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-4 space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm flex justify-between items-center">
            {error}
            <button onClick={() => setError("")} className="font-bold ml-4">✕</button>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <StatCard label="Total Products" value={products.length} />
          <StatCard label="Categories" value={categories} />
          <StatCard label="Low Stock Items" value={lowStock} />
          <StatCard label="Inventory Value" value={formatUGX(totalValue)} />
        </div>

        <div className="flex items-center justify-between">
          <input
            type="text"
            placeholder="Search by name or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-sm border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => { setEditing(null); setShowForm(true); }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap"
          >
            + Add Product
          </button>
        </div>

        <ProductTable products={filtered} onEdit={handleEdit} onDelete={handleDelete} />
      </main>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              {editing ? "Edit Product" : "Add New Product"}
            </h2>
            <ProductForm
              initial={editing}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              loading={loading}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryPage;
