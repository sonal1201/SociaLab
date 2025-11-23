import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import OnBoarding from "./pages/OnBoarding";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./pages/MainLayout";


const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },

  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "feed", element: <Feed /> },
      { path: "profile", element: <Profile /> },
      { path: "profile/:userId", element: <Profile /> },
      { path: "onboarding", element: <OnBoarding /> },
    ],
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
