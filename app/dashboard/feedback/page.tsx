"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Leaf,
  LayoutDashboard,
  Factory,
  Users,
  MessageSquare,
  BarChart3,
  Settings,
  Bell,
  Search,
  Star,
  Clock,
  CheckCircle,
  Filter,
  Download,
  Reply,
  Archive,
  Wheat,
  Truck,
  LogOut,
  User,
  Shield,
  Cog,
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
      "The grain dryer has exceeded our expectations. The temperature control is precise and the efficiency is outstanding. Our grain quality has improved significantly since installation.",
    date: "2024-01-15",
    status: "New",
    priority: "Medium",
    category: "Product Review",
  },
  {
    id: 2,
    customer: "Farm Valley Co-op",
    customerEmail: "info@farmvalley.coop",
    product: "Maize Mill Pro",
    rating: 4,
    subject: "Good Service, Minor Issues",
    message:
      "Overall satisfied with the milling system. Installation was smooth and the team was professional. However, we experienced some minor calibration issues initially.",
    date: "2024-01-14",
    status: "In Progress",
    priority: "High",
    category: "Service Feedback",
  },
  {
    id: 3,
    customer: "Green Fields Agriculture",
    customerEmail: "admin@greenfields.ag",
    product: "Oil Presser Elite",
    rating: 5,
    subject: "Outstanding Technical Support",
    message:
      "The technical support team was incredibly helpful during setup. They provided detailed guidance and were available whenever we needed assistance. Highly recommend!",
    date: "2024-01-13",
    status: "Resolved",
    priority: "Low",
    category: "Support",
  },
  {
    id: 4,
    customer: "Harvest Solutions Inc",
    customerEmail: "sales@harvestsol.com",
    product: "Feed Processor 2000",
    rating: 2,
    subject: "Delivery Delays",
    message:
      "We experienced significant delays in delivery which affected our production schedule. The equipment quality is good but the logistics need improvement.",
    date: "2024-01-12",
    status: "New",
    priority: "High",
    category: "Complaint",
  },
  {
    id: 5,
    customer: "Prairie Grain Collective",
    customerEmail: "contact@prairiegrain.org",
    product: "Silo Storage System",
    rating: 4,
    subject: "Great Investment",
    message:
      "The silo system has been a great addition to our facility. Storage capacity is excellent and the monitoring system provides valuable insights.",
    date: "2024-01-11",
    status: "Resolved",
    priority: "Medium",
    category: "Product Review",
  },
]

export default function FeedbackPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [feedback, setFeedback] = useState(mockFeedback)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterRating, setFilterRating] = useState("all")
  const [filterCategory, setFilterCategory] = useState("all")

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/auth")
      return
    }

    // Get user data from localStorage (mock system)
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
    router.push("/auth")
  }

  const filteredFeedback = feedback.filter((item) => {
    const matchesSearch =
      item.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.product.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || item.status === filterStatus
    const matchesRating = filterRating === "all" || item.rating.toString() === filterRating
    const matchesCategory = filterCategory === "all" || item.category === filterCategory
    return matchesSearch && matchesStatus && matchesRating && matchesCategory
  })

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

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
    ))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-innecos-green to-innecos-green/90 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-br from-innecos-yellow to-innecos-yellow/80 rounded-xl flex items-center justify-center animate-fadeIn opacity-0">
            <Leaf className="w-7 h-7 text-innecos-green" />
          </div>
          <div className="text-white text-xl animate-fadeIn opacity-0 [animation-delay:300ms]">Loading...</div>
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:100ms]" />
            <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:200ms]" />
            <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:300ms]" />
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
                    <SidebarMenuButton>
                      <Truck className="w-4 h-4" />
                      <span>Supply Chain</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <Wheat className="w-4 h-4" />
                      <span>Inventory</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <Settings className="w-4 h-4" />
                      <span>Settings</span>
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
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline" size="sm">
                  <Bell className="w-4 h-4" />
                  <span className="ml-2">Notifications</span>
                </Button>
              </div>
            </div>
          </header>

          {/* Feedback Content */}
          <main className="flex-1 p-6 space-y-6">
            {/* Feedback Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Feedback</CardTitle>
                  <MessageSquare className="h-4 w-4 text-innecos-green" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-innecos-green">{feedback.length}</div>
                  <p className="text-xs text-green-600">All time</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Pending Review</CardTitle>
                  <Clock className="h-4 w-4 text-yellow-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-innecos-green">
                    {feedback.filter((f) => f.status === "New").length}
                  </div>
                  <p className="text-xs text-yellow-600">Needs attention</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Average Rating</CardTitle>
                  <Star className="h-4 w-4 text-yellow-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-innecos-green">
                    {(feedback.reduce((sum, f) => sum + f.rating, 0) / feedback.length).toFixed(1)}
                  </div>
                  <p className="text-xs text-green-600">Out of 5 stars</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Resolved</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-innecos-green">
                    {feedback.filter((f) => f.status === "Resolved").length}
                  </div>
                  <p className="text-xs text-green-600">Completed</p>
                </CardContent>
              </Card>
            </div>

            {/* Filters and Search */}
            <Card>
              <CardHeader>
                <CardTitle className="text-innecos-green">Customer Feedback Management</CardTitle>
                <CardDescription>Monitor and respond to customer feedback and reviews</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search feedback..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-[150px]">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="New">New</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterRating} onValueChange={setFilterRating}>
                    <SelectTrigger className="w-[150px]">
                      <Star className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Rating" />
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
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger className="w-[150px]">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="Product Review">Product Review</SelectItem>
                      <SelectItem value="Service Feedback">Service Feedback</SelectItem>
                      <SelectItem value="Support">Support</SelectItem>
                      <SelectItem value="Complaint">Complaint</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Feedback Cards */}
                <div className="space-y-4">
                  {filteredFeedback.map((item) => (
                    <Card key={item.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start space-x-4">
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                              <AvatarFallback className="bg-innecos-yellow/20 text-innecos-green">
                                {item.customer
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")
                                  .slice(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <h4 className="font-semibold text-gray-900">{item.customer}</h4>
                                <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                                <Badge className={getPriorityColor(item.priority)}>{item.priority}</Badge>
                              </div>
                              <p className="text-sm text-gray-600">{item.customerEmail}</p>
                              <p className="text-sm text-gray-500">Product: {item.product}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center">{renderStars(item.rating)}</div>
                            <span className="text-sm text-gray-500">{item.date}</span>
                          </div>
                        </div>

                        <div className="mb-4">
                          <h5 className="font-medium text-gray-900 mb-2">{item.subject}</h5>
                          <p className="text-gray-700 text-sm leading-relaxed">{item.message}</p>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">{item.category}</Badge>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              <Reply className="w-4 h-4 mr-1" />
                              Reply
                            </Button>
                            <Button variant="outline" size="sm">
                              <Archive className="w-4 h-4 mr-1" />
                              Archive
                            </Button>
                            {item.status === "New" && (
                              <Button size="sm" className="bg-innecos-green hover:bg-innecos-green/90">
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Mark Resolved
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
