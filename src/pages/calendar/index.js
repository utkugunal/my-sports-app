import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import React from "react";
import styled from "styled-components";

const events = [{ title: "Meeting", start: new Date() }];

const Container = styled.div`
  height: 50%;
  width: 60%;
  margin-left: 25%;
`;

export default function DemoApp() {
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
