import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || '',
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
)
// Check for a user in the 'users' table
export async function checkUser(email: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
  
    if (error) {
      return false
    } else if (data) {
      return data
    } else {
      return false
    }
  }
  
// Validate user credentials
export async function validateUserCredentials(email: string, password: string) {
    const { data, error } = await supabase
      .from('users')
      .select('email')
      .eq('email', email)
      .eq('password_hash', password)
      .single()
  
    if (error) {
      return error
    } else if (data) {
      return true
    } else {
      return error
    }
  }
