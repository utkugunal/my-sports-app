import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import styled from "styled-components";

const SignInOutContainer = styled.div`
  text-align: center;
  margin-top: 100px;
`;

const login = () => {
  const { data: session } = useSession();
  console.log(session);

  if (session) {
    return (
      <SignInOutContainer>
        <p>Welcome {session.user.name}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </SignInOutContainer>
    );
  } else {
    return (
      <SignInOutContainer>
        <p>You are not signed in.</p>
        <button onClick={() => signIn()}>Sign in</button>
      </SignInOutContainer>
    );
  }
};

export default login;
