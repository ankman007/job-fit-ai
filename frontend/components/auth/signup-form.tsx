"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, CheckCircle, ChevronRight, ChevronLeft, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"

// Define a single schema for all form fields
const signupSchema = z
  .object({
    // Step 1: Account information
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
      .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
      .regex(/[0-9]/, { message: "Password must contain at least one number" }),
    confirmPassword: z.string(),
    acceptTerms: z.boolean(),

    // Step 2: Profile information
    jobTitle: z.string().min(2, { message: "Job title must be at least 2 characters" }).optional(),
    location: z.string().min(2, { message: "Location must be at least 2 characters" }).optional(),
    bio: z.string().max(300, { message: "Bio must be less than 300 characters" }).optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

type SignUpFormValues = z.infer<typeof signupSchema>

export function SignUpForm() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 2

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
      jobTitle: "",
      location: "",
      bio: "",
    },
    mode: "onChange", // Validate on change for immediate feedback
  })

  const {
    formState: { errors, isValid, dirtyFields },
    trigger,
    getValues,
  } = form

  // Check if current step is valid
  const isStepValid = async (step: number) => {
    if (step === 1) {
      const result = await trigger(["name", "email", "password", "confirmPassword", "acceptTerms"])
      console.log("Step 1 valid?", result)
      return result
    } else if (step === 2) {
      // For step 2, we can validate the optional fields or just return true
      // since they're optional
      const result = await trigger(["jobTitle", "location", "bio"])
      return result
    }
    return true
  }

  // Handle next step
  const handleNextStep = async () => {
    const isValid = await isStepValid(currentStep)
    if (isValid) {
      setCurrentStep(currentStep + 1)
    }
  }

  // Handle previous step
  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1)
  }

  // Calculate progress percentage
  const progressPercentage = (currentStep / totalSteps) * 100

  async function onSubmit(data: SignUpFormValues) {
    setIsLoading(true)
    setError(null)
  
    try {
      // Perform the API call
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
  
      // Check if the response is successful (status 2xx)
      if (!response.ok) {
        throw new Error('Signup failed. Please try again.')
      }
  
      // Assuming the signup is successful, redirect to login
      router.push("/auth/login")
    } catch (err) {
      setError("An error occurred during sign up. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Password strength indicator
  const getPasswordStrength = () => {
    const password = getValues("password")
    if (!password) return { strength: 0, text: "", color: "" }

    let strength = 0
    if (password.length >= 8) strength += 1
    if (/[A-Z]/.test(password)) strength += 1
    if (/[a-z]/.test(password)) strength += 1
    if (/[0-9]/.test(password)) strength += 1
    if (/[^A-Za-z0-9]/.test(password)) strength += 1

    const strengthMap = [
      { text: "Very weak", color: "bg-red-500" },
      { text: "Weak", color: "bg-orange-500" },
      { text: "Medium", color: "bg-yellow-500" },
      { text: "Strong", color: "bg-blue-500" },
      { text: "Very strong", color: "bg-green-500" },
    ]

    return {
      strength: (strength / 5) * 100,
      text: strengthMap[strength - 1]?.text || "",
      color: strengthMap[strength - 1]?.color || "",
    }
  }

  const passwordStrength = getPasswordStrength()

  return (
    <div className="space-y-4">
      {/* Progress indicator */}
      <div className="mb-6">
        <div className="flex justify-between mb-2 text-sm">
          <span>
            Step {currentStep} of {totalSteps}
          </span>
          <span>{Math.round(progressPercentage)}% Complete</span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Step 1: Account Information */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Account Information</h2>

            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center">
                Full Name
                <span className="text-red-500 ml-1">*</span>
              </Label>
              <Input
                id="name"
                placeholder="John Doe"
                autoComplete="name"
                disabled={isLoading}
                className={errors.name ? "border-red-500 focus-visible:ring-red-500" : ""}
                {...form.register("name", {
                  onChange: () => {
                    if (errors.name) trigger("name")
                  },
                })}
              />
              {errors.name && (
                <p className="text-sm text-red-500 flex items-center mt-1">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {errors.name.message}
                </p>
              )}
              {dirtyFields.name && !errors.name && (
                <p className="text-sm text-green-500 flex items-center mt-1">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Looks good!
                </p>
              )}
            </div>

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
                {...form.register("email", {
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
              <Label htmlFor="password" className="flex items-center">
                Password
                <span className="text-red-500 ml-1">*</span>
              </Label>
              <Input
                id="password"
                type="password"
                autoComplete="new-password"
                disabled={isLoading}
                className={errors.password ? "border-red-500 focus-visible:ring-red-500" : ""}
                {...form.register("password", {
                  onChange: () => {
                    if (errors.password) trigger("password")
                    if (getValues("confirmPassword")) trigger("confirmPassword")
                  },
                })}
              />

              {/* Password strength indicator */}
              {dirtyFields.password && getValues("password") && (
                <div className="mt-2">
                  <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${passwordStrength.color}`}
                      style={{ width: `${passwordStrength.strength}%` }}
                    ></div>
                  </div>
                  <p className="text-xs mt-1">{passwordStrength.text || "Password strength"}</p>
                </div>
              )}

              {errors.password && (
                <p className="text-sm text-red-500 flex items-center mt-1">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {errors.password.message}
                </p>
              )}

              <ul className="text-xs text-gray-500 mt-1 space-y-1">
                <li className={getValues("password")?.length >= 8 ? "text-green-500" : ""}>• At least 8 characters</li>
                <li className={/[A-Z]/.test(getValues("password") || "") ? "text-green-500" : ""}>
                  • At least one uppercase letter
                </li>
                <li className={/[a-z]/.test(getValues("password") || "") ? "text-green-500" : ""}>
                  • At least one lowercase letter
                </li>
                <li className={/[0-9]/.test(getValues("password") || "") ? "text-green-500" : ""}>
                  • At least one number
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="flex items-center">
                Confirm Password
                <span className="text-red-500 ml-1">*</span>
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                disabled={isLoading}
                className={errors.confirmPassword ? "border-red-500 focus-visible:ring-red-500" : ""}
                {...form.register("confirmPassword", {
                  onChange: () => {
                    if (errors.confirmPassword) trigger("confirmPassword")
                  },
                })}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500 flex items-center mt-1">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {errors.confirmPassword.message}
                </p>
              )}
              {dirtyFields.confirmPassword && !errors.confirmPassword && getValues("confirmPassword") && (
                <p className="text-sm text-green-500 flex items-center mt-1">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Passwords match!
                </p>
              )}
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                {...form.register("acceptTerms")}
                className="mt-1"
                onCheckedChange={(checked) => {
                  form.setValue("acceptTerms", checked === true, { shouldValidate: true })
                }}
              />
              <Label htmlFor="terms" className="text-sm font-normal">
                I agree to the{" "}
                <a href="/terms" className="text-teal-600 hover:text-teal-700">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy" className="text-teal-600 hover:text-teal-700">
                  Privacy Policy
                </a>
              </Label>
            </div>
            {errors.acceptTerms && (
              <p className="text-sm text-red-500 flex items-center mt-1">
                <AlertCircle className="h-3 w-3 mr-1" />
                {errors.acceptTerms.message}
              </p>
            )}

            <div className="pt-4 flex justify-end">
              <Button
                type="button"
                onClick={handleNextStep}
                // disabled={isLoading || !form.formState.isValid}
                className="flex items-center"
              >
                Next Step
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Profile Information */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Profile Information</h2>
            <p className="text-sm text-gray-500">Tell us a bit more about yourself (optional)</p>

            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input
                id="jobTitle"
                placeholder="Software Engineer"
                disabled={isLoading}
                className={errors.jobTitle ? "border-red-500 focus-visible:ring-red-500" : ""}
                {...form.register("jobTitle", {
                  onChange: () => {
                    if (errors.jobTitle) trigger("jobTitle")
                  },
                })}
              />
              {errors.jobTitle && (
                <p className="text-sm text-red-500 flex items-center mt-1">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {errors.jobTitle.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="Kathmandu, Nepal"
                disabled={isLoading}
                className={errors.location ? "border-red-500 focus-visible:ring-red-500" : ""}
                {...form.register("location", {
                  onChange: () => {
                    if (errors.location) trigger("location")
                  },
                })}
              />
              {errors.location && (
                <p className="text-sm text-red-500 flex items-center mt-1">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {errors.location.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                placeholder="Tell us a bit about yourself and your career goals..."
                disabled={isLoading}
                className={errors.bio ? "border-red-500 focus-visible:ring-red-500" : ""}
                {...form.register("bio", {
                  onChange: () => {
                    if (errors.bio) trigger("bio")
                  },
                })}
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>Brief introduction about yourself</span>
                <span>{getValues("bio")?.length || 0}/300</span>
              </div>
              {errors.bio && (
                <p className="text-sm text-red-500 flex items-center mt-1">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {errors.bio.message}
                </p>
              )}
            </div>

            <div className="pt-4 flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevStep}
                disabled={isLoading}
                className="flex items-center"
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous Step
              </Button>

              <Button type="submit" disabled={isLoading} className="flex items-center">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create account"
                )}
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}
