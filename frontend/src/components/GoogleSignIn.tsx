import { useEffect, useRef } from "react";
import { useToast } from "./Toast";

/**
 * Google Sign-In button using the Google Identity Services (GIS) library.
 *
 * Renders a Google-branded button that triggers the OAuth consent popup.
 * On success, the ID token is sent to our backend at POST /auth/google,
 * which verifies it and returns a NursePath JWT.
 *
 * Prerequisite:
 *   VITE_GOOGLE_CLIENT_ID env var set to your Google OAuth Client ID
 *   Script loaded: <script src="https://accounts.google.com/gsi/client" async defer>
 */

export default function GoogleSignIn() {
  const { toast } = useToast();
  const btnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const init = () => {
      if (typeof google === "undefined" || !btnRef.current) return;

      google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID ?? "",
        callback: async (response: { credential?: string }) => {
          if (!response.credential) {
            toast("Google sign-in failed. Please try again.", "error");
            return;
          }
          try {
              const { googleLogin } = await import("../lib/api");
              const res = await googleLogin(response.credential);
            localStorage.setItem("np_token", res.token);
            // Reload to re-hydrate auth state with the new token.
            window.location.href = "/dashboard";
          } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Google sign-in failed.";
            toast(msg, "error");
          }
        },
      });

      google.accounts.id.renderButton(btnRef.current, {
        type: "standard",
        shape: "rectangular",
        theme: "outline",
        size: "large",
        text: "continue_with",
        width: 400,
        logo_alignment: "left",
      });
    };

    if (typeof google !== "undefined") {
      init();
    } else {
      window.addEventListener("load", init);
      return () => window.removeEventListener("load", init);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <div ref={btnRef} className="w-full flex justify-center" />;
}

declare global {
  const google: {
    accounts: {
      id: {
        initialize: (config: {
          client_id: string;
          callback: (response: { credential?: string }) => void;
        }) => void;
        renderButton: (
          element: HTMLElement,
          options: Record<string, unknown>,
        ) => void;
      };
    };
  };
}
