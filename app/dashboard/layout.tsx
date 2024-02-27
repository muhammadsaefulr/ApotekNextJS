import { AuthOptions } from "@/lib/auth"
import Header from "@/components/Header"
import Setting from "@/components/Setting"
import Sidebar from "@/components/Sidebar"
import SwitchMode from "@/components/SwitchMode"
import UserMenu from "@/components/UserMenu"
import { getServerSession } from "next-auth"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await getServerSession(AuthOptions)
  if (!session?.user) {
    return null
  }

  return (
    <main className='flex min-h-screen'>
      <div className='flex-1'>
        <Header>
          <SwitchMode />
          <UserMenu
            user={{
              name: session.user.name,
              image: session.user.image,
              username: session.user.username,
              email: session.user.email,
            }}
          />
        </Header>
        <Sidebar className='fixed hidden border-r xl:flex' />

        <div className='container mt-24 pb-8 xl:pl-[256px]'>{children}</div>
      </div>
    </main>
  )
}
