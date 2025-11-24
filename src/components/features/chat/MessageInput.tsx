import React, { useState, useRef, useCallback } from 'react';
import { Send, Paperclip, Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface MessageInputProps {
  onSend: (content: string) => void;
  onTyping: () => void;
  disabled?: boolean;
  placeholder?: string;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  onSend,
  onTyping,
  disabled = false,
  placeholder = 'Nhập tin nhắn...',
}) => {
  const [message, setMessage] = useState('');
  const [isComposing, setIsComposing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;
      setMessage(value);

      // Trigger typing indicator
      if (value.length > 0 && !isComposing) {
        onTyping();
      }

      // Auto-resize textarea
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = Math.min(
          textareaRef.current.scrollHeight,
          120
        ) + 'px';
      }
    },
    [onTyping, isComposing]
  );

  const handleSend = useCallback(() => {
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  }, [message, disabled, onSend]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !isComposing) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCompositionStart = () => setIsComposing(true);
  const handleCompositionEnd = () => setIsComposing(false);

  return (
    <div className="border-t bg-white p-4 space-y-3">
      <div className="flex gap-2">
        <div className="flex-1 flex items-end gap-2">
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onCompositionStart={handleCompositionStart}
            onCompositionEnd={handleCompositionEnd}
            placeholder={placeholder}
            disabled={disabled}
            className="resize-none max-h-24 min-h-10 text-sm"
            rows={1}
          />

          <Button
            size="icon"
            variant="ghost"
            disabled={disabled}
            className="flex-shrink-0"
          >
            <Paperclip className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-end gap-1">
          <Button
            size="icon"
            variant="ghost"
            disabled={disabled}
            className="flex-shrink-0"
          >
            <Smile className="w-4 h-4" />
          </Button>

          <Button
            size="icon"
            onClick={handleSend}
            disabled={disabled || !message.trim()}
            className={cn(
              'flex-shrink-0',
              message.trim() && 'bg-blue-500 hover:bg-blue-600'
            )}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="text-xs text-gray-500">
        {message.length > 0 && `${message.length} ký tự`}
      </div>
    </div>
  );
};

