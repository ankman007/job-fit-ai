"use client";
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProfileTabs } from "@/components/profile/profile-tabs"
import { ProfileHeader } from "@/components/profile/profile-header"
import withAuth from "@/hoc/withAuth";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

function ProfilePage() {
  const userDetails = useSelector((state: RootState) => state.user);

  const userData = {
    name: userDetails.username,
    email: userDetails.email,
    jobTitle: userDetails.job_title,
    location: userDetails.location
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <ProfileHeader userDetails={userData} />

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <ProfileTabs />
      </div>

      <Footer />
    </main>
  )
}

export default withAuth(ProfilePage);