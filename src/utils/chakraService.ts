import { supabase } from "@/lib/supabaseClient";

export type ChakraStatus = {
  user_id: string;
  root: boolean;
  sacral: boolean;
  solar_plexus: boolean;
  heart: boolean;
  throat: boolean;
  third_eye: boolean;
  crown: boolean;
  root_streak: number;
  sacral_streak: number;
  solar_plexus_streak: number;
  heart_streak: number;
  throat_streak: number;
  third_eye_streak: number;
  crown_streak: number;
  updated_at: string;
};

// Mock data for prototype
export const mockChakraStatus: ChakraStatus = {
  user_id: "mock-user-1",
  root: true,
  sacral: true,
  solar_plexus: false,
  heart: true,
  throat: false,
  third_eye: false,
  crown: false,
  root_streak: 3,
  sacral_streak: 2,
  solar_plexus_streak: 0,
  heart_streak: 5,
  throat_streak: 0,
  third_eye_streak: 0,
  crown_streak: 0,
  updated_at: new Date().toISOString(),
};

// Mock functions
export const getChakraStatus = async (_user_id: string): Promise<ChakraStatus> => {
  // Simulate API delay
  await new Promise((res) => setTimeout(res, 300));
  return mockChakraStatus;
};

export const createChakraStatus = async (_user_id: string): Promise<ChakraStatus> => {
  return mockChakraStatus;
};

export const updateChakraStatus = async (_user_id: string, updates: Partial<ChakraStatus>): Promise<ChakraStatus> => {
  return { ...mockChakraStatus, ...updates, updated_at: new Date().toISOString() };
};


export type ChakraStatusInsert = Partial<Omit<ChakraStatus, "updated_at">>;

// export const getChakraStatus = async (user_id: string) => {
//   const { data, error } = await supabase
//     .from("chakra_status")
//     .select("*")
//     .eq("user_id", user_id)
//     .maybeSingle<ChakraStatus>(); // ✅ safe: returns null if 0 rows, not an error

//   if (error) {
//     console.error("getChakraStatus error:", error);
//     return null;
//   }

//   // ✅ If not found, create a default row
//   if (!data) {
//     console.warn(`No chakra_status found for ${user_id}. Creating new...`);
//     const newData = await createChakraStatus(user_id);
//     return newData;
//   }

//   return data;
// };

// export const createChakraStatus = async (user_id: string) => {
//   const { data, error } = await supabase
//     .from("chakra_status")
//     .insert({
//       user_id,
//       root: false,
//       sacral: false,
//       solar_plexus: false,
//       heart: false,
//       throat: false,
//       third_eye: false,
//       crown: false,
//       root_streak: 0,
//       sacral_streak: 0,
//       solar_plexus_streak: 0,
//       heart_streak: 0,
//       throat_streak: 0,
//       third_eye_streak: 0,
//       crown_streak: 0,
//     })
//     .select()
//     .single<ChakraStatus>();

//   if (error) {
//     console.error("createChakraStatus error:", error);
//     return null;
//   }
//   return data;
// };

// export const updateChakraStatus = async (
//   user_id: string,
//   updates: ChakraStatusInsert
// ) => {
//   const { data, error } = await supabase
//     .from("chakra_status")
//     .update(updates)
//     .eq("user_id", user_id)
//     .select()
//     .single<ChakraStatus>();

//   if (error) {
//     console.error("updateChakraStatus error:", error);
//     return null;
//   }
//   return data;
// };

// ----------------------
// Helper Functions
// ----------------------

// Return array of unlocked chakras
export const getUnlockedChakras = (status: ChakraStatus) => {
  return Object.entries(status)
    .filter(([key, value]) =>
      ["root", "sacral", "solar_plexus", "heart", "throat", "third_eye", "crown"].includes(key)
      && value === true
    )
    .map(([key]) => key);
};

// Return streak counts
export const getChakraStreaks = (status: ChakraStatus) => {
  return {
    root: status.root_streak,
    sacral: status.sacral_streak,
    solar_plexus: status.solar_plexus_streak,
    heart: status.heart_streak,
    throat: status.throat_streak,
    third_eye: status.third_eye_streak,
    crown: status.crown_streak,
  };
};

// Return tips for next improvement
export const getChakraTips = (status: ChakraStatus) => {
  const tips: Record<string, string> = {
    root: "Complete 7 hours of sleep tonight",
    sacral: "Drink at least 2L water today",
    solar_plexus: "Do 30 min of cardio or strength training",
    heart: "Express gratitude or connect with loved ones",
    throat: "Speak positively and journal your thoughts",
    third_eye: "Meditate for 10–15 minutes",
    crown: "Read or learn something new today",
  };

  return Object.entries(status)
    .filter(([key, value]) =>
      ["root", "sacral", "solar_plexus", "heart", "throat", "third_eye", "crown"].includes(key)
      && value === false
    )
    .map(([key]) => ({ chakra: key, tip: tips[key] }));
};

// Increment streak when task completed
export const incrementChakraStreak = async (
  user_id: string,
  chakra: keyof ChakraStatus
) => {
  const status = await getChakraStatus(user_id);
  if (!status) return null;

  const streakKey = `${chakra}_streak` as keyof ChakraStatus;
  const newStreak = (status[streakKey] as number) + 1;

  // Mark chakra unlocked if streak >= 1 (can be adjusted)
  const updates: ChakraStatusInsert = {
    [streakKey]: newStreak,
    ...(newStreak >= 1 ? { [chakra]: true } : {}),
  } as ChakraStatusInsert;

  return updateChakraStatus(user_id, updates);
};
