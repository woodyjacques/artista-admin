import { createBrowserRouter } from "react-router-dom";
import Campañas from "../views/Campañas";
import Eventos from "../views/Eventos";
import Club from "../views/Club";
import Adminstrador from "../views/Admin";
import Error404 from "../views/Error404";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Adminstrador />,
    children: [
      { path: "/campañas", element: <Campañas /> },
      { path: "/eventos", element: <Eventos /> },
      { path: "/club", element: <Club /> },
    ]
  },

  { path: "*", element: <Error404 /> },
]);

export default router;






