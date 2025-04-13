"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { HireFormModal } from "./hire-form-modal"

export function HireMeButton() {
  const [showForm, setShowForm] = useState(false)

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setShowForm(true)}
        className="bg-gray-800 hover:bg-gray-700 text-white border border-[#00c3ff] hover:border-[#00c3ff] transition-all duration-300 shadow-[0_0_10px_rgba(0,195,255,0.5)] hover:shadow-[0_0_15px_rgba(0,195,255,0.8)] relative overflow-hidden group"
      >
        <span className="relative z-10">Hire Me</span>
        <span className="absolute inset-0 bg-[#00c3ff] opacity-20 group-hover:opacity-30 transition-opacity duration-300"></span>
      </Button>
      <HireFormModal open={showForm} onOpenChange={setShowForm} />
    </>
  )
}
