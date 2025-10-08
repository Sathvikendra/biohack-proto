import { supabase } from "@/lib/supabaseClient";
import { ChakraStatus } from "@/utils/chakraService";

export type UserProfile = {
  sleep_duration_hours?: string;
  daily_water_intake_l?: string;
  avg_steps_per_day?: string;
  fruit_veg_servings?: string;
  stress_level?: string;
  meditation?: boolean;
  screen_time_hours?: string;
};

/**
 * Evaluate a user's profile metrics and update chakra_status in Supabase
 */
export async function evaluateAndUpdateChakras(
  userId: string,
  profile: UserProfile
): Promise<ChakraStatus | null> {
  const checks: Partial<ChakraStatus> = {};

  // Simple evaluation logic
  checks.root = Number(profile.sleep_duration_hours) >= 7;
  checks.sacral = Number(profile.daily_water_intake_l) >= 2;
  checks.solar_plexus = Number(profile.avg_steps_per_day) >= 8000;
  checks.heart = Number(profile.fruit_veg_servings) >= 5;
  checks.throat = Number(profile.stress_level) <= 3;
  checks.third_eye = Boolean(profile.meditation);
  checks.crown = Number(profile.screen_time_hours) <= 4;

  // Fetch current status
  const { data: current, error: fetchError } = await supabase
    .from("chakra_status")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (fetchError) {
    console.error("Failed to fetch chakra_status:", fetchError);
    return null;
  }

  // Prepare updates with streak increment
  const updates: Partial<ChakraStatus> = {};
  for (const key of Object.keys(checks) as (keyof ChakraStatus)[]) {
    const unlocked = checks[key] as boolean;
    (updates as any)[key] = unlocked;

    const streakKey = `${key}_streak` as keyof ChakraStatus;
    const oldStreak = current?.[streakKey] ?? 0;
    updates[streakKey] = unlocked ? oldStreak + 1 : 0;
  }

  // Update Supabase
  const { data, error: updateError } = await supabase
    .from("chakra_status")
    .update(updates)
    .eq("user_id", userId)
    .select()
    .single();

  if (updateError) {
    console.error("Failed to update chakra_status:", updateError);
    return null;
  }

  return data as ChakraStatus;
}

/**
 * Helper to fetch user profile directly from Supabase
 */
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const { data, error } = await supabase
    .from("users")
    .select(
      `
      sleep_duration_hours,
      daily_water_intake_l,
      avg_steps_per_day,
      fruit_veg_servings,
      stress_level,
      meditation,
      screen_time_hours
    `
    )
    .eq("id", userId)
    .single();

  if (error || !data) {
    console.error("Failed to fetch user profile:", error);
    return null;
  }

  return data as UserProfile;
}
