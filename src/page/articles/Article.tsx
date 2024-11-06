import Nav from 'components/Nav';
import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function Article() {
    return (
        <>
            <Helmet>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>글 상세 - 성준의 블로그</title>
                <meta name="description" content="성준의 블로그 글 상세 페이지입니다." />
            </Helmet>
            <div className="Main bg-[#0a0a0a] text-gray-200 min-h-screen">
                <header className="bg-[#111111] border-b border-gray-800 sticky top-0 z-50">
                    <Nav />
                </header>
            </div>
        </>
    );
}