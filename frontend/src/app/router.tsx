import { createBrowserRouter } from "react-router-dom";

import { Layout } from "./layout";

import { DashboardPage } from "../pages/DashboardPage";
import { MyTasksPage } from "../pages/MyTasksPage";
import { ProfilePage } from "../pages/ProfilePage";
import { CreateApplicationPage } from "../pages/CreateApplicationPage";
import { EditApplicationPage } from "../pages/EditApplicationPage";
import { HistoryPage } from "../pages/HistoryPage";
import { AuthPage } from "../pages/AuthPage";
import { PublicRoute } from "./PublicRoute";
import { ProtectedRoute } from "./ProtectedRoute";
import { UsersPage } from "../pages/UsersPage";
export const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      {
        path: "/auth",
        element: <AuthPage />,
      },
    ],
  },

  {
    element: <ProtectedRoute />,
    children: [
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
          {
            path: "users",
            element: <UsersPage />,
          },
        ],
      },
    ],
  },
]);
