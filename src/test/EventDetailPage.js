import {
  Await,
  defer,
  json,
  redirect,
  useRouteLoaderData,
} from "react-router-dom";
import EventItem from "../components/EventItem";
import { Suspense } from "react";
export default function EventDetailPage() {
  let { details } = useRouteLoaderData("Event-Detail");
  console.log(details);
  return (
    <Suspense fallback={<h2>Loading Details ...</h2>}>
      <Await resolve={details}>{(event) => <EventItem event={event} />}</Await>
    </Suspense>
  );
}

async function getDetails(id) {
  let data = await fetch(`https://myevents-mp5l.onrender.com/events/${id}`);

  if (!data.ok) {
    throw json({ message: "event detail not found" }, { status: 500 });
  } else {
    let res = await data.json();
    return res.event;
  }
}

export let idData = ({ params }) => {
  let id = params.id;
  return defer({
    details: getDetails(id),
  });
};

export async function actions({ params, request }) {
  let id = params.id;
  
  let req = await fetch(`localhost/${id}`, {
    method: request.method,
  });
  if (!req.ok) {
    throw json({ message: "faild to delete event" }, { status: 500 });
  }
  return redirect("/events");
}
