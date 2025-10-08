// "use client";
// import { getChakraStatus, getUnlockedChakras } from "@/utils/chakraService";
// import { useState } from "react";

// type Chakra = {
//   name: string;
//   color: string;
//   icon: string;
//   unlocked: boolean;
//   tip?: string;
// };

// type DashboardData = {
//   steps: number;
//   calories_burned: number;
//   sleep_duration: number;
//   water_intake: number;
// };

// export default function ChakraDashboard({
//   chakras,
//   dashboardData,
// }: {
//   chakras: Chakra[];
//   dashboardData: DashboardData;
// }) {
//   const [selectedChakra, setSelectedChakra] = useState<Chakra | null>(null);

//   const generateTip = (chakraName: string) => {
//     const { steps, calories_burned, sleep_duration, water_intake } = dashboardData;
//     switch (chakraName.toLowerCase()) {
//       case "root":
//         return sleep_duration < 7
//           ? "Try to get at least 7 hours of sleep tonight to balance your Root chakra."
//           : "Your Root chakra is grounded and balanced!";
//       case "sacral":
//         return water_intake < 2
//           ? "Drink at least 2L water today to energize your Sacral chakra."
//           : "Your Sacral chakra flows with creativity and emotion!";
//       case "solar plexus":
//         return steps < 10000
//           ? "Take a brisk walk or do 30 min of cardio to activate your Solar Plexus chakra."
//           : "Solar Plexus chakra is radiating confidence!";
//       case "heart":
//         return calories_burned < 2000
//           ? "Do some light physical activity to strengthen your Heart chakra today."
//           : "Heart chakra is glowing with love and balance!";
//       case "throat":
//         return "Express your thoughts clearly or journal to unlock your Throat chakra.";
//       case "third eye":
//         return "Meditate for 10-15 minutes to open your Third Eye chakra.";
//       case "crown":
//         return "Spend some time reading or learning something new for your Crown chakra.";
//       default:
//         return "Complete your daily goals to unlock this chakra!";
//     }
//   };

//   return (
//     <div className="flex flex-col items-center gap-8 p-10 bg-gradient-to-br from-indigo-50 via-white to-purple-100 rounded-3xl shadow-2xl max-w-5xl mx-auto">
//       <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight drop-shadow-md">
//         Chakra Balance Dashboard
//       </h2>

//       <div className="flex flex-wrap justify-center gap-10">
//         {chakras.map((chakra) => (
//           <div key={chakra.name} className="flex flex-col items-center gap-3">
//             <div
//               className={`cursor-pointer transition-transform duration-500 ease-out hover:scale-110 ${
//                 chakra.unlocked ? "animate-float" : "opacity-50 grayscale hover:opacity-70"
//               }`}
//               style={{
//                 background: chakra.unlocked
//                   ? `radial-gradient(circle at 30% 30%, ${chakra.color}44, ${chakra.color}aa)`
//                   : "#e5e7eb",
//                 borderRadius: "50%",
//                 width: "90px",
//                 height: "90px",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 boxShadow: chakra.unlocked
//                   ? `0 0 30px 8px ${chakra.color}66, inset 0 0 10px ${chakra.color}33`
//                   : "none",
//               }}
//               onClick={() => !chakra.unlocked && setSelectedChakra(chakra)}
//             >
//               <img src={chakra.icon} alt={chakra.name} className="w-12 h-12 drop-shadow-lg" />
//             </div>
//             <span
//               className={`text-base font-semibold ${
//                 chakra.unlocked ? "text-gray-800" : "text-gray-500"
//               }`}
//             >
//               {chakra.name}
//             </span>
//           </div>
//         ))}
//       </div>

//       {/* Chakra Tip Modal */}
//       {selectedChakra && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 backdrop-blur-sm">
//           <div
//             className="rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center transform transition-all duration-300 scale-100 animate-fadeIn border"
//             style={{
//               background: `linear-gradient(145deg, white, ${selectedChakra.color}15)`,
//               borderColor: selectedChakra.color,
//               boxShadow: `0 0 25px ${selectedChakra.color}77`,
//             }}
//           >
//             <h3
//               className="text-2xl font-bold mb-3"
//               style={{ color: selectedChakra.color }}
//             >
//               {selectedChakra.name} Chakra Locked
//             </h3>
//             <p className="text-gray-700 mb-6 leading-relaxed">
//               {generateTip(selectedChakra.name)}
//             </p>
//             <button
//               onClick={() => setSelectedChakra(null)}
//               className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full shadow hover:from-indigo-600 hover:to-purple-700 transition-all duration-300"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}

