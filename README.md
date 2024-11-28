# MyBlog projet - 241129 중단

## 설명

- 나만의 블로그 프로젝트
- React + Supabase + Vercel 이용
- 배포는 Vercel (+ Github Action) 이용
->  티스토리 스킨 편집을 위해 티도리 프레임워크로 넘어감 (241129)

## Run/Deploy Project

### Init Project

```bash
npm install

// .env 설정 -> 최상위 폴더에 .env 파일 생성
```

### Run Project

#### local

```bash
npm start 
```


### Deploy Project

#### 0. 배포 전 설정

1. tailwind css minify 설정

```bash
npx tailwindcss -o build.css --minify
```

2. github 배포

```bash
git add .
git commit -m "commit message"
git push origin main
```

#### 1. Vercel로 배포

- 이 경우 github repository와 연동하여 배포 가능
- Vercel에서 환경변수 설정 필요

#### 2. 직접 빌드 후 배포

```bash
npm run build

serve -s build
```

## 기능

- 게시글 작성
- 게시글 수정
- 게시글 삭제
- 게시글 목록 조회
- 게시글 상세 조회
- 댓글 작성
- 댓글 삭제
- 댓글 목록 조회

## 사용 기술

- React
- Supabase
- Vercel

## 기타 설정 관련 사항들

## Deploy

- Vercel로 배포
- Vercel에서 환경변수 설정
