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

  const cheatsheets = useSelector((state: RootState) => state.cheatsheets.cheatsheets);
  const sheet = cheatsheets.find((cs) => Number(cs.id) === Number(27));

  console.log('Found cheatsheet:', cheatsheets);
  console.log('Found sheet:', sheet);

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