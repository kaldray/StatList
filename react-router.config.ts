import { vercelPreset } from "@vercel/react-router/vite";
import type { Config } from "@react-router/dev/config";

export default {
  appDirectory: "src",
  ssr: true,
  future: {
    unstable_splitRouteModules: true,
    unstable_subResourceIntegrity: true,
  },
  async prerender() {
    return ["/", "/term", "/login"];
  },
  presets: [vercelPreset()],
} satisfies Config;
