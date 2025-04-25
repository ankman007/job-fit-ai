import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

export function Pricing() {
  return (
    <section className="py-16 px-4 md:px-6 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Start for free and upgrade when you need more features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <Card className="border-2 border-teal-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Free</CardTitle>
              <div className="mt-4">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-gray-500 ml-2">/ month</span>
              </div>
              <CardDescription className="mt-2">Perfect for job seekers</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {[
                  "5 Interview Cheatsheets per month",
                  "Resume Analysis",
                  "Basic Job Matching",
                  "Standard Templates",
                ].map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-teal-500 mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full bg-teal-600 hover:bg-teal-700">
                <Link href="/auth/signup">Get Started</Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Pro Plan */}
          <Card className="border-2 border-teal-600 shadow-xl relative">
            <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
              <span className="bg-teal-600 text-white text-xs px-3 py-1 rounded-full">Popular</span>
            </div>
            <CardHeader>
              <CardTitle className="text-2xl">Pro</CardTitle>
              <div className="mt-4">
                <span className="text-4xl font-bold">$9.99</span>
                <span className="text-gray-500 ml-2">/ month</span>
              </div>
              <CardDescription className="mt-2">For serious job hunters</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {[
                  "Unlimited Interview Cheatsheets",
                  "Advanced Resume Analysis",
                  "Priority Job Matching",
                  "Premium Templates",
                  "Interview Question Bank",
                  "Email Support",
                ].map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-teal-500 mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full bg-teal-600 hover:bg-teal-700">
                <Link href="/auth/signup">Get Started</Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Enterprise Plan */}
          <Card className="border shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Enterprise</CardTitle>
              <div className="mt-4">
                <span className="text-4xl font-bold">$29.99</span>
                <span className="text-gray-500 ml-2">/ month</span>
              </div>
              <CardDescription className="mt-2">For teams and organizations</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {[
                  "Everything in Pro",
                  "Team Management",
                  "Custom Branding",
                  "API Access",
                  "Dedicated Account Manager",
                  "24/7 Priority Support",
                ].map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-teal-500 mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full border-teal-600 text-teal-600 hover:bg-teal-50">
                <Link href="/contact">Contact Sales</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  )
}
