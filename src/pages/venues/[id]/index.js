import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import SportVenuePreview from "../../../../components/SportVenuePreview/SportVenuePreview";

export default function DetailsPage({ handleToggleFavorite, favorites }) {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;
  const { data: venue, isLoading, error } = useSWR(`/api/venues/${id}`);

  if (!isReady || isLoading || error) return <h2>Loading...</h2>;

  // find a way to make the image size bigger on the details pages. use the following link:
  // https://github.com/spiced-academy/lime-web-dev/blob/main/sessions/react-styled-components/react-styled-components.md
  // logic would be: if there there is an id on the route then put the bigger size etc.

  return (
    <>
      <Link href="/"> &larr; Back</Link>
      <SportVenuePreview
        image={venue.imageURL}
        venueName={venue.name}
        id={id}
        venueDistrict={venue.district}
        venueCategory={venue.category}
        handleToggleFavorite={handleToggleFavorite}
        isFavorite={favorites?.find(
          (favorite) => favorite.id === venue._id && favorite.isFavorite
        )}
      />
    </>
  );
}
