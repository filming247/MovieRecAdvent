import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Login from "./Pages/login.jsx"
import ExistingLogin from "./Pages/existing_login.jsx"
import NewLogin from "./Pages/new_login.jsx"
import Advent from "./Pages/advent.jsx"

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {path: "", Component: App},
      {path: "login", Component: Login},
      {path: "existing_login", Component: ExistingLogin},
      {path: "new_login", Component: NewLogin},
      {path: "advent", Component: Advent}
    ]
  },
]);

/*
This code renders our project so it can be viewed in a browser. 
*/
ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />,
	</React.StrictMode>
);
