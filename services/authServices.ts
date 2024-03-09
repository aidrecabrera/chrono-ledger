import type { SignInWithEmailProps, SignUpNewUserProps } from "~/types/authServices.types"

const supabase = useSupabaseClient()

export const signUpNewUser = async ({ email, password, options }: SignUpNewUserProps) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options,
  })
  if (error) {
    console.error('Error signing up:', error)
    return
  }
  console.log('User data:', data)
}

export const signInWithEmail = async ({ email, password}: SignInWithEmailProps) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  if (error) {
    console.error('Error signing up:', error)
    return
  }
  console.log('User data:', data)
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error('Error signing out:', error)
    return
  }
}