import Nav from "components/Nav";
import { Helmet } from "react-helmet-async";
import { useLocation, useParams } from "react-router-dom";

export default function CategorySearchLayout(){
    const slug = useParams<{ slug: string }>().slug;
    // console.log(useLocation().pathname);
    // console.log(useLocation().pathname.split('/'));
    
    const path = useLocation().pathname.split('/')[1];
    // console.log(path);
    
    return (
        <>
            <Helmet>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>{`${slug} | 카테고리`}</title>
                <meta name="description" content="성준의 블로그 카테고리 페이지입니다." />
            </Helmet>
            <div className="Main bg-[#0a0a0a] text-gray-200 min-h-screen">
                <header className="bg-[#111111] border-b border-gray-800 sticky top-0 z-50">
                    <Nav />
                </header>
                <main className="max-w-4xl mx-auto px-4 py-8">
                    <h1>{path === 'category' ? '카테고리' : '태그'} 페이지</h1>
                    <p>선택한 카테고리: {slug}</p>
                </main>
            </div>
        </>
    );
}