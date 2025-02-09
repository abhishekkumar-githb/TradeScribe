import { useState, useEffect } from 'react';
import { Users, UserPlus, UserCheck, Activity, TrendingUp, Clock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const HomePage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Sample data for the chart
  const userData = [
    { name: 'Jan', users: 4000 },
    { name: 'Feb', users: 5500 },
    { name: 'Mar', users: 4800 },
    { name: 'Apr', users: 6000 },
    { name: 'May', users: 7000 },
    { name: 'Jun', users: 8200 },
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const stats = [
    {
      title: "Total Users",
      value: "24,850",
      icon: <Users className="w-6 h-6 text-violet-400" />,
      trend: "+12.5%",
      color: "from-violet-600 to-purple-600"
    },
    {
      title: "Active Users",
      value: "18,285",
      icon: <UserCheck className="w-6 h-6 text-cyan-400" />,
      trend: "+8.2%",
      color: "from-cyan-600 to-blue-600"
    },
    {
      title: "New Users",
      value: "2,420",
      icon: <UserPlus className="w-6 h-6 text-indigo-400" />,
      trend: "+15.7%",
      color: "from-indigo-600 to-violet-600"
    },
    {
      title: "User Growth",
      value: "85.4%",
      icon: <TrendingUp className="w-6 h-6 text-purple-400" />,
      trend: "+5.3%",
      color: "from-purple-600 to-pink-600"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 p-6 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.15), transparent 25%)`
          }}
        ></div>
        
        {/* Animated orbs */}
        <div className="absolute w-[800px] h-[800px] -top-40 -right-40 bg-violet-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute w-[800px] h-[800px] -bottom-40 -left-40 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">User Analytics</h1>
          <p className="text-slate-400">Real-time user statistics and growth metrics</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
              <div className="relative bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-slate-700 p-6 transition-transform duration-300 hover:scale-[1.02]">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-slate-800/90 rounded-xl border border-slate-700/50">
                    {stat.icon}
                  </div>
                  <span className="text-green-400 text-sm font-medium">{stat.trend}</span>
                </div>
                <h3 className="text-slate-400 text-sm mb-1">{stat.title}</h3>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r rounded-b-2xl opacity-50 ${stat.color}"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Chart Section */}
        <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-slate-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">User Growth Trend</h2>
            <div className="flex gap-2">
              <Activity className="text-violet-400 w-5 h-5" />
              <Clock className="text-cyan-400 w-5 h-5" />
            </div>
          </div>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={userData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b',
                    border: '1px solid #475569',
                    borderRadius: '0.5rem'
                  }}
                  labelStyle={{ color: '#e2e8f0' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="users" 
                  stroke="url(#colorGradient)" 
                  strokeWidth={3}
                  dot={{ fill: '#8b5cf6', strokeWidth: 2 }}
                  activeDot={{ r: 8, fill: '#8b5cf6' }}
                />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;