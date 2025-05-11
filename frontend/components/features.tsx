import { Card, CardContent } from "@/components/ui/card"
import { FileText, Zap, Award, Clock } from "lucide-react"

export function Features() {
  const features = [
    {
      icon: <FileText className="h-10 w-10 text-teal-600" />,
      title: "Resume Analysis",
      description: "Our AI analyzes your resume to identify key skills and experiences relevant to the job.",
    },
    {
      icon: <Zap className="h-10 w-10 text-teal-600" />,
      title: "Personalized Insights",
      description:
        "Get tailored interview questions and talking points based on your background and the job requirements.",
    },
    {
      icon: <Award className="h-10 w-10 text-teal-600" />,
      title: "Competitive Edge",
      description: "Stand out from other candidates with well-prepared, job-specific answers.",
    },
    {
      icon: <Clock className="h-10 w-10 text-teal-600" />,
      title: "Time Saving",
      description: "Prepare efficiently with a focused cheatsheet instead of hours of generic research.",
    },
  ]

  return (
    <section className="py-16 px-4 md:px-6">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Why Use Job Fit AI?</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
