import Nav from "components/Nav";
import { Helmet } from "react-helmet-async";

export default function About(){
    const appName = process.env.REACT_APP_SITE_NAME;
    return (
        <>
            <Helmet>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>About | {appName}</title>
                <meta name="description" content="성준의 블로그 태그/카테고리 페이지입니다." />
            </Helmet>
            <div className="Main bg-[#0a0a0a] text-gray-200 min-h-screen">
                <header className="bg-[#111111] border-b border-gray-800 sticky top-0 z-50">
                    <Nav />
                </header>
                <div className="max-w-4xl mx-auto p-4">
                    <h1 className="text-4xl font-bold">About</h1>
                    <p className="mt-4">
                        이 블로그는 성준이 개발하는 블로그입니다.
                    </p>
                </div>
            </div>
        </>
    );
}