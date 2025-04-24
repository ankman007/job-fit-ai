
candidate_schema = {
  "type": "object",
  "properties": {
    "company": {
      "type": "string",
      "description": "The company that the job description belongs to"
    },
    "role": {
      "type": "string",
      "description": "The role that the job description belongs to"
    },
    "swot_analysis": {
      "type": "object",
      "description": "SWOT analysis with structured entries",
      "properties": {
        "strengths": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "title": {"type": "string"},
              "description": {"type": "string"}
            },
            "required": ["title", "description"]
          }
        },
        "weaknesses": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "title": {"type": "string"},
              "description": {"type": "string"}
            },
            "required": ["title", "description"]
          }
        },
        "opportunities": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "title": {"type": "string"},
              "description": {"type": "string"}
            },
            "required": ["title", "description"]
          }
        },
        "threats": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "title": {"type": "string"},
              "description": {"type": "string"}
            },
            "required": ["title", "description"]
          }
        }
      },
      "required": ["strengths", "weaknesses", "opportunities", "threats"]
    },
    "skill_assessment": {
      "type": "object",
      "properties": {
        "match_percentage": {
          "type": "number",
          "description": "Overall skill match percentage"
        },
        "matched_skills": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "title": {"type": "string"},
              "description": {"type": "string"},
              "rating": {"type": "string"}
            },
            "required": ["title", "description", "rating"]
          }
        },
        "partial_matches": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "title": {"type": "string"},
              "description": {"type": "string"},
              "rating": {"type": "string"}
            },
            "required": ["title", "description", "rating"]
          }
        },
        "missing_skills": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "title": {"type": "string"},
              "description": {"type": "string"}
            },
            "required": ["title", "description"]
          }
        }
      },
      "required": ["match_percentage", "matched_skills", "partial_matches", "missing_skills"]
    },
    "concept_refresh": {
      "type": "array",
      "description": "Concepts to revise before the interview",
      "items": {
        "type": "object",
        "properties": {
          "topic": {"type": "string"},
          "context": {
            "type": "string",
            "description": "Where it is mentioned (JD/resume)"
          },
          "review_notes": {
            "type": "string",
            "description": "Short description of what to revise"
          },
          "article_resource": {"type": "string"}
        },
        "required": ["topic", "context", "review_notes", "article_resource"]
      },
      "items": {
        "type": "object",
        "properties": {
          "topic": {"type": "string"},
          "context": {
            "type": "string",
            "description": "Where it is mentioned (JD/resume)"
          },
          "review_notes": {
            "type": "string",
            "description": "Short description of what to revise"
          },
          "video_resource": {"type": "string"},
        },
        "required": ["topic", "context", "review_notes", "video_resource"]
      }
    },
    "interview_questions": {
      "type": "array",
      "description": "Key interview questions and answers",
      "items": {
        "type": "object",
        "properties": {
          "category": {
            "type": "string",
            "enum": ["Technical", "Behavioral", "Experience", "Project"]
          },
          "difficulty": {
            "type": "string",
            "enum": ["Easy", "Medium", "Hard"]
          },
          "question": {"type": "string"},
          "answer": {"type": "string"}
        },
        "required": ["category", "difficulty", "question", "answer"]
      }
    },
    "company_insights": {
      "type": "object",
      "properties": {
        "company_overview": {"type": "string"},
        "culture_points": {
          "type": "array",
          "items": {"type": "string"}
        },
        "company_values": {
          "type": "array",
          "items": {"type": "string"}
        },
        "interview_style": {"type": "string"},
        "expectations": {"type": "string"},
        "additional_info": {"type": "string"},
        "fallback": {
          "type": "string",
          "description": "Fallback text if company insights are not available"
        }
      },
      "required": ["company_overview", "culture_points", "company_values", "interview_style", "expectations", "additional_info"]
    }
  },
  "required": [
    "company",
    "role",
    "swot_analysis",
    "skill_assessment",
    "concept_refresh",
    "interview_questions",
    "company_insights"
  ]
}

interviewer_schema = {
  "type": "object",
  "properties": {
    "candidate_overview": {
      "type": "object",
      "properties": {
        "full_name": {"type": "string"},
        "current_job_title": {"type": "string"},
        "email": {"type": "string"},
        "phone_number": {"type": "string"},
        "location": {"type": "string"},
        "top_skills": {
          "type": "array",
          "items": {"type": "string"}
        },
        "candidate_summary": {"type": "string"}
      },
      "required": ["full_name", "email", "candidate_summary"]
    },
    "compatibility_score": {
      "type": "object",
      "properties": {
        "overall_score": {"type": "number"},
        "match": {"type": "string", "enum": ["excellent", "good", "poor"]},
        "technical_skills_score": {"type": "number"},
        "education_score": {"type": "number"},
        "experience_score": {"type": "number"},
        "cultural_fit_score": {"type": "number"}
      },
      "required": ["overall_score", "match", "technical_skills_score", "education_score", "experience_score"]

    },
    "skills_assessment": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "skill_name": {"type": "string"},
          "category": {"type": "string"},
          "assessment": {"type": "string", "enum": ["exceeds", "meets", "below", "missing"]}
        },
        "required": ["skill_name", "category", "assessment"]
      }
    },
    "education": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "degree_name": {"type": "string"},
          "institution": {"type": "string"},
          "location": {"type": "string"},
          "major": {"type": "string"},
          "notable_points": {
            "type": "array",
            "items": {"type": "string"}
          }
        },
        "required": ["degree_name", "institution", "notable_points"]
      }
    },
    "experience": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "title": {"type": "string"},
          "company": {"type": "string"},
          "location": {"type": "string"},
          "start_date": {"type": "string"},
          "end_date": {"type": "string"},
          "responsibilities": {
            "type": "array",
            "items": {"type": "string"}
          },
          "relevance_to_job": {"type": "string"}
        },
        "required": ["title", "company", "responsibilities", "relevance_to_job"]
      }
    },
    "skill_gaps_and_concerns": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "skill_name": {"type": "string"},
          "experience_level": {"type": "string"},
          "recommendation": {"type": "string"},
          "gap_level": {"type": "string", "enum": ["Critical Gap", "Minor Gap"]}
        }
      }
    },
    "recommended_screening_questions": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "priority": {"type": "string", "enum": ["High", "Medium", "Low"]},
          "category": {"type": "string", "enum": ["technical", "behavioral", "experience", "project"]},
          "question": {"type": "string"},
          "purpose": {"type": "string"}
        },
        "required": ["priority", "category", "question", "purpose"]
      }
    },
    "interview_recommendation": {
      "type": "object",
      "properties": {
        "proceed": {"type": "boolean"},
        "summary": {"type": "string"},
        "key_strengths": {
          "type": "array",
          "items": {"type": "string"}
        },
        "concerns": {
          "type": "array",
          "items": {"type": "string"}
        },
        "recommended_next_steps": {
          "type": "array",
          "items": {"type": "string"}
        }
      },
      "required": ["proceed", "summary", "key_strengths", "concerns"]
    }
  }
}
