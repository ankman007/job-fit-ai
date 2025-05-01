import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Settings, FileText, Award } from "lucide-react"
import Link from "next/link"

interface ProfileHeaderProps {
  user: {
    name: string
    email: string
    avatarUrl?: string
    jobTitle?: string
    location?: string
    memberSince: string
    totalCheatsheets: number
    savedJobs: number
  }
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2)

  return (
    <div className="bg-gradient-to-r from-teal-600 to-teal-500 text-white">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <Avatar className="h-24 w-24 border-4 border-white">
            {user.avatarUrl ? (
              <AvatarImage src={user.avatarUrl || "/placeholder.svg"} alt={user.name} />
            ) : (
              <AvatarFallback className="text-2xl bg-teal-700 text-white">{initials}</AvatarFallback>
            )}
          </Avatar>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <p className="text-teal-100">{user.email}</p>

            <div className="mt-2">
              {user.jobTitle && <p className="text-white">{user.jobTitle}</p>}
              {user.location && <p className="text-teal-100">{user.location}</p>}
            </div>
          </div>

          <div className="mt-4 md:mt-0">
            <Button variant="secondary" size="sm" asChild>
              <Link href="/profile/settings">
                <Settings className="h-4 w-4 mr-2" />
                Edit Profile
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
