import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import SportVenuePreview from "../../../../components/SportVenuePreview/SportVenuePreview";
import Image from "next/image";
import Comments from "../../../../components/Comments/Comments";

export default function DetailsPage({ handleToggleFavorite, favorites }) {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;
  const { data, isLoading, error } = useSWR(`/api/venues/${id}`);

  if (!isReady || isLoading || error) return <h2>Loading...</h2>;

  const { venue, comments } = data;

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
        imageSize={{ width: 400, height: 200 }}
      />
      <div>
        <p>Get direction: </p>
        <Image
          src="/map-of-berlin.png"
          alt="map-of-berlin"
          width={200}
          height={100}
        ></Image>
      </div>
      <Comments comments={comments} />
    </>
  );
}
