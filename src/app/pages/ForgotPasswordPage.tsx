import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Mail, CheckCircle2 } from "lucide-react";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { PageTransition } from "../components/ui/PageTransition";

export function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) { setError("Please enter your email"); return; }
    setLoading(true);
    setError("");
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSent(true);
  };

  return (
    <PageTransition className="flex flex-col min-h-screen max-w-md mx-auto bg-page-gradient">
      <header className="flex items-center gap-3 px-5 py-4">
        <button
          onClick={() => navigate("/login")}
          className="flex items-center justify-center size-9 rounded-xl text-muted-foreground/60 hover:text-white hover:bg-white/[0.06] transition-all duration-200 active:scale-95"
          aria-label="Back to login"
        >
          <ArrowLeft className="size-[18px]" strokeWidth={1.5} />
        </button>
      </header>

      <div className="bg-hero-gradient flex-1 flex flex-col justify-center px-6 gap-10">
        {sent ? (
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="flex items-center justify-center size-20 rounded-2xl bg-success/[0.08] border border-success/20" aria-hidden="true">
              <CheckCircle2 className="size-10 text-success" strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="text-white mb-3">Check Your Email</h1>
              <p className="text-[15px] text-muted-foreground/60 max-w-xs mx-auto leading-relaxed">
                We've sent password reset instructions to <strong className="text-white">{email}</strong>
              </p>
            </div>
            <Button onClick={() => navigate("/login")} size="lg">Back to Login</Button>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="flex items-center justify-center size-[72px] rounded-2xl bg-gold/[0.08] border border-gold/[0.12] text-gold card-glow-gold" aria-hidden="true">
                <Mail className="size-8" strokeWidth={1.5} />
              </div>
              <h1 className="text-white">Reset Password</h1>
              <p className="text-[15px] text-muted-foreground/60 leading-relaxed">Enter your email and we'll send reset instructions</p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
              {error && (
                <div className="flex items-center gap-2.5 bg-error/[0.08] border border-error/20 rounded-xl px-4 py-3.5 text-[14px] text-error" role="alert">
                  <span className="size-1.5 rounded-full bg-error shrink-0" aria-hidden="true" />
                  <span>{error}</span>
                </div>
              )}
              <Input label="Email" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required />
              <Button type="submit" fullWidth size="lg" loading={loading}>Send Reset Link</Button>
            </form>
          </>
        )}
      </div>
    </PageTransition>
  );
}
