import re


SKILL_ALIASES = {
    "python": ["python"],
    "java": ["java"],
    "c": ["c programming", "c language"],
    "c++": ["c++"],
    "c#": ["c#", "c sharp"],
    "javascript": ["javascript", "js"],
    "typescript": ["typescript", "ts"],
    "html": ["html", "html5"],
    "css": ["css", "css3"],
    "react": ["react", "react.js", "reactjs"],
    "node.js": ["node.js", "nodejs", "node"],
    "fastapi": ["fastapi"],
    "flask": ["flask"],
    "django": ["django"],
    "sql": ["sql"],
    "postgresql": ["postgresql", "postgres"],
    "mysql": ["mysql"],
    "mongodb": ["mongodb", "mongo db"],
    "git": ["git"],
    "github": ["github"],
    "docker": ["docker"],
    "linux": ["linux"],
    "aws": ["aws", "amazon web services"],
    "azure": ["azure", "microsoft azure"],
    "machine learning": ["machine learning", "ml"],
    "artificial intelligence": [
        "artificial intelligence",
        "ai"
    ],
    "data science": ["data science"],
    "data structures": [
        "data structures",
        "data structure"
    ],
    "algorithms": ["algorithms", "algorithm"],
    "rest api": [
        "rest api",
        "restful api",
        "rest apis"
    ],
    "api development": ["api development"],
    "jwt": ["jwt", "json web token"],
    "nlp": [
        "nlp",
        "natural language processing"
    ],
    "pandas": ["pandas"],
    "numpy": ["numpy"],
    "tensorflow": ["tensorflow"],
    "pytorch": ["pytorch"],
    "arduino": ["arduino"],
    "unity": ["unity"],
    "blender": ["blender"],
}


LEARNING_RESOURCES = {
    "python": "Practice Python programming, functions, modules and object-oriented programming.",
    "java": "Study Java OOP, collections, exception handling and basic backend development.",
    "c": "Practice C programming, pointers, arrays, functions and memory concepts.",
    "c++": "Practice C++ STL, OOP, templates and problem solving.",
    "javascript": "Learn JavaScript fundamentals, DOM, ES6+ and asynchronous programming.",
    "react": "Learn React components, hooks, state management and API integration.",
    "html": "Learn semantic HTML, forms, accessibility and responsive page structure.",
    "css": "Practice CSS layouts, Flexbox, Grid and responsive design.",
    "sql": "Practice SQL queries, joins, grouping, subqueries and database design.",
    "postgresql": "Learn PostgreSQL queries, indexes, relationships and database optimization.",
    "mongodb": "Learn MongoDB documents, queries, aggregation and schema design.",
    "git": "Practice Git branching, commits, merging and pull requests.",
    "github": "Learn GitHub repositories, branches, issues and pull requests.",
    "docker": "Learn Docker images, containers, Dockerfiles and basic deployment.",
    "machine learning": "Study supervised learning, preprocessing, model evaluation and basic ML algorithms.",
    "artificial intelligence": "Study AI fundamentals, search, reasoning and intelligent systems.",
    "data science": "Learn data cleaning, analysis, visualization and statistical fundamentals.",
    "data structures": "Practice arrays, linked lists, stacks, queues, trees, graphs and hash tables.",
    "algorithms": "Practice searching, sorting, recursion, greedy methods and complexity analysis.",
    "rest api": "Learn REST principles, HTTP methods, status codes and API design.",
    "jwt": "Learn JWT authentication, access tokens and secure API authorization.",
    "nlp": "Learn text preprocessing, tokenization, embeddings and basic NLP techniques.",
    "pandas": "Practice DataFrame operations, filtering, grouping and data cleaning.",
    "numpy": "Practice arrays, vectorized operations and numerical computing.",
    "tensorflow": "Learn tensors, neural networks, training and model evaluation.",
    "pytorch": "Learn tensors, datasets, neural networks and model training.",
    "arduino": "Build Arduino projects using sensors, actuators and serial communication.",
    "unity": "Learn Unity scenes, GameObjects, scripts and basic game development.",
    "blender": "Practice 3D modeling, materials, lighting and basic animation.",
}


def normalize_text(text):
    text = text.lower()
    text = text.replace(".js", " js")
    return text


def contains_skill(text, skill):
    aliases = SKILL_ALIASES.get(skill, [skill])

    for alias in aliases:
        pattern = r"(?<![a-z0-9])" + re.escape(alias.lower()) + r"(?![a-z0-9])"

        if re.search(pattern, text):
            return True

    return False


def extract_skills(text):
    normalized_text = normalize_text(text)

    found_skills = []

    for skill in SKILL_ALIASES:
        if contains_skill(normalized_text, skill):
            found_skills.append(skill)

    return sorted(found_skills)


def calculate_match_score(resume_skills, required_skills):
    if not required_skills:
        return 0

    matched = set(resume_skills).intersection(
        set(required_skills)
    )

    score = (len(matched) / len(set(required_skills))) * 100

    return round(score, 2)


def generate_recommendations(missing_skills):
    recommendations = []

    for skill in missing_skills:
        recommendation = LEARNING_RESOURCES.get(
            skill,
            "Build a small practical project and practice this skill using documentation and coding exercises."
        )

        recommendations.append({
            "skill": skill,
            "recommendation": recommendation
        })

    return recommendations


def analyze_resume_against_job(resume_text, job_description):
    resume_skills = extract_skills(resume_text)
    required_skills = extract_skills(job_description)

    matched_skills = sorted(
        set(resume_skills).intersection(set(required_skills))
    )

    missing_skills = sorted(
        set(required_skills).difference(set(resume_skills))
    )

    match_score = calculate_match_score(
        resume_skills,
        required_skills
    )

    recommendations = generate_recommendations(
        missing_skills
    )

    return {
        "resume_skills": resume_skills,
        "required_skills": required_skills,
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
        "match_score": match_score,
        "recommendations": recommendations,
    }