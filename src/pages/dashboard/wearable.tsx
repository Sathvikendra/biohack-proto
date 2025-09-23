// import { useState, useEffect } from "react";
// import Link from "next/link";
// import Layout from "@/components/Layout";
// import { useAuth } from "@/context/AuthContext";
// import { supabase } from "@/lib/supabaseClient";
// import { summarizeLifestyle } from "@/utils/sleep";
// import { estimateStress } from "@/utils/stress";
// import { summarizeGoals } from "@/utils/goals";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import toast from "react-hot-toast";

// export default function Wearable() {
//   const { user } = useAuth();
//   const [data, setData] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [insight, setInsight] = useState<string | null>(null);
//   const [insightLoading, setInsightLoading] = useState(false);

//   useEffect(() => {
//     if (!user) return;
//     const fetchLatest = async () => {
//       const { data: latest, error } = await supabase
//         .from("wearable_data")
//         .select("*")
//         .eq("user_id", user.id)
//         .order("timestamp", { ascending: false })
//         .limit(1)
//         .single();
//       if (!error && latest) {
//         setData(latest);
//         generateInsight(latest);
//       }
//       setLoading(false);
//     };
//     fetchLatest();
    
//   }, [user]);

//   const insertMockData = async () => {
//     if (!user) return;

//     const { data : profile }=await supabase.from("profiles").select("*").eq("user_id",user.id).single();

//     const mock = {
//       steps: Math.floor(Math.random() * 8000) + 2000,
//       heart_rate: Math.floor(Math.random() * 40) + 60,
//       sleep_duration: (Math.random() * 3 + 5).toFixed(1),
//       sleep_light: (Math.random() * 2 + 2).toFixed(1),
//       sleep_deep:  (Math.random() * 1 + 1).toFixed(1),
//       sleep_rem:   (Math.random() * 1 + 1).toFixed(1),
//       calories_burned: Math.floor(Math.random() * 500) + 150,
//       resting_hr: Math.floor(Math.random() * 20) + 50,
//       hrv: parseFloat((Math.random() * 50 + 20).toFixed(1)),
//       stress_level: "",
//       calories_consumed: Math.floor(Math.random() * 1000) + 1500,
//       water_intake_l: parseFloat((Math.random() * 1.5 + 1).toFixed(1)),
//       goal_weight_management: true,
//       goal_energy_performance: true,
//       goal_longevity: true,
//       goal_skin_beauty: true,
//       user_id: user.id,

//     };
//     mock.stress_level=estimateStress(mock.hrv);

//     setData(mock);
//     toast.success('Vitals updated')
//     setInsightLoading(true);

//     try {
//       const { error: wearableError } = await supabase.from("wearable_data").insert(mock);
//       if (wearableError) console.error("Error inserting wearable data:", wearableError);

//       const res = await fetch("/api/generate_insight", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ profile, wearable: mock, summary: summarizeLifestyle(mock), goals: summarizeGoals(mock) }),
//       });

//       const json = await res.json();
//       const aiText = json.insight || "Could not generate insight.";
//       setInsight(aiText);

//       if (aiText !== "Could not generate insight." && aiText !== "Error fetching insight.") {
//         const { error: insightError } = await supabase.from("ai_insights").insert([
//           {
//             user_id: user.id,
//             insight_text: aiText,
//             created_at: new Date().toISOString(),
//             updated_at: new Date().toISOString(),
//           },
//         ]);
//         if (insightError) console.error("Error inserting AI insight:", insightError);
//       }

//     } catch (err) {
//       console.error("Error generating insight:", err);
//       setInsight("Error fetching insight.");
//     } finally {
//       setInsightLoading(false);
//     }
//     toast.success('Check out our insights on your vitals')
//   };

//   const generateInsight = async (d: any) => {
//     setInsightLoading(true);
//     try {
//       const res = await fetch("/api/generate_insight", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(d),
//       });

//       const json = await res.json();
//       const aiText = json.insight || "Could not generate insight.";
//       setInsight(aiText);

//       if (aiText === "Could not generate insight." || aiText === "Error fetching insight.") {
//         toast.error('Please try again in sometime');
//         return;
//       }

//       const {
//         data: { user },
//         error: userError,
//       } = await supabase.auth.getUser();

//       if (userError || !user) {
//         console.error("User not found:", userError);
//         return;
//       }

//       const { error: insertError } = await supabase.from("ai_insights").insert([
//         {
//           user_id: user.id,
//           insight_text: aiText,
//           created_at: new Date().toISOString(),
//           updated_at: new Date().toISOString(),
//         },
//       ]);

