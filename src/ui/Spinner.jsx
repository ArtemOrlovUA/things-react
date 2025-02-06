import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  width: ${(props) => props.size || '2.4rem'};
  height: ${(props) => props.size || '2.4rem'};
  border: 2px solid ${(props) => props.color || 'currentColor'};
  border-top-color: transparent;
  border-radius: 50%;
  animation: ${rotate} 0.8s linear infinite;
`;

export default Spinner;
