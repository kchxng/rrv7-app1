import {
  type RouteConfig,
  index,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("contact", "routes/contact.tsx"),

  // ============ Authentication routes ============ //
  route("login", "routes/auth/login.tsx"),
  route("register", "routes/auth/register.tsx"),
  route("logout", "routes/auth/logout.tsx"),

  ...prefix("post", [
    index("routes/post/index.tsx"),
    route("create", "routes/post/create.tsx"),
    route(":pid", "routes/post/$pid.tsx"),
  ]),
] satisfies RouteConfig;
