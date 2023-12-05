import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import styled from "styled-components";

const Container = styled.div`
  height: 50%;
  width: 60%;
  margin-left: 25%;
`;

export default function DemoApp() {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month is zero-based
    const day = String(currentDate.getDate()).padStart(2, "0");

    const formattedDateStr = `${year}-${month}-${day}`;
    setFormattedDate(formattedDateStr);
  }, []); // Empty dependency array to run the effect only once when the component mounts

  const events = [
    { title: "Meeting", start: formattedDate },
    { title: "Fitness", start: "2023-12-08" },
  ];

  console.log("currentDateStr: ", formattedDate);
  return (
    <Container>
      <h1>My Sports Calendar</h1>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        events={events}
        eventContent={renderEventContent}
      />
    </Container>
  );
}

// a custom render function
function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}
