<script lang="ts" setup>
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { useForm } from "vee-validate";
import { signInWithEmail } from "~/services/authServices";

definePageMeta({
	layout: "noauth",
});

const loginFormSchema = toTypedSchema(
	z.object({
		email: z.string().email(),
		password: z.string().min(8),
	})
);
const form = useForm({
	validationSchema: loginFormSchema,
});

// * Sign in user with email and password
const supabase = useSupabaseClient();
const onSubmit = form.handleSubmit((values) => {
	signInWithEmail({
		email: values.email,
		password: values.password,
		supabase: supabase,
	}).catch((error) => {
		form.setErrors({ password: error.message });
	});
});
</script>

<template>
	<div class="flex flex-col grow justify-center items-center gap-4">
		<ChronoLogo />
		<form @submit="onSubmit">
			<Card
				class="flex flex-col items-center justify-center gap-4 px-20 py-12 w-[500px] min-h-[370px]"
			>
				<h1 class="text-2xl">Welcome Back</h1>
				<FormField v-slot="{ componentField }" name="email">
					<FormItem class="w-full">
						<FormControl>
							<Input
								id="email"
								required
								type="text"
								placeholder="Email"
								v-bind="componentField"
							/>
						</FormControl>
					</FormItem>
					<FormMessage class="-my-2" />
				</FormField>
				<FormField v-slot="{ componentField }" name="password">
					<FormItem class="w-full">
						<FormControl>
							<Input
								id="password"
								required
								type="password"
								placeholder="Password"
								v-bind="componentField"
							/>
						</FormControl>
					</FormItem>
					<FormMessage class="-my-2" />
				</FormField>
				<p class="text-sm text-gray-500 underline">Forgot your password?</p>
				<NuxtLink class="w-full">
					<Button type="submit" class="w-full"> Log In </Button>
				</NuxtLink>
				<p class="text-sm text-gray-500">
					Don't have an account?
					<NuxtLink to="/register" class="underline font-medium">
						Sign Up</NuxtLink
					>
				</p>
			</Card>
		</form>
	</div>
</template>
