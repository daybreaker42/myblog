import { Unit } from './enums';
/**
 * Article class
 * 
 * ArticleData interface를 입력으로 받아 Article 객체를 생성한다.
 * 
 * methods
 * - stringToUnit(value: string): Unit
 */
export class Article {
    id: number;
    title: string;
    content: string;
    slug: string;
    createdAt: Date;
    categoryId: number;
    commentCount: number;
    likeCount: number;
    readingTime: number;
    thumbnailImg: string | null;
    unit: Unit;

    constructor(data: ArticleData) {
        this.id = data.id;
        this.title = data.title || '';
        this.content = data.content || '';
        this.slug = data.slug || '';
        this.createdAt = new Date(data.created_at);
        this.categoryId = data.category_id;
        this.commentCount = data.comment_cnt;
        this.likeCount = data.like_cnt;
        this.readingTime = data.reading_time;
        this.thumbnailImg = data.thumbnail_img;
        this.unit = Article.stringToUnit(data.unit);
    }

    private static stringToUnit(value: string): Unit {
        const unitKey = value.toUpperCase() as keyof typeof Unit;
        if (unitKey in Unit) {
            return Unit[unitKey];
        }
        throw new Error(`Invalid Unit value: ${value}`);
    }    
}
/**
 * ArticleData interface
 * 
 * Article 객체 생성에 필요한 데이터를 정의한다.
 */
interface ArticleData {
    id: number;
    title?: string;
    content?: string;
    slug?: string;
    created_at: string | number | Date;
    category_id: number;
    comment_cnt: number;
    like_cnt: number;
    reading_time: number;
    thumbnail_img: string | null;
    unit: string;
}

export class User {
    name: string;
    email: string;
    password: string;
    constructor(data: any) {
        this.name = data.name;
        this.email = data.email;
        this.password = data.password;
    }
}

export class Comment {
    content: string;
    writer: string;
    constructor(data: any) {
        this.content = data.content;
        this.writer = data.writer;
    }
}

export class Tag {

}