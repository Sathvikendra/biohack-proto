import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabaseClient";

export default function Dashboard() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
    };

  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (error) console.log("Error fetching profile:", error.message);
      else setProfile(data);
      setLoading(false);
    };

    fetchProfile();
  }, [user]);

  if (!user) return <Layout title="Dashboard">Please log in to view the dashboard.</Layout>;

  return (
    <Layout title="Dashboard">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-100 p-6">
          <h2 className="text-xl font-bold mb-6">Dashboard</h2>
          <ul className="space-y-4">
            <li><a href="#" className="hover:text-teal-600">Profile</a></li>
            <li><a href="#" className="hover:text-teal-600">Week 1</a></li>
            <li><a href="#" className="hover:text-teal-600">Week 2</a></li>
            <li><a href="#" className="hover:text-teal-600">Reports</a></li>
          </ul>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6">
          {loading ? (
            <p>Loading your data...</p>
          ) : (
            <>
              <h1 className="text-2xl font-bold mb-4">
                {getGreeting()}, {profile?.name || "User"}!
                </h1>

              <section className="bg-white p-6 rounded-xl shadow mb-6">
                <h3 className="font-semibold mb-2">Your Info</h3>
                <p>Age: {profile?.age}</p>
                <p>Height: {profile?.height_cm} cm</p>
                <p>Weight: {profile?.weight_kg} kg</p>
                <p>Occupation: {profile?.occupation}</p>
              </section>

              <section className="bg-white p-6 rounded-xl shadow">
                <h3 className="font-semibold mb-2">Your Goals</h3>
                <ul className="list-disc ml-6">
                  {profile?.goal_weight_management && <li>Weight management</li>}
                  {profile?.goal_energy_performance && <li>Energy & performance</li>}
                  {profile?.goal_longevity && <li>Longevity & disease prevention</li>}
                  {profile?.goal_skin_beauty && <li>Skin & beauty</li>}
                </ul>
              </section>
            </>
          )}
        </main>
      </div>
    </Layout>
  );
}
