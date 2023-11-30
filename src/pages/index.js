import SportVenues from "../../components/SportVenues/SportVenues";

export default function HomePage({ venues, handleToggleFavorite, favorites }) {
  return (
    <SportVenues
      venues={venues}
      handleToggleFavorite={handleToggleFavorite}
      favorites={favorites}
    />
  );
}
