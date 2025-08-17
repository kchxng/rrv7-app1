import { redirect, type MetaFunction } from "react-router";
import type { Route } from "./+types/logout";
import { logout } from "~/middleware/session.server";

export const meta: MetaFunction = () => {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
};

export async function action({ request }: Route.ActionArgs) {
  return logout(request);
}

export async function loader({ request }: Route.LoaderArgs) {
  return redirect("/login");
}
