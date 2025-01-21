import React, { useState, useEffect, useRef } from 'react';
import { Send, Paperclip } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Message, User } from '../types';
import { supabase } from '../lib/supabase';

interface ChatWindowProps {
  chatId: string;
  currentUser: User;
  recipient: User;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ chatId, currentUser, recipient }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('chat_id', chatId)
        .order('created_at', { ascending: true });

      if (!error && data) {
        setMessages(data);
      }
    };

    fetchMessages();

    const subscription = supabase
      .channel(`chat:${chatId}`)
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'messages',
        filter: `chat_id=eq.${chatId}`
      }, payload => {
        setMessages(prev => [...prev, payload.new as Message]);
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [chatId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      chat_id: chatId,
      sender_id: currentUser.id,
      content: newMessage,
      created_at: new Date().toISOString(),
    };

    const { error } = await supabase.from('messages').insert([message]);

    if (!error) {
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-green-600 text-white p-4 flex items-center">
        <img
          src={recipient.avatar_url || `https://ui-avatars.com/api/?name=${recipient.full_name}`}
          alt={recipient.full_name}
          className="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <h2 className="font-semibold">{recipient.full_name}</h2>
          <p className="text-sm opacity-90">Online</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-[#e5ded8] p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex mb-4 ${
              message.sender_id === currentUser.id ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.sender_id === currentUser.id
                  ? 'bg-[#dcf8c6] ml-auto'
                  : 'bg-white'
              }`}
            >
              <p className="text-gray-800">{message.content}</p>
              <p className="text-xs text-gray-500 mt-1">
                {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={sendMessage} className="bg-gray-100 p-4 flex items-center gap-2">
        <button type="button" className="text-gray-600">
          <Paperclip size={24} />
        </button>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
          className="flex-1 rounded-full py-2 px-4 focus:outline-none focus:ring-1 focus:ring-green-500"
        />
        <button
          type="submit"
          className="bg-green-600 text-white rounded-full p-2 hover:bg-green-700"
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};