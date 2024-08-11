
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';
import { getArticlesByCategory } from 'api/article';

import './ArticleCardScroll.css';

const sectionData = {
    name: 'section',
    articles: [
        {
            id: 1,
            title: '제목2',
            content: `제목학원이란 2040년까지 흥할 줄 알았지만, 그러지 못했던 비운의 사이트이다. 어떤 사진을 올리면 그것에 대한 재밌는 제목을 댓글로 짓는 사이트인데 지금 봐도 제법 잘 쓴 제목들이 많다. 필자는 여기서...`,
            writer: '작성자2',
            createdAt: '2024-10-11',
            readingTime: {
                time: 5,
                unit: '분'
            },
            commentCnt: 1,
            likesCnt: 3,
            viewCnt: 10
        },
        {
            id: 2,
            title: '제목2',
            content: `제목학원이란 2040년까지 흥할 줄 알았지만, 그러지 못했던 비운의 사이트이다. 어떤 사진을 올리면 그것에 대한 재밌는 제목을 댓글로 짓는 사이트인데 지금 봐도 제법 잘 쓴 제목들이 많다. 필자는 여기서...`,
            writer: '작성자2',
            createdAt: '2024-10-11',
            readingTime: {
                time: 5,
                unit: '분'
            },
            commentCnt: 1,
            likesCnt: 3,
            viewCnt: 10
        },
        {
            id: 3,
            title: '제목2',
            content: `제목학원이란 2040년까지 흥할 줄 알았지만, 그러지 못했던 비운의 사이트이다. 어떤 사진을 올리면 그것에 대한 재밌는 제목을 댓글로 짓는 사이트인데 지금 봐도 제법 잘 쓴 제목들이 많다. 필자는 여기서...`,
            writer: '작성자2',
            createdAt: '2024-10-11',
            readingTime: {
                time: 5,
                unit: '분'
            },
            commentCnt: 1,
            likesCnt: 3,
            viewCnt: 10
        },

    ]
}

const ArticleCardScroll = ({ sectionName }) => {
    // TODO: getFunction을 이용해서 데이터를 가져오도록 수정
    // sectionName에 따라 다른 데이터를 가져오도록 설정
    // const { data, error, isLoading } = useQuery(['section', sectionName], async () => await getFunction(sectionName));

    // if (isLoading) return <div>Loading...</div>;
    // if (error) return <div>Error...</div>;

    let data = sectionData;

    return (
        <section className='article-scroll'>
            <span className='section-title'>{data.name} ({data.articles.length})</span>
            <section className='articles scrollbar'>
                {data.articles.map(article => (
                    <Link to={`/article/${article.id}`} className="card" key={article.id}>
                        <section className="card-header">
                            <h5 className="card-title">{article.title}</h5>
                            <p className="card-text">{article.content}</p>
                        </section>
                        <section className="card-meta">
                            <section className="card-info">
                                <span>조회수 {article.viewCnt}</span>
                                <span>댓글 {article.commentCnt}</span>
                                <span>{article.readingTime.time}{article.readingTime.unit}</span>
                            </section>
                            <span>{article.createdAt}</span>
                        </section>
                    </Link >
                ))}
            </section>
        </section>
    );
}

export default ArticleCardScroll;