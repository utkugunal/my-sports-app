import Link from "next/link";
import styled from "styled-components";

const NavBar = styled.nav`
  font-size: 1.5rem;
  display: flex;
  justify-content: space-evenly;
  position: fixed;
  width: 100%;
  bottom: 0; /* Stick to the bottom */
  background-color: #fff;
  padding: 10px;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.2);
  z-index: 100;
`;

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
`;

export default function Navigation() {
  return (
    <NavBar>
      <StyledLink href={"/my-progress"}>MyP</StyledLink>
      <StyledLink href={"/add-venue"}>Add</StyledLink>
      <StyledLink href={"/"}>Home</StyledLink>
      <StyledLink href={"/map"}>Map</StyledLink>
      <StyledLink href={"/favorites"}>Fav</StyledLink>
    </NavBar>
  );
}