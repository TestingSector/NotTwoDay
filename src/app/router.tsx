import { createBrowserRouter } from "react-router-dom";

import { Layout } from "./layout";

import { DashboardPage } from "../pages/DashboardPage";
import { MyTasksPage } from "../pages/MyTasksPage";
import { ProfilePage } from "../pages/ProfilePage";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "tasks",
        element: <MyTasksPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
    ],
  },
]);