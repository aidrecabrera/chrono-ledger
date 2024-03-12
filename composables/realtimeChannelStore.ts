import type { RealtimePostgresChangesPayload } from "@supabase/supabase-js";

export type PayloadType = {
	schema: string;
	table: string;
	commit_timestamp: Date;
	eventType: string;
	new: { key: string };
	old: { key: string };
	errors: null;
};

type RealtimeChannelInterface = {
	newUpdates: boolean;
	payload: RealtimePostgresChangesPayload<{
		[key: string]: PayloadType;
	}> | null;
};

export const useRealtimeChannelStore = defineStore("realtimeChannelStore", {
	state: (): RealtimeChannelInterface => ({
		newUpdates: false,
		payload: null,
	}),
	actions: {
		notify(
			payload: RealtimePostgresChangesPayload<{
				[key: string]: PayloadType;
			}>
		) {
			this.newUpdates = true;
			this.payload = payload;
		},
	},
});
