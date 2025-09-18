import { supabase } from "./supabaseClient";

export async function uploadLabPdf(file: File) {
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) throw new Error("Not signed in");

  const path = `${user.id}/${file.name}`;
  const { error } = await supabase.storage
    .from("lab-tests")
    .upload(path, file, { contentType: "application/pdf", upsert: false });
  if (error) throw error;
  return path; // Save this in DB
}
