import { Article, Category } from "types/type";

// Utility function to process the fetched data
export default function jsonToArticle(data: any[]): Article[] {
    return data.map(article => ({
        id: article.id,
        title: article.title,
        content: article.content,
        description: article.description,
        created_at: article.created_at,
        view_cnt: article.view_cnt,
        like_cnt: article.like_cnt,
        slug: article.slug,
        reading_time: article.reading_time,
        status: article.status,
        category_id: article.category_id,
        is_comment_blocked: article.is_comment_blocked,
        thumbnail_img: article.thumbnail_img,
        time_unit: article.time_unit,
        comment_cnt: article.comment_cnt,
        is_upload_queued: article.is_upload_queued,
        is_pinned: article.is_pinned
    }));
}

export function jsonToCategory(data: any): Category {
    return {
        id: data.id,
        name: data.name,
        articleCnt: data.articleCnt,
        color: data.color,
        totalViewCnt: data.totalViewCnt,
        totalLikeCnt: data.totalLikeCnt,
        thumbnailImg: data.thumbnailImg,
        createdAt: data.createdAt
    };
}