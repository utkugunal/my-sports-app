import SportVenuePreview from "../SportVenuePreview/SportVenuePreview";
import Link from "next/link";

export default function SportVenues({ venues }) {
  return (
    <div>
      <h1>My Sports App</h1>
      <ul>
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
      </ul>
    </div>
  );
}
