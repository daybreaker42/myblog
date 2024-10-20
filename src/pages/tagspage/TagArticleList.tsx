import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
// model imports

import config from "config";
// components
import Nav from "components/nav/Nav";
import styles from "./TagsPage.module.css";
// utils
import { FILTER_OPTIONS } from "./common/tagFilterOptions";
// styles
import categoryStyle from "pages/categorypage/CategoryPage.module.css";
import { supabase } from "utils/supabase";
import { ArticleWithCategory } from "models/model";
import ArticleCard from "components/article/ArticleCard";
import Loading from "components/loading/loading/Loading";

/**
 * fetch Articles by Tag Name
 * 1. 태그 이름으로 태그 ID 찾기
 * 2. 태그 ID로 관련 게시글 ID 찾기
 * 3. 찾은 게시글 ID로 모든 게시글 정보 가져오기
 * @param tagName 태그 이름
 */
async function getArticlesByTagName(tagName: string) {
    try {
        // 1. 태그 이름으로 태그 ID 찾기
        const { data: tagData, error: tagError } = await supabase
        .from('tags')
        .select('id')
        .eq('name', tagName)
        .single();

        if (tagError) throw tagError;
        if (!tagData) throw new Error('Tag not found');

        const tagId = tagData.id;
        // console.log(`tagId - ${tagId}`);
        
        // 2. 태그 ID로 관련 게시글 ID 찾기
        const { data: articleIds, error: articleIdError } = await supabase
        .from('article_tags')
        .select('article_id')
        .eq('tags_id', tagId);

        if (articleIdError) throw articleIdError;
        // console.log(`articleIds - ${articleIds}`);
    
        // 3. 찾은 게시글 ID로 모든 게시글 정보 가져오기
        const { data: articles, count, error: articlesError } = await supabase
        .from('article')
        .select(ArticleWithCategory.getArticleDefaultColumns(), { count: 'exact' })
        .in('id', articleIds.map(item => item.article_id));

        if (articlesError) throw articlesError;
        // console.log(`articles - ${articles}`);

        const parsedData = (articles || []).map((article: any) => new ArticleWithCategory(article));
        return {articles: parsedData, count};
    } catch (error) {
        console.error('Error fetching articles by tag name:', error);
        throw error;
    }
  }
  
  

/**
 * TagArticleList Page
 * 해당 Tag에 대한 Article List를 보여주는 페이지
 */
const TagArticleList = () => {
    const {tag = 'not-found'} = useParams();
    const { data, isPending, isError, error } = useQuery({
        queryKey: ['tag', tag],
        // queryFn: () => fetchData({ tagName: tag }),
        queryFn: () => getArticlesByTagName(tag),
        placeholderData: keepPreviousData,
    });
    console.log(`tagName - ${tag}`);
    
    if (isPending) {
        return <Loading />;
    }
    if (isError) {
        return <div>Error: {error.message}</div>;
    }
    if(!data){
        return <div>No data</div>;
    }

    return (
        <div className={categoryStyle['root']}>
            <Helmet>
                <title>Tags | {`${config.appName}`}</title>
                <meta name='description' content='Tags page' />
            </Helmet>
            <header className="App-header">
                <Nav />
            </header>
            <main className={categoryStyle['page']}>
                <div>
                    {/* 공지용 부분 */}
                </div>
                <section className={categoryStyle['body']}>
                    <header className={`${categoryStyle['head']} ${categoryStyle['item-2']}`}>
                        <h1># {tag}</h1>
                        <span className={categoryStyle['dash']}></span>
                        <span className={categoryStyle['count']}>{data.count}개</span>
                    </header>
                    <div className={categoryStyle['item-5']}>
                        <ul className={styles['tags-list']}>
                            {data.articles.map((article, index) => (
                                <ArticleCard key={index} article={article} />
                            ))}
                        </ul>
                    </div>
                </section>
            </main>
        </div>
    )
};

export default TagArticleList;