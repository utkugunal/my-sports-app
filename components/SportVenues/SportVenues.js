import SportVenuePreview from "../SportVenuePreview/SportVenuePreview";
import styled from "styled-components";

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  place-items: center;
  height: 100%;
  flex-wrap: wrap;
  justify-content: center;
`;
// const MainContainer = styled.div`
// `;

export default function SportVenues({
  venues,
  favorites,
  handleToggleFavorite,
}) {
  return (
    <div>
      <List>
        {venues.map((venue) => (
          <li key={venue._id}>
            <SportVenuePreview
              image={venue.imageURL}
              venueName={venue.name}
              id={venue._id}
              venueDistrict={venue.district}
              venueCategory={venue.category}
              handleToggleFavorite={handleToggleFavorite}
              isFavorite={favorites?.find(
                (favorite) => favorite.id === venue._id && favorite.isFavorite
              )}
            />
          </li>
        ))}
      </List>
    </div>
  );
}
