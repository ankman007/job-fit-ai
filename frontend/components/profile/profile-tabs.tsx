"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserDetailsPanel } from "./user-details-panel";
import { CheatsheetPanel } from "./cheatsheets-panel";
import { AccountSettingsPanel } from "./account-settings-panel";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";


export function ProfileTabs() {
  const user = useSelector((state: RootState) => state.user);

  const userDetailsData = {
    name: user.username,
    jobTitle: user.job_title,
    location: user.location,
    bio: user.bio,
  }

  const accountSettingsData = {
    name: user.username,
    email: user.email,
  }

  return (
    <Tabs defaultValue="cheatsheets" className="w-full">
      <TabsList className="grid grid-cols-3 mb-8">
        <TabsTrigger value="cheatsheets">Cheatsheets</TabsTrigger>
        <TabsTrigger value="user-details">User Details</TabsTrigger>
        <TabsTrigger value="account-settings">Account Settings</TabsTrigger>
      </TabsList>

      <TabsContent value="cheatsheets">
        <CheatsheetPanel />
      </TabsContent>

      <TabsContent value="user-details">
        <UserDetailsPanel userData={userDetailsData} />
      </TabsContent>

      <TabsContent value="account-settings">
        <AccountSettingsPanel settingsData={accountSettingsData} />
      </TabsContent>
    </Tabs>
  );
}
