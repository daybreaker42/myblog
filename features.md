# Features.md

## 기능 리스트

1. 게시물 CRUD
    - 카테고리별/태그별 분류 제공
    - 전체보기 및 pagenation 제공
    - 비공개 설정 -> admin만 볼 수 있도록 설정 / supabase RLS 이용
2. 댓글 CRUD - quora등 이용
    - github 로그인 필요
    - 간단하게 좋아요 등 남길 수 있게
3. 회원가입/로그인 - admin 전용
    - 추후 관리자 추가 가능하게
4. 이미지 업로드
    - cloudinary 이용
5. Search - article, comment, category, tag + google search 결과 제공

- admin pages
    - markdown editor -> vscode 이용
    - image upload -> cloudinary 이용
    - post CRUD
    - comment CRUD
    - user CRUD
    - category CRUD
    - tag CRUD

## Routing Structures - public

### /
- main page

### /article
- article list page

### /article/:slug
- article detail page
- shows article content
- shows comments
- shows related articles

### /category
- category list page

### /category/:name
- category detail page
- shows articles in the category

### /tag
- tag list page

### /tag/:name
- tag detail page
- shows articles with the tag

### /search
- search page
- shows search results

### /login
- login page

### /signup
- signup page

## Routing Structures - admin

### /admin
- admin main page

### /admin/article
- article list page - CRUD 가
능
### /article/:slug/edit
- article edit page

### /article/new
- article create page




## DB schema
article table columns
id : int8
title: text
created_at: timestamp
content : text
status :enum:article_status (NORMAL, WRITING, HIDDEN, ..)
category_id : int8 (category table - Foreign Key)
slug : text
is_comment_blocked : bool
thumbnail_img : text
reading_time : int4
unit : enum:time_unit (SEC, MIN, HOUR, DAY, MON)
like_cnt : int4
comment_cnt: int4
view_cnt : int4
is_upload_queued : bool
expected_upload_time : timestamp
article_pwd : text
isPinned : bool


category table columns
id : int8
name : text
article_cnt : int4
color : text
total_view_cnt : int4
total_like_cnt : int4
thumbnail_img : text
created_at : timestamp

tags table columns
id : int8
name : text
article_cnt : int4
created_at : timestamp

article_tags table columns
article_id : int8 (Foreign Key)
tags_id : int8 (Foreign Key)

comment
id : int8
user_id : int8(Foreign Key)
content : text
pwd : text
article_id : int8 (Foreign Key)
created_at : timestamp

image (article image)
id : int8
article_id : int8(Foreign Key)
created_at : timestamp
url : text (cloudinary url)

users
id : int8
email : text
password : text
name : text
created_at : timestamp
role : enum:user_role (MASTER, ADMIN, USER)