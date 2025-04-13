"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Music } from "lucide-react"

interface MusicChannel {
  title: string
  artist: string
  youtubeId: string
}

const musicChannels: MusicChannel[] = [
  {
    title: "Lofi Hip Hop Radio",
    artist: "Lofi Girl",
    youtubeId: "jfKfPfyJRdk",
  },
  {
    title: "ChillSynth FM",
    artist: "SynthwaveRadio",
    youtubeId: "UedTcufyrHc",
  },
  {
    title: "24/7 Beats Instrumental Hip-Hop",
    artist: "Chillhop Music",
    youtubeId: "6Jsnem7i848",
  },
]

export function MusicChannelsModal() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
        <Music className="h-4 w-4" />
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px] bg-black bg-opacity-70 backdrop-blur-md text-white border border-gray-700">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {musicChannels.map((channel) => (
              <div key={channel.youtubeId} className="space-y-2 bg-gray-800 bg-opacity-50 p-3 rounded-lg">
                <h3 className="text-sm font-semibold truncate">{channel.title}</h3>
                <p className="text-xs text-gray-400 truncate">{channel.artist}</p>
                <div className="aspect-video w-full">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${channel.youtubeId}`}
                    title={channel.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-md"
                  ></iframe>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
