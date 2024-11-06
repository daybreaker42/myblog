import { Link } from "react-router-dom";
import { Category } from "types/type";
import { parseNumberWithUnit } from "utils/number";

export default function CategoryCard({ category, keyword }: { category?: Category | null, keyword? : string }) {
    if (!category) return (
        <div className="p-4 bg-[#111111] border border-gray-800 rounded-lg hover:border-amber-500 transition-colors">
            <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-medium group-hover:text-amber-500 transition-colors">{keyword}에 대한 검색 결과가 없습니다</span>
                {/* <span className="text-sm text-gray-400">{category.article_cnt}</span> */}
            </div>
            <p className="text-sm text-gray-400 truncate">다른 검색어로 검색해 주세요.</p>
        </div>
    )
    return (
        <Link to={`/category/${category.name}`} className="group">
            
                <article className="bg-[#111111] border border-gray-800 rounded-lg overflow-hidden hover:border-amber-500/50 transition-all">
                    {/* <!-- 썸네일 영역 --> */}
                    <div className="relative h-32 overflow-hidden">
                        { category.thumbnail_img ? <img 
                            src={`${category.thumbnail_img}`}
                            alt="React 카테고리"
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                        />
                        : <div className="w-full h-full bg-gray-800"></div> }
                        {/* <!-- 그라데이션 오버레이 --> */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] to-transparent"></div>
                    </div>
                    
                    {/* <!-- 콘텐츠 영역 --> */}
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold group-hover:text-amber-500 transition-colors">{category.name}</h2>
                            <span className="px-2 py-1 bg-[#1a1a1a] text-sm rounded-full text-amber-500">{category.article_cnt}개의 글</span>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-gray-400">
                            <div className="flex items-center gap-4">
                                <span className="flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    {parseNumberWithUnit(category.total_view_cnt)}
                                </span>
                                <span className="flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                    {parseNumberWithUnit(category.total_like_cnt)}
                                </span>
                            </div>
                            <span>최근: 2024-11-02</span>
                        </div>
                    </div>
                </article>
        </Link>
    );
}