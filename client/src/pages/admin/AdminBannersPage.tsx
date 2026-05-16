import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import ImageUploader from "../../components/ui/ImageUploader";
import {
  createBanner,
  deleteBanner,
  getBanners,
  updateBanner,
  type Banner,
  type BannerPayload,
} from "../../features/admin/bannerApi";

const emptyForm: BannerPayload = {
  title: "",
  subtitle: "",
  image: "",
  ctaText: "",
  ctaLink: "",
  isActive: true,
};

export default function AdminBannersPage() {
  const queryClient = useQueryClient();
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [formData, setFormData] = useState<BannerPayload>(emptyForm);

  const { data: banners = [], isLoading } = useQuery({
    queryKey: ["admin-banners"],
    queryFn: getBanners,
  });

  const refreshBanners = () => {
    queryClient.invalidateQueries({ queryKey: ["admin-banners"] });
  };

  const createMutation = useMutation({
    mutationFn: createBanner,
    onSuccess: () => {
      toast.success("Banner created");
      setFormData(emptyForm);
      refreshBanners();
    },
    onError: () => toast.error("Failed to create banner"),
  });

  const updateMutation = useMutation({
    mutationFn: updateBanner,
    onSuccess: () => {
      toast.success("Banner updated");
      setEditingBanner(null);
      setFormData(emptyForm);
      refreshBanners();
    },
    onError: () => toast.error("Failed to update banner"),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBanner,
    onSuccess: () => {
      toast.success("Banner deleted");
      refreshBanners();
    },
    onError: () => toast.error("Failed to delete banner"),
  });

  const isEditing = useMemo(() => !!editingBanner, [editingBanner]);

  const handleSubmit = () => {
    if (!formData.image) {
      toast.error("Please upload a banner image");
      return;
    }

    if (isEditing && editingBanner) {
      updateMutation.mutate({ id: editingBanner._id, payload: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  return (
    <div className="space-y-10">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Banners</p>
        <h1 className="mt-3 text-3xl font-semibold text-white">Manage banners</h1>
      </div>

      <div className="rounded-[2rem] border border-white/10 bg-slate-900/60 p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            placeholder="Title"
            value={formData.title}
            onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
          />
          <Input
            placeholder="Subtitle"
            value={formData.subtitle}
            onChange={(e) => setFormData((prev) => ({ ...prev, subtitle: e.target.value }))}
          />
          <Input
            placeholder="CTA text"
            value={formData.ctaText}
            onChange={(e) => setFormData((prev) => ({ ...prev, ctaText: e.target.value }))}
          />
          <Input
            placeholder="CTA link"
            value={formData.ctaLink}
            onChange={(e) => setFormData((prev) => ({ ...prev, ctaLink: e.target.value }))}
          />
        </div>

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
          Active banner
        </label>

        <div className="mt-6 flex gap-3">
          <Button onClick={handleSubmit}>
            {isEditing ? "Update Banner" : "Create Banner"}
          </Button>

          {isEditing && (
            <Button
              variant="secondary"
              onClick={() => {
                setEditingBanner(null);
                setFormData(emptyForm);
              }}
            >
              Cancel
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {isLoading ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-slate-300">
            Loading banners...
          </div>
        ) : (
          banners.map((banner) => (
            <div
              key={banner._id}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/5"
            >
              <img
                src={banner.image}
                alt={banner.title}
                className="aspect-[16/9] w-full object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold text-white">{banner.title}</h3>
                <p className="mt-2 text-slate-400">{banner.subtitle}</p>

                <div className="mt-5 flex gap-3">
                  <button
                    onClick={() => {
                      setEditingBanner(banner);
                      setFormData({
                        title: banner.title,
                        subtitle: banner.subtitle || "",
                        image: banner.image,
                        ctaText: banner.ctaText || "",
                        ctaLink: banner.ctaLink || "",
                        isActive: banner.isActive,
                      });
                    }}
                    className="rounded-full border border-white/10 px-4 py-2 text-xs text-cyan-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteMutation.mutate(banner._id)}
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