"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface FollowingModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function FollowingModal({ open, onOpenChange }: FollowingModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Following</DialogTitle>
        </DialogHeader>
        <div className="h-[60vh] w-full overflow-hidden rounded-md">
          <iframe
            src="https://x.com/Lifelessrealm/following"
            className="w-full h-full"
            allow="clipboard-write; encrypted-media; web-share"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
