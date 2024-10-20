/**
 * order시 사용할 함수
 */
export const applyOrder = (query: any, column: string, ascending: boolean) => {
    return query.order(column, { ascending });
};