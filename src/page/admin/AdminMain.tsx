import React, { useState, useCallback } from 'react'
import { Helmet } from "react-helmet-async";
import Markdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import remarkGfm from 'remark-gfm'
import 'styles/markdown.css'

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

export default function AdminMain() {
    const [markdown, setMarkdown] = useState('');
    const [renderedMarkdown, setRenderedMarkdown] = useState('');
    const [conversionStatus, setConversionStatus] = useState<'idle' | 'writing' | 'converted'>('idle');

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

    return (
        <>
            <Helmet>
                <title>Admin Page</title>
                <meta name="description" content="Admin Page" />
            </Helmet>
            <div className="bg-[#0a0a0a] text-gray-200 min-h-screen">
                <div className="max-w-4xl mx-auto px-4 py-8">
                    <h1 className="text-4xl font-bold">Admin Page</h1>
                    
                    {/* Status Message */}
                    <div className="h-6 mt-2">
                        {conversionStatus === 'writing' && (
                            <span className="text-amber-500">Converting markdown...</span>
                        )}
                        {conversionStatus === 'converted' && (
                            <span className="text-green-500">Conversion completed!</span>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <textarea
                            value={markdown}
                            onChange={handleInputChange}
                            className="h-[500px] p-4 bg-[#1a1a1a] text-gray-400 border border-gray-800 rounded-lg focus:outline-none focus:border-amber-500"
                            placeholder="마크다운을 입력해주세요"
                        />
                        <div className="h-[500px] p-4 bg-[#1a1a1a] border border-gray-800 rounded-lg overflow-auto">
                            <div className="prose markdown-preview">
                                <Markdown 
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                        pre({children}) {
                                            const child = React.Children.only(children) as React.ReactElement;
                                            const match = /language-(\w+)/.exec(child.props.className || '');
                                            return match ? (
                                                <SyntaxHighlighter
                                                    style={dark}
                                                    language={match[1]}
                                                    PreTag="div"
                                                >
                                                    {String(child.props.children).replace(/\n$/, '')}
                                                </SyntaxHighlighter>
                                            ) : (
                                                <pre>{children}</pre>
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
            </div>
        </>
    );
}