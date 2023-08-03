import { getAllArticles } from "@/utils"
import Link from "next/link"

export const dynamic = 'force-static'

export default async function Page() {
    console.log('render')
    const list = await getAllArticles()
    return <div className="container mx-auto">

        <h2 className="text-5xl leading-loose font-bold">all articles</h2>
        <main className="grid md:grid-cols-4 gap-4">
            {
                list.map(article => (<Link key={article.name} href={`articles/${article.name}`} className="flex flex-col rounded-2xl bg-white dark:bg-black shadow hover:shadow-lg p-10 aspect-[4/3] transition">
                    <div>{article.title}</div>
                    <div>{article.description}</div>

                    <div className="mt-auto text-right">{article.date.format('YYYY-MM-DD')}</div>
                </Link>))
            }
        </main>
    </div>
}