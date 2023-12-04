import styled from "styled-components";
import Navigation from "../Navigation/Navigation";
import "@/styles/styles";
import { useState } from "react";
import NavBarTop from "../NavBarTop/NavBarTop";

const ContentContainer = styled.main`
  padding-bottom: 70px;
`;

const Header = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  border-bottom: 2px solid black;
`;

export default function Layout({ children }) {
  return (
    <>
      <Header>
        <NavBarTop />
        <h1>My Sports App</h1>
      </Header>
      <ContentContainer>{children}</ContentContainer>
      <Navigation />
    </>
  );
}
