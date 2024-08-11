import React, { useState, useEffect, useRef } from 'react';
// util functions
import isOverflow from 'utils/overflow';
// css
import './Comments.css';
import 'components/transparentButton.css';

/**
 * 댓글 목록
 * 
 * @param {Object} props
 * @param {Array} props.comments - 댓글 목록
 * 
 * @returns {JSX.Element}
 */
const Comments = ({ comments }) => {
    const [isOverflowedList, setIsOverflowedList] = useState(Array(comments.length).fill(false));

    useEffect(() => {
        const pElements = document.querySelectorAll('.comment-content > p');
        // console.log(`isOverflowedList 초기화`);
        const newIsOverflowedList = Array(comments.length).fill(false);

        pElements.forEach((pElement, index) => {
            if (isOverflow(pElement)) {
                newIsOverflowedList[index] = true;
            } else {
                pElement.classList.remove('collapsed');
            }
        });

        setIsOverflowedList(newIsOverflowedList);
    }, [comments]);

    return (
        <section className='comment-section-body'>
            {comments.map((comment, index) => (
                <React.Fragment key={comment.id}>
                    <Comment comment={comment} isOverflowed={isOverflowedList[index]} />
                    {comments.length - 1 > index && <div className='comment-divider'></div>}
                </React.Fragment>
            ))}
        </section>
    );
};
/**
 * 댓글
 * 
 * @param {Object} props
 * @param {Object} props.comment.id - 댓글 id
 * @param {Object} props.comment - 댓글 정보
 * @param {string} props.comment.writer - 댓글 작성자
 * @param {string} props.comment.createdAt - 댓글 작성 시간
 * @param {string} props.comment.content - 댓글 내용
 * @param {Array} props.comment.likes - 댓글 좋아요 정보
 * @param {boolean} props.isOverflowed - 댓글이 넘친 경우
 * 
 * @returns {JSX.Element}
 */
const Comment = ({ comment, isOverflowed }) => {
    const [isMore, setIsMore] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(true);

    return (
        <section className="comment-card">
            <section className="comment-header">
                <section className="comment-writer">
                    <span>{comment.writer}</span>
                    <span>{comment.createdAt}</span>
                </section>
                <section className="comment-reaction">
                    <button className="like transparent-button">좋아요 {comment.likes.length}</button>
                    <button className="edit transparent-button">수정</button>
                    <button className="delete transparent-button">삭제</button>
                    <button className="reply transparent-button">답글</button>
                    <button className="report transparent-button">신고</button>
                </section>
            </section>
            <section className="comment-content">
                <p className={isCollapsed ? 'collapsed' : ''}>{comment.content}</p>
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
const MoreView = ({ isMore, setIsMore, isCollapsed, setIsCollapsed }) => {
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

export default Comments;