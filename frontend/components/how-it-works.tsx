import { CheckCircle } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Upload Your Resume",
      description: "Start by uploading your current resume in PDF or Word format.",
    },
    {
      number: "02",
      title: "Enter Job Description",
      description: "Paste the full job description for the position you're applying for.",
    },
    {
      number: "03",
      title: "AI Analysis",
      description: "Our AI analyzes both documents to identify key requirements and match them with your experience.",
    },
    {
      number: "04",
      title: "Get Your Cheatsheet",
      description: "Receive a personalized interview preparation guide with talking points and suggested answers.",
    },
  ]

  return (
    <section className="py-16 px-4 md:px-6 bg-white">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center">
                <span className="text-teal-600 font-bold">{step.number}</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
            The Result
          </h3>
          <p className="text-gray-600">You'll receive a comprehensive interview preparation guide that includes:</p>
          <ul className="mt-4 space-y-2">
            {[
              "Key talking points aligned with job requirements",
              "Suggested answers to common interview questions",
              "Technical topics to review based on job requirements",
              "Questions to ask the interviewer",
              "Tips for addressing potential gaps or weaknesses",
            ].map((item, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
