import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import FavoriteButton from "../FavoriteButton/FavoriteButton";

const Figure = styled.figure`
  display: flex;
  flex-direction: column;
  margin-bottom: 60px;
`;

export default function SportVenuePreview({
  image,
  venueName,
  id,
  venueDistrict,
  venueCategory,
  handleToggleFavorite,
  isFavorite,
}) {
  return (
    <Figure>
      <FavoriteButton
        id={id}
        onToggle={handleToggleFavorite}
        isFavorite={isFavorite}
      />
      <Link href={`/sport-venues/${id}`}>
        <Image src={image} alt={venueName} height={100} width={200}></Image>
      </Link>
      <figcaption>
        {venueName}
        <br></br>
        {venueCategory} in {venueDistrict}
      </figcaption>
    </Figure>
  );
}
