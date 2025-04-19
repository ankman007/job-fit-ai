import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles, Home, ArrowLeft, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <Link
          href="/"
          className="mb-8 flex items-center justify-center text-2xl font-bold text-teal-600 hover:text-teal-700"
        >
          <Sparkles className="mr-2 h-6 w-6" />
          JobPrepAI
        </Link>

        <div className="w-full max-w-md text-center space-y-6">
          <div className="relative">
            <div className="text-9xl font-bold text-gray-200">404</div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-teal-600 text-xl font-semibold">Page not found</div>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-800">Oops! We couldn't find that page</h1>
          <p className="text-gray-600">
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>

          <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="flex items-center gap-2">
              <Link href="/">
                <Home className="h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <Button asChild variant="outline" className="flex items-center gap-2">
              <Link href="javascript:history.back()">
                <ArrowLeft className="h-4 w-4" />
                Go Back
              </Link>
            </Button>
          </div>

          <div className="pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">Looking for something specific?</p>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search JobPrepAI..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      <footer className="py-6 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} JobPrepAI. All rights reserved.</p>
      </footer>
    </div>
  )
}
