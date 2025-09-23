// import { useState, useEffect } from "react";
// import Layout from "@/components/Layout";
// import ProgressBar from "@/components/ProgressBar";
// import { supabase } from "@/lib/supabaseClient";
// import { useAuth } from "@/context/AuthContext";
// import { summarizeGoals } from "@/utils/sleep";
// import Link from "next/link";
// import toast from "react-hot-toast";

// const steps = [
//   "Personal",
//   "Habits",
//   "Physical Activity",
//   "Nutrition",
//   "Stress",
//   "Sleep",
//   "Medical",
//   "Goals",
// ];

// export default function ProfilePage() {
//   const { user } = useAuth();
//   const [profile, setProfile] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [step, setStep] = useState(0);

//   useEffect(() => {
//     if (!user) return;

//     const fetchProfile = async () => {
//       const { data, error } = await supabase
//         .from("profiles")
//         .select("*")
//         .eq("user_id", user.id)
//         .single();

//       if (error) {
//         console.error("Error fetching profile:", error);
//         toast.error('Please try again');
//       } else {
//         setProfile(data);
//         // toast.success('Your profile is updated');
//       }setLoading(false);
//     };

//     fetchProfile();
//   }, [user]);

//   const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
//   const prev = () => setStep((s) => Math.max(s - 1, 0));

//   const renderStep = () => {
//     if (!profile) return null;

//     switch (step) {
//       case 0:
//         return (
//           <>
//             <p><strong>Name:</strong> {profile.name || "-"}</p>
//             <p><strong>Age:</strong> {profile.age || "-"}</p>
//             <p><strong>Gender:</strong> {profile.gender || "-"}</p>
//             <p><strong>Height:</strong> {profile.height_cm || "-"} cm</p>
//             <p><strong>Weight:</strong> {profile.weight_kg || "-"} kg</p>
//             <p><strong>Location:</strong> {profile.city || "-"}, {profile.state || "-"}, {profile.country || "-"}</p>
//             <p><strong>Occupation:</strong> {profile.occupation || "-"}</p>
//             <p><strong>Work Hours:</strong> {profile.work_hours_per_week || "-"} hrs/week</p>
//             <p><strong>Marital Status:</strong> {profile.marital_status || "-"}</p>
//           </>
//         );
//       case 1:
//         return (
//           <>
//             <p><strong>Smoking:</strong> {profile.smoking ? "Yes" : "No"}</p>
//             <p><strong>Alcohol:</strong> {profile.alcohol ? "Yes" : "No"}</p>
//             <p><strong>Caffeine Intake:</strong> {profile.caffeine_intake || "-"} cups/day</p>
//           </>
//         );
//       case 2:
//         return (
//           <>
//             <p><strong>Exercise Frequency:</strong> {profile.exercise_frequency || "-"}</p>
//             <p><strong>Exercise Type:</strong> {profile.exercise_type || "-"}</p>
//             <p><strong>Avg Steps per day:</strong> {profile.avg_steps_per_day || "-"} steps</p>
//           </>
//         );
//       case 3:
//         return (
//           <>
//             <p><strong>Daily Meals:</strong> {profile.daily_meals || "-"}</p>
//             <p><strong>Diet Type:</strong> {profile.diet_type || "-"}</p>
//             <p><strong>Fruit/Veg Servings:</strong> {profile.fruit_veg_servings || "-"}</p>
//             <p><strong>Daily Water Intake:</strong> {profile.daily_water_intake_l || "-"} L</p>
//             <p><strong>Food Allergies:</strong> {profile.food_allergies || "-"}</p>
//           </>
//         );
//       case 4:
//         return (
//           <>
//             <p><strong>Stress Level:</strong> {profile.stress_level || "-"}</p>
//             <p><strong>Screen Time:</strong> {profile.screen_time_hours || "-"} hrs</p>
//             <p><strong>Meditation:</strong> {profile.meditation ? "Yes" : "No"}</p>
//           </>
//         );
//       case 5:
//         return (
//           <>
//             <p><strong>Weekday:</strong> {profile.weekday_wakeup || "-"} → {profile.weekday_bedtime || "-"}</p>
//             <p><strong>Weekend:</strong> {profile.weekend_wakeup || "-"} → {profile.weekend_bedtime || "-"}</p>
//             <p><strong>Sleep Duration:</strong> {profile.sleep_duration_hours || "-"} hrs</p>
//             <p><strong>Sleep Quality:</strong> {profile.sleep_quality || "-"}</p>
//             <p><strong>Napping Habits:</strong> {profile.napping_habits || "-"}</p>
//             <p><strong>Sleep Aids:</strong> {profile.sleep_aids || "-"}</p>
//           </>
//         );
//       case 6:
//         return (
//           <>
//             <p><strong>Medical Conditions:</strong> {profile.medical_conditions || "-"}</p>
//             <p><strong>Surgeries/Injuries:</strong> {profile.surgeries_injuries || "-"}</p>
//             <p><strong>Medications/Supplements:</strong> {profile.medications_supplements || "-"}</p>
//             <p><strong>Allergies:</strong> {profile.allergies || "-"}</p>
//             <p><strong>Family History:</strong> {profile.family_history || "-"}</p>
//           </>
//         );
//       case 7:
//         return (
//           <>
//             <p><strong>Weight Management:</strong> {profile.goal_weight_management ? "Yes" : "No"}</p>
//             <p><strong>Energy & Performance:</strong> {profile.goal_energy_performance ? "Yes" : "No"}</p>
//             <p><strong>Longevity & Disease Prevention:</strong> {profile.goal_longevity ? "Yes" : "No"}</p>
//             <p><strong>Skin & Beauty:</strong> {profile.goal_skin_beauty ? "Yes" : "No"}</p>
//           </>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <Layout title="Profile">
      
