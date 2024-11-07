import { Article, Category, Tag, TagBlock } from "types/type";

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
        article_cnt: data.article_cnt,
        color: data.color,
        total_view_cnt: data.total_view_cnt,
        total_like_cnt: data.total_like_cnt,
        thumbnail_img: data.thumbnail_img,
        created_at: data.created_at
    };
}

export function jsonToTagBlocks(data: any[]): TagBlock[] {
        return data.map(tag => ({
            id: tag.id,
            name: tag.name,
            created_at: tag.created_at,
        } as TagBlock));
}

export function jsonToTags(data: any[]): Tag[] {
    return data.map(tag => ({
        id: tag.id,
        name: tag.name,
        total_article_cnt: tag.total_article_cnt,
        created_at: tag.created_at,
    } as Tag));
}
