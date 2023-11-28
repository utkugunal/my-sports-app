import "@/styles/styles";
import Layout from "../../components/Layout/Layout";
import { GlobalStyle } from "@/styles/styles";
import useLocalStorageState from "use-local-storage-state";

export default function App({ Component, pageProps }) {
  const venues = [
    {
      name: "John&Jane's",
      category: "Yoga",
      district: "Mitte",
      imageURL:
        "https://lh3.googleusercontent.com/p/AF1QipPIucCEKzv4Tzq8myGcbcRZYcmHV31Fe6nk0Tnk=s1360-w1360-h1020",
      id: "1",
    },
    {
      name: "Holmes Place",
      category: "Fitness",
      district: "Mitte",
      imageURL:
        "https://assets-global.website-files.com/6214e36730138347ab0f8f6d/62e3d6fe2eb59c7c09a870f9_07052022DEBER_Holmes_Place_Gendarmenmarkt_5.jpg",
      id: "2",
    },
    {
      name: "celeverFit",
      category: "Fitness",
      district: "Pberg",
      imageURL:
        "https://www.clever-fit.com/app/uploads/2022/10/Berlin_Prenzlauer_Berg_image_01.jpg",
      id: "3",
    },
    {
      name: "Ernst Thälmann",
      category: "Swimming",
      district: "Pberg",
      imageURL:
        "https://www.berlinerbaeder.de/fileadmin/_processed_/b/b/csm_0086_Schwimmhalle_Ernst-Thaelmann-Park_BBB_98a36af406.jpg",
      id: "4",
    },
    {
      name: "Beach Mitte",
      category: "Beach Volley",
      district: "Mitte",
      imageURL:
        "https://beachmitte.de/wp-content/uploads/2023/04/bm_lp_gl_1.jpg",
      id: "5",
    },
  ];

  const [favoriteInfo, setFavoriteInfo] = useLocalStorageState("favoriteInfo", {
    defaultValue: [],
  });

  function handleToggleFavorite(id) {
    console.log("id in the handleToggleFavorite function", id);
    setFavoriteInfo((favoriteInfo) => {
      const info = favoriteInfo.find((info) => info.id === id);
      console.log("favoriteInfo.find((info) => info.id === id): ", info);
      if (info) {
        return favoriteInfo.map((info) =>
          info.id === id ? { ...info, isFavorite: !info.isFavorite } : info
        );
      }
      console.log("[...favoriteInfo, { id: id, isFavorite: true }]:", [
        ...favoriteInfo,
        { id: id, isFavorite: true },
      ]);
      return [...favoriteInfo, { id: id, isFavorite: true }];
    });
  }

  return (
    <>
      <GlobalStyle />
      <h1>My Sports App</h1>
      <Component
        {...pageProps}
        venues={venues}
        handleToggleFavorite={handleToggleFavorite}
        favorites={favoriteInfo}
      />
      <Layout />
    </>
  );
}
