import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"

export function Hero() {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Ace Your Next Interview with <span className="text-teal-600">Job Prep AI</span>
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl">
              Add your resume, job description. Let the AI sprinkle in some magic. And voila - you get a cheatsheet to
              prepare for your next interview.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild size="lg" className="bg-teal-600 hover:bg-teal-700">
                <Link href="#upload">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>

          <div className="flex-1 relative">
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-teal-200 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute inset-4 bg-teal-100 rounded-full"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="h-20 w-20 text-teal-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent"></div>
    </section>
  )
}
