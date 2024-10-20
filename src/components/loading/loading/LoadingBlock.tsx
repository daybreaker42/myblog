import styles from './LoadingBlock.module.css';
/**
 * LoadingBlock 컴포넌트
 * 화면에 로딩 중인 부분에 사용
 */
const LoadingBlock = () => {
    return (
        <div className="loading-block">
            <div className={styles['loader']}></div>
        </div>
    );
};

export default LoadingBlock;