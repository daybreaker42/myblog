/**
 * 검색시 입력한 키워드를 서버로 전송하기 전에 대기하는 시간
 */
export const SEARCH_DEBOUNCE_TIME = 300;
/**
 * 한 페이지 당 게시물 수
 * - 메인 페이지: 10개
 */
export const ARTICLES_PER_PAGE = 10;
/**
 * 해당 페이지에서 보여줄 게시물 날짜 범위
 * - 전체, 일주일, 한 달, 일 년
 * - 기본값: 전체
 * - 메인 페이지에서 사용
 */
export enum FILTER_RANGE {
    ALL,
    WEEK,
    MONTH,
    YEAR,
};
/**
 * 게시물 정렬 방식
 * - 최신순, 인기순
 * - 기본값: 최신순
 * - 메인 페이지에서 사용
 */
export const SORT_TYPES = {
    LATEST: 'latest',
    POPULAR: 'popular'
};

export const ARTICLE_CARD_COLUMNS = [
    "id",
    "slug",
    "title",
    "description",
    "created_at",
    "reading_time",
    "time_unit",
    "view_cnt",
    "like_cnt",
    "thumbnail_img",
    "category_id",
].join(", ");

export const PINNED_ARTICLE_COLUMNS = [
    "id",
    "slug",
    "title",
    "description",
    "created_at",
].join(", ");

export const CATEGORY_BLOCK_COLUMNS = [
    "id",
    "name",
    "color",
].join(", ");