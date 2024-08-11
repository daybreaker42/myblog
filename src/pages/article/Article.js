import React, { useEffect, useState } from 'react';
import Nav from 'components/nav/Nav';
import { useParams } from 'react-router-dom';

import './Article.css';
import './components/Profile.css';
import './components/ArticleIndex.css';
import Footer from 'components/footer/Footer';

import { ReactComponent as ArrowIcon } from 'assets/icons/arrow_forward.svg';
import { ReactComponent as LinkIcon } from 'assets/icons/link.svg';
import { ReactComponent as FavoriteIcon } from 'assets/icons/favorite.svg';
import { ReactComponent as ChatIcon } from 'assets/icons/chat.svg';
import { ReactComponent as CheckIcon } from 'assets/icons/check.svg';

const articleMockupData = {
    id: 1,
    title: '제목',
    content: `시맨틱 HTML 요소들은 문서의 구조를 명확하게 정의하고, 검색 엔진이 페이지의 내용을 더 잘 이해하도록 돕습니다. 주요 시맨틱 HTML 요소들과 그 역할은 다음과 같습니다:
<header>:
역할: 페이지나 섹션의 머리글을 정의합니다. 로고, 네비게이션 메뉴, 검색 창 등을 포함할 수 있습니다.
SEO 기여: 검색 엔진이 페이지의 주요 내용과 구조를 이해하는 데 도움을 줍니다.
<nav>:
역할: 네비게이션 링크를 포함하는 영역을 정의합니다. 사이트 내의 주요 링크나 메뉴를 포함합니다.
SEO 기여: 검색 엔진이 사이트의 주요 링크 구조를 이해하도록 도와, 사이트 크롤링 효율성을 높입니다.
<main>:
역할: 문서의 주요 콘텐츠를 포함합니다. 한 페이지에 하나의 <main> 태그만 있어야 합니다.
SEO 기여: 검색 엔진이 문서의 주요 콘텐츠를 빠르게 파악할 수 있도록 도와줍니다.
<article>:

역할: 독립적으로 배포되거나 재사용 가능한 콘텐츠를 정의합니다. 블로그 포스트, 뉴스 기사, 포럼 게시물 등에 사용됩니다.
SEO 기여: 검색 엔진이 개별 콘텐츠를 인식하고 인덱싱하는 데 도움을 줍니다.
<section>:

역할: 문서의 일반적인 섹션을 정의합니다. 제목과 함께 사용하여 문서의 주요 주제를 나눕니다.
SEO 기여: 문서의 주제를 명확하게 구분하고, 검색 엔진이 각 섹션의 내용을 이해하도록 도와줍니다.
<aside>:

역할: 본문과 관련된 부차적인 콘텐츠를 포함합니다. 사이드바, 광고, 링크 모음 등을 포함할 수 있습니다.
SEO 기여: 검색 엔진이 주요 콘텐츠와 부차적 콘텐츠를 구분하는 데 도움을 줍니다.
<footer>:

역할: 페이지나 섹션의 바닥글을 정의합니다. 저작권 정보, 연락처 정보, 링크 등을 포함할 수 있습니다.
SEO 기여: 검색 엔진이 페이지의 맥락과 추가 정보를 이해하는 데 도움을 줍니다.
<figure>와 <figcaption>:

역할: 이미지, 다이어그램, 삽화 등의 콘텐츠를 설명하는데 사용됩니다. <figcaption>은 그 설명을 제공합니다.
SEO 기여: 이미지나 미디어 콘텐츠의 의미를 명확히 하여, 검색 엔진이 콘텐츠를 더 잘 이해하고 인덱싱할 수 있도록 도와줍니다.

`,
    writer: {
        name: '성준 한',
        introduction: '안녕하세요! 프론트엔드 개발자 한성준입니다. HTML, CSS, JavaScript를 주로 다루며, React, Vue.js, Angular 등의 프레임워크도 사용합니다. 새로운 기술을 배우고, 다른 개발자들과 소통하는 것을 즐깁니다. 함께 성장하고 싶은 개발자분들은 언제든지 연락주세요!',
    },
    createdAt: '2024-10-11',
    readingTime: {
        time: 5,
        unit: '분'
    },
    comments: [
        {
            id: 1,
            content: `제목학원이란 2040년까지 흥할 줄 알았지만, 그러지 못했던 비운의 사이트이다. 어떤 사진을 올리면 그것에 대한 재밌는 제목을 댓글로 짓는 사이트인데 지금 봐도 제법 잘 쓴 제목들이 많다. 필자는 여기서...`,
            writer: '댓글 작성자',
            createdAt: '댓글 작성일'
        }
    ],
    relatedArticles: [
        {
            id: 2,
            title: '제목2',
            writer: '작성자2',
            createdAt: '작성일2'
        }
    ]
};


