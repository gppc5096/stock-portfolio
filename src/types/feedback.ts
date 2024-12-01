export type FeedbackType = 'success' | 'error' | 'info';

export interface FeedbackMessage {
  type: FeedbackType;
  message: string;
  id: string;
}

export interface LoadingState {
  isLoading: boolean;
  message?: string;
} 