import { useRouter } from "next/router";
import useSWR from "swr";
import styled from "styled-components";
import { useSession } from "next-auth/react";
import { StyledButton } from "../StyledButton/StyledButton";
import { Input } from "../Form/Form";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 40px;
`;

const List = styled.ul`
  list-style-type: none;
  margin-bottom: 45px;
  margin-left: 15px;
`;

const ListItem = styled.li`
  margin-left: 20px;

  margin-top: 15px;
  margin-bottom: 15px;
`;

const NoCommentListItem = styled(ListItem)`
  text-align: center;
  margin-left: 100px;
  font-style: italic;
`;

const NewCommentContainer = styled.div`
  margin-bottom: 15px;
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
          <NewCommentContainer>
            <label htmlFor="comment">New comment: </label>
            <Input type="text" name="comment"></Input>
          </NewCommentContainer>
          <StyledButton type="submit">Add comment</StyledButton>
        </Form>
      )}
    </div>
  );
}
