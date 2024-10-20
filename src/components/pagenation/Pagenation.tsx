import styles from './Pagenation.module.css';

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
interface PageButtonsProps {
    currentPage: number;
    totalPages: number;
    setPage: (page: number) => void;
}

function PageButtons({ currentPage, totalPages, setPage }: PageButtonsProps) {
    const pages = [];
    pages.push(1);
    for (let i = currentPage - 4; i <= currentPage + 4; i++) {
        if (i > 1 && i < totalPages) {
            const leftMiddle = Math.floor((1 + i) / 2);
            if (i === currentPage - 4 && leftMiddle > 1 && i !== leftMiddle) {
                pages.push(leftMiddle);
            }
            pages.push(i);
            const rightMiddle = Math.floor((i + totalPages) / 2);
            if (i === currentPage + 4 && rightMiddle < totalPages && i !== rightMiddle) {
                pages.push(rightMiddle);
            }
        }
    }
    if (totalPages > 1) {
        pages.push(totalPages);
    }

    return (
        <div className={styles['page-buttons']}>
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

interface PageButtonProps {
    page: number;
    currentPage: number;
    setPage: (page: number) => void;
}

function PageButton({ page, currentPage, setPage }: PageButtonProps) {
    return (
        <button
            onClick={() => {
                if (currentPage !== page) {
                    // console.log(page);
                    setPage(page);
                }
            }}
            className={`${styles['pageButton']} ${currentPage === page ? styles['selected'] : ''}`}
        >
            {page}
        </button>
    );

}

export default PageButtons;