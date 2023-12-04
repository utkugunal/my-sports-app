import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import SportVenuePreview from "../../../../components/SportVenuePreview/SportVenuePreview";
import Image from "next/image";
import Comments from "../../../../components/Comments/Comments";
import styled from "styled-components";

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LeanLeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const MapContainer = styled.div`
  display: flex;
  column-gap: 10px;
  margin-top: 10px;
  margin-left: 40px;
  margin-bottom: 20px;
`;

const DirectionText = styled.p`
  margin-top: 0px;
`;

export default function DetailsPage({ handleToggleFavorite, favorites }) {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;
  const { data, isLoading, error } = useSWR(`/api/venues/${id}`);

  if (!isReady || isLoading || error) return <h2>Loading...</h2>;

  const { venue, comments } = data;

  return (
    <CenteredContainer>
      <Link href="/"> &larr; Back</Link>
      <LeanLeftContainer>
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
        <MapContainer>
          <DirectionText>Get direction: </DirectionText>
          <a target="_blank" href={venue.mapURL}>
            <Image
              src="/map-of-berlin.png"
              alt="map-of-berlin"
              width={200}
              height={100}
            ></Image>
          </a>
        </MapContainer>
        <Comments comments={comments} />
      </LeanLeftContainer>
    </CenteredContainer>
  );
}
