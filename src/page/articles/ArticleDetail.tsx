import { useParams, useLocation } from "react-router-dom";
// components
import Footer from "components/Footer";
import Nav from "components/Nav";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "utils/supabase";

async function fetchArticleDetail({ id }: { id: string }) {
    const { data, error } = await supabase
        .from("article")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        throw error;
    }
    return data;
}

export default function ArticleDetail(){
    const code_content = `import { useQuery } from 'react-query';
const fetchTodos = async () => {
    const res = await fetch('/api/todos');
    return res.json();
};

function Todos() {
    const { data, isLoading } = useQuery('todos', fetchTodos);

    if (isLoading) return 'Loading...';

    return (
        <ul>;
            {data.map(todo =>; (
                <li key={todo.id}>;{todo.title}</li>;
            ))}
        </ul>;
    );
}`;
    const slug = useParams<{slug: string}>().slug;
    const location = useLocation();
    const { id, title } = location.state || {};
    // console.log(slug);

    const { data, isError, isPending, error } = useQuery({
        queryKey: ['article', slug], 
        queryFn: () => fetchArticleDetail({ id }),
        placeholderData: () => {
            return JSON.parse(localStorage.getItem('article') || '{}');
        },
        staleTime: 1000 * 60 * 5, // 5분
    });

    if (isPending) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;
    
    return (
    <div className="bg-[#0a0a0a] text-gray-200 min-h-screen">
        <header className="bg-[#111111] border-b border-gray-800 sticky top-0 z-50">
            <Nav />
        </header>

        <main className="max-w-4xl mx-auto px-4 py-8    ">
            {/* <!-- 글 헤더 --> */}
            <header className="mb-12">
                {/* <!-- 카테고리 및 날짜 --> */}
                <div className="flex flex-wrap gap-2 mb-4 text-sm">
                    <a href="#" className="text-amber-500 hover:text-amber-400">React</a>
                    <span className="text-gray-500">•</span>
                    <time className="text-gray-400">2024-11-02</time>
                </div>
                
                {/* <!-- 제목 --> */}
                <h1 className="text-3xl sm:text-4xl font-bold mb-6">React Query로 서버 상태 관리하기</h1>
                
                {/* <!-- 메타 정보 --> */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                    <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        읽는 시간: 5분
                    </span>
                    <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        1.2k
                    </span>
                    <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        42
                    </span>
                </div>
            </header>

            {/* <!-- 목차 --> */}
            <nav className="hidden 2xl:block fixed left-[calc(50%+28rem)] top-32 w-64 p-6 space-y-2">
                <h2 className="font-semibold text-amber-500 mb-4">목차</h2>
                <ul className="space-y-2 text-sm">
                    <li><a href="#intro" className="text-gray-400 hover:text-amber-500">소개</a></li>
                    <li><a href="#what-is" className="text-gray-400 hover:text-amber-500">React Query란?</a></li>
                    <li className="pl-4"><a href="#features" className="text-gray-400 hover:text-amber-500">주요 기능</a></li>
                    <li className="pl-4"><a href="#advantages" className="text-gray-400 hover:text-amber-500">장점</a></li>
                    <li><a href="#installation" className="text-gray-400 hover:text-amber-500">설치 및 설정</a></li>
                    <li><a href="#basic-usage" className="text-gray-400 hover:text-amber-500">기본 사용법</a></li>
                    <li><a href="#advanced" className="text-gray-400 hover:text-amber-500">고급 기능</a></li>
                </ul>
            </nav>

            {/* <!-- 본문 --> */}
            <article className="prose prose-invert max-w-none prose-pre:bg-[#1a1a1a] prose-pre:border prose-pre:border-gray-800">
                {/* <!-- 소개 --> */}
                <section id="intro">
                    <p className="lead text-xl text-gray-300 mb-8">
                        React 애플리케이션에서 서버 상태 관리는 항상 까다로운 문제였습니다. React Query는 이러한 문제를 우아하게 해결해주는 도구입니다.
                    </p>
                </section>

                {/* <!-- 본문 섹션 --> */}
                <section id="what-is" className="mt-12">
                    <h2 className="text-2xl font-bold mb-6">React Query란?</h2>
                    <p className="mb-4">
                        React Query는 React 애플리케이션에서 서버 상태를 가져오고, 캐시하고, 동기화하고, 업데이트하는 작업을 쉽게 만들어주는 라이브러리입니다.
                    </p>
                </section>

                {/* <!-- 코드 예제 --> */}
                <section id="basic-usage" className="mt-12">
                    <h2 className="text-2xl font-bold mb-6">기본 사용법</h2>
                    <div className="bg-[#1a1a1a] rounded-lg p-6 mb-6 overflow-x-auto border border-gray-800">
                        <pre className="text-sm"><code>{code_content}</code></pre>
                    </div>
                </section>
            </article>

            {/* <!-- 태그 --> */}
            <div className="mt-12 pt-6 border-t border-gray-800">
                <div className="flex flex-wrap gap-2">
                    {/* <!-- 카테고리 --> */}
                    <a href="/category/react" 
                    className="px-3 py-1 bg-amber-500 text-black rounded-full text-sm hover:bg-amber-400 transition-colors">
                        React
                    </a>
                    {/* <!-- 태그들 --> */}
                    <a href="/tag/상태관리" 
                    className="px-3 py-1 bg-[#1a1a1a] text-gray-300 rounded-full text-sm hover:bg-[#252525] hover:text-amber-500 transition-all">
                        #상태관리
                    </a>
                    <a href="/tag/최적화" 
                    className="px-3 py-1 bg-[#1a1a1a] text-gray-300 rounded-full text-sm hover:bg-[#252525] hover:text-amber-500 transition-all">
                        #최적화
                    </a>
                </div>
            </div>

            {/* <!-- 공유 및 반응 --> */}
            <div className="mt-12 flex justify-between items-center py-6 border-t border-gray-800">
                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] rounded-full hover:bg-gray-800 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span>42</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] rounded-full hover:bg-gray-800 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                        </svg>
                        <span>공유</span>
                    </button>
                </div>
            </div>

            {/* <!-- 이전/다음 글 --> */}
            <nav className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
                <a href="#" className="p-4 bg-[#111111] rounded-lg hover:bg-[#1a1a1a] transition-colors border border-gray-800">
                    <span className="text-sm text-gray-400">이전 글</span>
                    <p className="font-medium mt-1">React 성능 최적화 전략</p>
                </a>
                <a href="#" className="p-4 bg-[#111111] rounded-lg hover:bg-[#1a1a1a] transition-colors border border-gray-800 text-right">
                    <span className="text-sm text-gray-400">다음 글</span>
                    <p className="font-medium mt-1">TypeScript 고급 타입 시스템</p>
                </a>
            </nav>

            {/* <!-- 댓글 섹션 --> */}
            <section className="mt-12 pt-12 border-t border-gray-800">
                <h2 className="text-xl font-bold mb-8">댓글 <span className="text-gray-400 text-sm">3개</span></h2>
                {/* <!-- 댓글 입력 --> */}
                <div className="mb-8">
                    <textarea
                        className="w-full p-4 bg-[#111111] rounded-lg border border-gray-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                        rows={3}
                        placeholder="댓글을 작성하세요..."
                    ></textarea>
                    <div className="mt-2 flex justify-end">
                        <button className="px-4 py-2 bg-amber-500 text-black rounded-lg hover:bg-amber-400 transition-colors">
                            댓글 작성
                        </button>
                    </div>
                </div>
                {/* <!-- 댓글 목록 --> */}
                <div className="space-y-6">
                    <article className="flex gap-4">
                        <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2">
                                <span className="font-medium">사용자</span>
                                <span className="text-sm text-gray-400">2024-11-02</span>
                            </div>
                            <p className="text-gray-300">
                                정말 유익한 글이네요. React Query를 도입하고 나서 서버 상태 관리가 훨씬 편해졌습니다.
                            </p>
                            <div className="flex items-center gap-4 text-sm">
                                <button className="text-gray-400 hover:text-amber-500">답글</button>
                                <button className="text-gray-400 hover:text-amber-500">좋아요</button>
                            </div>
                        </div>
                    </article>
                </div>
            </section>
        </main>

        <Footer />
    </div>
    )
}