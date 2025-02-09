import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { LogOut, ArrowLeft, Zap, Activity, XCircle, Star, Shield } from 'lucide-react';

const LogoutPage = () => {
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      setMousePosition({ x: clientX, y: clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleLogout = () => {
    setIsAnimating(true);
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 relative overflow-hidden">
      {/* Dynamic background effects */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.15), transparent 25%)`
          }}
        ></div>
        
        {/* Large animated orbs */}
        <div className="absolute w-[800px] h-[800px] -top-40 -right-40 bg-violet-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute w-[800px] h-[800px] -bottom-40 -left-40 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        {/* Enhanced particles with glow */}
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
              <div className="absolute w-full h-full bg-white/30 blur-sm transform scale-150"></div>
            </div>
          </div>
        ))}
      </div>

      <div className={`w-full max-w-md p-6 relative transform transition-all duration-1000 
        ${isAnimating ? 'scale-95 opacity-0 translate-y-4' : 'scale-100 opacity-100 translate-y-0'}`}>
        
        <div className="relative bg-slate-800/80 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden border border-slate-700 group">
          {/* Premium gradient border */}
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-500 to-cyan-500 opacity-0 group-hover:opacity-10 transition-opacity duration-700"></div>
          
          {/* Animated gradient header */}
          <div className="h-2 bg-gradient-to-r from-violet-500 via-purple-500 to-cyan-500 relative overflow-hidden">
            <div className="absolute inset-0 w-1/2 bg-white/30 blur-sm transform -skew-x-12 animate-shine"></div>
          </div>

          {/* Logo section with layered animations */}
          <div className="flex flex-col items-center py-12 space-y-8">
            <div className="relative group/logo">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full blur-2xl opacity-50 group-hover/logo:opacity-75 transition-all duration-700"></div>
              <div className="relative p-6 bg-slate-800/90 rounded-full border border-slate-700/50 
                transform transition-all duration-500 hover:scale-110 hover:rotate-12 group-hover:border-violet-500/50">
                <LogOut className="w-16 h-16 text-violet-400 group-hover:text-violet-300 transition-colors duration-500" />
              </div>
              
              {/* Floating icons with trails */}
              <div className="absolute -inset-8">
                <div className="absolute w-full h-full animate-spin-slow">
                  <Shield className="absolute top-0 left-1/2 -translate-x-1/2 text-violet-400/70" size={20} />
                  <Star className="absolute bottom-0 left-1/2 -translate-x-1/2 text-cyan-400/70" size={20} />
                  <Activity className="absolute left-0 top-1/2 -translate-y-1/2 text-purple-400/70" size={20} />
                  <Zap className="absolute right-0 top-1/2 -translate-y-1/2 text-indigo-400/70" size={20} />
                </div>
              </div>
            </div>

            <div className="text-center space-y-3 relative">
              <h2 className="text-4xl font-bold text-white tracking-tight group-hover:scale-105 transition-all duration-500">
                See You Soon!
              </h2>
              <p className="text-slate-400 transform transition-all duration-500 group-hover:text-slate-300">
                Are you sure you want to logout?
              </p>
            </div>
          </div>

          {/* Enhanced buttons with better hover effects */}
          <div className="p-8 space-y-6">
            <div className="flex gap-4">
              <button
                onClick={() => navigate(-1)}
                className="flex-1 py-4 px-6 rounded-xl font-semibold text-slate-300
                  bg-slate-800/50 backdrop-blur-sm border-2 border-slate-700
                  hover:border-violet-500/50 hover:text-violet-400 hover:bg-slate-800/80
                  transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]
                  flex items-center justify-center gap-2 group/cancel relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-transparent opacity-0 group-hover/cancel:opacity-100 transition-opacity duration-300"></div>
                <ArrowLeft size={18} className="group-hover/cancel:-translate-x-1 transition-transform duration-300" />
                <span>Cancel</span>
              </button>

              <button
                onClick={handleLogout}
                className="flex-1 py-4 px-6 rounded-xl font-semibold text-white
                  transition-all duration-300 bg-gradient-to-r
                  from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500
                  transform hover:scale-[1.02] active:scale-[0.98]
                  flex items-center justify-center gap-2 group/logout
                  relative overflow-hidden shadow-lg hover:shadow-violet-500/25"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/logout:translate-y-0 transition-transform duration-300"></div>
                <span className="relative flex items-center gap-2">
                  Yes, Logout
                  <XCircle size={18} className="group-hover/logout:rotate-180 transition-transform duration-500" />
                </span>
              </button>
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

export default LogoutPage;