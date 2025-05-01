export const userData = {
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  jobTitle: "Senior Software Engineer",
  location: "San Francisco, CA",
  bio: "Passionate software engineer with 8+ years of experience in full-stack development.",

  // Candidate cheatsheets (for job seekers)
  candidateCheatsheets: [
    {
      id: "c1",
      companyName: "TechCorp",
      role: "Senior Frontend Developer",
      companyOverview:
        "TechCorp is a leading technology company specializing in cloud solutions and enterprise software. Founded in 2005, they have over 5,000 employees worldwide.",
      createdAt: "2023-04-15T10:30:00Z",
    },
    {
      id: "c2",
      companyName: "InnovateTech",
      role: "Full Stack Engineer",
      companyOverview:
        "InnovateTech is a fast-growing startup focused on AI-powered productivity tools. They have a remote-first culture with team members across 12 countries.",
      createdAt: "2023-05-02T14:45:00Z",
    },
    {
      id: "c3",
      companyName: "WebSolutions",
      role: "React Developer",
      companyOverview:
        "WebSolutions provides custom web application development services for clients in finance, healthcare, and e-commerce sectors.",
      createdAt: "2023-06-18T09:15:00Z",
    },
  ],

  // Interviewer cheatsheets (for recruiters/interviewers)
  interviewerCheatsheets: [
    {
      id: "i1",
      candidateName: "Sarah Miller",
      jobTitle: "Senior UX Designer",
      summary:
        "Experienced designer with strong portfolio. Good communication skills and technical knowledge. Would be a good fit for the design team.",
      recommendation: "proceed",
      createdAt: "2023-03-10T11:20:00Z",
    },
    {
      id: "i2",
      candidateName: "Michael Chen",
      jobTitle: "Backend Developer",
      summary:
        "Strong technical skills in Java and microservices. Lacks some experience with our specific tech stack but shows good problem-solving abilities.",
      recommendation: "consider",
      createdAt: "2023-04-05T15:30:00Z",
    },
    {
      id: "i3",
      candidateName: "Jessica Taylor",
      jobTitle: "Product Manager",
      summary:
        "Great experience with similar products. Strong leadership skills and customer focus. However, seems to lack experience with agile methodologies.",
      recommendation: "consider",
      createdAt: "2023-05-12T13:45:00Z",
    },
    {
      id: "i4",
      candidateName: "David Wilson",
      jobTitle: "DevOps Engineer",
      summary:
        "Limited experience with our cloud infrastructure. Technical knowledge is below what we need for this senior position.",
      recommendation: "reject",
      createdAt: "2023-06-20T10:15:00Z",
    },
  ],
}