//       <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow">
//         <div className="flex justify-between items-center mb-4">
//           <Link href="/dashboard" className="text-sm px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">← Dashboard</Link>
//           <Link href={{ pathname: "/profile/setup", query: { edit: "true" } }}>
//             <button className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700">Edit</button>
//           </Link>
//         </div>

//         <h2 className="text-xl font-bold mb-2">{steps[step]}</h2>
//         <ProgressBar step={step + 1} total={steps.length} />

//         <div className="space-y-2 mt-4">{renderStep()}</div>

//         <div className="flex justify-between mt-6">
//           {step > 0 && (
//             <button
//               onClick={prev}
//               className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 text-xl font-bold"
//               aria-label="Previous Step"
//             >
//               ←
//             </button>
//           )}
          
//           {step < steps.length - 1 && (
//             <button
//               onClick={next}
//               className="w-10 h-10 flex items-center justify-center bg-teal-600 text-white rounded-full hover:bg-teal-700 text-xl font-bold ml-auto"
//               aria-label="Next Step"
//             >
//               →
//             </button>
//           )}
//         </div>
//       </div>
//     </Layout>
//   );
// }

import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import ProgressBar from "@/components/ProgressBar";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const steps = [
  "Personal",
  "Habits",
  "Physical Activity",
  "Nutrition",
  "Stress",
  "Sleep",
  "Medical",
  "Goals",
];

