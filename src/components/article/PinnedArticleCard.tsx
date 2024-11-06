import { Link } from "react-router-dom";
import { Article } from "types/type";
import { getFormattedDate } from "utils/date";

export default function PinnedArticleCard({ article }: { article?: Article }) {
    if (!article) {
        return null;
    }
    return (
        <article className="bg-[#111111] rounded-lg hover:-translate-y-1 transition-all border border-amber-500/30">
            <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                    <div className="flex flex-grow items-center gap-2">
                        <span className="px-2 py-0.5 bg-amber-500 text-black text-xs rounded">공지</span>
                        <h3 className="flex-grow font-medium hover:text-amber-500 transition-colors">
                            <Link className="inline-block w-full" to={`/article/${article.slug}`}>{article.title}</Link>
                        </h3>
                    </div>
                    <time className="text-sm text-gray-400">{getFormattedDate(article.created_at)}</time>
                </div>
                <p className="text-sm text-gray-400 line-clamp-1">
                    {article.description}
                </p>
            </div>
        </article>
    );
}