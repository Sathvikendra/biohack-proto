// src/pages/auth/reset-password.tsx
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabaseClient";
import Layout from "@/components/Layout";

export default function ResetPassword() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [sessionValid, setSessionValid] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error || !data.session) {
        setMessage("Invalid or expired token. Please request a new password reset.");
        setSessionValid(false);
      } else {
        setSessionValid(true);
      }
    };

    checkSession();
  }, []);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({ password });

      setLoading(false);

      if (error) {
        setMessage(`Error: ${error.message}`);
      } else {
        setMessage("Password successfully updated! Redirecting to login…");
        setTimeout(() => {
          router.push("/auth/login");
        }, 3000);
      }
    } catch (err: any) {
      setLoading(false);
      setMessage(`Something went wrong: ${err.message}`);
    }
  };

  return (
    <Layout title="Reset Password" showHeader={false}>
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <h1 className="mb-6 text-2xl font-bold text-center text-gray-800">
            Reset Password
          </h1>

          {message && (
            <p className="mb-4 text-sm text-red-600 text-center">{message}</p>
          )}

          {sessionValid ? (
            <form onSubmit={handleReset} className="space-y-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  New Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 mt-2 font-semibold text-white bg-teal-600 rounded-md hover:bg-teal-700 disabled:opacity-60"
              >
                {loading ? "Updating Password…" : "Reset Password"}
              </button>
            </form>
          ) : (
            <p className="text-center text-gray-600">
              Please request a new password reset link.
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
}