export default function ProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        toast.error("Please try again");
      } else {
        setProfile(data);
      }
      setLoading(false);
    };

    fetchProfile();
  }, [user]);

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const field = (label: string, value: any) => (
    <div className="flex justify-between items-center py-1 border-b border-gray-100">
      <span className="font-medium text-gray-700">{label}:</span>
      <span className="text-gray-600">{value || "-"}</span>
    </div>
  );

  const renderStep = () => {
    if (!profile) return null;
    switch (step) {
      case 0:
        return (
          <>
            {field("Name", profile.name)}
            {field("Age", profile.age)}
            {field("Gender", profile.gender)}
            {field("Height", `${profile.height_cm || "-"} cm`)}
            {field("Weight", `${profile.weight_kg || "-"} kg`)}
            {field("Location", `${profile.city || "-"}, ${profile.state || "-"}, ${profile.country || "-"}`)}
            {field("Occupation", profile.occupation)}
            {field("Work Hours", `${profile.work_hours_per_week || "-"} hrs/week`)}
            {field("Marital Status", profile.marital_status)}
          </>
        );
      case 1:
        return (
          <>
            {field("Smoking", profile.smoking ? "Yes" : "No")}
            {field("Alcohol", profile.alcohol ? "Yes" : "No")}
            {field("Caffeine Intake", `${profile.caffeine_intake || "-"} cups/day`)}
          </>
        );
      case 2:
        return (
          <>
            {field("Exercise Frequency", profile.exercise_frequency)}
            {field("Exercise Type", profile.exercise_type)}
            {field("Avg Steps per Day", `${profile.avg_steps_per_day || "-"} steps`)}
          </>
        );
      case 3:
        return (
          <>
            {field("Daily Meals", profile.daily_meals)}
            {field("Diet Type", profile.diet_type)}
            {field("Fruit/Veg Servings", profile.fruit_veg_servings)}
            {field("Daily Water Intake", `${profile.daily_water_intake_l || "-"} L`)}
            {field("Food Allergies", profile.food_allergies)}
          </>
        );
      case 4:
        return (
          <>
            {field("Stress Level", profile.stress_level)}
            {field("Screen Time", `${profile.screen_time_hours || "-"} hrs`)}
            {field("Meditation", profile.meditation ? "Yes" : "No")}
          </>
        );
      case 5:
        return (
          <>
            {field("Weekday Sleep", `${profile.weekday_wakeup || "-"} → ${profile.weekday_bedtime || "-"}`)}
            {field("Weekend Sleep", `${profile.weekend_wakeup || "-"} → ${profile.weekend_bedtime || "-"}`)}
            {field("Sleep Duration", `${profile.sleep_duration_hours || "-"} hrs`)}
            {field("Sleep Quality", profile.sleep_quality)}
            {field("Napping Habits", profile.napping_habits)}
            {field("Sleep Aids", profile.sleep_aids)}
          </>
        );
      case 6:
        return (
          <>
            {field("Medical Conditions", profile.medical_conditions)}
            {field("Surgeries/Injuries", profile.surgeries_injuries)}
            {field("Medications/Supplements", profile.medications_supplements)}
            {field("Allergies", profile.allergies)}
            {field("Family History", profile.family_history)}
          </>
        );
      case 7:
        return (
          <>
            {field("Weight Management", profile.goal_weight_management ? "Yes" : "No")}
            {field("Energy & Performance", profile.goal_energy_performance ? "Yes" : "No")}
            {field("Longevity & Disease Prevention", profile.goal_longevity ? "Yes" : "No")}
            {field("Skin & Beauty", profile.goal_skin_beauty ? "Yes" : "No")}
          </>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <Layout title="Profile">
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Loading profile…</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Profile">
      <motion.div
        className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex justify-between items-center mb-6">
          <Link
            href="/dashboard"
            className="text-sm px-3 py-1 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
          >
            ← Dashboard
          </Link>
          <Link href={{ pathname: "/profile/setup", query: { edit: "true" } }}>
            <button className="px-4 py-2 bg-teal-600 text-white rounded-lg shadow hover:bg-teal-700 transition">
              Edit
            </button>
          </Link>
        </div>

        <h2 className="text-2xl font-bold text-teal-700 mb-4">{steps[step]}</h2>
        <ProgressBar step={step + 1} total={steps.length} />

        <motion.div
          key={step}
          className="space-y-2 mt-6"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderStep()}
        </motion.div>

        <div className="flex justify-between mt-8">
          {step > 0 && (
            <button
              onClick={prev}
              className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 text-xl font-bold transition"
              aria-label="Previous Step"
            >
              ←
            </button>
          )}

          {step < steps.length - 1 && (
            <button
              onClick={next}
              className="w-10 h-10 flex items-center justify-center bg-teal-600 text-white rounded-full hover:bg-teal-700 text-xl font-bold ml-auto transition"
              aria-label="Next Step"
            >
              →
            </button>
          )}
        </div>
      </motion.div>
    </Layout>
  );
}
