import type { Post } from "~/types/post.type";

const myData = [
  { id: "p1", title: "Post title-1", content: "This is the first post." },
  { id: "p2", title: "Post title-2", content: "This is the second post." },
  { id: "p3", title: "Post title-3", content: "This is the third post." },
];

export function getPosts() {
  // Simulating a database call
  return myData;
}
export function addPost({ title, content }: Post) {
  return myData.push({
    id: `p${myData.length + 1}`,
    title,
    content,
  });
}
