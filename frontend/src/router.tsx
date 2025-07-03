import { createBrowserRouter, Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DashboardLayout from "./dashboard/DashboardLayout";
import UsersListScreen from "./dashboard/screens/UsersListScreen";
import UserEditScreen from "./dashboard/screens/UserEditScreen";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import AboutUsPage from "./pages/About/About";
import ContactPage from "./pages/Contact/ContactPage";
import MemberListScreen from "./dashboard/screens/MemberListScreen";
import MemberEditScreen from "./dashboard/screens/MemberEditScreen";
import HomePage from "./pages/HomePage";
import ProfileScreen from "./dashboard/screens/UserProfileScreen";

// Layouts
const Layout = () => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-grow pt-16">
      <Outlet />
    </main>
    <Footer />
  </div>
);



export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <HomePage /> },
      // { path: "members", element: <MemberPage /> },
      { path: "signin", element: <LoginPage /> },
      {path: "about", element: <AboutUsPage /> },
      {path: "contact", element: <ContactPage /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  // Dashboard routes

  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      // { path: "members/:id/edit", element: <MemberEdit /> },
        {path: "users", element: <UsersListScreen /> },
        {path: "users/:id/edit", element: <UserEditScreen /> },
        {path: "profile", element: <ProfileScreen/> },
        {path: "members", element: <MemberListScreen /> },
        {path: "members/:id/edit", element: <MemberEditScreen /> },
    ],
  },
]);
