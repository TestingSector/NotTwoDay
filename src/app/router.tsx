import { createBrowserRouter } from "react-router-dom";

import { Layout } from "./layout";

import { MyTestsPage } from "../pages/MyTestsPage";
import { QueuePage } from "../pages/QueuePage";
import { ProfilePage } from "../pages/ProfilePage";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <MyTestsPage />,
      },
      {
        path: "queue",
        element: <QueuePage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
    ],
  },
]);