import DashboardHome from "@/ClientPages/DashboardHome";
import Home from "@/ClientPages/Home";
import { cookies } from "next/headers";

export default function HomePage() {
  const refreshToken = cookies().get("refreshToken")?.value || "";

  return refreshToken ? <DashboardHome /> : <Home />;
}
