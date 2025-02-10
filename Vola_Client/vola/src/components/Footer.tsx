import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#000A22]/50 py-8 w-full">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-gray-400 w-full">
          <p>&copy; {new Date().getFullYear()} VolaAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
