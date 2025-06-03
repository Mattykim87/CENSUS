import { supabase } from "./supabase";

/**
 * Supabase Auth Utilities
 */

export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
}

export async function signUpWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

export async function getSession() {
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
  options?: { upsert?: boolean }
) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, options);
  return { data, error };
}

export async function downloadFile(bucket: string, path: string) {
  const { data, error } = await supabase.storage.from(bucket).download(path);
  return { data, error };
}

export async function listFiles(bucket: string, path: string) {
  const { data, error } = await supabase.storage.from(bucket).list(path);
  return { data, error };
}

export async function deleteFile(bucket: string, path: string) {
  const { data, error } = await supabase.storage.from(bucket).remove([path]);
  return { data, error };
}

/**
 * Supabase Realtime Utilities
 */

export function subscribeToChannel(channelName: string, callback: (payload: any) => void) {
  const channel = supabase.channel(channelName);
  
  channel
    .on('broadcast', { event: 'all' }, (payload) => {
      callback(payload);
    })
    .subscribe();
    
  return () => {
    supabase.removeChannel(channel);
  };
}
