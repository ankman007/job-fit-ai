import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md mx-auto">
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-full border-4 border-t-teal-600 border-gray-200 animate-spin mx-auto"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-teal-600 font-bold text-lg">AI</span>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-2">Preparing Your Interview Cheatsheet</h2>
        <p className="text-gray-600 mb-8">
          Our AI is analyzing your resume and job description to create personalized insights.
        </p>

        <div className="space-y-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-teal-600 flex items-center justify-center text-white text-xs font-bold mr-3">
                1
              </div>
              <div className="flex-1">
                <div className="h-2 bg-teal-600 rounded-full"></div>
                <p className="text-sm mt-1 text-gray-600">Analyzing resume</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-teal-600 flex items-center justify-center text-white text-xs font-bold mr-3">
                2
              </div>
              <div className="flex-1">
                <div className="h-2 bg-teal-600 rounded-full w-3/4"></div>
                <p className="text-sm mt-1 text-gray-600">Processing job description</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-white text-xs font-bold mr-3">
                3
              </div>
              <div className="flex-1">
                <div className="h-2 bg-gray-200 rounded-full"></div>
                <p className="text-sm mt-1 text-gray-400">Generating insights</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-white text-xs font-bold mr-3">
                4
              </div>
              <div className="flex-1">
                <div className="h-2 bg-gray-200 rounded-full"></div>
                <p className="text-sm mt-1 text-gray-400">Creating interview questions</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center text-sm text-gray-500">
          <Loader2 className="animate-spin mr-2 h-4 w-4" />
          This usually takes 30-60 seconds
        </div>
      </div>
    </div>
  )
}
