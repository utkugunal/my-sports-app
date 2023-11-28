import SportVenuePreview from "../SportVenuePreview/SportVenuePreview";
import styled from "styled-components";
import createGlobalStyle from "@/styles/styles";

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

export default function SportVenues({ venues }) {
  return (
    <div>
      <h1>My Sports App</h1>
      <List>
        {venues.map((venue) => (
          <li key={venue.id}>
            <SportVenuePreview
              image={venue.imageURL}
              venueName={venue.name}
              id={venue.id}
              venueDistrict={venue.district}
              venueCategory={venue.category}
            />
          </li>
        ))}
      </List>
    </div>
  );
}
