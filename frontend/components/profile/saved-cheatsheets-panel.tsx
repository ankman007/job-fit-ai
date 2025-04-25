"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Eye, Download, Trash2, Share2, Search, Calendar, Building, FileText } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"

interface CheatsheetProps {
  id: string
  jobTitle: string
  company: string
  createdAt: string
  lastViewed?: string
  status: "completed" | "in-progress" | "draft"
}

interface SavedCheatsheetsPanelProps {
  cheatsheets: CheatsheetProps[]
}

export function SavedCheatsheetsPanel({ cheatsheets }: SavedCheatsheetsPanelProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [filterStatus, setFilterStatus] = useState("all")

  // Filter and sort cheatsheets
  const filteredCheatsheets = cheatsheets
    .filter((sheet) => {
      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return sheet.jobTitle.toLowerCase().includes(query) || sheet.company.toLowerCase().includes(query)
      }

      // Filter by status
      if (filterStatus !== "all") {
        return sheet.status === filterStatus
      }

      return true
    })
    .sort((a, b) => {
      // Sort by selected option
      if (sortBy === "newest") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      } else if (sortBy === "oldest") {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      } else if (sortBy === "company") {
        return a.company.localeCompare(b.company)
      } else {
        return a.jobTitle.localeCompare(b.jobTitle)
      }
    })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>
      case "in-progress":
        return <Badge className="bg-amber-500">In Progress</Badge>
      case "draft":
        return <Badge className="bg-gray-500">Draft</Badge>
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
          <Input
            placeholder="Search cheatsheets..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 whitespace-nowrap">Filter:</span>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 whitespace-nowrap">Sort by:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="company">Company</SelectItem>
                <SelectItem value="job">Job Title</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {filteredCheatsheets.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <FileText className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No cheatsheets found</h3>
          <p className="text-gray-500 mb-4">
            {searchQuery ? "Try adjusting your search or filters" : "You haven't created any interview cheatsheets yet"}
          </p>
          <Button asChild>
            <Link href="/">Create Your First Cheatsheet</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCheatsheets.map((sheet) => (
            <Card key={sheet.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{sheet.jobTitle}</CardTitle>
                    <div className="flex items-center text-gray-500 mt-1">
                      <Building className="h-4 w-4 mr-1" />
                      <span className="text-sm">{sheet.company}</span>
                    </div>
                  </div>
                  {getStatusBadge(sheet.status)}
                </div>
              </CardHeader>

              <CardContent className="pb-3">
                <div className="flex flex-col gap-2 text-sm">
                  <div className="flex items-center text-gray-500">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Created: {formatDate(sheet.createdAt)}</span>
                  </div>
                  {sheet.lastViewed && (
                    <div className="flex items-center text-gray-500">
                      <Eye className="h-4 w-4 mr-2" />
                      <span>Last viewed: {formatDate(sheet.lastViewed)}</span>
                    </div>
                  )}
                </div>
              </CardContent>

              <CardFooter className="pt-0 flex justify-between">
                <Button variant="default" size="sm" asChild>
                  <Link href={`/results/${sheet.id}`}>
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Link>
                </Button>

                <div className="flex gap-2">
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <Download className="h-4 w-4" />
                    <span className="sr-only">Download</span>
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <Share2 className="h-4 w-4" />
                    <span className="sr-only">Share</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
