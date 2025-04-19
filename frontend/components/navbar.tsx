"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Coffee, Menu, X, MessageCircle } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-teal-600">JobPrepAI</span>
            </Link>
          </div>

          {!isMobile && (
            <nav className="mx-6 flex items-center space-x-4 lg:space-x-6">
              <Link href="/" className="text-sm font-medium transition-colors hover:text-teal-600">
                Home
              </Link>
              <Link
                href="#features"
                className="text-sm font-medium text-gray-500 transition-colors hover:text-teal-600"
              >
                Features
              </Link>
              <Link
                href="#how-it-works"
                className="text-sm font-medium text-gray-500 transition-colors hover:text-teal-600"
              >
                How It Works
              </Link>
              <Link href="#pricing" className="text-sm font-medium text-gray-500 transition-colors hover:text-teal-600">
                Pricing
              </Link>
              <Link href="#blog" className="text-sm font-medium text-gray-500 transition-colors hover:text-teal-600">
                Blog
              </Link>
            </nav>
          )}

          <div className="flex items-center space-x-2">
            {!isMobile ? (
              <>
                <Button variant="ghost" size="sm" className="text-gray-700 hover:text-teal-600">
                  Login
                </Button>
                <Button variant="outline" size="sm" className="border-teal-600 text-teal-600 hover:bg-teal-50">
                  Sign Up
                </Button>
                <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                  Get Started
                </Button>
                <Button variant="ghost" size="icon" className="text-amber-500 hover:text-amber-600 hover:bg-amber-50">
                  <Coffee className="h-5 w-5" />
                  <span className="sr-only">Buy Me a Coffee</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-indigo-500 hover:text-indigo-600 hover:bg-indigo-50"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span className="sr-only">Join Discord</span>
                </Button>
              </>
            ) : (
              <Button variant="ghost" size="icon" onClick={toggleMenu}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobile && isMenuOpen && (
        <div className="container mx-auto px-4 pb-4">
          <nav className="flex flex-col space-y-4">
            <Link
              href="/"
              className="text-sm font-medium transition-colors hover:text-teal-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="#features"
              className="text-sm font-medium text-gray-500 transition-colors hover:text-teal-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium text-gray-500 transition-colors hover:text-teal-600"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium text-gray-500 transition-colors hover:text-teal-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="#blog"
              className="text-sm font-medium text-gray-500 transition-colors hover:text-teal-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <div className="flex flex-col space-y-2 pt-2 border-t">
              <Button variant="ghost" size="sm" className="justify-start text-gray-700 hover:text-teal-600">
                Login
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="justify-start border-teal-600 text-teal-600 hover:bg-teal-50"
              >
                Sign Up
              </Button>
              <Button size="sm" className="justify-start bg-teal-600 hover:bg-teal-700">
                Get Started
              </Button>
              <div className="flex space-x-2 pt-2">
                <Button variant="ghost" size="icon" className="text-amber-500 hover:text-amber-600 hover:bg-amber-50">
                  <Coffee className="h-5 w-5" />
                  <span className="sr-only">Buy Me a Coffee</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-indigo-500 hover:text-indigo-600 hover:bg-indigo-50"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span className="sr-only">Join Discord</span>
                </Button>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
