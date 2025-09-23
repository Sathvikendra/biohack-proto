// import { useState, useEffect } from "react";
// import Layout from "@/components/Layout";
// import { supabase } from "@/lib/supabaseClient";
// import { useAuth } from "@/context/AuthContext";
// import { Line, Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import Link from "next/link";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// interface Profile {
//   name: string;
//   age: number;
//   gender: string;
//   height_cm: number;
//   weight_kg: number;
//   city: string;
//   state: string;
//   country: string;
//   [key: string]: any; // For other optional profile fields
// }

// interface WearableData {
//   date: string;
//   sleep_hours: number;
//   steps: number;
//   stress_level: number;
//   water_l: number;
//   [key: string]: any;
// }

// interface AIInsights {
//   sleep_suggestion: string;
//   activity_suggestion: string;
//   stress_suggestion: string;
//   hydration_suggestion: string;
// }

// export default function WeeklyInsights() {
//   const { user } = useAuth();
//   const [profile, setProfile] = useState<Profile | null>(null);
//   const [wearableData, setWearableData] = useState<WearableData[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [aiInsights, setAiInsights] = useState<AIInsights | null>(null);

//   useEffect(() => {
//     if (!user) return;

//     const fetchData = async () => {
//       try {
//         // Fetch profile
//         const { data: profileData } = await supabase
//           .from("profiles")
//           .select("*")
//           .eq("user_id", user.id)
//           .single();
//         setProfile(profileData as Profile);

//         // Fetch last 7 days wearable data
//         const { data: wearable } = await supabase
//           .from("wearable_data")
//           .select("*")
//           .eq("user_id", user.id)
//           .order("date", { ascending: true })
//           .limit(7);

//         setWearableData((wearable as WearableData[]) || []);

//         // Mock AI insights
//         const insights = generateMockAIInsights(
//           profileData as Profile,
//           wearable as WearableData[] || []
//         );
//         setAiInsights(insights);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [user]);

//   if (!user)
//     return <Layout title="Weekly Insights">Please log in to view insights.</Layout>;
//   if (loading) return <Layout title="Weekly Insights">Loading…</Layout>;

//   const sleepChart = {
//     labels: wearableData.map((d) => d.date),
//     datasets: [
//       {
//         label: "Sleep Duration (hrs)",
//         data: wearableData.map((d) => d.sleep_hours),
//         backgroundColor: "rgba(75,192,192,0.5)",
//       },
//     ],
//   };

//   const stepsChart = {
//     labels: wearableData.map((d) => d.date),
//     datasets: [
//       {
//         label: "Steps",
//         data: wearableData.map((d) => d.steps),
//         backgroundColor: "rgba(53,162,235,0.5)",
//       },
//     ],
//   };

//   const stressChart = {
//     labels: wearableData.map((d) => d.date),
//     datasets: [
//       {
//         label: "Stress Level",
//         data: wearableData.map((d) => d.stress_level),
//         backgroundColor: "rgba(255,99,132,0.5)",
//       },
//     ],
//   };

//   const waterChart = {
//     labels: wearableData.map((d) => d.date),
//     datasets: [
//       {
//         label: "Water Intake (L)",
//         data: wearableData.map((d) => d.water_l),
//         backgroundColor: "rgba(54, 162, 235, 0.5)",
//       },
//     ],
//   };

//   return (
//     <Layout title="Weekly Insights">
//       <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow space-y-6">
//         <Link
//           href="/dashboard"
//           className="inline-block px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 text-sm"
//         >
//           ← Back to Dashboard
//         </Link>
//         <h1 className="text-2xl font-bold text-center sticky top-0 bg-white py-4 z-10">
//           Weekly Insights
//         </h1>

//         <section>
//           <h2 className="text-xl font-semibold mb-2">Sleep Patterns</h2>
//           <Bar data={sleepChart} />
//         </section>

//         <section>
//           <h2 className="text-xl font-semibold mb-2">Activity</h2>
//           <Bar data={stepsChart} />
//         </section>

//         <section>
//           <h2 className="text-xl font-semibold mb-2">Stress Levels</h2>
//           <Bar data={stressChart} />
//         </section>

//         <section>
//           <h2 className="text-xl font-semibold mb-2">Hydration</h2>
//           <Bar data={waterChart} />
//         </section>

//         <section>
//           <h2 className="text-xl font-semibold mb-2">AI Recommendations</h2>
//           {aiInsights ? (
//             <ul className="list-disc pl-6 space-y-2">
//               {Object.entries(aiInsights).map(([key, value]) => (
//                 <li key={key}>
//                   <strong>{key.replace(/_/g, " ")}:</strong> {value}
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>No AI insights available.</p>
//           )}
//         </section>
//       </div>
//     </Layout>
//   );
// }

// function generateMockAIInsights(profile: Profile, wearableData: WearableData[]): AIInsights | null {
//   if (!profile || wearableData.length === 0) return null;

//   const avgSleep =
//     wearableData.reduce((acc, d) => acc + (d.sleep_hours || 0), 0) / wearableData.length;
//   const avgSteps =
//     wearableData.reduce((acc, d) => acc + (d.steps || 0), 0) / wearableData.length;
//   const avgStress =
//     wearableData.reduce((acc, d) => acc + (d.stress_level || 0), 0) / wearableData.length;
//   const avgWater =
//     wearableData.reduce((acc, d) => acc + (d.water_l || 0), 0) / wearableData.length;

//   return {
//     sleep_suggestion: avgSleep < 7 ? "Try to sleep at least 7 hrs/night" : "Great sleep consistency",
//     activity_suggestion: avgSteps < 10000 ? "Increase steps to 10k/day" : "Good activity levels",
//     stress_suggestion: avgStress > 5 ? "Consider meditation or stress relief exercises" : "Stress levels are normal",
//     hydration_suggestion: avgWater < 2 ? "Drink at least 2L water/day" : "Hydration is adequate",
//   };
// }

