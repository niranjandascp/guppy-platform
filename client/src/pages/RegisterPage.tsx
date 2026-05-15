import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import Container from "../components/layout/Container";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { registerUser } from "../features/auth/authApi";

const registerSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success("Account created successfully");
      navigate("/login");
    },
    onError: () => {
      toast.error("Registration failed");
    },
  });

  const onSubmit = (values: RegisterFormData) => mutate(values);

  return (
    <div className="py-20">
      <Container className="max-w-lg">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Register</p>
          <h1 className="mt-3 text-3xl font-semibold text-white">Create an account</h1>
          <p className="mt-3 text-slate-400">
            Join the platform to shop premium guppy lines and manage orders.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
            <div>
              <Input type="text" placeholder="Full name" {...register("name")} />
              {errors.name && (
                <p className="mt-2 text-sm text-rose-400">{errors.name.message}</p>
              )}
            </div>

            <div>
              <Input type="email" placeholder="Email address" {...register("email")} />
              {errors.email && (
                <p className="mt-2 text-sm text-rose-400">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Input type="password" placeholder="Password" {...register("password")} />
              {errors.password && (
                <p className="mt-2 text-sm text-rose-400">{errors.password.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Creating account..." : "Register"}
            </Button>
          </form>

          <p className="mt-6 text-sm text-slate-400">
            Already have an account?{" "}
            <Link to="/login" className="text-cyan-300 hover:text-cyan-200">
              Login
            </Link>
          </p>
        </div>
      </Container>
    </div>
  );
}
