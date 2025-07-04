"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  LogOut,
  User,
  Shield,
  Cog,
  Lock,
} from "lucide-react"
import Link from "next/link"

// Mock customers data
const mockCustomers = [
  {
    id: 1,
    name: "AgriCorp Ltd",
    email: "contact@agricorp.com",
    phone: "+1 (555) 123-4567",
    location: "California, USA",
    joinDate: "2023-01-15",
    totalOrders: 12,
    totalSpent: 145000,
    status: "Active",
    lastOrder: "2024-01-10",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Farm Valley Co-op",
    email: "info@farmvalley.com",
    phone: "+1 (555) 234-5678",
    location: "Texas, USA",
    joinDate: "2023-03-22",
    totalOrders: 8,
    totalSpent: 89000,
    status: "Active",
    lastOrder: "2024-01-08",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Green Fields",
    email: "admin@greenfields.com",
    phone: "+1 (555) 345-6789",
    location: "Iowa, USA",
    joinDate: "2023-05-10",
    totalOrders: 15,
    totalSpent: 198000,
    status: "Active",
    lastOrder: "2024-01-12",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "Harvest Solutions",
    email: "sales@harvestsol.com",
    phone: "+1 (555) 456-7890",
    location: "Nebraska, USA",
    joinDate: "2023-07-18",
    totalOrders: 5,
    totalSpent: 67000,
    status: "Inactive",
    lastOrder: "2023-12-15",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    name: "Prairie Farms Inc",
    email: "contact@prairiefarms.com",
    phone: "+1 (555) 567-8901",
    location: "Kansas, USA",
    joinDate: "2023-09-05",
    totalOrders: 20,
    totalSpent: 234000,
    status: "Active",
    lastOrder: "2024-01-14",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function CustomersPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [customers, setCustomers] = useState(mockCustomers)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

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
      case "Active":
        return "bg-green-100 text-green-700"
      case "Inactive":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || customer.status === statusFilter

    return matchesSearch && matchesStatus
  })

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
                    <SidebarMenuButton isActive asChild>
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
                <h1 className="text-xl font-semibold text-innecos-green">Customers</h1>
              </div>
              <div className="flex items-center gap-4">
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-innecos-yellow hover:bg-innecos-yellow/90 text-innecos-green">
                      <Plus className="w-4 h-4 mr-2" />
                      Add New Customer
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Add New Customer</DialogTitle>
                      <DialogDescription>Add a new customer to your database.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="customer-name" className="text-right">
                          Name
                        </Label>
                        <Input id="customer-name" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="customer-email" className="text-right">
                          Email
                        </Label>
                        <Input id="customer-email" type="email" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="customer-phone" className="text-right">
                          Phone
                        </Label>
                        <Input id="customer-phone" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="customer-location" className="text-right">
                          Location
                        </Label>
                        <Input id="customer-location" className="col-span-3" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" className="bg-innecos-green hover:bg-innecos-green/90">
                        Add Customer
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </header>

          {/* Customers Content */}
          <main className="flex-1 p-6 space-y-6">
            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="text-innecos-green">Filter Customers</CardTitle>
                <CardDescription>Search and filter your customer database</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search customers..."
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
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Customer Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Customers</CardTitle>
                  <Users className="h-4 w-4 text-innecos-green" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-innecos-green">{customers.length}</div>
                  <p className="text-xs text-green-600">Active customer base</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Active Customers</CardTitle>
                  <Users className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-innecos-green">
                    {customers.filter((c) => c.status === "Active").length}
                  </div>
                  <p className="text-xs text-green-600">Currently active</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-innecos-yellow" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-innecos-green">
                    ${customers.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString()}
                  </div>
                  <p className="text-xs text-green-600">From all customers</p>
                </CardContent>
              </Card>
            </div>

            {/* Customers Table */}
            <Card>
              <CardHeader>
                <CardTitle className="text-innecos-green">Customer Database</CardTitle>
                <CardDescription>Manage your customer relationships</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Customer</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Orders</TableHead>
                        <TableHead>Total Spent</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Order</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCustomers.map((customer) => (
                        <TableRow key={customer.id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <Avatar className="w-8 h-8">
                                <AvatarImage src={customer.avatar || "/placeholder.svg"} />
                                <AvatarFallback className="bg-innecos-yellow/20 text-innecos-green">
                                  {customer.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{customer.name}</p>
                                <p className="text-sm text-gray-500">Since {customer.joinDate}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center text-sm">
                                <Mail className="w-3 h-3 mr-1 text-gray-400" />
                                {customer.email}
                              </div>
                              <div className="flex items-center text-sm">
                                <Phone className="w-3 h-3 mr-1 text-gray-400" />
                                {customer.phone}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center text-sm">
                              <MapPin className="w-3 h-3 mr-1 text-gray-400" />
                              {customer.location}
                            </div>
                          </TableCell>
                          <TableCell>{customer.totalOrders}</TableCell>
                          <TableCell>${customer.totalSpent.toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(customer.status)}>{customer.status}</Badge>
                          </TableCell>
                          <TableCell>{customer.lastOrder}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm" onClick={() => setSelectedCustomer(customer)}>
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600 hover:text-red-700 bg-transparent"
                              >
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

        {/* Customer Details Dialog */}
        {selectedCustomer && (
          <Dialog open={!!selectedCustomer} onOpenChange={() => setSelectedCustomer(null)}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>{selectedCustomer.name}</DialogTitle>
                <DialogDescription>Customer details and order history</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={selectedCustomer.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-innecos-yellow/20 text-innecos-green text-lg">
                      {selectedCustomer.name
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold">{selectedCustomer.name}</h3>
                    <Badge className={getStatusColor(selectedCustomer.status)}>{selectedCustomer.status}</Badge>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Email</Label>
                    <p className="flex items-center text-sm">
                      <Mail className="w-4 h-4 mr-2 text-gray-400" />
                      {selectedCustomer.email}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Phone</Label>
                    <p className="flex items-center text-sm">
                      <Phone className="w-4 h-4 mr-2 text-gray-400" />
                      {selectedCustomer.phone}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Location</Label>
                    <p className="flex items-center text-sm">
                      <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                      {selectedCustomer.location}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Join Date</Label>
                    <p className="flex items-center text-sm">
                      <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                      {selectedCustomer.joinDate}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Total Orders</Label>
                    <p className="text-2xl font-bold text-innecos-green">{selectedCustomer.totalOrders}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Total Spent</Label>
                    <p className="text-2xl font-bold text-innecos-green">
                      ${selectedCustomer.totalSpent.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Last Order</Label>
                    <p>{selectedCustomer.lastOrder}</p>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setSelectedCustomer(null)}>
                  Close
                </Button>
                <Button className="bg-innecos-green hover:bg-innecos-green/90">Edit Customer</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </SidebarProvider>
  )
}
