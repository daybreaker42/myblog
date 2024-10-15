import React from 'react';
import { Link } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';

import { ReactComponent as ArrowIcon } from 'assets/icons/arrow_forward.svg';
import { ReactComponent as LinkIcon } from 'assets/icons/link.svg';
import { ReactComponent as FavoriteIcon } from 'assets/icons/favorite.svg';
import { ReactComponent as ChatIcon } from 'assets/icons/chat.svg';
import { ReactComponent as CheckIcon } from 'assets/icons/check.svg';

// import styles
import profileStyles from './Profile.module.css';
import 'components/click.css';

const Profile = ({ likeCnt, commentCnt, scrollToComment, slug, articleWriter }) => {
    // 좋아요, 댓글, 공유, 프로필 버튼
    const like = useRef(null);
    const share = useRef(null);
    const comment = useRef(null);
    const profile = useRef(null);

    // 공유하기 눌렀는지 체크
    const [isShareClicked, setIsShareClicked] = useState(false);
    // 좋아요 눌렀는지 체크
    const [isLiked, setIsLiked] = useState(false);

    const url = `https://fclipse.github.io/articles/${slug}`;

    const handleLikeClick = () => {
        setIsLiked((prevIsLiked) => !prevIsLiked);
        like.current.classList.toggle(profileStyles['liked']);

        // 좋아요 수 증가
        if (isLiked) {
            likeCnt -= 1;
        } else {
            likeCnt += 1;
        }
    };

    const handleShareClick = (e) => {
        e.preventDefault();
        navigator.clipboard.writeText(url);
        setIsShareClicked(true);
    };

    // 좋아요, 댓글, 공유, 프로필 버튼 이벤트 리스너 등록
    useEffect(() => {
        // Add event listeners
        if (like.current) like.current.addEventListener('click', handleLikeClick);
        if (comment.current) comment.current.addEventListener('click', scrollToComment);
        if (share.current) share.current.addEventListener('click', handleShareClick);

        const likeRef = like.current;
        const commentRef = comment.current;
        const shareRef = share.current;


        // Cleanup event listeners on component unmount
        return () => {
            if (likeRef) likeRef.removeEventListener('click', handleLikeClick);
            if (commentRef) commentRef.removeEventListener('click', scrollToComment);
            if (shareRef) shareRef.removeEventListener('click', handleShareClick);
        };
    }, []);

    return (
        <section className={profileStyles["writer-profile-reaction-section"]}>
            <section className={profileStyles['profile-header']}>
                <h2>읽어주셔서 감사합니다!</h2>
                <p>이 글이 마음에 드셨나요? 좋아요와 댓글로 응원해 주세요!</p>
            </section>
            <section className={profileStyles['profile-body']}>
                {/* 프로필 카드 - 누르면 블로그 메인으로 이동 */}
                <Link ref={profile} className={`${profileStyles['profile']} click`} to={`/`}>
                    <img src='https://avatars.githubusercontent.com/u/36643295?v=4' alt='profile img' />
                    <section className={profileStyles['info']}>
                        <section className={profileStyles['name']}>
                            <span>{articleWriter?.name}</span>
                            <ArrowIcon className={profileStyles['arrow-forward']} />
                        </section>
                        <span className={profileStyles.introduction}>
                            {articleWriter?.introduction}
                        </span>
                    </section>
                </Link>
                {/* 반응 섹션 */}
                <section className={profileStyles['reaction']}>
                    <section className={profileStyles['like-comment']}>
                        {/* 좋아요 버튼 */}
                        <button ref={like} className={`${profileStyles.like} click`} >
                            <FavoriteIcon className={profileStyles['favorite-icon']} />
                            <span>좋아요 {likeCnt}</span>
                        </button>
                        {/* 댓글 버튼 */}
                        <button className={'comment click'} >
                            <ChatIcon className={profileStyles['chat-icon']} />
                            <span>댓글 {commentCnt}</span>
                        </button>
                    </section>
                    {/* 공유하기 버튼 */}
                    <a ref={share} className={`${profileStyles['share']} click`} href={`articles/${slug}`}>
                        {!isShareClicked ? <LinkIcon className={profileStyles['link-icon']} /> : <CheckIcon className={profileStyles['link-icon']} />}
                        <span>{url}</span>
                    </a>
                </section>
            </section>

        </section>
    );
};

export default Profile;