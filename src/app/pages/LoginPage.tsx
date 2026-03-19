import { useState } from "react";
import { useNavigate } from "react-router";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { GymLogo } from "../components/ui/GymLogo";
import { useAuth } from "../context/AuthContext";
import { PageTransition } from "../components/ui/PageTransition";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      await login(email, password);
      navigate("/");
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition className="flex flex-col min-h-screen max-w-md mx-auto bg-page-gradient">
      <div className="bg-hero-gradient flex-1 flex flex-col justify-center px-6 py-16 gap-10">
        {/* Logo */}
        <div className="flex flex-col items-center">
          <GymLogo size={64} showWordmark wordmarkClassName="text-[18px] font-medium tracking-[0.12em] text-[#d4af37]/68" />
        </div>

        {/* Welcome text */}
        <div className="text-center">
          <h1 className="text-white mb-3">Welcome Back</h1>
          <p className="text-[14px] text-muted-foreground/62 leading-[1.8]">
            Log in to access your membership and gym services
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
          {error && (
            <div className="flex items-center gap-2.5 bg-error/[0.08] border border-error/20 rounded-xl px-4 py-3.5 text-[14px] text-error" role="alert">
              <span className="size-1.5 rounded-full bg-error shrink-0" aria-hidden="true" />
              <span>{error}</span>
            </div>
          )}
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
          <Input
            label="Password"
            isPassword
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-[13px] text-muted-foreground/60 hover:text-gold transition-colors duration-200"
            >
              Forgot Password?
            </button>
          </div>
          <Button type="submit" fullWidth size="lg" loading={loading}>
            Log In
          </Button>
        </form>

        {/* Sign up link */}
        <p className="text-center text-[14px] text-muted-foreground/70">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-gold hover:text-gold-hover transition-colors duration-200"
          >
            Create Account
          </button>
        </p>
      </div>
    </PageTransition>
  );
}
