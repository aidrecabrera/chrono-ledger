import {
  RealtimeChannel,
  type RealtimePostgresChangesPayload,
} from "@supabase/supabase-js";

export default defineNuxtRouteMiddleware(async () => {
  const client = useSupabaseClient();
  let realtimeChannel: RealtimeChannel | null = null;
  const realtimeStore = useRealtimeChannelStore();
  realtimeChannel = client
    .channel("public:channel")
    .on(
      "postgres_changes",
      { event: "*", schema: "public" },
      (
        payload: RealtimePostgresChangesPayload<{
          [key: string]: PayloadType;
        }>
      ) => realtimeStore.notify(payload)
    )
    .on(
      "postgres_changes",
      { event: "*", schema: "auth", table: "users" },
      async (
        payload: RealtimePostgresChangesPayload<{
          [key: string]: PayloadType;
        }>
      ) => {
        const { data } = await client.auth.getSession();
        if (!data.session) {
          await client.auth.signOut();
          useAoManagementStore().reset();
          useMoAssociationStore().RESET();
          navigateTo("/login");
        }
      }
    );
  realtimeChannel.subscribe();
});
