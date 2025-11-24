import React from 'react';
import type { TypingUser } from '../../../types/chat.types';

interface TypingIndicatorProps {
  users: TypingUser[];
}

export const TypingIndicator: React.FC<TypingIndicatorProps> = ({ users }) => {
  if (users.length === 0) return null;

  const getUserNames = () => {
    if (users.length === 1) return users[0].userName;
    if (users.length === 2) return `${users[0].userName} và ${users[1].userName}`;
    return `${users.slice(0, -1).map((u) => u.userName).join(', ')} và ${
      users[users.length - 1].userName
    }`;
  };

  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8" />
      <div className="flex items-center gap-1">
        <div className="flex gap-1">
          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
        </div>
        <span className="text-sm text-gray-500">{getUserNames()} đang gõ...</span>
      </div>
    </div>
  );
};

