export interface SignUpNewUserProps {
    email: string
    password: string
    first_name: string,
    last_name: string,
    username: string,
    role: string,
    contact: string,
}

export interface SignInWithEmailProps {
    email: string
    password: string
}