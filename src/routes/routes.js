import App from "../App";

const routes = [
  {
    path: "/",
    name: "App",
    component: App,
    authenticated: false,

    // layout: LoggedInPageLayout,
  },
  {
    path: "/:type",
    name: "App",
    component: App,
    authenticated: false,
    // layout: LoggedInPageLayout,
  },

  //   {
  //     path: "/unauthorized",
  //     name: "Unauthorized",
  //     component: Unauthorized,
  //     authenticated: false,
  //   },
  //   {
  //     path: "*",
  //     name: "Not Found",
  //     component: NotFound,
  //   },
];

export default routes;
