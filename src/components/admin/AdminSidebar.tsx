// src/components/admin/AdminSidebar.tsx
import React, { useState } from 'react';
import { X, ChevronRight } from 'lucide-react';
import type { EditorState } from 'page/admin/AdminEditor';
import { Category, EditorDraft, TimeUnit } from 'types/type';

interface AdminSidebarProps {
  editorState: EditorState;
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
  isVisible: boolean;
  onToggleVisibility: () => void;
  className?: string;
}

export default function AdminSidebar({
  editorState,
  setEditorState,
  isVisible,
  onToggleVisibility,
  className = ''
}: AdminSidebarProps) {
  const [tagInput, setTagInput] = useState('');
  const [drafts, setDrafts] = useState<EditorDraft[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);  // TODO: API 연동

  // 태그 추가
  const handleTagAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      if (!editorState.tags.includes(tagInput.trim())) {
        setEditorState({
          ...editorState,
          tags: [...editorState.tags, tagInput.trim()]
        });
      }
      setTagInput('');
    }
  };

  // 태그 제거
  const handleTagRemove = (tagToRemove: string) => {
    setEditorState({
      ...editorState,
      tags: editorState.tags.filter(tag => tag !== tagToRemove)
    });
  };

  // 임시저장 항목 제거
  const handleDraftRemove = (draftId: string) => {
    setDrafts(drafts.filter(draft => draft.id !== draftId));
  };

  if (!isVisible) {
    return (
      <button
        onClick={onToggleVisibility}
        className="hidden xl:block w-full px-4 py-2 bg-[#111111] border border-gray-800 rounded-lg hover:border-amber-500 text-sm"
      >
        ← 사이드바 열기
      </button>
    );
  }

  return (
    <div className={className}>
      {/* Desktop Collapse Button */}
      <button
        onClick={onToggleVisibility}
        className="hidden xl:block w-full px-4 py-2 bg-[#111111] border border-gray-800 rounded-lg hover:border-amber-500 text-sm mb-6"
      >
        사이드바 접기 <ChevronRight className="inline-block w-4 h-4" />
      </button>

      <div className="space-y-4 sm:space-y-6">
        {/* Post Settings */}
        <div className="bg-[#111111] border border-gray-800 rounded-lg">
          <div className="border-b border-gray-800 px-4 py-3">
            <h2 className="font-medium">게시물 설정</h2>
          </div>
          <div className="p-4 space-y-4">
            {/* Category */}
            <div>
              <label className="block text-sm font-medium mb-2">카테고리</label>
              <div className="flex gap-2">
                <select
                  value={editorState.category_id || ''}
                  onChange={(e) => setEditorState({
                    ...editorState,
                    category_id: Number(e.target.value)
                  })}
                  className="flex-1 px-3 py-2 bg-[#0a0a0a] border border-gray-800 rounded-lg focus:outline-none focus:border-amber-500 text-sm"
                >
                  <option value="">카테고리 선택</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <button className="px-3 py-2 bg-[#0a0a0a] border border-gray-800 rounded-lg hover:border-amber-500">
                  +
                </button>
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium mb-2">태그</label>
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagAdd}
                placeholder="Enter로 태그 추가"
                className="w-full px-3 py-2 bg-[#0a0a0a] border border-gray-800 rounded-lg focus:outline-none focus:border-amber-500 text-sm"
              />
              <div className="flex flex-wrap gap-2 mt-2 max-h-24 overflow-y-auto">
                {editorState.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-sm bg-[#0a0a0a] border border-gray-800 rounded-full flex items-center gap-1"
                  >
                    {tag}
                    <button
                      onClick={() => handleTagRemove(tag)}
                      className="hover:text-red-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* URL Slug */}
            <div>
              <label className="block text-sm font-medium mb-2">URL 슬러그</label>
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  value={editorState.slug}
                  onChange={(e) => setEditorState({
                    ...editorState,
                    slug: e.target.value
                  })}
                  placeholder="url-slug"
                  className="flex-1 px-3 py-2 bg-[#0a0a0a] border border-gray-800 rounded-lg focus:outline-none focus:border-amber-500 text-sm"
                />
                <span className="text-sm text-gray-400 whitespace-nowrap">
                  {editorState.slug.length}/50
                </span>
              </div>
            </div>

            {/* Reading Time */}
            <div>
              <label className="block text-sm font-medium mb-2">읽는 시간</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={editorState.reading_time || ''}
                  onChange={(e) => setEditorState({
                    ...editorState,
                    reading_time: Number(e.target.value)
                  })}
                  placeholder="시간"
                  className="w-20 px-3 py-2 bg-[#0a0a0a] border border-gray-800 rounded-lg focus:outline-none focus:border-amber-500 text-sm"
                />
                <select
                  value={editorState.time_unit || TimeUnit.MIN}
                  onChange={(e) => setEditorState({
                    ...editorState,
                    time_unit: e.target.value as TimeUnit
                  })}
                  className="px-3 py-2 bg-[#0a0a0a] border border-gray-800 rounded-lg focus:outline-none focus:border-amber-500 text-sm"
                >
                  {Object.values(TimeUnit).map((unit) => (
                    <option key={unit} value={unit}>
                      {unit.toLowerCase()}
                    </option>
                  ))}
                </select>
              </div>
              <p className="mt-1 text-xs text-gray-400">비워두면 자동으로 계산됩니다.</p>
            </div>

            {/* Additional Settings */}
            <div className="pt-4 border-t border-gray-800">
              <h3 className="text-sm font-medium mb-3">추가 설정</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={!editorState.is_comment_blocked}
                    onChange={(e) => setEditorState({
                      ...editorState,
                      is_comment_blocked: !e.target.checked
                    })}
                    className="rounded border-gray-800 bg-[#0a0a0a]"
                  />
                  댓글 허용
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Drafts - Hidden on Mobile */}
        <div className="hidden sm:block bg-[#111111] border border-gray-800 rounded-lg">
          <div className="border-b border-gray-800 px-4 py-3 flex justify-between items-center">
            <h2 className="font-medium">임시저장 목록</h2>
            <button 
              onClick={() => setDrafts([])}
              className="text-xs text-red-500 hover:text-red-400"
            >
              전체 삭제
            </button>
          </div>
          <div className="divide-y divide-gray-800 max-h-[300px] overflow-y-auto">
            {drafts.map((draft) => (
              <div key={draft.id} className="p-4 hover:bg-[#1a1a1a] transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium mb-1">{draft.title}</h3>
                    <time className="text-sm text-gray-400">
                      {new Date(draft.savedAt).toLocaleString()}
                    </time>
                  </div>
                  <button
                    onClick={() => handleDraftRemove(draft.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}