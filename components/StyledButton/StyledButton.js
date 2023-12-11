import styled, { css } from "styled-components";

export const StyledButton = styled.button`
  background-color: black;
  padding-left: 1rem;
  padding-right: 1rem;
  border-radius: 0.6rem;
  color: white;
  text-decoration: none;
  font-weight: bold;
  border: none;
  font-size: inherit;
  height: 40px;
  margin-top: 15px;
  margin-bottom: 20px;

  ${({ variant }) =>
    variant === "delete" &&
    css`
      background-color: firebrick;
      color: white;
    `}
`;
