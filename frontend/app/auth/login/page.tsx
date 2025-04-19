import type { Metadata } from "next"
import { LoginForm } from "@/components/auth/login-form"
import { AuthLayout } from "@/components/auth/auth-layout"

export const metadata: Metadata = {
  title: "Login | JobPrepAI",
  description: "Login to your JobPrepAI account",
}

export default function LoginPage() {
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
