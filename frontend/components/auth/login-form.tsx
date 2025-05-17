"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, AlertCircle, CheckCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useDispatch, useSelector } from 'react-redux';
import { loginAndStartTimer } from "@/redux/slices/authSlice";
import { setUserDetails } from "@/redux/slices/userSlice";
import { setCheatsheets } from "@/redux/slices/cheatsheetSlice";
import { apiBaseURL } from "@/utils";
import type { AppDispatch } from '@/redux/store';

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
  rememberMe: z.boolean().optional(),
})

type LoginFormValues = z.infer<typeof loginSchema>

export function LoginForm() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    mode: "onChange",
  })

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    trigger,
  } = form

  const handleLogin = async (data: LoginFormValues) => {
    try {
      const response = await fetch(`${apiBaseURL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Login failed")
      }
      return await response.json()
    } catch (err: any) {
      throw new Error(err.message || "Login failed")
    }
  }

  const fetchUserDetails = async (accessToken: string) => {
    try {
      const userRes = await fetch(`${apiBaseURL}/user/details`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      if (!userRes.ok) throw new Error('Failed to fetch user details')

      const userData = await userRes.json()
      if (userData.user_details) {
        dispatch(setUserDetails(userData.user_details))
      }
    } catch (err: any) {
      throw new Error('User details fetch failed')
    }
  }

  const fetchCheatsheets = async (accessToken: string) => {
    try {
      const cheatsheetRes = await fetch(`${apiBaseURL}/user/cheatsheets`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      if (!cheatsheetRes.ok) throw new Error('Failed to fetch cheatsheets')

      const cheatsheetData = await cheatsheetRes.json()
      if (cheatsheetData.cheatsheets) {
        dispatch(setCheatsheets(cheatsheetData.cheatsheets))
      }
    } catch (err: any) {
      throw new Error('Cheatsheets fetch failed')
    }
  }

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await handleLogin(data)
      
      if (result.access_token) {
        dispatch(loginAndStartTimer(result.access_token))
        await fetchUserDetails(result.access_token)
        await fetchCheatsheets(result.access_token)
        router.push("/generate")
      }
    } catch (err: any) {
      setError(err.message || "Invalid email or password. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="email" className="flex items-center">
          Email
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="name@example.com"
          autoComplete="email"
          disabled={isLoading}
          className={errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}
          {...register("email", {
            onChange: () => {
              if (errors.email) trigger("email")
            },
          })}
        />
        {errors.email && (
          <p className="text-sm text-red-500 flex items-center mt-1">
            <AlertCircle className="h-3 w-3 mr-1" />
            {errors.email.message}
          </p>
        )}
        {dirtyFields.email && !errors.email && (
          <p className="text-sm text-green-500 flex items-center mt-1">
            <CheckCircle className="h-3 w-3 mr-1" />
            Valid email format!
          </p>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password" className="flex items-center">
            Password
            <span className="text-red-500 ml-1">*</span>
          </Label>
          <Link href="/auth/forgot-password" className="text-sm text-teal-600 hover:text-teal-700">
            Forgot password?
          </Link>
        </div>
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          disabled={isLoading}
          className={errors.password ? "border-red-500 focus-visible:ring-red-500" : ""}
          {...register("password", {
            onChange: () => {
              if (errors.password) trigger("password")
            },
          })}
        />
        {errors.password && (
          <p className="text-sm text-red-500 flex items-center mt-1">
            <AlertCircle className="h-3 w-3 mr-1" />
            {errors.password.message}
          </p>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="remember"
          {...register("rememberMe")}
          onCheckedChange={(checked) => {
            form.setValue("rememberMe", checked === true)
          }}
        />
        <Label htmlFor="remember" className="text-sm font-normal">
          Remember me
        </Label>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Signing in...
          </>
        ) : (
          "Sign in"
        )}
      </Button>
    </form>
  )
}
