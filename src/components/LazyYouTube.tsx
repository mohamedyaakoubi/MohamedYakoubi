'use client'

import React, { useState } from 'react'
import Image from 'next/image'

interface LazyYouTubeProps {
  videoId: string
  title: string
}

export default function LazyYouTube({ videoId, title }: LazyYouTubeProps) {
  const [activated, setActivated] = useState(false)
  const thumbnail = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`

  if (activated) {
    return (
      <iframe
        className="w-full h-full"
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    )
  }

  return (
    <button
      className="relative w-full h-full group cursor-pointer bg-black"
      onClick={() => setActivated(true)}
      aria-label={`Play video: ${title}`}
      type="button"
    >
      <Image
        src={thumbnail}
        alt={title}
        fill
        className="object-cover opacity-90 group-hover:opacity-100 transition-opacity"
        loading="lazy"
        sizes="(max-width: 768px) 100vw, 33vw"
      />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
          <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white ml-1" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
    </button>
  )
}
