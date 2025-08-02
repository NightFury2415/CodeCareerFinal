import { NextResponse } from "next/server"

const leaderboardData = [
  {
    rank: 1,
    userId: "user1",
    name: "Alex Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    points: 2847,
    problemsSolved: 342,
    avgTime: "4:23",
    streak: 28,
    badge: "Grandmaster",
    country: "US",
  },
  {
    rank: 2,
    userId: "user2",
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    points: 2756,
    problemsSolved: 318,
    avgTime: "5:12",
    streak: 21,
    badge: "Master",
    country: "CA",
  },
  {
    rank: 3,
    userId: "user3",
    name: "Mike Rodriguez",
    avatar: "/placeholder.svg?height=40&width=40",
    points: 2634,
    problemsSolved: 295,
    avgTime: "4:45",
    streak: 15,
    badge: "Master",
    country: "MX",
  },
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get("type") || "overall"
  const limit = Number.parseInt(searchParams.get("limit") || "50")

  let data = leaderboardData

  if (type === "speed") {
    data = data.sort((a, b) => {
      const aTime = Number.parseFloat(a.avgTime.replace(":", "."))
      const bTime = Number.parseFloat(b.avgTime.replace(":", "."))
      return aTime - bTime
    })
  } else if (type === "weekly") {
    // Mock weekly contest data
    data = data.map((user) => ({
      ...user,
      weeklyPoints: Math.floor(Math.random() * 500),
      weeklyRank: Math.floor(Math.random() * 100) + 1,
    }))
  }

  return NextResponse.json({
    leaderboard: data.slice(0, limit),
    total: data.length,
  })
}
