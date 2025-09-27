// import { useEffect, useState } from "react";
// import Layout from "@/components/Layout";
// import { useAuth } from "@/context/AuthContext";
// import { supabase } from "@/lib/supabaseClient";
// import { downloadPDF } from "@/utils/pdfGenerator";
// import { therapies } from "@/utils/therapies";

// export default function Dashboard() {
//   const { user } = useAuth();
//   const [profile, setProfile] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const getGreeting = () => {
//     const hour = new Date().getHours();
//     if (hour < 12) return "Good morning";
//     if (hour < 17) return "Good afternoon";
//     return "Good evening";
//     };

//   const mockPDFData = {
//     profile: { age: 28, gender: "Male", goal: "Increase Fitness" },
//     wearable: {
//       steps: 12000,
//       calories_burned: 2500,
//       sleep_duration: 7.5,
//       resting_heart_rate: 60,
//       hrv: 72,
//       stress_level: 3,
//       water_intake: 2.5,
//       calories_consumed: 2200,
//     },
//     aiRecommendations: [
//       "Sleep 7-8 hours nightly",
//       "Include strength training 3x/week",
//       "Drink at least 2.5L water daily",
//     ],
//     selectedTherapies: therapies.slice(0, 5),
//   };

//   useEffect(() => {
//     if (!user) return;

//     const fetchProfile = async () => {
//       setLoading(true);
//       const { data, error } = await supabase
//         .from("profiles")
//         .select("*")
//         .eq("user_id", user.id)
//         .single();

//       if (error) console.log("Error fetching profile:", error.message);
//       else setProfile(data);
//       setLoading(false);
//     };

//     fetchProfile();
//   }, [user]);

//   if (!user) return <Layout title="Dashboard">Please log in to view the dashboard.</Layout>;

//   return (
//     <Layout title="Dashboard">
//       <div className="flex min-h-screen">
//         <aside className="w-64 bg-gray-100 p-6">
//           <h2 className="text-xl font-bold mb-6">Dashboard</h2>
//           <ul className="space-y-4">
//             <li><a href="/dashboard/profile" className="hover:text-teal-600">Profile</a></li>
//             <li><a href="/dashboard/wearable" className="hover:text-teal-600">Wearable</a></li>
//             <li><a href="/dashboard/progress" className="hover:text-teal-600">Progress</a></li>
//             <li><a href="/dashboard/reports" className="hover:text-teal-600">Reports</a></li>
//             <li><a href="/dashboard/coach" className="hover:text-teal-600">AI Coach</a></li>
//             <li><a href="/dashboard/therapy" className="hover:text-teal-600">Therapy Gallery</a></li>
//           </ul>
//         </aside>

//         <main className="flex-1 p-6">
//           {loading ? (
//             <p>Loading your data...</p>
//           ) : (
//             <>
//               <h1 className="text-2xl font-bold mb-4">
//                 {getGreeting()}, {profile?.name || "User"}!
//                 </h1>

//               <div className="flex justify-end shadow mt-4">
//                 <button
//                   className="bg-teal-600 text-white px-4 py-1 rounded hover:bg-teal-700"
//                   onClick={() => downloadPDF(mockPDFData)}
//                 >
//                   Download My Plan
//                 </button>
//               </div>
              
//               <section className="bg-white p-6 rounded-xl shadow mb-6">
//                 <h3 className="font-semibold mb-2">Your Info</h3>
//                 <p>Age: {profile?.age}</p>
//                 <p>Height: {profile?.height_cm} cm</p>
//                 <p>Weight: {profile?.weight_kg} kg</p>
//                 <p>Occupation: {profile?.occupation}</p>
//               </section>

//               <section className="bg-white p-6 rounded-xl shadow">
//                 <h3 className="font-semibold mb-2">Your Goals</h3>
//                 <ul className="list-disc ml-6">
//                   {profile?.goal_weight_management && <li>Weight management</li>}
//                   {profile?.goal_energy_performance && <li>Energy & performance</li>}
//                   {profile?.goal_longevity && <li>Longevity & disease prevention</li>}
//                   {profile?.goal_skin_beauty && <li>Skin & beauty</li>}
//                 </ul>
//               </section>
//             </>
//           )}
//         </main>
//       </div>
//     </Layout>
//   );
// }

