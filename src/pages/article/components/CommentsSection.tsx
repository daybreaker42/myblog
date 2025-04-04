import React, { useState, useEffect, useRef, forwardRef } from 'react';
// util functions
import isOverflow from 'utils/overflow';
// css
import styles from './CommentsSection.module.css';
import 'components/transparentButton.css';
// components
import Filter from 'components/filter/Filter';
import { ReactComponent as ChatIcon } from 'assets/icons/chat.svg';


import { Comment } from 'models/model';
import { FilterOption } from 'models/interface';

// constants
const options : FilterOption[] = [
    { value: 'option-1', label: '최신순' },
    { value: 'option-2', label: '인기순' },
    { value: 'option-3', label: '좋아요순' },
    { value: 'option-4', label: '신고순' },
];

/**
 * 댓글 목록
 */
const CommentsSection = forwardRef(({ comments }: { comments: Comment[] }, ref: React.Ref<HTMLElement>) => {
    const commentLength = comments.length;
    const [isOverflowedList, setIsOverflowedList] = useState<boolean[]>(Array(commentLength).fill(false));
    const commentRefs = useRef([]);
    const [selectedFilter, setSelectedFilter] = useState<FilterOption>(options[0]);

    useEffect(() => {
        const newIsOverflowedList = Array(commentLength).fill(false);

        commentRefs.current.forEach((pElement: HTMLElement, index: number) => {
            if (pElement && isOverflow(pElement)) {
                newIsOverflowedList[index] = true;
            } else if (pElement) {
                pElement.classList.remove(styles.collapsed);
                // console.log(`pElement: ${pElement}`);
            }
        }, [comments]);
        setIsOverflowedList(newIsOverflowedList);
        // console.log(`newIsOverflowedList: ${newIsOverflowedList}`);
        // console.log(`isOverflowedList: ${isOverflowedList}`);
    }, [comments]);

    return (
        <section ref={ref} className={styles["comment-section"]}>
            <section className={styles["comment-section-header"]}>
                <h2 className='comment-section-header'>
                    <ChatIcon className={styles['chat-icon']} />
                    <span>댓글</span>
                </h2>
                <Filter options={options} selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter}/>
            </section>
            <section className={styles['comment-section-body']}>
                {comments.map((comment, index) => (
                    <React.Fragment key={comment.id}>
                        <CommentComponent comment={comment} isOverflowed={isOverflowedList[index]} />
                        {commentLength - 1 > index && <div className={styles['comment-divider']}></div>}
                    </React.Fragment>
                ))}
                <section className={styles['comment-page-btns']}>
                    <button className={styles['page-btn']}>이전</button>
                    <button className={styles['page-btn']}>다음</button>
                </section>
            </section>
        </section >
    );
});

/**
 * 댓글
 * 
 * @param {Object} props
 * @param {Object} props.comment - 댓글 정보
 * @param {string} props.comment.writer - 댓글 작성자
 * @param {string} props.comment.createdAt - 댓글 작성 시간
 * @param {string} props.comment.content - 댓글 내용
 * @param {Array} props.comment.likes - 댓글 좋아요 수
 * @param {Array} props.comment.replies - 댓글 답글 목록
 * @param {Array} props.comment.reports - 댓글 신고 목록
 * @param {boolean} props.isOverflowed - 댓글이 넘친 경우
 * 
 * @returns {JSX.Element}
 */
const CommentComponent = ({ comment, isOverflowed }: { comment: Comment, isOverflowed: boolean }) => {
    const [isMore, setIsMore] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(true);

    return (
        <section className={styles["comment-card"]}>
            <section className={styles["comment-header"]}>
                <section className={styles["comment-writer"]}>
                    <span>{comment.writer}</span>
                    <span>{comment.getFormattedDate()}</span>
                </section>
                <section className={styles["comment-reaction"]}>
                    <button className={`${styles.like} transparent-button`}>좋아요 {comment.likes.length}</button>
                    <button className={`${styles.edit} transparent-button`}>수정</button>
                    <button className={`${styles.delete} transparent-button`}>삭제</button>
                    <button className={`${styles.reply} transparent-button`}>답글</button>
                    <button className={`${styles.report} transparent-button`}>신고</button>
                </section>
            </section>
            <section className={styles["comment-content"]}>
                <p className={isCollapsed ? styles.collapsed : ''}>{comment.content}</p>
                {isOverflowed && <MoreView isMore={isMore} setIsMore={setIsMore} isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />}
            </section>
        </section>
    );
}

/**
 * 더보기 버튼
 * 
 * @param {Object} props
 * @param {boolean} props.isMore - 더보기가 눌렸는지 여부
 * @param {function} props.setIsMore - 더보기를 눌렀을 때 실행할 함수
 * @param {boolean} props.isCollapsed - 댓글이 접혀있는지 여부
 * @param {function} props.setIsCollapsed - 댓글을 접었을 때 실행할 함수
 * 
 * @returns {JSX.Element}
 */
const MoreView = ({ isMore, setIsMore, isCollapsed, setIsCollapsed }: { isMore: boolean; setIsMore: Function; isCollapsed: boolean; setIsCollapsed: Function; }): JSX.Element | null=> {
    if (isMore === undefined) return null;
    return (
        <button className='more transparent-button' onClick={() => {
            setIsMore(!isMore)
            setIsCollapsed(!isCollapsed)
            // console.log(`moroe button clicked - isMore: ${isMore} / isCollapsed - ${isCollapsed}`);
        }
        }>
            {isMore ? '접기' : '더보기'}
        </button>
    );
};

export default CommentsSection;