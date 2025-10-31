import { createBrowserRouter, redirect } from "react-router-dom";
import { Layout } from "./components/layout";
import { TaskListPage } from "@/pages/tasks";
import { TracksTablePage } from "@/pages/tracks";
import {
  AddTrackModal,
  AddTrackWithParamsModal,
  UpdateTrackModal,
} from "@/features/manage-track";
import { tracksApi, TracksApiProvider } from "@/services/track";
import { routes } from "@/kernel/routes";
import { LoginForm, RegisterForm } from "@/services/auth";

export const router = createBrowserRouter([
  {
    element: (
      <TracksApiProvider value={tracksApi}>
        <Layout />
        <AddTrackModal />
        <AddTrackWithParamsModal />
        <UpdateTrackModal />
      </TracksApiProvider>
    ),
    children: [
      {
        index: true,
        loader: () => redirect(routes.tracks),
      },
      {
        path: routes.tracks,
        element: <TracksTablePage />,
      },
      { path: "register", element: <RegisterForm /> },
      { path: "login", element: <LoginForm /> },
      {
        path: routes.tasks,
        element: <TaskListPage />,
      },
    ],
  },
]);
