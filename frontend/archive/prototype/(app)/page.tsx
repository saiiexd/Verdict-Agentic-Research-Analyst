import { redirect } from "next/navigation";

// Redirect root to landing page (which is at /)
// and redirect /app root to dashboard
export default function AppRoot() {
  redirect("/dashboard");
}
