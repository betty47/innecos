import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Wheat,
  Factory,
  Truck,
  Users,
  BarChart3,
  Settings,
  Shield,
  ArrowRight,
  Leaf,
  Cog,
  TrendingUp,
} from "lucide-react"

export default function AdminLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-innecos-yellow to-innecos-green rounded-lg flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-innecos-green">INNECOS</h1>
                <p className="text-xs text-gray-600">Admin Portal</p>
              </div>
            </div>
            <Link href="/auth">
              <Button className="bg-innecos-yellow hover:bg-innecos-yellow/90 text-innecos-green font-semibold">
                Access Portal
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-innecos-green mb-6">
              Welcome to INNECOS
              <span className="block text-3xl md:text-4xl text-innecos-yellow mt-2">Admin Control Center</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Manage your agro-processing technology platform with precision. Monitor equipment, track performance, and
              drive agricultural innovation forward.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth">
                <Button size="lg" className="bg-innecos-green hover:bg-innecos-green/90 text-white px-8 py-3">
                  <Shield className="w-5 h-5 mr-2" />
                  Secure Login
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-innecos-green text-innecos-green hover:bg-innecos-green/5 px-8 py-3 bg-transparent"
              >
                <BarChart3 className="w-5 h-5 mr-2" />
                View Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-innecos-green mb-4">Innovative Eco Solutions at Your Fingertips</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive management tools for agro-processing technology, designed to boost efficiency and
              sustainability across your operations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-innecos-yellow to-innecos-yellow/80 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Wheat className="w-8 h-8 text-innecos-green" />
                </div>
                <h3 className="text-xl font-semibold text-innecos-green mb-3">Equipment Management</h3>
                <p className="text-gray-600">
                  Monitor and manage grain dryers, milling systems, silos, and processing units in real-time.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-innecos-green to-innecos-green/80 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Factory className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-innecos-green mb-3">Production Analytics</h3>
                <p className="text-gray-600">
                  Track productivity metrics, efficiency rates, and performance data across all operations.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-innecos-yellow to-innecos-green rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Truck className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-innecos-green mb-3">Supply Chain</h3>
                <p className="text-gray-600">
                  Manage inventory, track shipments, and coordinate with suppliers and distributors.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-innecos-green to-innecos-yellow rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-innecos-green mb-3">Client Management</h3>
                <p className="text-gray-600">
                  Manage farmer relationships, cooperatives, and agribusiness partnerships effectively.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-innecos-yellow to-innecos-green rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-innecos-green mb-3">Growth Insights</h3>
                <p className="text-gray-600">
                  Advanced analytics and reporting tools to drive strategic business decisions.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-innecos-green to-innecos-yellow rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Settings className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-innecos-green mb-3">System Control</h3>
                <p className="text-gray-600">
                  Configure platform settings, manage user access, and maintain system security.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-innecos-green to-innecos-green/90">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto text-white">
            <Cog className="w-16 h-16 mx-auto mb-6 text-innecos-yellow" />
            <h2 className="text-4xl font-bold mb-6">Ready to Transform Agriculture?</h2>
            <p className="text-xl mb-8 text-green-100">
              Join the revolution in agro-processing technology. Access your admin portal and start building a smarter,
              more resilient agricultural future.
            </p>
            <Link href="/auth">
              <Button
                size="lg"
                className="bg-innecos-yellow hover:bg-innecos-yellow/90 text-innecos-green font-semibold px-10 py-4 text-lg"
              >
                <Shield className="w-5 h-5 mr-2" />
                Access Admin Portal
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-8 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-innecos-yellow to-innecos-green rounded-lg flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-innecos-green">INNECOS LTD</p>
                <p className="text-xs text-gray-600">Innovative Eco Solutions</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm">© 2024 INNECOS. Building a smarter agricultural future.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
