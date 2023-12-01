import { useRouter } from "next/router";
import useSWR from "swr";

export default function Comments({ comments }) {
  const router = useRouter();
  const { id } = router.query;
  const { mutate } = useSWR(`/api/venues/${id}`);
  async function handleSubmitComment(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    data.venueID = id;
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

  const currentDate = new Date();
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  const formattedDate = currentDate.toLocaleString(undefined, options);

  return (
    <div>
      {comments && (
        <>
          <ul>
            Comments:
            {comments.map((comElement) => (
              <li key={comElement._id}>
                {comElement.username}: {comElement.comment} - {formattedDate}
              </li>
            ))}
          </ul>
        </>
      )}
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
