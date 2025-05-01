import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProfileTabs } from "@/components/profile/profile-tabs"
import { ProfileHeader } from "@/components/profile/profile-header"
import { userData } from "@/lib/mock-user-data"

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <ProfileHeader user={userData} />

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <ProfileTabs user={userData} />
      </div>

      <Footer />
    </main>
  )
}
