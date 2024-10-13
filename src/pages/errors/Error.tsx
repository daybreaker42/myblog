import React from "react";
import styles from "./errors.module.css";
import HomeButton from "./HomeButton";

// error별 메시지
type ErrorMessages = {
    [key: number]: {
        title: string;
        content: string;
    };
};

const errorMessage: ErrorMessages = {
    400: {
        title: '400 Bad Request',
        content: 'The server could not understand the request due to invalid syntax. Please check the URL and try again.'
        // content: `We're unable to process your request due to invalid syntax.\\nPlease verify your input and try again.`
    },
    401: {
        title: '401 Unauthorized',
        content: 'The request has not been applied because it lacks valid authentication credentials for the target resource. Please login and try again.'
        //         content: `Authentication is required to access this resource. 
        // Please log in with valid credentials and retry your request.`;
    },
    403: {
        title: '403 Forbidden',
        // content: 'The server understood the request, but is refusing to fulfill it. Please check the URL and try again, or navigate to our homepage.'
        content: `Access to this resource is forbidden. You do not have the necessary permissions. If you believe this is in error, please contact the system administrator.`
    },
    404: {
        title: '404 Not Found',
        content: 'The requested resource could not be found on this server. Please check the URL and try again, or navigate to our homepage.'
    },
    500: {
        title: '500 Internal Server Error',
        content: 'The server encountered an internal error or misconfiguration and was unable to complete your request. Please try again later.'
        // content: `We apologize, but an internal server error has occurred. Our technical team has been notified and is working to resolve the issue. Please try again later.`
    },
    502: {
        title: '502 Bad Gateway',
        content: 'The server received an invalid response from an upstream server while processing the request. Please try again later.'
        //         content: `We are currently experiencing issues with our upstream server. 
        // Our team is addressing the problem. 
        // Please attempt your request again in a few minutes.`
    },
    503: {
        title: '503 Service Unavailable',
        content: 'The server is temporarily unable to service your request due to maintenance downtime or capacity problems. Please try again later.'
        // content: `This service is temporarily unavailable due to maintenance or capacity issues. We appreciate your patience as we work to restore full functionality.`
    },
    504: {
        title: '504 Gateway Timeout',
        content: 'The server, while acting as a gateway or proxy, did not receive a timely response from an upstream server it needed to access in order to complete the request. Please try again later.'
    },    
};


const Error = ({ typeNum, message } : { typeNum: number | null, message: {title: string, content: string} | null, }) => {
    // message가 있을 경우 - 커스텀 에러 메시지 출력
    if(message) {
        return (
            <div>
                <main className={styles['error-main']}>
                    <section className={styles.body}>
                        <span className={styles.iconWrapper}>
                            <img src={require("assets/icons/warning.svg").default} alt='warning' width="100%" height="100%" />
                        </span>
                        <h1 className="title">{message.title}</h1>
                        <p className={styles.content}>{message.content}</p>
                        <HomeButton />
                    </section>
                </main>
            </div>
        )    
    }

    // 기본 에러 - 404 에러 페이지
    if (!typeNum || !(typeNum in errorMessage)) {
        console.error(`Error page not found: typeNum - ${typeNum}`);
        typeNum = 404;
    }
    // typeNum이 있는 경우 - 해당하는 에러 페이지 출력
    return (
        <div>
            <main className={styles['error-main']}>
                <section className={styles.body}>
                    <span className={styles.iconWrapper}>
                        <img src={require("assets/icons/warning.svg").default} alt='warning' width="100%" height="100%" />
                    </span>
                    <h1 className="title">{errorMessage[typeNum]?.title}</h1>
                    <p className={styles.content}>{errorMessage[typeNum]?.content}</p>
                    <HomeButton />
                </section>
            </main>
        </div>
    );
};

export default Error;