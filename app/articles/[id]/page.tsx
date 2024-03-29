import { getAllArticles, getArticle } from "@/lib/utils"
import dayjs from "dayjs"

import Markdown from "./Markdown";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    const articles = await getAllArticles()

    return articles.map(article => ({
        id: article.name
    }))
}

export default async function Page({ params }: { params: { id: string } }) {
    console.log('render page')

    try {
        let { content, frontmatter } = await getArticle(params.id)
        return <article className="prose dark:prose-invert md:prose-lg lg:prose-xl xl:prose-xl 2xl:prose-2xl mx-auto">
            <header className="text-6xl text-center font-bold leading-loose">{frontmatter.title}</header>
            <div className="mb-6">{dayjs(frontmatter.date).format('YYYY-MM-DD')}</div>
            <div className="mb-6">{frontmatter.description}</div>
            <Markdown>
                {content}
            </Markdown>
        </article>
    } catch (error) {
        notFound()
    }
}