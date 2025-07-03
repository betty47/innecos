import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Leaf, Factory, Users, BarChart3, ArrowRight, Shield, Zap, Globe } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-innecos-green via-innecos-green/95 to-innecos-green/90">
      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-innecos-yellow to-innecos-yellow/80 rounded-xl flex items-center justify-center">
            <Leaf className="w-6 h-6 text-innecos-green" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">INNECOS</h1>
            <p className="text-xs text-green-200">Innovative Eco Solutions</p>
          </div>
        </div>
        <Link href="/auth">
          <Button className="bg-innecos-yellow hover:bg-innecos-yellow/90 text-innecos-green font-semibold">
            Admin Portal
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <Badge className="bg-innecos-yellow/20 text-innecos-yellow border-innecos-yellow/30 mb-6">
            🌱 Sustainable Agriculture Technology
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Transforming
            <span className="block text-innecos-yellow">Agriculture</span>
          </h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto mb-8">
            Advanced agro-processing equipment and innovative solutions for modern farming. Empowering farmers with
            cutting-edge technology for sustainable food production.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth">
              <Button
                size="lg"
                className="bg-innecos-yellow hover:bg-innecos-yellow/90 text-innecos-green font-semibold"
              >
                Access Dashboard
                <Shield className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-innecos-green bg-transparent"
            >
              Learn More
              <Globe className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader>
              <Factory className="w-8 h-8 text-innecos-yellow mb-2" />
              <CardTitle className="text-lg">Advanced Equipment</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-100">State-of-the-art grain dryers, mills, and processing equipment.</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader>
              <Users className="w-8 h-8 text-innecos-yellow mb-2" />
              <CardTitle className="text-lg">Customer Focus</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-100">Dedicated support and customized solutions for every client.</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader>
              <BarChart3 className="w-8 h-8 text-innecos-yellow mb-2" />
              <CardTitle className="text-lg">Data Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-100">Comprehensive analytics for optimized agricultural operations.</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader>
              <Zap className="w-8 h-8 text-innecos-yellow mb-2" />
              <CardTitle className="text-lg">Innovation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-100">Cutting-edge technology for sustainable farming practices.</p>
            </CardContent>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="text-4xl font-bold text-innecos-yellow mb-2">500+</div>
            <div className="text-green-100">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-innecos-yellow mb-2">50+</div>
            <div className="text-green-100">Equipment Models</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-innecos-yellow mb-2">99%</div>
            <div className="text-green-100">Customer Satisfaction</div>
          </div>
        </div>

        {/* CTA Section */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-center p-8">
          <CardHeader>
            <CardTitle className="text-2xl text-white mb-4">Ready to Transform Your Agriculture?</CardTitle>
            <CardDescription className="text-green-100 text-lg">
              Join hundreds of farmers who trust INNECOS for their agro-processing needs.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/auth">
              <Button
                size="lg"
                className="bg-innecos-yellow hover:bg-innecos-yellow/90 text-innecos-green font-semibold"
              >
                Get Started Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23fcc200' fillOpacity='0.3'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>
    </div>
  )
}
