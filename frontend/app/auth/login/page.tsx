'use client';
import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form"
import { AuthLayout } from "@/components/auth/auth-layout"
import withGuest from "@/hoc/withGuest"

// export const metadata: Metadata = {
//   title: "Login | JobFitAI",
//   description: "Login to your JobFitAI account",
// }

function LoginPage() {
  return (
    <AuthLayout
      heading="Welcome back"
      subheading="Enter your credentials to access your account"
      footerText="Don't have an account?"
      footerLinkText="Sign up"
      footerLinkHref="/auth/signup"
    >
      <LoginForm />
    </AuthLayout>
  )
}

export default withGuest(LoginPage);