import { getPosts } from "~/data/db";
import type { Route } from "./+types";
import { Link } from "react-router";

export function loader() {
  //loading from database
  return getPosts();
}
// export function clientLoader() {
//   return data;
// }
export default function Post({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <h2>
        Post Item <Link to={"/post/create"}>Create</Link>
      </h2>
      <ul>
        {loaderData.map((post) => (
          <li key={post.id}>
            <h3 className="text-amber-200">{post.title}</h3>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
