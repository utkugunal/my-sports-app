import "@/styles/styles";
import Layout from "../../components/Layout/Layout";
import { GlobalStyle } from "@/styles/styles";
import useLocalStorageState from "use-local-storage-state";
import useSWR, { SWRConfig } from "swr";
import { SessionProvider } from "next-auth/react";
import DemoApp from "../../components/Calendar/DemoApp";

export default function App({ Component, pageProps, session }) {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, isLoading, error } = useSWR("/api/venues", fetcher);

  const [favoriteInfo, setFavoriteInfo] = useLocalStorageState("favoriteInfo", {
    defaultValue: [],
  });
  if (error) return <div>{error.message}</div>;
  if (isLoading) return <div>loading...</div>;
  if (!data) return;

  console.log("data from the fetch:", data);

  function handleToggleFavorite(id) {
    console.log("id in the handleToggleFavorite function", id);

    setFavoriteInfo((favoriteInfo) => {
      const info = favoriteInfo.find((info) => info.id === id);
      if (info) {
        return favoriteInfo.map((info) =>
          info.id === id ? { ...info, isFavorite: !info.isFavorite } : info
        );
      }
      return [...favoriteInfo, { id: id, isFavorite: true }];
    });
  }
  console.log("favoriteInfo state:", favoriteInfo);
  return (
    <>
      <SessionProvider session={session}>
        <GlobalStyle />
        <SWRConfig
          value={{
            fetcher,
            refreshInterval: 1000,
          }}
        >
          <Layout>
            <Component
              {...pageProps}
              venues={data}
              handleToggleFavorite={handleToggleFavorite}
              favorites={favoriteInfo}
            />
          </Layout>
        </SWRConfig>
      </SessionProvider>
    </>
  );
}
