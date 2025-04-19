import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { FileUploader } from "@/components/file-uploader"
import { HowItWorks } from "@/components/how-it-works"
import { Features } from "@/components/features"
import { Hero } from "@/components/hero"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { UserToggle } from "@/components/user-toggle"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <section className="py-16 px-4 md:px-6 bg-gray-50" id="upload">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-4">Get Started</h2>
          <p className="text-center text-lg mb-8">
            <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full font-medium">100% Free</span> - No credit
            card required
          </p>

          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="flex justify-center mb-2">
                  <UserToggle />
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Upload Your Resume</h3>
                  <FileUploader />
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Enter Job Description</h3>
                  <Textarea placeholder="Paste the job description here..." className="min-h-[150px]" />
                </div>

                <Button className="w-full" size="lg">
                  Generate Interview Cheatsheet
                </Button>

                <p className="text-sm text-gray-500 text-center">
                  Our AI will analyze your resume and the job description to create a personalized interview preparation
                  guide.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      <HowItWorks />
      <Footer />
    </main>
  )
}
