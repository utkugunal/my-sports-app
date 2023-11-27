import Link from "next/link";
import Image from "next/image";

export default function SportVenuePreview({
  image,
  venueName,
  id,
  venueDistrict,
  venueCategory,
}) {
  return (
    <figure>
      <button></button>
      <Link href={`/sport-venues/${id}`}>
        <Image src={image} alt={venueName} height={100} width={200}></Image>
      </Link>
      <figcaption>
        {venueName}
        <br></br>
        {venueCategory} in {venueDistrict}
      </figcaption>
    </figure>
  );
}
