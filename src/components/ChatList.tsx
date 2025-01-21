import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { User } from '../types';

interface ChatListProps {
  chats: {
    id: string;
    lastMessage: string;
    timestamp: string;
    user: User;
  }[];
}

export const ChatList: React.FC<ChatListProps> = ({ chats }) => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 overflow-y-auto">
      {chats.map((chat) => (
        <div
          key={chat.id}
          className="flex items-center p-4 hover:bg-gray-50 cursor-pointer border-b"
          onClick={() => navigate(`/chat/${chat.id}`)}
        >
          <img
            src={chat.user.avatar_url || `https://ui-avatars.com/api/?name=${chat.user.full_name}`}
            alt={chat.user.full_name}
            className="w-12 h-12 rounded-full mr-4"
          />
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">{chat.user.full_name}</h3>
              <span className="text-sm text-gray-500">
                {formatDistanceToNow(new Date(chat.timestamp), { addSuffix: true })}
              </span>
            </div>
            <p className="text-gray-600 text-sm truncate">{chat.lastMessage}</p>
          </div>
        </div>
      ))}
    </div>
  );
};