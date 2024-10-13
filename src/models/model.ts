import { Unit } from './enums';

/**
 * Tag class
 * 
 * Tag 객체를 생성한다.
 */
export class Tag {
    id: number;
    name: string;
    constructor(data: any) {
        this.id = data.id;
        this.name = data.name;
    }
}

/**
 * Category class
 * 
 * Category 객체를 생성한다.
 */
export class Category{
    id: number;
    name: string;
    color: string;
    created_at: Date;
    article_cnt: number;
    constructor(data: any) {
        this.id = data.id;
        this.name = data.name;
        this.color = data.color;
        this.created_at = new Date(data.created_at);
        this.article_cnt = data.article_cnt;
    }
}

/**
 * Article class
 * 
 * Article 객체를 생성한다.
 * @param data
 * @returns Article
 */
export class Article {
    id: number;
    title: string;
    content: string;
    slug: string;
    created_at: Date;
    category: Category;
    view_cnt: number;
    comment_cnt: number;
    like_cnt: number;
    readingTime: number;
    thumbnailImg: string | null;
    unit: Unit;
    tags: Tag[];

    constructor(data: any) {
        this.id = data.id;
        this.title = data.title || '';
        this.content = data.content || '';
        this.slug = data.slug || '';
        this.created_at = new Date(data.created_at);
        this.category = new Category(data.category);
        this.view_cnt = data.view_cnt;
        this.comment_cnt = data.comment_cnt;
        this.like_cnt = data.like_cnt;
        this.readingTime = data.reading_time;
        this.thumbnailImg = data.thumbnail_img;
        this.unit = Article.stringToUnit(data.unit);
        this.tags = data.article_tags ? data.article_tags.map((tag: any) => new Tag(tag.tags)) : [];
    }

    private static stringToUnit(value: string): Unit {
        const unitKey = value.toUpperCase() as keyof typeof Unit;
        if (unitKey in Unit) {
            return Unit[unitKey];
        }
        throw new Error(`Invalid Unit value: ${value}`);
    }

    /** 시각 예쁘게 formatting - 2024-10-11
     * - 1분 이내이면 방금 전이라고 표시
     * - 60분 이내이면 n분 전이라고 표시
     * - 24시간 이내이면 n시간 전이라고 표시
     * - 3일 이내이면 n일 전이라고 표시
     * - 그 이상이면 날짜를 표시(yyyy-mm-dd)
     */
    public getFormattedDate(): string {
        const now = new Date();
        const diff = now.getTime() - this.created_at.getTime();
        const diffMinutes = Math.floor(diff / 60000);
        const diffHours = Math.floor(diff / 3600000);
        const diffDays = Math.floor(diff / 86400000);
        if (diffMinutes < 1) {
            return '방금 전';
        } else if (diffMinutes < 60) {
            return `${diffMinutes}분 전`;
        } else if (diffHours < 24) {
            return `${diffHours}시간 전`;
        } else if (diffDays < 3) {
            return `${diffDays}일 전`;
        } else {
            const year = this.created_at.getFullYear();
            const month = String(this.created_at.getMonth() + 1).padStart(2, '0');
            const day = String(this.created_at.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        }
    }
}

// export class User {
//     name: string;
//     email: string;
//     password: string;
//     constructor(data: any) {
//         this.name = data.name;
//         this.email = data.email;
//         this.password = data.password;
//     }
// }

// export class Comment {
//     content: string;
//     writer: string;
//     constructor(data: any) {
//         this.content = data.content;
//         this.writer = data.writer;
//     }
// }



/** interface 선언 */
/**
 * ArticleCardProps interface
 * 
 * ArticleCard 컴포넌트의 props type을 정의한다.
 */
export interface ArticleCardProps {
    article: Article;
}