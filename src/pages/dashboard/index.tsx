// import { useEffect, useState } from "react";
// import Layout from "@/components/Layout";
// import { useAuth } from "@/context/AuthContext";
// import { supabase } from "@/lib/supabaseClient";
// import { generateBiohackPDF } from "@/utils/pdfGenerator";
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
//             <li><a href="#" className="hover:text-teal-600">Reports</a></li>
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

//               <div className="flex justify-end mt-4">
//                 <button
//                   className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
//                   onClick={() => generateBiohackPDF(mockPDFData)}
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
        <aside className="w-64 bg-gray-100 p-6">
          <h2 className="text-xl font-bold mb-6">Dashboard</h2>
          <ul className="space-y-4">
            <li><a href="/dashboard/profile" className="hover:text-teal-600">Profile</a></li>
            <li><a href="/dashboard/wearable" className="hover:text-teal-600">Wearable</a></li>
            <li><a href="/dashboard/progress" className="hover:text-teal-600">Progress</a></li>
            <li><a href="#" className="hover:text-teal-600">Reports</a></li>
            <li><a href="/dashboard/coach" className="hover:text-teal-600">AI Coach</a></li>
            <li><a href="/dashboard/therapy" className="hover:text-teal-600">Therapy Gallery</a></li>
          </ul>
        </aside>

        <main className="flex-1 p-6">
          {loading ? (
            <p>Loading your data...</p>
          ) : (
            <>
              <h1 className="text-2xl font-bold mb-4">
                {getGreeting()}, {profile?.name || "User"}!
                </h1>

              <div className="flex justify-end mt-4">
                <button
                  className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
                  onClick={() => downloadPDF(mockPDFData)}
                >
                  Download My Plan
                </button>
              </div>
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
