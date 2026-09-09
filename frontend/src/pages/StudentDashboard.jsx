import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Sparkles, CheckCircle2, AlertCircle, ArrowRight, Layers, FileSearch, Code, Rocket, BookOpen } from 'lucide-react';

export default function StudentDashboard() {
  const [targetRole, setTargetRole] = useState('ai_ml_engineer');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [studentName, setStudentName] = useState('Aarav Mehta');

  const userId = localStorage.getItem('karman_user_id') || 'student@karman.gov.in';

  // Day 1: Hydrate student profile from MongoDB Atlas
  useEffect(() => {
    fetch(`/api/profile/${encodeURIComponent(userId)}`)
      .then(res => res.ok ? res.json() : null)
      .then(profile => {
        if (profile) {
          if (profile.full_name) setStudentName(profile.full_name);
          if (profile.target_trade && (profile.target_trade.includes('Full') || profile.target_trade.includes('Stack'))) {
            setTargetRole('full_stack_developer');
          }
        }
      })
      .catch(err => console.warn("Could not load student profile from MongoDB:", err));
  }, [userId]);

  const fetchAnalysis = async (role) => {
    setLoading(true);
    try {
      const res = await fetch('/api/student/analyze-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resume_text: "Knowledge of Python, SQL, Git, and basic Machine Learning algorithms.",
          target_role: role
        })
      });
      if (res.ok) {
        const data = await res.json();
        setAnalysis(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalysis(targetRole);
  }, [targetRole]);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6 font-sans bg-[#18121e] min-h-screen text-slate-100">
      
      {/* Header Banner */}
      <div className="bg-[#241a2c] border border-[#3d2e49] p-6 rounded-2xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#41658a] mb-1">
            <GraduationCap className="w-4 h-4" />
            <span>COLLEGE STUDENT CAREER LAB</span>
          </div>
          <h1 className="text-2xl font-black text-white">Welcome back, {studentName}. Let's figure out what comes next.</h1>
          <p className="text-xs text-slate-400 mt-1">
            KARMAN analyzes your current profile, identifies skill gaps, and recommends targeted projects to get you career-ready.
          </p>
        </div>

        {/* Target Role Selector */}
        <div className="font-mono text-xs">
          <label className="block text-slate-400 mb-1">Target Career Role:</label>
          <select 
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            className="bg-[#18121e] border border-[#41658a] text-[#41658a] font-bold rounded-lg px-3 py-2 focus:outline-none"
          >
            <option value="ai_ml_engineer">AI / ML Engineer</option>
            <option value="full_stack_developer">Full-Stack Developer</option>
          </select>
        </div>
      </div>

      {/* Main Readiness Gauge & KPI Cards */}
      {loading || !analysis ? (
        <div className="text-center py-16 font-mono text-xs text-slate-400">Analyzing Profile & Target Career Match...</div>
      ) : (
        <div className="space-y-6">
          
          {/* Readiness Banner */}
          <div className="bg-[#241a2c] border border-[#41658a] p-6 rounded-2xl grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            
            <div className="flex items-center gap-6">
              <div className="relative w-24 h-24 rounded-full bg-[#18121e] border-4 border-[#41658a] flex items-center justify-center font-mono">
                <span className="text-2xl font-black text-[#41658a]">{analysis.career_readiness_score}%</span>
              </div>
              <div>
                <h3 className="font-bold text-sm text-white">Career Readiness Score</h3>
                <p className="text-xs text-slate-400 mt-0.5">Based on skill match vs target role standards</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 font-mono text-center text-xs">
              <div className="bg-[#18121e] border border-[#3d2e49] p-3 rounded-lg">
                <div className="text-lg font-bold text-[#79b473]">{analysis.matched_skills.length}</div>
                <div className="text-[10px] text-slate-400">Skills Matched</div>
              </div>

              <div className="bg-[#18121e] border border-[#3d2e49] p-3 rounded-lg">
                <div className="text-lg font-bold text-[#f59e0b]">{analysis.missing_skills.length}</div>
                <div className="text-[10px] text-slate-400">To Improve</div>
              </div>

              <div className="bg-[#18121e] border border-[#3d2e49] p-3 rounded-lg">
                <div className="text-lg font-bold text-[#41658a]">3</div>
                <div className="text-[10px] text-slate-400">Projects Rec.</div>
              </div>
            </div>

            <div className="text-right">
              <Link 
                to="/student/resume-analyzer"
                className="bg-[#41658a] hover:bg-[#345272] text-white font-bold text-xs px-4 py-2.5 rounded-lg inline-flex items-center gap-2 font-mono"
              >
                <span>Analyze Full Resume</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>

          {/* 4 Profile Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs">
            <div className="bg-[#241a2c] border border-[#3d2e49] p-4 rounded-xl space-y-1">
              <div className="text-slate-400 text-[10px]">RESUME RATING</div>
              <div className="text-xl font-bold text-white">78 / 100</div>
              <div className="text-[10px] text-[#79b473]">✓ Education & Core Skills Strong</div>
            </div>

            <div className="bg-[#241a2c] border border-[#3d2e49] p-4 rounded-xl space-y-1">
              <div className="text-slate-400 text-[10px]">SKILL MATCH</div>
              <div className="text-xl font-bold text-[#41658a]">{analysis.matched_skills.length} / {analysis.matched_skills.length + analysis.missing_skills.length}</div>
              <div className="text-[10px] text-[#70a37f]">✓ Fundamentals Validated</div>
            </div>

            <div className="bg-[#241a2c] border border-[#3d2e49] p-4 rounded-xl space-y-1">
              <div className="text-slate-400 text-[10px]">PROJECTS COMPLETED</div>
              <div className="text-xl font-bold text-[#79b473]">2 Completed</div>
              <div className="text-[10px] text-slate-400">1 Lab Project Recommended</div>
            </div>

            <div className="bg-[#241a2c] border border-[#3d2e49] p-4 rounded-xl space-y-1">
              <div className="text-slate-400 text-[10px]">WORK EXPERIENCE</div>
              <div className="text-xl font-bold text-amber-400">1 Internship</div>
              <div className="text-[10px] text-slate-400">Needs Applied Deployment</div>
            </div>
          </div>

          {/* Actionable Next Step Card */}
          <div className="bg-[#241a2c] border-2 border-[#79b473] p-6 rounded-2xl flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-2 max-w-xl">
              <div className="flex items-center gap-2 text-xs font-mono text-[#79b473] font-bold">
                <Rocket className="w-4 h-4" /> YOUR RECOMMENDED NEXT STEP
              </div>
              <h3 className="text-lg font-bold text-white">{analysis.next_step_recommendation.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Your current profile shows strong ML fundamentals, but doesn't demonstrate experience deploying a model. Close your deployment gap by building a FastAPI REST service in Docker.
              </p>
            </div>

            <Link 
              to="/student/projects"
              className="bg-[#79b473] hover:bg-[#68a062] text-[#18121e] font-bold text-xs px-5 py-3 rounded-xl inline-flex items-center gap-2 font-mono shadow-lg shadow-[#79b473]/20"
            >
              <span>Explore Project Lab</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      )}

    </div>
  );
}
