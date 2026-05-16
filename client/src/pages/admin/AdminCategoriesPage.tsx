import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import ImageUploader from "../../components/ui/ImageUploader";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
  type Category,
  type CategoryPayload,
} from "../../features/admin/categoryApi";

const emptyForm: CategoryPayload = {
  name: "",
  slug: "",
  description: "",
  image: "",
  isActive: true,
};

export default function AdminCategoriesPage() {
  const queryClient = useQueryClient();
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState<CategoryPayload>(emptyForm);

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["admin-categories"],
    queryFn: getCategories,
  });

  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
    queryClient.invalidateQueries({ queryKey: ["categories"] });
  };

  const createMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      toast.success("Category created");
      setFormData(emptyForm);
      refresh();
    },
    onError: () => toast.error("Failed to create category"),
  });

  const updateMutation = useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      toast.success("Category updated");
      setEditingCategory(null);
      setFormData(emptyForm);
      refresh();
    },
    onError: () => toast.error("Failed to update category"),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      toast.success("Category deleted");
      refresh();
    },
    onError: () => toast.error("Failed to delete category"),
  });

  const isEditing = useMemo(() => !!editingCategory, [editingCategory]);

  const handleSubmit = () => {
    if (isEditing && editingCategory) {
      updateMutation.mutate({ id: editingCategory._id, payload: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  return (
    <div className="space-y-10">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Categories</p>
        <h1 className="mt-3 text-3xl font-semibold text-white">Manage categories</h1>
      </div>

      <div className="rounded-[2rem] border border-white/10 bg-slate-900/60 p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            placeholder="Category name"
            value={formData.name}
            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
          />
          <Input
            placeholder="Slug"
            value={formData.slug}
            onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
          />
        </div>

        <textarea
          value={formData.description}
          onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
          placeholder="Description"
          className="mt-4 min-h-[130px] w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none"
        />

        <div className="mt-4">
          <ImageUploader
            value={formData.image ? [formData.image] : []}
            onChange={(urls) =>
              setFormData((prev) => ({
                ...prev,
                image: urls[0] || "",
              }))
            }
          />
        </div>

        <label className="mt-4 flex items-center gap-3 text-sm text-slate-300">
          <input
            type="checkbox"
            checked={formData.isActive}
            onChange={(e) => setFormData((prev) => ({ ...prev, isActive: e.target.checked }))}
          />
          Active category
        </label>

        <div className="mt-6 flex gap-3">
          <Button onClick={handleSubmit}>
            {isEditing ? "Update Category" : "Create Category"}
          </Button>

          {isEditing && (
            <Button
              variant="secondary"
              onClick={() => {
                setEditingCategory(null);
                setFormData(emptyForm);
              }}
            >
              Cancel
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {isLoading ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-slate-300">
            Loading categories...
          </div>
        ) : (
          categories.map((category) => (
            <div
              key={category._id}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/5"
            >
              {category.image ? (
                <img
                  src={category.image}
                  alt={category.name}
                  className="aspect-[4/3] w-full object-cover"
                />
              ) : (
                <div className="aspect-[4/3] bg-slate-800" />
              )}

              <div className="p-5">
                <h3 className="text-xl font-semibold text-white">{category.name}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-400">
                  {category.description || "No description"}
                </p>

                <div className="mt-5 flex gap-3">
                  <button
                    onClick={() => {
                      setEditingCategory(category);
                      setFormData({
                        name: category.name,
                        slug: category.slug,
                        description: category.description || "",
                        image: category.image || "",
                        isActive: category.isActive,
                      });
                    }}
                    className="rounded-full border border-white/10 px-4 py-2 text-xs text-cyan-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteMutation.mutate(category._id)}
                    className="rounded-full border border-white/10 px-4 py-2 text-xs text-rose-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}