import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal, Image, Smile, MapPin, UserPlus } from 'lucide-react';

export const Feed = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
      time: '2h',
      content: 'Just had an amazing day at the beach! 🌊',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=800&fit=crop',
      likes: 324,
      comments: 42,
      shares: 12,
      isLiked: false,
    },
    {
      id: 2,
      author: 'Jane Smith',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      time: '5h',
      content: 'Just finished my new painting! What do you think? 🎨',
      image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1200&h=800&fit=crop',
      likes: 892,
      comments: 156,
      shares: 45,
      isLiked: true,
    },
  ]);

  const [showComments, setShowComments] = useState<number | null>(null);

  const toggleLike = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked,
        };
      }
      return post;
    }));
  };

  return (
    <div className="max-w-[680px] mx-auto pt-20 pb-8 px-4">
      {/* Stories */}
      <div className="mb-4 flex space-x-2 overflow-x-auto pb-2">
        <div className="flex-shrink-0 w-32 h-48 rounded-xl relative overflow-hidden group cursor-pointer">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=300&fit=crop"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-2 left-2 right-2 text-white">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mb-2">
              <UserPlus size={16} />
            </div>
            <p className="text-sm font-medium">Create Story</p>
          </div>
        </div>
        {[1, 2, 3, 4].map((story) => (
          <div key={story} className="flex-shrink-0 w-32 h-48 rounded-xl relative overflow-hidden group cursor-pointer">
            <img
              src={`https://images.unsplash.com/photo-${1494790108377 + story}?w=200&h=300&fit=crop`}
              alt=""
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute top-2 left-2">
              <div className="w-8 h-8 rounded-full border-4 border-blue-500 overflow-hidden">
                <img
                  src={`https://images.unsplash.com/photo-${1535713875002 + story}?w=50&h=50&fit=crop`}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <p className="absolute bottom-2 left-2 right-2 text-white text-sm font-medium">
              User Story {story}
            </p>
          </div>
        ))}
      </div>

      {/* Create Post */}
      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <div className="flex space-x-4 mb-3">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
          <input
            type="text"
            placeholder="What's on your mind?"
            className="bg-gray-100 rounded-full px-4 py-2 flex-1 hover:bg-gray-200 cursor-pointer"
            readOnly
          />
        </div>
        <div className="flex border-t pt-3">
          <button className="flex-1 flex items-center justify-center space-x-2 hover:bg-gray-100 py-2 rounded-lg">
            <Image className="text-red-500" size={20} />
            <span className="font-medium text-gray-600">Photo/video</span>
          </button>
          <button className="flex-1 flex items-center justify-center space-x-2 hover:bg-gray-100 py-2 rounded-lg">
            <Smile className="text-yellow-500" size={20} />
            <span className="font-medium text-gray-600">Feeling/activity</span>
          </button>
          <button className="flex-1 flex items-center justify-center space-x-2 hover:bg-gray-100 py-2 rounded-lg">
            <MapPin className="text-green-500" size={20} />
            <span className="font-medium text-gray-600">Check in</span>
          </button>
        </div>
      </div>

      {/* Posts */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow">
            {/* Post Header */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full" />
                <div>
                  <h3 className="font-semibold hover:underline cursor-pointer">{post.author}</h3>
                  <p className="text-gray-500 text-sm">{post.time} · <span>🌍</span></p>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <MoreHorizontal className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Post Content */}
            <p className="px-4 pb-4">{post.content}</p>
            <img src={post.image} alt="" className="w-full cursor-pointer hover:opacity-95" />

            {/* Post Stats */}
            <div className="px-4 py-2 border-b">
              <div className="flex items-center justify-between text-gray-500 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="bg-blue-500 text-white rounded-full p-1">
                    <Heart size={12} fill="white" />
                  </div>
                  <span>{post.likes} likes</span>
                </div>
                <div className="space-x-4">
                  <button className="hover:underline" onClick={() => setShowComments(post.id)}>
                    {post.comments} comments
                  </button>
                  <span>{post.shares} shares</span>
                </div>
              </div>
            </div>

            {/* Post Actions */}
            <div className="px-4 py-2 flex items-center justify-between">
              <button 
                className={`flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg flex-1 ${
                  post.isLiked ? 'text-blue-500' : ''
                }`}
                onClick={() => toggleLike(post.id)}
              >
                <Heart className={post.isLiked ? 'fill-current' : ''} size={20} />
                <span>Like</span>
              </button>
              <button 
                className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg flex-1"
                onClick={() => setShowComments(post.id)}
              >
                <MessageCircle size={20} />
                <span>Comment</span>
              </button>
              <button className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg flex-1">
                <Share2 size={20} />
                <span>Share</span>
              </button>
            </div>

            {/* Comments Section */}
            {showComments === post.id && (
              <div className="px-4 py-2 border-t">
                <div className="flex space-x-2">
                  <img
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Write a comment..."
                      className="w-full bg-gray-100 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};