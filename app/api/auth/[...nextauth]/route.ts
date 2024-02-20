import { AuthOptions } from "@/lib/auth"
import nextAuth from "next-auth"

const handler = nextAuth(AuthOptions)

export { handler as GET, handler as POST}