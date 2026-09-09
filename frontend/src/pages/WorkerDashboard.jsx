import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Wrench, BookOpen, ShieldCheck, Award, ArrowRight, Mic, Send, FileText } from 'lucide-react';

export default function WorkerDashboard() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState({
    full_name: 'Sunita Devi',
    target_trade: 'Tailoring & Sewing',
    years_experience: 6.0,
    district: 'Varanasi'
  });

  const userId = localStorage.getItem('karman_user_id') || 'sunita@karman.gov.in';

  useEffect(() => {
    // Fetch live newsroom
    fetch('/api/worker/newsroom')
      .then(res => res.json())
      .then(data => { setNews(data); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });

    // Day 1: Hydrate worker profile from MongoDB Atlas
    fetch(`/api/profile/${encodeURIComponent(userId)}`)
      .then(res => res.ok ? res.json() : null)
      .then(profile => {
        if (profile) setUserProfile(profile);
      })
      .catch(err => console.warn("Could not load worker profile from MongoDB:", err));
  }, [userId]);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6 font-sans bg-[#18121e] min-h-screen text-slate-100">
      
      {/* Header Banner */}
      <div className="bg-[#241a2c] border border-[#3d2e49] p-6 rounded-2xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#79b473] mb-1">
            <Wrench className="w-4 h-4" />
            <span>WORKER DESK • SKILLED ARTISAN PORTAL</span>
          </div>
          <h1 className="text-2xl font-black text-white">Namaste, {userProfile.full_name}</h1>
          <p className="text-xs text-slate-400 mt-1">
            District: {userProfile.district} • Government schemes, NSQF trade certifications, and equipment grants for you.
          </p>
        </div>

        <Link 
          to="/worker/skills"
          className="bg-[#79b473] hover:bg-[#68a062] text-[#18121e] font-bold text-xs px-4 py-2.5 rounded-xl font-mono inline-flex items-center gap-2"
        >
          <span>Search Trade & Skills</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Worker Profile Overview Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs">
        <div className="bg-[#241a2c] border border-[#3d2e49] p-4 rounded-xl space-y-1">
          <div className="text-slate-400 text-[10px]">PRIMARY TRADE</div>
          <div className="text-lg font-bold text-white">{userProfile.target_trade}</div>
          <div className="text-[10px] text-[#70a37f]">NSQF Level 4 Track</div>
        </div>

        <div className="bg-[#241a2c] border border-[#3d2e49] p-4 rounded-xl space-y-1">
          <div className="text-slate-400 text-[10px]">PRACTICAL EXPERIENCE</div>
          <div className="text-lg font-bold text-[#79b473]">{userProfile.years_experience} Years (Informal)</div>
          <div className="text-[10px] text-slate-400">RPL Fast-Track Qualified</div>
        </div>

        <div className="bg-[#241a2c] border border-[#3d2e49] p-4 rounded-xl space-y-1">
          <div className="text-slate-400 text-[10px]">POTENTIAL MATCHES</div>
          <div className="text-lg font-bold text-amber-400">3 Government Schemes</div>
          <div className="text-[10px] text-slate-400">PM-AJAY, Vishwakarma</div>
        </div>

        <div className="bg-[#241a2c] border border-[#3d2e49] p-4 rounded-xl space-y-1">
          <div className="text-slate-400 text-[10px]">CERTIFICATION PATHWAY</div>
          <div className="text-lg font-bold text-[#79b473]">Fast-Track RPL</div>
          <div className="text-[10px] text-slate-400">3 to 5 Day Assessment</div>
        </div>
      </div>

      {/* Prominent "What's New" Scheme Newsroom Feed */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
            WHAT'S NEW IN GOVERNMENT SCHEMES
          </h2>
          <Link to="/worker/newsroom" className="text-xs font-mono text-[#79b473] hover:underline">
            View All Scheme Updates ➔
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-10 font-mono text-xs text-slate-400">Loading Latest Scheme Updates...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {news.map((item) => (
              <div key={item.id} className="bg-[#241a2c] border border-[#3d2e49] hover:border-[#79b473] rounded-2xl p-5 flex flex-col justify-between space-y-4 transition">
                <div className="space-y-2">
                  <div className="flex justify-between items-center font-mono text-[11px]">
                    <span className="bg-[#79b473]/15 text-[#79b473] border border-[#79b473]/30 px-2 py-0.5 rounded font-bold">
                      {item.badge}
                    </span>
                    <span className="text-slate-400">{item.category}</span>
                  </div>

                  <h3 className="font-bold text-sm text-white">{item.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.summary}</p>
                </div>

                {/* Official Source Layer */}
                <div className="bg-[#18121e] border border-[#3d2e49] p-3 rounded-lg font-mono text-[11px] space-y-1">
                  <div className="text-[#79b473] font-bold flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5" /> Official Source Evidence:
                  </div>
                  <div className="text-slate-300">Document: {item.source_document} (Page {item.source_page})</div>
                  <a href={item.official_url} target="_blank" rel="noopener noreferrer" className="text-[#41658a] hover:underline block pt-0.5">
                    Visit Official Government Source ➔
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
