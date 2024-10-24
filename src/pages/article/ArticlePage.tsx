import React, { useState } from 'react';
import { 
  Calendar, 
  Eye, 
  Heart, 
  Share2, 
  MessageSquare, 
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Copy
} from 'lucide-react';

const ArticlePage = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // 목차 데이터 예시
  const tableOfContents = [
    { id: 'section-1', title: '소개', level: 1 },
    { id: 'section-1-1', title: '배경', level: 2 },
    { id: 'section-1-2', title: '목적', level: 2 },
    { id: 'section-2', title: '주요 내용', level: 1 },
    { id: 'section-2-1', title: '기술 스택', level: 2 },
    { id: 'section-2-2', title: '아키텍처', level: 2 },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* 메인 콘텐츠 영역 */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 왼쪽 사이드바 - 목차 */}
          <aside className="lg:w-64 hidden lg:block">
            <div className="sticky top-24 bg-gray-800 rounded-lg p-6">
              <h2 className="text-lg font-bold mb-4">목차</h2>
              <nav>
                <ul className="space-y-2">
                  {tableOfContents.map((item) => (
                    <li 
                      key={item.id}
                      className={`hover:text-white transition-colors ${
                        item.level === 1 ? '' : 'ml-4'
                      }`}
                    >
                      <a 
                        href={`#${item.id}`}
                        className={`text-gray-400 hover:text-white block ${
                          item.level === 1 ? 'font-medium' : 'text-sm'
                        }`}
                      >
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>

          {/* 메인 콘텐츠 */}
          <main className="flex-1 max-w-4xl">
            {/* 게시물 헤더 */}
            <header className="mb-8">
              {/* 카테고리 & 태그 */}
              <div className="flex gap-4 mb-4">
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                  Development
                </span>
                <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">
                  React
                </span>
                <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">
                  Next.js
                </span>
              </div>

              {/* 제목 */}
              <h1 className="text-4xl font-bold mb-4">
                게시물 제목이 여기에 표시됩니다
              </h1>

              {/* 메타 정보 */}
              <div className="flex flex-wrap items-center gap-6 text-gray-400 text-sm">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  2024년 10월 25일
                </div>
                <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-2" />
                  1,234
                </div>
                <div className="flex items-center">
                  <Heart className="w-4 h-4 mr-2" />
                  42
                </div>
                <div className="flex items-center">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  13
                </div>
              </div>
            </header>

            {/* 본문 콘텐츠 */}
            <article className="prose prose-invert prose-lg max-w-none mb-12">
              {/* 실제 마크다운 콘텐츠가 여기에 렌더링됩니다 */}
              <p>게시물 내용이 여기에 표시됩니다...</p>
            </article>

            {/* 액션 버튼 */}
            <div className="flex justify-center gap-4 mb-12">
              <button 
                onClick={() => setIsLiked(!isLiked)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
                  isLiked 
                    ? 'bg-pink-600 text-white' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                좋아요
              </button>
              <button 
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
                  isBookmarked 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
                북마크
              </button>
              <button 
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors"
                onClick={() => {/* 공유 기능 구현 */}}
              >
                <Share2 className="w-5 h-5" />
                공유하기
              </button>
            </div>

            {/* 작성자 정보 */}
            <div className="bg-gray-800 rounded-lg p-6 mb-12">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gray-600"></div>
                <div>
                  <h3 className="text-lg font-bold">작성자 이름</h3>
                  <p className="text-gray-400">작성자 소개글이 들어갑니다.</p>
                </div>
              </div>
            </div>

            {/* 이전/다음 게시물 */}
            <nav className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
              <a href="#" className="group bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors">
                <div className="flex items-center text-sm text-gray-400 mb-2">
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  이전 게시물
                </div>
                <h4 className="font-medium group-hover:text-white transition-colors">이전 게시물 제목</h4>
              </a>
              <a href="#" className="group bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors text-right">
                <div className="flex items-center justify-end text-sm text-gray-400 mb-2">
                  다음 게시물
                  <ChevronRight className="w-4 h-4 ml-1" />
                </div>
                <h4 className="font-medium group-hover:text-white transition-colors">다음 게시물 제목</h4>
              </a>
            </nav>

            {/* 댓글 섹션 */}
            <section>
              <h2 className="text-2xl font-bold mb-6">댓글 13개</h2>
              
              {/* 댓글 작성 폼 */}
              <div className="bg-gray-800 rounded-lg p-4 mb-6">
                <textarea 
                  className="w-full bg-gray-700 rounded-lg p-4 text-gray-100 mb-4"
                  rows={3}
                  placeholder="댓글을 작성해주세요"
                ></textarea>
                <div className="flex justify-end">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    댓글 작성
                  </button>
                </div>
              </div>

              {/* 댓글 목록 */}
              <div className="space-y-6">
                {/* 댓글 아이템 */}
                <article className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gray-600"></div>
                    <div>
                      <h4 className="font-medium">댓글 작성자</h4>
                      <span className="text-sm text-gray-400">2시간 전</span>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-3">
                    댓글 내용이 여기에 표시됩니다.
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <button className="hover:text-white transition-colors">답글</button>
                    <button className="hover:text-white transition-colors">좋아요</button>
                  </div>
                </article>
              </div>
            </section>
          </main>

          {/* 오른쪽 사이드바 - 추천 게시물 */}
          <aside className="lg:w-80 hidden lg:block">
            <div className="sticky top-24 bg-gray-800 rounded-lg p-6">
              <h2 className="text-lg font-bold mb-4">추천 게시물</h2>
              <div className="space-y-4">
                <a href="#" className="block group">
                  <article className="p-4 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
                    <h3 className="font-medium mb-2 group-hover:text-white transition-colors">
                      추천 게시물 제목
                    </h3>
                    <div className="flex items-center text-sm text-gray-400">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>2024.10.24</span>
                    </div>
                  </article>
                </a>
                {/* 추가 추천 게시물... */}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;