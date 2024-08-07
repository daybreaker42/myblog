import React from "react";

import { useCustomNavigation } from "hooks/useCustomNavigation";
const HomeButton = () => {
    const { goHome, goBack } = useCustomNavigation();
    return (
        <>
            <button className="goHome" onClick={goHome}>
                <span>&gt; return</span>
                <div className="text">Home</div>
            </button>
            <button className="goBack" onClick={goBack}>
                이전 페이지로 이동
            </button>
        </>
    );
};

export default HomeButton;