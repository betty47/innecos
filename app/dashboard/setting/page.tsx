// "use client"

// import { useState, useEffect } from "react"
// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarHeader,
//   SidebarInset,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarProvider,
//   SidebarRail,
//   SidebarTrigger,
// } from "@/components/ui/sidebar"
// import {
//   Leaf,
//   LayoutDashboard,
//   Factory,
//   Users,
//   MessageSquare,
//   BarChart3,
//   Settings,
//   Bell,
//   Mail,
//   Lock,
//   User,
//   Shield,
//   Cog,
//   LogOut,
//   Globe,
//   Moon,
//   Sun,
//   Palette,
//   Eye,
//   EyeOff,
//   CheckCircle,
//   AlertTriangle,
// } from "lucide-react"
// import Link from "next/link"

// export default function SettingsPage() {
//   const router = useRouter()
//   const [user, setUser] = useState<any>(null)
//   const [loading, setLoading] = useState(true)
//   const [currentTab, setCurrentTab] = useState("account")
//   const [showPassword, setShowPassword] = useState(false)
//   const [showCurrentPassword, setShowCurrentPassword] = useState(false)

//   // Form states
//   const [profileForm, setProfileForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     avatar: "",
//   })
//   const [securityForm, setSecurityForm] = useState({
//     currentPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   })
//   const [preferences, setPreferences] = useState({
//     theme: "light",
//     notifications: true,
//     newsletter: true,
//     language: "en",
//   })

//   useEffect(() => {
//     const token = localStorage.getItem("token")
//     if (!token) {
//       router.push("/auth")
//       return
//     }

//     // Get user data from localStorage (mock system)
//     const userData = localStorage.getItem("user")
//     if (userData) {
//       const user = JSON.parse(userData)
//       setUser(user)
//       setProfileForm({
//         name: user.name,
//         email: user.email,
//         phone: user.phone || "",
//         avatar: user.avatar || "",
//       })
//     } else {
//       // Fallback mock user data
//       const mockUser = {
//         name: "John Doe",
//         email: "john.doe@innecos.com",
//         role: "Admin",
//         avatar: "/placeholder.svg?height=40&width=40",
//       }
//       setUser(mockUser)
//       setProfileForm({
//         name: mockUser.name,
//         email: mockUser.email,
//         phone: "",
//         avatar: mockUser.avatar,
//       })
//     }
//     setLoading(false)
//   }, [router])

//   const handleLogout = () => {
//     localStorage.removeItem("token")
//     localStorage.removeItem("user")
//     router.push("/auth")
//   }

//   const handleProfileUpdate = (e: React.FormEvent) => {
//     e.preventDefault()
//     // In a real app, you would send this to your backend
//     console.log("Updating profile:", profileForm)
//     alert("Profile updated successfully!")
//   }

//   const handleSecurityUpdate = (e: React.FormEvent) => {
//     e.preventDefault()
//     if (securityForm.newPassword !== securityForm.confirmPassword) {
//       alert("New passwords don't match!")
//       return
//     }
//     // In a real app, you would send this to your backend
//     console.log("Updating security settings:", securityForm)
//     alert("Security settings updated successfully!")
//     setSecurityForm({
//       currentPassword: "",
//       newPassword: "",
//       confirmPassword: "",
//     })
//   }

//   const handlePreferencesUpdate = () => {
//     // In a real app, you would send this to your backend
//     console.log("Updating preferences:", preferences)
//     // Apply theme immediately
//     if (preferences.theme === "dark") {
//       document.documentElement.classList.add("dark")
//     } else {
//       document.documentElement.classList.remove("dark")
//     }
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-innecos-green to-innecos-green/90 flex items-center justify-center">
//         <div className="flex flex-col items-center space-y-4">
//           <div className="w-16 h-16 bg-gradient-to-br from-innecos-yellow to-innecos-yellow/80 rounded-xl flex items-center justify-center animate-pulse">
//             <Leaf className="w-7 h-7 text-innecos-green" />
//           </div>
//           <div className="text-white text-xl">Loading...</div>
//           <div className="flex space-x-2">
//             {[1, 2, 3].map((item) => (
//               <div 
//                 key={item}
//                 className="w-2 h-2 bg-white rounded-full"
//                 style={{ animation: `bounce 1.5s infinite ${item * 0.2}s` }}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <SidebarProvider>
//       <div className="min-h-screen flex w-full bg-gray-50">
//         {/* Sidebar */}
//         <Sidebar className="border-r border-gray-200">
//           <SidebarHeader className="border-b border-gray-200 p-4">
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-gradient-to-br from-innecos-yellow to-innecos-green rounded-lg flex items-center justify-center">
//                 <Leaf className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-lg font-bold text-innecos-green">INNECOS</h1>
//                 <p className="text-xs text-gray-600">Admin Dashboard</p>
//               </div>
//             </div>
//           </SidebarHeader>

