
/**
 * Formats time in seconds to MM:SS format
 * @param time Time in seconds
 * @returns Formatted time string in MM:SS format
 */
export const formatVideoTime = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};
