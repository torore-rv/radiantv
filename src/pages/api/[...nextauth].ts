// @ts-ignore
import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'

const config = {
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ]
}

export default NextAuth(config)