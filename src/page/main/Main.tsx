import { Helmet } from "react-helmet-async";
import Nav from "components/Nav";
import Footer from "components/Footer";
import PinnedArticleSection from "components/article/PinnedArticleSection";
import ArticleCardSection from "components/article/ArticleCardSection";

/**
 * Main 페이지
 */
export default function Main() {
    const appName = process.env.REACT_APP_SITE_NAME;    

    return (
    <>
        <Helmet>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Home | {appName}</title>
            <meta name="description" content="성준의 블로그에 오신 것을 환영합니다. 주로 프로그래밍 문제 해결 과정을 주로 다루고 있습니다." />
        </Helmet>
        <div className="Main bg-[#0a0a0a] text-gray-200 min-h-screen">
            <header className="bg-[#111111] border-b border-gray-800 sticky top-0 z-50">
                <Nav />
            </header>
            <main className="max-w-4xl mx-auto px-4 py-8">
                <PinnedArticleSection />

                {/* <!-- 게시물 그리드 --> */}
                <ArticleCardSection />
            </main>
            <Footer />
        </div>
    </>
    );
}