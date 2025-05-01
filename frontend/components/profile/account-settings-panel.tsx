"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"
import { Mail, Bell, Lock } from "lucide-react"

interface AccountSettingsPanelProps {
  settingsData: {
    email: string;
    name: string;
  };
}

export function AccountSettingsPanel({ settingsData }: AccountSettingsPanelProps) {

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [jobAlerts, setJobAlerts] = useState(true)
  const [marketingEmails, setMarketingEmails] = useState(false)

  const userEmail = settingsData.email;

  const handleChangePassword = async () => {
    setIsLoading(true)
    setError(null)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast({
        title: "Password reset email sent",
        description: "Check your inbox for instructions to reset your password.",
      })
    } catch (err) {
      setError("Failed to send password reset email. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveNotificationSettings = async () => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast({
        title: "Notification settings updated",
        description: "Your notification preferences have been saved.",
      })
    } catch (err) {
      toast({
        title: "Something went wrong",
        description: "Your notification settings were not updated. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Email Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Mail className="h-5 w-5 mr-2" />
            Email Settings
          </CardTitle>
          <CardDescription>Manage your email address and preferences</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="email">Email Address</Label>
            <div className="flex gap-2 mt-1.5">
              <Input id="email" value={userEmail} disabled className="flex-1" />
              <Button variant="outline">Verify</Button>
            </div>
            <p className="text-sm text-gray-500 mt-1.5">
              Your email is used for account notifications and password resets
            </p>
          </div>

          <div className="pt-4">
            <Button variant="outline" onClick={handleChangePassword} disabled={isLoading}>
              <Lock className="h-4 w-4 mr-2" />
              Change Password
            </Button>
            {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="h-5 w-5 mr-2" />
            Notification Preferences
          </CardTitle>
          <CardDescription>Control how and when you receive notifications</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <p className="text-sm text-gray-500">Receive notifications about your account activity</p>
            </div>
            <Switch id="email-notifications" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="job-alerts">Job Alerts</Label>
              <p className="text-sm text-gray-500">Get notified about new job opportunities matching your profile</p>
            </div>
            <Switch id="job-alerts" checked={jobAlerts} onCheckedChange={setJobAlerts} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="marketing-emails">Marketing Emails</Label>
              <p className="text-sm text-gray-500">Receive updates about new features and promotions</p>
            </div>
            <Switch id="marketing-emails" checked={marketingEmails} onCheckedChange={setMarketingEmails} />
          </div>

          <div className="pt-4">
            <Button onClick={handleSaveNotificationSettings} disabled={isLoading}>
              Save Notification Settings
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Account Danger Zone */}
      <Card className="border-red-200">
        <CardHeader className="text-red-600">
          <CardTitle>Danger Zone</CardTitle>
          <CardDescription className="text-red-500">Permanent actions that cannot be undone</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Delete Account</h4>
              <p className="text-sm text-gray-500 mb-4">
                Once you delete your account, there is no going back. All of your data will be permanently removed.
              </p>
              <Button variant="destructive">Delete Account</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
