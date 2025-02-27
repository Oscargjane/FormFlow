import { auth } from "@/server/auth/config"
import { redirect } from "next/navigation"
import { api } from "@/trpc/server"
import SignOutButton from "@/app/_components/SignOutButton"

export default async function DashboardPage() {
  const session = await auth()

  if (!session) {
    redirect("/")
  }

  const authStatus = await api.users.getAuthStatus()

  return (
    <div>
      <h1>Dashboard</h1>
      <p>{authStatus.message}</p>
      <p>Email: {authStatus.email}</p>
      <SignOutButton />
    </div>
  )
}