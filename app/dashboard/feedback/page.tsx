"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Sidebar, SidebarHeader, SidebarProvider } from "@/components/ui/sidebar"
import { Leaf, Clock, CheckCircle, AlertCircle } from "lucide-react"

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
      "The grain dryer has exceeded our expectations. The temperature control is precise and the efficiency is outstanding. Our grain quality has improved significantly since we started using this equipment.",
    date: "2024-01-10",
    status: "New",
    priority: "Medium",
    category: "Product Review",
  },
  {
    id: 2,
    customer: "Farm Valley Co-op",
    customerEmail: "info@farmvalley.com",
    product: "Maize Mill Pro",
    rating: 4,
    subject: "Good Service, Fast Delivery",
    message:
      "We received our maize mill on time and the installation was smooth. The equipment works well, though we had some initial questions about the settings. The support team was helpful.",
    date: "2024-01-08",
    status: "In Progress",
    priority: "Low",
    category: "Service",
  },
  {
    id: 3,
    customer: "Green Fields",
    customerEmail: "admin@greenfields.com",
    product: "Oil Presser Elite",
    rating: 5,
    subject: "Outstanding Technical Support",
    message:
      "When we had an issue with our oil presser, the technical support team responded immediately. They walked us through the troubleshooting process and had us back up and running within hours. Excellent service!",
    date: "2024-01-06",
    status: "Resolved",
    priority: "High",
    category: "Technical Support",
  },
  {
    id: 4,
    customer: "Prairie Grains",
    customerEmail: "contact@prairiegrains.com",
    product: "Feed Processor 2000",
    rating: 3,
    subject: "Equipment Issue",
    message:
      "We've been experiencing some inconsistencies with the mixing process. Sometimes the feed comes out unevenly mixed. We would appreciate some guidance on proper calibration.",
    date: "2024-01-05",
    status: "New",
    priority: "High",
    category: "Technical Issue",
  },
  {
    id: 5,
    customer: "Harvest Solutions",
    customerEmail: "sales@harvestsol.com",
    product: "Silo Storage System",
    rating: 4,
    subject: "Great Storage Solution",
    message:
      "The silo system has been working well for our grain storage needs. The monitoring system is particularly useful. Only minor issue is that the installation took longer than expected.",
    date: "2024-01-03",
    status: "In Progress",
    priority: "Low",
    category: "Product Review",
  },
]

export default function FeedbackPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [feedback, setFeedback] = useState(mockFeedback)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [ratingFilter, setRatingFilter] = useState("all")
  const [selectedFeedback, setSelectedFeedback] = useState<any>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isReplyDialogOpen, setIsReplyDialogOpen] = useState(false)

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
        return <AlertCircle className="w-3 h-3 mr-1" />
      case "In Progress":
        return <Clock className="w-3 h-3 mr-1" />
      case "Resolved":
        return <CheckCircle className="w-3 h-3 mr-1" />
      default:
        return null
    }
  }

  const filteredFeedback = feedback.filter((item) => {
    const matchesSearch = item.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.product.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || item.status === statusFilter
    const matchesPriority = priorityFilter === "all" || item.priority === priorityFilter
    const matchesRating = ratingFilter === "all" || item.rating.toString() === ratingFilter
    
    return matchesSearch && matchesStatus && matchesPriority && matchesRating
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
                <h1 className="\
