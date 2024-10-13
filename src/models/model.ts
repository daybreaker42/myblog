import { Unit } from './enums';


/**
 * Category class
 * 
 * CategoryData interface를 입력으로 받아 Category 객체를 생성한다.
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
    id: number;
    name: string;
    constructor(data: any) {
        this.id = data.id;
        this.name = data.name;
    }
}




export interface ArticleCardProps {
    article: Article;
}