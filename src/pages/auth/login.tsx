// import { useState } from "react";
// import { useRouter } from "next/router";
// import { supabase } from "@/lib/supabaseClient";
// import Layout from "@/components/Layout";


// export default function Login() {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setErrorMsg("");

//     const { error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });

//     setLoading(false);

//     if (error) {
//       setErrorMsg(error.message);
//     } else {
//       router.push("/profile/setup");
//     }
//   };

//   return (
//     <Layout title="Log In" showHeader={false}>
//       <div className="flex items-center justify-center min-h-screen bg-gray-50">
//         <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
//           <h1 className="mb-6 text-2xl font-bold text-center text-gray-800">
//             Log In
//           </h1>

//           {errorMsg && (
//             <p className="mb-4 text-sm text-red-600 text-center">{errorMsg}</p>
//           )}

//           <form onSubmit={handleLogin} className="space-y-4">
//             <div>
//               <label className="block mb-1 text-sm font-medium text-gray-700">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 required
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
//                 placeholder="you@example.com"
//               />
//             </div>

//             <div>
//               <label className="block mb-1 text-sm font-medium text-gray-700">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 required
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
//                 placeholder="••••••••"
//               />
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full py-2 mt-2 font-semibold text-white bg-teal-600 rounded-md hover:bg-teal-700 disabled:opacity-60"
//             >
//               {loading ? "Logging In…" : "Log In"}
//             </button>
//           </form>

//           <p className="mt-4 text-center text-sm text-gray-600">
//             Don’t have an account?{" "}
//             <a
//               href="/auth/signup"
//               className="text-teal-600 hover:underline font-medium"
//             >
//               Sign up
//             </a>
//           </p>
//         </div>
//       </div>
//     </Layout>
//   );
// }

import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabaseClient";
import Layout from "@/components/Layout";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [resetMsg, setResetMsg] = useState(""); // message for password reset
  const [sendingReset, setSendingReset] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
    } else {
      router.push("/profile/setup");
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setResetMsg("Please enter your email to reset password.");
      return;
    }

    setSendingReset(true);
    setResetMsg("");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });

    setSendingReset(false);

    if (error) {
      setResetMsg(`Error: ${error.message}`);
    } else {
      setResetMsg(`Password reset email sent to ${email}`);
    }
  };

  return (
    <Layout title="Log In" showHeader={false}>
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <h1 className="mb-6 text-2xl font-bold text-center text-gray-800">
            Log In
          </h1>

          {errorMsg && (
            <p className="mb-4 text-sm text-red-600 text-center">{errorMsg}</p>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
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
              {loading ? "Logging In…" : "Log In"}
            </button>
          </form>

          <p className="mt-2 text-sm text-center text-teal-600 cursor-pointer hover:underline" onClick={handleForgotPassword}>
            {sendingReset ? "Sending reset email…" : "Forgot Password?"}
          </p>
          {resetMsg && <p className="mt-2 text-sm text-gray-600 text-center">{resetMsg}</p>}

          <p className="mt-4 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <a
              href="/auth/signup"
              className="text-teal-600 hover:underline font-medium"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </Layout>
  );
}
