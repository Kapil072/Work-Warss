import React from 'react';
import { Coins, User } from 'lucide-react';

const UserProfile = () => {
  return (
    <div className="flex items-center justify-between p-4 bg-white">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center border-2 border-blue-100">
          <User className="w-6 h-6 text-gray-500" />
        </div>
        <div>
          <p className="text-gray-600 text-sm">Good Afternoon!</p>
          <h2 className="text-gray-900 text-lg font-semibold">Kapil</h2>
        </div>
      </div>
      <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 px-4 py-2 rounded-full flex items-center space-x-2 shadow-lg">
        <span className="text-white font-bold">0</span>
        <Coins className="w-4 h-4 text-white" />
      </div>
    </div>
  );
};

export default UserProfile; 