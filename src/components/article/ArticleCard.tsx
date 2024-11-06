import CategoryBlock from "components/category/CategoryBlock";
import TagSection from "components/tag/TagSection";
import { Link } from "react-router-dom";
import { Article } from "types/type";
import { formatTimeUnit, getFormattedDate } from "utils/date";
import { formatNumberWithUnit } from "utils/number";

export function ArticleCard({ article }: { article: Article }) {
    // console.log(`article created_at: ${article.created_at}`);
    // console.log(`article created_at: ${typeof article.created_at}`);
    // console.log({ article });
    
    
    return (
        <article
            className="bg-[#111111] rounded-lg p-6 hover:transform hover:-translate-y-1 transition-all border border-gray-800">
            <div className="flex flex-col sm:flex-row">
                {/* <!-- 썸네일 영역 --> */}
                <div className="sm:w-48 h-auto max-h-64 relative rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none overflow-hidden">
                    <img src="https://placehold.co/300x800/png" alt="썸네일" className="w-full h-full object-cover" />
                </div>
                {/* <!-- 콘텐츠 영역 --> */}
                <div className="flex-1 p-6 flex flex-col justify-between">
                    {/* <!-- 기존 콘텐츠 --> */}
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-start">
                            <h2 className="text-xl sm:text-2xl font-semibold hover:text-amber-500 line-clamp-2">
                                <Link to={`/article/${article.slug}`} state={{ id: article.id, title: article.title }}>{article.title}</Link>
                            </h2>
                            <div className="relative">
                                <button className="p-1.5 hover:bg-gray-800 rounded-full transition-colors">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                    </svg>
                                </button>
                                {/* <!-- 메뉴 아이템들은 React에서 구현할 예정 --> */}
                            </div>
                        </div>
                        <p className="text-gray-400 line-clamp-2 text-sm sm:text-base">
                            {article.description}
                        </p>
                        <div className="flex flex-wrap align-center gap-2">
                            {/* category render - category_id가 없는 경우엔 render 안함 */}
                            { article.category_id && <CategoryBlock category_id={article.category_id} />}
                            
                            <TagSection article_id={article.id} />
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm text-gray-400 gap-2">
                            <div className="flex items-center space-x-4">
                                <span>{getFormattedDate(article.created_at)}</span>
                                <span>읽는 시간: {article.reading_time}{formatTimeUnit(article.time_unit)}</span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <span className="flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    {formatNumberWithUnit(article.view_cnt)}
                                </span>
                                <span className="flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                    {formatNumberWithUnit(article.like_cnt)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}