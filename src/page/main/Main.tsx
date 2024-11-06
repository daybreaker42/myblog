import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Article, ArticleStatus, TimeUnit } from "types/type";
import { supabase } from "utils/supabase";
import { ARTICLE_CARD_COLUMNS, PINNED_ARTICLE_COLUMNS, SORT_TYPES } from "utils/constants";

import { ArticleCard } from "components/article/ArticleCard";
import Nav from "components/Nav";
import {ErrorCard} from 'components/error/ErrorCard';
import Pagination from "components/Pagination";
import Footer from "components/Footer";
import PinnedArticleCard from "components/article/PinnedArticleCard";

import { v4 as uuidv4 } from 'uuid';
import jsonToArticle from "utils/jsonConvert";
import PinnedArticleSection from "components/article/PinnedArticleSection";
import ArticleCardSection from "components/article/ArticleCardSection";

/**
 * Main 페이지
 */
export default function Main() {
    const appName = process.env.REACT_APP_SITE_NAME;
    
    

    // const dataNum = 2000;
    // let { data, isFetching, isError, error }: { data: { data: Article[], count: number }, isFetching: boolean, isError: boolean, error: any } = {
    //     data:  {
    //         data: [],
    //         count: dataNum
    //     },
    //     isFetching: false,
    //     isError: false,
    //     error: null
    // }

    // Array.from({ length: dataNum }).map((_, idx: number) => {
    //     data.data.push({
    //         id: idx,
    //         title: `제목 ${idx}`,
    //         description: `설명 ${idx}`,
    //         created_at: new Date(),
    //         reading_time: 5,
    //         view_cnt: 100,
    //         like_cnt: 10,
    //         slug: `slug-${idx}`,
    //         content: `내용 ${idx}`,
    //         status: ArticleStatus.NORMAL,
    //         category_id: 1,
    //         is_comment_blocked: false,
    //         // tags: ['tag1', 'tag2'],
    //         // author_id: 1,
    //         // updated_at: new Date(),
    //         thumbnail_img: 'https://via.placeholder.com/150',
    //         time_unit: TimeUnit.SEC,
    //         comment_cnt: 10,
    //         is_upload_queued: false,
    //         is_pinned: false
    //     });
    // });

    // const processedData = jsonToArticle(data?.data || []);
    // console.log(`processedData[0]: ${JSON.stringify(processedData[0])}`);
    

    return (
    <>
        <Helmet>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Home - {appName}</title>
            <meta name="description" content="성준의 블로그 태그/카테고리 페이지입니다." />
        </Helmet>
        <div className="Main bg-[#0a0a0a] text-gray-200 min-h-screen">
            <header className="bg-[#111111] border-b border-gray-800 sticky top-0 z-50">
                <Nav />
            </header>
            <main className="max-w-4xl mx-auto px-4 py-8">
                <PinnedArticleSection />

                {/* <!-- 게시물 그리드 --> */}
                <ArticleCardSection />
            </main>
            <Footer />
        </div>
    </>
    );
}