"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  ArrowLeft,
  Globe,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  Calendar,
  LinkIcon,
  ExternalLink,
  Pencil,
  Trash2,
  RefreshCw,
  Plus,
  Settings,
  BarChart,
  List,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

// Mock website data
const mockWebsiteData = {
  id: 102,
  name: "Admin Dashboard",
  url: "https://admin.example.com",
  description: "Administrative backend for the e-commerce platform",
  createdAt: "2023-01-20T14:30:00Z",
  lastScan: "2023-04-14T14:45:00Z",
  status: "vulnerable",
  vulnerabilities: 3,
  scannedUrls: [
    { path: "/", vulnerabilities: 0, status: "secure", lastScan: "2023-04-14T14:45:00Z" },
    { path: "/login", vulnerabilities: 0, status: "secure", lastScan: "2023-04-14T14:45:00Z" },
    { path: "/admin", vulnerabilities: 1, status: "vulnerable", lastScan: "2023-04-14T14:45:00Z" },
    { path: "/users", vulnerabilities: 2, status: "vulnerable", lastScan: "2023-04-14T14:45:00Z" },
    { path: "/products", vulnerabilities: 0, status: "secure", lastScan: "2023-04-14T14:45:00Z" },
    { path: "/orders", vulnerabilities: 0, status: "secure", lastScan: "2023-04-14T14:45:00Z" },
    { path: "/settings", vulnerabilities: 0, status: "secure", lastScan: "2023-04-14T14:45:00Z" },
    { path: "/api/users", vulnerabilities: 0, status: "secure", lastScan: "2023-04-14T14:45:00Z" },
  ],
  scanHistory: [
    {
      id: "scan-123456",
      date: "2023-04-14T14:45:00Z",
      status: "vulnerable",
      vulnerabilities: 3,
      duration: "2m 20s",
    },
    {
      id: "scan-123123",
      date: "2023-03-10T11:30:00Z",
      status: "vulnerable",
      vulnerabilities: 4,
      duration: "2m 15s",
    },
    {
      id: "scan-122222",
      date: "2023-02-05T09:15:00Z",
      status: "warning",
      vulnerabilities: 2,
      duration: "1m 55s",
    },
    {
      id: "scan-121111",
      date: "2023-01-20T16:40:00Z",
      status: "secure",
      vulnerabilities: 0,
      duration: "1m 45s",
    },
  ],
  securityScore: {
    score: "D",
    value: 35,
    label: "Poor",
    description: "Serious security vulnerabilities detected",
  },
}

