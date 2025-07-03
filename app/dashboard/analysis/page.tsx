"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Leaf,
  LayoutDashboard,
  Factory,
  Users,
  MessageSquare,
  BarChart3,
  Settings,
  TrendingUp,
  TrendingDown,
  Package,
  AlertTriangle,
  CheckCircle,
  Clock,
  Download,
  Filter,
  Wheat,
  Truck,
  LogOut,
  User,
  Shield,
  Cog,
  DollarSign,
} from "lucide-react"
import Link from "next/link"

// Mock analytics data
const mockAnalytics = {
  totalRevenue: 1250000,
  monthlyGrowth: 15.3,
  totalOrders: 234,
  averageOrderValue: 5342,
  inventoryValue: 890000,
  lowStockItems: 12,
  topSellingProducts: [
    { name: "Grain Dryer Model X1", sold: 45, revenue: 675000, growth: 12.5 },
    { name: "Maize Mill Pro", sold: 38, revenue: 323000, growth: 8.2 },
    { name: "Oil Presser Elite", sold: 32, revenue: 384000, growth: -2.1 },
    { name: "Feed Processor 2000", sold: 28, revenue: 504000, growth: 18.7 },
    { name: "Silo Storage System", sold: 24, revenue: 600000, growth: 25.3 },
  ],
  inventoryStatus: [
    { category: "Grain Processing", total: 45, inStock: 38, lowStock: 5, outOfStock: 2, value: 450000 },
    { category: "Milling Systems", total: 32, inStock: 28, lowStock: 3, outOfStock: 1, value: 280000 },
    { category: "Oil Processing", total: 28, inStock: 22, lowStock: 4, outOfStock: 2, value: 320000 },
    { category: "Feed Processing", total: 25, inStock: 20, lowStock: 3, outOfStock: 2, value: 450000 },
    { category: "Storage Systems", total: 18, inStock: 15, lowStock: 2, outOfStock: 1, value: 390000 },
  ],
  monthlyData: [
    { month: "Jan", revenue: 95000, orders: 18 },
    { month: "Feb", revenue: 105000, orders: 22 },
    { month: "Mar", revenue: 125000, orders: 28 },
    { month: "Apr", revenue: 115000, orders: 24 },
    { month: "May", revenue: 135000, orders: 32 },
    { month: "Jun", revenue: 145000, orders: 35 },
  ],
}

export default function AnalysisPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState("6months")

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

  const getStockStatusColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600"
    if (percentage >= 50) return "text-yellow-600"
    return "text-red-600"
  }

  const getGrowthIcon = (growth: number) => {
    if (growth > 0) return <TrendingUp className="w-4 h-4 text-green-600" />
    if (growth < 0) return <TrendingDown className="w-4 h-4 text-red-600" />
    return <Clock className="w-4 h-4 text-gray-600" />
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
                    <SidebarMenuButton asChild>
                      <Link href="/dashboard/feedback">
                        <MessageSquare className="w-4 h-4" />
                        <span>Customer Feedback</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive asChild>
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
                <h1 className="text-xl font-semibold text-innecos-green">Analysis & Inventory</h1>
              </div>
              <div className="flex items-center gap-4">
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-[150px]">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1month">Last Month</SelectItem>
                    <SelectItem value="3months">Last 3 Months</SelectItem>
                    <SelectItem value="6months">Last 6 Months</SelectItem>
                    <SelectItem value="1year">Last Year</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export Report
                </Button>
              </div>
            </div>
          </header>

          {/* Analysis Content */}
          <main className="flex-1 p-6 space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-innecos-green" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-innecos-green">
                    ${mockAnalytics.totalRevenue.toLocaleString()}
                  </div>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />+{mockAnalytics.monthlyGrowth}% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Orders</CardTitle>
                  <Package className="h-4 w-4 text-innecos-yellow" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-innecos-green">{mockAnalytics.totalOrders}</div>
                  <p className="text-xs text-green-600">This period</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Avg Order Value</CardTitle>
                  <BarChart3 className="h-4 w-4 text-innecos-green" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-innecos-green">
                    ${mockAnalytics.averageOrderValue.toLocaleString()}
                  </div>
                  <p className="text-xs text-green-600">Per transaction</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Inventory Value</CardTitle>
                  <Wheat className="h-4 w-4 text-innecos-yellow" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-innecos-green">
                    ${mockAnalytics.inventoryValue.toLocaleString()}
                  </div>
                  <p className="text-xs text-yellow-600 flex items-center mt-1">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    {mockAnalytics.lowStockItems} low stock items
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Top Selling Products & Inventory Status */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Selling Products */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-innecos-green">Top Selling Products</CardTitle>
                  <CardDescription>Best performing equipment by revenue</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockAnalytics.topSellingProducts.map((product, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-innecos-green/10 rounded-lg flex items-center justify-center">
                            <Factory className="w-4 h-4 text-innecos-green" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{product.name}</p>
                            <p className="text-sm text-gray-500">{product.sold} units sold</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-innecos-green">${product.revenue.toLocaleString()}</p>
                          <div className="flex items-center text-sm">
                            {getGrowthIcon(product.growth)}
                            <span className={product.growth > 0 ? "text-green-600" : "text-red-600"}>
                              {product.growth > 0 ? "+" : ""}
                              {product.growth}%
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Inventory Status by Category */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-innecos-green">Inventory Status by Category</CardTitle>
                  <CardDescription>Stock levels across product categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockAnalytics.inventoryStatus.map((category, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-gray-900">{category.category}</h4>
                          <span className="text-sm font-semibold text-innecos-green">
                            ${category.value.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center space-x-1">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span>In Stock: {category.inStock}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <span>Low: {category.lowStock}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <span>Out: {category.outOfStock}</span>
                          </div>
                        </div>
                        <Progress value={(category.inStock / category.total) * 100} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Inventory Table */}
            <Card>
              <CardHeader>
                <CardTitle className="text-innecos-green">Detailed Inventory Analysis</CardTitle>
                <CardDescription>Complete breakdown of inventory status and performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Category</TableHead>
                        <TableHead>Total Items</TableHead>
                        <TableHead>In Stock</TableHead>
                        <TableHead>Low Stock</TableHead>
                        <TableHead>Out of Stock</TableHead>
                        <TableHead>Stock %</TableHead>
                        <TableHead>Value</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockAnalytics.inventoryStatus.map((category, index) => {
                        const stockPercentage = (category.inStock / category.total) * 100
                        return (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{category.category}</TableCell>
                            <TableCell>{category.total}</TableCell>
                            <TableCell>{category.inStock}</TableCell>
                            <TableCell>{category.lowStock}</TableCell>
                            <TableCell>{category.outOfStock}</TableCell>
                            <TableCell>
                              <span className={getStockStatusColor(stockPercentage)}>
                                {stockPercentage.toFixed(1)}%
                              </span>
                            </TableCell>
                            <TableCell>${category.value.toLocaleString()}</TableCell>
                            <TableCell>
                              {stockPercentage >= 80 ? (
                                <Badge className="bg-green-100 text-green-700">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Good
                                </Badge>
                              ) : stockPercentage >= 50 ? (
                                <Badge className="bg-yellow-100 text-yellow-700">
                                  <Clock className="w-3 h-3 mr-1" />
                                  Monitor
                                </Badge>
                              ) : (
                                <Badge className="bg-red-100 text-red-700">
                                  <AlertTriangle className="w-3 h-3 mr-1" />
                                  Critical
                                </Badge>
                              )}
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
