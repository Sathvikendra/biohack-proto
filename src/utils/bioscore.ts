export type UserProfile = {
  name?: string;
  gender?: string;
  date_of_birth?: string;
  age?: string;
  height_cm?: string;
  weight_kg?: string;
  city?: string;
  state?: string;
  country?: string;
  occupation?: string;
  work_hours_per_week?: string;
  marital_status?: string;
  smoking?: boolean;
  alcohol?: boolean;
  caffeine_intake?: string;
  exercise_frequency?: string;
  exercise_type?: string;
  avg_steps_per_day?: string;
  daily_meals?: string;
  diet_type?: string;
  fruit_veg_servings?: string;
  daily_water_intake_l?: string;
  food_allergies?: string;
  stress_level?: string;
  screen_time_hours?: string;
  meditation?: boolean;
  weekday_wakeup?: string;
  weekday_bedtime?: string;
  weekend_wakeup?: string;
  weekend_bedtime?: string;
  sleep_duration_hours?: string;
  sleep_quality?: string;
  napping_habits?: string;
  sleep_aids?: string;
  medical_conditions?: string;
  surgeries_injuries?: string;
  medications_supplements?: string;
  allergies?: string;
  family_history?: string;
  recent_lab_tests?: string;
  goal_weight_management?: boolean;
  goal_energy_performance?: boolean;
  goal_longevity?: boolean;
  goal_skin_beauty?: boolean;
};

export type BioCategory = {
  category: string;
  points: number;
  max: number;
  tip?: string;
};

export function calculateBioScoreDetails(profile: UserProfile) {
  const categories: BioCategory[] = [];

  // --- Activity ---
  let activity = 0;
  const activityMax = 20;
  const freq = profile.exercise_frequency?.toLowerCase();
  if (freq === "daily") activity = 20;
  else if (freq === "frequently") activity = 16;
  else if (freq === "occasionally") activity = 12;
  else if (freq === "rarely") activity = 6;
  else activity = 2;

  const steps = parseInt(profile.avg_steps_per_day || "0", 10);
  if (steps > 8000) activity += 5;
  else if (steps > 5000) activity += 2;
  if (activity > activityMax) activity = activityMax;

  categories.push({
    category: "Activity",
    points: activity,
    max: activityMax,
    tip:
      activity < 12
        ? "Increase daily movement or exercise for better overall fitness."
        : undefined,
  });

  // --- Nutrition ---
  let nutrition = 0;
  const nutritionMax = 20;
  const servings = parseInt(profile.fruit_veg_servings || "0", 10);
  if (servings >= 5) nutrition += 10;
  else if (servings >= 3) nutrition += 6;
  else nutrition += 2;

  const water = parseFloat(profile.daily_water_intake_l || "0");
  if (water >= 2) nutrition += 10;
  else if (water >= 1) nutrition += 6;
  else nutrition += 2;
  if (nutrition > nutritionMax) nutrition = nutritionMax;

  categories.push({
    category: "Nutrition",
    points: nutrition,
    max: nutritionMax,
    tip:
      nutrition < 12
        ? "Add more fruits, vegetables and water to your daily intake."
        : undefined,
  });

  // --- Lifestyle (smoking/alcohol/caffeine) ---
  let lifestyle = 0;
  const lifestyleMax = 15;
  if (!profile.smoking) lifestyle += 5;
  if (!profile.alcohol) lifestyle += 5;
  const caffeine = parseInt(profile.caffeine_intake || "0", 10);
  lifestyle += caffeine <= 2 ? 5 : caffeine <= 4 ? 3 : 1;

  categories.push({
    category: "Lifestyle",
    points: lifestyle,
    max: lifestyleMax,
    tip:
      lifestyle < 10
        ? "Reduce alcohol, smoking or excessive caffeine for a healthier lifestyle."
        : undefined,
  });

  // --- Stress (includes marital status) ---
  let stress = 0;
  const stressMax = 15;
  const sLevel = profile.stress_level?.toLowerCase();
  if (sLevel === "low") stress += 15;
  else if (sLevel === "med") stress += 10;
  else stress += 5;

  // NEW: marital status impact
  if (profile.marital_status?.toLowerCase() === "divorced") {
    stress -= 3; // subtract a few points if divorced
  }
  if (stress < 0) stress = 0;

  categories.push({
    category: "Stress",
    points: stress,
    max: stressMax,
    tip:
      stress < 10
        ? profile.marital_status?.toLowerCase() === "divorced"
          ? "Divorce can increase stress—consider counseling, social support, or relaxation techniques."
          : "Practice stress management with meditation, hobbies, or regular breaks."
        : undefined,
  });

  // --- Sleep ---
  let sleep = 0;
  const sleepMax = 15;
  const duration = parseFloat(profile.sleep_duration_hours || "0");
  if (duration >= 7 && duration <= 9) sleep += 10;
  else if (duration >= 6) sleep += 6;
  else sleep += 3;

  if (profile.sleep_quality?.toLowerCase() === "good") sleep += 5;
  else if (profile.sleep_quality?.toLowerCase() === "fair") sleep += 3;
  else sleep += 1;

  if (sleep > sleepMax) sleep = sleepMax;

  categories.push({
    category: "Sleep",
    points: sleep,
    max: sleepMax,
    tip:
      sleep < 10
        ? "Aim for 7–9 hours of good quality sleep to improve recovery and mental health."
        : undefined,
  });

  // --- Medical ---
  let medical = 0;
  const medicalMax = 15;
  if (!profile.medical_conditions && !profile.surgeries_injuries) medical += 10;
  else medical += 5;
  if (!profile.medications_supplements) medical += 5;

  categories.push({
    category: "Medical",
    points: medical,
    max: medicalMax,
    tip:
      medical < 10
        ? "Schedule regular health checkups and manage medical conditions proactively."
        : undefined,
  });

  // Total
  const total = Math.min(
    categories.reduce((sum, c) => sum + c.points, 0),
    100
  );

  return { total, categories };
}
