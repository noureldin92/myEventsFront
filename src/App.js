import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./test/Home";
import EventsPage from "./test/EventsPage";
import EventDetailPage, {
  idData,
  actions as deleteEvent,
} from "./test/EventDetailPage";
import NewEventPage, { action as newEventAction } from "./test/NewEventPage";
import EditEventPage from "./test/EditEventPage";
import LayOut from "./test/layOut";
import EventNav from "./test/eventsNav";
import { fetchEvents } from "./test/EventsPage";
import PageContent from "./components/pageContent";
import NewsletterPage from "./test/Newsletter";
import { action as newsletterAction } from "./test/Newsletter";

// Challenge / Exercise

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage
// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage
// 3. Add a root layout that adds the <MainNavigation> component above all page components
// 4. Add properly working links to the MainNavigation
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components

let route = createBrowserRouter([
  {
    path: "/",
    element: <LayOut />,
    errorElement: <PageContent />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "events",
        element: <EventNav />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: fetchEvents,
          },
          {
            path: ":id",
            id: "Event-Detail",
            loader: idData,
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: deleteEvent,
              },
              {
                path: "edit",
                element: <EditEventPage />,
                action: newEventAction,
              },
            ],
          },
          { path: "new", element: <NewEventPage />, action: newEventAction },
        ],
      },

      {
        path: "newsletter",
        element: <NewsletterPage />,
        action: newsletterAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={route}></RouterProvider>;
}

export default App;
