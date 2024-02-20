import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const prisma = new PrismaClient();

export const AuthOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    // maxAge: 4 * 24 * 60 * 60,
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("this is creds : ",credentials);

        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const isExistingUser = await prisma.user.findUnique({
            where: {
                email: credentials.email,
            },
            include: { role: true }
        })

        if(!isExistingUser){
          return null
        }

        if(credentials.password !== isExistingUser.password){
          return null
        }

        console.log("data role: ", isExistingUser.role.roleName)

        return {
          id: isExistingUser.id + '',
          username: isExistingUser.username,
          email: isExistingUser.email,
          role: isExistingUser.role.roleName
        };
      },
    }),
  ],
  callbacks: {
    async jwt({token, user}){
      if(user){
        return{
          ...token,
          username: user.username,
          role: user.role
        }
      }
      return token
    },
    async session({session, user, token}) {
      return {
        ...session,
        user: {
          ...session.user,
          username: token.username,
          role: token.role
        }
      }
    },
  }
};
