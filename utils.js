// Format from UTC to timezoned YYYY-MM-DD
export const formatDate = date => {
  const dateObject = new Date(date)
  const month = (m => m < 10 ? '0'+m : m)(dateObject.getMonth()+1)
  const day = (d => d < 10 ? '0'+d : d)(dateObject.getDate())
  return `${dateObject.getFullYear()}-${month}-${day}`
}
export const formatUrl = url => {
  if (!url) return ''
  const twitchMatch = url.match(/[tT][wW][iI][tT][cC][hH]\.?[tT][vV][\/\.](.*)\/?/)
  const mixerMatch = url.match(/[mM][iI][xX][eE][rR]\.?[tT][vV][\/\.](.*)\/?/)
  const urlMatch = url.match(/\//)

  if (twitchMatch)
    return `https://twitch.tv/${twitchMatch[1]}`
  else if (mixerMatch)
    return `https://mixer.tv/${mixerMatch[1]}`
  else if (!urlMatch)
    return `https://twitch.tv/${url}`
  else {
    const match = url.match(/https:\/\//)
    return match ? url : `https://${url}`
  }
}