import { createClient, type SupabaseClient } from '@supabase/supabase-js'

interface SupabaseEnv {
  readonly VITE_SUPABASE_URL?: string
  readonly VITE_SUPABASE_ANON_KEY?: string
}

let client: SupabaseClient | undefined

export function readSupabaseConfig(env: SupabaseEnv = import.meta.env) {
  const url = env.VITE_SUPABASE_URL?.trim()
  const anonKey = env.VITE_SUPABASE_ANON_KEY?.trim()

  if (!url || !anonKey) {
    throw new Error('Supabase mode requires VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.')
  }

  return { url, anonKey }
}

export function getSupabaseClient() {
  if (!client) {
    const { url, anonKey } = readSupabaseConfig()
    client = createClient(url, anonKey)
  }

  return client
}
