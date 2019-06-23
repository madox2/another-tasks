export const shortenText = maxLetters => text => {
  if (!text) {
    return text
  }
  if (text.length <= maxLetters) {
    return text
  }
  return text.substring(0, maxLetters - 3) + '...'
}
