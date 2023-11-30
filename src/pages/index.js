import SportVenues from "../../components/SportVenues/SportVenues";

export default function HomePage({ venues, handleToggleFavorite, favorites }) {
  console.log("venues from pages====", venues);
  return (
    <SportVenues
      venues={venues}
      handleToggleFavorite={handleToggleFavorite}
      favorites={favorites}
    />
  );
}
