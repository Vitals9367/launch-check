"use client"

import { useState } from "react"
import Link from "next/link"
import { Globe, ChevronDown, LinkIcon, Plus, AlertTriangle, CheckCircle, Pencil } from "lucide-react"
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
const mockWebsites = [
  {
    id: 101,
    name: "Shop Frontend",
    url: "https://shop.example.com",
    description: "Main e-commerce storefront",
    lastScan: "2023-04-15T10:30:00Z",
    status: "secure",
    vulnerabilities: 0,
    urls: [
      { id: 1001, path: "/products", lastScan: "2023-04-15T10:30:00Z", vulnerabilities: 0 },
      { id: 1002, path: "/checkout", lastScan: "2023-04-15T10:30:00Z", vulnerabilities: 0 },
    ],
  },
  {
    id: 102,
    name: "Admin Dashboard",
    url: "https://admin.example.com",
    description: "Administrative backend for the e-commerce platform",
    lastScan: "2023-04-14T14:45:00Z",
    status: "vulnerable",
    vulnerabilities: 3,
    urls: [
      { id: 1003, path: "/users", lastScan: "2023-04-14T14:45:00Z", vulnerabilities: 2 },
      { id: 1004, path: "/orders", lastScan: "2023-04-14T14:45:00Z", vulnerabilities: 1 },
    ],
  },
  {
    id: 201,
    name: "Main Website",
    url: "https://www.example.com",
    description: "Company landing pages and blog",
    lastScan: "2023-04-10T09:15:00Z",
    status: "secure",
    vulnerabilities: 0,
    urls: [
      { id: 2001, path: "/", lastScan: "2023-04-10T09:15:00Z", vulnerabilities: 0 },
      { id: 2002, path: "/blog", lastScan: "2023-04-10T09:15:00Z", vulnerabilities: 0 },
    ],
  },
  {
    id: 301,
    name: "Support Portal",
    url: "https://support.example.com",
    description: "Client access and support system",
    lastScan: "2023-04-12T16:20:00Z",
    status: "warning",
    vulnerabilities: 1,
    urls: [
      { id: 3001, path: "/tickets", lastScan: "2023-04-12T16:20:00Z", vulnerabilities: 1 },
      { id: 3002, path: "/knowledge-base", lastScan: "2023-04-12T16:20:00Z", vulnerabilities: 0 },
    ],
  },
]

export default function WebsitesPage() {
  const [expandedWebsites, setExpandedWebsites] = useState<number[]>([])
  const [isNewWebsiteDialogOpen, setIsNewWebsiteDialogOpen] = useState(false)

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

  const getStatusBadge = (status: string, vulnerabilities: number) => {
    switch (status) {
      case "secure":
        return <Badge className="bg-green-500">Secure</Badge>
      case "warning":
        return (
          <Badge className="bg-yellow-500">
            {vulnerabilities} {vulnerabilities === 1 ? "Issue" : "Issues"}
          </Badge>
        )
      case "vulnerable":
        return (
          <Badge className="bg-red-500">
            {vulnerabilities} {vulnerabilities === 1 ? "Issue" : "Issues"}
          </Badge>
        )
      default:
        return <Badge>Unknown</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "secure":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case "vulnerable":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      default:
        return null
    }
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Websites</h1>
          <p className="text-gray-500">Manage your websites and security scans</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button className="bg-red-600 hover:bg-red-700" onClick={() => setIsNewWebsiteDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Website
          </Button>
        </div>
      </div>

      {/* Websites List */}
      <Card>
        <CardHeader>
          <CardTitle>Your Websites</CardTitle>
          <CardDescription>Manage your websites for security scanning</CardDescription>
        </CardHeader>
        <CardContent>
          {mockWebsites.length === 0 ? (
            <div className="text-center p-8">
              <Globe className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <h3 className="font-medium text-gray-900">No websites yet</h3>
              <p className="text-gray-500 mt-1">Add your first website to start scanning for vulnerabilities</p>
              <Button className="mt-4 bg-red-600 hover:bg-red-700" onClick={() => setIsNewWebsiteDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add First Website
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {mockWebsites.map((website) => (
                <div key={website.id} className="border rounded-lg overflow-hidden">
                  <div
                    className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
                    onClick={() => toggleWebsite(website.id)}
                  >
                    <div className="flex items-center">
                      {getStatusIcon(website.status)}
                      <div className="ml-3">
                        <Link href={`/dashboard/websites/${website.id}`} className="font-medium hover:underline">
                          {website.name}
                        </Link>
                        <p className="text-xs text-gray-500">{website.url}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {getStatusBadge(website.status, website.vulnerabilities)}
                      <div className="flex space-x-1 ml-4">
                        <Link href={`/dashboard/websites/${website.id}`}>
                          <Button variant="ghost" size="icon" className="w-8 h-8 text-gray-500">
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">View Website</span>
                          </Button>
                        </Link>
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
                          <div key={url.id} className="bg-white border rounded p-2 flex items-center justify-between">
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
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* New Website Dialog */}
      <Dialog open={isNewWebsiteDialogOpen} onOpenChange={setIsNewWebsiteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Website</DialogTitle>
            <DialogDescription>Add a website to start security scanning</DialogDescription>
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
            <div className="space-y-2">
              <Label htmlFor="website-description">Description (optional)</Label>
              <Textarea id="website-description" placeholder="Describe your website..." />
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
