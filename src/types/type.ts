// 게시물 관련
interface Article {
  id: number;
  title: string;
  description: string;
  created_at: Date;
  content: string;
  status: ArticleStatus;
  category_id: number;
  slug: string;
  is_comment_blocked: boolean;
  thumbnail_img?: string;
  reading_time?: number;
  time_unit?: TimeUnit;
  like_cnt: number;
  comment_cnt: number;
  view_cnt: number;
  is_upload_queued: boolean;
  expected_upload_time?: Date;
  article_pwd?: string;
  is_pinned: boolean;
}
  
enum ArticleStatus {
  NORMAL = 'NORMAL',
  WRITING = 'WRITING',
  HIDDEN = 'HIDDEN'
}

enum TimeUnit {
  SEC = 'SEC',
  MIN = 'MIN',
  HOUR = 'HOUR',
  DAY = 'DAY',
  MON = 'MON'
}

// 카테고리 관련
interface Category {
  id: number;
  name: string;
  article_cnt: number;
  color: string;
  total_view_cnt: number;
  total_like_cnt: number;
  thumbnail_img: string;
  created_at: Date;
  recent_article_date?: Date;
}

// 태그 관련
interface Tag {
  id: number;
  name: string;
  article_cnt: number;
  created_at: Date;
  recent_article_date?: Date;
}
interface TagBlock {
  id: number;
  name: string;
  created_at: Date;
}

// 댓글 관련
interface Comment {
  id: number;
  userId: number;
  content: string;
  pwd?: string;
  articleId: number;
  createdAt: Date;
}

// 이미지 관련
interface Image {
  id: number;
  articleId: number;
  url: string;
  createdAt: Date;
}

// 사용자 관련
interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  role: UserRole;
  createdAt: Date;
}

enum UserRole {
  MASTER = 'MASTER',
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export { ArticleStatus, TimeUnit, UserRole };
export type { Article, Category, Tag, TagBlock, Comment, Image, User };
