import React, { useState } from 'react';
import styles from './CommentForm.module.css';

const CommentForm = ({ articleId }) => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const commentData = {
                articleId,
                name,
                password,
                content,
            };
            // TODO: createComment 및 기타 로직 구현
            // await createComment(commentData);
            setName('');
            setPassword('');
            setContent('');
            // message.success('Comment created');
            console.log('Comment created', commentData);
        } catch (error) {
            // message.error('Failed to create comment');
            console.error('Failed to create comment');
        } finally {
            setLoading(false);
        }
    };

    const isSubmitDisabled = !name || !password || !content;

    return (
        <section className={styles['comment-submit-form']}>
            <h2>의견 남기기</h2>
            <section className={styles['comsub-content']}>
                <input
                    type='text'
                    placeholder='이름...'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type='text'
                    placeholder='댓글 비밀번호...'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder='댓글 내용...'
                />
                <button
                    className={`${styles['submit-button']} ${isSubmitDisabled ? styles.inactive : ''}`}
                    onClick={handleSubmit}
                    disabled={isSubmitDisabled || loading}
                >Submit</button>
            </section>
        </section>
    );
}

export default CommentForm;