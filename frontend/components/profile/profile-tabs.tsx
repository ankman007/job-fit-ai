"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserDetailsPanel } from "@/components/profile/user-details-panel"
import { SavedCheatsheetsPanel } from "@/components/profile/saved-cheatsheets-panel"
import { SavedJobsPanel } from "@/components/profile/saved-jobs-panel"
import { AccountSettingsPanel } from "@/components/profile/account-settings-panel"
import { User, Briefcase, Settings, FileText } from "lucide-react"

interface ProfileTabsProps {
  user: any // Using any for simplicity, but should be properly typed in a real app
}

export function ProfileTabs({ user }: ProfileTabsProps) {
  const [activeTab, setActiveTab] = useState("cheatsheets")

  return (
    <Tabs defaultValue="cheatsheets" value={activeTab} onValueChange={setActiveTab} className="w-full">
      <div className="flex justify-center mb-8">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full max-w-2xl">
          <TabsTrigger value="cheatsheets" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Cheatsheets</span>
            <span className="sm:hidden">Sheets</span>
          </TabsTrigger>
          <TabsTrigger value="jobs" className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            <span>Jobs</span>
          </TabsTrigger>
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>Profile</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="cheatsheets" className="mt-0">
        <SavedCheatsheetsPanel cheatsheets={user.cheatsheets} />
      </TabsContent>

      <TabsContent value="jobs" className="mt-0">
        <SavedJobsPanel jobs={user.savedJobs} />
      </TabsContent>

      <TabsContent value="profile" className="mt-0">
        <UserDetailsPanel user={user} />
      </TabsContent>

      <TabsContent value="settings" className="mt-0">
        <AccountSettingsPanel user={user} />
      </TabsContent>
    </Tabs>
  )
}
