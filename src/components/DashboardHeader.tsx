import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router"; // <-- import router
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "../context/AuthContext";

export default function DashboardHeader() {
  const { user, signOut, loading } = useAuth();
  const [name, setName] = useState<string | null>(null);
  const [loadingName, setLoadingName] = useState(true);
  const router = useRouter(); // <-- initialize router

  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      setLoadingName(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("name")
        .eq("user_id", user.id)
        .single();

      if (error) console.error("Error fetching profile:", error);
      else setName(data?.name || null);

      setLoadingName(false);
    };

    fetchProfile();
  }, [user]);

  if (loading || loadingName) return <p>Loading...</p>;

  const handleLogout = async () => {
    await signOut();
    router.push("/"); // <-- redirect to home page after logout
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow">
      <Link
        href="/dashboard"
        className="text-xl font-bold text-teal-600 hover:text-teal-700"
      >
        Biohack
      </Link>

      {/* Right side: user info / auth buttons */}
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <span className="font-medium text-gray-700">
              Welcome back, {name || "User"}
            </span>
            <button
              onClick={handleLogout} // <-- use handler
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <a
            href="/auth/login"
            className="px-3 py-1 bg-teal-500 text-white rounded hover:bg-teal-600"
          >
            Login
          </a>
        )}
      </div>
    </header>
  );
}
