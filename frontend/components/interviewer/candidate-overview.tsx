import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MapPin, Mail, Phone, Globe, Linkedin, Github } from "lucide-react"

interface CandidateOverviewProps {
  data: {
    name: string
    email: string
    phone: string
    location: string
    website?: string
    linkedin?: string
    github?: string
    appliedPosition: string
    topSkills: string[]
    summary: string
  }
}

export function CandidateOverview({ data }: CandidateOverviewProps) {
  console.log("CandidateOverview data", data);
  const initials = data.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2)

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Candidate Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center text-center mb-6">
          <Avatar className="h-24 w-24 mb-4">
            <AvatarFallback className="text-xl bg-teal-100 text-teal-700">{initials}</AvatarFallback>
          </Avatar>
          <h3 className="text-xl font-semibold">{data.name}</h3>
          <p className="text-gray-500">{data.appliedPosition}</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <Mail className="h-4 w-4 mr-2 text-gray-500" />
              <span>{data.email}</span>
            </div>
            <div className="flex items-center text-sm">
              <Phone className="h-4 w-4 mr-2 text-gray-500" />
              <span>{data.phone}</span>
            </div>
            <div className="flex items-center text-sm">
              <MapPin className="h-4 w-4 mr-2 text-gray-500" />
              <span>{data.location}</span>
            </div>
            {data.website && (
              <div className="flex items-center text-sm">
                <Globe className="h-4 w-4 mr-2 text-gray-500" />
                <a
                  href={data.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-600 hover:underline"
                >
                  Personal Website
                </a>
              </div>
            )}
            {data.linkedin && (
              <div className="flex items-center text-sm">
                <Linkedin className="h-4 w-4 mr-2 text-gray-500" />
                <a
                  href={data.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-600 hover:underline"
                >
                  LinkedIn Profile
                </a>
              </div>
            )}
            {data.github && (
              <div className="flex items-center text-sm">
                <Github className="h-4 w-4 mr-2 text-gray-500" />
                <a
                  href={data.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-600 hover:underline"
                >
                  GitHub Profile
                </a>
              </div>
            )}
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Top Skills</h4>
            <div className="flex flex-wrap gap-2">
              {data.topSkills.map((skill, index) => (
                <Badge key={index} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Summary</h4>
            <p className="text-sm text-gray-600">{data.summary}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
