/** 시각 예쁘게 formatting - 2024-10-11
     * - 1분 이내이면 방금 전이라고 표시
     * - 60분 이내이면 n분 전이라고 표시
     * - 24시간 이내이면 n시간 전이라고 표시
     * - 3일 이내이면 n일 전이라고 표시
     * - 그 이상이면 날짜를 표시(yyyy-mm-dd)
     */
export const getFormattedDate = (created_at : Date): string => {
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