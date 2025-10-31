"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

// Map of problem IDs to slugs
const idToSlugMap: Record<number, string> = {
  1: "two-sum",
  3: "group-anagrams",
  4: "valid-parentheses",
  13: "number-of-islands",
  26: "lru-cache-implementation",
}

export default function ProblemIdPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isRedirecting, setIsRedirecting] = useState(true)

  useEffect(() => {
    const problemId = Number.parseInt(params.id)
    const slug = idToSlugMap[problemId]

    if (slug) {
      router.push(`/problems/${slug}`)
    } else {
      router.push("/problems")
    }
  }, [params.id, router])

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      <div className="text-white text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <p>Loading problem...</p>
      </div>
    </div>
  )
}