//           <SidebarContent>
//             <SidebarGroup>
//               <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
//               <SidebarGroupContent>
//                 <SidebarMenu>
//                   <SidebarMenuItem>
//                     <SidebarMenuButton asChild>
//                       <Link href="/dashboard">
//                         <LayoutDashboard className="w-4 h-4" />
//                         <span>Dashboard</span>
//                       </Link>
//                     </SidebarMenuButton>
//                   </SidebarMenuItem>
//                   <SidebarMenuItem>
//                     <SidebarMenuButton asChild>
//                       <Link href="/dashboard/tools">
//                         <Factory className="w-4 h-4" />
//                         <span>Our Tools</span>
//                       </Link>
//                     </SidebarMenuButton>
//                   </SidebarMenuItem>
//                   <SidebarMenuItem>
//                     <SidebarMenuButton asChild>
//                       <Link href="/dashboard/customers">
//                         <Users className="w-4 h-4" />
//                         <span>Customers</span>
//                       </Link>
//                     </SidebarMenuButton>
//                   </SidebarMenuItem>
//                   <SidebarMenuItem>
//                     <SidebarMenuButton asChild>
//                       <Link href="/dashboard/feedback">
//                         <MessageSquare className="w-4 h-4" />
//                         <span>Customer Feedback</span>
//                       </Link>
//                     </SidebarMenuButton>
//                   </SidebarMenuItem>
//                   <SidebarMenuItem>
//                     <SidebarMenuButton asChild>
//                       <Link href="/dashboard/analysis">
//                         <BarChart3 className="w-4 h-4" />
//                         <span>Analysis & Inventory</span>
//                       </Link>
//                     </SidebarMenuButton>
//                   </SidebarMenuItem>
//                 </SidebarMenu>
//               </SidebarGroupContent>
//             </SidebarGroup>

//             <SidebarGroup>
//               <SidebarGroupLabel>Management</SidebarGroupLabel>
//               <SidebarGroupContent>
//                 <SidebarMenu>
//                   <SidebarMenuItem>
//                     <SidebarMenuButton isActive asChild>
//                       <Link href="/dashboard/setting">
//                         <Settings className="w-4 h-4" />
//                         <span>Settings</span>
//                       </Link>
//                     </SidebarMenuButton>
//                   </SidebarMenuItem>
//                 </SidebarMenu>
//               </SidebarGroupContent>
//             </SidebarGroup>
//           </SidebarContent>

//           <SidebarFooter className="border-t border-gray-200 p-4">
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="ghost" className="w-full justify-start p-2">
//                   <Avatar className="w-8 h-8 mr-3">
//                     <AvatarImage src={user?.avatar || "/placeholder.svg"} />
//                     <AvatarFallback className="bg-innecos-yellow text-innecos-green">
//                       {user?.name
//                         ?.split(" ")
//                         .map((n: string) => n[0])
//                         .join("")}
//                     </AvatarFallback>
//                   </Avatar>
//                   <div className="text-left">
//                     <p className="text-sm font-medium">{user?.name}</p>
//                     <p className="text-xs text-gray-500">{user?.role}</p>
//                   </div>
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end" className="w-56">
//                 <DropdownMenuLabel>My Account</DropdownMenuLabel>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem>
//                   <User className="w-4 h-4 mr-2" />
//                   Profile
//                 </DropdownMenuItem>
//                 <DropdownMenuItem>
//                   <Shield className="w-4 h-4 mr-2" />
//                   Security
//                 </DropdownMenuItem>
//                 <DropdownMenuItem>
//                   <Cog className="w-4 h-4 mr-2" />
//                   Preferences
//                 </DropdownMenuItem>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem onClick={handleLogout} className="text-red-600">
//                   <LogOut className="w-4 h-4 mr-2" />
//                   Logout
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </SidebarFooter>
//           <SidebarRail />
//         </Sidebar>

