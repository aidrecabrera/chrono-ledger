import {
  RealtimeChannel,
  type RealtimePostgresChangesPayload,
} from "@supabase/supabase-js";

export default defineNuxtRouteMiddleware(async () => {
  const client = useSupabaseClient();
  const user = useSupabaseUser();
  let realtimeChannel: RealtimeChannel | null = null;
  const realtimeStore = useRealtimeChannelStore();
  realtimeChannel = client.channel("public:channel").on(
    "postgres_changes",
    { event: "*", schema: "public" },
    (
      payload: RealtimePostgresChangesPayload<{
        [key: string]: PayloadType;
      }>
    ) => realtimeStore.notify(payload)
  );
  if (user.value) {
    realtimeChannel.subscribe();
  } else if (!user.value) {
    realtimeChannel.unsubscribe();
  }
});
