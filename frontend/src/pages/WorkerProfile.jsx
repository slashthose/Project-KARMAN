import React, { useState, useEffect } from 'react';
import { User, Wrench, CheckCircle2, ShieldCheck, Save, Award, RefreshCw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function WorkerProfile() {
  const { user } = useAuth();
  const userId = user?.identifier || localStorage.getItem('karman_user_id') || 'sunita@karman.gov.in';

  const [profile, setProfile] = useState({
    name: user?.name || 'Sunita Devi',
    phone: '919876543210',
    trade: 'Tailoring & Sewing',
    experience: '5 Years (Informal)',
    state: 'Uttar Pradesh',
    district: 'Varanasi',
    nsqf_code: 'Sewing Machine Operator (AMH/Q0301)',
    rpl_eligible: true
  });

  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  // Day 1: Hydrate live profile from MongoDB Atlas on page load
  useEffect(() => {
    let isMounted = true;
    async function loadRemoteProfile() {
      try {
        const res = await fetch(`/api/profile/${encodeURIComponent(userId)}`);
        if (res.ok) {
          const data = await res.json();
          if (isMounted) {
            setProfile(prev => ({
              ...prev,
              name: data.full_name || prev.name,
              phone: data.phone_number || prev.phone,
              district: data.district || prev.district,
              trade: data.target_trade || prev.trade,
              experience: `${data.years_experience || 5} Years (Informal)`
            }));
          }
        }
      } catch (err) {
        console.warn("Could not load remote profile from MongoDB:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadRemoteProfile();
    return () => { isMounted = false; };
  }, [userId]);

  // Day 1: Save updated profile to MongoDB Atlas
  const handleSave = async (e) => {
    e.preventDefault();
    setSaved(false);
    try {
      const payload = {
        user_id: userId,
        full_name: profile.name,
        phone_number: profile.phone,
        education_level: "10th Pass / RPL Candidate",
        district: profile.district,
        target_trade: profile.trade,
        years_experience: parseFloat(profile.experience) || 5.0,
        current_status: "Informal Worker"
      };

      const res = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3500);
      }
    } catch (err) {
      console.error("Failed to save profile in MongoDB Atlas:", err);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 font-sans bg-[#18121e] min-h-screen text-slate-100">
      
      {/* Header */}
      <div className="bg-[#241a2c] border border-[#3d2e49] p-6 rounded-2xl flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#79b473] mb-1">
            <User className="w-4 h-4" />
            <span>WORKER SKILL PROFILE</span>
          </div>
          <h1 className="text-xl font-bold text-white">Your Skill Passport & Credentials</h1>
          <p className="text-xs text-slate-400 mt-1">
            Official trade registration details mapped to National Skills Qualifications Framework (NSQF).
          </p>
        </div>

        <span className="bg-[#79b473]/20 border border-[#79b473]/40 text-[#79b473] font-mono text-xs px-3 py-1.5 rounded-xl font-bold">
          RPL Qualified ✓
        </span>
      </div>

      {saved && (
        <div className="bg-[#79b473]/15 border border-[#79b473]/40 text-[#79b473] p-4 rounded-xl font-mono text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Worker profile updated successfully!</span>
        </div>
      )}

      {/* Profile Form */}
      <form onSubmit={handleSave} className="bg-[#241a2c] border border-[#3d2e49] p-6 rounded-2xl space-y-4 font-mono text-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-400 mb-1">Full Name:</label>
            <input 
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full bg-[#18121e] border border-[#3d2e49] rounded-xl px-3 py-2.5 text-slate-100 focus:outline-none focus:border-[#79b473]"
              required
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1">Mobile Phone Number:</label>
            <input 
              type="text"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              className="w-full bg-[#18121e] border border-[#3d2e49] rounded-xl px-3 py-2.5 text-slate-100 focus:outline-none focus:border-[#79b473]"
              required
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1">Primary Skill / Trade:</label>
            <input 
              type="text"
              value={profile.trade}
              onChange={(e) => setProfile({ ...profile, trade: e.target.value })}
              className="w-full bg-[#18121e] border border-[#3d2e49] rounded-xl px-3 py-2.5 text-slate-100 focus:outline-none focus:border-[#79b473]"
              required
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1">Years of Practical Experience:</label>
            <input 
              type="text"
              value={profile.experience}
              onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
              className="w-full bg-[#18121e] border border-[#3d2e49] rounded-xl px-3 py-2.5 text-slate-100 focus:outline-none focus:border-[#79b473]"
              required
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1">State:</label>
            <input 
              type="text"
              value={profile.state}
              onChange={(e) => setProfile({ ...profile, state: e.target.value })}
              className="w-full bg-[#18121e] border border-[#3d2e49] rounded-xl px-3 py-2.5 text-slate-100 focus:outline-none focus:border-[#79b473]"
              required
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1">District:</label>
            <input 
              type="text"
              value={profile.district}
              onChange={(e) => setProfile({ ...profile, district: e.target.value })}
              className="w-full bg-[#18121e] border border-[#3d2e49] rounded-xl px-3 py-2.5 text-slate-100 focus:outline-none focus:border-[#79b473]"
              required
            />
          </div>
        </div>

        <button 
          type="submit"
          className="bg-[#79b473] hover:bg-[#68a062] text-[#18121e] font-bold px-6 py-2.5 rounded-xl transition font-mono flex items-center gap-2 shadow"
        >
          <Save className="w-4 h-4" />
          <span>Save Profile Changes</span>
        </button>
      </form>

      {/* Your Next Steps Checklist */}
      <div className="bg-[#241a2c] border border-[#3d2e49] p-6 rounded-2xl space-y-3 font-sans">
        <h3 className="font-mono font-bold text-sm text-white flex items-center gap-2">
          <Award className="w-4 h-4 text-[#79b473]" /> YOUR NEXT STEPS
        </h3>

        <div className="space-y-2 font-mono text-xs">
          <div className="bg-[#18121e] p-3 rounded-xl border border-[#3d2e49] flex items-center justify-between">
            <span>1. Verify your informal skill with district assessor</span>
            <span className="text-[#79b473] font-bold">COMPLETED ✓</span>
          </div>

          <div className="bg-[#18121e] p-3 rounded-xl border border-[#3d2e49] flex items-center justify-between">
            <span>2. Apply for Recognition of Prior Learning (RPL) trade test</span>
            <span className="text-[#79b473] font-bold">IN PROGRESS ⚙</span>
          </div>

          <div className="bg-[#18121e] p-3 rounded-xl border border-[#3d2e49] flex items-center justify-between">
            <span>3. Claim PM-AJAY ₹50,000 Equipment Assistance voucher</span>
            <span className="text-amber-400 font-bold">ELIGIBLE 🎯</span>
          </div>

          <div className="bg-[#18121e] p-3 rounded-xl border border-[#3d2e49] flex items-center justify-between">
            <span>4. Connect with district Panchayat Field Officer</span>
            <span className="text-slate-400">NEXT TARGET</span>
          </div>
        </div>
      </div>

    </div>
  );
}
