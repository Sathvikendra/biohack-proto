export function estimateStress(hrv: number) {
  if (hrv > 50) return "Low";
  if (hrv >= 30) return "Moderate";
  return "High";
}
