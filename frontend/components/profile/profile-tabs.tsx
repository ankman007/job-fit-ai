"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserDetailsPanel } from "./user-details-panel"
import { CandidateCheatsheetPanel } from "./candidate-cheatsheets-panel"
import { InterviewerCheatsheetPanel } from "./interviewer-cheatsheets-panel"
import { AccountSettingsPanel } from "./account-settings-panel"
import { userData } from "@/lib/mock-user-data"

export function ProfileTabs() {
  return (
    <Tabs defaultValue="candidate-cheatsheets" className="w-full">
      <TabsList className="grid grid-cols-4 mb-8">
        <TabsTrigger value="candidate-cheatsheets">Candidate Cheatsheets</TabsTrigger>
        <TabsTrigger value="interviewer-cheatsheets">Interviewer Cheatsheets</TabsTrigger>
        <TabsTrigger value="user-details">User Details</TabsTrigger>
        <TabsTrigger value="account-settings">Account Settings</TabsTrigger>
      </TabsList>

      <TabsContent value="candidate-cheatsheets">
        <CandidateCheatsheetPanel cheatsheets={userData.candidateCheatsheets} />
      </TabsContent>

      <TabsContent value="interviewer-cheatsheets">
        <InterviewerCheatsheetPanel cheatsheets={userData.interviewerCheatsheets} />
      </TabsContent>

      <TabsContent value="user-details">
        <UserDetailsPanel user={userData} />
      </TabsContent>

      <TabsContent value="account-settings">
        <AccountSettingsPanel settings={userData.accountSettings} />
      </TabsContent>
    </Tabs>
  )
}
