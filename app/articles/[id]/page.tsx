import { getAllArticles, getArticle } from "@/utils"
import dayjs from "dayjs"

import Markdown from "./Markdown";

export async function generateStaticParams() {
    const articles = await getAllArticles()

    return articles.map(article => ({
        id: article.name
    }))
}

export default async function Page({ params }: { params: { id: string } }) {
    console.log('render page')
    
    const { content, frontmatter } = await getArticle(params.id)
    return <article className="prose dark:prose-invert prose-pre:bg-[#282c34] dark:prose-pre:bg-[#fafafa] md:prose-lg lg:prose-xl xl:prose-xl 2xl:prose-2xl mx-auto min-h-[calc(100vh-100px)]">
        <header className="text-6xl text-center font-bold leading-loose">{frontmatter.title}</header>
        <div className="mb-6">{dayjs(frontmatter.date).format('YYYY-MM-DD')}</div>
        <div className="mb-6">{frontmatter.description}</div>
        <Markdown>
            { content }
        </Markdown>
    </article>
}