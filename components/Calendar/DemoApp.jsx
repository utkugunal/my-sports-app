import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "@/styles/styles";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import styled from "styled-components";

const AppContainer = styled.div`
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;

const CalendarContainer = styled.div`
  flex: 1;

  @media (max-width: 768px) {
  }
`;

const Sidebar = styled.div`
  width: 250px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const now = new Date();
const currentYear = now.getFullYear();
const currentMonth = now.getMonth() + 1; // getMonth() returns 0-11
const currentMonthName = monthNames[currentMonth - 1];
const yearMonthString = `${currentYear}-${currentMonth
  .toString()
  .padStart(2, "0")}`; // Formats to "YYYY-MM"

export default function DemoApp() {
  const [eventGuid, setEventGuid] = useState(0);

  const { data: session } = useSession();
  const { data: record, isLoading, error, mutate } = useSWR(`/api/calendar/`);

  const router = useRouter();

  useEffect(() => {
    if (record) {
      const maxEventId = Math.max(
        ...record.map((event) => parseInt(event.id, 10)),
        0
      );
      setEventGuid(maxEventId + 1);
    }
  }, [record]);

  if (isLoading || error) return <h2>Loading...</h2>;

  console.log("record variable: ", record);

  const recordMonthly = record?.filter((r) =>
    r.start.startsWith(yearMonthString)
  );
  console.log("=recordMonthly:", recordMonthly);

  function createEventId() {
    setEventGuid((prevGuid) => prevGuid + 1);
    return String(eventGuid);
  }

  async function handleDateSelect(selectInfo) {
    let title = prompt("Please enter a new title for your event");
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect();

    if (title) {
      let eventID = createEventId();
      calendarApi.addEvent({
        id: eventID,
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });

      let input = {
        userEmail: session?.user.email || "N/A",
        title: title,
        id: eventID,
        start: selectInfo.startStr,
      };

      const response = await fetch("/api/calendar/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });
      console.log("INPUT!!!!!", input);

      if (response.ok) {
        await mutate();
        router.reload();
      }
    }
  }

  async function handleEventClick(clickInfo) {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      try {
        const response = await fetch(
          `/api/calendar/${clickInfo.event._def.extendedProps._id}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          console.log(
            "Event deleted successfully from the database. Deleted id: ",
            clickInfo.event._def.extendedProps._id
          );
          console.log("==== clickInfo.event._def: ", clickInfo.event._def);
          clickInfo.event.remove();
        } else {
          console.error("Failed to delete the event from the database.");
        }
      } catch (error) {
        console.error("An error occurred while deleting the event:", error);
      }
    }
  }

  const renderEventContent = (eventInfo) => {
    const titleToColor = {
      Fitness: "#F82619",
      Swimming: "#016EE4",
      Yoga: "#149313",
      "Beach Volley": "#DEBE09",
    };

    const backgroundColor = titleToColor[eventInfo.event.title] || "gray";
    const eventStyle = { backgroundColor };

    return (
      <div style={eventStyle}>
        <i>{eventInfo.event.title}</i>
      </div>
    );
  };

  const renderSidebar = () => (
    <Sidebar className="demo-app-sidebar">
      <div className="demo-app-sidebar-section">
        <h2>Instructions</h2>
        <ul>
          <li>
            Select a date to <b>add</b> a new event.
          </li>
          <li>
            Click an event to <b>delete</b> it.
          </li>
        </ul>
      </div>
      <div className="demo-app-sidebar-section">
        <h2>My Progress</h2>
        <li>
          <b>{recordMonthly.length}</b> activities in <b>{currentMonthName}</b>{" "}
          {currentYear}.
        </li>
      </div>
    </Sidebar>
  );

  return (
    <AppContainer className="demo-app">
      <Sidebar>{renderSidebar()}</Sidebar>
      <CalendarContainer className="demo-app-main">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev today",
            center: "title",
            right: "next",
          }}
          initialView="dayGridMonth"
          editable={false}
          firstDay={1}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          initialEvents={record}
          select={handleDateSelect}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
        />
      </CalendarContainer>
    </AppContainer>
  );
}
