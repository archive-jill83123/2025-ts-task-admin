export type UserLoginResponse = {
  status: boolean
  message: string
  uid: string
  token: string
  expired: number
}

export type MessageResponse = {
  success: boolean
  message: string
}
