<script setup lang="ts">
import {
	Cloud,
	CreditCard,
	Github,
	Keyboard,
	LifeBuoy,
	LogOut,
	Mail,
	MessageSquare,
	Plus,
	PlusCircle,
	Settings,
	User,
	UserPlus,
	Users,
	SunMoon,
} from "lucide-vue-next";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

const props = defineProps({
	logout: Function,
});

const profileInformation = useAdminInformationStore();
const profile = {
	fullName:
		profileInformation.$state.information?.first_name +
		" " +
		profileInformation.$state.information?.last_name,
	email: profileInformation.$state.information?.email,
};
const colorMode = useColorMode();
</script>
<template>
	<DropdownMenu>
		<DropdownMenuTrigger as-child>
			<Button variant="ghost" class="rounded-full w-10 h-10 p-0">
				<NuxtImg
					class="rounded-full outline outline-1 outline-background hover:outline-slate-300 transition-all duration-300"
					src="https://github.com/radix-vue.png"
					width="40"
				/>
			</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent class="w-56 mr-5 p-4">
			<DropdownMenuLabel>
				<h1>{{ profile.fullName }}</h1>
				<p class="font-normal">{{ profile.email }}</p>
			</DropdownMenuLabel>
			<DropdownMenuSeparator />
			<DropdownMenuGroup>
				<DropdownMenuItem>
					<User class="mr-2 h-4 w-4" />
					<span>Profile</span>
				</DropdownMenuItem>
				<NuxtLink to="/settings" class="flex flex-row items-center w-full">
					<DropdownMenuItem class="w-full">
						<Settings class="mr-2 h-4 w-4" />
						<span>Settings</span>
					</DropdownMenuItem>
				</NuxtLink>
			</DropdownMenuGroup>
			<DropdownMenuGroup>
				<DropdownMenuSub>
					<DropdownMenuSubTrigger>
						<UserPlus class="mr-2 h-4 w-4" />
						<span>Invite users</span>
					</DropdownMenuSubTrigger>
					<DropdownMenuPortal>
						<DropdownMenuSubContent>
							<DropdownMenuItem>
								<Mail class="mr-2 h-4 w-4" />
								<span>Email</span>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<MessageSquare class="mr-2 h-4 w-4" />
								<span>Message</span>
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<PlusCircle class="mr-2 h-4 w-4" />
								<span>More...</span>
							</DropdownMenuItem>
						</DropdownMenuSubContent>
					</DropdownMenuPortal>
				</DropdownMenuSub>
				<NuxtLink
					to="/organizations/create"
					class="flex flex-row items-center w-full"
				>
					<DropdownMenuItem class="w-full">
						<Plus class="mr-2 h-4 w-4" />
						<span>New Organization</span>
					</DropdownMenuItem>
				</NuxtLink>
				<DropdownMenuItem class="pr-0 -mr-0">
					<Select
						class="appearance-none bg-transparent shadow-none"
						v-model="colorMode.preference"
					>
						<SelectTrigger
							class="outline-none border-0 h-5 appearance-none bg-transparent shadow-none"
						>
							<SunMoon class="-ml-3 h-4 w-4" />
							<SelectValue
								class="ml-3 text-left w-full outline-none"
								placeholder="Theme"
							/>
						</SelectTrigger>
						<SelectContent class="mr-[13.5rem] -mt-6">
							<SelectGroup>
								<SelectItem value="system"> System </SelectItem>
								<SelectItem value="light"> Light </SelectItem>
								<SelectItem value="dark"> Dark </SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</DropdownMenuItem>
			</DropdownMenuGroup>
			<DropdownMenuSeparator />
			<DropdownMenuItem>
				<Github class="mr-2 h-4 w-4" />
				<span>GitHub</span>
			</DropdownMenuItem>
			<DropdownMenuItem>
				<LifeBuoy class="mr-2 h-4 w-4" />
				<span>Support</span>
			</DropdownMenuItem>
			<DropdownMenuSeparator />
			<DropdownMenuItem @click="props.logout">
				<LogOut class="mr-2 h-4 w-4" />
				<span>Log out</span>
			</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
</template>
