import Link from "next/link.js";
import styled from "styled-components";
import { useRouter } from "next/router";
import Form from "../../../components/Form/Form.js";

export default function AddVenuePage() {
  const router = useRouter();

  async function addPlace(venue) {
    const response = await fetch("api/venues", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(venue),
    });
    if (response.ok) {
      router.push("/add");
    }
  }

  return (
    <>
      <Form onSubmit={addPlace} formName={"add-place"} />
    </>
  );
}
