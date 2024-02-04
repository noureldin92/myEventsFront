import EventForm from "../components/EventForm";
import { Await, useRouteLoaderData } from "react-router-dom";
export default function EditEventPage() {
  let { details } = useRouteLoaderData("Event-Detail");

  return (
    <>
      <h1> Edit Event Page </h1>
      <Await resolve={details}>
        {(e) => <EventForm method="PATCH" event={e} />}
      </Await>
    </>
  );
}
