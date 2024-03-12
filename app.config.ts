export default defineAppConfig({
	vercelAnalytics: {
		mode: "auto",
		debug: false,
		beforeSend: (event: { url: string | string[] }) => {
			if (event.url.includes("/private")) return null;
			return event;
		},
	},
});
