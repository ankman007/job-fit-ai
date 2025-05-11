'use client';
import type { Metadata } from "next";
import { ResetPasswordForm } from "@/components/auth/reset-password-form"
import { AuthLayout } from "@/components/auth/auth-layout";
import withGuest from "@/hoc/withGuest";

// export const metadata: Metadata = {
//   title: "Reset Password | JobFitAI",
//   description: "Set a new password for your JobFitAI account",
// }

function ResetPasswordPage() {
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

export default withGuest(ResetPasswordForm);
