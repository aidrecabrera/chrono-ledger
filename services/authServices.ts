import type { SignInWithEmailProps, SignUpNewUserProps } from "~/types/authServices.types"

export const signUpNewUser = async ({ email, password, first_name, last_name, username, supabase }: SignUpNewUserProps & { supabase: any }) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: first_name,
        last_name: last_name,
        username: username,
      }
    },
  })
  if (error) {
    console.error('Error signing up:', error)
    return
  }
  console.log('User data:', data)
}

export const signInWithEmail = async ({ email, password, supabase }: SignInWithEmailProps & { supabase: any }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
    options: {
      redirectTo: '/' 
    }
  })
  if (error) {
    console.error('Error signing up:', error)
    return
  }
  navigateTo('/')
}

export const signOutUser = async (supabase: any) => {
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error('Error signing out:', error)
    return
  }
}