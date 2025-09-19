import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "../context/AuthContext";

export default function DashboardHeader() {
  const { user, signOut, loading } = useAuth();
  const [name, setName] = useState<string | null>(null);
  const [loadingName, setLoadingName] = useState(true);

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

  return (
    <div className="flex items-center space-x-4">
      {user ? (
        <>
          <span className="font-medium text-gray-700">Welcome back, {name || "User"}</span>
          <button
            onClick={signOut}
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
  );
}
