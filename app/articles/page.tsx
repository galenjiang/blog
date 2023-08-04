import { getAllArticles } from "@/utils"
import Link from "next/link"

export default async function Page() {
    const list = await getAllArticles()
    return <div className="container mx-auto min-h-[calc(100vh-100px)]">

        <h2 className="text-5xl leading-loose font-bold">Galen&apos;s Blog</h2>
        <main className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {
                list.map(article => (<Link key={article.name} href={`articles/${article.name}`} className="flex flex-col rounded-2xl bg-white dark:bg-black shadow hover:shadow-lg px-8 py-6 aspect-auto transition">
                    <div className="truncate font-bold">{article.title}</div>
                    <div className="line-clamp-3 my-2">{article.description}</div>

                    <div className="mt-auto text-right">{article.date.format('YYYY-MM-DD')}</div>
                </Link>))
            }
        </main>
    </div>
}