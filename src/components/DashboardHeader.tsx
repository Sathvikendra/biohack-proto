// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/router"; // <-- import router
// import { supabase } from "@/lib/supabaseClient";
// import { useAuth } from "../context/AuthContext";
// import toast from "react-hot-toast";


// export default function DashboardHeader() {
//   const { user, signOut, loading } = useAuth();
//   const [name, setName] = useState<string | null>(null);
//   const [loadingName, setLoadingName] = useState(true);
//   const router = useRouter(); // <-- initialize router

//   useEffect(() => {
//     if (!user) return;

//     const fetchProfile = async () => {
//       setLoadingName(true);
//       const { data, error } = await supabase
//         .from("profiles")
//         .select("name")
//         .eq("user_id", user.id)
//         .single();

//       if (error) console.error("Error fetching profile:", error);
//       else setName(data?.name || null);

//       setLoadingName(false);
//     };

//     fetchProfile();
//   }, [user]);

//   if (loading || loadingName) return <p>Loading...</p>;

//   const handleLogout = async () => {
//     await signOut();
//     router.push("/"); // <-- redirect to home page after logout
//     toast.success('You successfully logged out')
//   };

//   return (
//     <header className="flex items-center justify-between px-6 py-4 bg-white shadow">
//       <Link
//         href="/dashboard"
//         className="text-xl font-bold text-teal-600 hover:text-teal-700"
//       >
//         Biohack
//       </Link>

//       {/* Right side: user info / auth buttons */}
//       <div className="flex items-center space-x-4">
//         {user ? (
//           <>
//             <span className="font-medium text-gray-700">
//               Welcome back, {name || "User"}
//             </span>
//             <button
//               onClick={handleLogout} // <-- use handler
//               className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
//             >
//               Logout
//             </button>
//           </>
//         ) : (
//           <a
//             href="/auth/login"
//             className="px-3 py-1 bg-teal-500 text-white rounded hover:bg-teal-600"
//           >
//             Login
//           </a>
//         )}
//       </div>
//     </header>
//   );
// }


import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function DashboardHeader() {
  const { user, signOut, loading } = useAuth();
  const [name, setName] = useState<string | null>(null);
  const [loadingName, setLoadingName] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!user) return;
    const fetchProfile = async () => {
      setLoadingName(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("name")
        .eq("user_id", user.id)
        .single();
      if (!error) setName(data?.name || null);
      setLoadingName(false);
    };
    fetchProfile();
  }, [user]);

  if (loading || loadingName) {
    return (
      <header className="px-6 py-4 bg-gradient-to-r from-teal-600 to-teal-700 text-white shadow-md">
        <p>Loading…</p>
      </header>
    );
  }

  const handleLogout = async () => {
    await signOut();
    router.push("/");
    toast.success("You successfully logged out");
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-teal-600 to-teal-700 text-white shadow-md">
      {/* Brand */}
      <Link
        href="/dashboard"
        className="text-2xl font-extrabold tracking-wide hover:scale-105 transform transition duration-200"
      >
        Biohack
      </Link>

      {/* Right side */}
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <div className="flex items-center space-x-2">
              {/* Initial avatar */}
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white font-semibold">
                {name ? name.charAt(0).toUpperCase() : "U"}
              </div>
              <span className="font-medium">
                Hi, {name || "User"}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-1 rounded-full bg-white text-teal-700 font-medium hover:bg-gray-100 transition-colors duration-200 shadow-sm"
            >
              Logout
            </button>
          </>
        ) : (
          <a
            href="/auth/login"
            className="px-4 py-1 rounded-full bg-white text-teal-700 font-medium hover:bg-gray-100 transition-colors duration-200 shadow-sm"
          >
            Login
          </a>
        )}
      </div>
    </header>
  );
}
