import React from "react";
import styles from "./errors.module.css";
import { useCustomNavigation } from "hooks/useCustomNavigation";
const HomeButton = () => {
    const { goHome, goBack } = useCustomNavigation();
    return (
        <>
            <button className={`${styles.goHome} clickable`} onClick={goHome}>
                <span>&gt; return</span>
                <div className={styles.text}>home</div>
            </button>
            <button className={`${styles.goBack} clickable`} onClick={goBack}>
                이전 페이지로 이동
            </button>
        </>
    );
};

export default HomeButton;