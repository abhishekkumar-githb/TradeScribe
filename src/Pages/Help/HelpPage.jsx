import React, { useState, useEffect } from 'react';
import { FaHandsHelping } from "react-icons/fa";
import { Mail, Phone, Sparkles, Shield, Star, Activity } from 'lucide-react';

const HelpPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      setMousePosition({ x: clientX, y: clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      {/* Dynamic background effects */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.15), transparent 25%)`
          }}
        />
        
        {/* Large animated orbs */}
        <div className="absolute w-[800px] h-[800px] -top-40 -right-40 bg-violet-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute w-[800px] h-[800px] -bottom-40 -left-40 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        
        {/* Floating particles */}
        {[...Array(25)].map((_, i) => (
          <div key={i} className="relative">
            <div
              className="absolute bg-white rounded-full animate-float"
              style={{
                width: Math.random() * 4 + 'px',
                height: Math.random() * 4 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 4 + 3}s`,
                opacity: Math.random() * 0.6,
                filter: 'blur(1px)'
              }}
            >
              <div className="absolute w-full h-full bg-white/30 blur-sm transform scale-150" />
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 relative">
        {/* Header Section */}
        <div className="mb-8">
          <div className="relative bg-slate-800/80 backdrop-blur-xl rounded-3xl overflow-hidden border border-slate-700 group">
            <div className="h-2 bg-gradient-to-r from-violet-500 via-purple-500 to-cyan-500 relative overflow-hidden">
              <div className="absolute inset-0 w-1/2 bg-white/30 blur-sm transform -skew-x-12 animate-shine" />
            </div>
            <div className="p-6 flex items-center gap-4">
              <div className="relative group/logo">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full blur-2xl opacity-50 group-hover/logo:opacity-75 transition-all duration-700" />
                <div className="relative p-3 bg-slate-800/90 rounded-full border border-slate-700/50 
                  transform transition-all duration-500 hover:scale-110 hover:rotate-12">
                  <FaHandsHelping className="w-6 h-6 text-violet-400" />
                </div>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                Help Center
              </h1>
            </div>
          </div>
        </div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Email Card */}
          <div className="relative bg-slate-800/80 backdrop-blur-xl rounded-3xl overflow-hidden border border-slate-700 group">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-500 to-cyan-500 opacity-0 group-hover:opacity-10 transition-opacity duration-700" />
            <div className="p-8">
              <div className="relative group/icon mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full blur-2xl opacity-50 group-hover/icon:opacity-75 transition-all duration-700" />
                <div className="relative p-4 bg-slate-800/90 rounded-full border border-slate-700/50 w-fit
                  transform transition-all duration-500 hover:scale-110 group-hover:border-violet-500/50">
                  <Mail className="w-8 h-8 text-violet-400" />
                </div>
                {/* Floating icons */}
                <div className="absolute -inset-4">
                  <div className="absolute w-full h-full animate-spin-slow">
                    <Shield className="absolute top-0 left-1/2 -translate-x-1/2 text-violet-400/70" size={16} />
                    <Star className="absolute bottom-0 left-1/2 -translate-x-1/2 text-cyan-400/70" size={16} />
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Email Support</h3>
              <a href="mailto:support@gmail.com" 
                className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300">
                support@gmail.com
              </a>
            </div>
          </div>

          {/* Phone Card */}
          <div className="relative bg-slate-800/80 backdrop-blur-xl rounded-3xl overflow-hidden border border-slate-700 group">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-500 to-cyan-500 opacity-0 group-hover:opacity-10 transition-opacity duration-700" />
            <div className="p-8">
              <div className="relative group/icon mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full blur-2xl opacity-50 group-hover/icon:opacity-75 transition-all duration-700" />
                <div className="relative p-4 bg-slate-800/90 rounded-full border border-slate-700/50 w-fit
                  transform transition-all duration-500 hover:scale-110 group-hover:border-violet-500/50">
                  <Phone className="w-8 h-8 text-violet-400" />
                </div>
                {/* Floating icons */}
                <div className="absolute -inset-4">
                  <div className="absolute w-full h-full animate-spin-slow">
                    <Activity className="absolute left-0 top-1/2 -translate-y-1/2 text-purple-400/70" size={16} />
                    <Sparkles className="absolute right-0 top-1/2 -translate-y-1/2 text-indigo-400/70" size={16} />
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Phone Support</h3>
              <a href="tel:+918523697412" 
                className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300">
                +91 8523697412
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add required keyframes
const style = document.createElement('style');
style.textContent = `
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
  }
  @keyframes shine {
    from { transform: translateX(-100%) skewX(-12deg); }
    to { transform: translateX(200%) skewX(-12deg); }
  }
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);

export default HelpPage;