import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabaseClient";
import { downloadPDF } from "@/utils/pdfGenerator";
import { therapies } from "@/utils/therapies";
import { User } from "lucide-react";
import BioScoreModal from "@/components/bioscoreModal";
// import { calculateBioScore } from "@/utils/bioscore";

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

  const mockPDFData = {
    profile: { age: 28, gender: "Male", goal: "Increase Fitness" },
    wearable: {
      steps: 12000,
      calories_burned: 2500,
      sleep_duration: 7.5,
      resting_heart_rate: 60,
      hrv: 72,
      stress_level: 3,
      water_intake: 2.5,
      calories_consumed: 2200,
    },
    aiRecommendations: [
      "Sleep 7-8 hours nightly",
      "Include strength training 3x/week",
      "Drink at least 2.5L water daily",
    ],
    selectedTherapies: therapies.slice(0, 5),
  };

  // const bioScore = calculateBioScore(user);

  useEffect(() => {
    if (!user) return;
    const fetchProfile = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();
      if (!error) setProfile(data);
      setLoading(false);
    };
    fetchProfile();
  }, [user]);

  if (!user) {
    return (
      <Layout title="Dashboard">
        <div className="flex items-center justify-center h-screen text-gray-600">
          Please log in to view the dashboard.
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Dashboard">
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <aside className="w-64 bg-gradient-to-b from-teal-700 to-teal-800 text-white p-6">
          <h2 className="text-2xl font-bold mb-8 tracking-wide">Dashboard</h2>
          <nav>
            <ul className="space-y-4">
              {[
                ["Profile", "/dashboard/profile"],
                ["Wearable", "/dashboard/wearable"],
                ["Progress", "/dashboard/progress"],
                ["Reports", "/dashboard/reports"],
                ["AI Coach", "/dashboard/coach"],
                ["Therapy Gallery", "/dashboard/therapy"],
              ].map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    className="block rounded-md px-3 py-2 hover:bg-teal-600 transition"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 space-y-8">
          {loading ? (
            <p className="text-gray-600">Loading your data…</p>
          ) : (
            <>
              {/* Welcome Card */}
              <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-700 via-teal-600 to-teal-500 p-8 text-white shadow-xl">
                {/* Decorative background blur */}
                <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
                <div className="absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-teal-400/20 blur-3xl" />

                {/* Content */}
                <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  {/* Avatar */}
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/25 text-4xl font-bold shadow-inner backdrop-blur-md border border-white/30">
                    {profile?.name?.charAt(0) || <User size={32} />}
                  </div>

                  {/* Greeting + subtitle */}
                  <div className="flex-1 text-center sm:text-left">
                    <h1 className="text-3xl font-extrabold tracking-tight drop-shadow-sm">
                      {getGreeting()}, {profile?.name || "Explorer"}!
                    </h1>
                    <p className="mt-1 text-teal-100 text-lg">
                      Here’s a snapshot of your biohacking journey.
                    </p>

                    {/* Action buttons */}
                    <div className="mt-5 flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
                      <BioScoreModal profile={profile} />
                      <button
                        onClick={() => downloadPDF(mockPDFData)}
                        className="px-5 py-2 rounded-lg font-medium bg-white text-teal-700 hover:bg-teal-50 shadow-md transition transform hover:scale-105 active:scale-95"
                      >
                        Download My Plan
                      </button>
                    </div>
                  </div>
                </div>
              </section>
              {/* Info + Goals Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <section className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
                  <h3 className="font-semibold text-gray-700 mb-4 text-lg border-b pb-2">
                    Your Info
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>Age: {profile?.age}</li>
                    <li>Height: {profile?.height_cm} cm</li>
                    <li>Weight: {profile?.weight_kg} kg</li>
                    <li>Occupation: {profile?.occupation}</li>
                  </ul>
                </section>

                <section className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
                  <h3 className="font-semibold text-gray-700 mb-4 text-lg border-b pb-2">
                    Your Goals
                  </h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    {profile?.goal_weight_management && <li>Weight management</li>}
                    {profile?.goal_energy_performance && <li>Energy & performance</li>}
                    {profile?.goal_longevity && <li>Longevity & disease prevention</li>}
                    {profile?.goal_skin_beauty && <li>Skin & beauty</li>}
                  </ul>
                </section>
              </div>
            </>
          )}
        </main>
      </div>
    </Layout>
  );
}
