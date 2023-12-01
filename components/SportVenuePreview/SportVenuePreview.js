import Link from "next/link";
import Image from "next/image";
import styled, { css } from "styled-components";
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
  imageSize = { width: 200, height: 100 }, // apparently it is possible to create a prop as an object...
}) {
  return (
    <Figure>
      <FavoriteButton
        id={id}
        onToggle={handleToggleFavorite}
        isFavorite={isFavorite}
      />
      <Link href={`/venues/${id}`}>
        <Image
          src={image}
          alt={venueName}
          width={imageSize.width}
          height={imageSize.height}
        ></Image>
      </Link>
      <figcaption>
        {venueName}
        <br></br>
        {venueCategory} in {venueDistrict}
      </figcaption>
    </Figure>
  );
}
