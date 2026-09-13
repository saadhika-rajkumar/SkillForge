# SkillForge

> An explainable career intelligence platform that analyzes a resume against a target job description, identifies skill gaps, and provides personalized learning recommendations.

## Overview

SkillForge is a full-stack web application designed to help students and job seekers understand how well their current skills align with a target role.

Users can upload a PDF resume and provide a job description. SkillForge extracts the resume text, detects relevant technical skills, compares them with the requirements of the target role, calculates a match score, identifies missing skills, and generates practical learning recommendations.

## Key Features

- User registration and login
- JWT-based authentication
- Secure user profile management
- PDF resume upload
- Resume text extraction
- Technical skill detection
- Job description analysis
- Resume-to-job skill matching
- Match score calculation
- Missing skill identification
- Personalized learning recommendations
- React-based interactive dashboard
- PostgreSQL data storage
- REST API architecture

## Technology Stack

### Frontend
- React
- Vite
- Axios
- JavaScript
- CSS

### Backend
- Python
- FastAPI
- SQLAlchemy
- PyJWT
- pwdlib
- pypdf

### Database
- PostgreSQL

### Development Tools
- Git
- GitHub
- VS Code

## System Architecture

```text
React Frontend
      |
      | REST API / Axios
      v
FastAPI Backend
      |
      +---- Authentication
      |
      +---- User Management
      |
      +---- Resume Processing
      |
      +---- Skill Analysis
      |
      v
PostgreSQL Database