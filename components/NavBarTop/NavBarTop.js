import React, { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import styled from "styled-components";
import Link from "next/link";

const NavItem = styled.li`
  list-style-type: none;
  cursor: pointer;
  width: 65px;
  margin-bottom: 5px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const HamburgerMenu = styled.div`
  font-size: 2rem;
  margin-top: -3px;
  z-index: 10;
`;

const Nav = styled.li`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  z-index: 10;
`;

const Dropdown = styled.ul`
  position: absolute;
  top: 100%;
  margin-left: 0;
  left: 0;
  padding-left: 10px;
  padding-right: 10px;
  display: ${(props) => (props.show ? "block" : "none")};
  background-color: white;
  border-bottom: 2px solid black;
  border-right: 2px solid black;
  padding-top: 10px;
  margin-top: -5px;
  z-index: 10;
`;

export default function NavBarTop() {
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <Nav>
      <HamburgerMenu onClick={toggleDropdown}>☰</HamburgerMenu>
      <Dropdown show={showDropdown}>
        <NavItem onClick={() => signIn()}>Sign In</NavItem>
        <NavItem onClick={() => signOut()}>Sign Out</NavItem>
      </Dropdown>
    </Nav>
  );
}
