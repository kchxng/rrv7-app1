import type { Route } from "./+types/$pid";

export function loader({ params }: { params: { pid: string } }) {
  const { pid } = params;
  if (!pid) {
    throw new Response("Post ID is required", { status: 400 });
  }
  console.log("Loading post with ID:", pid);
  return pid;
}

// export function action() {
//   return null;
// }
export default function PostEdit({ loaderData }: Route.ComponentProps) {
  return <div>PostEdit </div>;
}
