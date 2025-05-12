// src/types/cheatsheetTypes.ts (or a similar path)

// Interface for the structure within sheet.content
export interface SheetContent {
  role: string;
  company: string;
  swot_analysis: SwotAnalysisData;
  company_insights: CompanyInsightsData; // Using this as the source for both companyOverview and companyInsights
  skill_assessment: SkillAssessmentData;
  concept_refresh: ConceptRefreshItem[];
  interview_questions: InterviewQuestionItem[];
  // If resumeName and generatedDate can come from content, define them here:
  // resume_name?: string;
  // generated_on?: string; // or Date
  [key: string]: any; // Allows for other potential properties if 'content' is flexible
}

export interface SwotAnalysisData {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export interface CompanyInsightsData {
  additional_info?: string;
  company_overview: string;
  company_values?: string[]; // Or { value: string, description: string }[]
  culture_points?: string[]; // Or { point: string, details: string }[]
  expectations?: string;
  // Add other fields if present in your actual 'company_insights' object
}

export interface SkillAssessmentData {
  match_percentage: number;
  matched_skills: string[]; // Or { skill: string, level: string }[]
  missing_skills: string[]; // Or { skill: string, importance: string }[]
  partial_matches?: string[]; // Or { skill: string, notes: string }[]
}

export interface ConceptRefreshItem {
  id?: string | number; // If items have unique IDs
  concept: string;
  explanation: string;
  resources?: Array<{ name: string; url: string }>;
}

export interface InterviewQuestionItem {
  id?: string | number; // If items have unique IDs
  question: string;
  answer_guidelines?: string;
  type?: 'Behavioral' | 'Technical' | 'Situational' | string; // Example types
  difficulty?: 'Easy' | 'Medium' | 'Hard';
}

// Interface for the raw sheet object fetched from Redux
export interface SheetFromRedux {
  id: number | string;
  cheatsheet_type: 'interviewer' | 'candidate' | string; // Be more specific if possible
  content: SheetContent | string; // Assuming content might be a JSON string that needs parsing or already an object
  // Add any other top-level properties of the sheet from Redux (e.g., user_id, created_at)
}

// This is the interface you asked for, for the prop passed to CandidateResultsPage
export interface FormattedCheatsheet {
  id: number | string;
  jobTitle: string;
  company: string;
  resumeName: string; // Consider making this dynamic
  generatedDate: string; // Consider making this dynamic or a Date type
  swotAnalysis: SwotAnalysisData;
  companyInsights: CompanyInsightsData; // Standardized to use companyInsights
  skillAssessment: SkillAssessmentData;
  conceptRefresh: ConceptRefreshItem[];
  interviewQuestions: InterviewQuestionItem[];
}