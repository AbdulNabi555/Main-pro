import React from 'react';
import { Users, Bookmark, Clock, Flag, ChevronDown, Group as UserGroup, ShoppingBag, PlaySquare, Calendar, Star } from 'lucide-react';

export const Sidebar = () => {
  const mainLinks = [
    { icon: <img
        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
        alt="Profile"
        className="w-8 h-8 rounded-full"
      />, 
      text: "John Doe",
      notification: null
    },
    { icon: <Users className="w-8 h-8 text-blue-500" />, text: "Friends", notification: 3 },
    { icon: <UserGroup className="w-8 h-8 text-blue-500" />, text: "Groups", notification: null },
    { icon: <ShoppingBag className="w-8 h-8 text-blue-500" />, text: "Marketplace", notification: null },
    { icon: <PlaySquare className="w-8 h-8 text-blue-500" />, text: "Watch", notification: 1 },
    { icon: <Clock className="w-8 h-8 text-blue-500" />, text: "Memories", notification: null },
    { icon: <Bookmark className="w-8 h-8 text-purple-500" />, text: "Saved", notification: null },
    { icon: <Flag className="w-8 h-8 text-orange-500" />, text: "Pages", notification: null },
    { icon: <Calendar className="w-8 h-8 text-red-500" />, text: "Events", notification: null },
    { icon: <Star className="w-8 h-8 text-yellow-500" />, text: "Favorites", notification: null },
  ];

  const shortcuts = [
    { name: "React Developers", image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=100&h=100&fit=crop" },
    { name: "UI/UX Community", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=100&h=100&fit=crop" },
    { name: "Tech News", image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=100&h=100&fit=crop" },
  ];

  return (
    <div className="w-[300px] fixed left-0 top-14 h-[calc(100vh-3.5rem)] p-4 overflow-y-auto">
      <div className="space-y-1">
        {mainLinks.map((link, index) => (
          <SidebarItem
            key={index}
            icon={link.icon}
            text={link.text}
            notification={link.notification}
          />
        ))}
        <button className="flex items-center space-x-2 w-full p-2 rounded-lg hover:bg-gray-100">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <ChevronDown className="w-5 h-5 text-gray-600" />
          </div>
          <span className="text-sm font-medium">See more</span>
        </button>

        <div className="border-t my-4" />

        <div className="mb-2">
          <h3 className="text-gray-500 font-semibold px-2">Your shortcuts</h3>
        </div>

        {shortcuts.map((shortcut, index) => (
          <button key={index} className="flex items-center space-x-2 w-full p-2 rounded-lg hover:bg-gray-100">
            <img src={shortcut.image} alt={shortcut.name} className="w-8 h-8 rounded-lg" />
            <span className="text-sm font-medium">{shortcut.name}</span>
          </button>
        ))}
      </div>

      <div className="mt-4 px-2 text-xs text-gray-500">
        <p className="hover:underline cursor-pointer">Privacy</p>
        <p className="hover:underline cursor-pointer mt-1">Terms</p>
        <p className="hover:underline cursor-pointer mt-1">Advertising</p>
        <p className="mt-2">Facebook © 2024</p>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, text, notification }: { icon: React.ReactNode; text: string; notification?: number | null }) => (
  <button className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-gray-100 group">
    <div className="flex items-center space-x-2">
      {icon}
      <span className="text-sm font-medium">{text}</span>
    </div>
    {notification && (
      <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
        {notification}
      </span>
    )}
  </button>
);