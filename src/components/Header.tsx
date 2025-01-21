import React, { useState } from 'react';
import { Home, Users, PlaySquare, ShoppingBag, Bell, MessageCircle, Menu, Search, X } from 'lucide-react';

export const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [notifications] = useState([
    { id: 1, text: 'Sarah liked your post', time: '2m ago' },
    { id: 2, text: 'New friend request from Mike', time: '15m ago' },
    { id: 3, text: 'Your post was shared by John', time: '1h ago' },
  ]);

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-14 px-4">
        {/* Left */}
        <div className="flex items-center gap-2">
          <h1 className="text-blue-600 text-3xl font-bold">facebook</h1>
          <div className={`ml-2 relative ${showSearch ? 'flex-1 md:flex-none' : ''}`}>
            <div className="relative">
              <input
                type="text"
                placeholder="Search Facebook"
                className="bg-gray-100 rounded-full py-2 pl-10 pr-4 w-60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                onFocus={() => setShowSearch(true)}
                onBlur={() => setShowSearch(false)}
              />
              <Search className="absolute left-3 top-2.5 text-gray-500 w-5 h-5" />
              {showSearch && (
                <button 
                  className="absolute right-3 top-2.5 text-gray-500 hover:bg-gray-200 rounded-full p-1"
                  onClick={() => setShowSearch(false)}
                >
                  <X size={16} />
                </button>
              )}
            </div>
            {/* Search Dropdown */}
            {showSearch && (
              <div className="absolute top-full left-0 right-0 bg-white mt-1 rounded-lg shadow-lg p-2 border">
                <div className="text-sm text-gray-500 px-3 py-2">Recent searches</div>
                <div className="hover:bg-gray-100 p-2 rounded-lg cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <div className="bg-gray-200 p-2 rounded-full">
                      <Search size={16} />
                    </div>
                    <span>React Developers Group</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Center */}
        <div className="hidden md:flex items-center gap-1">
          <NavButton icon={Home} isActive />
          <NavButton icon={Users} />
          <NavButton icon={PlaySquare} />
          <NavButton icon={ShoppingBag} />
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          <IconButton icon={Menu} className="md:hidden" />
          <div className="relative group">
            <IconButton icon={MessageCircle} />
            <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg w-80 hidden group-hover:block">
              <div className="p-4 border-b">
                <h3 className="font-semibold text-xl">Chats</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {/* Chat previews would go here */}
                <div className="p-2 hover:bg-gray-100 cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <img
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
                      alt="Profile"
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-semibold">Sarah Johnson</p>
                      <p className="text-sm text-gray-500">You: Hey! How are you? • 2h</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative group">
            <IconButton icon={Bell} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
            <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg w-80 hidden group-hover:block">
              <div className="p-4 border-b">
                <h3 className="font-semibold text-xl">Notifications</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map(notification => (
                  <div key={notification.id} className="p-3 hover:bg-gray-100 cursor-pointer">
                    <p className="font-medium">{notification.text}</p>
                    <p className="text-sm text-gray-500">{notification.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="relative group">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
              alt="Profile"
              className="w-9 h-9 rounded-full cursor-pointer hover:opacity-90"
            />
            <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg w-64 hidden group-hover:block">
              <div className="p-2">
                <div className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <img
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
                      alt="Profile"
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-semibold">John Doe</p>
                      <p className="text-sm text-gray-500">See your profile</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-t">
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-blue-600">
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

const NavButton = ({ icon: Icon, isActive }: { icon: any; isActive?: boolean }) => (
  <button
    className={`p-2 rounded-lg hover:bg-gray-100 relative ${
      isActive ? 'text-blue-600' : 'text-gray-600'
    }`}
  >
    <Icon size={24} />
    {isActive && (
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
    )}
  </button>
);

const IconButton = ({ icon: Icon, className = '' }: { icon: any; className?: string }) => (
  <button className={`w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 ${className}`}>
    <Icon size={20} className="text-gray-600" />
  </button>
);