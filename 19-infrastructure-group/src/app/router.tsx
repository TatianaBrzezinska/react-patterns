import { createBrowserRouter, redirect } from "react-router-dom";
import {
  TracksTable,
  TracksApiProvider,
  tracksApi,
} from "@/modules/tracks-table";
import { TaskList } from "@/modules/tasks-list";
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
