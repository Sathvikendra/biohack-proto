import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import ProgressBar from "@/components/ProgressBar";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/context/AuthContext";

import Input from "@/components/Input";
import Checkbox from "@/components/Checkbox";
import RadioGroup from "@/components/RadioGroup";

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

export default function ProfileSetup() {
  const { user } = useAuth();
  const router = useRouter();

  const editMode = router.query.edit === "true"; // detect edit mode

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [sameWeekend, setSameWeekend] = useState(false);
  const [labFile, setLabFile] = useState<File | null>(null);

  const [form, setForm] = useState<any>({
    name: "", gender: "", date_of_birth: "", age: "",
    height_cm: "", weight_kg: "",
    city: "", state: "", country: "",
    occupation: "", work_hours_per_week: "",
    marital_status: "",
    smoking: false, alcohol: false, caffeine_intake: "",
    exercise_frequency: "", exercise_type: "",
    avg_steps_per_day: "",
    daily_meals: "", diet_type: "", fruit_veg_servings: "",
    daily_water_intake_l: "", food_allergies: "",
    stress_level: "", screen_time_hours: "", meditation: false,
    weekday_wakeup: "", weekday_bedtime: "",
    weekend_wakeup: "", weekend_bedtime: "",
    sleep_duration_hours: "", sleep_quality: "",
    napping_habits: "", sleep_aids: "",
    medical_conditions: "", surgeries_injuries: "",
    medications_supplements: "", allergies: "",
    family_history: "", recent_lab_tests: "",
    recent_lab_file: "",
    goal_weight_management: false,
    goal_energy_performance: false,
    goal_longevity: false,
    goal_skin_beauty: false,
  });

  // Fetch profile if edit mode
  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      if (editMode) {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("user_id", user.id)
          .single();

        if (!error && data) {
          setForm(data);
          if (data.weekend_wakeup === data.weekday_wakeup && data.weekend_bedtime === data.weekday_bedtime) {
            setSameWeekend(true);
          }
        }
      } else {
        // Check if profile exists to redirect
        const { data } = await supabase
          .from("profiles")
          .select("user_id")
          .eq("user_id", user.id)
          .single();
        if (data) router.replace("/dashboard");
      }
    };

    fetchProfile();
  }, [user, editMode, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const t = e.target;
    const { name, value } = t;

    if (t instanceof HTMLInputElement && t.type === "checkbox") {
      setForm((p: any) => ({ ...p, [name]: t.checked }));
      return;
    }

    if (name === "date_of_birth") {
      const dob = new Date(value);
      const diff = Date.now() - dob.getTime();
      const age = Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000));
      setForm((p: any) => ({ ...p, date_of_birth: value, age: String(age) }));
    } else {
      setForm((p: any) => ({ ...p, [name]: value }));
    }
  };

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = async () => {
    if (!user) return;
    setLoading(true);
    setMsg("");

    let labPath = form.recent_lab_file;

    if (labFile) {
      const { data, error: uploadErr } = await supabase.storage
        .from('lab-tests')
        .upload(`${user.id}/${labFile.name}`, labFile, { upsert: true, contentType: 'application/pdf' });

      if (uploadErr) {
        setMsg(uploadErr.message);
        setLoading(false);
        return;
      }
      labPath = data.path;
    }

    const { error } = await supabase.from("profiles").upsert({
      user_id: user.id,
      ...form,
      recent_lab_file: labPath,
      height_cm: Number(form.height_cm) || null,
      weight_kg: Number(form.weight_kg) || null,
      work_hours_per_week: Number(form.work_hours_per_week) || null,
      avg_steps_per_day: Number(form.avg_steps_per_day) || null,
      daily_water_intake_l: Number(form.daily_water_intake_l) || null,
      screen_time_hours: Number(form.screen_time_hours) || null,
      sleep_duration_hours: Number(form.sleep_duration_hours) || null,
    });

    setLoading(false);
    if (error) setMsg(error.message);
    else {
      if (editMode) {
        router.push("/dashboard/profile");
      } else {
        router.push("/dashboard");
      }
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <>
            <Input name="name" label="Name" value={form.name} onChange={handleChange} placeholder="Enter your Name"/>
            <RadioGroup name="gender" label="Gender" options={["Male", "Female", "Other"]} value={form.gender} onChange={handleChange}/>
            <Input type="date" name="date_of_birth" label="Date of Birth" value={form.date_of_birth} onChange={handleChange}/>
            <Input name="age" label="Estimated Age (yrs)" value={form.age} onChange={() => {}} readOnly placeholder="Enter your Date of Birth"/>
            <Input name="height_cm" label="Height (cm)" value={form.height_cm} onChange={handleChange} placeholder="Enter your height in cm"/>
            <Input name="weight_kg" label="Weight (kg)" value={form.weight_kg} onChange={handleChange} placeholder="Enter your weight in kgs"/>
            <Input name="city" label="City" value={form.city} onChange={handleChange} placeholder="Enter your city"/>
            <Input name="state" label="State" value={form.state} onChange={handleChange} placeholder="Enter the State"/>
            <Input name="country" label="Country" value={form.country} onChange={handleChange} placeholder="Enter the country"/>
            <RadioGroup name="occupation" label="Occupation" options={["Desk job", "Active job", "Mixed"]} value={form.occupation} onChange={handleChange}/>
            <Input name="work_hours_per_week" label="Work hours/week" value={form.work_hours_per_week} onChange={handleChange} placeholder="Enter your number of work hours per week"/>
            <RadioGroup name="marital_status" label="Marital Status" options={["Single", "Married", "Divorced"]} value={form.marital_status} onChange={handleChange}/>
          </>
        );
      case 1:
        return (
          <>
            <Checkbox name="smoking" label="I smoke" checked={form.smoking} onChange={handleChange}/>
            <Checkbox name="alcohol" label="I drink alcohol" checked={form.alcohol} onChange={handleChange}/>
            <Input name="caffeine_intake" label="Caffeine intake (cups/day)" value={form.caffeine_intake} onChange={handleChange} placeholder="Enter your caffeine intake"/>
          </>
        );
      case 2:
        return (
          <>
            <RadioGroup name="exercise_frequency" label="Exercise" options={["Daily","Frequently","Occasionally","Rarely","None"]} value={form.exercise_frequency} onChange={handleChange}/>
            <RadioGroup name="exercise_type" label="Preferred exercise" options={["Cardio","Strength","Yoga/Stretch","Sports","Mixed"]} value={form.exercise_type} onChange={handleChange}/>
            <Input name="avg_steps_per_day" label="Average steps/day" value={form.avg_steps_per_day} onChange={handleChange} placeholder="Enter your avg steps per day"/>
          </>
        );
      case 3:
        return (
          <>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Avg Meals per day</label>
              <select name="daily_meals" value={form.daily_meals} onChange={handleChange} className="w-full border p-2 rounded">
                <option value="">Select</option><option>1</option><option>2</option><option>3</option>
              </select>
            </div>
            <RadioGroup name="diet_type" label="Diet Type" options={["Vegetarian","Vegan","Non Vegetarian","Mixed"]} value={form.diet_type} onChange={handleChange}/>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Vegetable servings/day</label>
              <select name="fruit_veg_servings" value={form.fruit_veg_servings} onChange={handleChange} className="w-full border p-2 rounded">
                <option value="">Select</option>
                <option>1</option><option>2</option><option>3</option>
                <option>4</option><option>5</option><option>5+</option>
              </select>
            </div>
            <Input name="daily_water_intake_l" label="Daily water intake (litres)" value={form.daily_water_intake_l} onChange={handleChange} placeholder="Enter your daily water intake amount"/>
            Specify your food allergies (if any)
            <textarea name="food_allergies" value={form.food_allergies} onChange={handleChange} placeholder="Food allergies or intolerance" className="w-full border rounded p-2"/>
          </>
        );
      case 4:
        return (
          <>
            Rate your Stress Levels
            <RadioGroup name="stress_level" options={["Low","Med","High"]} value={form.stress_level} onChange={handleChange}/>
            <Input name="screen_time_hours" label="Average screen time outside work (hrs)" value={form.screen_time_hours} onChange={handleChange} placeholder="Enter your avg screen time"/>
            <Checkbox name="meditation" label="I practice Meditation" checked={form.meditation} onChange={handleChange}/>
          </>
        );
      case 5:
        return (
          <>
            <Input
            type="time"
            name="weekday_wakeup"
            label="Weekday wake-up time"
            value={form.weekday_wakeup}
            onChange={handleChange}
            />

            <Input
            type="time"
            name="weekday_bedtime"
            label="Weekday bedtime"
            value={form.weekday_bedtime}
            onChange={handleChange}
            />

            <Checkbox
            name="sameWeekend"
            label="Weekend same as weekday"
            checked={sameWeekend}
            onChange={(e) => {
                const checked = e.target.checked;
                setSameWeekend(checked);

                setForm((prev: any) => ({
                ...prev,
                weekend_wakeup: checked ? prev.weekday_wakeup : "",
                weekend_bedtime: checked ? prev.weekday_bedtime : "",
                }));
            }}
            />

            {!sameWeekend && (
            <>
                <Input
                type="time"
                name="weekend_wakeup"
                label="Weekend wake-up time"
                value={form.weekend_wakeup}
                onChange={handleChange}
                />
                <Input
                type="time"
                name="weekend_bedtime"
                label="Weekend bedtime"
                value={form.weekend_bedtime}
                onChange={handleChange}
                />
            </>
            )}
            <Input name="sleep_duration_hours" label="Sleep duration (hrs)" value={form.sleep_duration_hours} onChange={handleChange} placeholder="Enter your sleep duration"/>
            Rate you Sleep Quality
            <RadioGroup name="sleep_quality" options={["Poor","Fair","Good"]} value={form.sleep_quality} onChange={handleChange}/>
            <Input name="napping_habits" label="Napping habits (if any)" value={form.napping_habits} onChange={handleChange} placeholder="Enter your napping habits"/>
            <Input name="sleep_aids" label="Sleep aids (if any)" value={form.sleep_aids} onChange={handleChange} placeholder="Enter your sleeping aids"/>
          </>
        );
      case 6:
        return (
          <>
            {["medical_conditions","surgeries_injuries","medications_supplements","allergies","family_history","recent_lab_tests"].map((field) => {
                const label = field
                .split("_")
                .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                .join(" ");

                return(
                <div key={field} className="mb-4">
                <label className="block mb-1 font-medium">{label}</label>
                <textarea
                    name={field}
                    value={(form as any)[field]}
                    onChange={handleChange}
                    className="w-full border rounded p-2 h-24 resize-none"
                    placeholder={`Enter your ${field.replace(/_/g, " ")}`}
                />
                </div>
            );
            })}

            <div className="mb-4">
                <label className="block mb-2 font-medium">Upload Lab Test PDF</label>
                <div className="flex items-center gap-3">
                  <label className="flex items-center px-4 py-2 bg-gray-200 rounded cursor-pointer hover:bg-gray-300">
                    <span>{labFile ? labFile.name : "Choose file..."}</span>
                    <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e)=>setLabFile(e.target.files?.[0] || null)}
                    className="hidden"
                    />
                  </label>
                  {labFile && (
                    <button
                    type="button"
                    onClick={()=>setLabFile(null)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >Remove</button>
                  )}
                </div>
            </div>
          </>
        );
      case 7:
        return (
          <>
            I want to sign up for
            <Checkbox name="goal_weight_management" label="Weight management" checked={form.goal_weight_management} onChange={handleChange}/>
            <Checkbox name="goal_energy_performance" label="Energy & performance" checked={form.goal_energy_performance} onChange={handleChange}/>
            <Checkbox name="goal_longevity" label="Longevity & disease prevention" checked={form.goal_longevity} onChange={handleChange}/>
            <Checkbox name="goal_skin_beauty" label="Skin & beauty" checked={form.goal_skin_beauty} onChange={handleChange}/>
          </>
        );
    }
  };

  return (
    <Layout title={editMode ? "Edit Profile" : "Profile Setup"} showHeader={false}>
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow">
        <ProgressBar step={step + 1} total={steps.length} />
        <h2 className="text-xl font-bold mb-4">{steps[step]}</h2>
        {msg && <p className="mb-4 text-red-600">{msg}</p>}

        <form onSubmit={(e) => { e.preventDefault(); step === steps.length - 1 ? handleSubmit() : next(); }}>
          {renderStep()}
          <div className="flex justify-between mt-6">
            {step > 0 && (
              <button type="button" onClick={prev} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Back</button>
            )}
            <button
              type="submit"
              disabled={loading}
              className="ml-auto px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 disabled:opacity-50"
            >
              {step === steps.length - 1 ? (loading ? "Saving…" : editMode ? "Update" : "Finish") : "Next"}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
