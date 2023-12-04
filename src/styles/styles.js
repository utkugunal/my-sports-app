import React from "react";
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: system-ui;
  }

  h1 {
    font-family: system-ui;
    text-align: center;
    font-size: 1.5rem;
  }
`;
