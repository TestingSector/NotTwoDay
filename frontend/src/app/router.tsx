import { createBrowserRouter } from "react-router-dom";

import { Layout } from "./layout";

import { DashboardPage } from "../pages/DashboardPage";
import { MyTasksPage } from "../pages/MyTasksPage";
import { ProfilePage } from "../pages/ProfilePage";
import { CreateApplicationPage } from "../pages/CreateApplicationPage";
import { EditApplicationPage } from "../pages/EditApplicationPage";
import { HistoryPage } from "../pages/HistoryPage";
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
        path: "my-tasks",
        element: <MyTasksPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "create-application",
        element: <CreateApplicationPage />,
      },
      {
        path: "edit-application/:id",
        element: <EditApplicationPage />,
      },
      {
        path: "history",
        element: <HistoryPage />,
      },
    ],
  },
]);
