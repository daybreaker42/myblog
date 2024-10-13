import { Unit } from './enums';
import { getFormattedDate } from 'utils/date';

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
    comments: Comment[] = [];

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

    public getFormattedDate(): string {
        return getFormattedDate(this.created_at);
    }
}

export class User {
    id: number;
    name: string;
    email: string;
    password: string | null;
    constructor(data: any) {
        this.id = data.id;
        this.name = data.name;
        this.email = data.email;
        this.password = data.password || null;
    }
}

export class Comment {
    id: number;
    content: string;
    writer: string;
    likes: CommentLike[];
    created_at: Date;
    constructor(data: any) {
        this.id = data.id;
        this.content = data.content;
        this.writer = data.writer;
        this.likes = data.likes.map((like: any) => new CommentLike(like));
        this.created_at = new Date(data.created_at);
    }

    public getFormattedDate(): string {
        return getFormattedDate(this.created_at);
    }
}

export class Like{
    id: number;
    user: User;
    article: number;
    created_at: Date;
    constructor(data: any) {
        this.id = data.id;
        this.user = new User(data.user);
        this.article = data.article;
        this.created_at = new Date(data.created_at);
    }
}

export class CommentLike{
    id: number;
    user: User;
    comment: number;
    created_at: Date;
    constructor(data: any) {
        this.id = data.id;
        this.user = new User(data.user);
        this.comment = data.comment;
        this.created_at = new Date(data.created_at);
    }
}


/** interface 선언 */
/**
 * ArticleCardProps interface
 * 
 * ArticleCard 컴포넌트의 props type을 정의한다.
 */
export interface ArticleCardProps {
    article: Article;
}