//         {/* Main Content */}
//         <SidebarInset className="flex-1">
//           {/* Header */}
//           <header className="sticky top-0 z-40 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
//             <div className="flex h-16 items-center gap-4 px-6">
//               <SidebarTrigger />
//               <div className="flex-1">
//                 <h1 className="text-xl font-semibold text-innecos-green">Settings</h1>
//               </div>
//             </div>
//           </header>

//           {/* Settings Content */}
//           <main className="flex-1 p-6">
//             <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
//               <TabsList className="grid w-full grid-cols-3 mb-6">
//                 <TabsTrigger value="account">
//                   <User className="w-4 h-4 mr-2" />
//                   Account
//                 </TabsTrigger>
//                 <TabsTrigger value="security">
//                   <Shield className="w-4 h-4 mr-2" />
//                   Security
//                 </TabsTrigger>
             
//               </TabsList>

//               {/* Account Settings */}
//               <TabsContent value="account" className="space-y-6">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle className="text-innecos-green">Profile Information</CardTitle>
//                     <CardDescription>Update your personal details and avatar</CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <form onSubmit={handleProfileUpdate} className="space-y-6">
//                       <div className="flex flex-col md:flex-row gap-6">
//                         <div className="flex flex-col items-center space-y-4">
//                           <Avatar className="w-24 h-24">
//                             <AvatarImage src={profileForm.avatar} />
//                             <AvatarFallback className="bg-innecos-yellow/20 text-innecos-green text-3xl">
//                               {profileForm.name.split(" ").map(n => n[0]).join("")}
//                             </AvatarFallback>
//                           </Avatar>
//                           <Button variant="outline" className="w-full">
//                             Change Avatar
//                           </Button>
//                         </div>
//                         <div className="flex-1 space-y-4">
//                           <div className="space-y-2">
//                             <Label htmlFor="name">Full Name</Label>
//                             <Input
//                               id="name"
//                               value={profileForm.name}
//                               onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
//                             />
//                           </div>
//                           <div className="space-y-2">
//                             <Label htmlFor="email">Email Address</Label>
//                             <Input
//                               id="email"
//                               type="email"
//                               value={profileForm.email}
//                               onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
//                             />
//                           </div>
//                           <div className="space-y-2">
//                             <Label htmlFor="phone">Phone Number</Label>
//                             <Input
//                               id="phone"
//                               type="tel"
//                               value={profileForm.phone}
//                               onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
//                             />
//                           </div>
//                         </div>
//                       </div>
//                       <div className="flex justify-end">
//                         <Button type="submit" className="bg-innecos-yellow hover:bg-innecos-yellow/90 text-innecos-green">
//                           <CheckCircle className="w-4 h-4 mr-2" />
//                           Save Changes
//                         </Button>
//                       </div>
//                     </form>
//                   </CardContent>
//                 </Card>

//                 <Card>
//                   <CardHeader>
//                     <CardTitle className="text-innecos-green">Account Details</CardTitle>
//                     <CardDescription>View your account information and role</CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                       <div className="space-y-4">
//                         <div>
//                           <p className="text-sm font-medium text-gray-600">Account ID</p>
//                           <p className="font-mono">INN-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</p>
//                         </div>
//                         <div>
//                           <p className="text-sm font-medium text-gray-600">Registration Date</p>
//                           <p>{new Date().toLocaleDateString()}</p>
//                         </div>
//                       </div>
//                       <div className="space-y-4">
//                         <div>
//                           <p className="text-sm font-medium text-gray-600">Account Role</p>
//                           <Badge className="bg-innecos-green/10 text-innecos-green">
//                             {user?.role || "Admin"}
//                           </Badge>
//                         </div>
//                         <div>
//                           <p className="text-sm font-medium text-gray-600">Last Login</p>
//                           <p>{new Date().toLocaleString()}</p>
//                         </div>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </TabsContent>

