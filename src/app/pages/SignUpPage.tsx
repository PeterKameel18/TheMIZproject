import { useState } from "react";
import { useNavigate } from "react-router";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { GymLogo } from "../components/ui/GymLogo";
import { useAuth } from "../context/AuthContext";
import { PageTransition } from "../components/ui/PageTransition";

export function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all required fields");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      await signup({ name, email, password, phone });
      navigate("/");
    } catch {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition className="flex flex-col min-h-screen max-w-md mx-auto bg-page-gradient">
      <div className="bg-hero-gradient flex-1 flex flex-col justify-center px-6 py-12 gap-10">
        <div className="flex flex-col items-center">
          <GymLogo size={64} showWordmark />
        </div>

        <div className="text-center">
          <h1 className="text-white mb-3">Create Account</h1>
          <p className="text-[15px] text-muted-foreground/70 leading-relaxed">
            Join The MIZ Gym
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
          {error && (
            <div className="flex items-center gap-2.5 bg-error/[0.08] border border-error/20 rounded-xl px-4 py-3.5 text-[14px] text-error" role="alert">
              <span className="size-1.5 rounded-full bg-error shrink-0" aria-hidden="true" />
              <span>{error}</span>
            </div>
          )}
          <Input label="Full Name" placeholder="Enter your full name" value={name} onChange={(e) => setName(e.target.value)} required />
          <Input label="Email" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required />
          <Input label="Phone Number" type="tel" placeholder="+20 10 000 0000" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <Input label="Password" isPassword placeholder="Create a password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" required />
          <Input label="Confirm Password" isPassword placeholder="Confirm your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} autoComplete="new-password" required />
          <Button type="submit" fullWidth size="lg" loading={loading}>
            Sign Up
          </Button>
        </form>

        <p className="text-center text-[14px] text-muted-foreground/70">
          Already have an account?{" "}
          <button onClick={() => navigate("/login")} className="text-gold hover:text-gold-hover transition-colors duration-200">
            Log In
          </button>
        </p>
      </div>
    </PageTransition>
  );
}
