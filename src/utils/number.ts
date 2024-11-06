/**
 * Format a number with units
 * @param num
 * @returns formatted number
 * - ex) 1000000 -> 1M
 * - ex) 1000 -> 1K
 * - ex) 100 -> 100
 * - ex) 1000000000 -> 1B
 */
export function parseNumberWithUnit(num: number): string {
    if(num < 1000) return num.toString();
    if(num < 1000000) return (num / 1000).toFixed(1) + 'K';
    if(num < 1000000000) return (num / 1000000).toFixed(1) + 'M';
    return (num / 1000000000).toFixed(1) + 'B';
}