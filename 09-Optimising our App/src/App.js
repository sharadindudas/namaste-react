import ReactDOM from "react-dom/client";
import "./css/index.css";
import "./css/responsive.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";

const Header = lazy(() => import("./components/Header/Header"));
const Body = lazy(() => import("./components/Body/Body"));
const About = lazy(() => import("./pages/About/About"));
const Contact = lazy(() => import("./pages/Contact/Contact"));
const RestaurantMenu = lazy(() => import("./components/RestaurantMenu/RestaurantMenu"));
const Error = lazy(() => import("./components/Error/Error"));

const Home = () => {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Header />
      <Outlet />
    </Suspense>
  );
};

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/",
        element: <Body />
      }, {
        path: "/about",
        element: <About />
      }, {
        path: "/contact",
        element: <Contact />
      },
      {
        path: "/restaurants/:resId",
        element: <RestaurantMenu />
      }
    ],
    errorElement: <Error />
  }
])

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(<RouterProvider router={Router} />);
