import { createBrowserRouter, redirect } from "react-router-dom";
import {
  TracksTable,
  TracksApiProvider,
  tracksApi,
} from "@/pages/tracks-table";
import { TaskList } from "@/pages/tasks-list";
import { Layout } from "./components/layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <TracksApiProvider value={tracksApi}>
        <Layout />
      </TracksApiProvider>
    ),
    children: [
      {
        index: true,
        loader: () => redirect("/tracks"),
      },
      {
        path: "/tracks",
        element: <TracksTable />,
      },
      {
        path: "/tasks",
        element: <TaskList />,
      },
    ],
  },
]);
