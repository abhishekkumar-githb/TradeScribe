import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ title, IconComponent }) => {
  return (
    <div className="relative">
      <div className="relative bg-slate-800/80 backdrop-blur-xl rounded-lg overflow-hidden border border-slate-700/50">
        <div className="flex items-center gap-4 p-6">
          {IconComponent && (
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-lg blur-xl opacity-25 group-hover:opacity-40 transition-opacity duration-500" />
              <div className="relative bg-slate-800/90 p-3 rounded-lg border border-slate-700/50 transform transition-all duration-300 group-hover:border-violet-500/50">
                <IconComponent className="w-6 h-6 md:w-7 md:h-7 text-violet-400 group-hover:text-violet-300 transition-colors duration-300" />
              </div>
            </div>
          )}
          
          <h1 className="font-semibold text-lg md:text-xl bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
            {title}
          </h1>
        </div>

        <div className="h-[2px] bg-gradient-to-r from-violet-500 via-purple-500 to-cyan-500 relative overflow-hidden">
          <div className="absolute inset-0 w-1/2 bg-white/30 blur-sm transform -skew-x-12 animate-shine" />
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  IconComponent: PropTypes.elementType.isRequired,
};

// Add required keyframes
const style = document.createElement('style');
style.textContent = `
  @keyframes shine {
    from { transform: translateX(-100%) skewX(-12deg); }
    to { transform: translateX(200%) skewX(-12deg); }
  }
`;
document.head.appendChild(style);

export default Header;