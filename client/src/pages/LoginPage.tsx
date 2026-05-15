import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import Container from "../components/layout/Container";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { loginUser } from "../features/auth/authApi";
import { useAuthStore, type AuthState } from "../features/auth/authStore";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state: AuthState) => state.setAuth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setAuth({ user: data.user, accessToken: data.accessToken });
      toast.success("Welcome back");
      navigate("/");
    },
    onError: () => {
      toast.error("Login failed");
    },
  });

  const onSubmit = (values: LoginFormData) => mutate(values);

  return (
    <div className="bg-slate-950 py-20">
      <Container className="max-w-lg">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Login</p>
          <h1 className="mt-3 text-3xl font-semibold text-white">Access your account</h1>
          <p className="mt-3 text-slate-400">
            Sign in to manage orders, wishlist, and your premium collection.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
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
              {isPending ? "Signing in..." : "Login"}
            </Button>
          </form>

          <p className="mt-6 text-sm text-slate-400">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-cyan-300 hover:text-cyan-200">
              Create one
            </Link>
          </p>
        </div>
      </Container>
    </div>
  );
}
