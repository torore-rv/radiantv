import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const config = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    secret: process.env.NEXTAUTH_SECRET, // 필수 추가
    debug: true, // 디버깅 활성화
}

export default NextAuth(config)