//               {/* Security Settings */}
//               <TabsContent value="security" className="space-y-6">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle className="text-innecos-green">Password & Security</CardTitle>
//                     <CardDescription>Change your password and manage security settings</CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <form onSubmit={handleSecurityUpdate} className="space-y-6">
//                       <div className="space-y-4">
//                         <div className="space-y-2">
//                           <Label htmlFor="currentPassword">Current Password</Label>
//                           <div className="relative">
//                             <Input
//                               id="currentPassword"
//                               type={showCurrentPassword ? "text" : "password"}
//                               value={securityForm.currentPassword}
//                               onChange={(e) => setSecurityForm({...securityForm, currentPassword: e.target.value})}
//                             />
//                             <button
//                               type="button"
//                               onClick={() => setShowCurrentPassword(!showCurrentPassword)}
//                               className="absolute right-3 top-3 text-gray-400"
//                             >
//                               {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                             </button>
//                           </div>
//                         </div>
//                         <div className="space-y-2">
//                           <Label htmlFor="newPassword">New Password</Label>
//                           <div className="relative">
//                             <Input
//                               id="newPassword"
//                               type={showPassword ? "text" : "password"}
//                               value={securityForm.newPassword}
//                               onChange={(e) => setSecurityForm({...securityForm, newPassword: e.target.value})}
//                             />
//                             <button
//                               type="button"
//                               onClick={() => setShowPassword(!showPassword)}
//                               className="absolute right-3 top-3 text-gray-400"
//                             >
//                               {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                             </button>
//                           </div>
//                         </div>
//                         <div className="space-y-2">
//                           <Label htmlFor="confirmPassword">Confirm New Password</Label>
//                           <Input
//                             id="confirmPassword"
//                             type={showPassword ? "text" : "password"}
//                             value={securityForm.confirmPassword}
//                             onChange={(e) => setSecurityForm({...securityForm, confirmPassword: e.target.value})}
//                           />
//                         </div>
//                       </div>
//                       <div className="flex justify-end">
//                         <Button type="submit" className="bg-innecos-yellow hover:bg-innecos-yellow/90 text-innecos-green">
//                           <Shield className="w-4 h-4 mr-2" />
//                           Update Password
//                         </Button>
//                       </div>
//                     </form>
//                   </CardContent>
//                 </Card>

//                  <Card className="border-red-200 bg-red-50">
//                   <CardHeader>
//                     <CardTitle className="text-red-600">Danger Zone</CardTitle>
//                     <CardDescription>Irreversible actions that may affect your account</CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="space-y-4">
//                       <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-white">
//                         <div>
//                           <h4 className="font-medium">Delete Account</h4>
//                           <p className="text-sm text-gray-600">
//                             Permanently remove your account and all associated data
//                           </p>
//                         </div>
//                         <Button variant="destructive">
//                           Delete Account
//                         </Button>
//                       </div>
//                       <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-white">
//                         <div>
//                           <h4 className="font-medium">Logout All Devices</h4>
//                           <p className="text-sm text-gray-600">
//                             Sign out of all devices where you're currently logged in
//                           </p>
//                         </div>
//                         <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-100">
//                           Logout Everywhere
//                         </Button>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </TabsContent>

           
//             </Tabs>
//           </main>
//         </SidebarInset>
//       </div>
//     </SidebarProvider>
//   )
// }

"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge" // Added Badge import
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  Bell,
  Mail,
  Lock,
  User,
  Shield,
  Cog,
  LogOut,
  Eye,
  EyeOff,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"