//       <style jsx>{`
//         .animate-float {
//           animation: float 3s ease-in-out infinite;
//         }
//         @keyframes float {
//           0% { transform: translateY(0px); }
//           50% { transform: translateY(-8px); }
//           100% { transform: translateY(0px); }
//         }
//         @keyframes fadeIn {
//           from { opacity: 0; transform: scale(0.9); }
//           to { opacity: 1; transform: scale(1); }
//         }
//         .animate-fadeIn {
//           animation: fadeIn 0.3s ease-out forwards;
//         }
//       `}</style>
//     </div>
//   );
// }


//         {/* Interactive Chakra Dots */}
//         {chakraPositions.map((pos) => {
//           const chakra = chakras.find((c) => c.key === pos.key);
//           if (!chakra) return null;

//           return (
//             <motion.div
//               key={chakra.key}
//               className="absolute cursor-pointer"
//               style={{
//                 top: pos.top,
//                 // left: pos.left,
//                 transform: "translate(-50%, -50%)",
//               }}
//               onClick={() => handleChakraClick(chakra)}
//               animate={{
//                 scale: [1, 1.3, 1],
//                 opacity: [0.6, 1, 0.6],
//               }}
//               transition={{
//                 repeat: Infinity,
//                 duration: 2,
//                 ease: "easeInOut",
//               }}
//             >
//               <div
//                 className={`rounded-full ${
//                   chakra.unlocked ? "" : "grayscale opacity-60"
//                 }`}
//                 style={{
//                   width: "20px",
//                   height: "20px",
//                   backgroundColor: chakra.color,
//                   boxShadow: `0 0 20px ${chakra.color}`,
//                 }}
//               ></div>
//             </motion.div>
//           );
//         })}
//       </motion.div>


"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  getChakraStatus,
  getChakraTips,
  ChakraStatus,
} from "@/utils/chakraService";

type Chakra = {
  name: string;
  key: keyof ChakraStatus;
  color: string;
  icon: string;
  unlocked: boolean;
  streak: number;
};

