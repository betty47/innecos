"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  Leaf,
  LayoutDashboard,
  Factory,
  Users,
  MessageSquare,
  BarChart3,
  Settings,
  Search,
  Filter,
  Star,
  Clock,
  CheckCircle,
  AlertTriangle,
  Eye,
  Reply,
  Archive,
  LogOut,
  User,
  Shield,
  Cog,
  Lock,
} from "lucide-react"
import Link from "next/link"

// Mock feedback data
const mockFeedback = [
  {
    id: 1,
    customer: "AgriCorp Ltd",
    customerEmail: "contact@agricorp.com",
    product: "Grain Dryer Model X1",
    rating: 5,
    subject: "Excellent Performance",
    message:
      "The grain dryer has exceeded our expectations. The automated temperature control works perfectly and has significantly improved our grain quality. Highly recommend!",
    date: "2024-01-15",
    status: "New",
    priority: "Medium",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    customer: "Farm Valley Co-op",
    customerEmail: "info@farmvalley.com",
    product: "Maize Mill Pro",
    rating: 4,
    subject: "Good Service, Fast Delivery",
    message:
      "The maize mill arrived on time and installation was smooth. Performance is good, though we'd like to see some improvements in the noise level during operation.",
    date: "2024-01-14",
    status: "In Progress",
    priority: "Low",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    customer: "Green Fields",
    customerEmail: "admin@greenfields.com",
    product: "Oil Presser Elite",
    rating: 5,
    subject: "Outstanding Technical Support",
    message:
      "Not only is the oil presser fantastic, but your technical support team went above and beyond to help us optimize our setup. Excellent customer service!",
    date: "2024-01-13",
    status: "Resolved",
    priority: "High",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    customer: "Harvest Solutions",
    customerEmail: "sales@harvestsol.com",
    product: "Feed Processor 2000",
    rating: 2,
    subject: "Issues with Feed Processor",
    message:
      "We've been experiencing frequent breakdowns with the feed processor. The mixing mechanism seems to jam regularly, causing production delays. Need urgent support.",
    date: "2024-01-12",
    status: "New",
    priority: "High",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    customer: "Prairie Farms Inc",
    customerEmail: "contact@prairiefarms.com",
    product: "Silo Storage System",
    rating: 4,
    subject: "Great Storage Solution",
    message:
      "The silo system has been working well for our grain storage needs. Easy to assemble and maintain. Would appreciate more detailed documentation for maintenance procedures.",
    date: "2024-01-11",
    status: "In Progress",
    priority: "Medium",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function FeedbackPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [feedback, setFeedback] = useState(mockFeedback)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [ratingFilter, setRatingFilter] = useState("all")
  const [selectedFeedback, setSelectedFeedback] = useState<any>(null)
  const [replyContent, setReplyContent] = useState("")
  const [isReplying, setIsReplying] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/auth")
      return
    }

    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      setUser({
        name: "John Doe",
        email: "john.doe@innecos.com",
        role: "Admin",
        avatar: "/placeholder.svg?height=40&width=40",
      })
    }
    setLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    router.push("/auth")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New":
        return "bg-blue-100 text-blue-700"
      case "In Progress":
        return "bg-yellow-100 text-yellow-700"
      case "Resolved":
        return "bg-green-100 text-green-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-700"
      case "Medium":
        return "bg-yellow-100 text-yellow-700"
      case "Low":
        return "bg-green-100 text-green-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "New":
        return <Clock className="w-3 h-3 mr-1" />
      case "In Progress":
        return <AlertTriangle className="w-3 h-3 mr-1" />
      case "Resolved":
        return <CheckCircle className="w-3 h-3 mr-1" />
      default:
        return null
    }
  }

  const filteredFeedback = feedback.filter((item) => {
    const matchesSearch = item.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.subject.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || item.status === statusFilter
    const matchesRating = ratingFilter === "all" || item.rating.toString() === ratingFilter
    
    return matchesSearch && matchesStatus && matchesRating
  })

  const updateFeedbackStatus = (id: number, newStatus: string) => {
    setFeedback(feedback.map(item => 
      item.id === id ? { ...item, status: newStatus } : item
    ))
  }

  const handleReply = () => {
    if (!replyContent.trim()) return
    
    // In a real app, you would send this to your backend
    console.log(`Replying to feedback ${selectedFeedback.id}:`, replyContent)
    
    // Update the status to "In Progress" if it was "New"
    if (selectedFeedback.status === "New") {
      updateFeedbackStatus(selectedFeedback.id, "In Progress")
    }
    
    setIsReplying(false)
    setReplyContent("")
    setSelectedFeedback(null)
  }

  const markAsResolved = (id: number) => {
    updateFeedbackStatus(id, "Resolved")
    setSelectedFeedback(null)
  }

  const archiveFeedback = (id: number) => {
    // In a real app, you would archive this in your backend
    setFeedback(feedback.filter(item => item.id !== id))
    setSelectedFeedback(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-innecos-green to-innecos-green/90 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-br from-innecos-yellow to-innecos-yellow/80 rounded-xl flex items-center justify-center animate-pulse">
            <Leaf className="w-7 h-7 text-innecos-green" />
          </div>
          <div className="text-white text-xl">Loading...</div>
          <div className="flex space-x-2">
            {[1, 2, 3].map((item) => (
              <div 
                key={item}
                className="w-2 h-2 bg-white rounded-full"
                style={{ animation: `bounce 1.5s infinite ${item * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        {/* Sidebar */}
        <Sidebar className="border-r border-gray-200">
          <SidebarHeader className="border-b border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-innecos-yellow to-innecos-green rounded-lg flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-innecos-green">INNECOS</h1>
                <p className="text-xs text-gray-600">Admin Dashboard</p>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/dashboard">
                        <LayoutDashboard className="w-4 h-4" />
                        <span>Dashboard</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/dashboard/tools">
                        <Factory className="w-4 h-4" />
                        <span>Our Tools</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/dashboard/customers">
                        <Users className="w-4 h-4" />
                        <span>Customers</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive asChild>
                      <Link href="/dashboard/feedback">
                        <MessageSquare className="w-4 h-4" />
                        <span>Customer Feedback</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/dashboard/analysis">
                        <BarChart3 className="w-4 h-4" />
                        <span>Analysis & Inventory</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Management</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    {/* <SidebarMenuButton>
                      <Settings className="w-4 h-4" />
                      <span>Settings</span>
                    </SidebarMenuButton> */}
                    <SidebarMenuButton isActive asChild>
                                          <Link href="/dashboard/setting">
                                            <Settings className="w-4 h-4" />
                                            <span>Settings</span>
                                          </Link>
                                        </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-gray-200 p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start p-2">
                  <Avatar className="w-8 h-8 mr-3">
                    <AvatarImage src={user?.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-innecos-yellow text-innecos-green">
                      {user?.name
                        ?.split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.role}</p>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Shield className="w-4 h-4 mr-2" />
                  Security
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Lock className="w-4 h-4 mr-2" />
                  Change Password
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Cog className="w-4 h-4 mr-2" />
                  Preferences
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>

        {/* Main Content */}
        <SidebarInset className="flex-1">
          {/* Header */}
          <header className="sticky top-0 z-40 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="flex h-16 items-center gap-4 px-6">
              <SidebarTrigger />
              <div className="flex-1">
                <h1 className="text-xl font-semibold text-innecos-green">Customer Feedback</h1>
              </div>
            </div>
          </header>

          {/* Feedback Content */}
          <main className="flex-1 p-6 space-y-6">
            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="text-innecos-green">Filter Feedback</CardTitle>
                <CardDescription>Search and filter customer feedback</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search feedback..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[150px]">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="New">New</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={ratingFilter} onValueChange={setRatingFilter}>
                    <SelectTrigger className="w-[150px]">
                      <Star className="w-4 h-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Ratings</SelectItem>
                      <SelectItem value="5">5 Stars</SelectItem>
                      <SelectItem value="4">4 Stars</SelectItem>
                      <SelectItem value="3">3 Stars</SelectItem>
                      <SelectItem value="2">2 Stars</SelectItem>
                      <SelectItem value="1">1 Star</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Feedback Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Feedback</CardTitle>
                  <MessageSquare className="h-4 w-4 text-innecos-green" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-innecos-green">{feedback.length}</div>
                  <p className="text-xs text-gray-600">All time</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">New Feedback</CardTitle>
                  <Clock className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-innecos-green">
                    {feedback.filter(f => f.status === "New").length}
                  </div>
                  <p className="text-xs text-blue-600">Needs attention</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Average Rating</CardTitle>
                  <Star className="h-4 w-4 text-yellow-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-innecos-green">
                    {(feedback.reduce((sum, f) => sum + f.rating, 0) / feedback.length).toFixed(1)}
                  </div>
                  <p className="text-xs text-yellow-600">Out of 5 stars</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Resolved</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-innecos-green">
                    {feedback.filter(f => f.status === "Resolved").length}
                  </div>
                  <p className="text-xs text-green-600">Completed</p>
                </CardContent>
              </Card>
            </div>

            {/* Feedback Table */}
            <Card>
              <CardHeader>
                <CardTitle className="text-innecos-green">Customer Feedback</CardTitle>
                <CardDescription>Manage customer reviews and support requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Customer</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredFeedback.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <Avatar className="w-8 h-8">
                                <AvatarImage src={item.avatar || "/placeholder.svg"} />
                                <AvatarFallback className="bg-innecos-yellow/20 text-innecos-green">
                                  {item.customer.split(" ").map(n => n[0]).join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{item.customer}</p>
                                <p className="text-sm text-gray-500">{item.customerEmail}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{item.product}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              {[...Array(item.rating)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                              ))}
                              {[...Array(5 - item.rating)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 text-gray-300" />
                              ))}
                            </div>
                          </TableCell>
                          <TableCell className="max-w-xs truncate">{item.subject}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(item.status)}>
                              {getStatusIcon(item.status)}
                              {item.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={getPriorityColor(item.priority)}>
                              {item.priority}
                            </Badge>
                          </TableCell>
                          <TableCell>{item.date}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSelectedFeedback(item)}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => {
                                  setSelectedFeedback(item)
                                  setIsReplying(true)
                                }}
                              >
                                <Reply className="w-4 h-4" />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => archiveFeedback(item.id)}
                              >
                                <Archive className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </main>
        </SidebarInset>

        {/* Feedback Details Dialog */}
        {selectedFeedback && (
          <Dialog open={!!selectedFeedback} onOpenChange={() => {
            setSelectedFeedback(null)
            setIsReplying(false)
          }}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>{selectedFeedback.subject}</DialogTitle>
                <DialogDescription>
                  Feedback from {selectedFeedback.customer} about {selectedFeedback.product}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={selectedFeedback.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-innecos-yellow/20 text-innecos-green">
                        {selectedFeedback.customer.split(" ").map((n: string) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{selectedFeedback.customer}</h3>
                      <p className="text-sm text-gray-500">{selectedFeedback.customerEmail}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(selectedFeedback.status)}>
                      {getStatusIcon(selectedFeedback.status)}
                      {selectedFeedback.status}
                    </Badge>
                    <Badge className={getPriorityColor(selectedFeedback.priority)}>
                      {selectedFeedback.priority}
                    </Badge>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Product</p>
                    <p>{selectedFeedback.product}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Date</p>
                    <p>{selectedFeedback.date}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Rating</p>
                    <div className="flex items-center">
                      {[...Array(selectedFeedback.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                      {[...Array(5 - selectedFeedback.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-gray-300" />
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Message</p>
                  <p className="whitespace-pre-line">{selectedFeedback.message}</p>
                </div>

                {isReplying ? (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-600">Your Reply</p>
                    {/* <Input
                      as="textarea"
                      rows={4}
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder="Type your response here..."
                      className="min-h-[100px]"
                    /> */}
                    <Textarea
  value={replyContent}
  onChange={(e) => setReplyContent(e.target.value)}
  placeholder="Type your response here..."
  rows={4}
  className="min-h-[100px]"
/>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsReplying(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleReply}>
                        <Reply className="w-4 h-4 mr-2" />
                        Send Reply
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between pt-4">
                    <div className="space-x-2">
                      {selectedFeedback.status !== "Resolved" && (
                        <Button 
                          variant="outline"
                          onClick={() => markAsResolved(selectedFeedback.id)}
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Mark as Resolved
                        </Button>
                      )}
                    </div>
                    <div className="space-x-2">
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setIsReplying(true)
                          setReplyContent("")
                        }}
                      >
                        <Reply className="w-4 h-4 mr-2" />
                        Reply
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </SidebarProvider>
  )
}