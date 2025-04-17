import dspy
from pydantic import BaseModel, Field
from typing import List, Optional, Dict
from enum import Enum

class AnalysisType(str, Enum):
    SWOT = "swot"
    SKILL_GAP = "skill_gap"
    CONCEPT_REFRESH = "concept_refresh"
    INTERVIEW_QUESTIONS = "interview_questions"
    COMPANY_INSIGHTS = "company_insights"

class SWOTAnalysis(BaseModel):
    """Comprehensive SWOT analysis of the resume against the job description"""
    strengths: List[str] = Field(..., description="List of strengths in the resume relative to the job")
    weaknesses: List[str] = Field(..., description="List of weaknesses or gaps in the resume")
    opportunities: List[str] = Field(..., description="Potential opportunities to highlight")
    threats: List[str] = Field(..., description="Potential threats or competitive disadvantages")

class SkillGapAnalysis(BaseModel):
    """Detailed analysis of skills matching and gaps"""
    matching_skills: Dict[str, str] = Field(..., description="Skills that match with examples")
    missing_skills: Dict[str, str] = Field(..., description="Missing skills with importance level")
    developing_skills: Dict[str, str] = Field(..., description="Skills that need development with suggestions")

class ConceptRefreshItem(BaseModel):
    """Recommended concepts to refresh based on resume and job"""
    concept: str = Field(..., description="Name of the concept or topic")
    relevance: str = Field(..., description="Why this is relevant based on your experience")
    resources: List[str] = Field(..., description="Suggested resources for refreshing this concept")

class InterviewQuestion(BaseModel):
    """Predicted interview question with context"""
    question: str = Field(..., description="The predicted interview question")
    source: str = Field(..., description="What in your resume/job description prompted this question")
    tips: List[str] = Field(..., description="Tips for answering this question")

class CompanyInsight(BaseModel):
    """Insight about the target company"""
    insight: str = Field(..., description="The insight about the company")
    relevance: str = Field(..., description="How this relates to your background or the position")
    action: Optional[str] = Field(None, description="Suggested action based on this insight")

class ResumeAnalysisInput(BaseModel):
    """Input data for resume analysis"""
    resume_text: str = Field(..., description="Full text content of the resume")
    job_description: str = Field(..., description="Full text of the job description")
    company_info: Optional[str] = Field(None, description="Any available information about the company")

class ResumeAnalysisOutput(BaseModel):
    """Comprehensive output of resume analysis"""
    swot_analysis: SWOTAnalysis
    skill_gap_analysis: SkillGapAnalysis
    concept_refresh: List[ConceptRefreshItem]
    interview_questions: List[InterviewQuestion]
    company_insights: List[CompanyInsight]
    overall_recommendations: List[str] = Field(..., description="Overall preparation recommendations")

class ResumeScanner(dspy.Module):
    """Core resume analysis module that performs comprehensive evaluation"""
    
    def __init__(self):
        super().__init__()
        self.generate_swot = dspy.Predict("resume_text, job_description -> swot_analysis")
        self.generate_skill_gap = dspy.Predict("resume_text, job_description -> skill_gap_analysis")
        self.generate_concepts = dspy.Predict("resume_text, job_description -> concept_refresh")
        self.generate_questions = dspy.Predict("resume_text, job_description -> interview_questions")
        self.generate_insights = dspy.Predict("resume_text, job_description, company_info -> company_insights")
        self.generate_recommendations = dspy.Predict("swot_analysis, skill_gap_analysis, concept_refresh, interview_questions, company_insights -> overall_recommendations")
    
    def forward(self, resume_text: str, job_description: str, company_info: Optional[str] = None):
        swot_result = self.generate_swot(
            resume_text=resume_text,
            job_description=job_description
        )
        
        skill_gap_result = self.generate_skill_gap(
            resume_text=resume_text,
            job_description=job_description
        )
        
        concepts_result = self.generate_concepts(
            resume_text=resume_text,
            job_description=job_description
        )
        
        questions_result = self.generate_questions(
            resume_text=resume_text,
            job_description=job_description
        )
        
        insights_result = self.generate_insights(
            resume_text=resume_text,
            job_description=job_description,
            company_info=company_info or ""
        )
        
        recommendations_result = self.generate_recommendations(
            swot_analysis=swot_result.swot_analysis,
            skill_gap_analysis=skill_gap_result.skill_gap_analysis,
            concept_refresh=concepts_result.concept_refresh,
            interview_questions=questions_result.interview_questions,
            company_insights=insights_result.company_insights
        )
        
        return ResumeAnalysisOutput(
            swot_analysis=swot_result.swot_analysis,
            skill_gap_analysis=skill_gap_result.skill_gap_analysis,
            concept_refresh=concepts_result.concept_refresh,
            interview_questions=questions_result.interview_questions,
            company_insights=insights_result.company_insights,
            overall_recommendations=recommendations_result.overall_recommendations
        )

class ResumeAnalyzer:
    """High-level interface for resume analysis"""
    
    def __init__(self):
        self.scanner = ResumeScanner()
        # Initialize model
        # configure DSPy settings
        dspy.configure(lm=dspy.OpenAI(model="gpt-4"))
    
    def analyze_resume(self, input_data: ResumeAnalysisInput) -> ResumeAnalysisOutput:
        """
        Perform comprehensive analysis of resume against job description
        
        Args:
            input_data: Contains resume text, job description, and optional company info
            
        Returns:
            Complete analysis including SWOT, skill gaps, interview prep, etc.
        """
        return self.scanner(
            resume_text=input_data.resume_text,
            job_description=input_data.job_description,
            company_info=input_data.company_info
        )
    
    def analyze_resume_from_files(self, resume_path: str, jd_path: str, company_info_path: Optional[str] = None) -> ResumeAnalysisOutput:
        """
        Convenience method to analyze from file paths
        
        Args:
            resume_path: Path to resume text file
            jd_path: Path to job description text file
            company_info_path: Optional path to company info text file
            
        Returns:
            Complete analysis output
        """
        with open(resume_path, 'r') as f:
            resume_text = f.read()
        
        with open(jd_path, 'r') as f:
            jd_text = f.read()
        
        company_info = None
        if company_info_path:
            with open(company_info_path, 'r') as f:
                company_info = f.read()
        
        return self.analyze_resume(ResumeAnalysisInput(
            resume_text=resume_text,
            job_description=jd_text,
            company_info=company_info
        ))

if __name__ == "__main__":
    analyzer = ResumeAnalyzer()
    # Sample input data
    sample_input = ResumeAnalysisInput(
        resume_text="""Experienced software engineer with 5 years in Python and web development.
                      Led team of 3 developers on e-commerce project. Strong in Django, Flask.
                      Some experience with React, but not expert level.""",
        job_description="""Senior Python Developer needed for web platform.
                          Must have: 5+ years Python, Django expertise, team leadership.
                          Nice to have: React, AWS, microservices.
                          Will lead team of 5 developers.""",
        company_info="""Tech startup focused on e-commerce solutions. Fast-paced environment.
                       Values: innovation, teamwork, continuous learning."""
    )
    
    analysis = analyzer.analyze_resume(sample_input)
    
    print("SWOT Analysis:")
    print(f"Strengths: {analysis.swot_analysis.strengths}")
    print(f"Weaknesses: {analysis.swot_analysis.weaknesses}")
    
    print("\nRecommended Concepts to Refresh:")
    for concept in analysis.concept_refresh[:3]:
        print(f"- {concept.concept}: {concept.relevance}")
    
    print("\nPredicted Interview Questions:")
    for question in analysis.interview_questions[:3]:
        print(f"- {question.question}")