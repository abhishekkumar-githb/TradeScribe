import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Mail, Send, ArrowLeft, Sparkles, Zap, CheckCircle2, Activity } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [stage, setStage] = useState('email');
  const [isAnimating, setIsAnimating] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (email.length > 0) {
      setIsTyping(true);
      const timeout = setTimeout(() => setIsTyping(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [email]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length <= 5) {
      setOtp(value);
    }
  };

  const handleSendOTP = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      setStage('otp');
      toast.success('OTP sent successfully!');
    }, 1500);
  };

  const handleLogin = () => {
    if (otp === '00000') {
      setIsAnimating(true);
      setTimeout(() => {
        toast.success('Login Successful!');
        navigate('/dashboard');
      }, 1000);
    } else {
      toast.error('Incorrect OTP. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/10 to-slate-900"></div>
      
      <div className={`w-full max-w-md relative ${isAnimating ? 'animate-pulse' : ''}`}>
        {/* Card */}
        <div className="relative bg-slate-800/80 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden border border-slate-700">
          {/* Header gradient */}
          <div className="h-1.5 bg-gradient-to-r from-violet-500 via-purple-500 to-cyan-500"></div>

          {/* Logo section */}
          <div className="flex flex-col items-center py-8 space-y-4">
            <h1 className={`text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400 
              transition-transform duration-300 ${isTyping ? 'scale-105' : 'scale-100'}`}>
              Tradescribe
            </h1>
            <div className="flex items-center gap-3">
              <Sparkles className="text-violet-400 animate-pulse" size={24} />
              <Activity className="text-cyan-400 animate-bounce" size={24} />
              <Zap className="text-indigo-400 animate-pulse" size={24} />
            </div>
          </div>

          <div className="p-8">
            {stage === 'email' ? (
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-bold text-white tracking-tight">
                    Welcome Back
                  </h2>
                  <p className="text-slate-400">Enter your email to continue</p>
                </div>

                {/* Email input */}
                <div className="relative group">
                  <div className={`absolute inset-0 rounded-2xl transition-opacity duration-300 
                    bg-gradient-to-r from-violet-500/20 to-cyan-500/20 blur-xl
                    ${isTyping ? 'opacity-100' : 'opacity-0'}`}>
                  </div>
                  <div className="relative">
                    <span className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300
                      ${isTyping ? 'text-violet-400' : 'text-slate-400'}`}>
                      <Mail size={20} className={isTyping ? 'animate-bounce' : ''} />
                    </span>
                    <input
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                      className={`w-full pl-12 pr-4 py-4 bg-slate-900/50 rounded-xl
                        border-2 transition-all duration-300 outline-none
                        text-slate-100 placeholder-slate-500
                        ${isTyping ? 'border-violet-500 shadow-lg shadow-violet-500/20' : 'border-slate-700'}
                        focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20`}
                      placeholder="Enter your email address"
                    />
                    {/* Typing indicator */}
                    {isTyping && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex space-x-1">
                        <div className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce delay-100"></div>
                        <div className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce delay-200"></div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit button */}
                <button
                  onClick={handleSendOTP}
                  className={`w-full py-4 rounded-xl font-semibold text-white
                    transition-all duration-300 bg-gradient-to-r
                    from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500
                    transform hover:scale-[1.02] active:scale-[0.98]
                    flex items-center justify-center gap-2
                    ${isTyping ? 'shadow-lg shadow-violet-500/20' : ''}`}
                >
                  Send OTP
                  <Send size={18} className={isTyping ? 'animate-ping' : 'animate-bounce'} />
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-bold text-white tracking-tight">
                    Verify OTP
                  </h2>
                  <p className="text-slate-400">Enter the 5-digit code sent to {email}</p>
                </div>

                {/* OTP input */}
                <input
                  type="text"
                  value={otp}
                  onChange={handleOtpChange}
                  maxLength={5}
                  className="w-full text-center text-3xl tracking-[0.5em] py-4 
                    bg-slate-900/50 rounded-xl border-2 border-slate-700
                    focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20
                    transition-all duration-300 text-slate-100 placeholder-slate-600"
                  placeholder="_ _ _ _ _"
                />

                {/* Action buttons */}
                <div className="flex justify-between text-sm">
                  <button 
                    onClick={() => setStage('email')}
                    className="text-violet-400 hover:text-violet-300 flex items-center gap-1 
                      transition-all duration-300 hover:scale-105"
                  >
                    <ArrowLeft size={16} /> Change Email
                  </button>
                  <button 
                    onClick={handleSendOTP}
                    className="text-violet-400 hover:text-violet-300 
                      transition-all duration-300 hover:scale-105"
                  >
                    Resend OTP
                  </button>
                </div>

                {/* Verify button */}
                <button
                  onClick={handleLogin}
                  className="w-full py-4 rounded-xl font-semibold text-white
                    transition-all duration-300 bg-gradient-to-r
                    from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500
                    transform hover:scale-[1.02] active:scale-[0.98]
                    flex items-center justify-center gap-2"
                >
                  Verify & Login
                  <CheckCircle2 size={18} className="animate-spin" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;