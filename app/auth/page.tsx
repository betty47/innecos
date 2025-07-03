"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Leaf, Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react"

export default function AuthPage() {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true)
  const [isForgotPassword, setIsForgotPassword] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null)

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setAlert({ type: "error", message: "Email and password are required" })
      return false
    }

    if (!isLogin && !isForgotPassword) {
      if (!formData.firstName || !formData.lastName) {
        setAlert({ type: "error", message: "All fields are required for registration" })
        return false
      }
      if (formData.password !== formData.confirmPassword) {
        setAlert({ type: "error", message: "Passwords do not match" })
        return false
      }
      if (formData.password.length < 6) {
        setAlert({ type: "error", message: "Password must be at least 6 characters long" })
        return false
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setAlert({ type: "error", message: "Please enter a valid email address" })
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setAlert(null)

    if (!validateForm()) return

    setLoading(true)

    try {
      if (isForgotPassword) {
        // Handle forgot password
        setAlert({
          type: "success",
          message: "Password reset instructions have been sent to your email address",
        })
        setTimeout(() => {
          setIsForgotPassword(false)
          setIsLogin(true)
        }, 2000)
      } else if (isLogin) {
        // Handle login
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        })

        const data = await response.json()

        if (response.ok) {
          localStorage.setItem("token", data.token)
          localStorage.setItem("user", JSON.stringify(data.user))

          setAlert({ type: "success", message: "Login successful! Redirecting..." })
          setTimeout(() => router.push("/dashboard"), 1000)
        } else {
          setAlert({ type: "error", message: data.error || "Login failed" })
        }
      } else {
        // Handle registration
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
          }),
        })

        const data = await response.json()

        if (response.ok) {
          setAlert({
            type: "success",
            message: "Registration successful! Please login with your credentials.",
          })
          setTimeout(() => {
            setIsLogin(true)
            setFormData({
              email: formData.email,
              password: "",
              confirmPassword: "",
              firstName: "",
              lastName: "",
            })
          }, 2000)
        } else {
          setAlert({ type: "error", message: data.error || "Registration failed" })
        }
      }
    } catch (error) {
      setAlert({ type: "error", message: "An error occurred. Please try again." })
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
    })
    setAlert(null)
  }

  const switchToLogin = () => {
    setIsLogin(true)
    setIsForgotPassword(false)
    resetForm()
  }

  const switchToRegister = () => {
    setIsLogin(false)
    setIsForgotPassword(false)
    resetForm()
  }

  const switchToForgotPassword = () => {
    setIsForgotPassword(true)
    setIsLogin(true)
    resetForm()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-innecos-green to-innecos-green/90 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo */}
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-innecos-yellow to-innecos-yellow/80 rounded-xl flex items-center justify-center mx-auto mb-4 animate-fadeIn">
            <Leaf className="w-8 h-8 text-innecos-green" />
          </div>
          <h1 className="text-3xl font-bold text-white animate-fadeIn">INNECOS</h1>
          <p className="text-white/80 animate-fadeIn">Agricultural Equipment Management</p>
        </div>

        {/* Auth Card */}
        <Card className="animate-fadeIn">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-innecos-green">
              {isForgotPassword ? "Reset Password" : isLogin ? "Welcome Back" : "Create Account"}
            </CardTitle>
            <CardDescription className="text-center">
              {isForgotPassword
                ? "Enter your email to receive reset instructions"
                : isLogin
                  ? "Sign in to your account"
                  : "Sign up for a new account"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {alert && (
              <Alert className={alert.type === "success" ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
                {alert.type === "success" ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-red-600" />
                )}
                <AlertDescription className={alert.type === "success" ? "text-green-700" : "text-red-700"}>
                  {alert.message}
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && !isForgotPassword && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        type="text"
                        placeholder="Enter first name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required={!isLogin && !isForgotPassword}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        type="text"
                        placeholder="Enter last name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required={!isLogin && !isForgotPassword}
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {!isForgotPassword && (
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>
              )}

              {!isLogin && !isForgotPassword && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>
              )}

              <Button type="submit" className="w-full bg-innecos-green hover:bg-innecos-green/90" disabled={loading}>
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Please wait...</span>
                  </div>
                ) : isForgotPassword ? (
                  "Send Reset Instructions"
                ) : isLogin ? (
                  "Sign In"
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            <div className="text-center space-y-2">
              {isForgotPassword ? (
                <Button
                  variant="link"
                  className="text-innecos-green hover:text-innecos-green/80"
                  onClick={switchToLogin}
                >
                  Back to Sign In
                </Button>
              ) : isLogin ? (
                <>
                  <Button
                    variant="link"
                    className="text-innecos-green hover:text-innecos-green/80 text-sm"
                    onClick={switchToForgotPassword}
                  >
                    Forgot your password?
                  </Button>
                  <div className="text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Button
                      variant="link"
                      className="text-innecos-green hover:text-innecos-green/80 p-0"
                      onClick={switchToRegister}
                    >
                      Sign up
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Button
                    variant="link"
                    className="text-innecos-green hover:text-innecos-green/80 p-0"
                    onClick={switchToLogin}
                  >
                    Sign in
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
