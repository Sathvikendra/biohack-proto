import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import ProgressBar from "@/components/ProgressBar";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/context/AuthContext";
import { summarizeGoals } from "@/utils/sleep";
import Link from "next/link";

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

      if (error) console.error("Error fetching profile:", error);
      else setProfile(data);

      setLoading(false);
    };

    fetchProfile();
  }, [user]);

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const renderStep = () => {
    if (!profile) return null;

    switch (step) {
      case 0:
        return (
          <>
            <p><strong>Name:</strong> {profile.name || "-"}</p>
            <p><strong>Age:</strong> {profile.age || "-"}</p>
            <p><strong>Gender:</strong> {profile.gender || "-"}</p>
            <p><strong>Height:</strong> {profile.height_cm || "-"} cm</p>
            <p><strong>Weight:</strong> {profile.weight_kg || "-"} kg</p>
            <p><strong>Location:</strong> {profile.city || "-"}, {profile.state || "-"}, {profile.country || "-"}</p>
            <p><strong>Occupation:</strong> {profile.occupation || "-"}</p>
            <p><strong>Work Hours:</strong> {profile.work_hours_per_week || "-"} hrs/week</p>
            <p><strong>Marital Status:</strong> {profile.marital_status || "-"}</p>
          </>
        );
      case 1:
        return (
          <>
            <p><strong>Smoking:</strong> {profile.smoking ? "Yes" : "No"}</p>
            <p><strong>Alcohol:</strong> {profile.alcohol ? "Yes" : "No"}</p>
            <p><strong>Caffeine Intake:</strong> {profile.caffeine_intake || "-"} cups/day</p>
          </>
        );
      case 2:
        return (
          <>
            <p><strong>Exercise Frequency:</strong> {profile.exercise_frequency || "-"}</p>
            <p><strong>Exercise Type:</strong> {profile.exercise_type || "-"}</p>
            <p><strong>Avg Steps per day:</strong> {profile.avg_steps_per_day || "-"} steps</p>
          </>
        );
      case 3:
        return (
          <>
            <p><strong>Daily Meals:</strong> {profile.daily_meals || "-"}</p>
            <p><strong>Diet Type:</strong> {profile.diet_type || "-"}</p>
            <p><strong>Fruit/Veg Servings:</strong> {profile.fruit_veg_servings || "-"}</p>
            <p><strong>Daily Water Intake:</strong> {profile.daily_water_intake_l || "-"} L</p>
            <p><strong>Food Allergies:</strong> {profile.food_allergies || "-"}</p>
          </>
        );
      case 4:
        return (
          <>
            <p><strong>Stress Level:</strong> {profile.stress_level || "-"}</p>
            <p><strong>Screen Time:</strong> {profile.screen_time_hours || "-"} hrs</p>
            <p><strong>Meditation:</strong> {profile.meditation ? "Yes" : "No"}</p>
          </>
        );
      case 5:
        return (
          <>
            <p><strong>Weekday:</strong> {profile.weekday_wakeup || "-"} → {profile.weekday_bedtime || "-"}</p>
            <p><strong>Weekend:</strong> {profile.weekend_wakeup || "-"} → {profile.weekend_bedtime || "-"}</p>
            <p><strong>Sleep Duration:</strong> {profile.sleep_duration_hours || "-"} hrs</p>
            <p><strong>Sleep Quality:</strong> {profile.sleep_quality || "-"}</p>
            <p><strong>Napping Habits:</strong> {profile.napping_habits || "-"}</p>
            <p><strong>Sleep Aids:</strong> {profile.sleep_aids || "-"}</p>
          </>
        );
      case 6:
        return (
          <>
            <p><strong>Medical Conditions:</strong> {profile.medical_conditions || "-"}</p>
            <p><strong>Surgeries/Injuries:</strong> {profile.surgeries_injuries || "-"}</p>
            <p><strong>Medications/Supplements:</strong> {profile.medications_supplements || "-"}</p>
            <p><strong>Allergies:</strong> {profile.allergies || "-"}</p>
            <p><strong>Family History:</strong> {profile.family_history || "-"}</p>
          </>
        );
      case 7:
        return (
          <>
            <p><strong>Weight Management:</strong> {profile.goal_weight_management ? "Yes" : "No"}</p>
            <p><strong>Energy & Performance:</strong> {profile.goal_energy_performance ? "Yes" : "No"}</p>
            <p><strong>Longevity & Disease Prevention:</strong> {profile.goal_longevity ? "Yes" : "No"}</p>
            <p><strong>Skin & Beauty:</strong> {profile.goal_skin_beauty ? "Yes" : "No"}</p>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Layout title="Profile">
      
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow">
        <div className="flex justify-between items-center mb-4">
          <Link href="/dashboard" className="text-sm px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">← Dashboard</Link>
          <Link href={{ pathname: "/profile/setup", query: { edit: "true" } }}>
            <button className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700">Edit</button>
          </Link>
        </div>

        <h2 className="text-xl font-bold mb-2">{steps[step]}</h2>
        <ProgressBar step={step + 1} total={steps.length} />

        <div className="space-y-2 mt-4">{renderStep()}</div>

        <div className="flex justify-between mt-6">
          {step > 0 && (
            <button
              onClick={prev}
              className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 text-xl font-bold"
              aria-label="Previous Step"
            >
              ←
            </button>
          )}
          
          {step < steps.length - 1 && (
            <button
              onClick={next}
              className="w-10 h-10 flex items-center justify-center bg-teal-600 text-white rounded-full hover:bg-teal-700 text-xl font-bold ml-auto"
              aria-label="Next Step"
            >
              →
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
}