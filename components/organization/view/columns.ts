import type { ColumnDef } from "@tanstack/vue-table";
import { h } from "vue";

export interface OrganizationDetails {
	contact: string | null;
	email: string | null;
	first_name: string | null;
	id: string | null;
	last_name: string | null;
	organization_id: number | null;
	organization_name: string | null;
	registered_date: string | null;
	role: string | null;
	username: string | null;
}

export const columns: ColumnDef<OrganizationDetails>[] = [
	{
		accessorKey: "full_name",
		header: () => h("div", { class: "text-center" }, "Full Name"),
		cell: ({ row }) => {
			const firstName = row.original.first_name;
			const lastName = row.original.last_name;
			const fullName = `${firstName} ${lastName}`;
			return h(
				"div",
				{ class: "text-center font-medium" },
				fullName
			);
		},
	},
	{
		accessorKey: "username",
		header: () => h("div", { class: "text-center" }, "Username"),
		cell: ({ row }) => {
			return h(
				"div",
				{ class: "text-center font-medium" },
				("@" + row.getValue("username"))
			);
		},
	},
	{
		accessorKey: "email",
		header: () => h("div", { class: "text-center" }, "Email"),
		cell: ({ row }) => {
			return h(
				"div",
				{ class: "text-center font-medium" },
				row.getValue("email")
			);
		},
	},
	{
		accessorKey: "contact",
		header: () => h("div", { class: "text-center" }, "Contact"),
		cell: ({ row }) => {
			return h(
				"div",
				{ class: "text-center font-medium" },
				row.getValue("contact")
			);
		},
	},
	{
		accessorKey: "role",
		header: () => h("div", { class: "text-center" }, "Role"),
		cell: ({ row }) => {
			return h(
				"div",
				{ class: "text-center font-medium" },
				row.getValue("role")
			);
		},
	},
];
