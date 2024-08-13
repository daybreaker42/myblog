import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { ReactComponent as ArrowIcon } from 'assets/icons/arrow_forward.svg';
import { ReactComponent as LinkIcon } from 'assets/icons/link.svg';
import { ReactComponent as FavoriteIcon } from 'assets/icons/favorite.svg';
import { ReactComponent as ChatIcon } from 'assets/icons/chat.svg';
import { ReactComponent as CheckIcon } from 'assets/icons/check.svg';

import profileStyles from './Profile.module.css';

const Profile = ({ slug, articleWriter }) => {
    // 공유하기 눌렀는지 체크
    const [isShareClicked, setIsShareClicked] = useState(false);
    // 좋아요 눌렀는지 체크
    const [isLiked, setIsLiked] = useState(false);
    return (
        <section className={profileStyles["writer-profile-reaction-section"]}>
            <section className={profileStyles['profile-header']}>
                <h2>읽어주셔서 감사합니다!</h2>
                <p>이 글이 마음에 드셨나요? 좋아요와 댓글로 응원해 주세요!</p>
            </section>
            <section className={profileStyles['profile-body']}>
                <section className={profileStyles['profile']}>
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
                </section>
                <section className={profileStyles['reaction']}>
                    <section className={profileStyles['like-comment']}>
                        <button className={profileStyles['like']} onClick={
                            () => {
                                const like = document.querySelector(profileStyles.like);
                                setIsLiked(!isLiked);
                                if (isLiked) {
                                    like.classList.remove(profileStyles.liked);
                                } else {
                                    like.classList.add(profileStyles.liked);
                                }
                            }
                        }>
                            <FavoriteIcon className={profileStyles['favorite-icon']} />
                            <span>좋아요</span>
                        </button>
                        <button className={'comment'} onClick={
                            () => {
                                const comment = document.querySelector('.comment-section-header');
                                if (comment) {
                                    comment.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                }
                            }
                        }>
                            <ChatIcon className={profileStyles['chat-icon']} />
                            <span>댓글</span>
                        </button>
                    </section>

                    <a className={profileStyles['share']} href='https://fclipse.github.io/articles/first-blog-upload' onClick={
                        (e) => {
                            e.preventDefault();
                            navigator.clipboard.writeText('https://fclipse.github.io/articles/first-blog-upload');
                            setIsShareClicked(true);
                        }
                    }>
                        {!isShareClicked ? <LinkIcon className={profileStyles['link-icon']} /> : <CheckIcon className={profileStyles['link-icon']} />}

                        <span>
                            https://fclipse.github.io/articles/first-blog-upload
                        </span>
                    </a>
                </section>
            </section>

        </section>
    );
};

export default Profile;