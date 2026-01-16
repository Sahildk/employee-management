"use client"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
import { Badge } from "@/components/ui/badge"
import { BarChart2, Users, Shield } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-black/[0.96] antialiased relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500">
            EmpManage
          </div>
          <div className="flex gap-4">
            <Button variant="ghost" className="text-neutral-300 hover:text-white hover:bg-white/10">Sign In</Button>
            <Link href="/dashboard">
              <Button className="bg-white text-black hover:bg-neutral-200">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="p-4 max-w-7xl mx-auto relative z-10 w-full pt-32 md:pt-48">
        <div className="text-center max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4 text-neutral-300 border-neutral-800 bg-neutral-900/50 backdrop-blur">
             🚀 The Future of Work is Here
            </Badge>
          <h1 className="text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50 pb-4">
            Master Your Workforce <br /> with Precision.
          </h1>
          <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg mx-auto">
            A premium dashboard to manage employees, payrolls, and performance with state-of-the-art UI components.
          </p>
          <div className="mt-8 flex justify-center gap-4">
             <Button size="lg" className="bg-white text-black hover:bg-neutral-200 rounded-full h-12 px-8 font-semibold">
               Start Free Trial
             </Button>
             <Button size="lg" variant="outline" className="text-white border-neutral-800 hover:bg-neutral-900 hover:text-white rounded-full h-12 px-8">
               View Demo
             </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 px-4">
            <Card className="bg-neutral-900/50 border-neutral-800 backdrop-blur-sm hover:bg-neutral-900/80 transition-colors duration-300">
                <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center mb-4 text-white">
                        <Users className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-white text-xl">Team Management</CardTitle>
                    <CardDescription className="text-neutral-400">Organize your team structure with intuitive drag-and-drop interfaces.</CardDescription>
                </CardHeader>
            </Card>
            <Card className="bg-neutral-900/50 border-neutral-800 backdrop-blur-sm hover:bg-neutral-900/80 transition-colors duration-300">
                <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center mb-4 text-white">
                         <BarChart2 className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-white text-xl">Analytics</CardTitle>
                    <CardDescription className="text-neutral-400">Real-time insights into employee performance and company growth.</CardDescription>
                </CardHeader>
            </Card>
             <Card className="bg-neutral-900/50 border-neutral-800 backdrop-blur-sm hover:bg-neutral-900/80 transition-colors duration-300">
                <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center mb-4 text-white">
                        <Shield className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-white text-xl">Secure & Private</CardTitle>
                    <CardDescription className="text-neutral-400">Enterprise-grade security to keep your sensitive data safe.</CardDescription>
                </CardHeader>
            </Card>
        </div>
      </div>
    </div>
  );
}
