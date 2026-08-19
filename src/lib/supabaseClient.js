import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    'Nedostaju Supabase podešavanja! Provjeri .env fajl (VITE_SUPABASE_URL i VITE_SUPABASE_ANON_KEY).'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
