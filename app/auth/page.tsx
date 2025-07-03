"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Leaf, Mail, Lock, ArrowLeft, Eye, EyeOff, Shield, CheckCircle, AlertCircle, KeyRound } from "lucide-react"

export default function AuthPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null)

  // Login state
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")

  // Register state
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [registerEmail, setRegisterEmail] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  // Reset password state
  const [resetEmail, setResetEmail] = useState("")
  const [resetStep, setResetStep] = useState(1) // 1: email input, 2: success message

  // API handlers
  const handleRegister = async () => {
    if (registerPassword !== confirmPassword) {
      setAlert({ type: "error", message: "Passwords do not match" })
      return
    }

    setLoading(true)
    setAlert(null)

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: registerEmail,
          password: registerPassword,
        }),
      })

      const data = await res.json()
      if (res.ok) {
        setAlert({ type: "success", message: "Registration successful. Please login." })
        // Clear form
        setFirstName("")
        setLastName("")
        setRegisterEmail("")
        setRegisterPassword("")
        setConfirmPassword("")
      } else {
        setAlert({ type: "error", message: data.message || "Registration failed" })
      }
    } catch (error) {
      setAlert({ type: "error", message: "Network error. Please try again." })
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async () => {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: loginEmail,
        password: loginPassword,
      }),
    })


      const data = await res.json()
    if (res.ok) {
      localStorage.setItem("token", data.token)
      // Redirect to dashboard instead of alert
      window.location.href = "/dashboard"
    } else {
      alert(data.message || "Login failed")
    }
  }
  const handleResetPassword = async () => {
    if (!resetEmail) {
      setAlert({ type: "error", message: "Please enter your email address" })
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(resetEmail)) {
      setAlert({ type: "error", message: "Please enter a valid email address" })
      return
    }

    setLoading(true)
    setAlert(null)

    try {
      const res = await fetch("http://localhost:5000/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: resetEmail,
        }),
      })

      const data = await res.json()
      if (res.ok) {
        setResetStep(2)
        setAlert({ type: "success", message: "Password reset instructions have been sent to your email." })
      } else {
        setAlert({ type: "error", message: data.message || "Failed to send reset email" })
      }
    } catch (error) {
      setAlert({ type: "error", message: "Network error. Please try again." })
    } finally {
      setLoading(false)
    }
  }

  const resetResetForm = () => {
    setResetStep(1)
    setResetEmail("")
    setAlert(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-innecos-green via-innecos-green/95 to-innecos-green/90 flex items-center justify-center p-4">
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23fcc200' fillOpacity='0.3'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="w-full max-w-md relative z-10">
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

        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-innecos-yellow to-innecos-green rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl text-innecos-green">Welcome Back</CardTitle>
            <CardDescription>Choose your authentication method below</CardDescription>
          </CardHeader>

          <CardContent>
            {alert && (
              <Alert
                className={`mb-4 ${alert.type === "success" ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}
              >
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

            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
                <TabsTrigger value="forgot">Reset</TabsTrigger>
              </TabsList>

              {/* Login */}
              <TabsContent value="login" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="pl-10 pr-10"
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
                <Button
                  className="w-full bg-innecos-green hover:bg-innecos-green/90"
                  onClick={handleLogin}
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    <>
                      <Shield className="w-4 h-4 mr-2" /> Sign In to Portal
                    </>
                  )}
                </Button>
              </TabsContent>

              {/* Register */}
              <TabsContent value="register" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input
                      id="first-name"
                      placeholder="First name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input
                      id="last-name"
                      placeholder="Last name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="register-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      className="pl-10 pr-10"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
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
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      className="pl-10 pr-10"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
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
                <Button
                  className="w-full bg-innecos-green hover:bg-innecos-green/90"
                  onClick={handleRegister}
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Creating account...</span>
                    </div>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" /> Create Admin Account
                    </>
                  )}
                </Button>
              </TabsContent>

              {/* Reset Password */}
              <TabsContent value="forgot" className="space-y-4">
                {resetStep === 1 ? (
                  <>
                    <div className="text-center mb-4">
                      <KeyRound className="w-12 h-12 text-innecos-green mx-auto mb-2" />
                      <h3 className="text-lg font-semibold text-innecos-green">Reset Your Password</h3>
                      <p className="text-sm text-gray-600">
                        Enter your email address and we'll send you instructions to reset your password.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reset-email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="reset-email"
                          type="email"
                          placeholder="Enter your email address"
                          className="pl-10"
                          value={resetEmail}
                          onChange={(e) => setResetEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    <Button
                      className="w-full bg-innecos-green hover:bg-innecos-green/90"
                      onClick={handleResetPassword}
                      disabled={loading}
                    >
                      {loading ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Sending instructions...</span>
                        </div>
                      ) : (
                        <>
                          <Mail className="w-4 h-4 mr-2" /> Send Reset Instructions
                        </>
                      )}
                    </Button>
                  </>
                ) : (
                  <div className="text-center space-y-4">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                    <div>
                      <h3 className="text-lg font-semibold text-innecos-green mb-2">Check Your Email</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        We've sent password reset instructions to <strong>{resetEmail}</strong>
                      </p>
                      <p className="text-xs text-gray-500 mb-4">
                        Didn't receive the email? Check your spam folder or try again.
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full border-innecos-green text-innecos-green hover:bg-innecos-green hover:text-white bg-transparent"
                      onClick={resetResetForm}
                    >
                      Try Different Email
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="text-center mt-8 text-green-100 text-sm">
          <p>© 2025 INNECOS LTD - Innovative Eco Solutions</p>
        </div>
      </div>
    </div>
  )
}
