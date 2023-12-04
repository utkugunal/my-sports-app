import styled from "styled-components";
import Navigation from "../Navigation/Navigation";
import "@/styles/styles";

const ContentContainer = styled.main`
  padding-bottom: 70px;
`;
export default function Layout({ children }) {
  return (
    <>
      <h1>My Sports App</h1>
      <ContentContainer>{children}</ContentContainer>
      <Navigation />
    </>
  );
}
