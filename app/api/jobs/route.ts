import { NextResponse } from "next/server"

const jobs = [
  {
    id: 1,
    title: "Software Engineer",
    company: "Google",
    location: "Mountain View, CA",
    type: "Full-time",
    salary: "$150,000 - $200,000",
    posted: "2 days ago",
    description:
      "We're looking for software engineers to join our team working on Google Search, Ads, Gmail, Android, YouTube, and more.",
    skills: ["Python", "Java", "C++", "Go", "JavaScript"],
    source: "LinkedIn",
    applyUrl: "https://careers.google.com/jobs/results/",
    requirements: [
      "Bachelor's degree in Computer Science or equivalent",
      "Experience with data structures and algorithms",
      "Proficiency in one or more programming languages",
    ],
  },
  {
    id: 2,
    title: "Frontend Engineer",
    company: "Meta",
    location: "Menlo Park, CA",
    type: "Full-time",
    salary: "$140,000 - $190,000",
    posted: "1 day ago",
    description:
      "Build the next generation of social technology. Create new experiences that connect people in meaningful ways.",
    skills: ["React", "JavaScript", "TypeScript", "GraphQL", "CSS"],
    source: "Indeed",
    applyUrl: "https://www.metacareers.com/jobs/",
    requirements: [
      "3+ years of frontend development experience",
      "Expert knowledge of React and modern JavaScript",
      "Experience with GraphQL and REST APIs",
    ],
  },
  {
    id: 3,
    title: "Software Development Engineer",
    company: "Amazon",
    location: "Seattle, WA",
    type: "Full-time",
    salary: "$130,000 - $180,000",
    posted: "3 days ago",
    description: "Join Amazon's world-class engineering teams working on everything from Alexa to AWS to Prime Video.",
    skills: ["Java", "Python", "AWS", "Distributed Systems", "Microservices"],
    source: "Glassdoor",
    applyUrl: "https://www.amazon.jobs/en/search?base_query=software+engineer",
    requirements: [
      "Bachelor's degree in Computer Science",
      "Experience with distributed systems",
      "Knowledge of AWS services preferred",
    ],
  },
  {
    id: 4,
    title: "Software Engineer",
    company: "Microsoft",
    location: "Redmond, WA",
    type: "Full-time",
    salary: "$135,000 - $185,000",
    posted: "1 week ago",
    description:
      "Help build the intelligent cloud and productivity experiences that empower every person and organization on the planet to achieve more.",
    skills: ["C#", ".NET", "Azure", "TypeScript", "React"],
    source: "LinkedIn",
    applyUrl: "https://careers.microsoft.com/us/en/search-results?keywords=software%20engineer",
    requirements: [
      "Bachelor's degree in Engineering, Computer Science or related field",
      "Experience with cloud technologies",
      "Strong problem-solving skills",
    ],
  },
  {
    id: 5,
    title: "iOS Engineer",
    company: "Apple",
    location: "Cupertino, CA",
    type: "Full-time",
    salary: "$145,000 - $195,000",
    posted: "4 days ago",
    description:
      "Join the team that creates the world's most beloved mobile experiences. Work on iOS, watchOS, tvOS, and more.",
    skills: ["Swift", "Objective-C", "iOS", "Xcode", "UIKit"],
    source: "Indeed",
    applyUrl: "https://jobs.apple.com/en-us/search?search=software%20engineer&sort=relevance",
    requirements: [
      "Strong experience with iOS development",
      "Proficiency in Swift and Objective-C",
      "Experience with Apple's development tools",
    ],
  },
  {
    id: 6,
    title: "Backend Engineer",
    company: "Netflix",
    location: "Los Gatos, CA",
    type: "Full-time",
    salary: "$160,000 - $220,000",
    posted: "5 days ago",
    description:
      "Help us build the systems that entertain over 200 million members worldwide. Work on streaming, recommendations, and more.",
    skills: ["Java", "Scala", "Python", "Microservices", "AWS"],
    source: "Glassdoor",
    applyUrl: "https://jobs.netflix.com/search?q=software%20engineer",
    requirements: [
      "5+ years of backend development experience",
      "Experience with microservices architecture",
      "Strong system design skills",
    ],
  },
  {
    id: 7,
    title: "Full Stack Developer",
    company: "Stripe",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$140,000 - $190,000",
    posted: "1 week ago",
    description:
      "Help us build the economic infrastructure for the internet. Work on payments, financial services, and developer tools.",
    skills: ["Ruby", "JavaScript", "React", "PostgreSQL", "Redis"],
    source: "LinkedIn",
    applyUrl: "https://stripe.com/jobs/search?query=software%20engineer",
    requirements: [
      "Experience with full-stack web development",
      "Knowledge of payment systems preferred",
      "Strong API design skills",
    ],
  },
  {
    id: 8,
    title: "Data Engineer",
    company: "Airbnb",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$145,000 - $195,000",
    posted: "6 days ago",
    description:
      "Build the data infrastructure that powers Airbnb's marketplace, connecting millions of hosts and guests worldwide.",
    skills: ["Python", "Spark", "Kafka", "Airflow", "SQL"],
    source: "Indeed",
    applyUrl: "https://careers.airbnb.com/positions/?search=data%20engineer",
    requirements: [
      "Experience with big data technologies",
      "Strong SQL and Python skills",
      "Knowledge of data pipeline tools",
    ],
  },
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q")
  const location = searchParams.get("location")
  const type = searchParams.get("type")

  let filteredJobs = jobs

  if (query) {
    filteredJobs = filteredJobs.filter(
      (job) =>
        job.title.toLowerCase().includes(query.toLowerCase()) ||
        job.company.toLowerCase().includes(query.toLowerCase()),
    )
  }

  if (location) {
    filteredJobs = filteredJobs.filter((job) => job.location.toLowerCase().includes(location.toLowerCase()))
  }

  if (type) {
    filteredJobs = filteredJobs.filter((job) => job.type === type)
  }

  return NextResponse.json({ jobs: filteredJobs })
}

export async function POST(request: Request) {
  const jobData = await request.json()

  const newJob = {
    id: jobs.length + 1,
    ...jobData,
    posted: "Just now",
  }

  jobs.push(newJob)

  return NextResponse.json({ job: newJob }, { status: 201 })
}
