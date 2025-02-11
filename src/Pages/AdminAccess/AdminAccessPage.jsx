import { useState, useEffect } from 'react';
import { adminAccessConfig } from "./adminAccessConfig";
import TableWithActions from "../../components/TableComponent/TableWithActions";

const AdminAccessPage = () => {
  const { title, buttonTitle, tableHeader, tableData } = adminAccessConfig;
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const modifiedTableData = tableData.map((row) => {
    const currentTime = new Date();
    const lastTradeTime = new Date(row[6]);
    const status = currentTime - lastTradeTime < 86400000 ? 'Active' : 'Inactive';
    return [...row, status];
  });

  const modifiedTableHeader = [...tableHeader, "Status"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.08), transparent 35%)`
          }}
        />
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse delay-700" />
      </div>

      <div className="container mx-auto px-4 py-8 relative">
        {/* Header Section */}
        <div className="mb-8 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-xl shadow-xl overflow-hidden">
          <div className="relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
            <div className="flex items-center gap-4 p-6 pt-8">
              <div className="relative p-3 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700/50 shadow-lg transform transition-all duration-300 hover:scale-105 hover:rotate-6 group">
                <svg 
                  className="w-6 h-6 text-indigo-400 group-hover:text-indigo-300 transition-colors"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01" 
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-purple-100 to-indigo-200 bg-clip-text text-transparent">
                Admin Access Control
              </h1>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-xl shadow-xl overflow-hidden">
          <div className="p-0">
            <TableWithActions
              title={title}
              buttonTitle={buttonTitle}
              tableHeader={modifiedTableHeader}
              tableData={modifiedTableData}
              className="text-slate-200"
            />
            <div className="h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAccessPage;