"use client"

import { useState } from "react"
import Link from "next/link"
import { Folder, Globe, ChevronDown, LinkIcon, Plus, AlertTriangle, Pencil } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

// Mock data
const mockProjects = [
  {
    id: "project-1",
    name: "E-commerce Platform",
    description: "Main online store and payment system",
    websites: [
      {
        id: 101,
        name: "Shop Frontend",
        url: "https://shop.example.com",
        lastScan: "2023-04-15T10:30:00Z",
        status: "secure",
        urls: [
          { id: 1001, path: "/products", lastScan: "2023-04-15T10:30:00Z", vulnerabilities: 0 },
          { id: 1002, path: "/checkout", lastScan: "2023-04-15T10:30:00Z", vulnerabilities: 0 },
        ],
      },
      {
        id: 102,
        name: "Admin Dashboard",
        url: "https://admin.example.com",
        lastScan: "2023-04-14T14:45:00Z",
        status: "vulnerable",
        urls: [
          { id: 1003, path: "/users", lastScan: "2023-04-14T14:45:00Z", vulnerabilities: 2 },
          { id: 1004, path: "/orders", lastScan: "2023-04-14T14:45:00Z", vulnerabilities: 1 },
        ],
      },
    ],
  },
  {
    id: "project-2",
    name: "Marketing Website",
    description: "Company landing pages and blog",
    websites: [
      {
        id: 201,
        name: "Main Website",
        url: "https://www.example.com",
        lastScan: "2023-04-10T09:15:00Z",
        status: "secure",
        urls: [
          { id: 2001, path: "/", lastScan: "2023-04-10T09:15:00Z", vulnerabilities: 0 },
          { id: 2002, path: "/blog", lastScan: "2023-04-10T09:15:00Z", vulnerabilities: 0 },
        ],
      },
    ],
  },
  {
    id: "project-3",
    name: "Customer Portal",
    description: "Client access and support system",
    websites: [
      {
        id: 301,
        name: "Support Portal",
        url: "https://support.example.com",
        lastScan: "2023-04-12T16:20:00Z",
        status: "warning",
        urls: [
          { id: 3001, path: "/tickets", lastScan: "2023-04-12T16:20:00Z", vulnerabilities: 1 },
          { id: 3002, path: "/knowledge-base", lastScan: "2023-04-12T16:20:00Z", vulnerabilities: 0 },
        ],
      },
    ],
  },
]

