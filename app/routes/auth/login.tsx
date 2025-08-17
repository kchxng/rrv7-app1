import { createUserSession, getUserId } from "~/middleware/session.server";
import type { Route } from "./+types/login";
import { redirect } from "react-router";
import { Form } from "react-router";

export async function loader({ request }: Route.LoaderArgs) {
  // Check if the user is already logged in
  const userId = await getUserId(request);
  if (userId) {
    // If logged in, redirect to the home page or another page
    return redirect("/");
  }
  return null;
}

export async function action({ request }: Route.ActionArgs) {
  let res: Response;
  try {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      return new Response("Invalid email and password", { status: 400 });
    }

    // createSession
    if (email === "cheng@gmail.com" && password === "123456") {
      console.log("Login successful for user:", email);
      res = await createUserSession({
        request,
        userId: "cheng@gmail.com",
        remember: true,
        // redirectUrl: "/",
      });
    } else {
      console.error("Login failed for user:", email);
      return new Response("Invalid email or password", { status: 401 });
    }
    // res = await createUserSession({
    //   request,
    //   userId: "cheng@gmail.com",
    //   remember: true,
    //   // redirectUrl: "/",
    // });

    // if (!res) {
    //   return new Error("An error occurred while creating the session");
    // }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Login error:", error.message);
      return { error: error.message };
    }
    console.error("Login error:", error);
    return { error: "An unknown error occurred" };
  }

  throw res; // Redirect to the home page after successful login
}

export default function Login({ actionData }: Route.ComponentProps) {
  // Render the login form
  // If there is an error, display it
  // if (actionData?.error) {
  //   console.error("Login action error:", actionData.error);
  // }

  return (
    <div className="p-8 min-w-3/4 w-96">
      <h1 className="text-2xl">React Router v7 Auth: Login</h1>
      <Form method="POST" className="mt-6 ">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row">
            <label className="min-w-24 ">Username:</label>
            <input
              className="flex-1 border rounded"
              type="email"
              name="email"
              required
              placeholder="Email"
            />
          </div>
          <div className="flex flex-row">
            <label className="min-w-24 ">Password:</label>
            <input
              className="flex-1 border rounded"
              type="password"
              name="password"
              required
              placeholder="Password"
            />
          </div>
          <div className="flex flex-row-reverse mt-4">
            <button type="submit" className="border rounded px-2.5 py-1 w-32">
              Login
            </button>
          </div>
          {/* {actionData?.error ? (
            <div className="flex flex-row">
              <p className="text-red-600 mt-4 ">{actionData?.error}</p>
            </div>
          ) : null} */}
        </div>
      </Form>
    </div>
  );
}
