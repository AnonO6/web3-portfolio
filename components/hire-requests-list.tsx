"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface HireRequest {
  id: string
  username: string
  platform: "x" | "telegram"
  projectType: string
  budget: string
  deadline: string
  submittedAt: string
}

export function HireRequestsList() {
  const [requests, setRequests] = useState<HireRequest[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRequests()
  }, [])

  const fetchRequests = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/hire-requests")
      if (!response.ok) throw new Error("Failed to fetch requests")
      const data = await response.json()
      setRequests(data)
    } catch (error) {
      console.error("Error fetching hire requests:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>Loading hire requests...</div>

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Hire Requests</h2>
        <Button onClick={fetchRequests}>Refresh</Button>
      </div>
      {requests.length === 0 ? (
        <p>No hire requests yet.</p>
      ) : (
        requests.map((request) => (
          <Card key={request.id} className="bg-gray-800 text-white">
            <CardHeader>
              <CardTitle>
                {request.username} ({request.platform})
              </CardTitle>
              <CardDescription>Submitted on: {new Date(request.submittedAt).toLocaleString()}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                <strong>Project Type:</strong> {request.projectType}
              </p>
              <p>
                <strong>Budget:</strong> ${request.budget}
              </p>
              <p>
                <strong>Deadline:</strong> {request.deadline}
              </p>
              <Button
                className="mt-4"
                onClick={() => window.open(`https://${request.platform}.com/${request.username}`, "_blank")}
              >
                Contact on {request.platform === "x" ? "X" : "Telegram"}
              </Button>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}
