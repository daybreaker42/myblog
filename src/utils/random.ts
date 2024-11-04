/**
 * min~max 사이의 랜덤한 정수를 반환합니다.
 */
export function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}