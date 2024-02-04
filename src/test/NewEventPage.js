import { json, redirect } from "react-router-dom";
import EventForm from "../components/EventForm";

export default function NewEventPage() {
  return <EventForm method="POST" />;
}

export async function action({ request, params }) {
  let data = await request.formData();
  let method = request.method;
  let url = "https://myevents-mp5l.onrender.com/events";

  let myObj = {
    title: data.get("title"),
    image: data.get("image"),
    date: data.get("date"),
    description: data.get("description"),
  };
  if (request.method === "PATCH") {
    url = "https://myevents-mp5l.onrender.com/events/" + params.id;
  }

  let req = await fetch(url, {
    method: method,
    body: JSON.stringify(myObj),
    headers: { "content-type": "application/json" },
  });

  if (req.status === 422) {
    return req;
  }

  if (!req.ok) {
    throw json({ message: "Sending Data failed" }, { status: 500 });
  }

  return redirect("/events");
}
