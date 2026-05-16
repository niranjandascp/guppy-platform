import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  createProduct,
  deleteProduct,
  getAdminProducts,
  updateProduct,
  type AdminProduct,
  type ProductPayload,
} from "../../features/admin/adminProductsApi";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import ImageUploader from "../../components/ui/ImageUploader";

const emptyForm: ProductPayload = {
  title: "",
  slug: "",
  description: "",
  category: "",
  breed: "",
  price: 0,
  discountPrice: 0,
  stock: 0,
  featured: false,
  genetics: "",
  tankSize: "",
  lifespan: "",
  images: [],
};

export default function AdminProductsPage() {
  const queryClient = useQueryClient();
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);
  const [formData, setFormData] = useState<ProductPayload>(emptyForm);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["admin-products"],
    queryFn: getAdminProducts,
  });

  const refreshProducts = () => {
    queryClient.invalidateQueries({ queryKey: ["admin-products"] });
    queryClient.invalidateQueries({ queryKey: ["products"] });
    queryClient.invalidateQueries({ queryKey: ["featured-products"] });
  };

  const createMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      toast.success("Product created");
      setFormData(emptyForm);
      refreshProducts();
    },
    onError: () => toast.error("Failed to create product"),
  });

  const updateMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      toast.success("Product updated");
      setEditingProduct(null);
      setFormData(emptyForm);
      refreshProducts();
    },
    onError: () => toast.error("Failed to update product"),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      toast.success("Product deleted");
      refreshProducts();
    },
    onError: () => toast.error("Failed to delete product"),
  });

  const isEditing = useMemo(() => !!editingProduct, [editingProduct]);

  const handleChange = (key: keyof ProductPayload, value: string | number | boolean | string[]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const startEdit = (product: AdminProduct) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      slug: product.slug,
      description: product.description,
      category: product.category,
      breed: product.breed || "",
      price: product.price,
      discountPrice: product.discountPrice || 0,
      stock: product.stock,
      featured: product.featured || false,
      genetics: product.genetics || "",
      tankSize: product.tankSize || "",
      lifespan: product.lifespan || "",
      images: product.images || [],
    });
  };

  const handleSubmit = () => {
    if (isEditing && editingProduct) {
      updateMutation.mutate({ id: editingProduct._id, payload: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  return (
    <div className="space-y-10">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Products</p>
        <h1 className="mt-3 text-3xl font-semibold text-white">Manage products</h1>
      </div>

      <div className="rounded-[2rem] border border-white/10 bg-slate-900/60 p-6">
        <h2 className="text-xl font-semibold text-white">
          {isEditing ? "Edit product" : "Create product"}
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Input
            placeholder="Title"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
          <Input
            placeholder="Slug"
            value={formData.slug}
            onChange={(e) => handleChange("slug", e.target.value)}
          />
          <Input
            placeholder="Category"
            value={formData.category}
            onChange={(e) => handleChange("category", e.target.value)}
          />
          <Input
            placeholder="Breed"
            value={formData.breed}
            onChange={(e) => handleChange("breed", e.target.value)}
          />
          <Input
            placeholder="Price"
            type="number"
            value={formData.price}
            onChange={(e) => handleChange("price", Number(e.target.value))}
          />
          <Input
            placeholder="Discount price"
            type="number"
            value={formData.discountPrice}
            onChange={(e) => handleChange("discountPrice", Number(e.target.value))}
          />
          <Input
            placeholder="Stock"
            type="number"
            value={formData.stock}
            onChange={(e) => handleChange("stock", Number(e.target.value))}
          />
          <Input
            placeholder="Genetics"
            value={formData.genetics}
            onChange={(e) => handleChange("genetics", e.target.value)}
          />
          <Input
            placeholder="Tank size"
            value={formData.tankSize}
            onChange={(e) => handleChange("tankSize", e.target.value)}
          />
          <Input
            placeholder="Lifespan"
            value={formData.lifespan}
            onChange={(e) => handleChange("lifespan", e.target.value)}
          />
        </div>

        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          className="mt-4 min-h-[140px] w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40"
        />

        <div className="mt-4">
          <ImageUploader
            value={formData.images || []}
            onChange={(urls) => handleChange("images", urls)}
          />
        </div>

        <label className="mt-4 flex items-center gap-3 text-sm text-slate-300">
          <input
            type="checkbox"
            checked={formData.featured}
            onChange={(e) => handleChange("featured", e.target.checked)}
          />
          Featured product
        </label>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button onClick={handleSubmit} disabled={createMutation.isPending || updateMutation.isPending}>
            {isEditing
              ? updateMutation.isPending
                ? "Updating..."
                : "Update Product"
              : createMutation.isPending
              ? "Creating..."
              : "Create Product"}
          </Button>

          {isEditing && (
            <Button
              variant="secondary"
              onClick={() => {
                setEditingProduct(null);
                setFormData(emptyForm);
              }}
            >
              Cancel Edit
            </Button>
          )}
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-900/80 text-slate-300">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10 text-slate-200">
            {isLoading ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-slate-400">
                  Loading products...
                </td>
              </tr>
            ) : products.length ? (
              products.map((product) => (
                <tr key={product._id}>
                  <td className="px-4 py-4">{product.title}</td>
                  <td className="px-4 py-4">{product.category}</td>
                  <td className="px-4 py-4">{product.stock}</td>
                  <td className="px-4 py-4">₹{product.price}</td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => startEdit(product)}
                        className="rounded-full border border-white/10 px-4 py-2 text-xs text-cyan-300"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteMutation.mutate(product._id)}
                        className="rounded-full border border-white/10 px-4 py-2 text-xs text-rose-300"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-slate-400">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}