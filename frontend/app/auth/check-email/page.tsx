import Link from "next/link"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { AuthLayout } from "@/components/auth/auth-layout"
import { Mail } from "lucide-react"

export const metadata: Metadata = {
  title: "Check Your Email | JobPrepAI",
  description: "Check your email for a password reset link",
}

export default function CheckEmailPage() {
  return (
    <AuthLayout
      heading="Check your email"
      subheading="We've sent a password reset link to your email address. Please check your inbox."
      footerText="Didn't receive an email?"
      footerLinkText="Try again"
      footerLinkHref="/auth/forgot-password"
    >
      <div className="flex flex-col items-center space-y-6">
        <div className="rounded-full bg-teal-100 p-3">
          <Mail className="h-12 w-12 text-teal-600" />
        </div>
        <Button asChild variant="outline" className="w-full">
          <Link href="/auth/login">Back to login</Link>
        </Button>
      </div>
    </AuthLayout>
  )
}
