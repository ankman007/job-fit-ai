import type { Metadata } from "next"
import { ResetPasswordForm } from "@/components/auth/reset-password-form"
import { AuthLayout } from "@/components/auth/auth-layout"

export const metadata: Metadata = {
  title: "Reset Password | JobPrepAI",
  description: "Set a new password for your JobPrepAI account",
}

export default function ResetPasswordPage() {
  return (
    <AuthLayout
      heading="Reset password"
      subheading="Enter your new password below"
      footerText="Remember your password?"
      footerLinkText="Log in"
      footerLinkHref="/auth/login"
    >
      <ResetPasswordForm />
    </AuthLayout>
  )
}
