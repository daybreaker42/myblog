import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Calendar, 
  Eye, 
  Heart, 
  Share2, 
  MessageSquare, 
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Copy,
  Home
} from 'lucide-react';

const BlogPostPage = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showCopyToast, setShowCopyToast] = useState(false);
  const location = useLocation();
  
  // URL에서 slug 추출
  const slug = location.pathname.split('/article/')[1];

  // 게시물 데이터 예시 (실제로는 slug를 기반으로 데이터를 가져옴)
  const post = {
    title: "게시물 제목이 여기에 표시됩니다",
    category: { id: 1, name: "Development" },
    tags: [
      { id: 1, name: "React" },
      { id: 2, name: "Next.js" }
    ],
    date: "2024년 10월 25일",
    views: 1234,
    likes: 42,
    comments: 13
  };

  // 링크 복사 함수
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/article/${slug}`);
      setShowCopyToast(true);
      setTimeout(() => setShowCopyToast(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

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
      {/* 상단 네비게이션 바 */}
      <nav className="fixed top-0 left-0 right-0 bg-gray-800 border-b border-gray-700 z-50">
        <div className="max-w-full mx-auto px-4">
          <div className="flex items-center h-16">
            <Link 
              to="/"
              className="flex items-center text-gray-300 hover:text-white transition-colors"
            >
              <Home className="w-5 h-5 mr-2" />
              <span className="font-medium">Tech Blog</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* 메인 콘텐츠 영역 */}
      <div className="max-w-full mx-auto px-4 pt-20">
        <div className="flex flex-col lg:flex-row gap-8 justify-center">
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
                      <Link 
                        to={`#${item.id}`}
                        className={`text-gray-400 hover:text-white block ${
                          item.level === 1 ? 'font-medium' : 'text-sm'
                        }`}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>

          {/* 메인 콘텐츠 */}
          <main className="flex-1 max-w-5xl">
            {/* 게시물 헤더 */}
            <header className="mb-8">
              {/* 카테고리 & 태그 */}
              <div className="flex gap-4 mb-4">
                <Link 
                  to={`/category/${post.category.id}`}
                  className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm hover:bg-blue-600 transition-colors"
                >
                  {post.category.name}
                </Link>
                {post.tags.map(tag => (
                  <Link
                    key={tag.id}
                    to={`/tag/${tag.id}`}
                    className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm hover:bg-gray-600 transition-colors"
                  >
                    {tag.name}
                  </Link>
                ))}
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
              {Array.from({ length: 10 }).map((_, index) => (
                <div key={index} className="mb-6">
                  <h2 id={`section-${index + 1}`} className="text-3xl font-bold mb-4">
                    섹션 제목
                  </h2>
                  <p>
                    섹션 내용이 여기에 표시됩니다...
                  </p>
                </div>
              ))}
              {/* <p>게시물 내용이 여기에 표시됩니다...</p> */}
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
                onClick={handleShare}
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

            <CommentsSection />
          </main>

          {/* 오른쪽 사이드바 - 추천 게시물 */}
          <aside className="lg:w-80 hidden lg:block">
            <div className="sticky top-24 bg-gray-800 rounded-lg p-6">
              <h2 className="text-lg font-bold mb-4">추천 게시물</h2>
              <div className="space-y-4">
                <Link to="/" className="block group">
                  <article className="p-4 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
                    <h3 className="font-medium mb-2 group-hover:text-white transition-colors">
                      추천 게시물 제목
                    </h3>
                    <div className="flex items-center text-sm text-gray-400">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>2024.10.24</span>
                    </div>
                  </article>
                </Link>
                {/* 추가 추천 게시물... */}
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* 복사 완료 토스트 메시지 */}
      {showCopyToast && (
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg">
          링크가 클립보드에 복사되었습니다
        </div>
      )}
    </div>
  );
};


