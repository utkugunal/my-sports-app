import styled from "styled-components";
import Navigation from "../Navigation/Navigation";
import "@/styles/styles";
import NavBarTop from "../NavBarTop/NavBarTop";

const ContentContainer = styled.main`
  padding-bottom: 70px;
`;

const Header = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  width: 100%;
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
