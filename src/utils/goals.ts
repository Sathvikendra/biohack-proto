export function summarizeGoals(form: {
  goal_weight_management?: boolean;
  goal_energy_performance?: boolean;
  goal_longevity?: boolean;
  goal_skin_beauty?: boolean;
}) {
  const goals: string[] = [];

  if (form.goal_weight_management) goals.push("Weight management");
  if (form.goal_energy_performance) goals.push("Energy & performance");
  if (form.goal_longevity) goals.push("Longevity & disease prevention");
  if (form.goal_skin_beauty) goals.push("Skin & beauty");

  return goals;
}
