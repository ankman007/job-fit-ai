export const mockResultsData = {
  jobTitle: "Senior Frontend Developer",
  company: "TechCorp Solutions",
  resumeName: "john_doe_resume.pdf",
  generatedDate: "April 19, 2025",

  swotAnalysis: {
    strengths: [
      {
        title: "Strong React Experience",
        description:
          "5+ years of experience with React and modern frontend frameworks matches perfectly with the job requirements.",
      },
      {
        title: "UI/UX Focus",
        description:
          "Your portfolio demonstrates strong UI/UX sensibilities, which aligns with their emphasis on user experience.",
      },
      {
        title: "Team Leadership",
        description:
          "Previous experience leading small teams will be valuable for this senior role that requires mentoring junior developers.",
      },
    ],
    weaknesses: [
      {
        title: "Limited Backend Experience",
        description: "The job mentions Node.js backend work, but your experience is primarily frontend-focused.",
      },
      {
        title: "No GraphQL Experience",
        description:
          "The job description mentions GraphQL, but your resume doesn't highlight experience with this technology.",
      },
    ],
    opportunities: [
      {
        title: "Growing Company",
        description:
          "TechCorp is expanding their product line, offering potential for career growth and diverse project experience.",
      },
      {
        title: "Mentorship Potential",
        description: "The role includes mentoring junior developers, which could strengthen your leadership skills.",
      },
    ],
    threats: [
      {
        title: "Competitive Candidate Pool",
        description: "Senior frontend roles at established companies typically attract many qualified candidates.",
      },
      {
        title: "Evolving Tech Stack",
        description: "The company is adopting new technologies that may require rapid learning and adaptation.",
      },
    ],
  },

  skillAssessment: {
    matchedSkills: [
      {
        name: "React",
        status: "match",
        importance: 5,
        description: "Your 5+ years of React experience exceeds their 3+ year requirement.",
      },
      {
        name: "TypeScript",
        status: "match",
        importance: 4,
        description: "Your TypeScript projects align well with their TypeScript-based codebase.",
      },
      {
        name: "CSS/SASS",
        status: "match",
        importance: 3,
        description: "Your portfolio demonstrates strong CSS skills with SASS/SCSS experience.",
      },
    ],
    partialSkills: [
      {
        name: "Testing",
        status: "partial",
        importance: 4,
        description:
          "You have Jest experience, but they also use Cypress for E2E testing which isn't mentioned in your resume.",
      },
      {
        name: "CI/CD",
        status: "partial",
        importance: 3,
        description:
          "You have some experience with GitHub Actions, but they use Jenkins which you haven't worked with.",
      },
    ],
    missingSkills: [
      {
        name: "GraphQL",
        status: "missing",
        importance: 4,
        description: "The job requires GraphQL experience, which isn't mentioned in your resume.",
      },
      {
        name: "Node.js Backend",
        status: "missing",
        importance: 3,
        description: "The role involves some backend work with Node.js, but your experience is primarily frontend.",
      },
    ],
    overallMatch: 78,
  },

  conceptRefresh: [
    {
      topic: "React Performance Optimization",
      relevance: "Critical for senior role",
      description:
        "Review techniques for optimizing React applications, including memoization, code splitting, and virtualization for large lists.",
      resources: [
        {
          title: "React Official Docs: Optimizing Performance",
          url: "https://reactjs.org/docs/optimizing-performance.html",
          type: "article",
        },
        {
          title: "Advanced React Performance Optimizations",
          url: "https://example.com/react-performance",
          type: "video",
        },
      ],
    },
    {
      topic: "GraphQL Fundamentals",
      relevance: "Required skill in job description",
      description: "Learn the basics of GraphQL, including queries, mutations, and how it differs from REST APIs.",
      resources: [
        {
          title: "Introduction to GraphQL",
          url: "https://graphql.org/learn/",
          type: "article",
        },
        {
          title: "GraphQL Full Course",
          url: "https://example.com/graphql-course",
          type: "course",
        },
      ],
    },
    {
      topic: "Modern CSS Techniques",
      relevance: "Mentioned in your portfolio project",
      description: "Refresh your knowledge on CSS Grid, Flexbox, and CSS variables for modern layouts.",
      resources: [
        {
          title: "CSS Grid Complete Guide",
          url: "https://css-tricks.com/snippets/css/complete-guide-grid/",
          type: "article",
        },
        {
          title: "Advanced CSS Layouts",
          url: "https://example.com/advanced-css",
          type: "video",
        },
      ],
    },
  ],

  interviewQuestions: [
    {
      question: "How would you optimize a React application that's experiencing performance issues?",
      category: "technical",
      difficulty: "hard",
      suggestedAnswer:
        "I would start by identifying the bottlenecks using React DevTools Profiler and Chrome Performance tools. Common optimizations include: implementing React.memo for expensive components, using useCallback and useMemo hooks to prevent unnecessary re-renders, code splitting with React.lazy and Suspense, virtualizing long lists with react-window, and optimizing state management to prevent unnecessary re-renders. I'd also look at bundle size optimization using tools like Webpack Bundle Analyzer.",
      tips: [
        "Mention a specific example from your experience",
        "Discuss both code-level and build-level optimizations",
        "Explain how you would measure the impact of your optimizations",
      ],
    },
    {
      question: "Tell me about a challenging project you worked on and how you overcame obstacles.",
      category: "experience",
      difficulty: "medium",
      suggestedAnswer:
        "In my previous role at XYZ Company, I led the redesign of our customer dashboard that was suffering from performance issues and poor user experience. The main challenges were a tight deadline, legacy code, and integrating with multiple data sources. I approached this by first creating a detailed plan with milestones, then refactoring the codebase incrementally while maintaining functionality. I implemented a component library to ensure consistency and reusability, and used React Query to efficiently manage API calls. When we encountered integration issues with a third-party API, I worked directly with their team to develop a solution. The project was delivered on time with a 40% improvement in load time and positive user feedback.",
      tips: [
        "Use the STAR method: Situation, Task, Action, Result",
        "Focus on your specific contributions and decision-making process",
        "Quantify the results if possible",
      ],
    },
    {
      question: "How would you implement GraphQL in a React application?",
      category: "technical",
      difficulty: "medium",
      suggestedAnswer:
        "To implement GraphQL in a React application, I would first set up Apollo Client as the state management library. This involves creating an ApolloClient instance with the GraphQL endpoint and any required middleware like authentication. I'd then wrap the application with ApolloProvider to make the client available throughout the component tree. For queries, I'd use the useQuery hook to fetch data and handle loading/error states. For mutations, I'd use the useMutation hook. I'd organize GraphQL operations in separate files using the gql tag, and implement proper caching strategies. For larger applications, I'd consider implementing local state management with Apollo Cache and type generation with GraphQL Code Generator for TypeScript integration.",
      tips: [
        "Mention alternatives to Apollo like Relay or urql if you're familiar with them",
        "Discuss how you'd handle common challenges like caching and error handling",
        "If you don't have direct GraphQL experience, be honest but show your understanding of the concepts",
      ],
    },
    {
      question: "How do you approach mentoring junior developers?",
      category: "behavioral",
      difficulty: "medium",
      suggestedAnswer:
        "My approach to mentoring junior developers focuses on empowerment rather than just providing solutions. I start by understanding their current skill level and learning style. For technical guidance, I use pair programming sessions where we work through problems together, explaining my thought process. I believe in setting clear expectations and providing regular, constructive feedback. I encourage questions and create a safe environment where mistakes are viewed as learning opportunities. I also help them develop a growth plan with specific goals and resources. In my previous role, I mentored two junior developers who both progressed to mid-level positions within a year.",
      tips: [
        "Share a specific example of someone you've mentored",
        "Discuss how you balance guidance with allowing them to learn independently",
        "Mention how you adapt your approach to different learning styles",
      ],
    },
    {
      question: "Describe your experience with your e-commerce platform project mentioned in your resume.",
      category: "project",
      difficulty: "easy",
      suggestedAnswer:
        "For the e-commerce platform, I served as the lead frontend developer in a team of five. The project involved creating a responsive online store with product catalog, shopping cart, user accounts, and payment processing. I architected the frontend using React with TypeScript, implemented state management with Redux, and created a reusable component library with Styled Components. One of the main challenges was optimizing performance with a large product catalog, which I solved by implementing virtualization and pagination. I also integrated with Stripe for payments and set up comprehensive testing with Jest and React Testing Library. The project was completed on schedule and resulted in a 25% increase in mobile conversions compared to the previous platform.",
      tips: [
        "Focus on your specific contributions and technical decisions",
        "Highlight challenges you overcame",
        "Be prepared for follow-up technical questions about implementation details",
      ],
    },
  ],

  companyInsights: {
    overview:
      "TechCorp Solutions is a mid-sized technology company specializing in enterprise SaaS products. Founded in 2010, they've grown to over 200 employees across three offices. They're known for their collaborative culture and focus on work-life balance.",

    culture: [
      "Collaborative environment with cross-functional teams",
      "Flexible work arrangements with hybrid remote options",
      "Regular team-building events and hackathons",
      "Emphasis on continuous learning and professional development",
    ],

    values: [
      "Customer-centric approach to product development",
      "Innovation and creative problem-solving",
      "Transparency and open communication",
      "Diversity and inclusion in the workplace",
    ],

    interviewStyle:
      "TechCorp typically conducts a three-stage interview process: an initial screening call with HR, a technical interview with coding exercises and system design questions, and a final panel interview with the team and leadership. They focus on both technical skills and cultural fit, with an emphasis on problem-solving approach rather than perfect solutions.",

    expectations: [
      "Strong technical skills with a focus on clean, maintainable code",
      "Ability to mentor junior team members and contribute to technical decisions",
      "Proactive communication and collaboration with cross-functional teams",
      "Adaptability and willingness to learn new technologies as needed",
    ],

    additionalInfo:
      "The company recently secured Series B funding and is planning to expand their product offerings, which could present opportunities for growth and new project work.",
  },
}
