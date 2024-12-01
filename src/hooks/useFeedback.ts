import { useState, useCallback } from 'react';
import { FeedbackMessage, FeedbackType, LoadingState } from '@/types/feedback';

export const useFeedback = () => {
  const [messages, setMessages] = useState<FeedbackMessage[]>([]);
  const [loading, setLoading] = useState<LoadingState>({ isLoading: false });

  const showMessage = useCallback((type: FeedbackType, message: string) => {
    const id = Date.now().toString();
    setMessages(prev => [...prev, { type, message, id }]);

    // 3초 후 메시지 자동 제거
    setTimeout(() => {
      setMessages(prev => prev.filter(msg => msg.id !== id));
    }, 3000);
  }, []);

  const removeMessage = useCallback((id: string) => {
    setMessages(prev => prev.filter(msg => msg.id !== id));
  }, []);

  const showLoading = useCallback((message: string = '로딩 중...') => {
    setLoading({ isLoading: true, message });
  }, []);

  const hideLoading = useCallback(() => {
    setLoading({ isLoading: false });
  }, []);

  return {
    messages,
    loading,
    showMessage,
    removeMessage,
    showLoading,
    hideLoading
  };
}; 