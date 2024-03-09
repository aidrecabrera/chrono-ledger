<script lang="ts" setup>
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import {
  FormControl,
  FormField,
  FormItem,
} from '@/components/ui/form'
import { useForm } from 'vee-validate';
import { signUpNewUser } from '~/services/authServices';

definePageMeta({
  layout: 'noauth'
})

// * Redirect user to home page if they are already logged in
const user = useSupabaseUser()
watchEffect(() => {
  if (user.value) {
    navigateTo('/')
  }
})

// * Register Schema
const registerFormSchema = toTypedSchema(z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  username: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8)
})
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })
)

// * Register Form
const form = useForm({
  validationSchema: registerFormSchema,
})
const supabase = useSupabaseClient()
// * Register User with Email and Password
const onSubmit = form.handleSubmit((values) => {
  signUpNewUser({
    email: values.email,
    password: values.password,
    first_name: values.firstName,
    last_name: values.lastName,
    username: values.username,
    supabase: supabase
  }).catch((error) => {
    form.setErrors({ email: error.message })
  })
})
const agreementState = useState('agreementState', () => false)
</script>
<template>
  <div class="flex flex-col grow justify-center items-center gap-4">
    <ChronoLogo />
    <form @submit="onSubmit">
      <Card class="flex flex-col items-center justify-center gap-4 px-20 py-12 w-[500px] min-h-[517px]">
        <h1 class="text-2xl font-bricolage">Get Started</h1>
        <div class="flex flex-row gap-2">
          <FormField v-slot="{ componentField }" name="firstName">
            <FormItem class="w-full">
              <FormControl>
                <Input id="firstName" required type="text" placeholder="First Name" v-bind="componentField" />
              </FormControl>
              <FormMessage name="firstName" />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="lastName">
            <FormItem class="w-full">
              <FormControl>
                <Input id="lastName" required type="text" placeholder="Last Name" v-bind="componentField" />
              </FormControl>
              <FormMessage name="lastName" />
            </FormItem>
          </FormField>
        </div>
        <FormField v-slot="{ componentField }" name="username">
          <FormItem class="w-full">
            <FormControl>
              <Input id="username" required type="text" placeholder="Username" v-bind="componentField" />
            </FormControl>
            <FormMessage name="username" />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="email">
          <FormItem class="w-full">
            <FormControl>
              <Input id="email" required type="text" placeholder="Email" v-bind="componentField" />
            </FormControl>
            <FormMessage name="email" />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="password">
          <FormItem class="w-full">
            <FormControl>
              <Input id="password" required type="password" placeholder="Password" v-bind="componentField" />
            </FormControl>
            <FormMessage name="password" />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="confirmPassword">
          <FormItem class="w-full">
            <FormControl>
              <Input id="confirmPassword" required type="password" placeholder="Confirm Password"
                v-bind="componentField" />
            </FormControl>
            <FormMessage name="confirmPassword" />
          </FormItem>
        </FormField>
        <div class="flex flex-row items-center gap-2">
          <Checkbox @update:checked="agreementState = $event" />
          <p class="text-sm text-gray-500">I agree to the terms and conditions</p>
        </div>
        <Button :disabled="!agreementState" class="w-full">
          Sign Up
        </Button>
        <p class="text-sm text-gray-500">Already have an account? <NuxtLink to="/login" class="underline font-medium">
            Log In</NuxtLink>
        </p>
      </Card>
    </form>
  </div>
</template>