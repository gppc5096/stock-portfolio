import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  padding: ${props => props.theme.spacing.md};
  text-align: right;
`;

const Text = styled.p`
  margin: 0;
  color: yellow;
  font-size: 20px;
`;

const Footer: React.FC = () => {
  return (
    <FooterWrapper>
      <hr style={{ border: '1px solid white', margin: '20px 0' }} />
      <Text>2024 Made by 나종춘</Text>
    </FooterWrapper>
  );
};

export default Footer; 