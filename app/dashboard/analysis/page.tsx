"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Sidebar, SidebarHeader, SidebarProvider } from "@/components/ui/sidebar"
import { Leaf } from "lucide-react"

// Mock data for charts
const salesData = [
  { month: "Jan", sales: 45000, orders: 120 },
  { month: "Feb", sales: 52000, orders: 135 },
  { month: "Mar", sales: 48000, orders: 128 },
  { month: "Apr", sales: 61000, orders: 155 },
  { month: "May", sales: 55000, orders: 142 },
  { month: "Jun", sales: 67000, orders: 168 },
]

const inventoryData = [
  { name: "Grain Dryers", value: 35, color: "#2D5016" },
  { name: "Maize Mills", value: 25, color: "#F4D03F" },
  { name: "Oil Pressers", value: 20, color: "#8FBC8F" },
  { name: "Feed Processors", value: 15, color: "#DDA0DD" },
  { name: "Storage Systems", value: 5, color: "#F0E68C" },
]

const customerGrowthData = [
  { month: "Jan", customers: 1150 },
  { month: "Feb", customers: 1180 },
  { month: "Mar", customers: 1200 },
  { month: "Apr", customers: 1220 },
  { month: "May", customers: 1240 },
  { month: "Jun", customers: 1260 },
]

export default function AnalysisPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

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
                <p className="text\
