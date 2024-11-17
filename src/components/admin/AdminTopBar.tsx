// src/components/admin/AdminTopBar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArticleStatus } from 'types/type';

interface AdminTopBarProps {
  status: ArticleStatus;
  onStatusChange: (status: ArticleStatus) => void;
  onSaveDraft: () => void;
  onPublish: () => void;
}

export default function AdminTopBar({
  status,
  onStatusChange,
  onSaveDraft,
  onPublish
}: AdminTopBarProps) {
  return (
    <nav className="border-b border-gray-800 bg-[#111111] sticky top-0 z-50">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 py-4">
        {/* Desktop Navigation */}
        <div className="hidden sm:flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/admin" className="text-xl font-bold text-amber-500">
              Admin
            </Link>
            <span className="text-gray-400">/</span>
            <span>새 글 작성</span>
          </div>
          <div className="flex items-center gap-4">
            {/* Post Status and Password Group */}
            <div className="flex items-center gap-3 bg-[#1a1a1a] p-2 rounded-lg border border-gray-800">
              <select
                value={status}
                onChange={(e) => onStatusChange(e.target.value as ArticleStatus)}
                className="px-3 py-1.5 bg-[#0a0a0a] text-sm border border-gray-800 rounded-lg focus:outline-none focus:border-amber-500"
              >
                <option value={ArticleStatus.NORMAL}>공개</option>
                <option value={ArticleStatus.WRITING}>임시 저장</option>
                <option value={ArticleStatus.HIDDEN}>숨겨짐</option>
              </select>
              <div className="relative flex items-center">
                <input
                  type="password"
                  placeholder="게시물 비밀번호"
                  disabled={status !== ArticleStatus.HIDDEN}
                  className="px-3 py-1.5 bg-[#0a0a0a] text-sm border border-gray-800 rounded-lg focus:outline-none focus:border-amber-500 disabled:opacity-50 disabled:cursor-not-allowed w-40"
                />
              </div>
            </div>
            <button
              onClick={onSaveDraft}
              className="px-4 py-2 bg-[#1a1a1a] text-sm border border-gray-800 rounded-lg hover:border-amber-500"
            >
              임시저장
            </button>
            <button
              onClick={onPublish}
              className="px-4 py-2 bg-amber-500 text-black text-sm rounded-lg hover:bg-amber-400"
            >
              게시하기
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="sm:hidden">
          <div className="flex items-center justify-between mb-3">
            <Link to="/admin" className="text-lg font-bold text-amber-500">
              Admin
            </Link>
            <button
              onClick={onPublish}
              className="px-3 py-1.5 bg-amber-500 text-black text-sm rounded-lg hover:bg-amber-400"
            >
              게시하기
            </button>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={status}
              onChange={(e) => onStatusChange(e.target.value as ArticleStatus)}
              className="flex-1 px-3 py-1.5 bg-[#1a1a1a] text-sm border border-gray-800 rounded-lg focus:outline-none focus:border-amber-500"
            >
              <option value={ArticleStatus.NORMAL}>공개</option>
              <option value={ArticleStatus.WRITING}>임시 저장</option>
              <option value={ArticleStatus.HIDDEN}>숨겨짐</option>
            </select>
            <input
              type="password"
              placeholder="비밀번호"
              disabled={status !== ArticleStatus.HIDDEN}
              className="flex-1 px-3 py-1.5 bg-[#1a1a1a] text-sm border border-gray-800 rounded-lg focus:outline-none focus:border-amber-500 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}