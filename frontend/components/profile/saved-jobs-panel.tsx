import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Briefcase, MapPin, Calendar, ExternalLink, Search, Building } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"

interface SavedJob {
  id: string
  title: string
  company: string
  location: string
  type: string // full-time, part-time, contract, etc.
  savedAt: string
  url: string
  status: "applied" | "saved" | "interviewing"
}

interface SavedJobsPanelProps {
  jobs: SavedJob[]
}

export function SavedJobsPanel({ jobs }: SavedJobsPanelProps) {
  // This is a simplified version without state management
  // In a real app, you would add filtering, sorting, and search functionality

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "applied":
        return <Badge className="bg-blue-500">Applied</Badge>
      case "interviewing":
        return <Badge className="bg-purple-500">Interviewing</Badge>
      case "saved":
        return <Badge className="bg-gray-500">Saved</Badge>
      default:
        return null
    }
  }

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM d, yyyy")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input placeholder="Search saved jobs..." className="pl-10" />
        </div>
      </div>

      {jobs.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Briefcase className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No saved jobs</h3>
          <p className="text-gray-500 mb-4">You haven't saved any jobs yet</p>
          <Button asChild>
            <Link href="/">Browse Jobs</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <Card key={job.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium">{job.title}</h3>
                    <div className="flex items-center text-gray-500 mt-1">
                      <Building className="h-4 w-4 mr-1" />
                      <span className="text-sm">{job.company}</span>
                    </div>
                  </div>
                  {getStatusBadge(job.status)}
                </div>
              </CardHeader>

              <CardContent className="pb-3">
                <div className="flex flex-col gap-2 text-sm">
                  <div className="flex items-center text-gray-500">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <Briefcase className="h-4 w-4 mr-2" />
                    <span>{job.type}</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Saved on {formatDate(job.savedAt)}</span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="pt-0 flex justify-between">
                <Button variant="default" size="sm" asChild>
                  <a href={job.url} target="_blank" rel="noopener noreferrer">
                    View Job
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </a>
                </Button>

                <Button variant="outline" size="sm">
                  {job.status === "applied" ? "Applied" : "Apply Now"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
