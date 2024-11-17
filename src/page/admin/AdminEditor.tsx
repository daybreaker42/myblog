import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArticleStatus, TimeUnit } from 'types/type';

// Components
import AdminTopBar from 'components/admin/AdminTopBar';
import AdminImageManager from 'components/admin/AdminImageManager';
import AdminToc from 'components/admin/AdminToc';
import AdminEditorMain from 'components/admin/AdminEditorMain';
import AdminSidebar from 'components/admin/AdminSidebar';

export interface EditorState {
  title: string;
  content: string;
  status: ArticleStatus;
  category_id?: number;
  slug: string;
  is_comment_blocked: boolean;
  reading_time?: number;
  time_unit?: TimeUnit;
  article_pwd?: string;
  tags: string[];
}

export default function AdminEditor() {
  // 기본 상태
  const [editorState, setEditorState] = useState<EditorState>({
    title: '',
    content: '',
    status: ArticleStatus.WRITING,
    slug: '',
    is_comment_blocked: false,
    tags: [],
  });

  // 부가 상태들
  const [showPreview, setShowPreview] = useState(true);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showImageManager, setShowImageManager] = useState(true);

  return (
    <>
      <Helmet>
        <title>새 글 작성 - Admin</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="bg-[#0a0a0a] text-gray-200 min-h-screen">
        <AdminTopBar
          status={editorState.status}
          onStatusChange={(status) => setEditorState({ ...editorState, status })}
          onSaveDraft={() => {/* TODO */}}
          onPublish={() => {/* TODO */}}
        />

        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 py-4 sm:py-8">
          {/* 모바일 이미지 업로드 버튼 */}
          <div className="sm:hidden mb-4">
            <button
              onClick={() => setShowImageManager(true)}
              className="w-full px-4 py-3 bg-[#111111] border border-gray-800 rounded-lg hover:border-amber-500 flex items-center justify-center gap-2"
            >
              {/* TODO: 이미지 아이콘 */}
              이미지 업로드
            </button>
          </div>

          {/* 메인 레이아웃 */}
          <div className="flex flex-col xl:flex-row gap-6">
            {/* 데스크톱 목차 */}
            <AdminToc className="hidden xl:block w-64 shrink-0" />

            {/* 에디터 영역 */}
            <div className="flex-1 space-y-4 sm:space-y-6">
              <AdminImageManager
                isVisible={showImageManager}
                onClose={() => setShowImageManager(false)}
                onOpen={() => setShowImageManager(true)}
              />
              <AdminEditorMain
                editorState={editorState}
                setEditorState={setEditorState}
                showPreview={showPreview}
                onTogglePreview={() => setShowPreview(!showPreview)}
              />
            </div>

            {/* 사이드바 */}
            <AdminSidebar
              editorState={editorState}
              setEditorState={setEditorState}
              isVisible={showSidebar}
              onToggleVisibility={() => setShowSidebar(!showSidebar)}
              className="xl:w-80 xl:shrink-0"
            />
          </div>
        </div>
      </div>
    </>
  );
}