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

  html,

  
  body,
  body > div {
    /* the react root */
    margin: 0;
    padding: 0;
    height: 100%;
  }

  h2 {
    margin: 0;
    font-size: 16px;
  }

  ul {
    margin: 0;
    padding: 0 0 0 1.5em;
  }

  /* li {
    margin: 1.5em 0;
    padding: 0;
  } */

  b {
    /* used for event dates/times */
    /* margin-right: 3px; */
  }

  .demo-app {
    display: flex;
    min-height: 100%;
    font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
    font-size: 14px;
  }

  .demo-app-sidebar {
  flex-grow: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  /* justify-content: top; */
  line-height: 1.5;
  background: #eaf9ff;
  border-right: 1px solid #d3e2e8;

  @media (max-width: 768px) { /* Adjust breakpoint as needed */
    height: auto;
    flex-grow: 0;
  }

  }

  .demo-app-sidebar-section {
    padding: 1.5em;
  }

  .demo-app-main {
    flex-grow: 1;
    padding: 3em;
  }

  .fc {
    /* the calendar root */
    max-width: 1100px;
    margin: 0 auto;
  }

  .fc-event {
    border-color: #d3d3d3;
  }
`;
