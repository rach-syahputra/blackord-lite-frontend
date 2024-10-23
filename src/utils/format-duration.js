export const formatDuration = (time) => {
  if (typeof time === 'number' && !isNaN(time)) {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)

    // Convert to string and pad with leading zeros if necessary
    const formatMinutes = minutes.toString().padStart(2, '0')
    const formatSeconds = seconds.toString().padStart(2, '0')

    return `${formatMinutes}:${formatSeconds}`
  }

  return '00:00'
}
