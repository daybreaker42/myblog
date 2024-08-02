import './PageButtons.css';

/**
 * pagenation 위한 buttons 컴포넌트
 * 
 * 버튼 나오는 종류
 * - 맨 처음 idx의 페이지
 * - 현재 페이지 기준으로 4개 뒤까지
 * - 현재 페이지 기준으로 4개 앞까지
 * - 맨 마지막 idx의 페이지
 * - 만약 여기서 겹치는게 있거나, 1과 마지막 idx를 넘어가는 경우는 추가하지 않는다.
 */
function PageButtons({ currentPage, setPage, totalPages }) {

    const pages = [];
    pages.push(1);
    for (let i = currentPage - 4; i <= currentPage + 4; i++) {
        if (i > 1 && i < totalPages) {
            if (i === currentPage - 4 && Math.floor((1 + i) / 2) > 1) {
                pages.push(Math.floor((1 + i) / 2));
            }
            pages.push(i);
            if (i === currentPage + 4 && Math.floor((i + totalPages) / 2) < totalPages) {
                pages.push(Math.floor((i + totalPages) / 2));
            }
        }
    }
    if (totalPages > 1) {
        pages.push(totalPages);
    }

    return (
        <div className='page-buttons'>
            {pages.map((page) => (
                <PageButton
                    key={page}
                    page={page}
                    setPage={setPage}
                    currentPage={currentPage}
                />
            ))}
        </div>
    );
}

function PageButton({ page, setPage, currentPage }) {
    return (
        <button
            onClick={() => {
                if (currentPage !== page) {
                    console.log(page);
                    setPage(page);
                }
            }}
            className={`pageButton ${currentPage === page ? 'active' : ''}`}
        >
            {page}
        </button>
    );

}

export default PageButtons;