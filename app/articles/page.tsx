import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { getAllArticles } from "@/lib/fetch";
import Link from "next/link";

export default async function Page() {
  const list = await getAllArticles();
  return (
    <div className="container mx-auto px-4">
      <main className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {list.map((article) => (
          <Link key={article.name} href={`articles/${article.name}`}>
            <Card className="h-full flex flex-col hover:shadow-lg">
              <CardHeader>
                <div className="truncate font-bold">{article.title}</div>
              </CardHeader>
              <CardContent className="flex-auto">
                <div className="line-clamp-3 my-2">{article.description}</div>
              </CardContent>
              <CardFooter>
                <div className="mt-auto text-right">
                  {article.date.format("YYYY-MM-DD")}
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </main>
    </div>
  );
}
