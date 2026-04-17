import type { Config } from "vike/types";
import vikeReact from "vike-react/config";

export default {
  extends: [vikeReact],
  title: "Vike Starter",
  // false = every navigation is a full page load, so Home (SSR) always gets full HTML from server; SSG stays static.
  clientRouting: false,
  server: true,
} satisfies Config;
