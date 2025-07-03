"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Leaf, Mail, Lock, User, ArrowLeft, Eye, EyeOff, Shield, CheckCircle } from "lucide-react"

export default function AuthPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")

  // Replace the existing handleLogin function with this mock version
  const handleLogin = async () => {
    try {
      // Mock authentication - simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock validation
      if (!loginEmail || !loginPassword) {
        alert("Please enter both email and password")
        return
      }

      // Mock successful login for demo purposes
      // In a real app, this would validate against your backend
      if (loginEmail.includes("@") && loginPassword.length >= 6) {
        // Generate a mock token
        const mockToken = "mock-jwt-token-" + Date.now()
        localStorage.setItem("token", mockToken)

        // Store mock user data
        localStorage.setItem(
          "user",
          JSON.stringify({
            name: "John Doe",
            email: loginEmail,
            role: "Admin",
          }),
        )

        // Redirect to dashboard
        window.location.href = "/dashboard"
      } else {
        alert("Invalid credentials. Please use a valid email and password (min 6 characters)")
      }
    } catch (error) {
      console.error("Login error:", error)
      alert("Login failed. Please try again.")
    }
  }

  const handleRegister = async (formData: FormData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      alert("Registration successful! Please login with your credentials.")

      // Switch to login tab
      const tabsList = document.querySelector('[role="tablist"]') as HTMLElement
      const loginTab = tabsList?.querySelector('[value="login"]') as HTMLElement
      loginTab?.click()
    } catch (error) {
      alert("Registration failed. Please try again.")
    }
  }

  const handleForgotPassword = async (email: string) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      if (email.includes("@")) {
        alert("Password reset link sent to your email!")
      } else {
        alert("Please enter a valid email address")
      }
    } catch (error) {
      alert("Failed to send reset link. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-innecos-green via-innecos-green/95 to-innecos-green/90 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23fcc200' fillOpacity='0.3'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-white hover:text-innecos-yellow transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-innecos-yellow to-innecos-yellow/80 rounded-xl flex items-center justify-center">
              <Leaf className="w-7 h-7 text-innecos-green" />
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-bold text-white">INNECOS</h1>
              <p className="text-green-200 text-sm">Admin Portal</p>
            </div>
          </div>
          <p className="text-green-100">Secure access to your agro-processing platform</p>
        </div>

        {/* Auth Card */}
        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-innecos-yellow to-innecos-green rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl text-innecos-green">Welcome Back</CardTitle>
            <CardDescription>Choose your authentication method below</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger
                  value="login"
                  className="data-[state=active]:bg-innecos-yellow data-[state=active]:text-innecos-green"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="register"
                  className="data-[state=active]:bg-innecos-yellow data-[state=active]:text-innecos-green"
                >
                  Register
                </TabsTrigger>
                <TabsTrigger
                  value="forgot"
                  className="data-[state=active]:bg-innecos-yellow data-[state=active]:text-innecos-green"
                >
                  Reset
                </TabsTrigger>
              </TabsList>

              {/* Login Tab */}
              <TabsContent value="login" className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="text-innecos-green font-medium">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="admin@innecos.com"
                        className="pl-10 border-gray-200 focus:border-innecos-yellow focus:ring-innecos-yellow"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="text-innecos-green font-medium">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="pl-10 pr-10 border-gray-200 focus:border-innecos-yellow focus:ring-innecos-yellow"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="remember" />
                      <Label htmlFor="remember" className="text-sm text-gray-600">
                        Remember me
                      </Label>
                    </div>
                    <button
                      type="button"
                      className="text-sm text-innecos-green hover:text-innecos-green/80 font-medium"
                      onClick={() => {
                        const tabsList = document.querySelector('[role="tablist"]') as HTMLElement
                        const forgotTab = tabsList?.querySelector('[value="forgot"]') as HTMLElement
                        forgotTab?.click()
                      }}
                    >
                      Forgot password?
                    </button>
                  </div>
                  <Button
                    className="w-full bg-innecos-green hover:bg-innecos-green/90 text-white font-semibold py-2.5"
                    onClick={handleLogin}
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Sign In to Portal
                  </Button>
                </div>
              </TabsContent>

              {/* Register Tab */}
              <TabsContent value="register" className="space-y-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name" className="text-innecos-green font-medium">
                        First Name
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="first-name"
                          placeholder="John"
                          className="pl-10 border-gray-200 focus:border-innecos-yellow focus:ring-innecos-yellow"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name" className="text-innecos-green font-medium">
                        Last Name
                      </Label>
                      <Input
                        id="last-name"
                        placeholder="Doe"
                        className="border-gray-200 focus:border-innecos-yellow focus:ring-innecos-yellow"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email" className="text-innecos-green font-medium">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="john.doe@company.com"
                        className="pl-10 border-gray-200 focus:border-innecos-yellow focus:ring-innecos-yellow"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password" className="text-innecos-green font-medium">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="register-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        className="pl-10 pr-10 border-gray-200 focus:border-innecos-yellow focus:ring-innecos-yellow"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="text-innecos-green font-medium">
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        className="pl-10 pr-10 border-gray-200 focus:border-innecos-yellow focus:ring-innecos-yellow"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox id="terms" className="mt-1" />
                    <Label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
                      I agree to the{" "}
                      <a href="#" className="text-innecos-green hover:underline font-medium">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-innecos-green hover:underline font-medium">
                        Privacy Policy
                      </a>
                    </Label>
                  </div>
                  <Button className="w-full bg-innecos-yellow hover:bg-innecos-yellow/90 text-innecos-green font-semibold py-2.5">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Create Admin Account
                  </Button>
                </div>
              </TabsContent>

              {/* Forgot Password Tab */}
              <TabsContent value="forgot" className="space-y-4">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-innecos-yellow/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-innecos-yellow" />
                  </div>
                  <h3 className="text-lg font-semibold text-innecos-green mb-2">Reset Your Password</h3>
                  <p className="text-gray-600 text-sm">
                    Enter your email address and we'll send you a link to reset your password.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="reset-email" className="text-innecos-green font-medium">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="reset-email"
                        type="email"
                        placeholder="Enter your email address"
                        className="pl-10 border-gray-200 focus:border-innecos-yellow focus:ring-innecos-yellow"
                      />
                    </div>
                  </div>
                  <Button
                    className="w-full bg-innecos-green hover:bg-innecos-green/90 text-white font-semibold py-2.5"
                    onClick={() => {
                      const resetEmailInput = document.getElementById("reset-email") as HTMLInputElement
                      const email = resetEmailInput?.value || ""
                      handleForgotPassword(email)
                    }}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Send Reset Link
                  </Button>
                  <div className="text-center">
                    <button
                      type="button"
                      className="text-sm text-innecos-green hover:text-innecos-green/80 font-medium"
                      onClick={() => {
                        const tabsList = document.querySelector('[role="tablist"]') as HTMLElement
                        const loginTab = tabsList?.querySelector('[value="login"]') as HTMLElement
                        loginTab?.click()
                      }}
                    >
                      Back to Login
                    </button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-green-100 text-sm">
          <p>© 2024 INNECOS LTD - Innovative Eco Solutions</p>
          <p className="mt-1">Building a smarter agricultural future</p>
        </div>
      </div>
    </div>
  )
}
