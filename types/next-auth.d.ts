import nextAuth from "next-auth"

declare module "next-auth" {
  interface User {
    username: string
    role: string
  }
  interface Session {
    user: User & {
      username: string
      role: []
    }
    token: {
      uid: number,
      username: string
      role: string
    }
  }
}