//       if (insertError) console.error("Insert error:", insertError);

//     } catch (err) {
//       console.error("Error fetching insight:", err);
//       setInsight("Error fetching insight.");
//     } finally {
//       setInsightLoading(false);
//     }
//   };

//   if (!user) {
//     return <Layout title="Wearable">Please log in to view this page.</Layout>;
//   }

//   return (
//     <Layout title="Wearable Connection">
//       <div className="p-6 space-y-4">
//         <Link
//           href="/dashboard"
//           className="inline-block px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 text-sm"
//         >
//           ← Back to Dashboard
//         </Link>

//         <div className="flex items-center justify-between">
//           <h1 className="text-2xl font-bold">Wearable Integration</h1>
//           {data && (
//             <button
//               onClick={insertMockData}
//               className="ml-4 px-3 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 text-sm"
//             >
//               Reconnect
//             </button>
//           )}
//         </div>

//         {!data && (
//           <button
//             onClick={insertMockData}
//             className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
//           >
//             Connect / Sync Mock Device
//           </button>
//         )}

//         {loading && !data ? (
//           <p>Loading latest data…</p>
//         ) : data ? (
//           <>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//               <MetricCard label="Steps" value={data.steps} unit="" />
//               <MetricCard label="Heart Rate" value={data.heart_rate} unit="bpm" />
//               <MetricCard label="Sleep Duration" value={data.sleep_duration} unit="hrs" />
//               <MetricCard label="Stress Level" value={data.stress_level} unit="" />
//               <MetricCard label="Calories Consumed" value={data.calories_consumed} unit="kcal" />
//               <MetricCard label="Calories Burned" value={data.calories_burned} unit="kcal" />
//               <MetricCard label="Water Intake" value={data.water_intake_l} unit="L" />
              
//             </div>

//             <div className="mt-6 bg-white p-4 rounded-xl shadow">
//               <h3 className="text-gray-700 font-semibold mb-2">AI Insight</h3>
//               {insightLoading ? (
//                 <p>Generating insight…</p>
//               ) : (
//                 <div className="prose prose-sm text-gray-800">
//                   <ReactMarkdown remarkPlugins={[remarkGfm]}>
//                     {insight || "No insight yet."}
//                   </ReactMarkdown>
//                 </div>
//               )}
//             </div>
//           </>
//         ) : (
//           <p>No wearable data yet.</p>
//         )}
//       </div>
//     </Layout>
//   );
// }

// function MetricCard({
//   label,
//   value,
//   unit,
// }: {
//   label: string;
//   value: any;
//   unit: string;
// }) {
//   return (
//     <div className="bg-white p-4 rounded-xl shadow text-center">
//       <h3 className="text-gray-500 text-sm">{label}</h3>
//       <p className="text-2xl font-bold">
//         {value} {unit}
//       </p>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabaseClient";
import { summarizeLifestyle } from "@/utils/sleep";
import { estimateStress } from "@/utils/stress";
import { summarizeGoals } from "@/utils/goals";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import toast from "react-hot-toast";

