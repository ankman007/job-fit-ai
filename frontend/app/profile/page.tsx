import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, User, Settings, Briefcase } from "lucide-react"

// Mock user data - in a real app, this would come from an API or auth provider
const userData = {
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  jobTitle: "Senior Software Engineer",
  location: "San Francisco, CA",
  bio: "Passionate software engineer with 8+ years of experience in full-stack development.",
  cheatsheets: [
    { title: "Senior Frontend Developer", company: "TechCorp", date: "Apr 15, 2023" },
    { title: "Full Stack Engineer", company: "InnovateTech", date: "May 2, 2023" },
    { title: "React Developer", company: "WebSolutions", date: "Jun 18, 2023" },
  ],
  savedJobs: [
    { title: "Senior Frontend Developer", company: "TechCorp", location: "San Francisco, CA" },
    { title: "Full Stack Engineer", company: "InnovateTech", location: "Remote" },
  ],
}

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="bg-gradient-to-r from-teal-600 to-teal-500 text-white py-8">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Avatar className="h-24 w-24 border-4 border-white">
              <AvatarFallback className="text-2xl bg-teal-700 text-white">
                {userData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold">{userData.name}</h1>
              <p className="text-teal-100">{userData.email}</p>
              <p className="text-white mt-2">{userData.jobTitle}</p>
              <p className="text-teal-100">{userData.location}</p>
            </div>

            <Button variant="secondary" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Tabs defaultValue="cheatsheets" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="cheatsheets" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>Cheatsheets</span>
              </TabsTrigger>
              <TabsTrigger value="jobs" className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                <span>Saved Jobs</span>
              </TabsTrigger>
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Profile</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="cheatsheets">
            <Card>
              <CardHeader>
                <CardTitle>Your Interview Cheatsheets</CardTitle>
              </CardHeader>
              <CardContent>
                {userData.cheatsheets.length > 0 ? (
                  <div className="space-y-4">
                    {userData.cheatsheets.map((sheet, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50"
                      >
                        <div>
                          <h3 className="font-medium">{sheet.title}</h3>
                          <p className="text-sm text-gray-500">
                            {sheet.company} • {sheet.date}
                          </p>
                        </div>
                        <Button size="sm">View</Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">You haven't created any interview cheatsheets yet</p>
                    <Button>Create Your First Cheatsheet</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="jobs">
            <Card>
              <CardHeader>
                <CardTitle>Saved Jobs</CardTitle>
              </CardHeader>
              <CardContent>
                {userData.savedJobs.length > 0 ? (
                  <div className="space-y-4">
                    {userData.savedJobs.map((job, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50"
                      >
                        <div>
                          <h3 className="font-medium">{job.title}</h3>
                          <p className="text-sm text-gray-500">
                            {job.company} • {job.location}
                          </p>
                        </div>
                        <Button size="sm" variant="outline">
                          Apply
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">You haven't saved any jobs yet</p>
                    <Button>Browse Jobs</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Bio</h3>
                    <p>{userData.bio}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Email</h3>
                    <p>{userData.email}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Job Title</h3>
                    <p>{userData.jobTitle}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Location</h3>
                    <p>{userData.location}</p>
                  </div>

                  <div className="pt-4">
                    <Button>Edit Profile</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </main>
  )
}
