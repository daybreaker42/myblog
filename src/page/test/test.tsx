import React, { useRef, useState } from 'react';
import { generateContent } from 'utils/prompt';
import { Copy } from 'lucide-react';

export default function Test() {
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const outputRef = useRef<HTMLTextAreaElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [inputCount, setInputCount] = useState(0);
    const [outputCount, setOutputCount] = useState(0);

    const handleCopy = async () => {
        if (outputRef.current?.value) {
            await navigator.clipboard.writeText(outputRef.current.value);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputCount(e.target.value.length);
    };

    const callAI = async () => {
        if (!inputRef.current?.value) return;
        setIsLoading(true);
        try {
            const result = await generateContent(inputRef.current.value);
            const responseText = result.response.text();
            outputRef.current!.value = responseText;
            setOutputCount(responseText.length);
        } catch (error) {
            console.error('AI call failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-gray-200 py-8">
            <div className="max-w-3xl mx-auto px-4">
                <h1 className="text-2xl font-bold mb-8">Test Laboratory</h1>

                {/* AI Test Section */}
                <section className="mb-8 bg-[#111111] border border-gray-800 rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4 text-amber-500">AI Prompt Test</h2>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-sm font-medium">Prompt Input</label>
                                <span className="text-xs text-gray-400">{inputCount} characters</span>
                            </div>
                            <textarea
                                ref={inputRef}
                                onChange={handleInputChange}
                                className="w-full h-32 px-4 py-2 bg-[#1a1a1a] border border-gray-800 rounded-lg focus:outline-none focus:border-amber-500 font-mono text-sm resize-y"
                                placeholder="Enter your prompt here..."
                            />
                        </div>
                        <button
                            onClick={callAI}
                            disabled={isLoading}
                            className="px-4 py-2 bg-amber-500 text-black rounded-lg hover:bg-amber-400 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Processing...' : 'Generate Response'}
                        </button>
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-sm font-medium">AI Response</label>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-gray-400">{outputCount} characters</span>
                                    <button
                                        onClick={handleCopy}
                                        className="p-1 hover:bg-gray-800 rounded transition-colors"
                                        title="Copy to clipboard"
                                    >
                                        <Copy size={14} />
                                    </button>
                                </div>
                            </div>
                            <textarea
                                ref={outputRef}
                                className="w-full h-48 px-4 py-2 bg-[#1a1a1a] border border-gray-800 rounded-lg focus:outline-none focus:border-amber-500 font-mono text-sm"
                                readOnly
                                placeholder="AI response will appear here..."
                            />
                        </div>
                    </div>
                </section>

                {/* Additional Test Sections */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Performance Test */}
                    <div className="bg-[#111111] border border-gray-800 rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4 text-amber-500">Performance Test</h2>
                        <p className="text-gray-400 mb-4">Test various performance metrics</p>
                        <button className="px-4 py-2 bg-[#1a1a1a] border border-gray-800 rounded-lg hover:border-amber-500 transition-colors">
                            Run Test
                        </button>
                    </div>

                    {/* API Test */}
                    <div className="bg-[#111111] border border-gray-800 rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4 text-amber-500">API Test</h2>
                        <p className="text-gray-400 mb-4">Test API endpoints and responses</p>
                        <button className="px-4 py-2 bg-[#1a1a1a] border border-gray-800 rounded-lg hover:border-amber-500 transition-colors">
                            Test Endpoint
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
}