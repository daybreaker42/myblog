import { TimeUnit } from "types/type";

/** 시각 예쁘게 formatting - 2024-10-11
 * ### 변환 규칙
 * - 1분 이내이면 방금 전이라고 표시
 * - 60분 이내이면 n분 전이라고 표시
 * - 24시간 이내이면 n시간 전이라고 표시
 * - 3일 이내이면 n일 전이라고 표시
 * - 그 이상이면 날짜를 표시(yyyy-mm-dd)
 * ### 변환 가능한 경우들
 * #### Date type일 경우
 * ex) Thu Nov 07 2024 03:14:40 GMT+0900 (한국 표준시)
 * #### String type일 경우
 * ex) 2024-10-12T06:41:51.152921+00:00
 */
export const getFormattedDate = (created_at : Date | string): string => {
    // console.log(`created_at: ${created_at}`);
    if(typeof created_at === 'string') {
        // console.log(`created_at: ${created_at}`);
        created_at = new Date(created_at);
        // console.log(`-> ${created_at}`);
    }
    const now = new Date();
    const diff = now.getTime() - created_at.getTime();
    const diffMinutes = Math.floor(diff / 60000);
    const diffHours = Math.floor(diff / 3600000);
    const diffDays = Math.floor(diff / 86400000);
    if (diffMinutes < 1) {
        return '방금 전';
    } else if (diffMinutes < 60) {
        return `${diffMinutes}분 전`;
    } else if (diffHours < 24) {
        return `${diffHours}시간 전`;
    } else if (diffDays < 3) {
        return `${diffDays}일 전`;
    } else {
        const year = created_at.getFullYear();
        const month = String(created_at.getMonth() + 1).padStart(2, '0');
        const day = String(created_at.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
}

/**
 * translate js Date() to certain string format
 * - used to transform js date format to postgres date format
 * ex) 2024-09-14 19:45:14.616533+00
 */
export function transformCreatedAt(data: Date){
    return data.toISOString().split('T')[0];
}

/**
 * 시간 단위 formatting
 * @param timeUnit 시간 단위
 * @returns 시간 단위에 맞는 string
 * - SEC: 초
 * - MIN: 분
 * - HOUR: 시간
 * - DAY: 일
 * - default: ""
 */
export function formatTimeUnit(timeUnit?: TimeUnit): string {
    switch (timeUnit) {
        case TimeUnit.SEC:
            return "초";
        case TimeUnit.MIN:
            return "분";
        case TimeUnit.HOUR:
            return "시간";
        case TimeUnit.DAY:
            return "일";
        default:
            return "";
    }
}