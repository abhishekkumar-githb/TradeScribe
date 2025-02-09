import { useState, useEffect } from "react";
import { BsPeopleFill } from "react-icons/bs";
import TableWithActions from "../../components/TableComponent/TableWithActions";
import { userConfig } from "./userConfig";

const UsersPage = () => {
  const { title, buttonTitle, tableHeader, tableData } = userConfig;
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      {/* Dynamic Background Effects */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.15), transparent 25%)`
          }}
        />
        <div className="absolute w-[800px] h-[800px] -top-40 -right-40 bg-violet-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute w-[800px] h-[800px] -bottom-40 -left-40 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 relative">
        {/* Header Section */}
        <div className="mb-8">
          <div className="relative bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-slate-700 group">
            <div className="h-2 bg-gradient-to-r from-violet-500 via-purple-500 to-cyan-500" />
            <div className="p-6 flex items-center gap-4">
              <div className="relative p-3 bg-slate-800/90 rounded-full border border-slate-700/50 transform transition-all duration-500 hover:scale-110 hover:rotate-12">
                <BsPeopleFill className="w-6 h-6 text-violet-400" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                Users
              </h1>
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="relative bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-slate-700 overflow-hidden">
          <TableWithActions
            title={title}
            buttonTitle={buttonTitle}
            tableHeader={tableHeader}
            tableData={tableData}
            className="text-slate-300"
          />
          <div className="h-[2px] bg-gradient-to-r from-violet-500 via-cyan-400 to-violet-500" />
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
