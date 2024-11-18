import NextAuth from 'next-auth'
import type { AuthConfig } from '@auth/core'
import Google from 'next-auth/providers/google'

const config: AuthConfig = {
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ]
}

export default NextAuth(config)