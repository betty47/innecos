"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
  BarChart3,
  Settings,
  Bell,
  Search,
  Plus,
  TrendingUp,
  Clock,
  LogOut,
  User,
  Shield,
  Cog,
  MessageSquare,
  Star,
  DollarSign,
} from "lucide-react"
import Link from "next/link"

// Mock data
const mockStats = {
  totalCustomers: 156,
  totalTools: 89,
  pendingFeedback: 12,
  monthlyRevenue: 245000,
  recentFeedback: [
    { id: 1, customer: "AgriCorp Ltd", rating: 5, message: "Excellent grain dryer performance!", time: "2 hours ago" },
    { id: 2, customer: "Farm Valley Co-op", rating: 4, message: "Good service, fast delivery", time: "4 hours ago" },
    { id: 3, customer: "Green Fields", rating: 5, message: "Outstanding technical support", time: "6 hours ago" },
  ],
  toolsStatus: {
    inStock: 67,
    lowStock: 15,
    outOfStock: 7,
  },
  topTools: [
    { name: "Grain Dryer Model X1", sales: 23, revenue: 45000 },
    { name: "Maize Mill Pro", sales: 18, revenue: 36000 },
    { name: "Oil Presser Elite", sales: 15, revenue: 30000 },
  ],
}

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState("dashboard")

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
      // Fallback mock user data
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-innecos-green to-innecos-green/90 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center space-y-4">
          {/* Logo with fade animation */}
          <div className="w-16 h-16 bg-gradient-to-br from-innecos-yellow to-innecos-yellow/80 rounded-xl flex items-center justify-center animate-fadeIn opacity-0">
            <Leaf className="w-7 h-7 text-innecos-green" />
          </div>

          {/* Text with delayed fade animation */}
          <div className="text-white text-xl animate-fadeIn opacity-0 [animation-delay:300ms]">Loading...</div>

          {/* Pulsing dots */}
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
                    <SidebarMenuButton isActive={currentPage === "dashboard"} asChild>
                      <Link href="/dashboard" onClick={() => setCurrentPage("dashboard")}>
                        <LayoutDashboard className="w-4 h-4" />
                        <span>Dashboard</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive={currentPage === "tools"} asChild>
                      <Link href="/dashboard/tools" onClick={() => setCurrentPage("tools")}>
                        <Factory className="w-4 h-4" />
                        <span>Our Tools</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive={currentPage === "customers"} asChild>
                      <Link href="/dashboard/customers" onClick={() => setCurrentPage("customers")}>
                        <Users className="w-4 h-4" />
                        <span>Customers</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive={currentPage === "feedback"} asChild>
                      <Link href="/dashboard/feedback" onClick={() => setCurrentPage("feedback")}>
                        <MessageSquare className="w-4 h-4" />
                        <span>Customer Feedback</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive={currentPage === "analysis"} asChild>
                      <Link href="/dashboard/analysis" onClick={() => setCurrentPage("analysis")}>
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
                <h1 className="text-xl font-semibold text-innecos-green">Dashboard Overview</h1>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm">
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
                <Button variant="outline" size="sm">
                  <Bell className="w-4 h-4" />
                </Button>
                <Button className="bg-innecos-yellow hover:bg-innecos-yellow/90 text-innecos-green">
                  <Plus className="w-4 h-4 mr-2" />
                  Quick Add
                </Button>
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <main className="flex-1 p-6 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Customers</CardTitle>
                  <Users className="h-4 w-4 text-innecos-green" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-innecos-green">{mockStats.totalCustomers}</div>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +12% from last month
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Tools</CardTitle>
                  <Factory className="h-4 w-4 text-innecos-yellow" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-innecos-green">{mockStats.totalTools}</div>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +8% from last week
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Pending Feedback</CardTitle>
                  <MessageSquare className="h-4 w-4 text-innecos-green" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-innecos-green">{mockStats.pendingFeedback}</div>
                  <p className="text-xs text-yellow-600 flex items-center mt-1">
                    <Clock className="w-3 h-3 mr-1" />
                    Needs attention
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Monthly Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-innecos-yellow" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-innecos-green">
                    ${mockStats.monthlyRevenue.toLocaleString()}
                  </div>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +23% from last month
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Feedback & Tools Status */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Customer Feedback */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-innecos-green">Recent Customer Feedback</CardTitle>
                    <CardDescription>Latest customer reviews and ratings</CardDescription>
                  </div>
                  <Link href="/dashboard/feedback">
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockStats.recentFeedback.map((feedback) => (
                    <div key={feedback.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-innecos-yellow/20 rounded-full flex items-center justify-center">
                          <Star className="w-5 h-5 text-innecos-yellow fill-current" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-medium text-gray-900">{feedback.customer}</p>
                          <div className="flex items-center">
                            {[...Array(feedback.rating)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">{feedback.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{feedback.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Tools Inventory Status */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-innecos-green">Tools Inventory Status</CardTitle>
                    <CardDescription>Current stock levels overview</CardDescription>
                  </div>
                  <Link href="/dashboard/analysis">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm">In Stock</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-semibold text-innecos-green">{mockStats.toolsStatus.inStock}</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        75%
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm">Low Stock</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-semibold text-innecos-green">{mockStats.toolsStatus.lowStock}</span>
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                        17%
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-sm">Out of Stock</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-semibold text-innecos-green">
                        {mockStats.toolsStatus.outOfStock}
                      </span>
                      <Badge variant="secondary" className="bg-red-100 text-red-700">
                        8%
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Top Performing Tools */}
            <Card>
              <CardHeader>
                <CardTitle className="text-innecos-green">Top Performing Tools</CardTitle>
                <CardDescription>Best selling equipment this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockStats.topTools.map((tool, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-innecos-green/10 rounded-lg flex items-center justify-center">
                          <Factory className="w-6 h-6 text-innecos-green" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{tool.name}</h4>
                          <p className="text-sm text-gray-500">{tool.sales} units sold</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-innecos-green">${tool.revenue.toLocaleString()}</p>
                        <p className="text-sm text-gray-500">Revenue</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-innecos-green">Quick Actions</CardTitle>
                <CardDescription>Frequently used administrative tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Link href="/dashboard/tools">
                    <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent w-full">
                      <Factory className="w-6 h-6 text-innecos-green" />
                      <span className="text-sm">Manage Tools</span>
                    </Button>
                  </Link>
                  <Link href="/dashboard/customers">
                    <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent w-full">
                      <Users className="w-6 h-6 text-innecos-green" />
                      <span className="text-sm">View Customers</span>
                    </Button>
                  </Link>
                  <Link href="/dashboard/feedback">
                    <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent w-full">
                      <MessageSquare className="w-6 h-6 text-innecos-green" />
                      <span className="text-sm">Check Feedback</span>
                    </Button>
                  </Link>
                  <Link href="/dashboard/analysis">
                    <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent w-full">
                      <BarChart3 className="w-6 h-6 text-innecos-green" />
                      <span className="text-sm">View Analytics</span>
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
