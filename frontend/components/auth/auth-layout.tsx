import type React from "react"
import Link from "next/link"
import { Sparkles } from "lucide-react"

interface AuthLayoutProps {
  children: React.ReactNode
  heading: string
  subheading: string
  footerText: string
  footerLinkText: string
  footerLinkHref: string
}

export function AuthLayout({
  children,
  heading,
  subheading,
  footerText,
  footerLinkText,
  footerLinkHref,
}: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-8">
      <div className="w-full max-w-md space-y-6">
        <Link
          href="/"
          className="flex items-center justify-center text-2xl font-bold text-teal-600 hover:text-teal-700"
        >
          <Sparkles className="mr-2 h-6 w-6" />
          JobFitAI
        </Link>

        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">{heading}</h1>
          <p className="text-gray-500">{subheading}</p>
        </div>

        <div className="rounded-lg border bg-white p-6 shadow-sm">
          {children}
        </div>

        {footerText && footerLinkText && footerLinkHref && (
          <div className="text-center text-sm text-gray-600">
            {footerText}{" "}
            <Link href={footerLinkHref} className="font-medium text-teal-600 hover:text-teal-700">
              {footerLinkText}
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
