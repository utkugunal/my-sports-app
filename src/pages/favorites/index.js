import SportVenues from "../../../components/SportVenues/SportVenues";
import styled from "styled-components";

const Text = styled.h3`
  text-align: center;
  margin: 100px;
`;

export default function FavoritesPage({
  venues,
  favorites,
  handleToggleFavorite,
}) {
  const filteredFavorites = favorites.filter(
    (favorite) => favorite.isFavorite === true
  );

  const selectedVenues = [];

  for (let favorite of filteredFavorites) {
    const selectedVenue = venues.find((venue) => venue._id === favorite.id);

    if (selectedVenue) {
      selectedVenues.push(selectedVenue);
    }
  }

  console.log("Filtered Favorites:", filteredFavorites);
  console.log("Selected Venues:", selectedVenues);

  return (
    <>
      {selectedVenues.length > 0 ? (
        <SportVenues
          venues={selectedVenues}
          handleToggleFavorite={handleToggleFavorite}
          favorites={favorites}
        />
      ) : (
        <Text>There is no favorite selected.</Text>
      )}
    </>
  );
}
