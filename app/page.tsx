import { redirect } from "next/navigation";

export default async function Home() {
  redirect("articles");
  // return <h1 className="text-center text-6xl">Welcome to My Blog!</h1>;
}
