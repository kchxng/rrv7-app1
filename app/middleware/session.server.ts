import { redirect } from "react-router";
import { createCookieSessionStorage } from "react-router";

type User = { id: string; username: string; password: string };

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    secrets: ["s3ret"],
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    // maxAge: 60 * 60 * 24 * 7, // 1
    secure: process.env.NODE_ENV === "production",
  },
});

export const { commitSession, destroySession } = sessionStorage;

const getUserSession = async (request: Request) => {
  return await sessionStorage.getSession(request.headers.get("Cookie"));
};

export async function logout(request: Request) {
  const session = await getUserSession(request);
  return redirect("/", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
}

const USER_SESSION_KEY = "userId";
export async function getUserId(request: Request) {
  const session = await getUserSession(request);
  const userId = session.get(USER_SESSION_KEY);
  if (!userId) {
    return null;
  }
  return userId;
}

export async function createUserSession({
  request,
  userId,
  remember,
  redirectUrl,
}: {
  request: Request;
  userId: string;
  remember: boolean;
  redirectUrl?: string;
}) {
  const session = await getUserSession(request);
  session.set(USER_SESSION_KEY, userId);
  return redirect(redirectUrl || "/", {
    headers: {
      "Set-Cookie": await commitSession(session, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: remember
          ? 60 * 60 * 24 * 7 // 1 week
          : undefined,
      }),
    },
  });
}
