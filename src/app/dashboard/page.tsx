
// export default DashboardPage;
import { auth } from "../../config/auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth();
  // console.log("session", session);

  if (!session?.user) {
    return redirect("/");
  } else {
    redirect("/dashboard/overview");
  }
}
