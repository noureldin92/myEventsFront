import { useLoaderData, json, defer, Await } from "react-router-dom";

import EventsList from "../components/EventsList";
import { Suspense } from "react";

function EventsPage() {
  let { events } = useLoaderData();
  
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

async function getEvents() {
  const response = await fetch("https://myevents-mp5l.onrender.com/events");

  if (!response.ok) {
    throw json({ message: "Error From Backend" }, { status: 500 });
  } else {
    let res = await response.json();
    return res.events;
  }
}

export let fetchEvents = () => {
  return defer({
    events: getEvents(),
  });
};