const ChakraDashboard: React.FC = () => {
  const [chakraStatus, setChakraStatus] = useState<ChakraStatus | null>(null);
  const [selectedChakra, setSelectedChakra] = useState<{
    chakra: string;
    tip: string;
  } | null>(null);

  useEffect(() => {
    const fetchMockData = async () => {
      const status = await getChakraStatus("mock-user-1");
      setChakraStatus(status);
    };
    fetchMockData();
  }, []);

  if (!chakraStatus)
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
        <p className="text-lg text-gray-700 animate-pulse">
          Aligning your Chakras...
        </p>
      </div>
    );

  const chakraTips = getChakraTips(chakraStatus);

  const chakraDefaults: Record<string, string> = {
    root: "Stay grounded and secure — stability begins from within.",
    sacral: "Let creativity and flow guide your actions today.",
    solar_plexus: "Embrace confidence and take ownership of your choices.",
    heart: "Practice compassion — give and receive love freely.",
    throat: "Speak your truth with kindness and clarity.",
    third_eye: "Trust your intuition — your insight knows the way.",
    crown: "Connect with mindfulness and higher purpose today.",
  };

  const chakras: Chakra[] = [
    { name: "Crown", key: "crown", color: "#B5179E", icon: "/icons/crown.svg", unlocked: chakraStatus.crown, streak: chakraStatus.crown_streak },
    { name: "Third Eye", key: "third_eye", color: "#6C63FF", icon: "/icons/third_eye.svg", unlocked: chakraStatus.third_eye, streak: chakraStatus.third_eye_streak },
    { name: "Throat", key: "throat", color: "#457B9D", icon: "/icons/throat.svg", unlocked: chakraStatus.throat, streak: chakraStatus.throat_streak },
    { name: "Heart", key: "heart", color: "#2A9D8F", icon: "/icons/heart.svg", unlocked: chakraStatus.heart, streak: chakraStatus.heart_streak },
    { name: "Solar Plexus", key: "solar_plexus", color: "#E9C46A", icon: "/icons/solar.svg", unlocked: chakraStatus.solar_plexus, streak: chakraStatus.solar_plexus_streak },
    { name: "Sacral", key: "sacral", color: "#F4A261", icon: "/icons/sacral.svg", unlocked: chakraStatus.sacral, streak: chakraStatus.sacral_streak },
    { name: "Root", key: "root", color: "#E63946", icon: "/icons/root.svg", unlocked: chakraStatus.root, streak: chakraStatus.root_streak },
  ];

  const handleChakraClick = (chakra: Chakra) => {
    const tipObj =
      chakraTips.find((t) => t.chakra === chakra.key) ||
      { chakra: chakra.key, tip: chakraDefaults[chakra.key] };
    setSelectedChakra(tipObj);
  };

  // Chakra position map (moved down ~10–15%)
  const chakraPositions = [
    { key: "crown", top: "12%", left: "50%" },
    { key: "third_eye", top: "21%", left: "50%" },
    { key: "throat", top: "30%", left: "50%" },
    { key: "heart", top: "43%", left: "50%" },
    { key: "solar_plexus", top: "56%", left: "50%" },
    { key: "sacral", top: "70%", left: "50%" },
    { key: "root", top: "85%", left: "50%" },
  ];

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-100 py-12 px-8 gap-12">
      {/* LEFT SIDE - HUMAN SVG WITH INTERACTIVE CHAKRAS */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="relative flex justify-center items-center w-full lg:w-1/2"
      >
        <img
          src="/icons/human.svg"
          alt="Human Silhouette"
          className="max-w-[350px] w-full opacity-90"
        />

        {/* Interactive Chakra Dots */}
        {chakraPositions.map((pos) => {
          const chakra = chakras.find((c) => c.key === pos.key);
          if (!chakra) return null;

          return (
            <motion.div
              key={chakra.key}
              className="absolute cursor-pointer"
              style={{
                top: pos.top,
                // left: pos.left,
                transform: "translate(-50%, -50%)",
              }}
              onClick={() => handleChakraClick(chakra)}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut",
              }}
            >
              <div
                className={`rounded-full ${
                  chakra.unlocked ? "" : "grayscale opacity-60"
                }`}
                style={{
                  width: "22px",
                  height: "22px",
                  backgroundColor: chakra.color,
                  boxShadow: `0 0 25px ${chakra.color}`,
                }}
              ></div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* RIGHT SIDE - VERTICAL CHAKRA LIST */}
      <div className="flex flex-col items-center w-full lg:w-1/2 space-y-5">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-purple-600 to-pink-600 mb-6 tracking-wide"
        >
          Chakra Dashboard
        </motion.h2>

        <div className="flex flex-col items-center gap-6">
          {chakras.map((chakra, idx) => (
            <motion.div
              key={chakra.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              onClick={() => handleChakraClick(chakra)}
              className={`flex items-center justify-between w-72 p-4 rounded-2xl shadow-md cursor-pointer transition-all duration-300 hover:scale-105 ${
                chakra.unlocked
                  ? "bg-white/80 border border-purple-200 hover:shadow-xl"
                  : "bg-gray-100/60 border border-gray-200 grayscale opacity-80"
              }`}
              style={{
                boxShadow: chakra.unlocked
                  ? `0 0 15px ${chakra.color}40`
                  : "none",
              }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="flex items-center justify-center rounded-full p-3"
                  style={{
                    background: chakra.unlocked
                      ? `radial-gradient(circle, ${chakra.color}33, ${chakra.color}99)`
                      : "#eee",
                  }}
                >
                  <img src={chakra.icon} alt={chakra.name} className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-800">
                    {chakra.name}
                  </p>
                  <p
                    className={`text-sm ${
                      chakra.unlocked ? "text-green-600" : "text-gray-500"
                    }`}
                  >
                    🔥 {chakra.streak} day
                    {chakra.streak !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* POPUP */}
      <AnimatePresence>
        {selectedChakra && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white/90 rounded-3xl shadow-2xl p-8 w-96 border border-purple-200 text-center"
            >
              <h3 className="text-2xl font-semibold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-pink-600 capitalize">
                {selectedChakra.chakra.replace("_", " ")} Chakra Tip
              </h3>
              <p className="text-gray-700 text-sm mb-6 leading-relaxed">
                {selectedChakra.tip}
              </p>
              <button
                onClick={() => setSelectedChakra(null)}
                className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-5 py-2 rounded-xl hover:shadow-lg transition-all"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChakraDashboard;
