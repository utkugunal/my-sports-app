import { useRouter } from "next/router";
import useSWR from "swr";
import styled from "styled-components";
import { useSession } from "next-auth/react";

const Form = styled.form`
  margin-left: 40px;
`;

const List = styled.ul`
  list-style-type: none;
  margin-bottom: 40px;
`;

const ListItem = styled.li`
  margin-left: 20px;
  margin-top: 5px;
`;

const NoCommentListItem = styled(ListItem)`
  text-align: center;
  margin-left: 100px;
  font-style: italic;
`;

export default function Comments({ comments }) {
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = router.query;
  const { mutate } = useSWR(`/api/venues/${id}`);

  async function handleSubmitComment(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    data.venueID = id;
    data.username = session.user.name;
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
      <>
        <List>
          Comments:
          {comments && comments.length > 0 ? (
            comments.map((comElement) => (
              <ListItem key={comElement._id}>
                {comElement.username}: "{comElement.comment}"{" "}
                <span style={{ fontStyle: "italic" }}>({formattedDate})</span>
              </ListItem>
            ))
          ) : (
            <NoCommentListItem>There is no comment yet.</NoCommentListItem>
          )}
        </List>
      </>
      {session && (
        <Form onSubmit={handleSubmitComment}>
          {/* <div>
          <label htmlFor="username">Your name: </label>
          <input type="text" name="username"></input>
        </div> */}
          <div>
            <label htmlFor="comment">Add comment: </label>
            <input type="text" name="comment"></input>
          </div>
          <button type="submit">Add</button>
        </Form>
      )}
    </div>
  );
}