import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Link from "next/link";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface WearableData {
  date: string;
  sleep_hours: number;
  steps: number;
  stress_level: number;
  water_l: number;
}

interface AIInsights {
  sleep_suggestion: string;
  activity_suggestion: string;
  stress_suggestion: string;
  hydration_suggestion: string;
}

export default function WeeklyInsightsTabs() {
  const [wearableData, setWearableData] = useState<WearableData[]>([]);
  const [aiInsights, setAiInsights] = useState<AIInsights | null>(null);
  const [selectedSection, setSelectedSection] = useState<string>("Sleep");

  useEffect(() => {
    const today = new Date();
    const mockData: WearableData[] = Array.from({ length: 7 }).map((_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() - (6 - i));
      return {
        date: date.toISOString().split("T")[0],
        sleep_hours: Math.round(5 + Math.random() * 4),
        steps: Math.round(5000 + Math.random() * 8000),
        stress_level: Math.round(1 + Math.random() * 9),
        water_l: parseFloat((1 + Math.random() * 2).toFixed(1)),
      };
    });
    setWearableData(mockData);
    toast.success("Progress updated for past 7 days");
    setAiInsights(generateMockAIInsights(mockData));
  }, []);

  const charts = {
    Sleep: {
      labels: wearableData.map((d) => d.date),
      datasets: [
        {
          label: "Sleep Duration (hrs)",
          data: wearableData.map((d) => d.sleep_hours),
          backgroundColor: "#3b82f6", // Tailwind blue-500
          borderRadius: 6,
        },
      ],
    },
    Activity: {
      labels: wearableData.map((d) => d.date),
      datasets: [
        {
          label: "Steps",
          data: wearableData.map((d) => d.steps),
          backgroundColor: "#10b981", // Tailwind green-500
          borderRadius: 6,
        },
      ],
    },
    Stress: {
      labels: wearableData.map((d) => d.date),
      datasets: [
        {
          label: "Stress Level",
          data: wearableData.map((d) => d.stress_level),
          backgroundColor: "#ef4444", // Tailwind red-500
          borderRadius: 6,
        },
      ],
    },
    Hydration: {
      labels: wearableData.map((d) => d.date),
      datasets: [
        {
          label: "Water Intake (L)",
          data: wearableData.map((d) => d.water_l),
          backgroundColor: "#f59e0b", // Tailwind yellow-500
          borderRadius: 6,
        },
      ],
    },
  };

  return (
    <Layout title="Weekly Insights">
      <div className="max-w-6xl mx-auto mt-6">
        <Link
          href="/dashboard"
          className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
        >
          ← Back to Dashboard
        </Link>

        <motion.div
          className="flex mt-6 bg-white rounded-2xl shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Sidebar */}
          <div className="w-48 border-r bg-gray-50">
            <h2 className="text-xl font-bold p-4 border-b text-gray-800">Conditions</h2>
            {Object.keys(charts).map((section) => (
              <button
                key={section}
                onClick={() => setSelectedSection(section)}
                className={`block w-full text-left px-4 py-3 transition hover:bg-gray-100 ${
                  selectedSection === section
                    ? "bg-teal-100 font-semibold border-l-4 border-teal-500"
                    : "text-gray-700"
                }`}
              >
                {section}
              </button>
            ))}
            <button
              onClick={() => setSelectedSection("AI Recommendations")}
              className={`block w-full text-left px-4 py-3 transition hover:bg-gray-100 ${
                selectedSection === "AI Recommendations"
                  ? "bg-teal-100 font-semibold border-l-4 border-teal-500"
                  : "text-gray-700"
              }`}
            >
              AI Recommendations
            </button>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6">
            <h1 className="text-2xl font-bold mb-4 text-teal-600">{selectedSection}</h1>

            {selectedSection === "AI Recommendations" ? (
              <motion.ul
                key="ai"
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {aiInsights
                  ? Object.entries(aiInsights).map(([key, value]) => (
                      <li
                        key={key}
                        className="bg-teal-50 p-4 rounded-lg shadow hover:shadow-md transition"
                      >
                        <strong className="capitalize">{key.replace(/_/g, " ")}:</strong> {value}
                      </li>
                    ))
                  : "No AI insights available."}
              </motion.ul>
            ) : (
              <motion.div
                key={selectedSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Bar
                  data={charts[selectedSection as keyof typeof charts]}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { position: "top" },
                      title: { display: true, text: selectedSection, font: { size: 18 } },
                    },
                  }}
                />
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}

// Mock AI insights generator
function generateMockAIInsights(wearableData: WearableData[]): AIInsights {
  const avgSleep =
    wearableData.reduce((acc, d) => acc + d.sleep_hours, 0) / wearableData.length;
  const avgSteps =
    wearableData.reduce((acc, d) => acc + d.steps, 0) / wearableData.length;
  const avgStress =
    wearableData.reduce((acc, d) => acc + d.stress_level, 0) / wearableData.length;
  const avgWater =
    wearableData.reduce((acc, d) => acc + d.water_l, 0) / wearableData.length;

  return {
    sleep_suggestion: avgSleep < 7 ? "Try to sleep at least 7 hrs/night" : "Great sleep consistency",
    activity_suggestion: avgSteps < 10000 ? "Increase steps to 10k/day" : "Good activity levels",
    stress_suggestion: avgStress > 5 ? "Consider meditation or stress relief exercises" : "Stress levels are normal",
    hydration_suggestion: avgWater < 2 ? "Drink at least 2L water/day" : "Hydration is adequate",
  };
}