const CommentsSection = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  
  // 댓글 데이터 예시
  const comments = {
    totalComments: 23,
    totalPages: 3,
    currentPage: 1,
    comments: [
      {
        id: 1,
        author: "홍길동",
        authorId: "hong123",
        content: "메인 댓글 내용입니다.",
        createdAt: "2시간 전",
        likes: 5,
        replies: [
          {
            id: 2,
            author: "김철수",
            authorId: "kim456",
            content: "@hong123 답글 내용입니다.",
            createdAt: "1시간 전",
            likes: 2,
            replyTo: {
              authorId: "hong123",
              author: "홍길동"
            }
          },
          {
            id: 3,
            author: "이영희",
            authorId: "lee789",
            content: "@hong123 두 번째 답글입니다.",
            createdAt: "30분 전",
            likes: 1,
            replyTo: {
              authorId: "hong123",
              author: "홍길동"
            }
          }
        ]
      }
      // ... 더 많은 댓글들
    ]
  };

  // 댓글 작성 폼 컴포넌트
  const CommentForm = ({ replyTo = null, onCancel = null } : { replyTo?: any, onCancel?: any }) => (
    <div className={`bg-gray-800 rounded-lg p-4 ${replyTo ? 'ml-12' : 'mb-6'}`}>
      {replyTo && (
        <div className="text-sm text-gray-400 mb-2">
          @{replyTo.authorId}님께 답글 작성 중
        </div>
      )}
      <textarea 
        className="w-full bg-gray-700 rounded-lg p-4 text-gray-100 mb-4 resize-none"
        rows={3}
        maxLength={1000}
        placeholder={replyTo ? "답글을 작성해주세요" : "댓글을 작성해주세요 (최대 1000자)"}
      ></textarea>
      <div className="flex justify-end gap-2">
        {replyTo && (
          <button 
            onClick={() => onCancel()}
            className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
          >
            취소
          </button>
        )}
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          {replyTo ? '답글 작성' : '댓글 작성'}
        </button>
      </div>
    </div>
  );

  // 댓글 아이템 컴포넌트
  const CommentItem = ({ comment, isReply = false } : { comment: any, isReply: boolean }) => (
    <article className={`bg-gray-800 rounded-lg p-4 ${isReply ? 'ml-12 mt-4' : ''}`}>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-gray-600"></div>
        <div>
          <h4 className="font-medium">{comment.author}</h4>
          <span className="text-sm text-gray-400">{comment.createdAt}</span>
        </div>
      </div>
      <p className="text-gray-300 mb-3">
        {comment.replyTo && (
          <span className="text-blue-400 mr-2">@{comment.replyTo.authorId}</span>
        )}
        {comment.content}
      </p>
      <div className="flex items-center gap-4 text-sm text-gray-400">
        {!isReply && (
          <button 
            onClick={() => setSelectedCommentId(selectedCommentId === comment.id ? null : comment.id)}
            className="hover:text-white transition-colors"
          >
            답글
          </button>
        )}
        <button className="hover:text-white transition-colors flex items-center gap-1">
          <Heart className="w-4 h-4" />
          {comment.likes}
        </button>
      </div>
      
      {/* 답글 작성 폼 */}
      {selectedCommentId === comment.id && (
        <div className="mt-4">
          <CommentForm 
            replyTo={{ authorId: comment.authorId, author: comment.author }}
            onCancel={() => setSelectedCommentId(null)}
          />
        </div>
      )}
      
      {/* 답글 목록 */}
      {comment.replies?.map((reply: { id: React.Key | null | undefined; }) => (
        <CommentItem key={reply.id} comment={reply} isReply={true} />
      ))}
    </article>
  );

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">
        댓글 {comments.totalComments}개
      </h2>
      
      {/* 댓글 작성 폼 */}
      <CommentForm />

      {/* 댓글 목록 */}
      <div className="space-y-6">
        {comments.comments.map(comment => (
          <CommentItem key={comment.id} comment={comment} isReply={false} />
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="flex justify-center mt-8">
        <nav className="flex items-center gap-2">
          <button 
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          {[...Array(comments.totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                currentPage === i + 1
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button 
            onClick={() => setCurrentPage(Math.min(comments.totalPages, currentPage + 1))}
            disabled={currentPage === comments.totalPages}
            className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </nav>
      </div>
    </section>
  );
};



export default BlogPostPage;