"use client"

import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Clock, ExternalLink, Briefcase, DollarSign, Users } from "lucide-react"
import { useState, useEffect } from "react"

export default function JobsPage() {
  const [jobs, setJobs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [locationFilter, setLocationFilter] = useState("")
  const [typeFilter, setTypeFilter] = useState("All Types")
  const [isScrapingLive, setIsScrapingLive] = useState(false)

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async (query = "", location = "", type = "") => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (query) params.append("q", query)
      if (location) params.append("location", location)
      if (type !== "All Types") params.append("type", type)

      const response = await fetch(`/api/jobs?${params}`)
      const data = await response.json()
      setJobs(data.jobs || [])
    } catch (error) {
      console.error("Failed to fetch jobs:", error)
    } finally {
      setLoading(false)
    }
  }

  const scrapeLiveJobs = async () => {
    setIsScrapingLive(true)
    try {
      const params = new URLSearchParams()
      if (searchQuery) params.append("q", searchQuery)
      if (locationFilter) params.append("location", locationFilter)

      const response = await fetch(`/api/jobs/scrape?${params}`)
      const data = await response.json()

      if (data.jobs) {
        setJobs(data.jobs)
      }
    } catch (error) {
      console.error("Failed to scrape jobs:", error)
    } finally {
      setIsScrapingLive(false)
    }
  }

  const handleSearch = () => {
    fetchJobs(searchQuery, locationFilter, typeFilter)
  }

  const handleApply = (job: any) => {
    // Open the actual job application URL
    window.open(job.applyUrl, "_blank")
  }

  const startMockInterview = (job: any) => {
    // Navigate to mock interview with job context
    const interviewData = {
      type: "behavioral",
      role: job.title,
      company: job.company,
      userId: "user123", // This would come from auth
    }

    // Store interview context and navigate
    localStorage.setItem("mockInterviewContext", JSON.stringify(interviewData))
    window.location.href = "/mock-interviews/new"
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-slate-900">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-slate-800 px-4">
            <SidebarTrigger className="text-white" />
            <div className="flex items-center gap-2 px-4">
              <Briefcase className="w-5 h-5 text-purple-400" />
              <h1 className="text-xl font-semibold text-white">Job Search</h1>
            </div>
          </header>

          <div className="flex-1 p-6">
            {/* Search and Filters */}
            <Card className="bg-slate-800/50 border-slate-700 mb-6">
              <CardHeader>
                <CardTitle className="text-white">Find Your Dream Job</CardTitle>
                <CardDescription className="text-gray-400">
                  Search through thousands of tech jobs from top companies
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Job title, company, or skills..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-slate-700 border-slate-600 text-white"
                        onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Location..."
                        value={locationFilter}
                        onChange={(e) => setLocationFilter(e.target.value)}
                        className="pl-10 bg-slate-700 border-slate-600 text-white"
                        onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                      />
                    </div>
                  </div>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue placeholder="Job Type" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="All Types">All Types</SelectItem>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                      <SelectItem value="Contract">Contract</SelectItem>
                      <SelectItem value="Remote">Remote</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={handleSearch}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    disabled={loading}
                  >
                    <Search className="w-4 h-4 mr-2" />
                    {loading ? "Searching..." : "Search Jobs"}
                  </Button>
                  <Button
                    onClick={scrapeLiveJobs}
                    variant="outline"
                    className="border-slate-600 text-gray-300 hover:bg-slate-700 bg-transparent"
                    disabled={isScrapingLive}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {isScrapingLive ? "Scraping..." : "Get Live Jobs"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Job Results */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">{jobs.length} Jobs Found</h2>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>Updated just now</span>
                </div>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 gap-4">
                  {[...Array(3)].map((_, i) => (
                    <Card key={i} className="bg-slate-800/50 border-slate-700">
                      <CardContent className="p-6">
                        <div className="animate-pulse">
                          <div className="h-4 bg-slate-700 rounded w-1/3 mb-2"></div>
                          <div className="h-3 bg-slate-700 rounded w-1/4 mb-4"></div>
                          <div className="h-3 bg-slate-700 rounded w-full mb-2"></div>
                          <div className="h-3 bg-slate-700 rounded w-2/3"></div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {jobs.map((job) => (
                    <Card
                      key={job.id}
                      className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-colors"
                    >
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-xl font-semibold text-white">{job.title}</h3>
                              <Badge className="bg-blue-500/20 text-blue-400">{job.type}</Badge>
                            </div>
                            <div className="flex items-center space-x-4 text-gray-400 mb-3">
                              <div className="flex items-center space-x-1">
                                <Users className="w-4 h-4" />
                                <span>{job.company}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MapPin className="w-4 h-4" />
                                <span>{job.location}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <DollarSign className="w-4 h-4" />
                                <span className="text-green-400 font-medium">{job.salary}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span>{job.posted}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <p className="text-gray-300 mb-4 line-clamp-2">{job.description}</p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {job.skills.slice(0, 5).map((skill: string) => (
                            <Badge key={skill} variant="outline" className="border-slate-600 text-gray-300">
                              {skill}
                            </Badge>
                          ))}
                          {job.skills.length > 5 && (
                            <Badge variant="outline" className="border-slate-600 text-gray-400">
                              +{job.skills.length - 5} more
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-400">Source: {job.source}</div>
                          <div className="flex space-x-3">
                            <Button
                              onClick={() => startMockInterview(job)}
                              variant="outline"
                              size="sm"
                              className="border-purple-500 text-purple-400 hover:bg-purple-500/10 bg-transparent"
                            >
                              <Users className="w-4 h-4 mr-2" />
                              Start Mock Interview
                            </Button>
                            <Button
                              onClick={() => handleApply(job)}
                              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                              size="sm"
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Apply Now
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {!loading && jobs.length === 0 && (
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-12 text-center">
                    <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">No jobs found</h3>
                    <p className="text-gray-400 mb-4">
                      Try adjusting your search criteria or scraping live jobs from job boards.
                    </p>
                    <Button
                      onClick={scrapeLiveJobs}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                      disabled={isScrapingLive}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      {isScrapingLive ? "Scraping..." : "Get Live Jobs"}
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
