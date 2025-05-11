'use client';
import withGuest from "@/hoc/withGuest";
import type { Metadata } from "next"
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form"
import { AuthLayout } from "@/components/auth/auth-layout"

// export const metadata: Metadata = {
//   title: "Forgot Password | JobFitAI",
//   description: "Reset your JobFitAI password",
// }

function ForgotPasswordPage() {
  return (
    <AuthLayout
      heading="Forgot password"
      subheading="Enter your email and we'll send you a password reset link"
      footerText="Remember your password?"
      footerLinkText="Log in"
      footerLinkHref="/auth/login"
    >
      <ForgotPasswordForm />
    </AuthLayout>
  )
}

export default withGuest(ForgotPasswordPage);