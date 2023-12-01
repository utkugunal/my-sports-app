import { useRouter } from "next/router";
import useSWR from "swr";

export default function Comments() {
  const router = useRouter();
  const { id } = router.query;
  const { mutate } = useSWR(`/api/venues/${id}`);
  async function handleSubmitComment(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    data.venue = id;
    console.log(data);
    const response = await fetch(`/api/venues/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      mutate();
    }
    e.target.reset();
  }

  return (
    <div>
      <form onSubmit={handleSubmitComment}>
        <label htmlFor="username">Your name: </label>
        <input type="text" name="username"></input>
        <label htmlFor="comment">Add comment: </label>
        <input type="text" name="comment"></input>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
