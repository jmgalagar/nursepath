import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../lib/auth";
import { Input, Button, CardBody } from "../components/ui";

export default function RegisterPage() {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      await register(email, password, name || undefined);
      setRegistered(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Registration failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  if (registered) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/5 via-white dark:via-gray-950 dark:via-gray-950 to-secondary/5 px-4">
        <div className="w-full max-w-md text-center">
          <span className="text-6xl">📧</span>
          <h1 className="mt-4 text-2xl font-bold text-gray-900">Check your email</h1>
          <p className="mt-2 text-gray-500">
            We sent a verification link to <strong>{email}</strong>.
            Click the link to activate your account.
          </p>
          <p className="mt-4 text-sm text-gray-400">
            Didn't get it? Check your spam folder, or{" "}
            <button onClick={() => setRegistered(false)} className="text-primary hover:underline">
              try again
            </button>.
          </p>
          <Link to="/login" className="btn-primary mt-6 inline-flex">
            Back to Sign in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/5 via-white dark:via-gray-950 to-secondary/5 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <span className="text-5xl">🩺</span>
          <h1 className="mt-3 text-3xl font-bold text-gray-900">Join NursePath</h1>
          <p className="mt-2 text-gray-500">
            Start your Philippine BSN nursing journey
          </p>
        </div>

        <div className="card">
          <CardBody className="space-y-5">
            <h2 className="text-xl font-semibold">Create account</h2>

            {error && (
              <div className="rounded-lg bg-alert/10 px-4 py-3 text-sm text-alert">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Full name (optional)"
                placeholder="Maria Santos"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                label="Email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
              <Input
                label="Confirm password"
                type="password"
                placeholder="••••••••"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                minLength={6}
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Creating account…" : "Create account"}
              </Button>
            </form>

            <p className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-primary hover:text-primary-dark">
                Sign in
              </Link>
            </p>
          </CardBody>
        </div>
      </div>
    </div>
  );
}