export default function WebsitePage() {
  const params = useParams()
  const websiteId = params.websiteId as string
  const website = mockWebsiteData // In a real app, fetch the website data based on websiteId

  const [isScanning, setIsScanning] = useState(false)
  const [isEditWebsiteDialogOpen, setIsEditWebsiteDialogOpen] = useState(false)
  const [isDeleteWebsiteDialogOpen, setIsDeleteWebsiteDialogOpen] = useState(false)
  const [isAddUrlDialogOpen, setIsAddUrlDialogOpen] = useState(false)
  const [deleteConfirmation, setDeleteConfirmation] = useState("")

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const handleScan = () => {
    setIsScanning(true)
    // In a real app, trigger a new scan
    setTimeout(() => {
      setIsScanning(false)
    }, 2000)
  }

  const getScoreColor = (score: string) => {
    switch (score) {
      case "A+":
      case "A":
        return "text-green-600 bg-green-50 border-green-200"
      case "B":
        return "text-blue-600 bg-blue-50 border-blue-200"
      case "C":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "D":
        return "text-orange-600 bg-orange-50 border-orange-200"
      case "F":
        return "text-red-600 bg-red-50 border-red-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
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
      {/* Breadcrumb and actions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <div className="flex items-center mb-2">
            <Link href="/dashboard/websites" className="text-gray-500 hover:text-gray-700 flex items-center">
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span>Back to Websites</span>
            </Link>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            {getStatusIcon(website.status)}
            <span className="ml-2">{website.name}</span>
          </h1>
          <div className="flex items-center mt-1">
            <a
              href={website.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-500 hover:underline flex items-center"
            >
              {website.url}
              <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </div>
        </div>
        <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
          <Button variant="outline" className="flex items-center" onClick={() => setIsEditWebsiteDialogOpen(true)}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit Website
          </Button>
          <Button
            variant="outline"
            className="flex items-center text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
            onClick={() => setIsDeleteWebsiteDialogOpen(true)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
          <Button className="bg-red-600 hover:bg-red-700" onClick={handleScan} disabled={isScanning}>
            <Shield className="mr-2 h-4 w-4" />
            {isScanning ? "Scanning..." : "Scan Now"}
          </Button>
        </div>
      </div>

      {/* Website Overview */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Website Overview</CardTitle>
          <CardDescription>Summary of the website's security status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Globe className="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Website URL</p>
                    <p className="font-medium flex items-center">
                      {website.url}
                      <a
                        href={website.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-1 text-gray-400 hover:text-gray-600"
                      >
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Added On</p>
                    <p className="font-medium">{formatDate(website.createdAt)}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Last Scan</p>
                    <p className="font-medium">{formatDate(website.lastScan)}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <LinkIcon className="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">URLs Scanned</p>
                    <p className="font-medium">{website.scannedUrls.length} URLs</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex flex-col items-center">
                <div className={`text-center p-6 rounded-lg mb-4 ${getScoreColor(website.securityScore.score)}`}>
                  <div className="flex items-center justify-center mb-2">
                    <div
                      className={`text-4xl font-bold h-16 w-16 rounded-full flex items-center justify-center border-2 ${getScoreColor(website.securityScore.score)}`}
                    >
                      {website.securityScore.score}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold">{website.securityScore.label} Security Rating</h3>
                  <p className="text-sm mt-1">{website.securityScore.description}</p>
                </div>

                <div className="w-full space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Security Score</span>
                    <span className="font-medium">{website.securityScore.value}/100</span>
                  </div>
                  <Progress value={website.securityScore.value} className="h-2" />

                  <div className="flex justify-between text-sm mt-4">
                    <span>Vulnerabilities</span>
                    <span className="font-medium">{website.vulnerabilities}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Secure URLs</span>
                    <span className="font-medium">
                      {website.scannedUrls.filter((url) => url.status === "secure").length} of{" "}
                      {website.scannedUrls.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for different views */}
      <Tabs defaultValue="urls" className="mb-6">
        <TabsList>
          <TabsTrigger value="urls" className="flex items-center">
            <List className="h-4 w-4 mr-2" />
            URLs
          </TabsTrigger>
          <TabsTrigger value="scans" className="flex items-center">
            <BarChart className="h-4 w-4 mr-2" />
            Scan History
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="urls" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Scanned URLs</CardTitle>
                <CardDescription>{website.scannedUrls.length} URLs have been scanned on this website</CardDescription>
              </div>
              <Button onClick={() => setIsAddUrlDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add URL
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {website.scannedUrls.map((url, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      {url.status === "secure" ? (
                        <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                      ) : url.status === "warning" ? (
                        <AlertTriangle className="h-4 w-4 text-yellow-500 mr-3" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-red-500 mr-3" />
                      )}
                      <div>
                        <p className="font-medium">
                          {website.url}
                          {url.path}
                        </p>
                        <p className="text-xs text-gray-500">Last scanned: {formatDate(url.lastScan)}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {url.vulnerabilities > 0 ? (
                        <Badge className={url.status === "vulnerable" ? "bg-red-500" : "bg-yellow-500"}>
                          {url.vulnerabilities} {url.vulnerabilities === 1 ? "issue" : "issues"}
                        </Badge>
                      ) : (
                        <Badge className="bg-green-500">Secure</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scans" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Scan History</CardTitle>
              <CardDescription>Previous security scans for this website</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {website.scanHistory.map((scan) => (
                  <Link key={scan.id} href={`/dashboard/scans/${scan.id}`}>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                      <div className="flex items-center">
                        {scan.status === "secure" ? (
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                        ) : scan.status === "warning" ? (
                          <AlertTriangle className="h-5 w-5 text-yellow-500 mr-3" />
                        ) : (
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-3" />
                        )}
                        <div>
                          <p className="font-medium">Scan on {formatDate(scan.date)}</p>
                          <p className="text-xs text-gray-500">Duration: {scan.duration}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {scan.vulnerabilities > 0 ? (
                          <Badge className={scan.status === "vulnerable" ? "bg-red-500" : "bg-yellow-500"}>
                            {scan.vulnerabilities} {scan.vulnerabilities === 1 ? "issue" : "issues"}
                          </Badge>
                        ) : (
                          <Badge className="bg-green-500">Secure</Badge>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={handleScan} disabled={isScanning}>
                <RefreshCw className={`mr-2 h-4 w-4 ${isScanning ? "animate-spin" : ""}`} />
                {isScanning ? "Scanning..." : "Run New Scan"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Website Settings</CardTitle>
              <CardDescription>Configure website details and scan preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="website-name">Website Name</Label>
                  <Input id="website-name" defaultValue={website.name} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website-url">Website URL</Label>
                  <Input id="website-url" defaultValue={website.url} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website-description">Description</Label>
                  <Textarea id="website-description" defaultValue={website.description} />
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium text-lg mb-4">Scan Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Automatic Scanning</Label>
                        <p className="text-sm text-gray-500">Schedule regular security scans</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <select className="border rounded p-2">
                          <option>Weekly</option>
                          <option>Daily</option>
                          <option>Monthly</option>
                          <option>Never</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Scan Depth</Label>
                        <p className="text-sm text-gray-500">How thoroughly to scan the website</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <select className="border rounded p-2">
                          <option>Standard</option>
                          <option>Deep</option>
                          <option>Quick</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium text-lg mb-4">Danger Zone</h3>
                  <div className="bg-red-50 border border-red-200 rounded-md p-4">
                    <h4 className="font-medium text-red-800 mb-2">Delete Website</h4>
                    <p className="text-sm text-red-700 mb-4">
                      This action cannot be undone. This will permanently delete the website and all associated scan
                      data.
                    </p>
                    <Button variant="destructive" onClick={() => setIsDeleteWebsiteDialogOpen(true)}>
                      Delete Website
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-red-600 hover:bg-red-700">Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Website Dialog */}
      <Dialog open={isEditWebsiteDialogOpen} onOpenChange={setIsEditWebsiteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Website</DialogTitle>
            <DialogDescription>Update your website details</DialogDescription>
          </DialogHeader>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-website-name">Website Name</Label>
              <Input id="edit-website-name" defaultValue={website.name} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-website-url">Website URL</Label>
              <Input id="edit-website-url" defaultValue={website.url} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-website-description">Description</Label>
              <Textarea id="edit-website-description" defaultValue={website.description} />
            </div>
          </form>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditWebsiteDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700" onClick={() => setIsEditWebsiteDialogOpen(false)}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Website Dialog */}
      <Dialog open={isDeleteWebsiteDialogOpen} onOpenChange={setIsDeleteWebsiteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-red-600 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Delete Website
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the website and all associated scan data.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <p className="text-sm text-red-800">
                To confirm, please type the website name: <strong>{website.name}</strong>
              </p>
            </div>
            <Input
              value={deleteConfirmation}
              onChange={(e) => setDeleteConfirmation(e.target.value)}
              placeholder="Enter website name"
              className="border-red-200 focus:border-red-400"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteWebsiteDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              disabled={deleteConfirmation !== website.name}
              onClick={() => {
                setIsDeleteWebsiteDialogOpen(false)
                // In a real app, delete the website and redirect
              }}
            >
              Delete Website
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add URL Dialog */}
      <Dialog open={isAddUrlDialogOpen} onOpenChange={setIsAddUrlDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add URL to Scan</DialogTitle>
            <DialogDescription>Add a specific URL path to scan on {website.name}</DialogDescription>
          </DialogHeader>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="url-path">URL Path</Label>
              <div className="flex items-center">
                <span className="bg-gray-100 p-2 border border-r-0 rounded-l-md text-gray-500">{website.url}</span>
                <Input id="url-path" placeholder="/path/to/scan" className="rounded-l-none" />
              </div>
              <p className="text-xs text-gray-500">Enter the path you want to scan, e.g., /admin or /api/users</p>
            </div>
          </form>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddUrlDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700" onClick={() => setIsAddUrlDialogOpen(false)}>
              Add URL
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
