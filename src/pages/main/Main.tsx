import React from 'react';
import { Github, Search, Moon, Sun, Menu, X, BookMarked, Flame, Clock, Heart, MessageSquare, Eye, BarChart2, Mail, Bug } from 'lucide-react';
import { useState, useEffect } from 'react';
import Nav from 'components/nav/Nav';

const BlogMainPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [popularSort, setPopularSort] = useState('views');
  const [visitorCount, setVisitorCount] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // 방문자 수 증가 시뮬레이션
  useEffect(() => {
    setVisitorCount(12345);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Nav isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      {/* Main Content */}
      <div className="pt-16 flex min-h-screen flex-col">
        <div className="flex flex-1">
          {/* Aside */}
          <aside className="hidden lg:block w-64 fixed h-full bg-gray-800 p-4 border-r border-gray-700 overflow-y-auto">
            {/* Profile Section */}
            <div className="mb-8">
              <div className="w-20 h-20 rounded-full bg-gray-600 mx-auto mb-4 hover:opacity-90 transition-opacity cursor-pointer"></div>
              <h2 className="text-center font-bold mb-2">Blog Author</h2>
              <div className="flex justify-center">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Github className="w-6 h-6" />
                </a>
              </div>
            </div>

            {/* GitHub Contribution Graph */}
            <div className="mb-8 p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
              <h3 className="font-semibold mb-2">GitHub Activity</h3>
              <div className="h-32 bg-gray-600 rounded"></div>
            </div>

            {/* Visitor Counter */}
            <div className="mb-8 p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-2" />
                  <span className="text-sm">총 방문자 수</span>
                </div>
                <span className="font-bold">{visitorCount.toLocaleString()}</span>
              </div>
            </div>

            {/* Blog Stats */}
            <div className="mb-8 p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
              <h3 className="font-semibold mb-2 flex items-center">
                <BarChart2 className="w-4 h-4 mr-2" />
                블로그 통계
              </h3>
              <ul className="text-sm text-gray-300">
                <li className="flex justify-between items-center mb-2">
                  <span>전체 포스트</span>
                  <span>123개</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>총 댓글</span>
                  <span>456개</span>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h3 className="font-semibold mb-4">Categories</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    Development
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Projects
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                    Thoughts
                  </a>
                </li>
              </ul>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 lg:ml-64 p-8">
            {/* Pinned Posts */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <BookMarked className="w-6 h-6 mr-2" />
                <h2 className="text-2xl font-bold">공지사항</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-gray-500 transition-colors cursor-pointer">
                  <h3 className="font-bold mb-2 hover:text-blue-400">블로그 소개</h3>
                  <p className="text-gray-400">기술 블로그 소개 및 운영 방향</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-gray-500 transition-colors cursor-pointer">
                  <h3 className="font-bold mb-2 hover:text-blue-400">프로젝트 진행상황</h3>
                  <p className="text-gray-400">현재 진행중인 프로젝트 목록</p>
                </div>
              </div>
            </section>

            {/* Popular Posts */}
            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <Flame className="w-6 h-6 mr-2" />
                  <h2 className="text-2xl font-bold">인기 게시물</h2>
                </div>
                <div className="flex space-x-2">
                  <button 
                    className={`px-3 py-1 rounded transition-colors ${popularSort === 'views' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-700 hover:bg-gray-600'}`}
                    onClick={() => setPopularSort('views')}
                  >
                    조회수
                  </button>
                  <button 
                    className={`px-3 py-1 rounded transition-colors ${popularSort === 'likes' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-700 hover:bg-gray-600'}`}
                    onClick={() => setPopularSort('likes')}
                  >
                    좋아요
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                <article className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-gray-500 transition-colors cursor-pointer">
                  <h3 className="font-bold mb-2 hover:text-blue-400">인기 게시물 제목</h3>
                  <p className="text-gray-400 mb-4">게시물 내용 미리보기...</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="flex items-center mr-4">
                      <Heart className="w-4 h-4 mr-1" /> 42
                    </span>
                    <span>조회수 1,234</span>
                  </div>
                </article>
              </div>
            </section>

            {/* Recent Posts */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <Clock className="w-6 h-6 mr-2" />
                <h2 className="text-2xl font-bold">최근 게시물</h2>
              </div>
              <div className="space-y-4">
                <article className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-gray-500 transition-colors cursor-pointer">
                  <h3 className="font-bold mb-2 hover:text-blue-400">최근 게시물 제목</h3>
                  <p className="text-gray-400 mb-4">게시물 내용 미리보기...</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="mr-4">2024.10.25</span>
                    <span className="flex items-center mr-4">
                      <Heart className="w-4 h-4 mr-1" /> 15
                    </span>
                    <span>조회수 234</span>
                  </div>
                </article>
              </div>
            </section>

            {/* Recent Comments */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <MessageSquare className="w-6 h-6 mr-2" />
                <h2 className="text-2xl font-bold">최근 댓글</h2>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-gray-500 transition-colors">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 rounded-full bg-gray-600 mr-2"></div>
                    <span className="font-medium">사용자</span>
                    <span className="text-gray-400 text-sm ml-2">2시간 전</span>
                  </div>
                  <p className="text-gray-300">댓글 내용입니다...</p>
                  <a href="#" className="text-sm text-blue-400 hover:text-blue-300 transition-colors mt-2 inline-block">
                    게시물로 이동 →
                  </a>
                </div>
              </div>
            </section>
          </main>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

const Footer = () => {
    return (
      <footer className="lg:ml-64 bg-gray-800 border-t border-gray-700 py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Blog Info */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-white">Tech Blog</h3>
              <p className="text-gray-400 mb-4">개발자의 기술 블로그입니다. 개발 경험과 지식을 공유합니다.</p>
              <div className="flex items-center text-gray-400">
                <span className="mr-2">Version</span>
                <span className="px-2 py-1 bg-gray-700 rounded text-xs">v1.0.0</span>
              </div>
            </div>
  
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                    홈
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                    프로젝트
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></span>
                    소개
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                    <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-2"></span>
                    아카이브
                  </a>
                </li>
              </ul>
            </div>
  
            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Contact & Support</h3>
              <ul className="space-y-3">
                <li>
                  <a href="mailto:example@email.com" 
                     className="text-gray-400 hover:text-white transition-colors flex items-center group">
                    <Mail className="w-4 h-4 mr-2 group-hover:text-blue-400" />
                    example@email.com
                  </a>
                </li>
                <li>
                  <a href="#" 
                     className="text-gray-400 hover:text-white transition-colors flex items-center group">
                    <Github className="w-4 h-4 mr-2 group-hover:text-blue-400" />
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="#" 
                     className="text-gray-400 hover:text-white transition-colors flex items-center group">
                    <Bug className="w-4 h-4 mr-2 group-hover:text-red-400" />
                    버그 제보
                  </a>
                </li>
              </ul>
            </div>
  
            {/* License */}
            <div>
                <h3 className="text-lg font-semibold mb-4 text-white">Open Source Licenses</h3>
                <ul className="space-y-3">
                <li>
                    <a href="#" 
                    className="text-gray-400 hover:text-white transition-colors flex items-center group">
                    <div className="w-5 h-5 mr-2 flex items-center justify-center text-blue-400">
                        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                        <path d="M12 13.5C11.6022 13.5 11.2206 13.342 10.9393 13.0607C10.658 12.7794 10.5 12.3978 10.5 12C10.5 11.6022 10.658 11.2206 10.9393 10.9393C11.2206 10.658 11.6022 10.5 12 10.5C12.3978 10.5 12.7794 10.658 13.0607 10.9393C13.342 11.2206 13.5 11.6022 13.5 12C13.5 12.3978 13.342 12.7794 13.0607 13.0607C12.7794 13.342 12.3978 13.5 12 13.5ZM12 21.5C7.667 19.575 4.5 15.737 4.5 12C4.5 7.5 7.5 4.5 12 4.5C16.5 4.5 19.5 7.5 19.5 12C19.5 15.737 16.333 19.575 12 21.5Z"/>
                        </svg>
                    </div>
                    <span className="group-hover:text-blue-400 transition-colors">React</span>
                    <span className="ml-2 text-xs text-gray-500">MIT License</span>
                    </a>
                </li>
                <li>
                    <a href="#" 
                    className="text-gray-400 hover:text-white transition-colors flex items-center group">
                    <div className="w-5 h-5 mr-2 flex items-center justify-center text-black bg-white rounded-full">
                        <svg viewBox="0 0 24 24" className="w-3 h-3" fill="currentColor">
                        <path d="M11.5725 0c-.1763 0-.3098.0013-.3584.0067-.0516.0053-.2159.021-.3636.0328-3.4088.3073-6.6017 2.1463-8.624 4.9728C1.1004 6.584.3802 8.3666.1082 10.255c-.0962.659-.108.8537-.108 1.7474s.012 1.0884.108 1.7476c.652 4.506 3.8591 8.2919 8.2087 9.6945.7789.2511 1.6.4223 2.5337.5255.3636.0395.7212.0716 1.0322.0913.3109.0197.3163.0203 1.0003.0203 1.0565 0 1.7032-.0584 2.9166-.2697 1.5651-.2724 3.0051-.9464 4.2365-1.9824 1.3305-1.1194 2.4115-2.5764 3.0541-4.1276l.0739-.1819.0705-.1764.0107-.0435c.1232-.5789.1232-1.1952.0107-1.7654l-.0705-.1763-.0739-.1819c-.6426-1.5512-1.7237-3.0082-3.0541-4.1276-1.2314-1.036-2.6714-1.71-4.2365-1.9824-1.2134-.2113-1.86-.2697-2.9166-.2697-.3198 0-.3621 0-.4207-.0024a11.6003 11.6003 0 00-.5326-.0168h-.0107c-.0763 0-.1566.0024-.2321.0024-.0107 0-.0201-.0024-.0308-.0024z"/>
                        </svg>
                    </div>
                    <span className="group-hover:text-black transition-colors">Next.js</span>
                    <span className="ml-2 text-xs text-gray-500">MIT License</span>
                    </a>
                </li>
                <li>
                    <a href="#" 
                    className="text-gray-400 hover:text-white transition-colors flex items-center group">
                    <div className="w-5 h-5 mr-2 flex items-center justify-center text-cyan-400">
                        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                        <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/>
                        </svg>
                    </div>
                    <span className="group-hover:text-cyan-400 transition-colors">Tailwind CSS</span>
                    <span className="ml-2 text-xs text-gray-500">MIT License</span>
                    </a>
                </li>
                </ul>
                <button 
                className="mt-4 w-full py-2 px-4 bg-gray-700 hover:bg-gray-600 transition-colors rounded-md text-sm text-gray-300 hover:text-white flex items-center justify-center group"
                onClick={() => {/* 라이선스 모달 또는 페이지로 이동 */}}
                >
                더 많은 라이선스 보기
                <svg 
                    className="w-4 h-4 ml-1 transform group-hover:translate-x-0.5 transition-transform" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                </button>
            </div>
            </div>
  
          {/* Sub Footer */}
          <div className="mt-12 pt-8 border-t border-gray-700">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              {/* Copyright */}
              <div className="text-gray-400 text-sm">
                © 2024 Your Blog Name. All rights reserved.
              </div>
              
              {/* Additional Links */}
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Sitemap
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  };

export default BlogMainPage;