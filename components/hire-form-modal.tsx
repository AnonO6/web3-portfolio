"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Image from "next/image"

interface HireFormData {
  username: string
  platform: "x" | "telegram"
  projectType: string
}

const projectTypes = [
  { name: "Personal Landing Page", price: "$400+100/month", description: "Includes hosting, .xyz domain (no web3)" },
  { name: "Memecoin Site", price: "$600+100/month", description: "Includes hosting and .xyz domain (no web3)" },
  { name: "Any crazy project", price: "Heck, I might even do it for free!", description: "It just needs to be cool" },
  {
    name: "Custom AI Agents (on-chain)",
    price: "Contact for pricing",
    description: "Tweeting agents, trading agents, expert agents etc.",
  },
]

export function HireFormModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [formData, setFormData] = useState<HireFormData>({
    username: "",
    platform: "x",
    projectType: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await fetch("/api/hire-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          submittedAt: new Date().toISOString(),
        }),
      })

      onOpenChange(false)
      // You could show a success toast here
    } catch (error) {
      console.error("Error submitting form:", error)
      // You could show an error toast here
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px] bg-black bg-opacity-70 backdrop-blur-md text-white border border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Hire Me</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label className="text-lg">Contact Platform</Label>
            <div className="flex gap-4">
              <Button
                type="button"
                variant={formData.platform === "x" ? "default" : "outline"}
                className={`flex-1 ${
                  formData.platform === "x" ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-800 hover:bg-gray-700"
                }`}
                onClick={() => setFormData({ ...formData, platform: "x" })}
              >
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/xlogo-uvhDmygmL1JMte1y0atgftFhRqs9H2.png"
                  alt="X logo"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                X
              </Button>
              <Button
                type="button"
                variant={formData.platform === "telegram" ? "default" : "outline"}
                className={`flex-1 ${
                  formData.platform === "telegram" ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-800 hover:bg-gray-700"
                }`}
                onClick={() => setFormData({ ...formData, platform: "telegram" })}
              >
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tglogo-ylKODYlyHLD9QyblmSUaIimpmWgDYm.png"
                  alt="Telegram logo"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                Telegram
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="username" className="text-lg">
              {formData.platform === "x" ? "X Username" : "Telegram Username"}
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">@</span>
              <Input
                id="username"
                placeholder="username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
                className="bg-gray-800 border-gray-700 pl-8 text-white"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-lg">Project Type</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projectTypes.map((type) => (
                <Button
                  key={type.name}
                  type="button"
                  variant={formData.projectType === type.name ? "default" : "outline"}
                  className={`flex flex-col items-start p-4 h-auto ${
                    formData.projectType === type.name
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-gray-800 hover:bg-gray-700"
                  }`}
                  onClick={() => setFormData({ ...formData, projectType: type.name })}
                >
                  <span className="font-bold">{type.name}</span>
                  <span className="text-sm">{type.price}</span>
                  <span className="text-xs text-gray-300">{type.description}</span>
                </Button>
              ))}
            </div>
          </div>
          {formData.projectType === "Stickers, Logos, Banners" && (
            <div className="space-y-2">
              <Label htmlFor="projectDetails" className="text-lg">
                Project Details
              </Label>
              <Textarea
                id="projectDetails"
                placeholder="Describe your sticker, logo, or banner requirements..."
                value={formData.projectType}
                onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                required
                className="bg-gray-800 border-gray-700 min-h-[100px] text-white"
              />
            </div>
          )}
          <div className="flex justify-end space-x-4">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              type="button"
              className="bg-gray-800 hover:bg-gray-700 text-white"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700 text-white">
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
