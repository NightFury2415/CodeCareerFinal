// API utility functions for frontend

export async function fetchProblems(filters?: {
  difficulty?: string
  category?: string
  status?: string
}) {
  const params = new URLSearchParams()
  if (filters?.difficulty) params.append("difficulty", filters.difficulty)
  if (filters?.category) params.append("category", filters.category)
  if (filters?.status) params.append("status", filters.status)

  const response = await fetch(`/api/problems?${params}`)
  return response.json()
}

export async function fetchProblem(id: string) {
  const response = await fetch(`/api/problems/${id}`)
  return response.json()
}

export async function submitSolution(problemId: string, code: string, language: string) {
  const response = await fetch(`/api/problems/${problemId}/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code, language }),
  })
  return response.json()
}

export async function fetchJobs(filters?: {
  query?: string
  location?: string
  type?: string
}) {
  const params = new URLSearchParams()
  if (filters?.query) params.append("q", filters.query)
  if (filters?.location) params.append("location", filters.location)
  if (filters?.type) params.append("type", filters.type)

  const response = await fetch(`/api/jobs?${params}`)
  return response.json()
}

export async function fetchLeaderboard(type = "overall", limit = 50) {
  const response = await fetch(`/api/leaderboard?type=${type}&limit=${limit}`)
  return response.json()
}

export async function startMockInterview(data: {
  type: string
  role: string
  company: string
  userId: string
}) {
  const response = await fetch("/api/mock-interviews", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  return response.json()
}

export async function fetchUserProgress(userId: string) {
  const response = await fetch(`/api/user/progress?userId=${userId}`)
  return response.json()
}
