import { useLocation, useParams } from "react-router-dom";
import Nav from "components/Nav";

export default function Category(){
    const slug = useParams<{ slug: string }>().slug;
    console.log(useLocation().pathname);
    console.log(useLocation().pathname.split('/'));
    
    const path = useLocation().pathname.split('/')[1];
    // console.log(path);
    
    return (
        <div className="Main bg-[#0a0a0a] text-gray-200 min-h-screen">
            <header className="bg-[#111111] border-b border-gray-800 sticky top-0 z-50">
                <Nav />
            </header>
            <main className="max-w-4xl mx-auto px-4 py-8">
                <h1>{path === 'category' ? '카테고리' : '태그'} 페이지</h1>
                <p>선택한 카테고리: {slug}</p>
            </main>
        </div>
    );
}