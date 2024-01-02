import Link from "next/link";
import styled from "styled-components";
import { FaPlus, FaCalendarAlt, FaHome, FaHeart } from "react-icons/fa";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const NavBar = styled.nav`
  font-size: 1.3rem;
  display: flex;
  justify-content: space-evenly;
  position: fixed;
  width: 100%;
  bottom: 0;
  background-color: #fff;
  padding: 10px;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.2);
  z-index: 100;
`;

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
`;

const IconLink = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${(props) => (props.isActive ? "#fff" : "#000")};
  background-color: ${(props) => (props.isActive ? "#000" : "#fff")};
  padding: 5px;
  margin: 0 20px;
  border-radius: 5px;
  svg {
    font-size: 24px;
  }
`;

export default function Navigation() {
  const { data: session } = useSession();
  const router = useRouter();

  const isActive = (pathname) => router.pathname === pathname;
  return (
    <NavBar>
      {session && (
        <IconLink href="/add" isActive={isActive("/add")}>
          <FaPlus />
        </IconLink>
      )}
      {session && (
        <IconLink href="/calendar" isActive={isActive("/calendar")}>
          <FaCalendarAlt />
        </IconLink>
      )}
      <IconLink href="/" isActive={isActive("/")}>
        <FaHome />
      </IconLink>
      {session && (
        <IconLink href="/favorites" isActive={isActive("/favorites")}>
          <FaHeart />
        </IconLink>
      )}
    </NavBar>
  );
}
