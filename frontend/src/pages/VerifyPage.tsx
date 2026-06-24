import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Spinner } from "../components/ui";
import * as api from "../lib/api";

export default function VerifyPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setErrorMsg("No verification token provided.");
      return;
    }

    api
      .verifyEmail(token)
      .then(async (res) => {
        // Store the token and redirect to dashboard.
        localStorage.setItem("np_token", res.token);
        setStatus("success");
        // Reload to re-hydrate auth state with the new token.
        window.location.href = "/dashboard";
      })
      .catch((err: unknown) => {
        setStatus("error");
        setErrorMsg(err instanceof Error ? err.message : "Verification failed. The link may be expired.");
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/5 via-white to-secondary/5 px-4">
      <div className="w-full max-w-md text-center">
        {status === "loading" && (
          <>
            <Spinner size="lg" />
            <p className="mt-4 text-gray-500">Verifying your email…</p>
          </>
        )}

        {status === "success" && (
          <>
            <span className="text-6xl">✅</span>
            <h1 className="mt-4 text-2xl font-bold text-secondary">Email Verified!</h1>
            <p className="mt-2 text-gray-500">Redirecting to your dashboard…</p>
          </>
        )}

        {status === "error" && (
          <>
            <span className="text-6xl">❌</span>
            <h1 className="mt-4 text-2xl font-bold text-alert">Verification Failed</h1>
            <p className="mt-2 text-gray-500">{errorMsg}</p>
            <div className="mt-6 space-x-3">
              <Link to="/login" className="btn-primary">Back to Sign in</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