const Article = () => {
    const { id } = useParams();
    // const editor = new toastui.Editor({
    //     el: document.querySelector('#editor'),
    //     previewStyle: 'vertical',
    //     height: '500px',
    //     initialEditType: 'wysiwyg',
    //     // initialValue: content
    // });
    let article = articleMockupData;

    useEffect(() => {
        // fetch article by id
        // fetch(`/api/articles/${id}`)
        //     .then(res => res.json())
        //     .then(data => {
        //         console.log(data);
        //         editor.setMarkdown(data.content);
        //     });
        // editor.setMarkdown(article.content);
    }, [id]);

    // 공유하기 눌렀는지 체크
    const [isShareClicked, setIsShareClicked] = useState(false);

    // share hover시 .link-icon 색상 변경
    // const share = document.querySelector('.share');
    // share.addEventListener('mouseover', () => {
    //     const linkIcon = document.querySelector('.link-icon');
    //     linkIcon.style.fill = '#838383';
    //     console.log(`hover`);
    // });

    return (
        <>
            <header className="App-header">
                <Nav />
            </header>
            <main>
                {/* 아티클 상단 부분 */}
                <section className='article-header'>
                    {/* 왼쪽 공간 여백 설정 */}
                    <div style={{ width: '220px' }}></div>
                    <section className="article-title">
                        <h1 className="title">{article?.title}</h1>
                        <section className="article-info">
                            <span className="writer">{article?.writer?.name}</span>
                            <span className="createdAt">{article?.createdAt}</span>
                            <section className="readingTime">
                                <span className="time">{article?.readingTime?.time}</span>
                                <span className="unit">{article?.readingTime?.unit}</span>
                            </section>
                        </section>
                        <section className="article-tags">
                            <a href='#'><span className="tag">tag1</span></a>
                            <a href='#'><span className="tag">tag2</span></a>
                            <a href='#'><span className="tag">tag3</span></a>
                        </section>
                    </section>
                    {/* 아티클 상단 우측 버튼들 */}
                    <section className="article-options">
                        <button className="edit">수정</button>
                        <button className="delete">삭제</button>
                    </section>
                </section>

                {/* 아티클 중단 부분 */}
                <section className='article-body'>
                    {/* <aside className='category-others</section>'></aside> */}
                    <div style={{ width: '210px' }}></div>
                    <section className="article-content">
                        <pre>{article.content}</pre>
                    </section>
                    <section className='article-index'>
                        <span>목차</span>
                        <ul>
                            <li className='h1-index'><a href='#hello'>h1 제목</a></li>
                            <li className='h2-index'><a href='#'>h2 제목</a></li>
                            <li className='h3-index'><a href='#'>h3 제목</a></li>
                            <li className='h1-index'><a href='#hello'>h1 제목</a></li>
                            <li className='h2-index'><a href='#'>h2 제목</a></li>
                            <li className='h3-index'><a href='#'>h3 제목</a></li>
                            <li className='h1-index'><a href='#hello'>h1 제목</a></li>
                            <li className='h2-index'><a href='#'>h2 제목</a></li>
                            <li className='h3-index'><a href='#'>h3 제목</a></li>
                            <li className='h1-index'><a href='#hello'>h1 제목</a></li>
                            <li className='h2-index'><a href='#'>h2 제목</a></li>
                            <li className='h3-index'><a href='#'>h3 제목</a></li>
                            <li className='h1-index'><a href='#hello'>그럼 조금 긴 제목은 어떻게 될까?</a></li>
                            <li className='h2-index'><a href='#'>h2 제목</a></li>
                            <li className='h3-index'><a href='#'>h3 제목</a></li>

                        </ul>
                    </section>
                </section>

                {/* 아티클 하단 부분 */}
                <section className='article-footer'>
                    {/* 작성자 프로필 및 반응 */}
                    <section className="writer-profile-reaction-section">
                        <section className='profile-header'>
                            <h2>읽어주셔서 감사합니다!</h2>
                            <p>이 글이 마음에 드셨나요? 좋아요와 댓글로 응원해 주세요!</p>
                        </section>
                        <section className='profile-body'>
                            <section className='profile'>
                                <img src='https://avatars.githubusercontent.com/u/36643295?v=4' alt='profile img' />
                                <section className='info'>
                                    <section className='name'>
                                        <span>{article?.writer?.name}</span>
                                        <ArrowIcon className='arrow-forward' />
                                    </section>
                                    <span className='introduction'>
                                        {article?.writer?.introduction}
                                    </span>
                                </section>
                            </section>
                            <section className='reaction'>
                                <section className='like-comment'>
                                    <button className='like'>
                                        <FavoriteIcon className='favorite-icon' />
                                        <span>좋아요</span>
                                    </button>
                                    <button className='comment'>
                                        <ChatIcon className='chat-icon' />
                                        <span>댓글</span>
                                    </button>
                                </section>

                                <a className='share' href='https://fclipse.github.io/articles/first-blog-upload' onClick={
                                    (e) => {
                                        e.preventDefault();
                                        navigator.clipboard.writeText('https://fclipse.github.io/articles/first-blog-upload');
                                        setIsShareClicked(true);
                                    }
                                }>
                                    {!isShareClicked ? <LinkIcon className='link-icon' /> : <CheckIcon className='link-icon' />}

                                    <span>
                                        https://fclipse.github.io/articles/first-blog-upload
                                    </span>
                                </a>
                            </section>
                        </section>

                    </section>
                    <section className="reaction">반응</section>
                    {/* 추천 게시물 및 댓글 */}
                    <section className="recommand-articles">추천 게시물들</section>
                    {/* 카테고리 다른 게시물 */}
                    <section className="category-others">다른 게시물들</section>
                    {/* 댓글창 */}
                    <section className="comment">댓글창</section>
                    <section className="comment-form">댓글 작성창</section>
                </section>

                {/* footer */}
                <Footer />
            </main >
            <aside>
                <section className="controllPanel"></section>
                <section className="articleIndex"></section>
            </aside>
            <footer></footer>
        </>
    );
}

export default Article;