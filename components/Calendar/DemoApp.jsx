import React, { useState, useEffect } from "react";
import { formatDate } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "@/styles/styles";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function DemoApp() {
  const [currentEvents, setCurrentEvents] = useState([]);
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

  const recordMonthly = record?.filter((r) => r.start.startsWith("2023-12"));
  console.log("====recordMonthly:", recordMonthly);

  function createEventId() {
    setEventGuid((prevGuid) => prevGuid + 1);
    return String(eventGuid);
  }
  async function handleDateSelect(selectInfo) {
    let title = prompt("Please enter a new title for your event");
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      let eventID = createEventId();
      calendarApi.addEvent({
        id: eventID,
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
      console.log("this title is added: ", title);
      console.log("start time of the entered title: ", selectInfo.startStr);
      console.log("this id is added: ", eventID);

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
        await mutate(); // Wait for the mutate to complete
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
          // Remove the event from the calendar
          clickInfo.event.remove();
        } else {
          console.error("Failed to delete the event from the database.");
        }
      } catch (error) {
        console.error("An error occurred while deleting the event:", error);
      }
    }
  }

  function handleEvents(events) {
    setCurrentEvents(events);
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

  const renderSidebarEvent = (event) => (
    <li key={event.id}>
      <b>
        {formatDate(event.start, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </b>
      <i>{event.title}</i>
    </li>
  );

  const renderSidebar = () => (
    <div className="demo-app-sidebar">
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
        {/* <h2>All Events ({currentEvents.length})</h2>
        <ul>{currentEvents.map(renderSidebarEvent)}</ul> */}
        <h2>My Progress</h2>

        <li>
          <b>{recordMonthly.length}</b> activities in <b>December</b> 2023.
        </li>
      </div>
    </div>
  );

  return (
    <div className="demo-app">
      {renderSidebar()}
      <div className="demo-app-main">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev next",
            center: "title",
            right: "today",
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
          eventsSet={handleEvents}
        />
      </div>
    </div>
  );
}
