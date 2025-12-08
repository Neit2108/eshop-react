import React, { useState, useRef, useCallback } from 'react';
import { Send, Paperclip, Smile, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface MessageInputProps {
  onSend: (content: string) => void;
  onTyping: () => void;
  disabled?: boolean;
  placeholder?: string;
  error?: string;
}

const MAX_MESSAGE_LENGTH = 5000;
const MIN_MESSAGE_LENGTH = 1;
const TYPING_DEBOUNCE_DELAY = 300;

export const MessageInput: React.FC<MessageInputProps> = ({
  onSend,
  onTyping,
  disabled = false,
  placeholder = 'Nhập tin nhắn...',
  error,
}) => {
  const [message, setMessage] = useState('');
  const [isComposing, setIsComposing] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      let value = e.target.value;

      // Validate length
      if (value.length > MAX_MESSAGE_LENGTH) {
        value = value.slice(0, MAX_MESSAGE_LENGTH);
      }

      setMessage(value);

      // Debounce typing indicator
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      if (value.trim().length > 0 && !isComposing) {
        onTyping();
        
        // Reset typing indicator after delay
        typingTimeoutRef.current = setTimeout(() => {
          // Will be cleared by stop-typing event from server
        }, TYPING_DEBOUNCE_DELAY);
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
    const trimmedMessage = message.trim();

    // Validation checks
    if (isSending) {
      return; // Prevent double send
    }

    if (!trimmedMessage) {
      return; // Empty message
    }

    if (trimmedMessage.length < MIN_MESSAGE_LENGTH) {
      return;
    }

    if (trimmedMessage.length > MAX_MESSAGE_LENGTH) {
      return;
    }

    if (disabled) {
      return;
    }

    setIsSending(true);
    onSend(trimmedMessage);

    // Reset form
    setMessage('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    // Reset sending state after a delay
    setTimeout(() => {
      setIsSending(false);
    }, 300);
  }, [message, disabled, onSend, isSending]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !isComposing) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCompositionStart = () => setIsComposing(true);
  const handleCompositionEnd = () => setIsComposing(false);

  const isSendDisabled =
    disabled || isSending || !message.trim() || message.length > MAX_MESSAGE_LENGTH;
  const charRemaining = MAX_MESSAGE_LENGTH - message.length;
  const showCharWarning = message.length > MAX_MESSAGE_LENGTH * 0.9;

  return (
    <div className="border-t bg-white p-4 space-y-3">
      {error && (
        <div className="flex items-center gap-2 p-2 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

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
            disabled={disabled || isSending}
            maxLength={MAX_MESSAGE_LENGTH}
            className={cn(
              'resize-none max-h-24 min-h-10 text-sm',
              showCharWarning && 'border-orange-300 focus:border-orange-500'
            )}
            rows={1}
          />

          <Button
            size="icon"
            variant="ghost"
            disabled={disabled || isSending}
            className="flex-shrink-0"
          >
            <Paperclip className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-end gap-1">
          <Button
            size="icon"
            variant="ghost"
            disabled={disabled || isSending}
            className="flex-shrink-0"
          >
            <Smile className="w-4 h-4" />
          </Button>

          <Button
            size="icon"
            onClick={handleSend}
            disabled={isSendDisabled}
            className={cn(
              'flex-shrink-0',
              !isSendDisabled && 'bg-blue-500 hover:bg-blue-600'
            )}
          >
            {isSending ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      <div className={cn(
        'text-xs transition-colors',
        showCharWarning ? 'text-orange-600 font-medium' : 'text-gray-500'
      )}>
        {message.length > 0 && (
          <>
            {message.length} / {MAX_MESSAGE_LENGTH} ký tự
            {showCharWarning && ` (${charRemaining} còn lại)`}
          </>
        )}
      </div>
    </div>
  );
};