export default function ProjectsPage() {
  const [expandedProjects, setExpandedProjects] = useState<string[]>([])
  const [expandedWebsites, setExpandedWebsites] = useState<number[]>([])
  const [isNewProjectDialogOpen, setIsNewProjectDialogOpen] = useState(false)
  const [isNewWebsiteDialogOpen, setIsNewWebsiteDialogOpen] = useState(false)
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)

  const toggleProject = (projectId: string) => {
    setExpandedProjects((prev) =>
      prev.includes(projectId) ? prev.filter((id) => id !== projectId) : [...prev, projectId],
    )
  }

  const toggleWebsite = (websiteId: number) => {
    setExpandedWebsites((prev) =>
      prev.includes(websiteId) ? prev.filter((id) => id !== websiteId) : [...prev, websiteId],
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const handleAddWebsiteClick = (projectId: string) => {
    setSelectedProjectId(projectId)
    setIsNewWebsiteDialogOpen(true)
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-500">Manage your security projects and websites</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button className="bg-red-600 hover:bg-red-700" onClick={() => setIsNewProjectDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>
      </div>

      {/* Projects List */}
      <Card>
        <CardHeader>
          <CardTitle>Your Projects</CardTitle>
          <CardDescription>Organize your websites and URLs for security scanning</CardDescription>
        </CardHeader>
        <CardContent>
          {mockProjects.length === 0 ? (
            <div className="text-center p-8">
              <Folder className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <h3 className="font-medium text-gray-900">No projects yet</h3>
              <p className="text-gray-500 mt-1">Create your first project to start managing website security</p>
              <Button className="mt-4 bg-red-600 hover:bg-red-700" onClick={() => setIsNewProjectDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Create First Project
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {mockProjects.map((project) => (
                <div key={project.id} className="border rounded-lg overflow-hidden">
                  <div
                    className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
                    onClick={() => toggleProject(project.id)}
                  >
                    <div className="flex items-center">
                      <Folder className="h-5 w-5 text-blue-500 mr-3" />
                      <div>
                        <p className="font-medium">{project.name}</p>
                        <p className="text-xs text-gray-500">{project.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Badge className="mr-2 bg-blue-500">{project.websites.length} websites</Badge>
                      <div className="flex space-x-1">
                        <Link href={`/dashboard/projects/${project.id}`}>
                          <Button variant="ghost" size="icon" className="w-8 h-8 text-gray-500">
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">View Project</span>
                          </Button>
                        </Link>
                        <Button variant="ghost" size="icon" className="w-8 h-8 text-gray-500">
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${expandedProjects.includes(project.id) ? "transform rotate-180" : ""}`}
                          />
                          <span className="sr-only">Toggle</span>
                        </Button>
                      </div>
                    </div>
                  </div>

                  {expandedProjects.includes(project.id) && (
                    <div className="border-t bg-gray-50 p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-sm font-medium">Websites</h4>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs"
                          onClick={() => handleAddWebsiteClick(project.id)}
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Add Website
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {project.websites.length === 0 ? (
                          <div className="text-center py-4 bg-white border rounded-lg">
                            <Globe className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                            <p className="text-sm text-gray-500">No websites in this project yet</p>
                            <Button
                              size="sm"
                              variant="link"
                              className="text-xs mt-1"
                              onClick={() => handleAddWebsiteClick(project.id)}
                            >
                              Add your first website
                            </Button>
                          </div>
                        ) : (
                          project.websites.map((website) => (
                            <div key={website.id} className="bg-white border rounded-lg overflow-hidden">
                              <div
                                className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50"
                                onClick={() => toggleWebsite(website.id)}
                              >
                                <div className="flex items-center">
                                  <Globe className="h-4 w-4 text-purple-500 mr-2" />
                                  <div>
                                    <Link href={`/dashboard/websites/${website.id}`} className="font-medium hover:underline">
                                      {website.name}
                                    </Link>
                                    <p className="text-xs text-gray-500">{website.url}</p>
                                  </div>
                                </div>
                                <div className="flex items-center">
                                  {website.status === "secure" ? (
                                    <Badge className="mr-2 bg-green-500">Secure</Badge>
                                  ) : website.status === "warning" ? (
                                    <Badge className="mr-2 bg-yellow-500">Warning</Badge>
                                  ) : (
                                    <Badge className="mr-2 bg-red-500">Vulnerable</Badge>
                                  )}
                                  <div className="flex space-x-1">
                                    <div className="flex space-x-1">
                                      <Link href={`/dashboard/websites/${website.id}`}>
                                        <Button variant="ghost" size="icon" className="w-8 h-8 text-gray-500">
                                          <Globe className="h-4 w-4" />
                                          <span className="sr-only">View</span>
                                        </Button>
                                      </Link>
                                      <Link href={`/dashboard/scan?url=${encodeURIComponent(website.url)}`}>
                                        <Button variant="ghost" size="icon" className="w-8 h-8 text-gray-500">
                                          <AlertTriangle className="h-4 w-4" />
                                          <span className="sr-only">Scan</span>
                                        </Button>
                                      </Link>
                                    </div>
                                    <Button variant="ghost" size="icon" className="w-8 h-8 text-gray-500">
                                      <ChevronDown
                                        className={`h-4 w-4 transition-transform ${expandedWebsites.includes(website.id) ? "transform rotate-180" : ""}`}
                                      />
                                      <span className="sr-only">Toggle</span>
                                    </Button>
                                  </div>
                                </div>
                              </div>

                              {expandedWebsites.includes(website.id) && (
                                <div className="border-t bg-gray-50 p-3">
                                  <div className="flex justify-between items-center mb-2">
                                    <h5 className="text-xs font-medium">Scanned URLs</h5>
                                    <Button size="sm" variant="outline" className="text-xs h-7 px-2">
                                      <Plus className="h-3 w-3 mr-1" />
                                      Add URL
                                    </Button>
                                  </div>
                                  <div className="space-y-2">
                                    {website.urls.map((url) => (
                                      <div
                                        key={url.id}
                                        className="bg-white border rounded p-2 flex items-center justify-between"
                                      >
                                        <div className="flex items-center">
                                          <LinkIcon className="h-3 w-3 text-gray-400 mr-2" />
                                          <span className="text-xs">{url.path}</span>
                                        </div>
                                        <div className="flex items-center">
                                          <span className="text-xs text-gray-500 mr-2">{formatDate(url.lastScan)}</span>
                                          <Badge
                                            className={`text-xs py-0 px-2 
                                            ${url.vulnerabilities > 0 ? "bg-red-500" : "bg-green-500"}`}
                                          >
                                            {url.vulnerabilities}
                                          </Badge>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* New Project Dialog */}
      <Dialog open={isNewProjectDialogOpen} onOpenChange={setIsNewProjectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
            <DialogDescription>Add a new project to organize your websites and scans</DialogDescription>
          </DialogHeader>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="project-name">Project Name</Label>
              <Input id="project-name" placeholder="My Project" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="project-description">Description (optional)</Label>
              <Textarea id="project-description" placeholder="Describe your project..." />
            </div>
          </form>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewProjectDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700" onClick={() => setIsNewProjectDialogOpen(false)}>
              Create Project
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Website Dialog */}
      <Dialog open={isNewWebsiteDialogOpen} onOpenChange={setIsNewWebsiteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Website</DialogTitle>
            <DialogDescription>
              Add a website to{" "}
              {selectedProjectId ? mockProjects.find((p) => p.id === selectedProjectId)?.name : "your project"}
            </DialogDescription>
          </DialogHeader>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="website-name">Website Name</Label>
              <Input id="website-name" placeholder="My Website" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website-url">Website URL</Label>
              <Input id="website-url" placeholder="https://example.com" type="url" />
            </div>
          </form>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewWebsiteDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700" onClick={() => setIsNewWebsiteDialogOpen(false)}>
              Add Website
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
