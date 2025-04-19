export const mockInterviewerData = {
  candidate: {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "(555) 123-4567",
    location: "San Francisco, CA",
    website: "https://alexjohnson.dev",
    linkedin: "https://linkedin.com/in/alexjohnson",
    github: "https://github.com/alexjohnson",
    appliedPosition: "Senior Frontend Developer",
    rating: 4.5,
    topSkills: ["React", "TypeScript", "CSS/SASS", "Jest", "Redux"],
    summary:
      "Experienced frontend developer with 6+ years of experience building responsive web applications. Strong focus on component-based architecture and performance optimization.",
  },

  compatibility: {
    overall: 78,
    categories: [
      {
        name: "Technical Skills",
        score: 85,
        color: "green",
      },
      {
        name: "Experience",
        score: 75,
        color: "teal",
      },
      {
        name: "Education",
        score: 90,
        color: "green",
      },
      {
        name: "Cultural Fit",
        score: 65,
        color: "amber",
      },
    ],
  },

  skills: {
    skillsByCategory: [
      {
        category: "Frontend",
        skills: [
          {
            name: "React",
            level: 5,
            required: 4,
            status: "exceeds",
          },
          {
            name: "TypeScript",
            level: 4,
            required: 4,
            status: "meets",
          },
          {
            name: "CSS/SASS",
            level: 4,
            required: 3,
            status: "exceeds",
          },
          {
            name: "Redux",
            level: 3,
            required: 3,
            status: "meets",
          },
          {
            name: "Next.js",
            level: 2,
            required: 3,
            status: "below",
          },
        ],
      },
      {
        category: "Testing",
        skills: [
          {
            name: "Jest",
            level: 4,
            required: 3,
            status: "exceeds",
          },
          {
            name: "React Testing Library",
            level: 3,
            required: 3,
            status: "meets",
          },
          {
            name: "Cypress",
            level: 1,
            required: 2,
            status: "below",
          },
        ],
      },
      {
        category: "Backend",
        skills: [
          {
            name: "Node.js",
            level: 2,
            required: 2,
            status: "meets",
          },
          {
            name: "GraphQL",
            level: 0,
            required: 3,
            status: "missing",
          },
          {
            name: "REST API Design",
            level: 3,
            required: 2,
            status: "exceeds",
          },
        ],
      },
    ],
    skillsDistribution: {
      exceeds: 4,
      meets: 4,
      below: 2,
      missing: 1,
    },
  },

  education: [
    {
      degree: "Master of Science in Computer Science",
      institution: "University of California, Berkeley",
      location: "Berkeley, CA",
      graduationYear: "2017",
      fieldOfStudy: "Computer Science",
      gpa: "3.8/4.0",
      achievements: [
        "Thesis on 'Performance Optimization Techniques for Modern Web Applications'",
        "Teaching Assistant for Advanced Web Development course",
      ],
    },
    {
      degree: "Bachelor of Science in Computer Engineering",
      institution: "University of Washington",
      location: "Seattle, WA",
      graduationYear: "2015",
      fieldOfStudy: "Computer Engineering",
      gpa: "3.7/4.0",
      achievements: ["Dean's List all semesters", "Senior project: Real-time collaborative code editor"],
    },
  ],

  experience: [
    {
      title: "Senior Frontend Developer",
      company: "TechStart Inc.",
      location: "San Francisco, CA",
      startDate: "Jan 2020",
      endDate: "Present",
      description: [
        "Led the development of a React-based dashboard used by 50,000+ users",
        "Implemented TypeScript across the frontend codebase, reducing bugs by 23%",
        "Mentored junior developers and conducted code reviews",
        "Optimized application performance, reducing load time by 40%",
      ],
      relevance: "high",
    },
    {
      title: "Frontend Developer",
      company: "WebSolutions Co.",
      location: "Seattle, WA",
      startDate: "Mar 2017",
      endDate: "Dec 2019",
      description: [
        "Developed responsive web applications using React and Redux",
        "Implemented unit and integration tests with Jest and Enzyme",
        "Collaborated with designers to implement UI/UX improvements",
        "Participated in agile development process",
      ],
      relevance: "high",
    },
    {
      title: "Web Developer Intern",
      company: "LocalTech Startup",
      location: "Berkeley, CA",
      startDate: "May 2016",
      endDate: "Aug 2016",
      description: [
        "Assisted in developing frontend features using jQuery and Bootstrap",
        "Fixed bugs and improved website performance",
        "Participated in daily stand-up meetings",
      ],
      relevance: "low",
    },
  ],

  skillGaps: {
    criticalGaps: [
      {
        skill: "GraphQL",
        importance: 4,
        description: "The candidate has no experience with GraphQL, which is a core technology in our stack.",
        recommendation:
          "Consider technical assessment focused on GraphQL or discuss willingness to learn quickly. Provide learning resources if proceeding with candidate.",
      },
    ],
    minorGaps: [
      {
        skill: "Next.js",
        importance: 3,
        description: "The candidate has some experience with Next.js but not at the level required for this position.",
        recommendation:
          "Discuss recent Next.js projects and assess depth of knowledge. Their strong React background should make upskilling relatively straightforward.",
      },
      {
        skill: "Cypress",
        importance: 2,
        description: "Limited experience with Cypress for end-to-end testing.",
        recommendation: "Not critical, but discuss their approach to E2E testing and willingness to learn Cypress.",
      },
    ],
  },

  screeningQuestions: [
    {
      question: "Can you describe your experience with GraphQL and how you would approach learning it quickly?",
      purpose: "Assess the candidate's willingness and ability to learn the missing critical skill.",
      category: "technical",
      priority: "high",
    },
    {
      question:
        "Tell me about a performance optimization challenge you faced in a React application and how you solved it.",
      purpose: "Evaluate the candidate's problem-solving skills and depth of React knowledge.",
      expectedAnswer:
        "Look for specific techniques like code splitting, memoization, virtualization, or bundle optimization. Candidate should mention metrics and results.",
      category: "technical",
      priority: "high",
    },
    {
      question: "How have you used TypeScript to improve code quality in your projects?",
      purpose: "Assess depth of TypeScript knowledge and practical application.",
      category: "technical",
      priority: "medium",
    },
    {
      question: "Describe your experience mentoring junior developers and your approach to code reviews.",
      purpose: "Evaluate leadership and communication skills required for senior role.",
      category: "behavioral",
      priority: "medium",
    },
    {
      question: "How do you stay updated with the latest frontend development trends and technologies?",
      purpose: "Assess continuous learning mindset and passion for the field.",
      category: "behavioral",
      priority: "low",
    },
  ],

  interviewRecommendation: {
    recommendation: "yes",
    summary:
      "Alex Johnson is a strong candidate with excellent frontend development skills, particularly in React and TypeScript. While there are some skill gaps in GraphQL and Next.js, their strong foundation and learning potential make them a good fit for the role. Their experience mentoring junior developers aligns well with the senior position requirements.",
    strengths: [
      "Strong React and TypeScript expertise exceeding requirements",
      "Proven track record of performance optimization",
      "Relevant experience in similar roles with comparable responsibilities",
      "Solid testing knowledge with Jest and React Testing Library",
      "Experience mentoring junior developers",
    ],
    concerns: [
      "No experience with GraphQL, which is important for our stack",
      "Limited Next.js experience compared to requirements",
      "May need time to ramp up on some team-specific technologies",
    ],
    nextSteps: [
      "Proceed to technical interview with focus on assessing GraphQL learning potential",
      "Include a senior team member from the project in the next interview round",
      "Prepare a small take-home assignment that includes GraphQL and Next.js components",
      "Discuss potential onboarding plan to address skill gaps if hired",
    ],
  },
}
