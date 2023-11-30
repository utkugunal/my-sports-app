import Navigation from "../Navigation/Navigation";
import "@/styles/styles";

export default function Layout({ children }) {
  return (
    <>
      <h1>My Sports App</h1>
      <main>{children}</main>
      <Navigation />
    </>
  );
}
