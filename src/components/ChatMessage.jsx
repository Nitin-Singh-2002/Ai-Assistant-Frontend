import React from 'react';
import { UserIcon } from '@heroicons/react/24/outline';
import BotIcon from '../assets/ChatBotIcon';

const ChatMessage = ({message, isAi}) => {
  return (
    <>
       <div className={`max-w-7xl mx-auto flex items-start space-x-4 p-6 rounded-2xl transition-colors duration-200 ${isAi ? 'bg-blue-200' : 'bg-purple-200'}`}>
      <div className={`flex-shrink-0 rounded-full p-2 ${isAi ? 'bg-blue-100' : 'bg-green-100'}`}>
        {isAi ? (
          <BotIcon width="35" height="35" fill="#6D4FC2" />
        ) : (
          <UserIcon className="h-6 w-6 text-green-500" />
        )}
      </div>
      <div className="flex-1 space-y-2">
        <div className="flex items-center">
          <p className={`font-medium ${isAi ? 'text-blue-900' : 'text-green-900'}`}>
            {isAi ? 'AI Assistant' : 'You'}
          </p>
        </div>
        <div className="prose prose-sm max-w-none">
          <p className="text-gray-700 text-base leading-relaxed whitespace-pre-wrap">
            {message}
          </p>
        </div>
      </div>
    </div>
    </>
  )
}

export default ChatMessage
