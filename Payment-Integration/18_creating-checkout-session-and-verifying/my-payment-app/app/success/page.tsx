"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"

interface CourseContent {
  paid: boolean
  detail: string
}

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const [verifying, setVerifying] = useState(false)
  const [courseData, setCourseData] = useState<CourseContent | null>(null)
  const [error, setError] = useState<string | null>(null)

  const sessionId = searchParams.get("session_id")

  const handleAccessCourse = async () => {
  if (!sessionId) {
    setError("No session ID found")
    return
  }

  setVerifying(true)
  setError(null)

  try {
    const response = await fetch("http://localhost:5000/verify-payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sessionId }),
    })

    const data = await response.json()

    if (data.paid) {
      setCourseData(data)
    } else {
      setError(data.detail || "Payment verification failed")
    }
  } catch (error) {
    console.error("Verification error:", error)
    setError("Failed to verify payment. Please try again.")
  } finally {
    setVerifying(false)
  }
}


  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-lg p-8 bg-card text-card-foreground rounded-lg border shadow-sm">
        {!courseData ? (
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-primary"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-foreground">Payment Successful!</h1>
              <p className="text-muted-foreground">
                Thank you for your purchase. Your payment has been processed successfully.
              </p>
            </div>

            {sessionId && (
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-xs text-muted-foreground mb-1">Session ID</p>
                <p className="text-sm font-mono text-foreground break-all">{sessionId}</p>
              </div>
            )}

            {error && (
              <div className="bg-destructive/10 text-destructive rounded-lg p-4">
                <p className="text-sm">{error}</p>
              </div>
            )}

            <button
              onClick={handleAccessCourse}
              disabled={verifying || !sessionId}
              className="w-full h-12 text-base font-semibold bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors inline-flex items-center justify-center"
            >
              {verifying ? (
                <>
                  <svg
                    className="mr-2 h-5 w-5 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Verifying...
                </>
              ) : (
                <>
                  <svg
                    className="mr-2 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  Access Your Course
                </>
              )}
            </button>

            <p className="text-xs text-muted-foreground">
              Click the button above to verify your payment and access the course content
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <h1 className="text-3xl font-bold text-foreground">Welcome to Your Course!</h1>
              <p className="text-muted-foreground">{courseData.detail}</p>
            </div>

            <div className="border rounded-lg p-6 space-y-4">
              <h2 className="text-xl font-semibold text-foreground">Course Content</h2>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
                    1
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">Introduction to the Course</p>
                    <p className="text-sm text-muted-foreground">15 minutes</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
                    2
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">Core Concepts</p>
                    <p className="text-sm text-muted-foreground">45 minutes</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
                    3
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">Advanced Techniques</p>
                    <p className="text-sm text-muted-foreground">60 minutes</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
                    4
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">Final Project</p>
                    <p className="text-sm text-muted-foreground">90 minutes</p>
                  </div>
                </div>
              </div>
            </div>

            <button className="w-full h-12 text-base font-semibold bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
              Start Learning
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
