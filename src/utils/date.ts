export const formatDate = (timestamps: number) => {
  const date = new Date(timestamps * 1000)

  // Helper function to ensure two digits (e.g., 5 -> "05")
  const pad = (num: number) => (num < 10 ? '0' + num : num)

  const year = date.getFullYear()
  // JavaScript months are 0-indexed (0=January, 11=December), so add 1
  const month = pad(date.getMonth() + 1)
  const day = pad(date.getDate())

  const formattedDate = `${year}-${month}-${day}`

  return formattedDate
}