export default function Wearable() {
  const { user } = useAuth();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [insight, setInsight] = useState<string | null>(null);
  const [insightLoading, setInsightLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    const fetchLatest = async () => {
      const { data: latest, error } = await supabase
        .from("wearable_data")
        .select("*")
        .eq("user_id", user.id)
        .order("timestamp", { ascending: false })
        .limit(1)
        .single();
      if (!error && latest) {
        setData(latest);
        generateInsight(latest);
      }
      setLoading(false);
    };
    fetchLatest();
  }, [user]);

  const insertMockData = async () => {
    if (!user) return;

    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user.id)
      .single();

    const mock = {
      steps: Math.floor(Math.random() * 8000) + 2000,
      heart_rate: Math.floor(Math.random() * 40) + 60,
      sleep_duration: (Math.random() * 3 + 5).toFixed(1),
      sleep_light: (Math.random() * 2 + 2).toFixed(1),
      sleep_deep: (Math.random() * 1 + 1).toFixed(1),
      sleep_rem: (Math.random() * 1 + 1).toFixed(1),
      calories_burned: Math.floor(Math.random() * 500) + 150,
      resting_hr: Math.floor(Math.random() * 20) + 50,
      hrv: parseFloat((Math.random() * 50 + 20).toFixed(1)),
      stress_level: "",
      calories_consumed: Math.floor(Math.random() * 1000) + 1500,
      water_intake_l: parseFloat((Math.random() * 1.5 + 1).toFixed(1)),
      goal_weight_management: true,
      goal_energy_performance: true,
      goal_longevity: true,
      goal_skin_beauty: true,
      user_id: user.id,
    };
    mock.stress_level = estimateStress(mock.hrv);

    setData(mock);
    toast.success("Vitals updated");
    setInsightLoading(true);

    try {
      // const { error: wearableError } = await supabase.from("wearable_data").insert(mock);
      // if (wearableError) console.error("Error inserting wearable data:", wearableError);
      const res = await fetch("/api/generate_insight", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profile,
          wearable: mock,
          summary: summarizeLifestyle(mock),
          goals: summarizeGoals(mock),
        }),
      });

      const json = await res.json();
      setInsight(json.insight || "Could not generate insight.");
      // const aiText = json.insight || "Could not generate insight."
      // if (aiText !== "Could not generate insight." && aiText !== "Error fetching insight.") {
      //   const { error: insightError } = await supabase.from("ai_insights").insert([
      //     {
      //       user_id: user.id,
      //       insight_text: aiText,
      //       created_at: new Date().toISOString(),
      //       updated_at: new Date().toISOString(),
      //     },
      //   ]);
      //   if (insightError) console.error("Error inserting AI insight:", insightError);
      // }

    } catch (err) {
      console.error("Error generating insight:", err);
      setInsight("Error fetching insight.");
    } finally {
      setInsightLoading(false);
    }
    toast.success("Check out our insights on your vitals");
  };

  const generateInsight = async (d: any) => {
    setInsightLoading(true);
    try {
      const res = await fetch("/api/generate_insight", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(d),
      });

      const json = await res.json();
      setInsight(json.insight || "Could not generate insight.");
    } catch (err) {
      console.error("Error fetching insight:", err);
      setInsight("Error fetching insight.");
    } finally {
      setInsightLoading(false);
    }
  };

  if (!user) {
    return <Layout title="Wearable">Please log in to view this page.</Layout>;
  }

  return (
    <Layout title="Wearable Connection">
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <Link
          href="/dashboard"
          className="inline-flex items-center px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
        >
          ← Back to Dashboard
        </Link>

        <div className="flex items-center justify-between border-b pb-3">
          <h1 className="text-3xl font-bold text-teal-700">
            Wearable Integration
          </h1>
          {data && (
            <button
              onClick={insertMockData}
              className="px-4 py-2 text-sm bg-teal-600 text-white rounded-lg shadow hover:bg-teal-700 transition"
            >
              Re-sync Device
            </button>
          )}
        </div>

        {!data && (
          <button
            onClick={insertMockData}
            className="px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-700 text-white rounded-xl shadow hover:opacity-90 transition"
          >
            Connect / Sync Mock Device
          </button>
        )}

        {loading && !data ? (
          <p>Loading latest data…</p>
        ) : data ? (
          <>
            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <MetricCard label="Steps" value={data.steps} unit="" />
              <MetricCard label="Heart Rate" value={data.heart_rate} unit="bpm" />
              <MetricCard
                label="Sleep Duration"
                value={data.sleep_duration}
                unit="hrs"
              />
              <MetricCard label="Stress Level" value={data.stress_level} unit="" />
              <MetricCard
                label="Calories Consumed"
                value={data.calories_consumed}
                unit="kcal"
              />
              <MetricCard
                label="Calories Burned"
                value={data.calories_burned}
                unit="kcal"
              />
              <MetricCard
                label="Water Intake"
                value={data.water_intake_l}
                unit="L"
              />
            </div>

            {/* Insight Section */}
            <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                AI Insight
              </h3>
              {insightLoading ? (
                <p className="text-gray-500">Generating insight…</p>
              ) : (
                <div className="prose prose-sm max-w-none text-gray-800">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {insight || "No insight yet."}
                  </ReactMarkdown>
                </div>
              )}
            </div>
          </>
        ) : (
          <p>No wearable data yet.</p>
        )}
      </div>
    </Layout>
  );
}

function MetricCard({
  label,
  value,
  unit,
}: {
  label: string;
  value: any;
  unit: string;
}) {
  return (
    <div className="bg-gradient-to-br from-white to-teal-50 border border-teal-100 rounded-xl p-5 shadow hover:shadow-md transition text-center">
      <h3 className="text-sm font-medium text-teal-700">{label}</h3>
      <p className="text-2xl md:text-3xl font-bold text-gray-900 mt-1">
        {value} <span className="text-base font-normal">{unit}</span>
      </p>
    </div>
  );
}
