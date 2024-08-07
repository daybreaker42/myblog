import { useNavigate } from 'react-router-dom';
/**
 * 커스텀 네비게이션 훅
 * @returns {{goBack: goBack, goHome: goHome}}
 */
export const useCustomNavigation = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);
    const goHome = () => navigate('/');

    // 필요한 다른 네비게이션 함수들...

    return {
        goBack,
        goHome,
    };
};