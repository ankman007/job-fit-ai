'use client';
import withGuest from "@/hoc/withGuest";
import Link from "next/link"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { AuthLayout } from "@/components/auth/auth-layout"
import { CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Password Reset Success | JobPrepAI",
  description: "Your password has been reset successfully",
}

function ResetPasswordSuccessPage() {
  return (
    <AuthLayout
      heading="Password reset successful"
      subheading="Your password has been reset successfully. You can now log in with your new password."
      footerText=""
      footerLinkText=""
      footerLinkHref=""
    >
      <div className="flex flex-col items-center space-y-6">
        <div className="rounded-full bg-teal-100 p-3">
          <CheckCircle className="h-12 w-12 text-teal-600" />
        </div>
        <Button asChild className="w-full">
          <Link href="/auth/login">Continue to login</Link>
        </Button>
      </div>
    </AuthLayout>
  )
}

export default withGuest(ResetPasswordSuccessPage);
