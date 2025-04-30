'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux" 
import { setTokens } from "@/redux/slices/authSlice"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, AlertCircle, CheckCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
  rememberMe: z.boolean().optional(),
})

type LoginFormValues = z.infer<typeof loginSchema>

export function LoginForm() {
  const router = useRouter()
  const dispatch = useDispatch()
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

  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true)
    setError(null)
  
    try {
      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        })
      })
  
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Login failed")
      }
  
      const result = await response.json()
      console.log("Login successful:", result)

      dispatch(setTokens(result.access_token))
      router.push("/")
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
