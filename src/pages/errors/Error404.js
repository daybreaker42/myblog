import React from "react";
// import { useNavigate } from "react-router-dom";
import { useCustomNavigation } from "hooks/useCustomNavigation";

const Error404 = () => {
    const { goBack } = useCustomNavigation();
    // const navigate = useNavigate();

    // const goBack = () => {
    //     navigate(-1);
    // };


    return (
        <div>
            <h1>404</h1>
            <p>Page not found</p>
            <button onClick={goBack}>Go back</button>
        </div>
    );
};

export default Error404;