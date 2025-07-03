"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
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
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Filter,
  Download,
  Wheat,
  Truck,
  LogOut,
  User,
  Shield,
  Cog,
} from "lucide-react"
import Link from "next/link"

// Mock tools data
const mockTools = [
  {
    id: 1,
    name: "Grain Dryer Model X1",
    category: "Grain Processing",
    price: 15000,
    stock: 12,
    status: "In Stock",
    description: "High-efficiency grain dryer with advanced temperature control",
    lastUpdated: "2024-01-15",
  },
  {
    id: 2,
    name: "Maize Mill Pro",
    category: "Milling Systems",
    price: 8500,
    stock: 8,
    status: "In Stock",
    description: "Professional maize milling system for medium-scale operations",
    lastUpdated: "2024-01-14",
  },
  {
    id: 3,
    name: "Oil Presser Elite",
    category: "Oil Processing",
    price: 12000,
    stock: 3,
    status: "Low Stock",
    description: "Premium oil pressing equipment for various seeds",
    lastUpdated: "2024-01-13",
  },
  {
    id: 4,
    name: "Feed Processor 2000",
    category: "Feed Processing",
    price: 18000,
    stock: 0,
    status: "Out of Stock",
    description: "Industrial feed processing unit with mixing capabilities",
    lastUpdated: "2024-01-12",
  },
  {
    id: 5,
    name: "Silo Storage System",
    category: "Storage",
    price: 25000,
    stock: 6,
    status: "In Stock",
    description: "Large capacity grain storage silo with monitoring system",
    lastUpdated: "2024-01-11",
  },
]

export default function ToolsPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [tools, setTools] = useState(mockTools)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

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

  const filteredTools = tools.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || tool.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Stock":
        return "bg-green-100 text-green-700"
      case "Low Stock":
        return "bg-yellow-100 text-yellow-700"
      case "Out of Stock":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
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
                    <SidebarMenuButton isActive asChild>
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
                <h1 className="text-xl font-semibold text-innecos-green">Our Tools Management</h1>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-innecos-yellow hover:bg-innecos-yellow/90 text-innecos-green">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Tool
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Add New Tool</DialogTitle>
                      <DialogDescription>Add a new agro-processing tool to your inventory.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Name
                        </Label>
                        <Input id="name" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="category" className="text-right">
                          Category
                        </Label>
                        <Select>
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="grain-processing">Grain Processing</SelectItem>
                            <SelectItem value="milling-systems">Milling Systems</SelectItem>
                            <SelectItem value="oil-processing">Oil Processing</SelectItem>
                            <SelectItem value="feed-processing">Feed Processing</SelectItem>
                            <SelectItem value="storage">Storage</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="price" className="text-right">
                          Price
                        </Label>
                        <Input id="price" type="number" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="stock" className="text-right">
                          Stock
                        </Label>
                        <Input id="stock" type="number" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                          Description
                        </Label>
                        <Textarea id="description" className="col-span-3" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" className="bg-innecos-green hover:bg-innecos-green/90">
                        Add Tool
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </header>

          {/* Tools Content */}
          <main className="flex-1 p-6 space-y-6">
            {/* Filters and Search */}
            <Card>
              <CardHeader>
                <CardTitle className="text-innecos-green">Tools Inventory</CardTitle>
                <CardDescription>Manage your agro-processing equipment catalog</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search tools..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger className="w-[200px]">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="Grain Processing">Grain Processing</SelectItem>
                      <SelectItem value="Milling Systems">Milling Systems</SelectItem>
                      <SelectItem value="Oil Processing">Oil Processing</SelectItem>
                      <SelectItem value="Feed Processing">Feed Processing</SelectItem>
                      <SelectItem value="Storage">Storage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Tools Table */}
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tool Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Updated</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTools.map((tool) => (
                        <TableRow key={tool.id}>
                          <TableCell className="font-medium">{tool.name}</TableCell>
                          <TableCell>{tool.category}</TableCell>
                          <TableCell>${tool.price.toLocaleString()}</TableCell>
                          <TableCell>{tool.stock}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(tool.status)}>{tool.status}</Badge>
                          </TableCell>
                          <TableCell>{tool.lastUpdated}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-600">
                                <Trash2 className="w-4 h-4" />
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
      </div>
    </SidebarProvider>
  )
}
