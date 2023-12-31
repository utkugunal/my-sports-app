import styled from "styled-components";
import { StyledButton } from "../StyledButton/StyledButton";
import { useRouter } from "next/router";

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-top: 30px;
`;

export const Input = styled.input`
  padding: 0.5rem;
  font-size: inherit;
  border: 1px solid black;
  border-radius: 0.5rem;
  min-width: 250px;
  height: 30px;
`;

export const Textarea = styled.textarea`
  font-family: inherit;
  border: 1px solid black;
  border-radius: 0.5rem;
  padding: 0.5rem;
`;

export const Label = styled.label`
  font-weight: normal;
`;

export default function Form({ onSubmit, formName }) {
  const router = useRouter();
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    console.log(data);
    onSubmit(data);
    event.target.reset();
    alert("New venue is successfully added!");
    router.reload();
  }

  return (
    <FormContainer aria-labelledby={formName} onSubmit={handleSubmit}>
      <Label htmlFor="name">Venue Name</Label>
      <Input id="name" name="name" type="text" required />
      <Label htmlFor="category">Sport Category</Label>
      <Input id="category" name="category" type="text" required />
      <Label htmlFor="image-url">Image Url</Label>
      <Input id="image-url" name="imageURL" type="text" required />
      <Label htmlFor="district">District</Label>
      <Input id="district" name="district" type="text" required />
      <Label htmlFor="map-url">Map Url</Label>
      <Input id="map-url" name="mapURL" type="text" required />
      <StyledButton type="submit">Add venue</StyledButton>
    </FormContainer>
  );
}
