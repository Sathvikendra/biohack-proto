export function detectSleepIrregularities(total: number, goal: number) {
  if (total < goal - 1) return "Below goal sleep duration";
  if (total > goal + 1) return "Above normal sleep duration";
  return "Within normal range";
}

export function summarizeLifestyle(d: any) {
  return `Slept ${d.sleep_duration} hrs:
  Light ${d.sleep_light} hrs,
  Deep ${d.sleep_deep} hrs,
  REM ${d.sleep_rem} hrs.
  Calories consumed: ${d.calories_consumed} kcal, Water intake: ${d.water_intake_l} L.`;
}
