import { Form, redirect } from "react-router";
import type { Route } from "./+types/create";
import { addPost } from "~/data/db";

// export function loader() {}

export async function action({ request, params }: Route.ActionArgs) {
  const form = await request.formData();
  const title = form.get("title") as string;
  const content = form.get("content") as string;

  console.log("Form submitted with data:", { title, content });

  //   Add to database
  addPost({ title, content });
  // Here you would typically save the post to a database
  // For now, we just log it to the console

  //   return { success: true, message: "Post created successfully!" };
  return redirect("/post");
}

export default function PostCreate() {
  return (
    <div>
      <h2>PostCreate</h2>
      <Form method="POST">
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" />
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <textarea name="content" rows={5} />
        </div>
        <button>Submit</button>
      </Form>
    </div>
  );
}
