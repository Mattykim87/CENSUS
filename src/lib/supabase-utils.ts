import { getSupabase } from "./supabase";

/**
 * Supabase Auth Utilities
 */

export async function signInWithEmail(email: string, password: string) {
  const supabase = getSupabase();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
}

export async function signUpWithEmail(email: string, password: string) {
  const supabase = getSupabase();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
}

export async function signOut() {
  const supabase = getSupabase();
  const { error } = await supabase.auth.signOut();
  return { error };
}

export async function getSession() {
  const supabase = getSupabase();
  const { data, error } = await supabase.auth.getSession();
  return { session: data.session, error };
}

/**
 * Supabase Storage Utilities
 */

export async function uploadFile(
  bucket: string,
  path: string,
  file: File,
  options?: { upsert?: boolean },
) {
  const supabase = getSupabase();
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, options);
  return { data, error };
}

export async function downloadFile(bucket: string, path: string) {
  const supabase = getSupabase();
  const { data, error } = await supabase.storage.from(bucket).download(path);
  return { data, error };
}

export async function deleteFile(bucket: string, path: string) {
  const supabase = getSupabase();
  const { data, error } = await supabase.storage.from(bucket).remove([path]);
  return { data, error };
}

/**
 * Supabase Realtime Utilities
 */

export function subscribeToChannel(
  channelName: string,
  callback: (payload: unknown) => void,
) {
  const supabase = getSupabase();
  const channel = supabase.channel(channelName);

  channel
    .on("broadcast", { event: "all" }, (payload: unknown) => {
      callback(payload);
    })
    .subscribe();

  return () => {
    const supabase = getSupabase();
    supabase.removeChannel(channel);
  };
}
