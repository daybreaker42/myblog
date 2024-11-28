// src/components/admin/AdminEditorMain.tsx
import React, { useState, useEffect, useRef } from 'react';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import remarkGfm from 'remark-gfm';
import type { EditorState } from 'page/admin/AdminEditor';
import type { TitleSuggestion } from 'types/type';

interface AdminEditorMainProps {
  editorState: EditorState;
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
  showPreview: boolean;
  onTogglePreview: () => void;
}

export default function AdminEditorMain({
  editorState,
  setEditorState,
  showPreview,
  onTogglePreview,
}: AdminEditorMainProps) {
  const [titleSuggestions, setTitleSuggestions] = useState<TitleSuggestion[]>([]);
  const [autoSaveStatus, setAutoSaveStatus] = useState<'saving' | 'saved' | 'error'>('saved');
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'error'>('idle');
  const previewRef = useRef<HTMLDivElement>(null);
  const characterCount = editorState.content.length;

  const handleCopy = async () => {
    try {
      if (!previewRef.current) return;
      if (copyStatus !== 'idle') return;
      // Get the rendered HTML content
      const content = previewRef.current.innerHTML;
      await navigator.clipboard.writeText(content);
      
      // Show success feedback
      setCopyStatus('copied');
      setTimeout(() => setCopyStatus('idle'), 2000);
    } catch (err) {
      // Show error feedback
      setCopyStatus('error');
      setTimeout(() => setCopyStatus('idle'), 2000);
    }
  };

  // 자동 저장 효과
  useEffect(() => {
    const timer = setTimeout(() => {
      // TODO: 실제 저장 로직 구현
      setAutoSaveStatus('saved');
    }, 1000);

    return () => clearTimeout(timer);
  }, [editorState]);

  return (
    <>
      {/* Title Input */}
      <div className="bg-[#111111] border border-gray-800 rounded-lg p-4 sm:p-6">
        <div className="relative">
          <input
            type="text"
            placeholder="제목을 입력하세요"
            value={editorState.title}
            onChange={(e) => 
              setEditorState({ ...editorState, title: e.target.value })
            }
            maxLength={100}
            className="w-full bg-transparent text-xl sm:text-2xl font-bold focus:outline-none placeholder-gray-600"
          />
          <div className="absolute right-0 top-0 text-sm text-gray-400">
            {editorState.title.length}/100
          </div>
        </div>

        {/* Title Keywords - Hidden on Mobile */}
        <div className="hidden sm:block mt-4 p-3 bg-[#1a1a1a] rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">추천 제목</span>
            <button 
              onClick={() => {/* TODO: 새로운 추천 제목 생성 */}}
              className="text-xs text-amber-500 hover:text-amber-400"
            >
              새로고침
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {titleSuggestions.map((suggestion) => (
              <button
                key={suggestion.id}
                onClick={() => 
                  setEditorState({ ...editorState, title: suggestion.title })
                }
                className="px-2 py-1 text-xs bg-[#111111] border border-gray-800 rounded-full hover:border-amber-500"
              >
                {suggestion.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Editor Container */}
      <div className="sm:grid sm:grid-cols-2 gap-4 h-[calc(100vh-280px)]">
        {/* Markdown Input */}
        <div className="bg-[#111111] border border-gray-800 rounded-lg overflow-hidden mb-4 sm:mb-0">
          <div className="border-b border-gray-800 px-4 py-2 flex justify-between items-center bg-[#0a0a0a]">
            <span className="text-sm font-medium">마크다운 에디터</span>
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <span>{characterCount}자</span>
              <span className={`hidden sm:inline ${
                autoSaveStatus === 'saved' ? 'text-green-500' : 
                autoSaveStatus === 'saving' ? 'text-amber-500' : 
                'text-red-500'
              }`}>
                {autoSaveStatus === 'saved' ? '자동 저장됨' : 
                 autoSaveStatus === 'saving' ? '저장 중...' : 
                 '저장 실패'}
              </span>
            </div>
          </div>
          <textarea
            value={editorState.content}
            onChange={(e) => {
              setAutoSaveStatus('saving');
              setEditorState({ ...editorState, content: e.target.value });
            }}
            className="w-full h-[calc(100%-40px)] p-4 bg-transparent resize-none focus:outline-none font-mono text-gray-300"
            placeholder="내용을 입력하세요..."
          />
        </div>

        {/* Preview - Hidden on Mobile by Default */}
        <div className={`${
          showPreview ? 'block' : 'hidden'
        } sm:block bg-[#111111] border border-gray-800 rounded-lg overflow-hidden`}>
          <div className="border-b border-gray-800 px-4 py-2 bg-[#0a0a0a] flex justify-between items-center">
            <span className="text-sm font-medium">미리보기</span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="px-2 py-1 text-xs border border-gray-700 rounded hover:border-amber-500 transition-colors"
              >
                {copyStatus === 'idle' && '복사'}
                {copyStatus === 'copied' && '복사됨!'}
                {copyStatus === 'error' && '복사 실패'}
              </button>
              <span className="text-xs text-gray-400">읽는 시간: 약 3분</span>
              <button 
                className="sm:hidden ml-2 text-amber-500"
                onClick={onTogglePreview}
              >
                닫기
              </button>
            </div>
          </div>
          <div className="p-4 h-[calc(100%-40px)] overflow-auto">
            <div className="prose markdown-preview" ref={previewRef}>
              <Markdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({node, className, children, ...props}) {
                    const match = /language-(\w+)/.exec(className || '');
                    return match ? (
                      <SyntaxHighlighter
                        PreTag="div"
                        style={dark}
                        language={match[1]}
                        // {...props}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  }
                }}
              >
                {editorState.content}
              </Markdown>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Preview Toggle */}
      <div className="sm:hidden">
        <button
          onClick={onTogglePreview}
          className="w-full px-4 py-2 bg-[#111111] border border-gray-800 rounded-lg hover:border-amber-500 text-sm"
        >
          {showPreview ? '에디터로 돌아가기' : '미리보기 보기'}
        </button>
      </div>
    </>
  );
}