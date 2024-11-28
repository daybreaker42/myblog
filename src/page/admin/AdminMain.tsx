import React, { useState, useCallback } from 'react';
import { Helmet } from "react-helmet-async";
import { Copy, Save, X, Settings } from 'lucide-react';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import remarkGfm from 'remark-gfm';
import 'styles/markdown.css';

interface DraftPost {
  id: string;
  title: string;
  content: string;
  savedAt: Date;
}

const useDebounce = (callback: Function, delay: number) => {
    const [timer, setTimer] = useState<NodeJS.Timeout>();

    return useCallback((...args: any[]) => {
        if (timer) clearTimeout(timer);
        const newTimer = setTimeout(() => {
            callback(...args);
        }, delay);
        setTimer(newTimer);
    }, [callback, delay, timer]);
};

// TODO - 여기랑 editor 비교해서 빠진 기능 넣고, main page 디자인 시작하기
export default function AdminMain() {
    const [title, setTitle] = useState('');
    const [markdown, setMarkdown] = useState('');
    const [renderedMarkdown, setRenderedMarkdown] = useState('');
    const [conversionStatus, setConversionStatus] = useState<'idle' | 'writing' | 'converted'>('idle');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState('');
    const [slug, setSlug] = useState('');
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [drafts, setDrafts] = useState<DraftPost[]>([]);
    const [newCategory, setNewCategory] = useState('');

    // Mock categories - 실제로는 API에서 가져올 것
    const categories = ['React', 'TypeScript', 'JavaScript', 'Web'];

    const updateMarkdown = useDebounce((value: string) => {
        setRenderedMarkdown(value);
        setConversionStatus('converted');
    }, 500);

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setMarkdown(value);
        setConversionStatus('writing');
        updateMarkdown(value);
    };

    const handleTagAdd = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            setTagInput('');
            if(tags.includes(tagInput.trim())) {
                // 이미 존재하는 태그는 추가하지 않음
                
                return;
            }
            setTags([...tags, tagInput.trim()]);
        }
    };

    const handleTagRemove = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const handleSaveDraft = () => {
        const newDraft: DraftPost = {
            id: Date.now().toString(),
            title: title || '제목 없음',
            content: markdown,
            savedAt: new Date(),
        };
        setDrafts([newDraft, ...drafts]);
    };

    const handleDraftRemove = (id: string) => {
        setDrafts(drafts.filter(draft => draft.id !== id));
    };

    const handleAddCategory = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && newCategory.trim()) {
            if (!categories.includes(newCategory.trim())) {
                categories.push(newCategory.trim());
            }
            setNewCategory('');
        }
    };

    return (
        <>
            <Helmet>
                <title>글 작성 - Admin</title>
                <meta name="description" content="Write new post" />
            </Helmet>
            <div className="bg-[#0a0a0a] text-gray-200 min-h-screen">
                <div className="max-w-[1440px] mx-auto px-4 py-8">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold">새 글 작성</h1>
                        <div className="flex gap-4">
                            <button onClick={handleSaveDraft} className="px-4 py-2 bg-[#1a1a1a] border border-gray-800 rounded-lg hover:border-amber-500 transition-colors flex items-center gap-2">
                                <Save size={16} />
                                임시저장
                            </button>
                            <button onClick={() => setIsSettingsOpen(!isSettingsOpen)} className="px-4 py-2 bg-amber-500 text-black rounded-lg hover:bg-amber-400 transition-colors flex items-center gap-2">
                                <Settings size={16} />
                                업로드 설정
                            </button>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="grid grid-cols-4 gap-6">
                        {/* Editor Column */}
                        <div className="col-span-3 space-y-6">
                            {/* Title Input */}
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="제목을 입력하세요"
                                className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-800 rounded-lg focus:outline-none focus:border-amber-500 text-xl"
                            />

                            {/* Editor Container */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="relative">
                                    <textarea
                                        value={markdown}
                                        onChange={handleInputChange}
                                        className="h-[600px] w-full p-4 bg-[#1a1a1a] text-gray-400 border border-gray-800 rounded-lg focus:outline-none focus:border-amber-500 font-mono"
                                        placeholder="마크다운을 입력해주세요"
                                    />
                                    <div className="absolute right-3 top-3 flex gap-4 text-sm bg-[#1a1a1a] px-2 py-1 rounded">
                                        <span className="text-gray-400">{markdown.length}자</span>
                                        {conversionStatus === 'writing' && (
                                            <span className="text-amber-500">writing...</span>
                                        )}
                                        {conversionStatus === 'converted' && (
                                            <span className="text-green-500">complete</span>
                                        )}
                                    </div>
                                </div>
                                <div className="h-[600px] p-4 bg-[#1a1a1a] border border-gray-800 rounded-lg overflow-auto">
                                    <div className="prose markdown-preview">
                                        <Markdown 
                                            remarkPlugins={[remarkGfm]}
                                            components={{
                                                pre({children}) {
                                                    const child = React.Children.only(children) as React.ReactElement;
                                                    const match = /language-(\w+)/.exec(child.props.className || '');
                                                    return (
                                                        <div className="relative">
                                                            <button 
                                                                className="absolute right-2 top-2 p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                                                                onClick={() => {
                                                                    navigator.clipboard.writeText(String(child.props.children));
                                                                }}
                                                            >
                                                                <Copy size={16} />
                                                            </button>
                                                            {match ? (
                                                                <SyntaxHighlighter
                                                                    style={dark}
                                                                    language={match[1]}
                                                                    PreTag="div"
                                                                >
                                                                    {String(child.props.children).replace(/\n$/, '')}
                                                                </SyntaxHighlighter>
                                                            ) : (
                                                                <pre>{children}</pre>
                                                            )}
                                                        </div>
                                                    );
                                                },
                                                code({className, children, ...props}) {
                                                    return (
                                                        <code className={className} {...props}>
                                                            {children}
                                                        </code>
                                                    );
                                                }
                                            }}
                                        >
                                            {renderedMarkdown}
                                        </Markdown>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Settings Panel */}
                            <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-4">
                                <h2 className="text-lg font-semibold mb-4">게시물 설정</h2>
                                
                                {/* Category Management */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-2">카테고리</label>
                                    <select
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                        className="w-full px-3 py-2 bg-[#111111] border border-gray-800 rounded-lg focus:outline-none focus:border-amber-500"
                                    >
                                        <option value="">선택해주세요</option>
                                        {categories.map(category => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}
                                    </select>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            value={newCategory}
                                            onChange={(e) => setNewCategory(e.target.value)}
                                            onKeyDown={handleAddCategory}
                                            placeholder="새 카테고리 추가 (Enter)"
                                            className="w-full px-3 py-2 bg-[#111111] border border-gray-800 rounded-lg focus:outline-none focus:border-amber-500"
                                        />
                                    </div>
                                </div>

                                {/* Tags Input */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-2">태그</label>
                                    <input
                                        type="text"
                                        value={tagInput}
                                        onChange={(e) => setTagInput(e.target.value)}
                                        onKeyDown={handleTagAdd}
                                        placeholder="Enter를 눌러 태그 추가"
                                        className="w-full px-3 py-2 bg-[#111111] border border-gray-800 rounded-lg focus:outline-none focus:border-amber-500"
                                    />
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {tags.map(tag => (
                                            <span key={tag} className="px-2 py-1 bg-[#111111] border border-gray-800 rounded-full text-sm flex items-center gap-1">
                                                {tag}
                                                <button onClick={() => handleTagRemove(tag)}>
                                                    <X size={14} />
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Slug Input */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-2">슬러그</label>
                                    <div className="flex items-center">
                                        <input
                                            type="text"
                                            value={slug}
                                            onChange={(e) => setSlug(e.target.value)}
                                            placeholder="URL에 사용될 슬러그"
                                            className="flex-1 px-3 py-2 bg-[#111111] border border-gray-800 rounded-lg focus:outline-none focus:border-amber-500"
                                        />
                                        <span className="ml-2 text-sm text-gray-400 whitespace-nowrap">
                                            {slug.length}자
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Drafts Panel */}
                            <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-4">
                                <h2 className="text-lg font-semibold mb-4">임시저장 목록</h2>
                                <div className="space-y-2">
                                    {drafts.map(draft => (
                                        <div key={draft.id} className="flex items-center justify-between p-2 bg-[#111111] rounded-lg">
                                            <div>
                                                <h3 className="font-medium">{draft.title}</h3>
                                                <p className="text-sm text-gray-400">
                                                    {new Date(draft.savedAt).toLocaleString()}
                                                </p>
                                            </div>
                                            <button 
                                                onClick={() => handleDraftRemove(draft.id)}
                                                className="p-1 hover:text-red-500 transition-colors"
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}