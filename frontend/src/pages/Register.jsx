import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('student');
  const [name, setName] = useState('Arjun Mehta');
  const [identifier, setIdentifier] = useState('arjun@karman.gov.in');
  const [password, setPassword] = useState('password123');
  const [confirmPassword, setConfirmPassword] = useState('password123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_type: userType,
          name: name,
          identifier: identifier,
          password: password
        })
      });

      const profilePayload = {
        user_id: identifier,
        full_name: name,
        phone_number: "",
        education_level: userType === 'student' ? "Undergraduate / Graduate" : "10th Pass / Informal Worker",
        district: "General",
        target_trade: userType === 'student' ? "AI / ML Engineer" : "Tailoring & Sewing",
        years_experience: userType === 'student' ? 1.0 : 3.0,
        current_status: userType === 'student' ? "Student" : "Informal Worker"
      };

      // Day 1: Centralize profile in MongoDB Atlas
      try {
        await fetch('/api/profile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(profilePayload)
        });
      } catch (profileErr) {
        console.warn('Profile sync fallback:', profileErr);
      }

      localStorage.setItem('karman_user_id', identifier);
      localStorage.setItem('karman_user', JSON.stringify({
        name: name,
        identifier: identifier,
        role: userType
      }));

      if (res.ok) {
        const data = await res.json();
        navigate(data.redirect_url || '/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      console.warn('Backend register unavailable, redirecting to dashboard:', err);
      localStorage.setItem('karman_user_id', identifier);
      localStorage.setItem('karman_user', JSON.stringify({
        name: name,
        identifier: identifier,
        role: userType
      }));
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialRegister = () => {
    navigate('/dashboard');
  };

  return (
    <div className="h-screen max-h-screen w-full flex bg-[#FBF8F1] font-sans selection:bg-[#F4C542]/30 overflow-hidden">
      {/* Left Column: Artistic Rural Education Landscape (Responsive Landscape) */}
      <div 
        className="hidden md:block md:w-1/2 h-full bg-cover bg-center relative shadow-inner flex-shrink-0"
        style={{ backgroundImage: "url('/images/login_art.png')" }}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
        <div className="absolute bottom-5 left-5 right-5 bg-[#162035]/85 backdrop-blur-md border border-[#F4C542]/35 rounded-xl p-3.5 text-white shadow-xl">
          <h3 className="font-serif text-[#F4C542] text-sm sm:text-base font-bold mb-0.5">Project KARMAN</h3>
          <p className="text-[11px] text-slate-200 leading-snug">
            AI-driven career roadmaps for students &amp; voice-first skill discovery for rural artisans across India.
          </p>
        </div>
      </div>

      {/* Right Column: Clean White Auth Panel (Fitted to Laptop Screen) */}
      <div className="w-full md:w-1/2 h-full flex flex-col justify-center items-center px-6 py-4 sm:px-10 bg-white overflow-y-auto">
        <div className="w-full max-w-[360px] flex flex-col items-center my-auto">
          
          {/* Official Project KARMAN Logo */}
          <div className="mb-1.5">
            <Link to="/" title="Project KARMAN Home">
              <img 
                src="/images/karman_logo_clean.png" 
                alt="Project KARMAN" 
                className="h-9 sm:h-11 w-auto object-contain mx-auto drop-shadow-sm hover:scale-105 transition-transform" 
              />
            </Link>
          </div>

          <h1 className="text-lg sm:text-xl font-bold text-[#162035] font-serif text-center mb-2 tracking-tight">
            Create your account
          </h1>

          {/* Social Buttons (Compact 2x2 Grid for Landscape Fitting) */}
          <div className="w-full grid grid-cols-2 gap-1.5 mb-2">
            {/* Google */}
            <button
              type="button"
              onClick={handleSocialRegister}
              className="h-8 sm:h-9 rounded-full bg-[#F7F5EE] hover:bg-[#EFEADF] border border-[#E9E4D8] text-[#162035] text-xs font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-[0.99]"
            >
              <svg width="14" height="14" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.7-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.8z"/>
                <path fill="#34A853" d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.9-3c-1.1.7-2.4 1.1-4 1.1-3.1 0-5.7-2.1-6.6-4.9H1.4v3.1C3.4 21.3 7.4 24 12 24z"/>
                <path fill="#FBBC05" d="M5.4 14.3c-.2-.7-.4-1.5-.4-2.3s.1-1.6.4-2.3V6.6H1.4C.5 8.3 0 10.1 0 12s.5 3.7 1.4 5.4z"/>
                <path fill="#EA4335" d="M12 4.8c1.7 0 3.3.6 4.5 1.7l3.4-3.4C17.9 1.2 15.2 0 12 0 7.4 0 3.4 2.7 1.4 6.6l4 3.1c.9-2.8 3.5-4.9 6.6-4.9z"/>
              </svg>
              <span>Google</span>
            </button>

            {/* Microsoft */}
            <button
              type="button"
              onClick={handleSocialRegister}
              className="h-8 sm:h-9 rounded-full bg-[#F7F5EE] hover:bg-[#EFEADF] border border-[#E9E4D8] text-[#162035] text-xs font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-[0.99]"
            >
              <svg width="13" height="13" viewBox="0 0 21 21">
                <rect x="1" y="1" width="9" height="9" fill="#F25022"/>
                <rect x="11" y="1" width="9" height="9" fill="#7FBA00"/>
                <rect x="1" y="11" width="9" height="9" fill="#00A4EF"/>
                <rect x="11" y="11" width="9" height="9" fill="#FFB900"/>
              </svg>
              <span>Microsoft</span>
            </button>

            {/* Apple */}
            <button
              type="button"
              onClick={handleSocialRegister}
              className="h-8 sm:h-9 rounded-full bg-[#F7F5EE] hover:bg-[#EFEADF] border border-[#E9E4D8] text-[#162035] text-xs font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-[0.99]"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#000000">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-1.99.6-2.64 1.35-.57.65-1.07 1.71-.94 2.73 1.01.08 2.04-.48 2.66-1.23z"/>
              </svg>
              <span>Apple</span>
            </button>

            {/* Phone */}
            <button
              type="button"
              onClick={() => { setUserType('worker'); setIdentifier('919876543210'); }}
              className="h-8 sm:h-9 rounded-full bg-[#F7F5EE] hover:bg-[#EFEADF] border border-[#E9E4D8] text-[#162035] text-xs font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-[0.99]"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#162035" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span>Phone</span>
            </button>
          </div>

          {/* Divider */}
          <div className="w-full flex items-center my-1.5 text-[#8A94A6] text-[10px] font-bold tracking-widest">
            <div className="flex-1 h-px bg-[#E5E0D5]" />
            <span className="px-2">OR</span>
            <div className="flex-1 h-px bg-[#E5E0D5]" />
          </div>

          {/* Form */}
          <form onSubmit={handleRegister} className="w-full space-y-1.5">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              className="w-full h-8 sm:h-9 rounded-full border border-[#E5E0D5] px-3.5 text-xs sm:text-sm text-[#162035] placeholder:text-zinc-400 focus:outline-none focus:border-[#162035] focus:ring-2 focus:ring-[#F4C542]/30 transition-all"
              required
            />

            <input
              type="email"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="e.g., name@company.com"
              className="w-full h-8 sm:h-9 rounded-full border border-[#E5E0D5] px-3.5 text-xs sm:text-sm text-[#162035] placeholder:text-zinc-400 focus:outline-none focus:border-[#162035] focus:ring-2 focus:ring-[#F4C542]/30 transition-all"
              required
            />

            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="w-full h-8 sm:h-9 rounded-full border border-[#E5E0D5] px-3.5 text-xs sm:text-sm text-[#162035] bg-white focus:outline-none focus:border-[#162035] focus:ring-2 focus:ring-[#F4C542]/30 transition-all cursor-pointer"
            >
              <option value="student">Student (Career &amp; Project Lab)</option>
              <option value="worker">Worker / Beneficiary (RPL &amp; Grants)</option>
              <option value="officer">Field Officer / Admin</option>
            </select>

            {/* Password and Confirm in a 2-Column Row for Laptop Landscape */}
            <div className="grid grid-cols-2 gap-1.5">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password (min 8)"
                className="w-full h-8 sm:h-9 rounded-full border border-[#E5E0D5] px-3.5 text-xs text-[#162035] placeholder:text-zinc-400 focus:outline-none focus:border-[#162035] focus:ring-2 focus:ring-[#F4C542]/30 transition-all"
                required
                minLength={8}
              />

              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                className="w-full h-8 sm:h-9 rounded-full border border-[#E5E0D5] px-3.5 text-xs text-[#162035] placeholder:text-zinc-400 focus:outline-none focus:border-[#162035] focus:ring-2 focus:ring-[#F4C542]/30 transition-all"
                required
                minLength={8}
              />
            </div>

            {error && (
              <p className="text-[11px] text-red-600 px-2 py-0.5">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-8 sm:h-9 rounded-full bg-[#162035] hover:bg-[#233250] text-white text-xs sm:text-sm font-bold transition-all hover:-translate-y-0.5 active:scale-[0.99] disabled:opacity-50 mt-1 shadow-md shadow-[#162035]/20 flex items-center justify-center gap-1"
            >
              {loading ? 'Creating...' : 'Create Account →'}
            </button>
          </form>

          {/* Bottom Footer Links */}
          <p className="mt-2.5 text-xs text-[#4B5563] text-center">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-[#162035] underline hover:text-black ml-1">
              Log in
            </Link>
          </p>

          <Link to="/" className="mt-1 text-[11px] text-[#8A94A6] hover:text-[#162035] transition-colors">
            ← Back to home
          </Link>

        </div>
      </div>
    </div>
  );
}
