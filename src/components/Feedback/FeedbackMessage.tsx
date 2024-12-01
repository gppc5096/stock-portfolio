import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FeedbackType } from '@/types/feedback';

const slideIn = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const MessageContainer = styled.div<{ type: FeedbackType }>`
  padding: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.sm};
  border-radius: 4px;
  animation: ${slideIn} 0.3s ease-out;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  background-color: ${props => {
    switch (props.type) {
      case 'success':
        return props.theme.colors.primary;
      case 'error':
        return props.theme.colors.error;
      case 'info':
        return props.theme.colors.secondary;
      default:
        return props.theme.colors.surface;
    }
  }};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.onPrimary};
  cursor: pointer;
  padding: ${props => props.theme.spacing.xs};
`;

interface FeedbackMessageProps {
  type: FeedbackType;
  message: string;
  onClose: () => void;
}

export const FeedbackMessage: React.FC<FeedbackMessageProps> = ({
  type,
  message,
  onClose
}) => (
  <MessageContainer type={type}>
    <span>{message}</span>
    <CloseButton onClick={onClose}>&times;</CloseButton>
  </MessageContainer>
); 