export default function SettingsPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [currentTab, setCurrentTab] = useState("account")
  const [showPassword, setShowPassword] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)

  // Form states
  const [profileForm, setProfileForm] = useState({
    name: "",
    email: "",
    phone: "",
    avatar: "",
  })
  const [securityForm, setSecurityForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/auth")
      return
    }

    // Get user data from localStorage (mock system)
    const userData = localStorage.getItem("user")
    if (userData) {
      const user = JSON.parse(userData)
      setUser(user)
      setProfileForm({
        name: user.name,
        email: user.email,
        phone: user.phone || "",
        avatar: user.avatar || "",
      })
    } else {
      // Fallback mock user data
      const mockUser = {
        name: "John Doe",
        email: "john.doe@innecos.com",
        role: "Admin",
        avatar: "/placeholder.svg?height=40&width=40",
      }
      setUser(mockUser)
      setProfileForm({
        name: mockUser.name,
        email: mockUser.email,
        phone: "",
        avatar: mockUser.avatar,
      })
    }
    setLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    router.push("/auth")
  }

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would send this to your backend
    console.log("Updating profile:", profileForm)
    alert("Profile updated successfully!")
  }

  const handleSecurityUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    if (securityForm.newPassword !== securityForm.confirmPassword) {
      alert("New passwords don't match!")
      return
    }
    // In a real app, you would send this to your backend
    console.log("Updating security settings:", securityForm)
    alert("Security settings updated successfully!")
    setSecurityForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
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
                <h1 className="text-xl font-semibold text-innecos-green">Settings</h1>
              </div>
            </div>
          </header>

          {/* Settings Content */}
          <main className="flex-1 p-6">
            <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="account">
                  <User className="w-4 h-4 mr-2" />
                  Account
                </TabsTrigger>
                <TabsTrigger value="security">
                  <Shield className="w-4 h-4 mr-2" />
                  Security
                </TabsTrigger>
              </TabsList>

              {/* Account Settings */}
              <TabsContent value="account" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-innecos-green">Profile Information</CardTitle>
                    <CardDescription>Update your personal details and avatar</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleProfileUpdate} className="space-y-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex flex-col items-center space-y-4">
                          <Avatar className="w-24 h-24">
                            <AvatarImage src={profileForm.avatar} />
                            <AvatarFallback className="bg-innecos-yellow/20 text-innecos-green text-3xl">
                              {profileForm.name.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <Button variant="outline" className="w-full">
                            Change Avatar
                          </Button>
                        </div>
                        <div className="flex-1 space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                              id="name"
                              value={profileForm.name}
                              onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                              id="email"
                              type="email"
                              value={profileForm.email}
                              onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                              id="phone"
                              type="tel"
                              value={profileForm.phone}
                              onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button type="submit" className="bg-innecos-yellow hover:bg-innecos-yellow/90 text-innecos-green">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Save Changes
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-innecos-green">Account Details</CardTitle>
                    <CardDescription>View your account information and role</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Account ID</p>
                          <p className="font-mono">INN-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600">Registration Date</p>
                          <p>{new Date().toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Account Role</p>
                          <Badge className="bg-innecos-green/10 text-innecos-green">
                            {user?.role || "Admin"}
                          </Badge>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600">Last Login</p>
                          <p>{new Date().toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Security Settings */}
              <TabsContent value="security" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-innecos-green">Password & Security</CardTitle>
                    <CardDescription>Change your password and manage security settings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSecurityUpdate} className="space-y-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="currentPassword">Current Password</Label>
                          <div className="relative">
                            <Input
                              id="currentPassword"
                              type={showCurrentPassword ? "text" : "password"}
                              value={securityForm.currentPassword}
                              onChange={(e) => setSecurityForm({...securityForm, currentPassword: e.target.value})}
                            />
                            <button
                              type="button"
                              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                              className="absolute right-3 top-3 text-gray-400"
                            >
                              {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="newPassword">New Password</Label>
                          <div className="relative">
                            <Input
                              id="newPassword"
                              type={showPassword ? "text" : "password"}
                              value={securityForm.newPassword}
                              onChange={(e) => setSecurityForm({...securityForm, newPassword: e.target.value})}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-3 text-gray-400"
                            >
                              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">Confirm New Password</Label>
                          <Input
                            id="confirmPassword"
                            type={showPassword ? "text" : "password"}
                            value={securityForm.confirmPassword}
                            onChange={(e) => setSecurityForm({...securityForm, confirmPassword: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button type="submit" className="bg-innecos-yellow hover:bg-innecos-yellow/90 text-innecos-green">
                          <Shield className="w-4 h-4 mr-2" />
                          Update Password
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>

                <Card className="border-red-200 bg-red-50">
                  <CardHeader>
                    <CardTitle className="text-red-600">Danger Zone</CardTitle>
                    <CardDescription>Irreversible actions that may affect your account</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-white">
                        <div>
                          <h4 className="font-medium">Delete Account</h4>
                          <p className="text-sm text-gray-600">
                            Permanently remove your account and all associated data
                          </p>
                        </div>
                        <Button variant="destructive">
                          Delete Account
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-white">
                        <div>
                          <h4 className="font-medium">Logout All Devices</h4>
                          <p className="text-sm text-gray-600">
                            Sign out of all devices where you're currently logged in
                          </p>
                        </div>
                        <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-100">
                          Logout Everywhere
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}