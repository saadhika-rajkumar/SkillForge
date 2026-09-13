import { useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "http://127.0.0.1:8000";

function App() {
  const [page, setPage] = useState("login");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [token, setToken] = useState("");
  const [resumeId, setResumeId] = useState(null);
  const [resumeName, setResumeName] = useState("");

  const [jobDescription, setJobDescription] = useState("");
  const [analysis, setAnalysis] = useState(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const register = async () => {
    setError("");
    setMessage("");

    try {
      await axios.post(`${API_URL}/auth/register`, {
        name,
        email,
        password,
      });

      setMessage("Account created successfully. Please login.");
      setPage("login");
    } catch (err) {
      setError(
        err.response?.data?.detail || "Registration failed."
      );
    }
  };

  const login = async () => {
    setError("");
    setMessage("");

    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      setToken(response.data.access_token);
      setPage("dashboard");
      setMessage("Login successful!");
    } catch (err) {
      setError(
        err.response?.data?.detail || "Login failed."
      );
    }
  };

  const uploadResume = async (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    if (file.type !== "application/pdf") {
      setError("Please upload a PDF file.");
      return;
    }

    setError("");
    setMessage("");
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${API_URL}/resumes/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResumeId(response.data.resume_id);
      setResumeName(response.data.filename);
      setMessage("Resume uploaded successfully.");
    } catch (err) {
      setError(
        err.response?.data?.detail || "Resume upload failed."
      );
    } finally {
      setLoading(false);
    }
  };

  const analyzeResume = async () => {
    setError("");
    setMessage("");

    if (!resumeId) {
      setError("Please upload your resume first.");
      return;
    }

    if (jobDescription.length < 20) {
      setError("Please enter a longer job description.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${API_URL}/analysis/job-match`,
        {
          resume_id: resumeId,
          job_description: jobDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAnalysis(response.data);
      setMessage("Analysis completed successfully.");
    } catch (err) {
      setError(
        err.response?.data?.detail || "Analysis failed."
      );
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken("");
    setResumeId(null);
    setResumeName("");
    setJobDescription("");
    setAnalysis(null);
    setMessage("");
    setError("");
    setPage("login");
  };

  if (page === "login") {
    return (
      <div className="app">
        <div className="auth-card">
          <div className="logo">SkillForge</div>

          <p className="tagline">
            Build the skills your career demands.
          </p>

          <h1>Welcome back</h1>
          <p className="subtitle">
            Sign in to analyze your resume against your target role.
          </p>

          {error && <div className="error">{error}</div>}
          {message && <div className="success">{message}</div>}

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <button onClick={login}>
            Sign In
          </button>

          <p className="switch-text">
            Don't have an account?{" "}
            <span onClick={() => setPage("register")}>
              Create one
            </span>
          </p>
        </div>
      </div>
    );
  }

  if (page === "register") {
    return (
      <div className="app">
        <div className="auth-card">
          <div className="logo">SkillForge</div>

          <p className="tagline">
            Your career preparation companion.
          </p>

          <h1>Create account</h1>
          <p className="subtitle">
            Start discovering the skills you need for your target role.
          </p>

          {error && <div className="error">{error}</div>}
          {message && <div className="success">{message}</div>}

          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <button onClick={register}>
            Create Account
          </button>

          <p className="switch-text">
            Already have an account?{" "}
            <span onClick={() => setPage("login")}>
              Sign in
            </span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <header className="navbar">
        <div className="logo">SkillForge</div>

        <button
          className="logout-button"
          onClick={logout}
        >
          Logout
        </button>
      </header>

      <main className="main-content">
        <section className="hero">
          <div>
            <p className="eyebrow">CAREER INTELLIGENCE</p>

            <h1>
              Know where you stand.
              <br />
              <span>Build where you lack.</span>
            </h1>

            <p>
              Upload your resume and compare your skills
              against any target job description.
            </p>
          </div>
        </section>

        {error && <div className="error page-message">{error}</div>}
        {message && (
          <div className="success page-message">{message}</div>
        )}

        <section className="workspace">
          <div className="panel">
            <div className="panel-number">01</div>

            <h2>Upload your resume</h2>

            <p>
              Upload a text-based PDF resume so SkillForge
              can identify your current skills.
            </p>

            <label className="upload-box">
              <input
                type="file"
                accept=".pdf,application/pdf"
                onChange={uploadResume}
              />

              <div className="upload-icon">↑</div>

              <strong>
                {resumeName
                  ? resumeName
                  : "Choose your PDF resume"}
              </strong>

              <span>
                {resumeName
                  ? "Resume ready for analysis"
                  : "PDF files only"}
              </span>
            </label>

            {loading && (
              <p className="loading">Processing...</p>
            )}
          </div>

          <div className="panel">
            <div className="panel-number">02</div>

            <h2>Target job</h2>

            <p>
              Paste the job description for the role you
              want to apply for.
            </p>

            <textarea
              placeholder="Paste the job description here..."
              value={jobDescription}
              onChange={(event) =>
                setJobDescription(event.target.value)
              }
            />

            <button
              className="analyze-button"
              onClick={analyzeResume}
              disabled={loading}
            >
              {loading ? "Analyzing..." : "Analyze Skill Gap →"}
            </button>
          </div>
        </section>

        {analysis && (
          <section className="results">
            <div className="results-header">
              <div>
                <p className="eyebrow">ANALYSIS COMPLETE</p>
                <h2>Your SkillForge Report</h2>
                <p>{analysis.filename}</p>
              </div>

              <div className="score">
                <strong>{analysis.match_score}%</strong>
                <span>Match Score</span>
              </div>
            </div>

            <div className="result-grid">
              <div className="result-card">
                <h3>✓ Matched Skills</h3>

                <div className="skill-list">
                  {analysis.matched_skills.length > 0 ? (
                    analysis.matched_skills.map((skill) => (
                      <span
                        className="skill matched"
                        key={skill}
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p>No matching skills detected.</p>
                  )}
                </div>
              </div>

              <div className="result-card">
                <h3>⚠ Missing Skills</h3>

                <div className="skill-list">
                  {analysis.missing_skills.length > 0 ? (
                    analysis.missing_skills.map((skill) => (
                      <span
                        className="skill missing"
                        key={skill}
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p>No skill gaps detected.</p>
                  )}
                </div>
              </div>
            </div>

            <div className="recommendations">
              <p className="eyebrow">YOUR NEXT STEPS</p>

              <h2>Personalized Learning Recommendations</h2>

              {analysis.recommendations.length > 0 ? (
                analysis.recommendations.map((item) => (
                  <div
                    className="recommendation"
                    key={item.skill}
                  >
                    <div className="recommendation-number">
                      +
                    </div>

                    <div>
                      <h3>{item.skill}</h3>
                      <p>{item.recommendation}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>
                  Great job! No additional skills were
                  identified as missing.
                </p>
              )}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;