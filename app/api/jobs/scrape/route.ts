import { NextResponse } from "next/server"

// This would typically use a web scraping service or job board APIs
// For demo purposes, we'll simulate real job data
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q") || "software engineer"
  const location = searchParams.get("location") || ""

  try {
    // Simulate API call to job scraping service
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const scrapedJobs = [
      {
        id: Date.now() + 1,
        title: "Senior Software Engineer",
        company: "Google",
        location: "Mountain View, CA",
        type: "Full-time",
        salary: "$180,000 - $250,000",
        posted: "2 days ago",
        description:
          "Join our team to build the next generation of search technologies. Work on large-scale distributed systems that serve billions of users worldwide.",
        skills: ["Python", "Java", "C++", "Go", "Distributed Systems"],
        source: "LinkedIn",
        applyUrl: "https://careers.google.com/jobs/results/",
        requirements: [
          "Bachelor's degree in Computer Science or equivalent",
          "5+ years of software development experience",
          "Experience with large-scale distributed systems",
          "Strong knowledge of algorithms and data structures",
        ],
        benefits: ["Health insurance", "401k matching", "Stock options", "Free meals", "Gym membership"],
      },
      {
        id: Date.now() + 2,
        title: "Frontend Engineer",
        company: "Meta",
        location: "Menlo Park, CA",
        type: "Full-time",
        salary: "$160,000 - $220,000",
        posted: "1 day ago",
        description:
          "Help us build immersive experiences for billions of users. Work on React, GraphQL, and cutting-edge web technologies.",
        skills: ["React", "JavaScript", "TypeScript", "GraphQL", "CSS"],
        source: "Indeed",
        applyUrl: "https://www.metacareers.com/jobs/",
        requirements: [
          "3+ years of frontend development experience",
          "Expert knowledge of React and modern JavaScript",
          "Experience with GraphQL and REST APIs",
          "Strong understanding of web performance optimization",
        ],
        benefits: ["Health insurance", "Stock options", "Free meals", "Transportation", "Learning budget"],
      },
      {
        id: Date.now() + 3,
        title: "Full Stack Developer",
        company: "Netflix",
        location: "Los Gatos, CA",
        type: "Full-time",
        salary: "$170,000 - $230,000",
        posted: "3 days ago",
        description:
          "Build the systems that entertain over 200 million members worldwide. Work on streaming, recommendations, and content delivery.",
        skills: ["Java", "Scala", "React", "Node.js", "AWS"],
        source: "Glassdoor",
        applyUrl: "https://jobs.netflix.com/search?q=software%20engineer",
        requirements: [
          "4+ years of full-stack development experience",
          "Experience with microservices architecture",
          "Knowledge of streaming technologies",
          "Strong system design skills",
        ],
        benefits: ["Unlimited PTO", "Stock options", "Health insurance", "Learning budget", "Flexible work"],
      },
      {
        id: Date.now() + 4,
        title: "Backend Engineer",
        company: "Stripe",
        location: "San Francisco, CA",
        type: "Full-time",
        salary: "$150,000 - $200,000",
        posted: "1 week ago",
        description:
          "Help us build the economic infrastructure for the internet. Work on payments, financial services, and developer tools.",
        skills: ["Ruby", "Go", "Python", "PostgreSQL", "Redis"],
        source: "AngelList",
        applyUrl: "https://stripe.com/jobs/search?query=software%20engineer",
        requirements: [
          "3+ years of backend development experience",
          "Experience with payment systems preferred",
          "Strong API design skills",
          "Knowledge of financial regulations a plus",
        ],
        benefits: ["Health insurance", "Stock options", "Learning budget", "Flexible PTO", "Remote work"],
      },
      {
        id: Date.now() + 5,
        title: "iOS Engineer",
        company: "Apple",
        location: "Cupertino, CA",
        type: "Full-time",
        salary: "$145,000 - $195,000",
        posted: "4 days ago",
        description:
          "Join the team that creates the world's most beloved mobile experiences. Work on iOS, watchOS, tvOS, and more.",
        skills: ["Swift", "Objective-C", "iOS", "Xcode", "UIKit"],
        source: "Apple Careers",
        applyUrl: "https://jobs.apple.com/en-us/search?search=software%20engineer&sort=relevance",
        requirements: [
          "Strong experience with iOS development",
          "Proficiency in Swift and Objective-C",
          "Experience with Apple's development tools",
          "Understanding of iOS design principles",
        ],
        benefits: [
          "Health insurance",
          "Stock purchase plan",
          "Product discounts",
          "Gym membership",
          "Commuter benefits",
        ],
      },
    ]

    // Filter jobs based on query and location
    let filteredJobs = scrapedJobs

    if (query && query !== "software engineer") {
      filteredJobs = filteredJobs.filter(
        (job) =>
          job.title.toLowerCase().includes(query.toLowerCase()) ||
          job.company.toLowerCase().includes(query.toLowerCase()) ||
          job.skills.some((skill) => skill.toLowerCase().includes(query.toLowerCase())),
      )
    }

    if (location) {
      filteredJobs = filteredJobs.filter((job) => job.location.toLowerCase().includes(location.toLowerCase()))
    }

    return NextResponse.json({
      jobs: filteredJobs,
      total: filteredJobs.length,
      scraped: true,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to scrape jobs",
        jobs: [],
        total: 0,
      },
      { status: 500 },
    )
  }
}
