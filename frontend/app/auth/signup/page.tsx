'use client';
import withGuest from "@/hoc/withGuest";
import type { Metadata } from "next";
import { SignUpForm } from "@/components/auth/signup-form"
import { AuthLayout } from "@/components/auth/auth-layout"

// export const metadata: Metadata = {
//   title: "Sign Up | JobPrepAI",
//   description: "Create a new JobPrepAI account",
// }

function SignUpPage() {
  return (
    <AuthLayout
      heading="Create an account"
      subheading="Enter your details to get started with JobPrepAI"
      footerText="Already have an account?"
      footerLinkText="Log in"
      footerLinkHref="/auth/login"
    >
      <SignUpForm />
    </AuthLayout>
  )
}

export default withGuest(SignUpPage);