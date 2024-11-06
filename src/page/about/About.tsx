import Nav from "components/Nav";

export default function About(){
    return (
        <div className="Main bg-[#0a0a0a] text-gray-200 min-h-screen">
            <header className="bg-[#111111] border-b border-gray-800 sticky top-0 z-50">
                <Nav />
            </header>
            <div className="container mx-auto p-4">
                <h1 className="text-4xl font-bold">About</h1>
                <p className="mt-4">
                    이 블로그는 성준이 개발하는 블로그입니다.
                </p>
            </div>
        </div>
    );
}