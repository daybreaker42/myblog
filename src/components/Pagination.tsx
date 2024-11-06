import { useEffect } from "react";
import { Link } from "react-router-dom";
import ScrollToTop from "router/ScrollToTop";

interface PaginationProps {
    total: number;
    page: number;
    perPage: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({ total, page, perPage, onPageChange } : PaginationProps) {
    // total이 0 이하면 null 반환
    if(total <= 0) return null;
    // console.log(`pagination rendering...`);
    
    /**
     * 한번에 보여지는 페이지 수
     */
    const SHOWING_PAEGS_NUM = 10;
    const LEFT = page % 10 !== 0 ? page % SHOWING_PAEGS_NUM : 10;
    /**
     * 전체 페이지 수
     */
    const TOTAL_PAGE_NUM = Math.ceil(total / perPage);
    
    /**
     * 화면에 보여지는 page 담는 set
     * - 1이랑 마지막 페이지는 둘이 같지 않는 이상 무조건 보여줌
     */
    let pageList = new Set([1]);
    

    const startPage = page - LEFT + 1;                  // 1로 시작하는 수로 만듦   ex) 17 -> 11
    const endPage = Math.min(page + SHOWING_PAEGS_NUM - LEFT, TOTAL_PAGE_NUM);    // 0으로 끝나는 수로 만듦   ex) 17 -> 20
    // console.log(`total: ${total}, page: ${page}, LEFT: ${LEFT}, perPage: ${perPage}`);
    // console.log(`startPage: ${startPage}, endPage: ${endPage}, TOTAL_PAGE_NUM: ${TOTAL_PAGE_NUM}`);
    for (let i = startPage; i <= endPage; i++) {
        // 현제 페이지가 속한 그룹 페이지들 모두 추가
        pageList.add(i);
    }
    
    if(TOTAL_PAGE_NUM > 1) {
        // 마지막 페이지 추가
        pageList.add(TOTAL_PAGE_NUM);
    }

    // for(const num of pageList) {
    //     console.log(`num: ${num}`);
    // }
    
    return (
        <div className="mt-12 flex justify-center">
            <nav className="flex flex-wrap items-center justify-center gap-2">
                {startPage > 1 ? (
                    <PageLink page={startPage - 1} text="이전" onPageChange={onPageChange}/>
                ) : null}

                {[...pageList].map((p) => (
                    p === page ? 
                    <span key={p} className="px-3 py-2 rounded-md bg-amber-500 text-black">{p}</span>
                     : <PageLink key={p} page={p} onPageChange={onPageChange}/>
                ))}

                {endPage < TOTAL_PAGE_NUM ? (
                    <PageLink page={endPage + 1} text="다음" onPageChange={onPageChange}/>
                ) : null}
            </nav>
        </div>
    );
}
interface PageLinkProps {
    key?: number;
    page: number;
    text?: string;
    onPageChange: (page: number) => void;
}

function PageLink({ page, text, onPageChange }: PageLinkProps) {
    return (
        <Link to={`/?page=${page}`}
            className="px-3 py-2 rounded-md bg-[#111111] text-gray-400 hover:text-amber-500"
            onClick={
                (e) => {
                    e.preventDefault();
                    onPageChange(page);
            }}>
            {text ?? page}
        </Link>
    );
}