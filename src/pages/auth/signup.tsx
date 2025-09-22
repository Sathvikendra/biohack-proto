import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";
import Layout from "@/components/Layout";

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [confirmationSent, setConfirmationSent] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/confirm`,
      },
    });


    setLoading(false);

    if (error) {
      if (error.message.includes("already registered")) {
        setErrorMsg("Email already exists. Please log in.");
      } else {
        setErrorMsg(error.message);
      }
    } 
    else if (!data.user) {
      setErrorMsg("Email already exists. Please log in or check your inbox.");
    }
    else {
      setConfirmationSent(true);
    }
  };

  return (
    <Layout title="Sign Up" showHeader={false}>
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          {!confirmationSent ? (
            <>
              <h1 className="mb-6 text-2xl font-bold text-center text-gray-800">
                Create Your Account
              </h1>

              {errorMsg && (
                <p className="mb-4 text-sm text-red-600 text-center">{errorMsg}</p>
              )}

              <form onSubmit={handleSignUp} className="space-y-4">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Password
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

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2 mt-2 font-semibold text-white bg-teal-600 rounded-md hover:bg-teal-700 disabled:opacity-60"
                >
                  {loading ? "Signing Up…" : "Sign Up"}
                </button>
              </form>

              <p className="mt-4 text-center text-sm text-gray-600">
                Already have an account?{" "}
                <a
                  href="/auth/login"
                  className="text-teal-600 hover:underline font-medium"
                >
                  Log in
                </a>
              </p>
            </>
          ) : (
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2 text-gray-800">
                Confirmation Email Sent!
              </h2>
              <p className="mb-4 text-gray-600">
                Please check your inbox ({email}) and click the confirmation link.
              </p>
              <p className="text-gray-500">
                After confirming your email, you'll be redirected to profile setup.
              </p>

              <p>If you did not receive any email, you already have an account. Try logging in.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}