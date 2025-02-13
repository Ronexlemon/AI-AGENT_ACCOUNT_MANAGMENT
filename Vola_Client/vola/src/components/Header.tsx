"use client"
import React from 'react';
import { getPublicKey } from '@/utils/account';

interface HeaderProps {
  onPrivateKeyClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onPrivateKeyClick }) => {
  const privateKey = localStorage.getItem("authToken");
  return (
    <nav className="fixed w-full bg-[#000E30] backdrop-blur-sm z-50">
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex justify-between items-center">
        <div className="text-white text-xl font-bold">VolaAI</div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors">
          {privateKey?getPublicKey(privateKey) :" Enter Private Key"}
        </button>
      </div>
    </div>
  </nav>
  );
};

export default Header;