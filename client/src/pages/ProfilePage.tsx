import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Container from "../components/layout/Container";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import {
  addAddress,
  deleteAddress,
  getProfile,
  updateProfile,
} from "../features/profile/profileApi";

type ProfileFormData = {
  name: string;
  email: string;
};

type AddressFormData = {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

export default function ProfilePage() {
  const queryClient = useQueryClient();

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  const profileForm = useForm<ProfileFormData>({
    values: {
      name: profile?.name || "",
      email: profile?.email || "",
    },
  });

  const addressForm = useForm<AddressFormData>();

  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      toast.success("Profile updated");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: () => toast.error("Failed to update profile"),
  });

  const addAddressMutation = useMutation({
    mutationFn: addAddress,
    onSuccess: () => {
      toast.success("Address added");
      addressForm.reset();
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: () => toast.error("Failed to add address"),
  });

  const deleteAddressMutation = useMutation({
    mutationFn: deleteAddress,
    onSuccess: () => {
      toast.success("Address removed");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: () => toast.error("Failed to delete address"),
  });

  if (isLoading) {
    return (
      <div className="py-16">
        <Container>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-slate-300">
            Loading profile...
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-16">
      <Container>
        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">
              Profile
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-white">Account details</h1>

            <form
              className="mt-8 space-y-5"
              onSubmit={profileForm.handleSubmit((values) =>
                updateProfileMutation.mutate(values)
              )}
            >
              <Input placeholder="Name" {...profileForm.register("name")} />
              <Input placeholder="Email" {...profileForm.register("email")} />
              <Button type="submit" className="w-full" disabled={updateProfileMutation.isPending}>
                {updateProfileMutation.isPending ? "Saving..." : "Save Profile"}
              </Button>
            </form>
          </section>

          <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">
              Address book
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white">Manage addresses</h2>

            <form
              className="mt-8 grid gap-4"
              onSubmit={addressForm.handleSubmit((values) => addAddressMutation.mutate(values))}
            >
              <Input placeholder="Full name" {...addressForm.register("fullName")} />
              <Input placeholder="Phone" {...addressForm.register("phone")} />
              <Input placeholder="Address line 1" {...addressForm.register("addressLine1")} />
              <Input placeholder="Address line 2" {...addressForm.register("addressLine2")} />
              <div className="grid gap-4 md:grid-cols-2">
                <Input placeholder="City" {...addressForm.register("city")} />
                <Input placeholder="State" {...addressForm.register("state")} />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <Input placeholder="Postal code" {...addressForm.register("postalCode")} />
                <Input placeholder="Country" {...addressForm.register("country")} />
              </div>
              <Button type="submit" className="w-full" disabled={addAddressMutation.isPending}>
                {addAddressMutation.isPending ? "Adding..." : "Add Address"}
              </Button>
            </form>

            <div className="mt-8 space-y-4">
              {profile?.addresses?.map((address) => (
                <div
                  key={address._id}
                  className="rounded-2xl border border-white/10 bg-slate-900/60 p-4"
                >
                  <p className="font-semibold text-white">{address.fullName}</p>
                  <p className="mt-2 text-sm text-slate-300">
                    {address.addressLine1}, {address.addressLine2 ? `${address.addressLine2}, ` : ""}
                    {address.city}, {address.state}, {address.postalCode}, {address.country}
                  </p>
                  <p className="mt-1 text-sm text-slate-400">{address.phone}</p>

                  {address._id && (
                    <button
                      onClick={() => deleteAddressMutation.mutate(address._id!)}
                      className="mt-4 rounded-full border border-white/10 px-4 py-2 text-xs text-rose-300"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
}